'use strict';
/* Dokleja ścieżkę dźwiękową do niemych klipów MP4. Źródło zostaje w tools/voices/work/video-src,
   więc skrypt można puścić ponownie. v_anonim.mp4 już ma dźwięk i jest pomijany.
   node tools/voices/mux-video.cjs */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const sfx = require('./sfx.cjs');
const synth = require('./synth.cjs');

const root = path.join(__dirname, '../..');
const vidDir = path.join(root, 'assets/video');
const backup = path.join(__dirname, 'work/video-src');

const CLIPS = {
  v_snap: { beds: ['forest'] },
  v_korytarz: { beds: ['hall'] },
  v_petla: { beds: ['bus', 'tick'] },
  v_sanki: { beds: ['sled', 'wind'] },
  v_studniowka: { beds: ['fest'] },
  v_festyn: { beds: ['tv', 'fest'] },
  v_festyn96: { beds: ['fest', 'wind'], say: { voice: 'tomek', fx: 'outdoor', text: 'Wera, chodź, jest zimno!', rate: 1.05 } },
  v_pies_noc: { beds: ['night'], bark: true },
  v_telewizor: { beds: ['tv', 'snore'] },
  v_kotka: { beds: ['kitchen'], meow: true },
  v_licznik: { beds: ['tape', 'tick'] },
  v_szyba: { beds: ['car'] },
  v_stodola: { beds: ['wind'], say: { voice: 'lena', fx: 'tape', text: 'Wszyscy mówili, że to od pioruna.', rate: 1.08 } },
  v_most40: { beds: ['kitchen'], say: { voice: 'henryk', fx: 'speaker', text: 'Ja tej siatki nie założyłem z powrotem. Moja wina.', rate: 1.45 } },
  v_most42: { beds: ['kitchen'], say: { voice: 'henryk', fx: 'speaker', text: 'Ja tej siatki nie założyłem z powrotem. Moja wina.', rate: 1.45 }, breath: true }
};

function probe(file, entries) {
  const r = spawnSync('ffprobe', ['-v', 'error', '-show_entries', entries, '-of', 'csv=p=0', file], { encoding: 'utf8' });
  return (r.stdout || '').trim();
}
function hasAudio(file) {
  const r = spawnSync('ffprobe', ['-v', 'error', '-select_streams', 'a', '-show_entries', 'stream=codec_type', '-of', 'csv=p=0', file], { encoding: 'utf8' });
  return /audio/.test(r.stdout || '');
}
function dur(file) {
  const n = parseFloat(probe(file, 'format=duration'));
  return n > 0 ? n : 6;
}

function mix(out, duration, files) {
  const args = ['-y', '-hide_banner', '-loglevel', 'error'];
  files.forEach(f => args.push('-i', f));
  const pads = files.map((_, i) => `[${i}:a]apad=whole_dur=${duration.toFixed(2)}[a${i}]`);
  const labels = files.map((_, i) => `[a${i}]`).join('');
  args.push('-filter_complex', `${pads.join(';')};${labels}amix=inputs=${files.length}:duration=first:dropout_transition=0:normalize=0,atrim=0:${duration.toFixed(2)},afade=t=in:d=0.05,afade=t=out:st=${Math.max(0.2, duration - 0.35).toFixed(2)}:d=0.3`, '-c:a', 'pcm_s16le', out);
  sfx.ff(args.slice(2));
}

function main() {
  fs.mkdirSync(backup, { recursive: true });
  const work = path.join(__dirname, 'work');
  fs.mkdirSync(work, { recursive: true });
  for (const name of Object.keys(CLIPS)) {
    const file = path.join(vidDir, name + '.mp4');
    const src = path.join(backup, name + '.mp4');
    if (!fs.existsSync(src)) {
      if (!fs.existsSync(file)) throw new Error('brak ' + file);
      fs.copyFileSync(file, src);
    }
  }
  for (const [name, spec] of Object.entries(CLIPS)) {
    const src = path.join(backup, name + '.mp4');
    const dest = path.join(vidDir, name + '.mp4');
    const seconds = dur(src);
    const layers = [];
    spec.beds.forEach((kind, i) => {
      const wav = path.join(work, `${name}-bed${i}.wav`);
      sfx.bed(kind, seconds + 0.2, wav);
      layers.push(wav);
    });
    if (spec.bark) {
      const wav = path.join(work, name + '-bark.wav');
      sfx.pulses(wav, seconds, { freq: 460, ms: 80, volume: 0.5, times: [1.1, 1.32, 3.5, 3.7] });
      layers.push(wav);
    }
    if (spec.meow) {
      const wav = path.join(work, name + '-meow.wav');
      sfx.pulses(wav, seconds, { freq: 720, ms: 280, volume: 0.28, times: [1.4, 4.2] });
      layers.push(wav);
    }
    if (spec.say) {
      const mp3 = path.join(work, name + '-say.mp3');
      synth.sayToMp3(spec.say.text, spec.say.voice, spec.say.fx, mp3, { rate: spec.say.rate || 1, breath: spec.breath !== false });
      layers.push(mp3);
    } else if (spec.breath) {
      const wav = path.join(work, name + '-breath.wav');
      sfx.hiss(wav, 0.5);
      layers.push(wav);
    }
    const mixed = path.join(work, name + '-mix.wav');
    mix(mixed, seconds, layers);
    const tmp = dest + '.tmp.mp4';
    sfx.ff(['-i', src, '-i', mixed, '-map', '0:v:0', '-map', '1:a:0', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '24k', '-ac', '1', '-shortest', '-movflags', '+faststart', tmp]);
    const size = fs.statSync(tmp).size;
    if (size > 450 * 1024) {
      fs.rmSync(tmp, { force: true });
      throw new Error(name + ' ma ' + size + ' B, limit 450 KB');
    }
    fs.renameSync(tmp, dest);
    console.log(name, Math.round(seconds * 10) / 10 + 's', Math.round(size / 1024) + 'KB', hasAudio(dest) ? 'audio' : 'NIEME');
  }
  const anon = path.join(vidDir, 'v_anonim.mp4');
  console.log('v_anonim', hasAudio(anon) ? 'zostawiony (ma dźwięk)' : 'BEZ DŹWIĘKU');
}

if (require.main === module) main();
module.exports = { main };
