'use strict';
/* Dźwięk syntezowany na żywo (Web Audio): dzwonki, stuki, ambient. Nagrania głosu są w voices.js. */

const SFX = (() => {
  let ctx = null, master = null, sfxBus = null, ambBus = null, nbuf = null;
  let amb = null, ringTimer = null;
  let active = !document.hidden;

  function ac() {
    if (!active) return null;
    if (!ctx) {
      const C = window.AudioContext || window.webkitAudioContext;
      if (!C) return null;
      ctx = new C();
      master = ctx.createGain(); master.gain.value = G.settings.volume; master.connect(ctx.destination);
      sfxBus = ctx.createGain(); sfxBus.connect(master);
      ambBus = ctx.createGain(); ambBus.gain.value = 0; ambBus.connect(master);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  function noiseBuf() {
    if (!nbuf) {
      const len = ctx.sampleRate * 3;
      nbuf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = nbuf.getChannelData(0);
      let last = 0;
      for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = i % 2 ? w * 0.6 : last * 3.5; }
    }
    return nbuf;
  }
  const on = () => G.settings.sfx && ac();

  function tone({ f = 440, type = 'sine', t = 0, d = 0.2, g = 0.2, a = 0.006, f2 = 0, dest = null }) {
    const c = ac(); if (!c) return;
    const o = c.createOscillator(), v = c.createGain();
    const s = c.currentTime + t;
    o.type = type;
    o.frequency.setValueAtTime(f, s);
    if (f2) o.frequency.exponentialRampToValueAtTime(f2, s + d);
    v.gain.setValueAtTime(0.0001, s);
    v.gain.linearRampToValueAtTime(g, s + a);
    v.gain.exponentialRampToValueAtTime(0.0001, s + d);
    o.connect(v); v.connect(dest || sfxBus);
    o.start(s); o.stop(s + d + 0.05);
  }
  function burst({ t = 0, d = 0.12, g = 0.2, f = 2000, q = 1, type = 'bandpass' }) {
    const c = ac(); if (!c) return;
    const src = c.createBufferSource(), fl = c.createBiquadFilter(), v = c.createGain();
    const s = c.currentTime + t;
    src.buffer = noiseBuf();
    fl.type = type; fl.frequency.value = f; fl.Q.value = q;
    v.gain.setValueAtTime(g, s); v.gain.exponentialRampToValueAtTime(0.0001, s + d);
    src.connect(fl); fl.connect(v); v.connect(sfxBus);
    src.start(s, Math.random() * 2); src.stop(s + d + 0.05);
  }

  const play = {
    msg() { if (!on()) return; tone({ f: 932, d: 0.14, g: 0.09 }); tone({ f: 1397, t: 0.09, d: 0.28, g: 0.07 }); },
    group() { if (!on()) return; tone({ f: 784, d: 0.12, g: 0.08 }); tone({ f: 1175, t: 0.07, d: 0.25, g: 0.06 }); },
    sent() { if (!on()) return; tone({ f: 520, f2: 880, d: 0.1, g: 0.05, type: 'triangle' }); },
    notif() { if (!on()) return; [659, 988, 1319].forEach((f, i) => tone({ f, t: i * 0.11, d: 0.55 - i * 0.08, g: 0.07 })); },
    discover() { if (!on()) return; tone({ f: 523, d: 0.32, g: 0.035, type: 'triangle' }); tone({ f: 784, t: 0.06, d: 0.42, g: 0.018 }); },
    unlock() { if (!on()) return; tone({ f: 523, d: 0.18, g: 0.07 }); tone({ f: 784, t: 0.1, d: 0.35, g: 0.07 }); },
    error() { if (!on()) return; tone({ f: 196, d: 0.16, g: 0.07, type: 'square' }); tone({ f: 147, t: 0.11, d: 0.22, g: 0.06, type: 'square' }); },
    tap() { if (!on()) return; tone({ f: 2200, d: 0.025, g: 0.018 }); },
    key() { if (!on()) return; tone({ f: 1400 + Math.random() * 300, d: 0.04, g: 0.025, type: 'triangle' }); },
    shutter() { if (!on()) return; burst({ d: 0.05, g: 0.25, f: 4000, type: 'highpass' }); burst({ t: 0.07, d: 0.07, g: 0.2, f: 3000, type: 'highpass' }); },
    glitch() {
      if (!on()) return;
      for (let i = 0; i < 7; i++) {
        const t = i * 0.045 + Math.random() * 0.03;
        if (Math.random() < 0.5) burst({ t, d: 0.04, g: 0.18, f: 300 + Math.random() * 5000, q: 3 });
        else tone({ f: 60 + Math.random() * 900, t, d: 0.05, g: 0.06, type: 'square' });
      }
    },
    chapter() {
      if (!on()) return;
      tone({ f: 55, d: 3.2, g: 0.22, a: 0.4 });
      tone({ f: 82.4, t: 0.1, d: 3, g: 0.08, a: 0.6 });
      burst({ d: 2.5, g: 0.05, f: 500, q: 0.4, type: 'lowpass' });
      tone({ f: 2093, t: 0.9, d: 3, g: 0.025, a: 0.02 });
    },
    sting() { if (!on()) return; tone({ f: 46, d: 2.2, g: 0.28, a: 0.02 }); tone({ f: 92.5, d: 1.6, g: 0.07, type: 'sawtooth', a: 0.01 }); burst({ d: 0.9, g: 0.08, f: 180, type: 'lowpass' }); },
    heartbeat() { if (!on()) return; tone({ f: 60, d: 0.18, g: 0.25 }); tone({ f: 55, t: 0.22, d: 0.22, g: 0.2 }); },
    vibe() { U.vibrate([60, 40, 60]); if (!on()) return; tone({ f: 150, d: 0.09, g: 0.04, type: 'square' }); tone({ f: 150, t: 0.13, d: 0.09, g: 0.04, type: 'square' }); },
    hangup() { if (!on()) return; tone({ f: 480, d: 0.25, g: 0.06 }); tone({ f: 380, t: 0.28, d: 0.3, g: 0.06 }); },
    beep() { if (!on()) return; tone({ f: 425, d: 0.4, g: 0.05 }); },
    // Straszaki: zawsze przez ten sam master (głośność z ustawień i urządzenia), w trybie łagodnym ciszej i bez uderzenia.
    sting(soft) {
      if (!on()) return;
      if (soft) { tone({ f: 110, d: 1.2, g: 0.035, a: 0.25 }); return; }
      burst({ d: 0.35, g: 0.32, f: 900, q: 0.7 });
      tone({ f: 58, d: 1.6, g: 0.3, a: 0.004, type: 'sawtooth', f2: 41 });
      tone({ f: 466, d: 1.1, g: 0.07, a: 0.01, type: 'triangle' }); tone({ f: 494, d: 1.1, g: 0.07, a: 0.01, type: 'triangle' });
    },
    breath(soft) {
      if (!on()) return;
      const g = soft ? 0.05 : 0.12;
      burst({ d: 1.1, g, f: 700, q: 0.6, type: 'lowpass' }); burst({ t: 1.5, d: 1.3, g: g * 0.8, f: 520, q: 0.6, type: 'lowpass' });
    },
    staticHit(soft) { if (!on()) return; burst({ d: soft ? 0.18 : 0.45, g: soft ? 0.05 : 0.22, f: 3200, q: 0.4 }); },
  };

  function ringStart(kind = 'in') {
    ringStop();
    const pattern = () => {
      if (!on()) return;
      if (kind === 'in') {
        [0, 0.18, 0.36].forEach((t, i) => { tone({ f: [988, 1319, 1175][i], t, d: 0.35, g: 0.07, type: 'triangle' }); });
        tone({ f: 1568, t: 0.62, d: 0.5, g: 0.05, type: 'triangle' });
        U.vibrate([400, 200, 400]);
      } else {
        tone({ f: 425, d: 1.0, g: 0.045 });
      }
    };
    pattern();
    ringTimer = setInterval(pattern, kind === 'in' ? 2200 : 3500);
  }
  function ringStop() { clearInterval(ringTimer); ringTimer = null; }

  // Ambient: wiatr (szum przez filtr dolnoprzepustowy z wolnym LFO), niski dron, rzadkie „szkło”.
  function ambient(mood = 'calm') {
    const c = ac(); if (!c) return;
    ambBus.gain.cancelScheduledValues(c.currentTime);
    if (!G.settings.ambient || mood === 'off') { ambBus.gain.linearRampToValueAtTime(0, c.currentTime + 1.5); return; }
    if (amb && amb.mood === mood) { ambBus.gain.linearRampToValueAtTime(1, c.currentTime + 2); return; }
    stopAmb();
    const cfg = {
      calm: { lp: 380, lfo: 0.05, ng: 0.05, drone: [55, 55.3], dg: 0.018, chime: 26 },
      tense: { lp: 520, lfo: 0.11, ng: 0.06, drone: [49, 49.6, 73.4], dg: 0.024, chime: 18 },
      dark: { lp: 260, lfo: 0.035, ng: 0.06, drone: [41.2, 41.5, 61.7], dg: 0.03, chime: 34 },
      dawn: { lp: 700, lfo: 0.04, ng: 0.03, drone: [65.4, 98, 130.8], dg: 0.012, chime: 12 }
    }[mood] || { lp: 380, lfo: 0.05, ng: 0.05, drone: [55, 55.3], dg: 0.018, chime: 26 };
    const nodes = [];
    const src = c.createBufferSource(); src.buffer = noiseBuf(); src.loop = true;
    const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = cfg.lp; lp.Q.value = 0.7;
    const ng = c.createGain(); ng.gain.value = cfg.ng;
    const lfo = c.createOscillator(); lfo.frequency.value = cfg.lfo;
    const lfoG = c.createGain(); lfoG.gain.value = cfg.lp * 0.6;
    lfo.connect(lfoG); lfoG.connect(lp.frequency);
    const lfo2 = c.createOscillator(); lfo2.frequency.value = cfg.lfo * 0.73;
    const lfo2G = c.createGain(); lfo2G.gain.value = cfg.ng * 0.6;
    lfo2.connect(lfo2G); lfo2G.connect(ng.gain);
    src.connect(lp); lp.connect(ng); ng.connect(ambBus);
    src.start(); lfo.start(); lfo2.start();
    nodes.push(src, lfo, lfo2);
    cfg.drone.forEach(f => {
      const o = c.createOscillator(); o.type = 'sine'; o.frequency.value = f;
      const g = c.createGain(); g.gain.value = cfg.dg;
      o.connect(g); g.connect(ambBus); o.start(); nodes.push(o);
    });
    const chime = () => {
      if (!amb) return;
      if (active && G.settings.ambient) {
        if (mood === 'dark' || mood === 'tense') {
          // Nierówne, ciche naprężenie metalu w tle, bez sugerowania kroków
          // czy nowego zdarzenia fabularnego. Brak melodyjnego „odliczania”.
          const base = 145 + Math.random() * 65;
          tone({ f: base, f2: base * 0.93, d: 2.4, g: 0.007, a: 0.6, dest: ambBus });
          tone({ f: base * 2.71, d: 1.7, g: 0.003, a: 0.35, dest: ambBus });
        } else {
          const base = [1760, 2093, 2349, 2637, 3136][Math.floor(Math.random() * 5)];
          tone({ f: base, d: 4, g: 0.008, a: 0.01, dest: ambBus });
        }
      }
      amb.timer = setTimeout(chime, (cfg.chime + Math.random() * cfg.chime) * 1000);
    };
    amb = { mood, nodes, timer: setTimeout(chime, (cfg.chime + Math.random() * cfg.chime) * 1000) };
    ambBus.gain.setValueAtTime(0, c.currentTime);
    ambBus.gain.linearRampToValueAtTime(1, c.currentTime + 4);
  }
  function stopAmb() {
    if (!amb) return;
    clearTimeout(amb.timer);
    amb.nodes.forEach(n => { try { n.stop(); } catch (e) { /* już zatrzymany */ } });
    amb = null;
  }

  // Szum nagrania do czyszczenia: im bliżej celu, tym mniej szumu i więcej „mowy”.
  function tuner() {
    const c = ac(); if (!c || !G.settings.sfx) return { set() {}, stop() {} };
    const src = c.createBufferSource(); src.buffer = noiseBuf(); src.loop = true;
    const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1200; bp.Q.value = 0.6;
    const ng = c.createGain(); ng.gain.value = 0.12;
    src.connect(bp); bp.connect(ng); ng.connect(sfxBus); src.start();
    // „Głos”: piłokształtny ton przez dwa formanty, modulowany sylabami.
    const vo = c.createOscillator(); vo.type = 'sawtooth'; vo.frequency.value = 190;
    const vib = c.createOscillator(); vib.frequency.value = 5.1; const vibG = c.createGain(); vibG.gain.value = 18;
    vib.connect(vibG); vibG.connect(vo.frequency);
    const f1 = c.createBiquadFilter(); f1.type = 'bandpass'; f1.frequency.value = 700; f1.Q.value = 6;
    const f2 = c.createBiquadFilter(); f2.type = 'bandpass'; f2.frequency.value = 1500; f2.Q.value = 8;
    const syl = c.createOscillator(); syl.frequency.value = 3.7; const sylG = c.createGain(); sylG.gain.value = 0.5;
    const vg = c.createGain(); vg.gain.value = 0;
    const am = c.createGain(); am.gain.value = 0.5;
    syl.connect(sylG); sylG.connect(am.gain);
    vo.connect(f1); vo.connect(f2); f1.connect(am); f2.connect(am); am.connect(vg); vg.connect(sfxBus);
    const fm = c.createOscillator(); fm.frequency.value = 0.9; const fmG = c.createGain(); fmG.gain.value = 250;
    fm.connect(fmG); fmG.connect(f1.frequency);
    [vo, vib, syl, fm].forEach(o => o.start());
    return {
      set(dist, bandHz) {
        const t = c.currentTime + 0.08;
        ng.gain.linearRampToValueAtTime(0.02 + 0.16 * dist, t);
        vg.gain.linearRampToValueAtTime(0.09 * (1 - dist) * (1 - dist), t);
        bp.frequency.linearRampToValueAtTime(bandHz || 1200, t);
      },
      stop() { [src, vo, vib, syl, fm].forEach(n => { try { n.stop(); } catch (e) { /* ok */ } }); }
    };
  }

  function setVolume(v) { if (master) master.gain.value = v; }
  function unlockAudio() { ac(); }
  function setActive(value) {
    active = !!value;
    if (ctx) (active ? ctx.resume() : ctx.suspend()).catch(() => {});
  }
  document.addEventListener('visibilitychange', () => setActive(!document.hidden));

  return { play, ringStart, ringStop, ambient, tuner, setVolume, unlockAudio, setActive };
})();
