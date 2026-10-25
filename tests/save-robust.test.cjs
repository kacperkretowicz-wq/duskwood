// Zapis: brak miejsca usuwa stare punkty kontrolne, uszkodzony zapis/punkt nie wywraca gry.
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.join(__dirname,'..');
function game(limit){
  const data={};const size=()=>Object.values(data).reduce((a,v)=>a+v.length,0);
  const ls={getItem:k=>k in data?data[k]:null,setItem:(k,v)=>{const old=data[k]||'';if(size()-old.length+v.length>limit)throw new Error('QuotaExceeded');data[k]=v;},removeItem:k=>{delete data[k];}};
  const lsP=new Proxy(ls,{ownKeys:()=>Object.keys(data),getOwnPropertyDescriptor:(t,k)=>k in data?{enumerable:true,configurable:true,value:data[k]}:undefined});
  const ctx=vm.createContext({console:{warn(){},log(){},error(){}},Date,setTimeout:()=>0,clearTimeout:()=>{},window:{addEventListener(){}},document:{addEventListener(){},hidden:false},Art:{def(){}},localStorage:lsP});
  for(const f of ['js/core/util.js','js/data/migrations.js','js/core/state.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx);
  return {G:vm.runInContext('G',ctx),data};
}
test('brak miejsca: usuwa najstarsze punkty kontrolne i zapisuje grę',()=>{
  const {G,data}=game(1e9);G.newGame();const one=JSON.stringify(G.s).length;
  G.checkpoint('ch1');G.checkpoint('ch2');
  const g2=game(one*2.6);Object.assign(g2.data,data);g2.G.load();
  g2.G.s.vars.big='x'.repeat(Math.ceil(one*0.5));g2.G.save(true);
  assert.ok(JSON.parse(g2.data['mglisko.save.v1']).vars.big,'zapis bieżący przetrwał');
  assert.ok(!('mglisko.cp.v1.ch1' in g2.data),'najstarszy punkt usunięty');
});
test('uszkodzony zapis zostaje odłożony, uszkodzony punkt kontrolny zwraca false',()=>{
  const {G,data}=game(1e9);data['mglisko.save.v1']='{zepsute';
  assert.equal(G.load(),false);assert.equal(data['mglisko.save.v1.corrupt'],'{zepsute');
  G.newGame();data['mglisko.cp.v1.ch2']='{zepsute';
  assert.equal(G.loadCheckpoint('ch2'),false);assert.ok(G.s,'stan gry nienaruszony');
});
