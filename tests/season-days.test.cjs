const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.join(__dirname,'..');
function game(){
 const storage=new Map();
 const ctx=vm.createContext({console,Date,setTimeout:()=>0,clearTimeout:()=>{},
  window:{addEventListener(){}},document:{addEventListener(){}},Art:{def(){}},
  localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)}});
 for(const f of ['js/core/util.js','js/data/migrations.js','js/core/state.js','js/data/characters.js','js/data/evidence.js','js/data/world.js','js/data/maja.js','js/data/conversations.js','js/data/season-conversations.js','js/data/dark-threads.js','js/data/season-days.js','js/core/conversations.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx);
 return vm.runInContext('({G, DATA, Conversations})',ctx);
}
const ids=()=>[];
test('Sylwia → Zuza → Darek unlock in story order, never earlier',()=>{
 const {G,Conversations:C}=game();G.newGame({name:'Alex',gender:'m'});
 const av=()=>Array.from(C.available(),x=>x[0]);
 assert.ok(!av().includes('sylwia_group'));assert.equal(C.open('zuza_tiktok'),null);
 G.addEv('ev_loc_1410',true);assert.ok(av().includes('sylwia_group'));assert.ok(!av().includes('zuza_tiktok'));
 C.open('sylwia_group');C.answer('sylwia_group','start',0);C.answer('sylwia_group','voice',0);
 assert.ok(G.has('ev_fb_henryk'));assert.ok(G.flag('metSylwia'));C.answer('sylwia_group','tiktok',1);
 assert.ok(av().includes('zuza_tiktok'));
 C.open('zuza_tiktok');for(const [n,i] of [['start',0],['clip',0],['source',0],['fix',0],['uncle',0]])assert.equal(C.answer('zuza_tiktok',n,i),true);
 assert.ok(G.has('ev_tt_reupload'));assert.ok(G.flag('zuzaCorrected'));assert.ok(G.flag('metZuza'));
 assert.ok(!av().includes('zuza_darek'),'Darek topic waits for Marek');
 G.addEv('ev_marek',true);assert.ok(av().includes('zuza_darek'));
});
test('Ola voice notes need the locker evidence and award the genesis note',()=>{
 const {G,Conversations:C}=game();G.newGame();
 assert.equal(C.open('ola_voice'),null);G.addEv('ev_dk97',true);C.open('ola_voice');
 for(const [n,i] of [['start',1],['voice',1],['after',0]])C.answer('ola_voice',n,i);
 assert.ok(C.state('ola_voice').done);assert.ok(G.has('ev_maja_voice'));
});
test('voice lines are well-formed and new people have portraits and ages',()=>{
 const {DATA}=game();
 for(const id of ['ola_voice','sylwia_group','zuza_tiktok','zuza_darek']){
  const d=DATA.conversations[id];
  const all=Object.values(d.nodes).flatMap(n=>[...(n.lines||[]),...n.choices.flatMap(c=>c.replies)]);
  for(const l of all.filter(l=>l.startsWith('voice:')))assert.match(l,/^voice:\d+:\d\d\|[^|]*\|.{10,}$/s);
 }
 for(const w of ['sylwia','zuza']){const c=DATA.chars[w];assert.ok(c.photo&&c.age&&c.role);assert.ok(fs.existsSync(path.join(root,c.photo)));}
 assert.equal(DATA.chars.zuza.age,16);assert.equal(DATA.chars.sylwia.age,35);
});
