// Cel w „Co teraz?” gaśnie, gdy warunek czekania jest spełniony — także gdy wait nie niesie tekstu celu.
const {test}=require('node:test'), assert=require('node:assert/strict');
const fs=require('node:fs'), vm=require('node:vm'), path=require('node:path');
const root=path.join(__dirname,'..');
function game(){
 const store=new Map();
 const document={hidden:false,addEventListener(){}};
 const ctx=vm.createContext({console,Date,setTimeout,clearTimeout,document,window:{addEventListener(){}},Art:{def(){}},
  localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k),key:()=>null,length:0}});
 const files=['core/util','data/migrations','core/state','core/engine','data/characters','data/evidence',
  'data/world','data/maja','data/web','data/conversations','data/season-conversations','data/dark-threads',
  'data/season-days','data/field-threads','data/seasons','data/case-most','data/case-kopia',
  'data/case-kronika','data/case-glos','data/today','data/rhythm','core/conversations','core/seasons','core/pacing'];
 for(const f of files)vm.runInContext(fs.readFileSync(path.join(root,'js',f+'.js'),'utf8'),ctx,{filename:f});
 for(const f of fs.readdirSync(path.join(root,'js/story')).sort())vm.runInContext(fs.readFileSync(path.join(root,'js/story',f),'utf8'),ctx,{filename:f});
 const api=vm.runInContext('({G,Engine})',ctx);
 api.G.newGame({name:'Hania',gender:'f'});
 api.G.settings.autoHints=false;
 api.G.settings.speed='instant';
 return api;
}
function until(fn,ms=4000){
 const t0=Date.now();
 return new Promise((res,rej)=>{
  const tick=()=>{
   let ok=false;
   try{ok=fn();}catch(e){return rej(e);}
   if(ok)return res();
   if(Date.now()-t0>ms)return rej(new Error('timeout'));
   setTimeout(tick,15);
  };
  tick();
 });
}
test('cel znika po spełnieniu wait, także bez tego samego tekstu i gdy warunek był już prawdziwy',async()=>{
 const {G,Engine}=game();
 Engine.chapter('zz_goal',{num:99,title:'Cele',when:'test',mood:'calm'},D=>{
  const {goal,waitFor,set}=D;
  return [
   goal('Sprawdź, co stało się z Adamem Rybickim.'),
   waitFor('ev:ev_obit'),
   set('gap1'),
   waitFor('flag:go2'),
   goal('Odzyskaj dostęp do konta Nimbus Mai.'),
   waitFor('solved:nimbus'),
   set('gap2'),
   waitFor('flag:go3'),
   goal('Zostaw ten cel.'),
   waitFor('flag:same',{goal:'Cel na kroku czekania.'}),
   set('gap3'),
   waitFor('flag:go4'),
   set('armEarly'),
   waitFor('flag:releaseEarly'),
   goal('Już zrobione.'),
   waitFor('flag:already'),
   set('gapEarly'),
   waitFor('flag:holdEarly')
  ];
 });
 G.s.chapter='zz_goal';G.s.pc=0;G.s.objective=null;
 Engine.restart();
 await until(()=>G.s.objective&&G.s.objective.text.includes('Rybickim'));
 G.addEv('ev_obit',true);
 await until(()=>G.flag('gap1'));
 assert.equal(G.s.objective,null,'nekrolog spełnia cel, choć wait nie niesie jego tekstu');
 G.setFlag('go2');
 await until(()=>G.s.objective&&G.s.objective.text.includes('Nimbus'));
 G.solve('nimbus');
 await until(()=>G.flag('gap2'));
 assert.equal(G.s.objective,null,'logowanie do Nimbusa zdejmuje cel odzyskania konta');
 G.setFlag('go3');
 await until(()=>G.s.objective&&G.s.objective.text==='Cel na kroku czekania.');
 G.setFlag('same');
 await until(()=>G.flag('gap3'));
 assert.equal(G.s.objective,null,'wait z własnym tekstem nadal gasi cel');
 G.setFlag('go4');
 await until(()=>G.flag('armEarly'));
 G.setFlag('already');
 G.setFlag('releaseEarly');
 await until(()=>G.flag('gapEarly'));
 assert.equal(G.s.objective,null,'warunek prawdziwy od razu też gasi cel');
});
