const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.join(__dirname,'..');
function game(){
 const storage=new Map();
 const ctx=vm.createContext({console,Date, setTimeout:()=>0,clearTimeout:()=>{},
  window:{addEventListener(){}},document:{addEventListener(){}},Art:{def(){}},
  localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)}});
 for(const f of ['js/core/util.js','js/data/migrations.js','js/core/state.js','js/data/characters.js','js/data/evidence.js','js/data/world.js','js/data/conversations.js','js/core/conversations.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx);
 return vm.runInContext('({G, DATA, Conversations})',ctx);
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
  unlock(G);G.s.pc=89;G.s.chapter='ch3';G.s.pending={chat:'group',type:'choose'};
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
 assert.equal(C.available('lena').length,0);
});
test('old version 2 saves and checkpoints accept the additive conversation state',()=>{
 const {G,Conversations:C}=game();unlock(G);delete G.s.conversations;
 G.checkpoint('ch1');assert.ok(G.loadCheckpoint('ch1'));
 assert.ok(C.open('kuba_quiet'));assert.equal(G.s.v,2);
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
