// Łańcuch migracji: zapis z każdej historycznej wersji (fixture story-vN-steps.json) w wielu punktach
// każdego rozdziału trafia po wczytaniu na ten sam krok w bieżącej historii (albo na dopisaną scenę tuż przed nim).
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.join(__dirname,'..');
const {chapters,sig}=require(path.join(root,'tools/dump-steps.cjs'));
const nl=x=>x.replace(/"((?:[A-Za-z0-9]+\.)?[a-z]{1,2})\d+"/g,'"$1#"');
function game(){
 const storage=new Map();
 const ctx=vm.createContext({console,Date,setTimeout:()=>0,clearTimeout:()=>{},
  window:{addEventListener(){}},document:{addEventListener(){}},Art:{def(){}},
  localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)}});
 for(const f of ['js/core/util.js','js/data/migrations.js','js/core/state.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx);
 return vm.runInContext('G',ctx);
}
const fixtures=fs.readdirSync(path.join(__dirname,'fixtures')).map(f=>/^story-v(\d+)-steps\.json$/.exec(f)).filter(Boolean).map(m=>+m[1]).sort((a,b)=>a-b);
test('fixtures exist for every save version from v2 up to current-1',()=>{
 const G=game();G.newGame({name:'A',gender:'f'});const cur=G.s.v;
 for(let v=2;v<cur;v++)assert.ok(fixtures.includes(v),'brak tests/fixtures/story-v'+v+'-steps.json — zrzuć kroki przed zmianą historii');
});
for(const v of fixtures)test('chain v'+v+' → current: saves land on the same step in every chapter',()=>{
 const G=game();G.newGame({name:'A',gender:'f'});const cur=G.s.v;
 const old=JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures/story-v'+v+'-steps.json'),'utf8'));
 let checked=0;
 for(const [ch,steps] of Object.entries(old)){
  const now=chapters[ch];if(!now)continue;
  // v2 zapisywał sygnatury bez pola sceny (obiekty {sig}); porównujemy wtedy pierwsze 10 pól
  const legacy=typeof steps[0]==='object';
  const osig=i=>nl(legacy?steps[i].sig:steps[i]);
  const csig=st=>nl(legacy?JSON.stringify(JSON.parse(sig(st)).slice(0,10)):sig(st));
  const present=new Set(now.steps.map(csig));
  let prev=-1;
  const oldScenes=new Set(steps.map(s=>typeof s==='object'?s.scene:JSON.parse(s)[10]).filter(Boolean));
  const L=steps.length;
  const pts=[...new Set([0,1,Math.floor(L/4),Math.floor(L/2),Math.floor(3*L/4),L-2,L-1].filter(i=>i>=0&&i<L))];
  for(const pc of pts)for(const pending of [false,true]){
   G.newGame({name:'A',gender:'f'});G.s.v=v;G.s.chapter=ch;G.s.pc=pc;G.s.pending=pending||undefined;G.s.flags.marker=true;G.save(true);
   assert.equal(G.load(),true);
   const at=`v${v} ${ch}:${pc}${pending?' (wybór)':''} → ${G.s.pc}`;
   assert.equal(G.s.v,cur,at);assert.ok(G.s.flags.marker,at);
   assert.ok(Number.isInteger(G.s.pc)&&G.s.pc>=0&&G.s.pc<now.steps.length,at);
   // pomiń dopisane później sceny (nie istniały w tej wersji), potem krok musi być tym samym krokiem
   if(!pending){assert.ok(G.s.pc>=prev,at+': kolejność zachowana');prev=G.s.pc;}
   // krok przepisany w redakcji (tekst zmieniony) — wystarczy zachowana kolejność i zakres
   if(present.has(osig(pc))){
    let j=G.s.pc;while(j<now.steps.length&&now.steps[j].scene&&!oldScenes.has(now.steps[j].scene)&&csig(now.steps[j])!==osig(pc))j++;
    assert.equal(csig(now.steps[j]),osig(pc),at+' (krok '+j+')');
    if(pending)assert.equal(G.s.pc,j,at+': zapis w wyborze wraca dokładnie do wyboru');
   }
   // drugie wczytanie niczego nie przesuwa
   const p1=G.s.pc;G.save(true);assert.equal(G.load(),true);assert.equal(G.s.pc,p1,at+' podwójna migracja');
   checked++;
  }
 }
 assert.ok(checked>20,'za mało punktów: '+checked);
});
