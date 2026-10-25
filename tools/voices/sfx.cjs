'use strict';
/* Łóżka i efekty bez mowy: telefon, pokój, trzask szkła. Czysty ffmpeg. */
const { spawnSync } = require('child_process');
const fs = require('fs');

function ff(args) {
  const r = spawnSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', ...args], { encoding: 'utf8' });
  if (r.status !== 0) throw new Error(r.stderr || r.stdout || 'ffmpeg');
}

function write(out, filter, inputs) {
  const args = [];
  for (const inp of inputs) args.push('-f', 'lavfi', '-i', inp);
  args.push('-filter_complex', filter, '-ac', '1', '-ar', '22050', out);
  ff(args);
}

function hiss(out, seconds = 0.7) {
  write(out, '[0]highpass=f=300,lowpass=f=3200,volume=0.18,afade=t=in:d=0.05,afade=t=out:st=0.45:d=0.25', [
    `anoisesrc=color=pink:r=22050:a=0.4:d=${seconds}`
  ]);
}

/* Oddech i tykanie buduję z kliknięć opóźnionych, bez mowy. */
function breathTickFile(out) {
  const delays = [];
  for (let t = 0.4; t < 8.6; t += 0.55) delays.push(Math.round(t * 1000));
  const parts = ['[0]lowpass=f=420,volume=0.28[room]'];
  parts.push('[1]lowpass=f=650,volume=0.28[breath]');
  parts.push(`[2]asplit=${delays.length}` + delays.map((_, i) => `[s${i}]`).join(''));
  const mix = ['[room]', '[breath]'];
  delays.forEach((ms, i) => {
    parts.push(`[s${i}]adelay=${ms}|${ms}[k${i}]`);
    mix.push(`[k${i}]`);
  });
  parts.push(`${mix.join('')}amix=inputs=${mix.length}:duration=first:dropout_transition=0:normalize=0,highpass=f=280,lowpass=f=3400,afade=t=in:d=0.15,afade=t=out:st=8.4:d=0.5`);
  write(out, parts.join(';'), [
    'anoisesrc=color=brown:r=22050:a=0.45:d=9',
    'anoisesrc=color=brown:r=22050:a=0.7:d=9',
    'sine=frequency=2100:duration=0.018:sample_rate=22050,afade=t=out:d=0.018,volume=0.55'
  ]);
}

function odsluch(out) {
  const clicks = [900, 1900, 2900, 3900, 4900, 5900];
  const nails = [4300, 4680, 5050];
  const parts = [
    '[0]lowpass=f=380,volume=0.26[room]',
    '[1]highpass=f=2000,lowpass=f=6000,volume=0.05[hiss]',
    `[2]asplit=${clicks.length}` + clicks.map((_, i) => `[cs${i}]`).join(''),
    `[3]asplit=${nails.length}` + nails.map((_, i) => `[ns${i}]`).join('')
  ];
  const mix = ['[room]', '[hiss]'];
  clicks.forEach((ms, i) => { parts.push(`[cs${i}]adelay=${ms}|${ms}[c${i}]`); mix.push(`[c${i}]`); });
  nails.forEach((ms, i) => { parts.push(`[ns${i}]adelay=${ms}|${ms}[n${i}]`); mix.push(`[n${i}]`); });
  parts.push('[4]adelay=7050|7050,volume=2.4[crack]');
  mix.push('[crack]');
  parts.push(`${mix.join('')}amix=inputs=${mix.length}:duration=first:dropout_transition=0:normalize=0,highpass=f=280,lowpass=f=3600,acompressor=threshold=-16dB:ratio=4:attack=4:release=80,afade=t=in:d=0.12,afade=t=out:st=8.55:d=0.4`);
  write(out, parts.join(';'), [
    'anoisesrc=color=brown:r=22050:a=0.5:d=9.1',
    'anoisesrc=color=pink:r=22050:a=0.25:d=9.1',
    'sine=frequency=1400:duration=0.016:sample_rate=22050,afade=t=out:d=0.016,volume=0.35',
    'sine=frequency=3200:duration=0.012:sample_rate=22050,afade=t=out:d=0.012,volume=0.45',
    'anoisesrc=color=white:r=22050:a=1:d=0.28,highpass=f=500,lowpass=f=2800,afade=t=in:d=0.005,afade=t=out:st=0.08:d=0.2,acrusher=bits=7:mode=log:aa=1'
  ]);
}

function bed(kind, seconds, out) {
  const d = Math.max(0.4, seconds).toFixed(2);
  const src = {
    wind: [`anoisesrc=color=brown:r=22050:a=0.6:d=${d}`, 'lowpass=f=500,highpass=f=80,volume=0.35'],
    bus: [`anoisesrc=color=brown:r=22050:a=0.55:d=${d}`, 'lowpass=f=280,volume=0.4'],
    tv: [`anoisesrc=color=pink:r=22050:a=0.35:d=${d}`, 'bandpass=f=1200:width_type=h:w=1800,volume=0.16'],
    crowd: [`anoisesrc=color=pink:r=22050:a=0.5:d=${d}`, 'bandpass=f=900:width_type=h:w=1400,volume=0.14'],
    bell: [`sine=frequency=880:duration=${d}:sample_rate=22050`, 'volume=0.02'],
    snore: [`anoisesrc=color=brown:r=22050:a=0.8:d=${d}`, 'lowpass=f=400,volume=0.16'],
    dog: [`anoisesrc=color=brown:r=22050:a=0.3:d=${d}`, 'lowpass=f=600,volume=0.12'],
    door: [`anoisesrc=color=pink:r=22050:a=0.2:d=${d}`, 'highpass=f=200,volume=0.05'],
    tick: [`anoisesrc=color=pink:r=22050:a=0.05:d=${d}`, 'volume=0.04'],
    tape: [`anoisesrc=color=pink:r=22050:a=0.35:d=${d}`, 'highpass=f=300,lowpass=f=4000,volume=0.08'],
    forest: [`anoisesrc=color=brown:r=22050:a=0.45:d=${d}`, 'lowpass=f=700,highpass=f=60,volume=0.32'],
    hall: [`anoisesrc=color=pink:r=22050:a=0.25:d=${d}`, 'bandpass=f=420:width_type=h:w=500,volume=0.2'],
    sled: [`anoisesrc=color=white:r=22050:a=0.4:d=${d}`, 'highpass=f=1500,lowpass=f=7000,volume=0.12'],
    fest: [`anoisesrc=color=pink:r=22050:a=0.55:d=${d}`, 'bandpass=f=800:width_type=h:w=2000,volume=0.2'],
    kitchen: [`anoisesrc=color=pink:r=22050:a=0.3:d=${d}`, 'highpass=f=150,lowpass=f=5000,volume=0.1'],
    car: [`anoisesrc=color=brown:r=22050:a=0.5:d=${d}`, 'lowpass=f=250,volume=0.38'],
    cat: [`anoisesrc=color=pink:r=22050:a=0.2:d=${d}`, 'highpass=f=200,volume=0.06'],
    night: [`anoisesrc=color=brown:r=22050:a=0.35:d=${d}`, 'lowpass=f=500,volume=0.22']
  }[kind] || [`anoisesrc=color=pink:r=22050:a=0.2:d=${d}`, 'volume=0.08'];
  write(out, `[0]${src[1]}`, [src[0]]);
}

/* Krótkie szczeknięcia albo miauknięcia na tle szumu. */
function pulses(out, seconds, { freq = 480, ms = 90, times = [], volume = 0.55 } = {}) {
  const hits = times.filter(t => t > 0.05 && t < seconds - 0.15);
  if (!hits.length) return hiss(out, Math.min(0.4, seconds));
  const d = seconds.toFixed(2);
  const parts = [`[0]volume=0.15[bed]`, `[1]asplit=${hits.length}` + hits.map((_, i) => `[p${i}]`).join('')];
  const mix = ['[bed]'];
  hits.forEach((t, i) => {
    const delay = Math.round(t * 1000);
    parts.push(`[p${i}]adelay=${delay}|${delay}[h${i}]`);
    mix.push(`[h${i}]`);
  });
  parts.push(`${mix.join('')}amix=inputs=${mix.length}:duration=first:dropout_transition=0:normalize=0`);
  write(out, parts.join(';'), [
    `anoisesrc=color=brown:r=22050:a=0.15:d=${d}`,
    `sine=frequency=${freq}:duration=${(ms / 1000).toFixed(3)}:sample_rate=22050,afade=t=out:d=${(ms / 1000).toFixed(3)},volume=${volume}`
  ]);
}

module.exports = { ff, write, hiss, breathTickFile, odsluch, bed, pulses };
