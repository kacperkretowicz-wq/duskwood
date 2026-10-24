// Sprawa 4 „Kronika”: start z ukończonej S3, c0–c4 przez silnik, trzy zakończenia; straszaki raz na zapis.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
let chromium;try{({chromium}=require('playwright'));}catch{({chromium}=require(process.env.PLAYWRIGHT_MODULE));}
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:5173',shots=process.env.TEST_SCREENSHOT_DIR;if(shots)fs.mkdirSync(shots,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
 try{
  const W={przewiniecie:['c_idaStops','c_olaFirst','c_zenonDefended','c_linkTV','c_clockSeen','c_idaSeen','c_roomLink','c_blyskTalk','c_stageLink','c_pleaded','c_klatkaOk'],transmisja:['c_gaveUp','c_hunt','c_linkGym','c_wojtSeen','c_shotBlysk','c_wrongZenon','c_shotFestyn','c_canDetour'],kopia2:['c_tookCopy','c_linkLater','c_clockLater','c_idaLater','c_roomLater','c_stageLater']};
  for(const [s3,target] of [['wlasnym_glosem','przewiniecie'],['kopia','transmisja'],['zasiegi','kopia2']]){
  const ctx=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}),page=await ctx.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)errors.push(r.status()+' '+r.url());});
  await page.goto(base+'/?debug');
  const gate=await page.evaluate(s3=>{
   G.newGame({name:'Alex',gender:'f'});Object.assign(G.settings,{speed:'instant',sfx:false,ambient:false,autoHints:false});document.querySelector('.title-scr')?.remove();
   G.s.finished=true;G.s.chapter='epilog';G.s.vars.endingId='swit';G.setFlag('majaFound');G.unlock('app:notes');Seasons.startNext();
   G.s.finished=true;G.s.chapter='m5';G.s.vars.s2Ending='pelny_kadr';Seasons.startNext();
   ['chat:maja2','chat:ola','chat:igor','chat:weronika','chat:sylwia','chat:kuba'].forEach(k=>G.unlock(k));
   G.s.finished=true;G.s.chapter='k4';G.s.vars.s3Ending=s3;
   const r={can:Seasons.canStartNext(),started:Seasons.startNext(),season:Seasons.current().id,chapter:G.s.chapter};UI.renderHome();return r;},s3);
  assert.deepEqual(gate,{can:true,started:true,season:'s4',chapter:'c0'});
  const res=await page.evaluate(async([want,all])=>{
   const done=async()=>{};Object.assign(UI,{endingScreen:done,credits:done,chapterTitle:done,chapterEnd:done,interlude:done,fx:done,endCall:done,incomingCall:async()=>'accept',outgoingCall:done,callScreen(){}});
   const avoid=all.filter(k=>!want.includes(k));
   const satisfy=c=>{for(const k of [].concat(c)){if(typeof k!=='string')continue;const [t,...r]=k.split(':');const id=r.join(':');
    if(t==='ev')G.addEv(id,true);else if(t==='solved')G.solve(id);else if(t==='flag'&&!/Next$|Released$/.test(id))G.setFlag(id);else if(t==='seen')G.markSeen(id);else if(t==='unlocked')G.unlock(id);}};
   Engine.restart();const chapters=[];const t0=Date.now();let last='',same=0;
   while(Date.now()-t0<150000){
    await new Promise(r=>setTimeout(r,15));Engine.skip();
    if(G.s.finished)return{end:true,chapters,ending:G.s.vars.s4Ending,archived:G.s.ending,scares:Object.keys(G.s.scares||{}),v:JSON.parse(localStorage.getItem('mglisko.save.v1')).v,missing:Object.keys(DATA.evidence).filter(e=>/^ev_c_/.test(e)&&!G.has(e))};
    const ch=Engine.chapters[G.s.chapter],st=ch&&ch.steps[G.s.pc],p=Engine.pending();if(chapters.at(-1)!==G.s.chapter)chapters.push(G.s.chapter);
    const key=G.s.chapter+':'+G.s.pc+':'+(p&&p.type);same=key===last?same+1:0;last=key;
    if(p){if(p.type==='choose'){const sc=o=>{const set=Object.keys(st.options[o.i].set||{});return 10*set.filter(k=>want.includes(k)).length-10*set.filter(k=>avoid.includes(k)).length-o.i*0.1;};Engine.answer([...p.options].sort((a,b)=>sc(b)-sc(a))[0].i);}
     else if(p.type==='dial')Engine.answer(p.numbers[0]);else if(p.type==='show'){const ev=st.accept[0].ev[0];G.addEv(ev,true);Engine.answer(ev);}else if(p.type==='ask')Engine.answer(st.answers[0].match?st.answers[0].match[0]:'tak');continue;}
    if(st&&st.t==='wait'&&same>2){if(typeof st.cond==='function'){UI.openApp('browser',{page:'tt_kronika'});await new Promise(r=>setTimeout(r,150));UI.goHome();}else satisfy(st.cond);G.change();}
    if(same>400)return{stuck:key,step:st&&st.t};
   }return{timeout:last};},[W[target],[...new Set(Object.values(W).flat())]]);
  console.log(s3,target,JSON.stringify(res));
  assert.ok(res.end,JSON.stringify(res));
  assert.deepEqual(res.chapters,['c0','c1','c2','cf','c3','c4']);
  assert.equal(res.ending,target);assert.equal(res.archived,target);
  const sc=['s4_cisza','s4_drzwi','s4_festyn','s4_noc','s4_okno',...(target==='transmisja'?['s4_transmisja']:[])].sort();
  assert.deepEqual(res.scares.filter(s=>/^s4_/.test(s)).sort(),sc);
  assert.deepEqual(res.missing,[]);
  assert.equal(res.v,8);
  const again=await page.evaluate(()=>{const n=JSON.stringify(G.s.scares);G.save(true);G.load();return [n,JSON.stringify(G.s.scares)];});
  assert.equal(again[0],again[1]);
  if(shots&&target==='przewiniecie'){
   for(const [n,c] of [['c0-maja','maja2'],['c2-ola','ola'],['c3-weronika','weronika'],['c4-ida','ida'],['c1-igor','igor']]){await page.evaluate(c=>{UI.goHome();UI.openApp('messages',{chat:c});},c);await page.waitForTimeout(400);await page.screenshot({path:path.join(shots,n+'.png')});}
   await page.evaluate(()=>{UI.goHome();UI.openApp('browser',{page:'tt_kronika'});});await page.waitForTimeout(400);await page.screenshot({path:path.join(shots,'c-klipo.png')});
  }
  assert.deepEqual(errors,[]);await ctx.close();console.log('PASS case-kronika',s3,target);
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
