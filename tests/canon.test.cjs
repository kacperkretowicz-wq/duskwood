const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '..');

// Uruchamiamy prawdziwy formularz wniosku. Atrapa DOM pozwala klikać opcje
// bez serwera i bez kopiowania reguł walidacji z aplikacji.
function deduction(selected) {
  class El {
    constructor(tag, props, kids) { this.tag = tag; this.props = props; this.children = kids.filter(Boolean); this.classList = { toggle() {} }; }
    append(...kids) { this.children.push(...kids); }
    appendChild(kid) { this.children.push(kid); }
    set innerHTML(_) { this.children = []; }
    all() { return [this, ...this.children.flatMap(k => k instanceof El ? k.all() : [])]; }
  }
  let body, solved = false;
  const allIds = ['ev_owner', 'ev_kolo', 'ev_gajda_hunt', 'ev_car_igor', 'ev_marek', 'ev_not_gajda', 'ev_questions'];
  const G = {
    s: { ev: Object.fromEntries(allIds.map(id => [id, {}])) },
    test: () => true,
    ev: id => ({ id, cat: 'msg', title: id }),
    solve: () => { solved = true; }, inc() {}
  };
  const ctx = vm.createContext({
    console, window: {}, G, DATA: { evCat: { msg: { icon: 'note' } } },
    U: { h: (tag, props, ...kids) => new El(tag, props, kids), rich: s => s, icon: () => '' },
    UI: { def() {}, avatar: () => null, sheet: o => { body = o.body; return { close() {} }; }, modal() {} },
    SFX: { play: { discover() {}, error() {} } }
  });
  vm.runInContext(fs.readFileSync(path.join(root, 'js/data/world.js'), 'utf8'), ctx);
  // Jedyny eksport testowy zamkniętej funkcji; kod walidacji pozostaje bez zmian.
  const source = fs.readFileSync(path.join(root, 'js/apps/notes.js'), 'utf8');
  vm.runInContext(source.replace(/\}\)\(\);\s*$/, 'UI.auditSolve = solve; })();'), ctx);
  vm.runInContext('UI.auditSolve("ded_who")', ctx);
  body.all().find(e => e.props.class === 'ded-o').props.onclick();
  const rows = body.all().filter(e => e.props.class === 'row');
  for (const id of selected) {
    const row = rows.find(e => e.all().some(child => child.children.includes(id)));
    assert.ok(row, id);
    row.props.onclick({ currentTarget: row });
  }
  const send = body.all().find(e => e.props.class === 'btn pri wide');
  assert.equal(send.disabled, false);
  send.props.onclick();
  return solved;
}

test('wniosek o podejrzanym wymaga auta, dostępu do Ewy i śladu z huty', () => {
  assert.equal(deduction(['ev_owner', 'ev_kolo', 'ev_car_igor']), true);
  assert.equal(deduction(['ev_owner', 'ev_gajda_hunt', 'ev_marek']), true);
  assert.equal(deduction(['ev_owner', 'ev_kolo', 'ev_gajda_hunt']), false);
  assert.equal(deduction(['ev_not_gajda', 'ev_questions', 'ev_marek']), false);
});

test('nagranie przyznania lub groźby Marty działa także po wysłaniu jej plików', () => {
  let flags = {};
  const ctx = vm.createContext({ console, window: {}, G: { flag: k => !!flags[k] } });
  for (const f of ['js/core/engine.js', ...fs.readdirSync(path.join(root, 'js/story')).sort().map(f => 'js/story/' + f)])
    vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx);
  const resolve = vm.runInContext('Engine.chapters.g6.steps.find(s => s.t === "run" && s.fn.toString().includes("s.vars.s5Ending =")).fn', ctx);
  function ending(values) {
    flags = values;
    const state = { vars: {} };
    resolve(state);
    return state.vars.s5Ending;
  }
  for (const g_martaAsk of [false, true]) for (const admission of ['g_confess', 'g_threat']) {
    const values = { g_martaAsk, [admission]: true, g_recOn: true, g_recordMarta: true };
    assert.equal(ending(values), 'haslo');
    assert.equal(ending({ ...values, g_recOn: false }), 'echo');
    assert.equal(ending({ ...values, g_recordMarta: false, g_letGo: true }), 'echo');
    assert.equal(ending({ ...values, g_wipeAll: true }), 'cisza2');
  }
});

test('Kronika pokazuje wpis z 21.01 dopiero po publikacji, a szkic Oli nie staje się wpisem', () => {
  let flags = { c_day2: true, c_day3: true }, now = Date.parse('2027-01-21T20:59:00');
  const ctx = vm.createContext({
    DATA: { chars: {}, chats: {}, persons: {}, evidence: {}, web: {}, seasons: [], endings: {} },
    G: { flag: k => !!flags[k], now: () => now },
    U: { parseLocal: s => Date.parse(s) }
  });
  vm.runInContext(fs.readFileSync(path.join(root, 'js/data/case-kronika.js'), 'utf8'), ctx);
  const page = vm.runInContext('DATA.web.tt_kronika', ctx);
  const conclusion = vm.runInContext('DATA.endings.przewiniecie.text.at(-1)', ctx);
  assert.doesNotMatch(page.html(), /21\.01 · 21:00/);
  now = Date.parse('2027-01-21T21:00:00');
  assert.match(page.html(), /21\.01 · 21:00/);
  flags.c_olaFirst = true;
  assert.match(conclusion(), /nie publikuje/);
  flags.c_olaPosted = true;
  assert.match(conclusion(), /sama opowiada/);
});
