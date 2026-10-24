// Run after node serve.js; PLAYWRIGHT_MODULE/CHROMIUM_PATH are optional overrides.
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
let chromium;try{({chromium}=require('playwright'));}catch{({chromium}=require(process.env.PLAYWRIGHT_MODULE||'/workspace/.onboarding-tools/node_modules/playwright'));}
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:5173';
const shots=process.env.TEST_SCREENSHOT_DIR;
if(shots)fs.mkdirSync(shots,{recursive:true});
(async()=>{
 const browser=await chromium.launch({...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),headless:true});
 try{
  for(const viewport of [{width:1440,height:1050},{width:390,height:844},{width:360,height:740}]){
   const ctx=await browser.newContext({viewport,reducedMotion:'reduce'}),page=await ctx.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   page.on('console',m=>{if(m.type()==='error'&&/Błąd|Error|TypeError|ReferenceError/.test(m.text()))errors.push(m.text());});
   page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)errors.push(r.status()+' '+r.url());});
   await page.goto(base+'/?debug');
   await page.evaluate(()=>{
    G.newGame({name:'Alex',gender:'f'});G.settings.speed='instant';G.settings.sfx=false;G.settings.ambient=false;
    G.s.chapter='ch1';G.s.pc=Engine.chapters.ch1.steps.length;
    document.querySelector('.title-scr').remove();UI.renderHome();
    G.unlock('chat:group');G.unlock('app:notes');G.setFlag('knowKuba');G.setFlag('knowMaja');
    G.addEv('ev_dam_news',true);UI.openApp('gadka');
   });
   await page.getByRole('button',{name:/Na osobności · 3/}).click();
   await page.locator('.toast').last().waitFor({state:'detached'});
   assert.equal(await page.locator('.side-lead').count(),3);
   assert.equal(await page.locator('.side-lead').filter({hasText:'Igor'}).count(),0,'spoiler is hidden');
   if(shots&&viewport.width===1440)await page.screenshot({path:path.join(shots,'desktop-rozmowy.png')});
   await page.locator('.side-lead').filter({hasText:'Ostatni kurs'}).click();
   await page.locator('.side-dialogue').waitFor();
   assert.match(await page.locator('.side-person').innerText(),/24 lat/);
   await page.waitForFunction(()=>[...document.querySelectorAll('.side-person img')].every(i=>i.complete&&i.naturalWidth>0));
   if(shots&&viewport.width===390)await page.screenshot({path:path.join(shots,'telefon-lena.png')});
   // Commit an answer, then close while replies are being revealed.
   await page.getByRole('button',{name:'Co dokładnie widziałaś?'}).click();
   await page.keyboard.press('Escape');await page.locator('.side-dialogue').waitFor({state:'detached'});
   const before=await page.evaluate(()=>({pc:G.s.pc,trust:G.v('trust_lena'),lines:Conversations.state('lena_bus').transcript.length}));
   await page.reload();await page.getByRole('button',{name:'Kontynuuj',exact:true}).click();
   await page.evaluate(()=>UI.openApp('notes',{note:'conversations'}));
   await page.locator('.side-lead').filter({hasText:'Ostatni kurs'}).click();
   assert.equal(await page.evaluate(()=>Conversations.state('lena_bus').transcript.length),before.lines);
   assert.equal(await page.evaluate(()=>G.v('trust_lena')),before.trust);
   assert.equal(await page.evaluate(()=>G.s.pc),before.pc);
   await page.getByRole('button',{name:'Masz coś, na czym można sprawdzić godzinę przejazdu?'}).click();
   await page.getByRole('button',{name:'Sprawdzimy godzinę. Zapiszę też, że nie widziałaś twarzy.'}).waitFor();
   await page.getByRole('button',{name:'Sprawdzimy godzinę. Zapiszę też, że nie widziałaś twarzy.'}).click();
   await page.getByRole('button',{name:'Porównaj materiały w Notatkach'}).waitFor();
   assert.equal(await page.evaluate(()=>G.has('ev_bus_verified')),false);
   await page.getByRole('button',{name:'Przystanek Jutrzenka · zdjęcie Leny',exact:true}).click();
   await page.locator('.viewer').waitFor();
   await page.waitForFunction(()=>document.querySelector('.vw-inner img').naturalWidth>0);
   await page.getByRole('button',{name:'Informacje',exact:true}).click();
   assert.match(await page.locator('.exif').innerText(),/21.10.2026/);
   assert.match(await page.locator('.exif').innerText(),/1448 × 1086/);
   await page.keyboard.press('Escape');await page.keyboard.press('Escape');
   await page.getByRole('button',{name:'Porównaj materiały w Notatkach'}).click();
   await page.locator('.ded-o').first().waitFor();
   // Wrong conclusion cannot award evidence.
   await page.locator('.ded-o').filter({hasText:'na pewno'}).click();
   const pick=page.locator('.ded-solve .row');
   await pick.filter({hasText:'Karta przejazdu'}).click();await pick.filter({hasText:'Porównanie zegarów'}).click();
   await page.getByRole('button',{name:'Gotowe',exact:true}).click();
   await page.locator('.ded-fail').waitFor();assert.equal(await page.evaluate(()=>G.has('ev_bus_verified')),false);
   await page.getByRole('button',{name:'Jeszcze raz',exact:true}).click();
   await page.locator('.ded-o').filter({hasText:'pozostaje niepotwierdzona'}).click();
   // Right conclusion with wrong sources must also fail.
   await pick.filter({hasText:'Lena: osoba'}).click();await pick.filter({hasText:'Przystanek Jutrzenka'}).click();
   await page.getByRole('button',{name:'Gotowe',exact:true}).click();await page.locator('.ded-fail').waitFor();
   assert.equal(await page.evaluate(()=>G.has('ev_bus_verified')),false);
   await page.getByRole('button',{name:'Jeszcze raz',exact:true}).click();
   await page.locator('.ded-o').filter({hasText:'pozostaje niepotwierdzona'}).click();
   await pick.filter({hasText:'Karta przejazdu'}).click();await pick.filter({hasText:'Porównanie zegarów'}).click();
   await page.getByRole('button',{name:'Gotowe',exact:true}).click();
   await page.waitForFunction(()=>G.has('ev_bus_verified'));
   assert.equal(await page.evaluate(()=>G.s.saved.filter(x=>x.art==='bus_stop').length),1);
   await page.getByRole('button',{name:'OK',exact:true}).click();
   await page.evaluate(()=>UI.openApp('notes',{note:'timeline'}));
   assert.match(await page.locator('.tl').innerText(),/22:18/);
   await page.evaluate(()=>UI.openApp('gallery'));
   await page.locator('.pgrid .pth').first().click();await page.locator('.viewer').waitFor();
   await page.keyboard.press('Escape');
   // Reopen the saved conversation; reward/relationship cannot be farmed.
   await page.evaluate(()=>UI.openConversation('lena_bus'));
   await page.getByRole('button',{name:'Zobacz zapisany wniosek'}).waitFor();
   assert.equal(await page.locator('.side-choice').count(),0);
   assert.equal(await page.evaluate(()=>G.v('trust_lena')),2);
   await page.evaluate(()=>{UI.closeOverlays();UI.openConversation('ola_shift');});
   await page.locator('.side-dialogue').waitFor();
   assert.ok(await page.evaluate(()=>[...document.querySelectorAll('.side-choice')].every(el=>el.scrollWidth<=el.clientWidth+2)),'choices fit narrow screen');
   await page.keyboard.press('Escape');
   assert.deepEqual(errors,[]);
   console.log('PASS full optional investigation, wrong answers, resume, gallery, timeline at '+viewport.width+'px');
   await ctx.close();
  }
  const ctx=await browser.newContext(),page=await ctx.newPage();
  await page.goto(base+'/');await page.evaluate(async()=>{
   await navigator.serviceWorker.ready;
   if(!navigator.serviceWorker.controller)await new Promise(r=>navigator.serviceWorker.addEventListener('controllerchange',r,{once:true}));
  });
  await ctx.setOffline(true);await page.reload();
  const resources=await page.evaluate(async()=>Promise.all(['assets/lena-v2.jpg','assets/bus-stop-v2.jpg','css/conversations.css','js/data/conversations.js','js/core/conversations.js','js/apps/conversations.js'].map(async p=>(await fetch(p)).ok)));
  assert.ok(resources.every(Boolean));
  console.log('PASS optional story resources cached offline');await ctx.close();
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
