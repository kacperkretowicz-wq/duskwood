// Powrót po przerwie: nieprzeczytane rozmowy czekają na ekranie blokady; dotknięcie powiadomienia otwiera rozmowę.
const assert=require('node:assert/strict');
let chromium;try{({chromium}=require('playwright'));}catch{({chromium}=require(process.env.PLAYWRIGHT_MODULE));}
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:5173';
(async()=>{
 const browser=await chromium.launch({...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),headless:true});
 try{
  const ctx=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}),page=await ctx.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>localStorage.setItem('mglisko.settings.v1',JSON.stringify({os:'ios',appearance:'light',speed:'instant',sfx:false,ambient:false})));
  await page.goto(base+'/?debug');
  await page.evaluate(()=>{G.newGame({name:'Alex',gender:'f'});G.s.chapter='ch1';G.s.pc=Engine.chapters.ch1.steps.length;
   document.querySelector('.title-scr').remove();G.unlock('chat:kuba');G.chat('kuba').name='Kuba Wrona';UI.renderHome();});
  assert.equal(await page.evaluate(()=>UI.returnLock()),false,'bez nieprzeczytanych nie blokuje');
  await page.evaluate(()=>{G.post('kuba',{from:'kuba',text:'jesteś?'});G.post('kuba',{from:'kuba',text:'odezwij się jak wrócisz'});});
  await page.waitForTimeout(300);
  await page.evaluate(()=>{document.querySelectorAll('.banner').forEach(b=>b.remove());});
  assert.equal(await page.evaluate(()=>UI.returnLock()),true);
  assert.ok(await page.evaluate(()=>UI.locked));
  const n=page.locator('#lock .lk-n .banner');assert.equal(await n.count(),1);
  const t=await n.innerText();assert.match(t,/Kuba Wrona \(2\)/);assert.match(t,/odezwij się jak wrócisz/);
  await n.click();await page.waitForTimeout(700);
  assert.ok(!(await page.evaluate(()=>UI.locked)));assert.equal(await page.evaluate(()=>G.viewing),'kuba');
  // Wiele powiadomień: najnowsze cztery na wierzchu, reszta zwinięta w stos; data na blokadzie idzie za zegarem gry.
  await page.evaluate(()=>{G.post('kuba',{from:'kuba',text:'halo'});G.chat('kuba').unread=1;});await page.waitForTimeout(200);
  assert.equal(await page.evaluate(()=>UI.returnLock()),true);
  await page.evaluate(()=>{for(let i=1;i<=6;i++)UI.banner({app:'messages',who:'kuba',title:'Kuba Wrona',text:'wiadomość '+i,open:{chat:'kuba'}});});
  await page.waitForTimeout(300);
  assert.equal(await page.locator('#lock .lk-n .banner:not(.lk-hidden)').count(),4);
  assert.match(await page.locator('#lock .lk-more').innerText(),/jeszcze 3 powiadomienia/);
  await page.evaluate(()=>G.setClock(U.parseLocal('2026-10-23T17:30')));await page.waitForTimeout(1300);
  assert.match(await page.locator('#lock .lk-d').innerText(),/Piątek, 23 października/);
  await page.locator('#lock .lk-more').click();await page.waitForTimeout(700);assert.ok(!(await page.evaluate(()=>UI.locked)));
  assert.deepEqual(errors,[]);console.log('PASS return-lock');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
