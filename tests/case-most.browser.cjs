// Sprawa 2 „Most”: start z ukończonego zapisu S1 (Świt i Cisza), przejście rozdziałów przez interfejs silnika.
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
let chromium;try{({chromium}=require('playwright'));}catch{({chromium}=require(process.env.PLAYWRIGHT_MODULE||'/workspace/.onboarding-tools/node_modules/playwright'));}
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:5173';
const shots=process.env.TEST_SCREENSHOT_DIR;if(shots)fs.mkdirSync(shots,{recursive:true});
async function play(page,stopFlag,target){
 return page.evaluate(async ([stopFlag,target])=>{
  const done=async()=>{};
  window.__ending=window.__ending||UI.endingScreen;Object.assign(UI,{endingScreen:done,credits:done,chapterTitle:done,chapterEnd:done,interlude:done,fx:done,endCall:done,incomingCall:async()=>'accept',outgoingCall:done,callScreen(){}});
  const satisfy=c=>{for(const k of [].concat(c)){if(typeof k!=='string')continue;const [t,...r]=k.split(':');const id=r.join(':');
   if(t==='ev')G.addEv(id,true);else if(t==='solved')G.solve(id);else if(t==='flag'&&!/Next$/.test(id))G.setFlag(id);else if(t==='seen')G.markSeen(id);else if(t==='unlocked')G.unlock(id);}};
  Engine.restart();const chapters=[];const t0=Date.now();let last='',same=0;
  while(Date.now()-t0<150000){
   await new Promise(r=>setTimeout(r,15));Engine.skip();
   if((stopFlag&&G.flag(stopFlag))||G.s.finished)break;
   const ch=Engine.chapters[G.s.chapter],st=ch&&ch.steps[G.s.pc],p=Engine.pending();if(chapters.at(-1)!==G.s.chapter)chapters.push(G.s.chapter);
   const key=G.s.chapter+':'+G.s.pc+':'+(p&&p.type);same=key===last?same+1:0;last=key;
   if(p){if(p.type==='choose'){const full=st.options;const W={pelny:['m_protectK','m_krystynaOk','m_henrykOnRecord','m_correctionFirst','m_martaStays'],margines:['m_protectK','m_krystynaNo','m_henrykQuiet','m_correctionLater','m_martaOut'],cudzy:['m_leakK']}[target]||[];
     const X=['m_leakK','m_krystynaNo','m_henrykQuiet','m_correctionLater','m_krystynaOk','m_henrykOnRecord','m_correctionFirst','m_martaStays','m_martaOut','m_protectK'].filter(k=>!W.includes(k));
     const sc=o=>{const set=Object.keys(full[o.i].set||{});return set.length+10*set.filter(k=>W.includes(k)).length-10*set.filter(k=>X.includes(k)).length;};
     const best=[...p.options].sort((a,b)=>sc(b)-sc(a))[0];Engine.answer(best.i);}
    else if(p.type==='dial')Engine.answer(p.numbers[0]);else if(p.type==='show'){const ev=st.accept[0].ev[0];G.addEv(ev,true);Engine.answer(ev);}else if(p.type==='ask')Engine.answer('tak');continue;}
   if(st&&st.t==='wait'&&same>2){if(typeof st.cond==='function'){for(const w of ['gs_most','tt_most','tyg_most']){UI.openApp('browser',{page:w});await new Promise(r=>setTimeout(r,150));UI.goHome();}for(const c of Object.keys(G.s.chats||{})){G.viewing=c;G.change();if(G.test(st.cond))break;}}else satisfy(st.cond);G.change();}
   if(same>400)return{stuck:key,step:st&&st.t};
  }
  return{stop:stopFlag?!!G.flag(stopFlag):!!G.s.finished,ending:G.s.vars.s2Ending,archived:G.s.seasonArchive?.s2?.outcome?.ending,chapters,flags:Object.keys(G.s.flags||{}).filter(f=>/^m/.test(f)),missing:Object.keys(DATA.evidence).filter(e=>/^ev_m_/.test(e)&&!G.has(e))};
 },[stopFlag,target]);
}
async function shot(page,name,fn,arg){
 await page.evaluate(fn,arg);await page.waitForTimeout(400);
 await page.evaluate(()=>document.querySelectorAll('.toast,.banner').forEach(t=>t.remove()));
 if(shots)await page.screenshot({path:path.join(shots,name+'.png')});
}
(async()=>{
 const browser=await chromium.launch({...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),headless:true});
 try{
  for(const [ending,target] of [['swit','pelny'],['swit','margines'],['swit','cudzy'],['cisza','margines']]){
   const ctx=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}),page=await ctx.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
   page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)errors.push(r.status()+' '+r.url());});
   await page.goto(base+'/?debug');
   const gate=await page.evaluate(ending=>{
    G.newGame({name:'Alex',gender:'f'});G.settings.speed='instant';G.settings.sfx=false;G.settings.ambient=false;G.settings.autoHints=false;
    document.querySelector('.title-scr')?.remove();
    const r={fresh:Seasons.canStartNext()};
    G.s.finished=true;G.s.chapter='epilog';G.s.vars.endingId=ending;if(ending!=='cisza')G.setFlag('majaFound');G.addEv('ev_fb_henryk',true);G.unlock('app:notes');
    r.can=Seasons.canStartNext();r.started=Seasons.startNext();r.season=Seasons.current().id;r.chapter=G.s.chapter;r.s1=G.s.vars.s1Ending;
    r.mpListed=Seasons.progress().some(e=>e.chapter==='mp');
    UI.renderHome();return r;},ending);
   assert.deepEqual(gate,{fresh:false,can:true,started:true,season:'s2',chapter:ending==='cisza'?'mp':'m0',s1:ending,mpListed:ending==='cisza'});
   const stop=null;
   const res=await play(page,stop,target);
   console.log(ending,JSON.stringify(res));
   assert.ok(res.stop,JSON.stringify(res));
   if(ending==='cisza'){
    assert.deepEqual(res.chapters,['mp','m0','m1','m2','m3','m4','m5']);assert.equal(res.ending,'margines');
    assert.ok(await page.evaluate(()=>G.flag('majaFound')&&G.flag('m_lateRescue')&&G.flag('mp_placeOnly')&&G.flag('mp_reportClean')));
    await shot(page,'cisza-nina',()=>{UI.goHome();UI.openApp('messages',{chat:'nina'});});
    await shot(page,'cisza-kuba',()=>{UI.goHome();UI.openApp('messages',{chat:'kuba'});});
    await shot(page,'cisza-maja',()=>{UI.goHome();UI.openApp('messages',{chat:'maja2'});});
   }else{
    const want={pelny:'pelny_kadr',margines:'margines',cudzy:'cudzy_podpis'}[target];
    assert.equal(res.ending,want);assert.equal(res.archived,want);
    assert.deepEqual(res.chapters,['m0','m1','m2','m3','m4','m5']);
    if(target==='pelny')assert.deepEqual(res.missing.filter(e=>!/^ev_mp_/.test(e)),[]);
    await shot(page,'final-'+target,id=>{UI.goHome();window.__ending(id);},want);
    await page.evaluate(()=>document.querySelectorAll('.curtain,.cu,[class*=curtain]').forEach(n=>n.remove()));
    if(target==='pelny'){
     await shot(page,'m4-natan-oip',()=>{UI.goHome();UI.openApp('messages',{chat:'natan'});});
     await shot(page,'m5-zuza-final',()=>{UI.goHome();UI.openApp('messages',{chat:'zuza'});});
     await shot(page,'m5-gs-strona41',()=>{UI.goHome();UI.openApp('browser',{page:'gs_strona41'});});
    }
    if(target==='margines')
    for(const [n,c] of (target!=='margines'?[]:[['m2-marta-kaseta','marta'],['m2-bartek','bartek'],['m3-natan-ida','natan'],['m3-henryk','henryk_sms'],['m3-zuza','zuza']]))
     await shot(page,n,c=>{UI.goHome();UI.openApp('messages',{chat:c});},c);
    if(target==='margines')await shot(page,'m3-notatki',()=>{UI.goHome();UI.openApp('notes',{ev:'ev_m_zwrot'});});
   }
   // toasty: kilka dowodów naraz = jeden dymek
   const toasts=await page.evaluate(()=>{document.querySelectorAll('.toast').forEach(t=>t.remove());for(const e of ['ev_m_most2011','ev_m_terminy','ev_m_praktyki'])G.s.ev=G.s.ev.filter?G.s.ev.filter(x=>x!==e):G.s.ev;
     ['ev_mp_nina','ev_mp_karta','ev_mp_wejscie'].forEach(e=>UI.evidenceToast&&UI.evidenceToast(e));return [...document.querySelectorAll('.toast.ev')].map(t=>t.textContent);});
   if(toasts.length)assert.equal(toasts.length,1,JSON.stringify(toasts));
   assert.ok(await page.evaluate(()=>[...document.images].every(i=>!i.src||(i.complete&&i.naturalWidth>0))));
   assert.deepEqual(errors.filter(e=>!/favicon/.test(e)),[]);
   await ctx.close();
   console.log('PASS case 2 Most from',ending,target);
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
