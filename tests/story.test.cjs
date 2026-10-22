const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '..');
function stories() {
  const ctx = vm.createContext({console, window:{}});
  for (const f of ['js/core/engine.js', 'js/data/migrations.js', ...fs.readdirSync(path.join(root,'js/story')).map(f=>'js/story/'+f)])
    vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx);
  return vm.runInContext('({chapters:Engine.chapters, migrations:STORY_MIGRATIONS})',ctx);
}
test('all seven chapters compile with valid branch destinations',()=>{
  const {chapters} = stories();
  assert.deepEqual(Object.keys(chapters).sort(),['ch1','ch2','ch3','ch4','ch5','epilog','prolog']);
  for(const ch of Object.values(chapters)) for(const step of ch.steps) {
    if(step.t==='go'||step.t==='ifnot') assert.ok(step.to in ch.labels,`${ch.id}: ${step.to}`);
    for(const item of [...(step.options||[]),...(step.accept||[]),...(step.answers||[])])
      if(item.lab)assert.ok(item.lab in ch.labels,`${ch.id}: ${item.lab}`);
  }
});
test('legacy saves remain at the same choices, discovery, and confession',()=>{
  const {chapters,migrations}=stories();
  const cases=[['prolog',173,s=>s.t==='choose'&&s.self==='c36'],['prolog',192,s=>s.t==='choose'&&s.self==='c41'],['ch3',308,s=>s.text==='kluska nie żyje od 7 lat'],['ch4',87,s=>s.t==='give'&&s.ev==='ev_igor_conf']];
  for(const [ch,pc,check] of cases)assert.ok(check(chapters[ch].steps[migrations[ch][pc]]),`${ch}:${pc}`);
});
test('migrations preserve step order and stay inside each chapter',()=>{
  const {chapters,migrations}=stories();
  for(const [ch,map] of Object.entries(migrations)) for(let i=0;i<map.length;i++) {
    assert.ok(Number.isInteger(map[i]) && map[i]>=0 && map[i]<=chapters[ch].steps.length);
    if(i)assert.ok(map[i]>=map[i-1]);
  }
});
