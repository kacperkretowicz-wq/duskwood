'use strict';
/* Zbiera linie, które mają mówić: głosówki, rozmowy telefoniczne, poczta głosowa.
   Odświeżenie po zmianie tekstu: node tools/voices/generate.cjs */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const VoiceLib = require('../../js/core/voice-lib.js');

const root = path.join(__dirname, '../..');

function storyLines() {
  const { chapters } = require('../dump-steps.cjs');
  const out = [];
  for (const ch of Object.values(chapters)) {
    for (const s of ch.steps) {
      if (s.t !== 'say' || s.who === 'me' || s.who === 'sys') continue;
      const shown = s.wording ?? s.text;
      if (typeof shown !== 'string' || !shown.trim()) continue;
      if (s.chat === 'call') {
        out.push({ who: s.who, raw: VoiceLib.asPosted(s.who, shown), kind: 'call' });
        if (s.wording && s.wording !== s.text) out.push({ who: s.who, raw: VoiceLib.asPosted(s.who, s.text), kind: 'call' });
      } else if (shown.startsWith('voice:')) {
        out.push({ who: s.who, raw: shown, kind: 'voice' });
        if (s.wording && s.wording !== s.text && String(s.text).startsWith('voice:')) out.push({ who: s.who, raw: s.text, kind: 'voice' });
      }
    }
  }
  return out;
}

function loadData() {
  const ctx = vm.createContext({
    console, window: {},
    G: { test() { return false; }, s: { flags: {} }, flag() { return false; } },
    U: { esc: s => String(s), rich: s => String(s), tpl: s => String(s) },
    Art: { def() {} },
    Object, Array, JSON, Math, Date
  });
  const run = f => vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
  run('js/data/characters.js');
  vm.runInContext('DATA.evidence=DATA.evidence||{}; DATA.web=DATA.web||{}; DATA.conversations=DATA.conversations||{};', ctx);
  for (const f of ['js/data/world.js', 'js/data/conversations.js', 'js/data/season-conversations.js', 'js/data/field-threads.js', 'js/data/today.js', 'js/data/season-days.js']) {
    try { run(f); } catch (e) { /* plik bez głosu albo zależność poza ekstrakcją */ }
  }
  return vm.runInContext('DATA', ctx);
}

function sideLines(DATA) {
  const out = [];
  for (const d of Object.values(DATA.conversations || {})) {
    for (const node of Object.values(d.nodes || {})) {
      const bag = [...(node.lines || [])];
      for (const c of node.choices || []) bag.push(...(c.replies || []));
      for (const t of bag) {
        if (typeof t === 'string' && t.startsWith('voice:')) out.push({ who: d.who, raw: t, kind: 'voice' });
      }
    }
  }
  return out;
}

function mailbox(DATA) {
  const out = [];
  const seen = new Set();
  const add = (who, raw) => {
    const key = who + '\n' + raw;
    if (!raw || seen.has(key)) return;
    seen.add(key);
    out.push({ who, raw, kind: 'call' });
  };
  add('operator', 'Abonent jest czasowo niedostępny. Prosimy zadzwonić później.');
  add('operator', 'Wybrany numer nie istnieje. Sprawdź numer i spróbuj ponownie.');
  for (const [who, ch] of Object.entries(DATA.chars || {})) {
    if (!ch || typeof ch !== 'object') continue;
    if (ch.voicemail) add(/[„"]/.test(ch.voicemail) ? who : 'operator', ch.voicemail);
    else if (ch.name && ch.number) add('operator', `${ch.name} nie odbiera.`);
  }
  for (const c of DATA.contacts || []) if (c.auto) add('operator', c.auto);
  return out;
}

function collect() {
  const DATA = loadData();
  const all = [...storyLines(), ...sideLines(DATA), ...mailbox(DATA)];
  const uniq = new Map();
  for (const line of all) uniq.set(line.kind + '\n' + line.who + '\n' + line.raw, line);
  return [...uniq.values()];
}

module.exports = { collect, storyLines, loadData };

if (require.main === module) {
  const lines = collect();
  const by = {};
  for (const l of lines) by[l.kind] = (by[l.kind] || 0) + 1;
  console.log(lines.length, by);
}
