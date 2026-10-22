// Playtest jak gracz: S1 → sprawa 2 → sprawa 3 w jednym zapisie, na skórkach iOS i Android, w widoku telefonu.
// Klika prawdziwe przyciski odpowiedzi, odbiera połączenia, przechodzi kurtyny i napisy. Straszaki odpalają się naprawdę.
// Mierzy tempo (czas i liczba wiadomości na rozdział), odstępy straszaków, błędy, przepełnienie układu, start i cache offline.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
let chromium;try{({chromium}=require('playwright'));}catch{({chromium}=require(process.env.PLAYWRIGHT_MODULE));}
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:5173',shots=process.env.TEST_SCREENSHOT_DIR,report=process.env.PLAYTEST_REPORT;
if(shots)fs.mkdirSync(shots,{recursive:true});
const WANT=['m_protectK','m_krystynaOk','m_henrykOnRecord','m_correctionFirst','m_martaStays','k_lenaTalks','k_ewaOk','k_quiet','k_kubaOff','k_zuzaHelped','k_police','k_requestLog','c_idaStops','c_olaFirst','c_zenonDefended'];
const AVOID=['m_leakK','m_krystynaNo','m_henrykQuiet','m_correctionLater','m_martaOut','k_outedKuba','k_lenaPublic','k_ewaWait','k_zuzaAlone','c_tookCopy','c_gaveUp'];
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
 const out={};
 try{
  for(const os of (process.env.E2E_OS||'ios,android').split(',')){
   const ctx=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true}),page=await ctx.newPage(),errors=[];
   page.on('crash',()=>console.error(os,'RENDERER CRASH',JSON.stringify(process.memoryUsage())));
   page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
   let bytes=0;page.on('response',async r=>{if(r.url().startsWith(base)){if(r.status()>=400)errors.push(r.status()+' '+r.url());const l=+r.headers()['content-length']||0;bytes+=l;}});
   await page.addInitScript(os=>{if(!localStorage.getItem('mglisko.settings.v1'))localStorage.setItem('mglisko.settings.v1',JSON.stringify({os,appearance:'light',sfx:true,ambient:false,speed:'instant',softScares:false,autoHints:false}));},os);
   const t0=Date.now();await page.goto(base+'/');await page.waitForFunction(()=>typeof G!=='undefined'&&typeof Engine!=='undefined'&&typeof UI!=='undefined');
   const boot=await page.evaluate(()=>{const n=performance.getEntriesByType('navigation')[0];return {dcl:Math.round(n.domContentLoadedEventEnd),load:Math.round(n.loadEventEnd)};});
   boot.firstLoadKB=Math.round(bytes/1024);boot.wall=Date.now()-t0;
   await page.evaluate(()=>{G.newGame({name:'Alex',gender:'f'});document.querySelector('.title-scr')?.remove();
    UI.packageSheet=async()=>6;UI.renderHome();Engine.restart();});
   const chapters={},scares=[],layout=[];let season='s1',lastCh='',tick=0,lastKey='',same=0,credits=0;const tStart=Date.now();
   while(Date.now()-tStart<1500000){
    tick++;
    const st=await page.evaluate(([W,X])=>{
     const r={ch:G.s.chapter,pc:G.s.pc,season:Seasons.current().id,finished:!!G.s.finished,msgs:Object.values(G.s.chats||{}).reduce((a,c)=>a+((c.msgs||c.messages||c).length||0),0)};
     const sc=document.querySelector('.scare-ov:not(.out),.scare-call:not(.out),.screen.scare-glitch');r.scare=sc?(sc.className.match(/scare-\w+/)||['?'])[0]:null;
     const nb=document.querySelector('.nearby-card .btn.pri');if(nb){nb.click();r.click='nearby';return r;}const cam=document.querySelector('.cam-ov');if(cam){const ch=[...cam.querySelectorAll('.cam-chip')];(ch[1]||ch[0])?.click();cam.querySelector('.cam-shutter').click();r.click='camera';return r;}const co=document.querySelector('.opt.cam-open');if(co){co.click();r.click='camopen';return r;}
     const acc=document.querySelector('.scare-call:not(.out) .c-btn.acc,.call:not(.out) .c-btn.acc');if(acc){acc.click();r.click='call';return r;}
     const cu=document.querySelector('.curtain');if(cu){r.curtain=cu.className;const b=cu.querySelector('button');if(/credits/.test(cu.className)||G.s.finished){r.credits=true;return r;}if(b)b.click();else cu.click();r.click='curtain';return r;}
     const p=Engine.pending();if(!p)return r;r.p=p.type;r.chat=p.chat;
     const ch=Engine.chapters[G.s.chapter],step=ch.steps[G.s.pc];
     if(p.type==='choose'){
      const score=o=>{const s=Object.keys(step.options[o.i].set||{}),inc=step.options[o.i].inc||{},set=step.options[o.i].set||{};let v=10*s.filter(k=>W.includes(k)).length-10*s.filter(k=>X.includes(k)).length;
       v+=(set.toldGajda||set.gajdaAlert||inc.leaks?-20:0)+(set.reportBoth?6:0)+(set.named112?6:0)+(step.options[o.i].exit?3:0)+(set.dispatchLocal?-6:0);return v-o.i*0.01;};
      const best=[...p.options].sort((a,b)=>score(b)-score(a))[0];const idx=p.options.indexOf(best);
      if(p.chat!=='call'&&(UI.current?.()!=='messages'||G.viewing!==p.chat))UI.openApp('messages',{chat:p.chat});
      const btns=[...document.querySelectorAll(p.chat==='call'?'.call .c-opts button,.call button:not(.c-btn)':'.opt')];
      if(btns[idx]){btns[idx].click();r.click='opt';}else{r.noBtn=(r.noBtn||0)+1;window.__nob=(window.__nob||0)+1;if(window.__nob>40){window.__nob=0;Engine.answer(best.i);r.click='forced';}}
      return r;}
     if(p.type==='ask'){Engine.answer(step.answers.find(a=>a.match)?.match[0]||'tak');r.click='ask';return r;}
     if(p.type==='show'){const ev=step.accept[0].ev[0];G.addEv(ev,true);Engine.answer(ev);r.click='show';return r;}
     if(p.type==='place'){Engine.answer(step.accept[0].place[0]);return r;}
     if(p.type==='dial'){Engine.answer(p.numbers.includes('112')?'112':p.numbers[0]);return r;}
     return r;},[WANT,AVOID]);
    if(st.ch!==lastCh){
     if(chapters[lastCh])chapters[lastCh].ms=Date.now()-chapters[lastCh].t,chapters[lastCh].msgs=st.msgs-chapters[lastCh].m0;
     chapters[st.ch]={t:Date.now(),m0:st.msgs,season:st.season};lastCh=st.ch;console.log(os,'→',st.ch,Math.round((Date.now()-tStart)/1000)+'s');
     const lay=await page.evaluate(()=>{const W=innerWidth,bad=[...document.querySelectorAll('.screen *')].filter(e=>{const b=e.getBoundingClientRect();return b.width&&b.right>W+2&&getComputedStyle(e).position!=='fixed';}).slice(0,3).map(e=>e.className||e.tagName);return {sw:document.documentElement.scrollWidth,W,bad};});
     if(lay.sw>lay.W||lay.bad.length)layout.push({ch:st.ch,...lay});
    }
    if(st.scare&&!scares.find(s=>s.ch===st.ch&&s.kind===st.scare&&Date.now()-s.at<15000)){scares.push({ch:st.ch,pc:st.pc,kind:st.scare,at:Date.now(),msgsIn:st.msgs-chapters[st.ch].m0});
     if(shots)await page.screenshot({path:path.join(shots,`${os}-scare-${st.ch}-${scares.length}.png`)});}
    if(st.credits){
     credits++;if(shots)await page.screenshot({path:path.join(shots,`${os}-credits-${st.season}.png`)});
     if(st.season==='s4')break;
     await Promise.all([page.waitForNavigation(),page.evaluate(()=>document.querySelector('.curtain button').click())]);
     await page.waitForFunction(()=>typeof G!=='undefined'&&G.s&&typeof Seasons!=='undefined');
     const ok=await page.evaluate(()=>{document.querySelector('.title-scr')?.remove();UI.packageSheet=async()=>6;const ok=Seasons.startNext();UI.renderHome();Engine.restart();return ok;});
     assert.ok(ok,'kolejna sprawa startuje po napisach '+st.season);continue;
    }
    const key=st.ch+':'+st.pc+':'+st.p;same=key===lastKey?same+1:0;lastKey=key;
    if(same===30&&shots&&tick%1===0){}
    if(same>25&&!st.p&&!st.curtain){
     await page.evaluate(()=>{const ch=Engine.chapters[G.s.chapter],step=ch&&ch.steps[G.s.pc];if(!step||step.t!=='wait')return;
      const sat=c=>{for(const k of [].concat(c)){if(typeof k!=='string')continue;const [t,...r]=k.split(':');const id=r.join(':');
       if(t==='ev')G.addEv(id,true);else if(t==='solved')G.solve(id);else if(t==='flag')G.setFlag(id);else if(t==='seen')G.markSeen(id);else if(t==='unlocked')G.unlock(id);}};
      if(typeof step.cond==='function'){G.setFlag('sawCalls');if(G.s.chapter==='ch1'&&!G.has('ev_ola_sorry'))G.addEv('ev_ola_fight',true);
       for(const w of ['gs_most','tt_most','tyg_most','tt_archiwum','tt_kronika'])if(DATA.web[w]&&G.test(DATA.web[w].avail||[])){UI.openApp('browser',{page:w});}
       for(const c of Object.keys(G.s.chats||{})){G.viewing=c;G.change();if(G.test(step.cond))break;}}else sat(step.cond);G.change();});
    }
    if(same>2500)throw new Error('utknięcie '+key+' '+JSON.stringify(st));
    await page.waitForTimeout(25);
   }
   if(chapters[lastCh])chapters[lastCh].ms=Date.now()-chapters[lastCh].t;
   const fin=await page.evaluate(()=>({s1:G.s.vars.s1Ending||G.s.vars.endingId,s2:G.s.vars.s2Ending,s3:G.s.vars.s3Ending,s4:G.s.vars.s4Ending,scaresSaved:Object.keys(G.s.scares)}));
   // offline: po pierwszym wczytaniu service worker musi wystarczyć do startu bez sieci
   await page.reload();await page.waitForFunction(()=>navigator.serviceWorker?.controller).catch(()=>{});
   await ctx.setOffline(true);let offline=true;try{await page.reload();await page.waitForFunction(()=>typeof G!=='undefined'&&typeof Engine!=='undefined',{timeout:8000});}catch{offline=false;}
   await ctx.setOffline(false);
   out[os]={boot,offline,fin,credits,scares:scares.map(s=>({ch:s.ch,kind:s.kind,msgsIn:s.msgsIn})),layout,errors:errors.filter(e=>!/favicon|ERR_INTERNET_DISCONNECTED/.test(e)),
    chapters:Object.fromEntries(Object.entries(chapters).map(([k,v])=>[k,{season:v.season,sec:Math.round(v.ms/1000),msgs:v.msgs}]))};
   console.log(os,JSON.stringify(out[os]));
   assert.equal(fin.s1,'swit');assert.equal(fin.s2,'pelny_kadr');assert.equal(fin.s3,'wlasnym_glosem');assert.equal(fin.s4,'przewiniecie');
   assert.ok(offline,'start offline z cache');
   assert.deepEqual(out[os].errors,[]);assert.deepEqual(layout,[]);
   await ctx.close();console.log('PASS e2e-player',os);
  }
  if(report)fs.writeFileSync(report,JSON.stringify(out,null,1));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
