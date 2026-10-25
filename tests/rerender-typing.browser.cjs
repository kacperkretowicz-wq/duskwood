// Pełne przerysowanie czatu (koniec filmu jednorazowego, edycja, reakcja) w chwili, gdy ktoś pisze:
// wcześniej append() wstawiał przed odłączony dymek „pisze…”, render się przerywał i czat był pusty.
const assert=require('node:assert/strict');
let chromium;try{({chromium}=require('playwright'));}catch{({chromium}=require(process.env.PLAYWRIGHT_MODULE||'/workspace/.onboarding-tools/node_modules/playwright'));}
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:5173';
(async()=>{
 const browser=await chromium.launch({...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),headless:true});
 try{
  const ctx=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}),page=await ctx.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/?debug');
  await page.evaluate(()=>{
   G.newGame({name:'Alex',gender:'f'});G.settings.sfx=false;G.settings.ambient=false;G.settings.speed='normal';
   document.querySelector('.title-scr')?.remove();UI.renderHome();
   Engine.chapter('t_rr',{title:'test'},({say,set})=>[
    say('kuba','kuba','pierwsza'),
    say('kuba','kuba','druga wiadomość, dłuższa, żeby kropki pisania były widoczne przez chwilę'),
    set('tDone')
   ]);
   G.unlock('chat:kuba');UI.openApp('messages',{chat:'kuba'});Engine.jump('t_rr');
  });
  await page.waitForFunction(()=>G.chat('kuba').msgs.length===1&&Engine.typing('kuba')==='kuba',null,{timeout:20000});
  await page.locator('.msg.typing').waitFor();
  await page.evaluate(()=>BUS.emit('phone-tools'));
  await page.evaluate(()=>BUS.emit('phone-tools'));
  assert.equal(await page.locator('.msg:not(.typing) .tx').count(),1,'po przerysowaniu w trakcie pisania widać pierwszą wiadomość');
  assert.equal(await page.locator('.msg.typing').count(),1,'jeden dymek „pisze…”');
  await page.waitForFunction(()=>G.flag('tDone'),null,{timeout:20000});
  await page.waitForTimeout(300);
  assert.equal(await page.locator('.msg:not(.typing) .tx').count(),2,'druga wiadomość dochodzi pod pierwszą');
  assert.equal(await page.locator('.msg.typing').count(),0);
  assert.equal(await page.locator('.msgs .sep, .sep').count(),1,'jeden separator daty');
  assert.deepEqual(errors,[]);
  console.log('PASS re-render while typing keeps chat intact');
 } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exit(1);});
