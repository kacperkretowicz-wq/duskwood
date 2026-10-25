// Głos: identyfikatory, manifest, pliki mp3 i ścieżka audio w klipach.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const VoiceLib = require('../js/core/voice-lib.js');
const { route } = require('../tools/voices/route.cjs');
const { collect } = require('../tools/voices/extract.cjs');
const { jobsFor } = require('../tools/voices/generate.cjs');

const root = path.join(__dirname, '..');

test('identyfikator nagrania nie zależy od imienia gracza ani od płci, gdy tekst jest ten sam', () => {
  const a = VoiceLib.clipId('maja', 'Cześć %name%, oddzwoń.', 'm', false);
  const b = VoiceLib.clipId('maja', 'Cześć %name%, oddzwoń.', 'f', false);
  assert.equal(a, b);
  assert.equal(VoiceLib.canon('Cześć %name%.', 'f'), 'Cześć .');
  const male = VoiceLib.clipId('kuba', '{znalazłeś|znalazłaś} to?', 'm', false);
  const female = VoiceLib.clipId('kuba', '{znalazłeś|znalazłaś} to?', 'f', false);
  assert.notEqual(male, female);
});

test('odsłuch Szklarza straszy dopiero po odtworzeniu', () => {
  assert.equal(VoiceLib.allowScare('s1_odsluch', {}), false);
  assert.equal(VoiceLib.allowScare('s1_odsluch', { s1_odsluchHeard: true }), true);
  assert.equal(VoiceLib.allowScare('inny', {}), true);
  const spec = route('szklarz', 'voice:0:09||Szum pomieszczenia. Tyka zegar. Stuknięcie w szybę. Trzask szkła.');
  assert.equal(spec.sfx, 'odsluch');
  assert.equal(spec.scare, 's1_odsluch');
  assert.equal(spec.hit, 7.05);
});

test('każda kwestia z fabuły ma wpis w manifeście i plik mp3', () => {
  const jobs = jobsFor(collect());
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'assets/audio/manifest.json'), 'utf8'));
  assert.equal(manifest.engine, 'piper');
  const ids = new Set(jobs.map(j => j.id));
  assert.equal(ids.size, jobs.length);
  assert.deepEqual(Object.keys(manifest.clips).sort(), [...ids].sort());
  const cache = fs.readFileSync(path.join(root, 'js/data/audio-cache.js'), 'utf8');
  for (const clip of Object.values(manifest.clips)) {
    const abs = path.join(root, 'assets/audio', clip.file);
    assert.ok(fs.existsSync(abs), clip.file);
    const buf = fs.readFileSync(abs);
    assert.ok(buf.length > 400 && buf.length <= 450 * 1024, clip.file + ' ' + buf.length);
    const head = buf.subarray(0, 3).toString('latin1');
    assert.ok(head === 'ID3' || buf[0] === 0xff, clip.file);
    assert.match(clip.file, /^[\w-]+\/[0-9a-f]{16}\.mp3$/);
    assert.ok(cache.includes('./assets/audio/' + clip.file), clip.file);
    assert.ok(clip.dur > 0.2, clip.file);
  }
});

test('service worker bierze nagrania z listy i podnosi wersję', () => {
  const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
  assert.match(sw, /quiet-is-safer-v155/);
  assert.match(sw, /importScripts\('\.\/js\/data\/audio-cache\.js'\)/);
  assert.match(sw, /voice-lib\.js/);
  assert.match(sw, /voices\.js/);
});

test('każdy klip mp4 ma ścieżkę audio i mieści się w limicie', () => {
  const dir = path.join(root, 'assets/video');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mp4'));
  assert.ok(files.length >= 16);
  for (const f of files) {
    const abs = path.join(dir, f);
    assert.ok(fs.statSync(abs).size <= 450 * 1024, f);
    const r = spawnSync('ffprobe', ['-v', 'error', '-select_streams', 'a', '-show_entries', 'stream=codec_type', '-of', 'csv=p=0', abs], { encoding: 'utf8' });
    assert.match(r.stdout || '', /audio/, f);
  }
});
