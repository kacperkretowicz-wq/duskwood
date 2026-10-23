const {test}=require('node:test'), assert=require('node:assert/strict');
const fs=require('node:fs'), vm=require('node:vm'), path=require('node:path');
const root=path.join(__dirname,'..');
function game(){
 let time=new Date(2026,9,23,14).getTime();const store=new Map();
 class Clock extends Date{static now(){return time;}}
 const document={hidden:false,addEventListener(){}}, ctx=vm.createContext({console,Date:Clock,
  setTimeout:()=>0,clearTimeout(){},document,window:{addEventListener(){}},Art:{def(){}},
  localStorage:{getItem:k=>store.get(k),setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)}});
 const files=['core/util','data/migrations','core/state','core/engine','data/characters','data/evidence',
  'data/world','data/maja','data/web','data/conversations','data/season-conversations','data/dark-threads',
  'data/season-days','data/field-threads','data/seasons','data/case-most','data/case-kopia',
  'data/case-kronika','data/case-glos','data/today','data/rhythm','core/conversations','core/seasons','core/pacing'];
 for(const f of files)vm.runInContext(fs.readFileSync(path.join(root,'js',f+'.js'),'utf8'),ctx,{filename:f});
 for(const f of fs.readdirSync(path.join(root,'js/story')).sort())vm.runInContext(fs.readFileSync(path.join(root,'js/story',f),'utf8'),ctx,{filename:f});
 const api=vm.runInContext('({G,DATA,Engine,SeasonPacing,Conversations})',ctx);
 api.G.newGame({name:'Alex',gender:'f'});
 return {...api,document,at:n=>time=n,now:()=>time};
}
test('real rest survives reload, restores the previous goal and does not move a pending choice',()=>{
 const {G,SeasonPacing:P,at,now}=game();G.s.chapter='ch1';G.s.pc=170;P.configure('daily');
 G.s.objective={text:'Sprawdź plik.',hints:['Nimbus'],level:1};G.s.pending={type:'choose',chat:'group'};
 assert.equal(P.holdRest({rest:'s1_night'}),true);
 const due=G.s.pacing.rest.at;assert.ok(due>=now()+2*3600000);
 G.save(true);G.load();assert.equal(P.holdRest({rest:'s1_night'}),true);assert.equal(G.s.pacing.rest.at,due);
 assert.equal(G.s.clock.paused,true);assert.equal(G.s.pc,170);assert.equal(G.s.pending.chat,'group');
 at(due+1000);assert.equal(P.holdRest({rest:'s1_night'}),false);
 assert.equal(G.s.pacing.rest,undefined);assert.equal(G.s.objective.text,'Sprawdź plik.');assert.equal(G.s.clock.paused,false);
 assert.equal(P.holdRest({rest:'s1_night'}),false,'completed rest does not start again');
});
test('local night windows cross midnight and never schedule before the minimum delay',()=>{
 const {SeasonPacing:P}=game();
 for(const [h,m,expected] of [[23,15,23],[1,30,1],[2,0,21],[15,0,21]]){
  const candidate=new Date(2026,9,24,h,m).getTime(),due=P.nextWindow(candidate,[21,26]);
  assert.ok(due>=candidate);assert.equal(new Date(due).getHours(),expected);
 }
 const day=new Date(2026,9,24,23,10).getTime(),next=P.nextWindow(day,[18,23]);
 assert.equal(new Date(next).getDate(),25);assert.equal(new Date(next).getHours(),18);
});
test('free mode releases an existing rest and a checkpoint cannot restore another scene’s goal',()=>{
 const {G,SeasonPacing:P}=game();G.s.chapter='ch1';G.s.pc=90;P.configure('daily');
 G.s.objective={text:'Pierwszy cel'};P.holdRest({rest:'s1_night'});P.configure('free');
 assert.equal(P.holdRest({rest:'s1_night'}),false);assert.equal(G.s.pacing.rest,undefined);
 assert.equal(G.s.objective.text,'Pierwszy cel');assert.equal(G.s.clock.paused,false);
 P.configure('daily');P.holdRest({rest:'s1_departure'});G.s.chapter='ch3';G.s.pc=50;
 G.s.objective={text:'Cel z checkpointu'};P.holdRest({t:'say'});
 assert.equal(G.s.objective.text,'Cel z checkpointu');assert.equal(G.s.pacing.rest,undefined);
});
test('each authored break occurs once, covers all seasons and leaves rescue sequences continuous',()=>{
 const {DATA,Engine:E}=game(),used=[];
 for(const ch of Object.values(E.chapters))for(const step of ch.steps)if(step.rest){
  assert.ok(DATA.rests[step.rest],step.rest);assert.ok(['clock','interlude','pause'].includes(step.t));
  assert.ok(!['ch4','ch5','m5','k4','c4','g6'].includes(ch.id),'no rest during a finale: '+ch.id);
  used.push(step.rest);
 }
 assert.deepEqual(used.sort(),Object.keys(DATA.rests).sort());
 for(const n of [1,2,3,4,5])assert.ok(used.some(id=>id.startsWith('s'+n+'_')));
});
test('new everyday conversations stay in their season, persist and leave the investigation intact',()=>{
 const {G,DATA,Conversations:C}=game(),ids=['kuba_delivery','ola_cafe','maja_closefriends','natan_notifications','ola_resale','igor_oldphone'];
 for(const id of ids){
  G.newGame();assert.equal(C.open(id),null);
  G.s.seasonId=({kuba_delivery:'s1',ola_cafe:'s1',maja_closefriends:'s2',natan_notifications:'s3',ola_resale:'s4',igor_oldphone:'s5'})[id];
  G.s.chapter='ch3';G.s.pc=42;G.s.pending={type:'show',chat:'kuba'};
  G.addEv('ev_loc_1410',true);G.addEv('ev_ola_fight',true);G.setFlag('majaFound');
  for(const who of ['natan','ola','igor'])G.unlock('chat:'+who);
  assert.ok(C.open(id),id);
  while(!C.state(id).done){const node=C.state(id).node;assert.ok(C.answer(id,node,0));G.save(true);G.load();}
  assert.equal(G.s.pc,42);assert.equal(G.s.pending.type,'show');
  const count=C.state(id).transcript.length;C.open(id);assert.equal(C.state(id).transcript.length,count);
  G.s.seasonId='s5';if(id!=='igor_oldphone')assert.equal(C.answer(id,'start',0),false);
  assert.ok(DATA.chars[DATA.conversations[id].who]);
 }
});
test('the opening SMS agrees in old saves, backup and evidence without resetting progress',()=>{
 const {G,DATA}=game();G.s.chapter='ch3';G.s.pc=42;G.s.pending={type:'choose',chat:'group'};
 G.post('maja',{id:'m0',from:'maja',t:12345,text:DATA.storyTexts.legacyFirstMajaSMS});
 G.save(true);G.load();const msg=G.chat('maja').msgs[0];
 assert.equal(msg.id,'m0');assert.equal(msg.t,12345);assert.equal(msg.text,DATA.storyTexts.firstMajaSMS);
 assert.equal(G.s.pc,42);assert.equal(G.s.pending.type,'choose');
 assert.ok(DATA.evidence.ev_sms_maja.desc.includes(msg.text));
 assert.ok(DATA.maja.threads.find(t=>t.id==='rybicki').msgs.some(m=>m.text===msg.text));
});
test('late return after a night break is remembered without penalty; DST change keeps the window',()=>{
 const {G,SeasonPacing:P,at}=game();G.s.chapter='ch1';G.s.pc=170;P.configure('daily');
 P.holdRest({rest:'s1_night'});const due=G.s.pacing.rest.at;
 at(due+8*3600000);assert.equal(P.holdRest({rest:'s1_night'}),false);
 assert.equal(G.flag('rano_s1_night'),true);assert.equal(G.s.pc,170);
 const g2=game();g2.G.s.chapter='ch3';g2.G.s.pc=5;g2.SeasonPacing.configure('daily');
 g2.SeasonPacing.holdRest({rest:'s1_sync'});g2.at(g2.G.s.pacing.rest.at+60000);g2.SeasonPacing.holdRest({rest:'s1_sync'});
 assert.equal(g2.G.flag('rano_s1_sync'),false,'on-time return is not marked');
 // 25.10.2026: w Europie zmiana czasu z letniego na zimowy w nocy.
 const dst=new Date(2026,9,25,1,30).getTime(),due2=P.nextWindow(dst,[21,26]);assert.equal(due2,dst);
 const after=P.nextWindow(new Date(2026,9,25,3,0).getTime(),[21,26]);
 assert.equal(new Date(after).getHours(),21);assert.equal(new Date(after).getDate(),25);
});
test('waiting for the next chapter keeps a short note of the last goal',()=>{
 const {G,SeasonPacing:P}=game();G.s.chapter='ch2';G.s.pc=0;P.configure('daily');
 G.s.objective={text:'Napisz do Bartka.'};
 assert.equal(P.hold('ch3'),true);{assert.ok(G.s.objective.text.includes('Ostatni cel: Napisz do Bartka.'));
  G.save(true);G.load();assert.equal(P.hold('ch3'),true);assert.ok(G.s.objective.text.includes('Ostatni cel: Napisz do Bartka.'));}
});
