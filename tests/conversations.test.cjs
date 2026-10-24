const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.join(__dirname,'..');
function game(){
 const storage=new Map();
 const ctx=vm.createContext({console,Date, setTimeout:()=>0,clearTimeout:()=>{},
  window:{addEventListener(){}},document:{addEventListener(){}},Art:{def(){}},
  localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)}});
 for(const f of ['js/core/util.js','js/data/migrations.js','js/core/state.js','js/data/characters.js','js/data/evidence.js','js/data/world.js','js/data/maja.js','js/data/conversations.js','js/data/season-conversations.js','js/data/dark-threads.js','js/data/season-days.js','js/data/field-threads.js','js/core/conversations.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx);
 return vm.runInContext('({G, DATA, Conversations, M:STORY_MIGRATIONS_V3, M4:STORY_MIGRATIONS_V4})',ctx);
}
function unlock(G){
 G.newGame({name:'Alex',gender:'f'}); G.unlock('chat:group');G.unlock('chat:weronika');
 for(const ev of ['ev_dam_news','ev_bartek_sms','ev_igor_conf'])G.addEv(ev,true);
}
test('topics follow evidence and never reveal Igor before the confession',()=>{
 const {G,Conversations:C}=game();G.newGame();
 assert.equal(C.all().length,0);assert.equal(C.open('lena_bus'),null);
 G.unlock('chat:group');assert.deepEqual(Array.from(C.available(),x=>x[0]),['kuba_quiet','ola_shift']);
 G.addEv('ev_dam_news',true);assert.ok(C.available().some(x=>x[0]==='lena_bus'));
 assert.equal(C.open('igor_after'),null);
});
test('every dialogue path terminates, saves once, and leaves main story intact',()=>{
 const {G,DATA,Conversations:C}=game();unlock(G);
 let paths=0;
 function routes(d,node='start',route=[]){
  return d.nodes[node].choices.flatMap((c,i)=>c.next?routes(d,c.next,[...route,[node,i]]):[[...route,[node,i]]]);
 }
 for(const [id,d]of Object.entries(DATA.conversations))for(const route of routes(d)){
  unlock(G);
  for(const ev of ['ev_not_gajda','ev_bartek_conf','ev_interview','ev_note_original','ev_note_revised','ev_tomek','ev_dk97','ev_loc_1410','ev_marek'])G.addEv(ev,true);
  G.setFlag('metSylwia');G.setFlag('metZuza');
  G.setFlag('wallpapersImported');G.solve('ded_bus');G.s.finished=true;G.setFlag('majaFound');G.s.vars.endingId='swit';
  if(id==='kuba_missing'){G.s.vars.endingId='cisza';G.s.flags.majaFound=false;}
  G.s.pc=89;G.s.chapter='ch3';G.s.pending={chat:'group',type:'choose'};
  G.unlock('chat:gajda');G.solve('ded_note_versions');
  G.addEv('ev_car_igor',true);G.addEv('ev_strap_field',true);G.setFlag('askedStrap');G.solve('ded_strap');
  if(['ola_container','kuba_room'].includes(id))G.s.flags.majaFound=false;
  if(id==='gajda_versions')G.s.finished=false;
  if(id==='maja_words')G.s.flags.noteCopyShared=route[0][1]===0;
  C.open(id);let trust=0;
  for(const [node,i]of route){
   const expected=d.nodes[node].choices[i];trust+=expected.trust||0;
   assert.equal(C.answer(id,node,i),true);
   assert.equal(C.answer(id,node,i),false,'stale answer cannot apply to a new node');
   G.save(true);assert.equal(G.load(),true,'resume after each decision');
  }
  assert.ok(C.state(id).done);assert.equal(G.v('trust_'+d.who),trust);
  assert.equal(G.s.pc,89);assert.equal(G.s.chapter,'ch3');assert.equal(G.s.pending.chat,'group');
  const n=C.state(id).transcript.length;C.open(id);assert.equal(C.state(id).transcript.length,n);
  assert.equal(C.answer(id,'start',0),false);assert.equal(G.v('trust_'+d.who),trust);
  paths++;
 }
 assert.ok(paths>=24);
});
test('Lena unlocks corroboration, gallery, and person facts without awarding a premature conclusion',()=>{
 const {G,Conversations:C}=game();unlock(G);C.open('lena_bus');
 for(const node of ['start','time','certainty'])C.answer('lena_bus',node,0);
 assert.ok(G.flag('metLena'));assert.ok(G.has('ev_lena_statement'));assert.ok(G.has('ev_bus_clock'));
 assert.ok(G.isUnlocked('ded:ded_bus'));assert.equal(G.has('ev_bus_verified'),false);
 assert.equal(G.s.saved.filter(x=>x.art==='bus_stop').length,1);
 G.solve('ded_bus');assert.ok(G.has('ev_bus_verified'));G.solve('ded_bus');
 assert.equal(Object.keys(G.s.ev).filter(id=>id==='ev_bus_verified').length,1);
 assert.deepEqual(Array.from(C.available('lena'),x=>x[0]),['lena_route']);
});
test('old version 2 saves and checkpoints accept the additive conversation state',()=>{
 const {G,Conversations:C}=game();unlock(G);delete G.s.conversations;
 G.s.v=2;G.checkpoint('ch1');assert.ok(G.loadCheckpoint('ch1'));
 assert.ok(C.open('kuba_quiet'));assert.equal(G.s.v,13);
});
test('character ages, evidence references, and dialogue destinations are valid',()=>{
 const {DATA}=game();
 for(const id of ['kuba','ola','bartek','igor','maja','lena'])assert.ok(DATA.chars[id].age>=19&&DATA.chars[id].age<=24);
 for(const d of Object.values(DATA.conversations)){
  assert.ok(DATA.chars[d.who]);assert.ok(d.nodes.start);
  for(const n of Object.values(d.nodes))for(const c of n.choices)if(c.next)assert.ok(d.nodes[c.next]);
  for(const ev of d.reward||[])assert.ok(DATA.evidence[ev]);
  if(d.deduction)assert.ok(DATA.deductions[d.deduction]);
 }
});

test('note disclosures apply once, survive reload, and stop when the rescue starts',()=>{
 const {G,Conversations:C}=game();unlock(G);G.s.chapter='ch3';G.unlock('chat:gajda');
 assert.equal(C.open('gajda_versions'),null,'no future note is revealed');
 G.addEv('ev_note_revised',true);C.open('gajda_versions');
 const pending={type:'choose',chat:'group'};G.s.pending=pending;G.s.pc=101;
 assert.ok(C.answer('gajda_versions','start',1));
 assert.equal(G.v('leaks'),1);assert.ok(G.flag('noteCopyShared'));assert.ok(G.has('ev_note_shared'));
 assert.equal(C.answer('gajda_versions','start',1),false);
 G.save(true);G.load();assert.equal(G.v('leaks'),1);
 const length=C.state('gajda_versions').transcript.length;
 C.open('gajda_versions');assert.equal(C.state('gajda_versions').transcript.length,length);
 G.s.chapter='ch5';
 assert.ok(C.open('gajda_versions'),'existing transcript stays readable');
 assert.equal(C.available('gajda').length,0);
 assert.equal(C.answer('gajda_versions','boundary',0),false,'no disclosure during rescue');
 assert.equal(G.s.pc,101);assert.equal(G.s.pending.chat,'group');
 unlock(G);G.s.chapter='ch3';G.unlock('chat:gajda');G.addEv('ev_note_revised',true);
 C.open('gajda_versions');C.answer('gajda_versions','start',0);
 assert.equal(G.v('leaks'),0);assert.equal(G.has('ev_note_shared'),false);
 assert.ok(G.flag('noteCopyRefused'));
});

test('Maja’s response respects disclosure, rescue, and persisted memory',()=>{
 const {G,Conversations:C}=game();unlock(G);G.solve('ded_note_versions');
 assert.equal(C.open('maja_words'),null);G.s.finished=true;G.s.flags.majaFound=false;
 assert.equal(C.open('maja_words'),null,'no messages from missing Maja');
 G.setFlag('majaFound');C.open('maja_words');
 assert.equal(C.answer('maja_words','start',0),false,'hidden conditional reply cannot be forged');
 assert.equal(C.answer('maja_words','start',1),true);
 G.save(true);G.load();assert.equal(C.state('maja_words').node,'voice');
 unlock(G);G.s.finished=true;G.setFlag('majaFound');G.solve('ded_note_versions');G.setFlag('noteCopyShared');
 const shared=C.open('maja_words');assert.match(shared.transcript.at(-1).text,/dostał te zapisy/);
 assert.equal(C.answer('maja_words','start',1),false);
 assert.equal(C.answer('maja_words','start',0),true);
 const saved=JSON.stringify(C.state('maja_words').transcript);G.save(true);G.load();C.open('maja_words');
 assert.equal(JSON.stringify(C.state('maja_words').transcript),saved);
});

test('versioned note has consistent dates and is not a shortcut into the finale',()=>{
 const {G,DATA}=game();unlock(G);const note=DATA.maja.notes.find(n=>n.id==='pojemnik');
 assert.equal(G.isUnlocked(note.unlock),false);G.unlock('maja:sync1');assert.ok(G.isUnlocked(note.unlock));
 assert.equal(note.versions.length,2);assert.equal(note.t,note.versions[1].t);
 assert.ok(note.versions[0].t<'2026-10-14T23:44');assert.ok(note.t<note.synced);
 const d=DATA.deductions[note.deduction];
 assert.deepEqual(Array.from(d.support.from),Array.from(note.versions,v=>v.ev));
 for(const v of note.versions)assert.ok(DATA.evidence[v.ev]);
 assert.equal(d.answer,'changed');
 const notesSource=fs.readFileSync(path.join(root,'js/apps/notes.js'),'utf8');
 const key=notesSource.match(/const KEY = \[([^;]+)\];/)[1];
 assert.equal(/ev_note/.test(key),false,'extra clues do not inflate key evidence score');
});

test('physical clue attachments appear once, need viewing, and archive before Marek’s confession',()=>{
 const {G,Conversations:C}=game();unlock(G);G.s.chapter='ch3';G.addEv('ev_car_igor',true);
 assert.equal(C.open('kuba_strap'),null);G.addEv('ev_bartek_conf',true);
 const s=C.open('kuba_strap');assert.equal(s.transcript.filter(m=>m.img==='strap_door').length,1);
 assert.equal(G.has('ev_strap_field'),false,'receiving a thumbnail does not inspect it');
 C.open('kuba_strap');G.save(true);G.load();C.open('kuba_strap');
 assert.equal(G.s.saved.filter(x=>x.art==='strap_door').length,1);
 C.answer('kuba_strap','start',0);C.answer('kuba_strap','finish',0);
 assert.equal(C.open('bartek_strap'),null);G.addEv('ev_strap_field',true);C.open('bartek_strap');
 assert.equal(G.has('ev_strap_loan'),false,'future ledger is not awarded on first node');
 for(const n of ['start','ledger','father'])C.answer('bartek_strap',n,0);
 assert.ok(G.has('ev_strap_loan'));assert.ok(G.isUnlocked('ded:ded_strap'));
 G.setFlag('marekTestify');assert.ok(C.open('bartek_strap'),'history survives');
 assert.equal(C.open('bartek_locker'),null,'no plans to first confront a father who has already confessed');
 assert.equal(C.available('bartek').some(([id])=>id==='bartek_strap'),false);
});

test('person facts do not turn an appointment or workshop jacket into a confirmed identification',()=>{
 const {G,DATA}=game();unlock(G);G.addEv('ev_jacket',true);
 let facts=DATA.persons.bartek.facts.filter(f=>G.test(f.cond));
 assert.equal(facts.some(f=>/spotkał|Przyznał/.test(f.text)),false);
 assert.equal(DATA.timeline.filter(t=>G.test(t.cond)).some(t=>t.title==='Bartek nocą w hucie.'),false);
 G.addEv('ev_bartek_conf',true);facts=DATA.persons.bartek.facts.filter(f=>G.test(f.cond));
 assert.ok(facts.some(f=>/spotkał/.test(f.text)));assert.ok(facts.some(f=>/Przyznał/.test(f.text)));
});

test('v2 save inside chapter 2 resumes at the new Komendant scene; a pending choice stays on its step',()=>{
 const {G,M}=game();
 const old=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/story-v2-steps.json'),'utf8')).ch2;
 const i=old.findIndex(st=>JSON.parse(st.sig)[4]==='słuchajcie, jeszcze ta klisza. maja dała mi negatywy do skanu w zeszłym tygodniu');
 assert.ok(i>0);assert.ok(M.ch2.resume[i]<M.ch2.exact[i]);
 for(const [pending,want] of [[null,M.ch2.resume[i]],[{chat:'group',type:'choose',options:[]},M.ch2.exact[i]]]){
  G.newGame({name:'Alex',gender:'f'});G.s.v=2;G.s.chapter='ch2';G.s.pc=i;G.s.pending=pending;G.s.flags.keep=true;G.save(true);
  assert.equal(G.load(),true);assert.equal(G.s.v,13);assert.ok(G.s.flags.keep);assert.equal(G.s.pc,want);
  G.save(true);assert.equal(G.load(),true);assert.equal(G.s.pc,want,'second load does not migrate again');
 }
});

test('v3 save in chapter 4 (Igor confession) and m2 lands on the same step after the quality pass; v4 saves are untouched',()=>{
 const {G,M4}=game();
 const old=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/story-v3-steps.json'),'utf8'));
 for(const [ch,text] of [['ch4','ciągle sobie odtwarzam jak wchodzę do tej kuchni. mogłem nic nie mówić'],['m3','moja mama to Janina Kurek']]){
  const i=old[ch].findIndex(s=>JSON.parse(s)[4]===text);assert.ok(i>0,ch);
  G.newGame({name:'Alex',gender:'f'});G.s.v=3;G.s.chapter=ch;G.s.pc=i;G.save(true);
  assert.equal(G.load(),true);assert.equal(G.s.v,13);
  const want=M4[ch]?M4[ch].resume[i]:i;assert.equal(G.s.pc,want,ch);
  G.save(true);assert.equal(G.load(),true);assert.equal(G.s.pc,want,'no double migration');
 }
 assert.ok(M4.ch4.exact.some((x,i)=>x!==i),'ch4 shifted by the new reaction scene');
});
test('v4 save in chapter 3 after the Maja SMS keeps its step after the v5 scenes',()=>{
 const {G}=game();
 const M5=STORY_V5();
 const old=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/story-v4-steps.json'),'utf8'));
 const i=old.ch3.findIndex(s=>JSON.parse(s)[4]==='kluska nie żyje od 7 lat');assert.ok(i>0);
 G.newGame({name:'Alex',gender:'f'});G.s.v=4;G.s.chapter='ch3';G.s.pc=i;G.s.flags.keep=true;G.save(true);
 assert.equal(G.load(),true);assert.equal(G.s.v,13);assert.ok(G.s.flags.keep);assert.equal(G.s.pc,M5.ch3.resume[i]);assert.ok(M5.ch3.exact[i]>i);
 G.save(true);assert.equal(G.load(),true);assert.equal(G.s.pc,M5.ch3.resume[i],'no double migration');
});
function STORY_V5(){const src=fs.readFileSync(path.join(root,'js/data/migrations.js'),'utf8');return JSON.parse(src.split('STORY_MIGRATIONS_V5 = ')[1].split(';\n')[0]);}
test('v6: chapter 3 split by the s1_plate rest; v5 saves before, at and after the split keep progress',()=>{
 const {G}=game();
 const src=fs.readFileSync(path.join(root,'js/data/migrations.js'),'utf8');
 const M6=JSON.parse(src.split('STORY_MIGRATIONS_V6 = ')[1].split(';\n')[0]);
 const old=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/story-v5-steps.json'),'utf8'));
 const at=old.ch3.findIndex(s=>JSON.parse(s)[10]==='s18');assert.ok(at>0);
 const anon=require('../tools/dump-steps.cjs').chapters.ch3.steps.filter(x=>x.scene==='xAnonim').length;// v7 dopisała scenę za podziałem
 const cases=[[at-1,at-1],[at,at+1],[at+5,at+6],[old.ch3.length-1,old.ch3.length+anon]];
 for(const [pc,want] of cases){
  G.newGame({name:'Alex',gender:'f'});G.s.v=5;G.s.chapter='ch3';G.s.pc=pc;G.s.flags.keep=true;G.save(true);
  assert.equal(G.load(),true);assert.equal(G.s.v,13);assert.ok(G.s.flags.keep);assert.equal(G.s.pc,want,'pc '+pc);
  assert.equal(M6.ch3.exact[pc],want);
  G.save(true);assert.equal(G.load(),true);assert.equal(G.s.pc,want,'no double migration');
 }
});
test('v7: scene xAnonim in chapter 3; v6 saves before and after it keep progress',()=>{
 const {G}=game();
 const src=fs.readFileSync(path.join(root,'js/data/migrations.js'),'utf8');
 const M7=JSON.parse(src.split('STORY_MIGRATIONS_V7 = ')[1].split(';\n')[0]);
 const old=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/story-v6-steps.json'),'utf8'));
 const at=old.ch3.findIndex(s=>JSON.parse(s)[4]==='jest coś jeszcze?');assert.ok(at>0);
 const added=M7.ch3.exact[at]-at;assert.ok(added>0);assert.equal(M7.ch3.resume[at],at,'zapis tuż za nową sceną wraca na jej początek');
 for(const [pc,want] of [[at-1,at-1],[at,at],[old.ch3.length-1,old.ch3.length-1+added]]){
  G.newGame({name:'Alex',gender:'f'});G.s.v=6;G.s.chapter='ch3';G.s.pc=pc;G.s.flags.keep=true;G.save(true);
  assert.equal(G.load(),true);assert.equal(G.s.v,13);assert.ok(G.s.flags.keep);assert.equal(G.s.pc,want,'pc '+pc);
  G.save(true);assert.equal(G.load(),true);assert.equal(G.s.pc,want,'no double migration');
 }
});
test('v8: scene xJednaOsoba in c4; v7 saves before and after it keep progress',()=>{
 const {G}=game();
 const src=fs.readFileSync(path.join(root,'js/data/migrations.js'),'utf8');
 const M8=JSON.parse(src.split('STORY_MIGRATIONS_V8 = ')[1].split(';\n')[0]);
 const old=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/story-v7-steps.json'),'utf8'));
 const at=old.c4.findIndex(s=>JSON.parse(s)[4]==='jestem przy telewizorze. dziadek śpi. pies śpi');assert.ok(at>0);
 const added=M8.c4.exact[at]-at;assert.ok(added>0);
 for(const pc of [0,at,old.c4.length-1]){const want=M8.c4.exact[pc],from=M8.c4.resume[pc];
  G.newGame({name:'Alex',gender:'f'});G.s.v=7;G.s.chapter='c4';G.s.pc=pc;G.s.flags.keep=true;G.save(true);
  assert.equal(G.load(),true);assert.equal(G.s.v,13);assert.ok(G.s.flags.keep);assert.ok(G.s.pc<=want&&G.s.pc>=from,'pc '+pc+' → '+G.s.pc);
  G.save(true);assert.equal(G.load(),true);assert.ok(G.s.pc<=want,'no double migration');
 }
});
test('v9: payoffs in c4 endings; v8 and v6 saves map once to current steps (no chained double shift)',()=>{
 const {G}=game();
 const src=fs.readFileSync(path.join(root,'js/data/migrations.js'),'utf8');
 const tab=n=>JSON.parse(src.split('STORY_MIGRATIONS_V'+n+' = ')[1].split(';\n')[0]);
 for(const [v,n,fx] of [[8,9,'story-v8-steps.json'],[6,7,'story-v6-steps.json']]){
  const M=tab(n),old=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures',fx),'utf8'));
  for(const pc of [0,Math.floor(old.c4.length/2),old.c4.length-1]){
   G.newGame({name:'Alex',gender:'m'});G.s.v=v;G.s.chapter='c4';G.s.pc=pc;G.save(true);
   assert.equal(G.load(),true);assert.equal(G.s.v,13);assert.equal(G.s.pc,M.c4.resume[pc],'v'+v+' pc '+pc);
  }
 }
});
