// Odpowiedź w trakcie pisania: opcje widać, gdy rozmówca pisze ostatnią wiadomość przed wyborem.
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
   Engine.chapter('t_early',{title:'test'},({say,choose,opt,pause,set})=>[
    say('kuba','kuba','pierwsza wiadomość, dość długa, żeby pisanie trwało chwilę i było widać kropki'),
    pause(600),
    choose('kuba',[opt('Jestem.',[say('kuba','kuba','ok')],{set:{tA:true}}),opt('Nie teraz.',[],{set:{tB:true}})]),
    say('kuba','kuba','koniec testu, znowu trochę dłuższa wiadomość żeby kropki były widoczne'),
    choose('kuba',[opt('Dobra.')]),
    set('tDone')
   ]);
   G.unlock('chat:kuba');UI.openApp('messages',{chat:'kuba'});Engine.jump('t_early');
  });
  // Opcje pojawiają się, zanim dymek Kuby wyląduje.
  await page.waitForFunction(()=>Engine.typing('kuba')==='kuba');
  await page.locator('.composer .opt').first().waitFor({timeout:3000});
  assert.equal(await page.evaluate(()=>G.chat('kuba').msgs.length),0,'opcje w trakcie pisania');
  const t0=Date.now();await page.locator('.composer .opt').first().click();
  await page.waitForFunction(()=>G.chat('kuba').msgs.some(m=>m.from==='me'));
  assert.ok(Date.now()-t0<1500,'odpowiedź bez czekania na koniec pisania');
  const order=await page.evaluate(()=>G.chat('kuba').msgs.map(m=>m.from+':'+m.text.slice(0,8)));
  assert.deepEqual(order.slice(0,2),['kuba:pierwsza','me:Jestem.'],'dymek rozmówcy przed odpowiedzią');
  assert.equal(await page.evaluate(()=>G.flag('tA')),true);
  // Druga tura: gracz czeka do końca pisania — opcje zostają bez mrugnięcia i działają normalnie.
  await page.waitForFunction(()=>G.chat('kuba').msgs.some(m=>m.text.startsWith('koniec')),null,{timeout:20000});
  await page.locator('.composer .opt').first().click();
  await page.waitForFunction(()=>G.flag('tDone'));
  assert.equal(await page.evaluate(()=>G.chat('kuba').msgs.filter(m=>m.from==='me').length),2);
  assert.deepEqual(errors,[]);
  console.log('PASS early reply while typing, ordering, natural wait');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
