const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
let chromium;try{({chromium}=require('playwright'));}catch{({chromium}=require(process.env.PLAYWRIGHT_MODULE));}
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:5173',shots=process.env.TEST_SCREENSHOT_DIR;
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
 try{for(const os of ['ios','android'])for(const width of [390,360]){
  const ctx=await browser.newContext({viewport:{width,height:width===390?844:740},reducedMotion:'reduce'}),p=await ctx.newPage(),errors=[];
  p.on('pageerror',e=>errors.push(e.message));
  await p.addInitScript(os=>localStorage.setItem('mglisko.settings.v1',JSON.stringify({os,appearance:'dark',sfx:false,ambient:false,speed:'instant'})),os);
  await p.goto(base+'/?debug');assert.equal(await p.title(),'Quiet Is Safer');
  if(shots&&width===390)await p.screenshot({path:path.join(shots,os+'-quiet-title.png')});
  await p.evaluate(()=>{
   G.newGame({name:'Alex',gender:'f'});G.s.chapter='ch3';G.s.pc=Engine.chapters.ch3.steps.length;document.querySelector('.title-scr').remove();
   ['chat:kuba','chat:group','app:notes','chat:bartek'].forEach(k=>G.unlock(k));G.setFlag('knowKuba');
   G.post('kuba',{from:'kuba',text:'ej ładowarka znowu u mai 💀'});G.post('kuba',{from:'me',text:'Sprawdzę zdjęcie.'});
   G.post('group',{from:'ola',text:'Jestem po zmianie.'});UI.renderHome();UI.openApp('messages',{chat:'kuba'});
  });
  const before=await p.evaluate(()=>({pc:G.s.pc,ev:Object.keys(G.s.ev).length,msgs:G.chat('kuba').msgs.length}));
  await p.getByRole('button',{name:'Opcje rozmowy',exact:true}).click();await p.getByRole('button',{name:'Przypnij rozmowę',exact:true}).click();
  assert.equal(await p.evaluate(()=>PhoneTools.pinned('kuba')),true);
  await p.getByRole('button',{name:'Opcje rozmowy',exact:true}).click();await p.getByRole('button',{name:'Szukaj w rozmowie',exact:true}).click();
  await p.getByRole('searchbox',{name:'Szukaj wiadomości'}).fill('ładowarka');
  assert.equal(await p.locator('.message-search-result').count(),1);await p.locator('.message-search-result').click();
  await p.getByRole('button',{name:'Zachowaj cytat',exact:true}).click();
  await p.locator('.message-menu').waitFor({state:'detached'});
  // Native-style long press, with visible menu and no changes to the text.
  const bubble=p.locator('.msg.them .bub').first(),box=await bubble.boundingBox();
  await p.mouse.move(box.x+box.width/2,box.y+box.height/2);await p.mouse.down();await p.waitForTimeout(680);await p.mouse.up();
  await p.getByRole('button',{name:'Reakcja 💀',exact:true}).click();
  await p.getByRole('button',{name:'Twoja reakcja 💀',exact:true}).waitFor();
  assert.equal(await p.evaluate(()=>G.s.pc),before.pc);assert.equal(await p.evaluate(()=>G.chat('kuba').msgs.length),before.msgs);
  assert.equal(await p.evaluate(()=>Object.keys(G.s.ev).length),before.ev);
  if(shots&&width===390)await p.screenshot({path:path.join(shots,os+'-reakcje-cytaty.png')});
  await p.reload();await p.getByRole('button',{name:'Kontynuuj',exact:true}).click();
  await p.evaluate(()=>UI.openApp('notes',{note:'quotes'}));assert.match(await p.locator('.message-search-result').innerText(),/ładowarka/);
  await p.keyboard.press('Escape');await p.locator('.message-search').waitFor({state:'detached'});
  // The new investigation cannot open before the real confession and second expedition.
  assert.equal(await p.evaluate(()=>Conversations.open('kuba_strap')),null);
  await p.evaluate(()=>{G.addEv('ev_bartek_conf',true);G.addEv('ev_car_igor',true);UI.openConversation('kuba_strap');});
  await p.getByRole('button',{name:'Otwórz zdjęcie: Pas przy bocznym wejściu',exact:true}).click();
  await p.waitForFunction(()=>document.querySelector('.vw-inner img')?.naturalWidth>0);
  assert.equal(await p.evaluate(()=>G.has('ev_strap_field')),true);
  await p.getByRole('button',{name:'Informacje',exact:true}).click();assert.match(await p.locator('.exif').innerText(),/22.10.2026/);
  await p.keyboard.press('Escape');await p.keyboard.press('Escape');await p.locator('.viewer').waitFor({state:'detached'});
  await p.locator('.side-choice').first().click();await p.getByRole('button',{name:'Sprawdzę z nim zdjęcie. Bez wrzucania oskarżeń na grupę.',exact:true}).click();
  await p.locator('.side-complete').waitFor();await p.keyboard.press('Escape');await p.locator('.side-dialogue').waitFor({state:'detached'});
  await p.evaluate(()=>UI.openConversation('bartek_strap'));
  await p.getByRole('button',{name:'Otwórz zdjęcie: Szuflada z pasami',exact:true}).click();await p.waitForFunction(()=>G.has('ev_strap_stock'));
  await p.keyboard.press('Escape');await p.locator('.viewer').waitFor({state:'detached'});
  for(let i=0;i<3;i++){await p.locator('.side-choice').first().waitFor();await p.locator('.side-choice').first().click();}
  await p.getByRole('button',{name:'Porównaj materiały w Notatkach',exact:true}).waitFor();
  if(shots&&width===390)await p.screenshot({path:path.join(shots,os+'-pas-rozmowa.png')});
  await p.getByRole('button',{name:'Porównaj materiały w Notatkach',exact:true}).click();
  const pick=p.locator('.ded-solve .row');
  await p.locator('.ded-o').filter({hasText:'To na pewno pas Gajdy'}).click();
  for(const title of ['Pas przy bocznym','Auto-Sowa · kilka','Zeszyt Auto-Sowa'])await pick.filter({hasText:title}).click();
  await p.getByRole('button',{name:'Gotowe',exact:true}).click();await p.locator('.ded-fail').waitFor();assert.equal(await p.evaluate(()=>G.has('ev_strap_checked')),false);
  await p.getByRole('button',{name:'Jeszcze raz',exact:true}).click();await p.locator('.ded-o').filter({hasText:'Nie ustala użytkownika'}).click();
  for(const title of ['Pas przy bocznym','Auto-Sowa · kilka','Zeszyt Auto-Sowa'])await pick.filter({hasText:title}).click();
  await p.getByRole('button',{name:'Gotowe',exact:true}).click();await p.getByRole('button',{name:'OK',exact:true}).click();
  assert.equal(await p.evaluate(()=>G.has('ev_strap_checked')),true);
  await p.evaluate(()=>UI.openConversation('bartek_locker'));await p.getByRole('button',{name:'Otwórz zdjęcie: Po zamknięciu warsztatu',exact:true}).click();
  await p.waitForFunction(()=>document.querySelector('.vw-inner img')?.naturalWidth===1448);
  if(shots&&width===390)await p.screenshot({path:path.join(shots,os+'-warsztat-zdjecie.png')});
  assert.ok(await p.evaluate(()=>document.querySelector('#screen').scrollWidth<=document.querySelector('#screen').clientWidth+1));
  assert.deepEqual(errors,[]);console.log(`PASS ${os} ${width}px: title, pin, search, long-press/reaction, quote, restart, physical clues, wrong/correct conclusion, photos`);await ctx.close();
 }
 const ctx=await browser.newContext(),p=await ctx.newPage();await p.goto(base+'/');await p.evaluate(async()=>{await navigator.serviceWorker.ready;if(!navigator.serviceWorker.controller)await new Promise(r=>navigator.serviceWorker.addEventListener('controllerchange',r,{once:true}));});
 await ctx.setOffline(true);await p.reload();assert.ok(await p.evaluate(async()=> (await Promise.all(['js/data/field-threads.js','js/core/phone-tools.js','assets/strap-door-v1.jpg','assets/garage-straps-v1.jpg','assets/garage-locker-v1.jpg'].map(async f=>(await fetch(f)).ok))).every(Boolean)));
 console.log('PASS new field photos and daily message tools offline');await ctx.close();
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
