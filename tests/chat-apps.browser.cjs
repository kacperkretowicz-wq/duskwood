// Komunikatory jak natywne: Gadka ma pasek osób (kropka „aktywny” przy świeżej wiadomości), Błysk pokazuje status zamiast treści.
const assert=require('node:assert/strict');
let chromium;try{({chromium}=require('playwright'));}catch{({chromium}=require(process.env.PLAYWRIGHT_MODULE||'/workspace/.onboarding-tools/node_modules/playwright'));}
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:5173', shots=process.env.SHOTS;
(async()=>{
 const browser=await chromium.launch({...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),headless:true});
 try{
  for(const width of [320,390]){
  const ctx=await browser.newContext({viewport:{width,height:780},reducedMotion:'reduce'}),page=await ctx.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/?debug');
  await page.evaluate(()=>{
   G.newGame({name:'Alex',gender:'f'});G.settings.sfx=false;G.settings.ambient=false;
   document.querySelector('.title-scr')?.remove();UI.renderHome();
   ['ola','bartek','igor','group','blysk','blysk2'].forEach(id=>G.unlock('chat:'+id));
   const t=G.now();
   G.post('igor',{from:'igor',text:'dawno temu',t:t-3*36e5});
   G.post('bartek',{from:'me',text:'jestem'});
   G.post('ola',{from:'ola',text:'jestem pod apteką'});
   G.post('group',{from:'kuba',text:'zbiórka o 9'});
   G.post('blysk',{from:'blysk',text:'widziałem cię'});G.chat('blysk').unread=1;
   G.post('blysk2',{from:'me',text:'kim jesteś?'});
  });
  await page.evaluate(()=>UI.openApp('gadka'));await page.waitForTimeout(500);
  const ppl=page.locator('.gd-people .gd-p');
  assert.equal(await ppl.count(),3,'trzy osoby z rozmów (bez grupy)');
  assert.equal(await page.locator('.gd-people .gd-p.on').count(),1,'aktywna tylko osoba z świeżą wiadomością');
  assert.match(await page.locator('.gd-people .gd-p.on').innerText(),/Ola/);
  const ov=await page.evaluate(()=>[...document.querySelectorAll('.app.msgapp-gadka *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1&&!e.closest('.gd-people')).length);
  assert.equal(ov,0,'brak przepełnienia w Gadce');
  if(shots)await page.screenshot({path:`${shots}/gadka-${width}.png`});
  await ppl.filter({hasText:'Ola'}).click();await page.waitForTimeout(500);
  assert.equal(await page.evaluate(()=>G.viewing),'ola');
  await page.evaluate(()=>{UI.closeApp(true);UI.openApp('blysk');});await page.waitForTimeout(500);
  const rows=await page.locator('.msgapp-blysk .crow .bl-st').allInnerTexts();
  assert.equal(rows.length,2);
  assert.ok(rows.some(r=>/^Nowa wiadomość · /.test(r)),'nowa: '+rows);
  assert.ok(rows.some(r=>/^Wysłano · /.test(r)),'wysłano: '+rows);
  assert.ok(!(await page.locator('.msgapp-blysk').innerText()).includes('widziałem cię'),'treść błysku nie widoczna na liście');
  if(shots)await page.screenshot({path:`${shots}/blysk-${width}.png`});
  assert.deepEqual(errors,[]);await ctx.close();
  }
  console.log('PASS chat-apps');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
