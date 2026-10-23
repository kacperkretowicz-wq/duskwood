const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
let chromium;try{({chromium}=require('playwright'));}catch{({chromium}=require(process.env.PLAYWRIGHT_MODULE));}
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:5173',shots=process.env.TEST_SCREENSHOT_DIR;
if(shots)fs.mkdirSync(shots,{recursive:true});
(async()=>{
 const browser=await chromium.launch({...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),headless:true});
 try{
  for(const os of ['ios','android'])for(const width of [390,360]){
   const ctx=await browser.newContext({viewport:{width,height:width===390?844:740},reducedMotion:'reduce'}),page=await ctx.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   await page.addInitScript(os=>localStorage.setItem('mglisko.settings.v1',JSON.stringify({os,appearance:'dark',sfx:false,ambient:false,speed:'instant'})),os);
   await page.goto(base+'/?debug');
   await page.evaluate(os=>{
    G.newGame({name:'Alex',gender:'f'});
    G.s.chapter='ch3';G.s.pc=Engine.chapters.ch3.steps.length;document.querySelector('.title-scr').remove();UI.renderHome();
    for(const k of ['app:nimbus','nimbus:auth','maja:base','app:notes','chat:group','chat:gajda'])G.unlock(k);
    G.addEv('ev_bus_log',true);G.addEv('ev_bus_clock',true);UI.openApp('nimbus',{section:'notes'});
   },os);
   assert.equal(await page.getByRole('button',{name:/Do Oli/}).count(),0,'no future revision before sync');
   assert.equal(await page.evaluate(()=>Conversations.open('gajda_versions')),null);
   await page.evaluate(()=>{G.unlock('maja:sync1');UI.openApp('nimbus',{section:'notes'});});
   await page.getByRole('button',{name:/Do Oli/}).click();
   await page.getByRole('button',{name:'Historia wersji',exact:true}).click();
   assert.equal(await page.locator('.note-version').count(),2);
   const history=await page.locator('.note-history').innerText();assert.match(history,/14.10.2026, 23:41/);assert.match(history,/24.10.2026, 03:04/);
   assert.ok(await page.evaluate(()=>[...document.querySelectorAll('.note-version')].every(e=>e.scrollWidth<=e.clientWidth+1)));
   while(await page.getByRole('button',{name:'Zachowaj tę wersję',exact:true}).count())await page.getByRole('button',{name:'Zachowaj tę wersję',exact:true}).first().click();
   assert.equal(await page.evaluate(()=>G.has('ev_note_changed')),false);
   if(shots&&width===390){await page.locator('.toast').last().waitFor({state:'detached'});await page.locator('.note-history').evaluate(e=>e.closest('.sh-b').scrollTop=0);await page.screenshot({path:path.join(shots,os+'-historia-wersji.png')});}
   await page.getByRole('button',{name:'Porównaj wersje w Notatkach',exact:true}).click();
   const choose=page.locator('.ded-o'),rows=page.locator('.ded-solve .row');
   await choose.filter({hasText:'Gajda osobiście'}).click();
   await rows.filter({hasText:'wcześniejsza wersja'}).click();await rows.filter({hasText:'zmieniona wersja'}).click();
   await page.getByRole('button',{name:'Gotowe',exact:true}).click();await page.locator('.ded-fail').waitFor();
   assert.equal(await page.evaluate(()=>G.has('ev_note_changed')),false,'metadata cannot identify an author');
   await page.getByRole('button',{name:'Jeszcze raz',exact:true}).click();
   await choose.filter({hasText:'Tekst zmieniono'}).click();
   await rows.filter({hasText:'Karta przejazdu'}).click();await rows.filter({hasText:'Porównanie zegarów'}).click();
   await page.getByRole('button',{name:'Gotowe',exact:true}).click();await page.locator('.ded-fail').waitFor();
   assert.equal(await page.evaluate(()=>G.has('ev_note_changed')),false,'unrelated sources fail');
   await page.getByRole('button',{name:'Jeszcze raz',exact:true}).click();
   await choose.filter({hasText:'Tekst zmieniono'}).click();
   await rows.filter({hasText:'wcześniejsza wersja'}).click();await rows.filter({hasText:'zmieniona wersja'}).click();
   await page.getByRole('button',{name:'Gotowe',exact:true}).click();await page.getByRole('button',{name:'OK',exact:true}).click();
   assert.equal(await page.evaluate(()=>G.has('ev_note_changed')),true);
   await page.evaluate(()=>UI.openConversation('gajda_versions'));
   assert.match(await page.locator('.side-choice').last().innerText(),/Będzie wiedział/);
   if(shots&&width===390)await page.screenshot({path:path.join(shots,os+'-gajda-nacisk.png')});
   await page.getByRole('button',{name:/Wyślę obie wersje/}).click();
   // Closing during the reveal and restarting must not duplicate a disclosure.
   await page.keyboard.press('Escape');await page.reload();await page.getByRole('button',{name:'Kontynuuj',exact:true}).click();
   assert.equal(await page.evaluate(()=>G.v('leaks')),1);
   await page.evaluate(()=>UI.openConversation('gajda_versions'));
   assert.match(await page.locator('.side-transcript').innerText(),/wcześniejsza treść/);
   await page.getByRole('button',{name:'Nie mamy potwierdzenia, że jest bezpieczna.',exact:true}).click();
   await page.getByRole('button',{name:'Wersje „Do Oli” przekazane Gajdzie',exact:true}).waitFor();
   assert.equal(await page.evaluate(()=>G.v('leaks')),1);
   await page.keyboard.press('Escape');await page.locator('.side-dialogue').waitFor({state:'detached'});
   await page.evaluate(()=>UI.openConversation('kuba_room'));
   await page.locator('.side-choice').first().click();await page.getByRole('button',{name:'Nie musisz dzisiaj wchodzić.',exact:true}).click();
   await page.getByRole('button',{name:/Zachowujemy oba zapisy/}).waitFor();
   assert.match(await page.locator('.side-transcript').innerText(),/mama dzwoniła/);
   if(shots&&width===390)await page.screenshot({path:path.join(shots,os+'-kuba-pokoj.png')});
   await page.keyboard.press('Escape');await page.locator('.side-dialogue').waitFor({state:'detached'});await page.evaluate(()=>{G.s.chapter='ch5';UI.openConversation('gajda_versions');});
   assert.equal(await page.locator('.side-choice').count(),0,'archive cannot reopen the disclosure');
   await page.keyboard.press('Escape');await page.locator('.side-dialogue').waitFor({state:'detached'});await page.evaluate(()=>{G.s.finished=true;G.setFlag('majaFound');UI.openConversation('maja_words');});
   assert.equal(await page.locator('.side-choice').count(),1,'only matching response is visible');
   await page.locator('.side-choice').click();await page.getByRole('button',{name:'Nie będę ci dopowiadać, co „musiało” się stać.',exact:true}).waitFor();
   assert.match(await page.locator('.side-transcript').innerText(),/sms do mamy pisałam ja/);
   assert.ok(await page.evaluate(()=>[...document.querySelectorAll('.side-choice')].every(e=>e.scrollWidth<=e.clientWidth+1)));
   assert.deepEqual(errors,[]);console.log(`PASS ${os} ${width}px: history, wrong conclusion/sources, disclosure, resume, reactions, archive`);await ctx.close();
  }
  const ctx=await browser.newContext(),p=await ctx.newPage();await p.goto(base+'/');
  await p.evaluate(async()=>{await navigator.serviceWorker.ready;if(!navigator.serviceWorker.controller)await new Promise(r=>navigator.serviceWorker.addEventListener('controllerchange',r,{once:true}));});
  await ctx.setOffline(true);await p.reload();assert.ok(await p.evaluate(async()=> (await fetch('js/data/dark-threads.js')).ok));
  await p.evaluate(()=>{G.newGame();G.unlock('maja:sync1');G.unlock('app:nimbus');G.unlock('nimbus:auth');G.unlock('maja:base');document.querySelector('.title-scr').remove();UI.renderHome();UI.openApp('nimbus',{section:'notes'});});
  await p.getByRole('button',{name:/Do Oli/}).click();await p.getByRole('button',{name:'Historia wersji',exact:true}).click();
  assert.equal(await p.locator('.note-version').count(),2);console.log('PASS version history opens offline');await ctx.close();
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
