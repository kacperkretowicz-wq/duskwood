'use strict';
/* Odtwarzanie nagrań z assets/audio (manifest). Synteza efektów zostaje w audio.js.
   Podmiana głosu: nowy plik pod tą samą ścieżką albo nowy wpis w manifeście. */

const Voices = (() => {
  let manifest = null;
  let loading = null;
  let current = null;
  let gesture = false;
  const videos = new Set();

  function vol() {
    const v = G.settings && typeof G.settings.volume === 'number' ? G.settings.volume : 0.8;
    return Math.max(0, Math.min(1, v));
  }
  function autoOk() {
    return !!(G.settings && G.settings.sfx && vol() > 0 && G.settings.speed !== 'instant');
  }
  function captionsOn() {
    return !G.settings || G.settings.captions !== false;
  }
  function fmt(s) {
    if (!isFinite(s) || s < 0) s = 0;
    s = Math.round(s);
    return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  }
  function bodyOf(text) {
    if (typeof VoiceLib !== 'undefined') {
      const p = VoiceLib.parseVoice(text);
      if (p) return p.body;
    }
    return String(text || '');
  }

  function load() {
    if (manifest) return Promise.resolve(manifest);
    if (!loading) {
      loading = fetch('assets/audio/manifest.json')
        .then(r => r.ok ? r.json() : { clips: {} })
        .then(m => { manifest = m && m.clips ? m : { clips: {} }; return manifest; })
        .catch(() => { manifest = { clips: {} }; return manifest; });
    }
    return loading;
  }

  function lookup(who, text) {
    if (!manifest || !manifest.clips || typeof VoiceLib === 'undefined') return null;
    const gender = G.s && G.s.player ? G.s.player.gender : 'm';
    const body = bodyOf(text);
    for (const id of VoiceLib.candidates(who, body, gender)) {
      if (manifest.clips[id]) return Object.assign({ id }, manifest.clips[id]);
    }
    return null;
  }

  function stop() {
    const cur = current;
    current = null;
    if (!cur) return;
    try { cur.audio.pause(); cur.audio.removeAttribute('src'); cur.audio.load(); } catch (e) { /* już zwolnione */ }
    if (cur.onStop) cur.onStop();
  }

  function scareAt(clip, audio) {
    if (!clip || !clip.scare || !G.s) return;
    if (audio.currentTime < (clip.hit || 0)) return;
    G.s.flags = G.s.flags || {};
    G.s.scares = G.s.scares || {};
    G.s.flags.s1_odsluchHeard = true;
    if (G.s.scares[clip.scare]) return;
    G.s.scares[clip.scare] = G.now ? G.now() : Date.now();
    if (G.save) G.save();
    if (typeof UI !== 'undefined' && UI.scare) UI.scare('glitch', { silent: true });
  }

  function start(src, opts) {
    if (vol() <= 0) return null;
    stop();
    const audio = new Audio(src);
    audio.preload = 'auto';
    audio.volume = vol();
    const token = {};
    current = { audio, token, manual: !!opts.manual, onStop: opts.onStop, clip: opts.clip, fired: false };
    audio.addEventListener('timeupdate', () => {
      if (current && current.token === token && !current.fired && opts.clip) {
        const before = !!(G.s && G.s.scares && G.s.scares[opts.clip.scare]);
        scareAt(opts.clip, audio);
        if (!before && G.s && G.s.scares && G.s.scares[opts.clip.scare]) current.fired = true;
      }
      if (opts.onTime) opts.onTime(audio.currentTime, audio.duration || 0);
    });
    audio.addEventListener('ended', () => {
      if (opts.onEnd) opts.onEnd();
      if (current && current.token === token) current = null;
    });
    const p = audio.play();
    if (p && p.catch) p.catch(() => {});
    return { audio, token };
  }

  function playManual(who, text, handlers) {
    const clip = lookup(who, text);
    if (!clip) return null;
    return start('assets/audio/' + clip.file, {
      manual: true,
      clip,
      onTime: handlers && handlers.onTime,
      onEnd: handlers && handlers.onEnd,
      onStop: handlers && handlers.onStop
    });
  }

  function speak(who, text) {
    if (!autoOk()) return;
    const clip = lookup(who, text);
    if (!clip) return;
    start('assets/audio/' + clip.file, { clip });
  }

  function held(token) {
    return !!(current && current.token === token && current.audio);
  }
  function paused(token) {
    return held(token) && current.audio.paused;
  }
  function toggle(token) {
    if (!held(token)) return;
    if (current.audio.paused) { const p = current.audio.play(); if (p && p.catch) p.catch(() => {}); }
    else current.audio.pause();
  }
  function seek(token, ratio) {
    if (!held(token) || !current.audio.duration) return;
    current.audio.currentTime = Math.max(0, Math.min(current.audio.duration, ratio * current.audio.duration));
  }

  function applyVideo(video) {
    if (!video.isConnected) { videos.delete(video); return; }
    const ok = gesture && G.settings && G.settings.sfx && vol() > 0;
    video.muted = !ok;
    if (ok) video.volume = vol();
  }
  function attach(video) {
    videos.add(video);
    video.muted = true;
    video.addEventListener('play', () => applyVideo(video));
    applyVideo(video);
  }
  function noteGesture() {
    gesture = true;
    if (typeof SFX !== 'undefined' && SFX.unlockAudio) SFX.unlockAudio();
    videos.forEach(applyVideo);
  }
  function setVolume(v) {
    if (current && current.audio) current.audio.volume = Math.max(0, Math.min(1, v));
    videos.forEach(applyVideo);
    if (v <= 0) stop();
  }
  function applyMix() {
    videos.forEach(applyVideo);
    if (current && !current.manual && !autoOk()) stop();
  }
  function applyCaptions() {
    document.documentElement.classList.toggle('no-captions', !captionsOn());
    document.querySelectorAll('.call').forEach(el => el.classList.toggle('no-cc', !captionsOn()));
  }

  function startListening() {
    document.addEventListener('pointerdown', noteGesture, true);
    document.addEventListener('keydown', noteGesture, true);
    if (typeof BUS !== 'undefined') {
      BUS.on('msg', ({ chat, msg }) => {
        if (chat !== 'call' || !msg || msg.from === 'me' || msg.from === 'sys' || !msg.text) return;
        if (/^voice:/.test(msg.text)) return;
        speak(msg.from, msg.text);
      });
      BUS.on('settings', () => { applyCaptions(); applyMix(); if (current && current.audio) current.audio.volume = vol(); });
    }
    load();
    applyCaptions();
  }

  return {
    load, lookup, speak, playManual, stop, held, paused, toggle, seek, attach, noteGesture,
    playing() { return !!(current && current.audio && !current.audio.paused); },
    setVolume, applyMix, applyCaptions, startListening, fmt, get manifest() { return manifest; }
  };
})();
