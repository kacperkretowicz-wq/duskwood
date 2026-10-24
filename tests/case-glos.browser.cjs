// Sprawa 5 „Twoim głosem”: start z każdego zakończenia S4, g0–g6 przez silnik, trzy zakończenia, straszaki raz na zapis.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
let chromium;try{({chromium}=require('playwright'));}catch{({chromium}=require(process.env.PLAYWRIGHT_MODULE));}
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:5173';
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
 try{
  const W={haslo:['g_recordMarta','g_recOn','g_confess','g_strong','g_martaBluff'],echo:['g_letGo','g_martaAsk','g_threat'],cisza2:['g_wipeAll']};
  for(const [s4,target] of [['przewiniecie','haslo'],['transmisja','echo'],['kopia2','cisza2']]){
  const ctx=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}),page=await ctx.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)errors.push(r.status()+' '+r.url());});
  await page.goto(base+'/?debug');
  const gate=await page.evaluate(s4=>{
   G.newGame({name:'Alex',gender:'f'});Object.assign(G.settings,{speed:'instant',sfx:false,ambient:false,autoHints:false});document.querySelector('.title-scr')?.remove();
   G.s.finished=true;G.s.chapter='epilog';G.s.vars.endingId='swit';G.setFlag('majaFound');G.unlock('app:notes');Seasons.startNext();
   G.s.finished=true;G.s.chapter='m5';G.s.vars.s2Ending='pelny_kadr';Seasons.startNext();
   G.s.finished=true;G.s.chapter='k4';G.s.vars.s3Ending='wlasnym_glosem';Seasons.startNext();
   G.s.finished=true;G.s.chapter='c4';G.s.vars.s4Ending=s4;
   const r={can:Seasons.canStartNext(),started:Seasons.startNext(),season:Seasons.current().id,chapter:G.s.chapter};UI.renderHome();return r;},s4);
  assert.deepEqual(gate,{can:true,started:true,season:'s5',chapter:'g0'});
  const res=await page.evaluate(async([want,all])=>{
   const avoid=all.filter(k=>!want.includes(k));
   const done=async()=>{};Object.assign(UI,{endingScreen:done,credits:done,chapterTitle:done,chapterEnd:done,interlude:done,fx:done,endCall:done,incomingCall:async()=>'accept',outgoingCall:done,callScreen(){}});
   const satisfy=c=>{for(const k of [].concat(c)){if(typeof k!=='string')continue;const [t,...r]=k.split(':');const id=r.join(':');
    if(t==='ev')G.addEv(id,true);else if(t==='solved')G.solve(id);else if(t==='flag')G.setFlag(id);else if(t==='seen')G.markSeen(id);else if(t==='unlocked')G.unlock(id);}};
   const total=()=>Object.values(G.s.chats).reduce((a,c)=>a+c.msgs.length,0);
   Engine.restart();const chapters=[],msgs={};const t0=Date.now();let last='',same=0,m0=total();
   while(Date.now()-t0<150000){
    await new Promise(r=>setTimeout(r,15));
    if(G.s.finished||!Engine.chapters[G.s.chapter]){msgs[chapters.at(-1)]=total()-m0;return{end:true,next:G.s.chapter,chapters,msgs,ending:G.s.vars.s5Ending,archived:G.s.ending,finished:!!G.s.finished,scares:Object.keys(G.s.scares||{}),v:JSON.parse(localStorage.getItem('mglisko.save.v1')).v,missing:Object.keys(DATA.evidence).filter(e=>/^ev_g_/.test(e)&&!G.has(e))};}
    Engine.skip();
    const ch=Engine.chapters[G.s.chapter],st=ch&&ch.steps[G.s.pc],p=Engine.pending();
    if(chapters.at(-1)!==G.s.chapter){if(chapters.length)msgs[chapters.at(-1)]=total()-m0;m0=total();chapters.push(G.s.chapter);}
    const key=G.s.chapter+':'+G.s.pc+':'+(p&&p.type);same=key===last?same+1:0;last=key;
    if(p){if(p.type==='choose'){const sc=o=>{const set=Object.keys(st.options[o.i].set||{});return 10*set.filter(k=>want.includes(k)).length-10*set.filter(k=>avoid.includes(k)).length-o.i*0.1;};Engine.answer([...p.options].sort((a,b)=>sc(b)-sc(a))[0].i);}
     else if(p.type==='dial')Engine.answer(p.numbers[0]);else if(p.type==='show'){const ev=st.accept[0].ev[0];G.addEv(ev,true);Engine.answer(ev);}else if(p.type==='ask')Engine.answer(st.answers[0].match?st.answers[0].match[0]:'tak');continue;}
    if(st&&st.t==='wait'&&same>2){if(typeof st.cond!=='function')satisfy(st.cond);G.change();}
    if(same>400)return{stuck:key,step:st&&st.t};
   }return{timeout:last};},[W[target],[...new Set(Object.values(W).flat())]]);
  console.log(s4,JSON.stringify(res));
  assert.ok(res.end,JSON.stringify(res));
  const season=await page.evaluate(()=>DATA.seasons.find(s=>s.id==='s5').chapters);
  assert.deepEqual(res.chapters,season);
  assert.ok(res.finished,'sezon zakończony');assert.equal(res.ending,target);assert.equal(res.archived,target);
  assert.deepEqual(res.scares.filter(x=>/^s5_/.test(x)).sort(),['s5_przewijanie','s5_serwis','s5_smiech','s5_ty','s5_wera',...(target==='echo'?['s5_echo']:[])].sort());
  assert.deepEqual(res.missing,[]);
  assert.equal(res.v,13);
  const again=await page.evaluate(()=>{const n=JSON.stringify(G.s.scares);G.save(true);G.load();return [n,JSON.stringify(G.s.scares)];});
  assert.equal(again[0],again[1]);
  assert.deepEqual(errors,[]);await ctx.close();console.log('PASS case-glos',s4,target);
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
