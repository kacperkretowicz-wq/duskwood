const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '..');
function stories() {
  const ctx = vm.createContext({console, window:{}});
  for (const f of ['js/core/engine.js', 'js/data/migrations.js', ...fs.readdirSync(path.join(root,'js/story')).sort().map(f=>'js/story/'+f)])
    vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx);
  return vm.runInContext('({chapters:Engine.chapters, migrations:STORY_MIGRATIONS, v3:STORY_MIGRATIONS_V3})',ctx);
}
test('all seven chapters compile with valid branch destinations',()=>{
  const {chapters} = stories();
  assert.deepEqual(Object.keys(chapters).sort(),['ch1','ch2','ch3','ch4','ch5','epilog','m0','m1','m2','m3','mp','prolog']);
  for(const ch of Object.values(chapters)) for(const step of ch.steps) {
    if(step.t==='go'||step.t==='ifnot') assert.ok(step.to in ch.labels,`${ch.id}: ${step.to}`);
    for(const item of [...(step.options||[]),...(step.accept||[]),...(step.answers||[])])
      if(item.lab)assert.ok(item.lab in ch.labels,`${ch.id}: ${item.lab}`);
  }
});
test('legacy saves remain at the same choices, discovery, and confession',()=>{
  const {chapters,migrations,v3}=stories();
  const up=(ch,pc)=>v3[ch]?v3[ch].exact[pc]:pc;
  const cases=[['prolog',173,s=>s.t==='choose'&&s.self==='c36'],['prolog',192,s=>s.t==='choose'&&s.self==='c41'],['ch3',308,s=>s.text==='kluska nie żyje od 7 lat'],['ch4',87,s=>s.t==='give'&&s.ev==='ev_igor_conf']];
  for(const [ch,pc,check] of cases)assert.ok(check(chapters[ch].steps[up(ch,migrations[ch][pc])]),`${ch}:${pc}`);
});
test('migrations preserve step order and stay inside each chapter',()=>{
  const {chapters,migrations}=stories();
  for(const [ch,map] of Object.entries(migrations)) for(let i=0;i<map.length;i++) {
    assert.ok(Number.isInteger(map[i]) && map[i]>=0 && map[i]<=chapters[ch].steps.length);
    if(i)assert.ok(map[i]>=map[i-1]);
  }
});

test('v3 migration: every v2 step maps to the identical step; resume lands on a new scene or the step itself',()=>{
  const {chapters,v3}=stories();
  const old=JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures/story-v2-steps.json'),'utf8'));
  const sig=s=>JSON.stringify([s.t,s.name,s.to,s.self,s.text,s.chat,s.who,s.ev,s.k,s.iso]);
  assert.deepEqual([...Object.keys(v3)].sort(),['ch2','ch3','ch5']);
  for(const [ch,steps] of Object.entries(old)){
    const m=v3[ch]||{exact:steps.map((_,i)=>i).concat(steps.length),resume:steps.map((_,i)=>i).concat(steps.length)};
    assert.equal(m.exact.length,steps.length+1);
    steps.forEach((o,i)=>{
      assert.equal(sig(chapters[ch].steps[m.exact[i]]),o.sig,`${ch}:${i}`);
      assert.ok(m.resume[i]<=m.exact[i]);
      for(let j=m.resume[i];j<m.exact[i];j++)assert.ok(chapters[ch].steps[j].scene,`${ch}:${i} resume skips only new scenes`);
    });
  }
  // Wybory starych scen zachowują identyfikatory (klucze s.used/s.tries).
  for(const [ch,steps] of Object.entries(old)){
    const oldSelves=steps.filter(s=>JSON.parse(s.sig)[3]).map(s=>JSON.parse(s.sig)[3]);
    const newSelves=[...chapters[ch].steps.filter(s=>s.self&&!s.scene).map(s=>s.self)];
    assert.deepEqual(newSelves,oldSelves,ch);
  }
});
test('every new scene compiles inside its chapter with namespaced labels',()=>{
  const {chapters}=stories();
  const ids=new Set();
  for(const ch of Object.values(chapters))for(const s of ch.steps)if(s.scene){ids.add(s.scene);if(s.t==='label')assert.ok(s.name.startsWith(s.scene+'.'),s.name);}
  assert.deepEqual(Array.from(ids).sort(),['s12','s13','s14','s15','s16','s17','s18','s19','s28','s29']);
});
test('generated v3 migration table is up to date with the story sources',()=>{
  const {execFileSync}=require('node:child_process');
  const gen=execFileSync(process.execPath,[path.join(root,'tools/gen-migration-v3.cjs'),path.join(__dirname,'fixtures/story-v2-steps.json')],{encoding:'utf8'});
  assert.ok(fs.readFileSync(path.join(root,'js/data/migrations.js'),'utf8').endsWith(gen),'run tools/gen-migration-v3.cjs');
});
