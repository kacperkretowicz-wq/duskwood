'use strict';
/* Generuje assets/audio/<postać>/<id>.mp3 i manifest.
   node tools/voices/generate.cjs
   Po zmianie kwestii uruchom ponownie: istniejące id są pomijane, nowe dochodzą,
   osierocone mp3 są usuwane. Modele Piper zostają w tools/voices/models/. */
const fs = require('fs');
const path = require('path');
const VoiceLib = require('../../js/core/voice-lib.js');
const { route } = require('./route.cjs');
const { collect } = require('./extract.cjs');
const synth = require('./synth.cjs');
const sfx = require('./sfx.cjs');

const root = path.join(__dirname, '../..');
const audioRoot = path.join(root, 'assets/audio');
const work = path.join(__dirname, 'work');

function jobsFor(lines) {
  const jobs = new Map();
  for (const line of lines) {
    const spec = route(line.who, line.raw);
    const gendered = spec.gendered || VoiceLib.canon(spec.text, 'm') !== VoiceLib.canon(spec.text, 'f');
    const genders = gendered ? ['m', 'f'] : ['m'];
    for (const g of genders) {
      const id = VoiceLib.clipId(line.who, spec.text, g, spec.gendered);
      if (jobs.has(id)) continue;
      const voiceName = spec.voice === 'player' ? 'player_' + g : (spec.voice || 'unknown');
      jobs.set(id, {
        id, voiceName, gender: g, spec, who: line.who, kind: spec.kind,
        text: VoiceLib.forTts(spec.text, g)
      });
    }
  }
  return [...jobs.values()];
}

function render(job) {
  const dir = path.join(audioRoot, job.voiceName);
  fs.mkdirSync(dir, { recursive: true });
  const out = path.join(dir, job.id + '.mp3');
  if (job.spec.sfx === 'odsluch') sfx.odsluch(out.replace(/\.mp3$/, '.wav'));
  else if (job.spec.sfx === 'breath-tick') sfx.breathTickFile(out.replace(/\.mp3$/, '.wav'));
  else if (job.spec.sfx === 'hiss' || !job.text) sfx.hiss(out.replace(/\.mp3$/, '.wav'), 0.8);
  else if (job.spec.segments) {
    synth.segmentsToMp3(job.spec.segments, job.spec.fx, out, job.spec.gain);
    return out;
  } else {
    synth.sayToMp3(job.text, job.voiceName, job.spec.fx, out, { gain: job.spec.gain });
    return out;
  }
  const wav = out.replace(/\.mp3$/, '.wav');
  sfx.ff(['-i', wav, '-c:a', 'libmp3lame', '-b:a', '24k', '-ac', '1', '-ar', '22050', out]);
  fs.rmSync(wav, { force: true });
  return out;
}

function main() {
  fs.mkdirSync(work, { recursive: true });
  const jobs = jobsFor(collect());
  console.log('klipów:', jobs.length);
  const clips = {};
  let n = 0;
  for (const job of jobs) {
    const rel = `${job.voiceName}/${job.id}.mp3`;
    const abs = path.join(audioRoot, rel);
    if (!fs.existsSync(abs) || fs.statSync(abs).size < 400) render(job);
    const rec = {
      who: job.who,
      voice: job.voiceName,
      kind: job.kind,
      file: rel,
      dur: synth.dur(abs),
      text: job.text.slice(0, 160)
    };
    if (job.spec.scare) { rec.scare = job.spec.scare; rec.hit = job.spec.hit; }
    clips[job.id] = rec;
    n++;
    if (n % 25 === 0) console.log(n + '/' + jobs.length);
  }
  const manifest = { v: 1, engine: 'piper', note: 'Wersja robocza. Podmień plik albo model w tools/voices/cast.json.', clips };
  fs.writeFileSync(path.join(audioRoot, 'manifest.json'), JSON.stringify(manifest));
  const keep = new Set(Object.values(clips).map(c => c.file));
  if (fs.existsSync(audioRoot)) {
    for (const dir of fs.readdirSync(audioRoot)) {
      const full = path.join(audioRoot, dir);
      if (!fs.statSync(full).isDirectory()) continue;
      for (const f of fs.readdirSync(full)) {
        const rel = dir + '/' + f;
        if (f.endsWith('.mp3') && !keep.has(rel)) fs.rmSync(path.join(full, f));
      }
    }
  }
  const list = ['./assets/audio/manifest.json', ...[...keep].sort().map(f => './assets/audio/' + f)];
  const cache = '/* Lista nagrań do pamięci offline. Generuje tools/voices/generate.cjs */\nself.AUDIO_CACHE = ' + JSON.stringify(list, null, 2) + ';\n';
  fs.writeFileSync(path.join(root, 'js/data/audio-cache.js'), cache);
  const bytes = [...keep].reduce((s, f) => s + fs.statSync(path.join(audioRoot, f)).size, 0);
  console.log('gotowe', Object.keys(clips).length, 'plików,', Math.round(bytes / 1024) + ' KB');
}

if (require.main === module) main();
module.exports = { jobsFor, main };
