// Głosówki, grupa Kwartał, Klipo i nowe osoby. Uruchom po node serve.js.
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
  page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)errors.push(r.status()+' '+r.url());});
  await page.goto(base+'/?debug');
  await page.evaluate(()=>{
   G.newGame({name:'Alex',gender:'f'});G.settings.speed='instant';G.settings.sfx=false;G.settings.ambient=false;
   G.s.chapter='ch1';G.s.pc=Engine.chapters.ch1.steps.length;
   document.querySelector('.title-scr').remove();UI.renderHome();
   G.unlock('chat:group');G.unlock('app:notes');G.setFlag('knowKuba');G.addEv('ev_loc_1410',true);
  });
  await page.evaluate(()=>UI.openApp('browser',{page:'fb_mglisko'}));
  await page.locator('.fb-m').waitFor();
  assert.match(await page.locator('.fb-m').innerText(),/uciekla do niemiec/);
  if(shots)await page.screenshot({path:path.join(shots,'fb-grupa.png')});
  await page.evaluate(()=>{UI.goHome();UI.openConversations('sylwia');});
  await page.locator('.side-lead').filter({hasText:'Mglisko'}).click();
  await page.locator('.side-dialogue').waitFor();
  assert.match(await page.locator('.side-person').innerText(),/35 lat/);
  await page.getByRole('button',{name:'Dzień dobry. Co się dzieje w grupie?'}).click();
  const play=page.getByRole('button',{name:'zapis',exact:true}).first();
  await play.waitFor();await play.click();
  assert.match(await page.locator('.voice-tr').first().innerText(),/Pan Henryk/);
  if(shots)await page.screenshot({path:path.join(shots,'glosowka-sylwia.png')});
  await page.getByRole('button',{name:/Możesz mi wysłać tego screena/}).click();
  await page.getByRole('button',{name:/Daj mi do niej kontakt/}).click();
  await page.waitForFunction(()=>Conversations.state('sylwia_group').done);
  await page.keyboard.press('Escape');
  assert.ok(await page.evaluate(()=>G.has('ev_fb_henryk')&&G.flag('metSylwia')));
  await page.evaluate(()=>UI.openApp('browser',{page:'tt_zuza'}));
  await page.locator('.tt-m').waitFor();assert.match(await page.locator('.tt-m').innerText(),/NOWE NAGRANIE/);
  await page.evaluate(()=>{for(const [n,i] of [['start',0],['clip',0],['source',0],['fix',0],['uncle',0]]){Conversations.open('zuza_tiktok');Conversations.answer('zuza_tiktok',n,i);}UI.openApp('browser',{page:'tt_zuza'});});
  await page.locator('.tt-m').filter({hasText:'SPROSTOWANIE'}).waitFor();
  if(shots)await page.screenshot({path:path.join(shots,'tiktok-sprostowanie.png')});
  assert.ok(await page.evaluate(()=>[...document.querySelectorAll('.tt-prof img')].every(i=>i.complete&&i.naturalWidth>0)));
  assert.deepEqual(errors,[]);
  console.log('PASS FB group, Sylwia voice note transcript, Zuza TikTok correction');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
