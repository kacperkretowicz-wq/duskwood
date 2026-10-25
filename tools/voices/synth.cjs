'use strict';
/* Piper (offline) + lekki tor telefoniczny ffmpeg.
   Modele nie wchodzą do repo: tools/voices/models/, patrz .gitignore. */
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const cast = require('./cast.json');
const VoiceLib = require('../../js/core/voice-lib.js');

const ROOT = path.join(__dirname, '../..');
const PIPER = path.join(__dirname, 'models/piper/piper');
const VOICES = path.join(__dirname, 'models/voices');
const WORK = path.join(__dirname, 'work');

const FX = {
  phone: 'highpass=f=300,lowpass=f=3400,acompressor=threshold=-18dB:ratio=3.5:attack=6:release=70:makeup=2',
  'phone-far': 'highpass=f=450,lowpass=f=2600,acompressor=threshold=-14dB:ratio=5:attack=4:release=60:makeup=1,volume=0.85',
  whisper: 'highpass=f=700,lowpass=f=5200,volume=0.62,acompressor=threshold=-24dB:ratio=2',
  room: 'highpass=f=100,lowpass=f=7200,acompressor=threshold=-20dB:ratio=2',
  speaker: 'highpass=f=380,lowpass=f=3200,equalizer=f=900:t=q:w=1.2:g=4,acompressor=threshold=-16dB:ratio=4',
  tape: 'highpass=f=220,lowpass=f=4200,acompressor=threshold=-18dB:ratio=3.5',
  clone: 'highpass=f=160,lowpass=f=6500,aphaser=in_gain=0.35:out_gain=0.75:delay=2.5:speed=0.25:decay=0.2',
  deform: 'highpass=f=450,lowpass=f=2100,acrusher=bits=8:mode=log:aa=1,volume=1.15',
  clean: 'highpass=f=200,lowpass=f=5000,acompressor=threshold=-20dB:ratio=2.5',
  old: 'highpass=f=160,lowpass=f=3800,tremolo=f=4.2:d=0.18,acompressor=threshold=-16dB:ratio=3',
  outdoor: 'highpass=f=180,lowpass=f=6000',
  child: 'highpass=f=220,lowpass=f=6500'
};

function voiceProfile(name, fx) {
  const v = cast.voices[name] || cast.fallback;
  return {
    model: cast.models[v.model] || cast.models[cast.fallback.model],
    semitones: v.semitones || 0,
    rate: v.rate || 1,
    fx: FX[fx] ? fx : (v.fx || 'phone')
  };
}

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { encoding: 'utf8', input: opts.input, env: opts.env || process.env, cwd: opts.cwd });
  if (r.status !== 0) throw new Error(`${cmd} ${r.status}\n${(r.stderr || '').slice(-500)}`);
}

function piperWav(text, modelFile, lengthScale, out) {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  run(PIPER, ['-m', path.join(VOICES, modelFile), '-f', out, '--length_scale', String(lengthScale), '--sentence_silence', '0.15', '-q'], { input: text + '\n' });
}

function pitchFilter(semitones) {
  if (!semitones) return null;
  const ratio = Math.pow(2, semitones / 12);
  const tempo = Math.min(2, Math.max(0.5, 1 / ratio));
  return `asetrate=${Math.round(22050 * ratio)},aresample=22050,atempo=${tempo.toFixed(4)}`;
}

function finish(wav, spec, out) {
  const profile = voiceProfile(spec.voiceName, spec.fx);
  const chain = [spec.skipPitch ? null : pitchFilter(profile.semitones), FX[spec.fx] || FX[profile.fx]].filter(Boolean).join(',');
  const gain = spec.gain && spec.gain !== 1 ? `,volume=${spec.gain}` : '';
  const args = ['-y', '-hide_banner', '-loglevel', 'error', '-i', wav];
  let fc = `[0:a]${chain}${gain}[speech]`;
  let mix = ['[speech]'];
  let n = 1;
  if (spec.breath !== false && /phone|whisper|old/.test(spec.fx || profile.fx)) {
    args.push('-f', 'lavfi', '-i', 'anoisesrc=color=brown:r=22050:a=0.5:d=0.16');
    fc += `;[1:a]lowpass=f=800,afade=t=out:d=0.16,volume=0.22[br]`;
    mix.push('[br]');
    n = 2;
  }
  const noise = spec.fx === 'clone' || spec.fx === 'clean' ? 0 : 0.045;
  if (noise) {
    args.push('-f', 'lavfi', '-i', 'anoisesrc=color=pink:r=22050:a=0.25:d=120');
    fc += `;[${n}:a]highpass=f=250,lowpass=f=3400,volume=${noise}[nz]`;
    mix.push('[nz]');
  }
  fc += `;${mix.join('')}amix=inputs=${mix.length}:duration=first:dropout_transition=0:normalize=0`;
  args.push('-filter_complex', fc, '-c:a', 'libmp3lame', '-b:a', '24k', '-ac', '1', '-ar', '22050', out);
  run('ffmpeg', args);
}

function sayToMp3(text, voiceName, fx, out, extra = {}) {
  const profile = voiceProfile(voiceName, fx);
  const tmp = path.join(WORK, path.basename(out, '.mp3') + '.wav');
  fs.mkdirSync(WORK, { recursive: true });
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const length = 1 / (profile.rate * (extra.rate || 1));
  piperWav(text, profile.model, length, tmp);
  finish(tmp, { voiceName, fx: fx || profile.fx, gain: extra.gain, breath: extra.breath }, out);
  fs.rmSync(tmp, { force: true });
}

function segmentsToMp3(segments, fx, out, gain) {
  fs.mkdirSync(WORK, { recursive: true });
  const wavs = [];
  segments.forEach((seg, i) => {
    const profile = voiceProfile(seg.voice, seg.fx || fx);
    const wav = path.join(WORK, `seg-${path.basename(out, '.mp3')}-${i}.wav`);
    piperWav(seg.text, profile.model, 1 / profile.rate, wav);
    const pitched = path.join(WORK, `segp-${path.basename(out, '.mp3')}-${i}.wav`);
    const chain = [pitchFilter(profile.semitones)].filter(Boolean).join(',');
    if (chain) run('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', '-i', wav, '-af', chain, pitched]);
    else fs.copyFileSync(wav, pitched);
    wavs.push(pitched);
  });
  const list = path.join(WORK, `list-${path.basename(out, '.mp3')}.txt`);
  fs.writeFileSync(list, wavs.map(w => `file '${w}'`).join('\n'));
  const joined = path.join(WORK, `join-${path.basename(out, '.mp3')}.wav`);
  run('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', joined]);
  finish(joined, { voiceName: segments[0].voice, fx, gain, breath: false, skipPitch: true }, out);
  wavs.forEach(w => fs.rmSync(w, { force: true }));
  fs.rmSync(joined, { force: true });
}

function dur(file) {
  const r = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file], { encoding: 'utf8' });
  return Math.round(parseFloat(r.stdout) * 100) / 100;
}

module.exports = { sayToMp3, segmentsToMp3, dur, voiceProfile, ROOT };
