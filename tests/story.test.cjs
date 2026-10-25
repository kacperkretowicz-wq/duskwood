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
  assert.deepEqual(Object.keys(chapters).sort(),['c0','c1','c2','c3','c4','cf','ch1','ch2','ch3','ch4','ch5','epilog','g0','g1','g2','g3','g4','g5','g6','k0','k1','k2','k3','k4','kp','m0','m1','m2','m3','m4','m5','mp','prolog']);
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
  assert.deepEqual([...Object.keys(v3)].sort(),['ch1','ch2','ch3','ch4','ch5','epilog','prolog']);
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
  const fixed=['epBartek','epIgor','epOla','f3ewa','f3lena','f3lib','f3noc','f3reset','igorMid','m2anon','m2kto','m2zrzut','m3kier','m5babcia','s12','s13','s13at','s13go','s14','s15','s16','s17','s18','s19','s28','s29'];
  // sceny straszaków mają prefiks „sc” i zawierają co najmniej jeden krok scare
  // sceny sprawy 3 (prefiks „k”) są w nowych rozdziałach, poza migracją v4
  assert.deepEqual(Array.from(ids).filter(x=>!/^(sc|k|x)[A-Z]/.test(x)).sort(),fixed);
});
test('generated v3 migration table is up to date with the story sources',()=>{
  const {execFileSync}=require('node:child_process');
  const gen=execFileSync(process.execPath,[path.join(root,'tools/gen-migration-v3.cjs'),path.join(__dirname,'fixtures/story-v2-steps.json')],{encoding:'utf8'});
  assert.ok(fs.readFileSync(path.join(root,'js/data/migrations.js'),'utf8').replace(/\r\n/g,'\n').endsWith(gen.replace(/\r\n/g,'\n')),'run tools/gen-migration-v3.cjs');
});

test('v4 migration table is up to date and maps every v3 step monotonically',()=>{
  const {execFileSync}=require('node:child_process');
  const gen=execFileSync(process.execPath,[path.join(root,'tools/gen-migration-v4.cjs'),path.join(__dirname,'fixtures/story-v3-steps.json')],{encoding:'utf8'});
  const src=fs.readFileSync(path.join(root,'js/data/migrations.js'),'utf8');
  assert.ok(src.replace(/\r\n/g,'\n').includes(gen.replace(/\r\n/g,'\n')),'run tools/gen-migration-v4.cjs');
  const v4=JSON.parse(gen.split('V4 = ')[1].replace(/;\s*$/,''));
  const old=JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures/story-v3-steps.json'),'utf8'));
  const {chapters,sig}=require(path.join(root,'tools/dump-steps.cjs'));
  for(const [ch,m] of Object.entries(v4)){
    assert.equal(m.exact.length,old[ch].length+1,ch);
    m.exact.forEach((x,i)=>{assert.ok(x>=0&&x<=chapters[ch].steps.length);if(i)assert.ok(x>=m.exact[i-1],ch+':'+i);assert.ok(m.resume[i]<=x);});
    // identyfikatory wyborów spoza nowych scen się nie przesuwają (klucze s.used / s.tries)
    const oldSelves=old[ch].map(o=>JSON.parse(o)).filter(a=>a[3]&&!a[10]).map(a=>a[3]);
    const newSelves=chapters[ch].steps.filter(st=>st.self&&!(st.scene&&!old[ch].some(o=>JSON.parse(o)[10]===st.scene))).map(st=>st.self);
    assert.equal(JSON.stringify(newSelves.filter(x=>!x.includes('.'))),JSON.stringify(oldSelves.filter(x=>!x.includes('.'))),ch);
    // każdy wybór, który przetrwał bez zmian, trafia dokładnie na siebie
    old[ch].forEach((o,i)=>{const t=JSON.parse(o)[0];if(t==='choose'&&chapters[ch].steps.map(sig).includes(o))assert.equal(sig(chapters[ch].steps[m.exact[i]]),o,ch+':'+i);});
  }
});

test('every scare has a unique id, sits in its own scene and is rare (≤3 per chapter)',()=>{
  const {chapters}=stories();const seen=new Set();
  for(const [ch,c] of Object.entries(chapters)){
    const sc=c.steps.filter(st=>st.t==='scare');
    assert.ok(sc.length<=3,ch+': za dużo straszaków');
    for(const st of sc){assert.ok(!seen.has(st.id),st.id);seen.add(st.id);assert.ok(st.scene&&/^sc[A-Z]/.test(st.scene),st.id+' w scenie sc*');assert.ok(['call','photo','face','glitch','breath'].includes(st.kind));}
  }
  assert.ok(seen.size>=4);
});

test('v5 migration table is up to date; v4 saves map monotonically and keep choice ids',()=>{
  const {execFileSync}=require('node:child_process');
  const gen=execFileSync(process.execPath,[path.join(root,'tools/gen-migration-v5.cjs'),path.join(__dirname,'fixtures/story-v4-steps.json')],{encoding:'utf8'});
  const src=fs.readFileSync(path.join(root,'js/data/migrations.js'),'utf8');
  assert.ok(src.replace(/\r\n/g,'\n').includes(gen.replace(/\r\n/g,'\n')),'run tools/regen-migrations.cjs');
  const v5=JSON.parse(gen.split('V5 = ')[1].replace(/;\s*$/,''));
  const old=JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures/story-v4-steps.json'),'utf8'));
  const {chapters,sig}=require(path.join(root,'tools/dump-steps.cjs'));
  for(const [ch,m] of Object.entries(v5)){
    assert.equal(m.exact.length,old[ch].length+1,ch);
    m.exact.forEach((x,i)=>{assert.ok(x>=0&&x<=chapters[ch].steps.length);if(i)assert.ok(x>=m.exact[i-1],ch+':'+i);assert.ok(m.resume[i]<=x);});
    // każdy krok v4 nadal istnieje i trafia dokładnie na siebie (pakiet tylko dopisuje sceny)
    // nazwy etykiet (ie15 itd.) są numerowane automatycznie i mogą się przesunąć po dopisaniu iff — porównujemy bez numerów
    const nl=x=>x.replace(/"((?:[A-Za-z0-9]+\.)?[a-z]{1,2})\d+"/g,'"$1#"');
    old[ch].forEach((o,i)=>assert.equal(nl(sig(chapters[ch].steps[m.exact[i]])),nl(o),ch+':'+i));
    for(let i=0;i<old[ch].length;i++)for(let j=m.resume[i];j<m.exact[i];j++)assert.ok(chapters[ch].steps[j].scene,ch+':'+i+' resume skips only new scenes');
  }
});
test('every wording written in story sources reaches a compiled step or option', ()=>{
  // Pomocnicze funkcje (c, H, V…) muszą przekazywać opcje dalej — inaczej wording po cichu przepada.
  const {chapters}=stories();
  const got=[];
  for(const ch of Object.values(chapters))for(const st of ch.steps){if(st.wording)got.push(st.wording);for(const o of [...(st.options||[]),...(st.accept||[]),...(st.answers||[])])if(o.wording)got.push(o.wording);}
  const all=got.join('\n');
  const src=fs.readdirSync(path.join(root,'js/story')).map(f=>fs.readFileSync(path.join(root,'js/story',f),'utf8')).join('\n');
  const re=/wording:\s*'((?:[^'\\]|\\.)*)'/g;let m;const miss=[];
  while((m=re.exec(src))){const w=m[1].replace(/\\'/g,"'");if(!all.includes(w.slice(0,40)))miss.push(w.slice(0,80));}
  assert.deepEqual(miss,[]);
});

test('w grupie imię gracza nie stoi w mianowniku po „dodałem” ani „głosem”',()=>{
  const {chapters}=stories();
  const added=chapters.prolog.steps.find(s=>s.chat==='group'&&s.who==='kuba'&&/dodałem/.test(s.wording||''));
  assert.ok(added);assert.match(added.wording,/\{go\|ją\}/);assert.doesNotMatch(added.wording,/dodałem %name%/);
  const voice=chapters.g1.steps.find(s=>/brzmi jak %name%/.test(s.wording||''));
  assert.ok(voice);assert.doesNotMatch(voice.text,/brzmi jak/);
  const toast=chapters.g6.steps.find(s=>s.wording==='%name%. za normalną sobotę');
  assert.ok(toast);
});
test('godzina na karcie rozdziału zgadza się z pierwszym zegarem rozdziału', ()=>{
  const {chapters} = stories(); const bad = [];
  for (const [id, c] of Object.entries(chapters)) {
    const w = String(c.when || '').match(/(\d{1,2}):(\d\d)\s*$/); const st = c.steps.find(s => s.t === 'clock');
    if (!w || !st || !st.iso) continue;
    const t = w[1].padStart(2, '0') + ':' + w[2];
    if (st.iso.slice(11, 16) !== t) bad.push(`${id}: ${c.when} ≠ ${st.iso}`);
  }
  assert.deepEqual(bad, []);
});
