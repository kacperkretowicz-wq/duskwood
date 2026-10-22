// Sprawa 2 „Most”: start z ukończonego zapisu S1, przejście prologu i rozdziału 1 przez interfejs silnika.
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
let chromium;try{({chromium}=require('playwright'));}catch{({chromium}=require(process.env.PLAYWRIGHT_MODULE||'/workspace/.onboarding-tools/node_modules/playwright'));}
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:5173';
const shots=process.env.TEST_SCREENSHOT_DIR;if(shots)fs.mkdirSync(shots,{recursive:true});
(async()=>{
 const browser=await chromium.launch({...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),headless:true});
 try{
  const ctx=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}),page=await ctx.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)errors.push(r.status()+' '+r.url());});
  await page.goto(base+'/?debug');
  const gate=await page.evaluate(()=>{
   G.newGame({name:'Alex',gender:'f'});G.settings.speed='instant';G.settings.sfx=false;G.settings.ambient=false;G.settings.autoHints=false;
   document.querySelector('.title-scr')?.remove();
   const r={fresh:Seasons.canStartNext()};
   G.s.finished=true;G.s.chapter='epilog';G.s.vars.endingId='cisza';r.cisza=Seasons.canStartNext();
   G.s.vars.endingId='swit';G.setFlag('majaFound');G.addEv('ev_fb_henryk',true);r.swit=Seasons.canStartNext();
   r.started=Seasons.startNext();r.season=Seasons.current().id;r.chapter=G.s.chapter;r.s1=G.s.vars.s1Ending;r.keptFlag=G.flag('majaFound');
   UI.renderHome();return r;});
  assert.deepEqual(gate,{fresh:false,cisza:false,swit:true,started:true,season:'s2',chapter:'m0',s1:'swit',keptFlag:true});
  const result=await page.evaluate(async()=>{
   const done=async()=>{};
   Object.assign(UI,{chapterTitle:done,chapterEnd:done,interlude:done,fx:done,endCall:done,incomingCall:async()=>'accept',outgoingCall:done,callScreen(){}});
   const satisfy=c=>{for(const k of [].concat(c)){if(typeof k!=='string')continue;const [t,...r]=k.split(':');const id=r.join(':');
    if(t==='ev')G.addEv(id,true);else if(t==='solved')G.solve(id);else if(t==='flag'&&id!=='m_act1Next')G.setFlag(id);else if(t==='seen')G.markSeen(id);else if(t==='unlocked')G.unlock(id);}};
   Engine.restart();const chapters=new Set();const t0=Date.now();let last='',same=0;
   while(Date.now()-t0<120000){
    await new Promise(r=>setTimeout(r,15));Engine.skip();
    if(G.flag('m_act1')&&G.s.chapter==='m1')break;
    const ch=Engine.chapters[G.s.chapter],st=ch&&ch.steps[G.s.pc],p=Engine.pending();chapters.add(G.s.chapter);
    const key=G.s.chapter+':'+G.s.pc+':'+(p&&p.type);same=key===last?same+1:0;last=key;
    if(p){if(p.type==='choose')Engine.answer(p.options[0].i);else if(p.type==='dial')Engine.answer(p.numbers[0]);else if(p.type==='show'){const ev=st.accept[0].ev[0];G.addEv(ev,true);Engine.answer(ev);}else if(p.type==='ask')Engine.answer('tak');continue;}
    if(st&&st.t==='wait'&&same>2){if(typeof st.cond==='function'){for(const w of ['gs_most','tt_most','tyg_most']){UI.openApp('browser',{page:w});await new Promise(r=>setTimeout(r,150));UI.goHome();}for(const c of Object.keys(G.s.chats||{})){G.viewing=c;G.change();if(G.test(st.cond))break;}}else satisfy(st.cond);G.change();}
    if(same>400)return{stuck:key,step:st&&st.t};
   }
   return{act1:!!G.flag('m_act1'),chapters:[...chapters],marta:G.flag('m_martaVerified'),henryk:G.flag('m_henrykSober'),
    ev:['ev_m_teczka','ev_m_s41','ev_m_gs','ev_m_klipo','ev_m_tyg','ev_m_one'].filter(e=>!G.has(e)),martaName:DATA.chats.marta&&G.chatName?G.chatName('marta'):null};
  });
  console.log(JSON.stringify(result));
  assert.ok(result.act1,JSON.stringify(result));
  assert.deepEqual(result.chapters,['m0','m1']);
  assert.ok(result.marta&&result.henryk);assert.deepEqual(result.ev,[]);
  for(const [p,file] of [['gs_most','gazeta-most'],['tyg_most','tygodnik-most'],['tt_most','klipo-most']]){
   await page.evaluate(p=>{UI.goHome();UI.openApp('browser',{page:p});},p);await page.waitForTimeout(300);
   if(shots)await page.screenshot({path:path.join(shots,file+'.png')});}
  for(const c of ['marta','natan','zuza']){await page.evaluate(c=>{UI.goHome();UI.openApp('messages',{chat:c});},c);await page.waitForTimeout(300);if(shots)await page.screenshot({path:path.join(shots,'czat-'+c+'.png')});}
  assert.ok(await page.evaluate(()=>[...document.images].every(i=>!i.src||(i.complete&&i.naturalWidth>0))));
  assert.deepEqual(errors.filter(e=>!/favicon/.test(e)),[]);
  console.log('PASS case 2 Most: gate, prologue, chapter 1');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
