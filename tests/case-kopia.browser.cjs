// Sprawa 3 „Kopia zapasowa”: start z ukończonej S2, prolog k0 + rozdział k1 przez silnik; straszaki raz na zapis.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
let chromium;try{({chromium}=require('playwright'));}catch{({chromium}=require(process.env.PLAYWRIGHT_MODULE));}
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:5173',shots=process.env.TEST_SCREENSHOT_DIR;if(shots)fs.mkdirSync(shots,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
 try{
  const ctx=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}),page=await ctx.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)errors.push(r.status()+' '+r.url());});
  await page.goto(base+'/?debug');
  const gate=await page.evaluate(()=>{
   G.newGame({name:'Alex',gender:'f'});Object.assign(G.settings,{speed:'instant',sfx:false,ambient:false,autoHints:false});document.querySelector('.title-scr')?.remove();
   G.s.finished=true;G.s.chapter='epilog';G.s.vars.endingId='swit';G.setFlag('majaFound');G.unlock('app:notes');
   const s2=Seasons.startNext();const before=Seasons.canStartNext();
   G.s.finished=true;G.s.chapter='m5';G.s.vars.s2Ending='margines';
   const r={s2,before,can:Seasons.canStartNext(),started:Seasons.startNext(),season:Seasons.current().id,chapter:G.s.chapter};UI.renderHome();return r;});
  assert.deepEqual(gate,{s2:true,before:false,can:true,started:true,season:'s3',chapter:'k0'});
  const res=await page.evaluate(async()=>{
   const done=async()=>{};Object.assign(UI,{endingScreen:done,credits:done,chapterTitle:done,chapterEnd:done,interlude:done,fx:done,endCall:done,incomingCall:async()=>'accept',outgoingCall:done,callScreen(){}});
   const satisfy=c=>{for(const k of [].concat(c)){if(typeof k!=='string')continue;const [t,...r]=k.split(':');const id=r.join(':');
    if(t==='ev')G.addEv(id,true);else if(t==='solved')G.solve(id);else if(t==='flag'&&!/Next$|Released$/.test(id))G.setFlag(id);else if(t==='seen')G.markSeen(id);else if(t==='unlocked')G.unlock(id);}};
   Engine.restart();const chapters=[];const t0=Date.now();let last='',same=0;
   while(Date.now()-t0<120000){
    await new Promise(r=>setTimeout(r,15));Engine.skip();
    const ch=Engine.chapters[G.s.chapter],st=ch&&ch.steps[G.s.pc],p=Engine.pending();if(chapters.at(-1)!==G.s.chapter)chapters.push(G.s.chapter);
    const key=G.s.chapter+':'+G.s.pc+':'+(p&&p.type);same=key===last?same+1:0;last=key;
    if(p){if(p.type==='choose')Engine.answer(p.options[0].i);else if(p.type==='dial')Engine.answer(p.numbers[0]);else if(p.type==='show'){const ev=st.accept[0].ev[0];G.addEv(ev,true);Engine.answer(ev);}else if(p.type==='ask')Engine.answer('tak');continue;}
    if(st&&st.t==='wait'){if([].concat(st.cond).includes('flag:k_ch2Released'))return{end:true,chapters,scares:Object.keys(G.s.scares||{}),v:JSON.parse(localStorage.getItem('mglisko.save.v1')).v};
     if(same>2){if(typeof st.cond==='function'){UI.openApp('browser',{page:'tt_archiwum'});await new Promise(r=>setTimeout(r,150));UI.goHome();for(const c of Object.keys(G.s.chats||{})){G.viewing=c;G.change();if(G.test(st.cond))break;}}else satisfy(st.cond);G.change();}}
    if(same>400)return{stuck:key,step:st&&st.t};
   }return{timeout:last};});
  console.log(JSON.stringify(res));
  assert.ok(res.end,JSON.stringify(res));
  assert.deepEqual(res.chapters,['k0','k1']);
  assert.deepEqual(res.scares.filter(s=>/^s3_/.test(s)).sort(),['s3_domowy','s3_glos','s3_okno']);
  assert.equal(res.v,4);
  const again=await page.evaluate(()=>{const n=Object.keys(G.s.scares).length;G.save(true);G.load();return [n,Object.keys(G.s.scares).length];});
  assert.equal(again[0],again[1]);
  if(shots){await page.evaluate(()=>{UI.goHome();UI.openApp('messages',{chat:'ewa'});});await page.waitForTimeout(400);await page.screenshot({path:path.join(shots,'k1-ewa.png')});}
  assert.deepEqual(errors,[]);console.log('PASS case-kopia');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
