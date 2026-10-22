const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
let chromium;try{({chromium}=require('playwright'));}catch{({chromium}=require(process.env.PLAYWRIGHT_MODULE));}
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:5173',shots=process.env.TEST_SCREENSHOT_DIR;
if(shots)fs.mkdirSync(shots,{recursive:true});
const contrast=(fg,bg)=>{
 const luminance=s=>s.match(/[\d.]+/g).slice(0,3).map(Number).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;}).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0);
 const a=luminance(fg),b=luminance(bg);return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);
};
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
 try{
 for(const os of ['ios','android'])for(const width of [390,360]){
  const ctx=await browser.newContext({viewport:{width,height:width===390?844:740},reducedMotion:'reduce'}),page=await ctx.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(os=>{if(!localStorage.getItem('mglisko.settings.v1'))localStorage.setItem('mglisko.settings.v1',JSON.stringify({os,appearance:'light',sfx:false,ambient:false,speed:'instant'}));},os);
  await page.goto(base+'/?debug');
  await page.evaluate(()=>{
   G.newGame({name:'Alex',gender:'f'});G.s.chapter='ch1';G.s.pc=Engine.chapters.ch1.steps.length;
   document.querySelector('.title-scr').remove();G.unlock('app:notes');G.addEv('ev_dam_news',true);UI.renderHome();UI.openApp('calendar');
  });
  const story=await page.evaluate(()=>({pc:G.s.pc,chapter:G.s.chapter,pending:G.s.pending}));
  await page.getByRole('button',{name:'Następny miesiąc',exact:true}).click();assert.match(await page.locator('.cal-month-nav h2').innerText(),/Listopad 2026/);
  await page.getByRole('button',{name:'Poprzedni miesiąc',exact:true}).click();
  await page.getByRole('button',{name:'Dodaj wydarzenie',exact:true}).first().click();
  await page.getByLabel('Nazwa',{exact:true}).fill('   ');
  await page.getByRole('button',{name:'Zapisz wydarzenie',exact:true}).click();assert.match(await page.locator('.phone-form-error').innerText(),/Wpisz nazwę/);
  await page.getByLabel('Nazwa',{exact:true}).fill('Oddzwonić do Oli');
  await page.getByLabel('Data',{exact:true}).fill('2026-11-02');
  await page.getByLabel('Godzina · zostaw pustą dla całego dnia',{exact:true}).fill('20:15');
  await page.getByLabel('Miejsce',{exact:true}).fill('Dom');
  await page.getByLabel('Notatka',{exact:true}).fill('Porównać godziny.\n<żaden automat nie dopisuje dowodów>');
  const source=page.getByLabel('Załącznik z Notatek',{exact:true});assert.equal(await source.locator('option').count(),2,'only an owned evidence is selectable');
  await source.selectOption('ev_dam_news');await page.getByRole('button',{name:'Zapisz wydarzenie',exact:true}).click();
  await page.locator('.phone-form').waitFor({state:'detached'});
  assert.match(await page.locator('.cal-month-nav h2').innerText(),/Listopad 2026/);
  assert.equal(await page.getByRole('button',{name:'2 listopada 2026',exact:true}).getAttribute('aria-pressed'),'true');
  await page.locator('.cal-events .row').filter({hasText:'Oddzwonić do Oli'}).click();
  assert.match(await page.locator('.cal-event-note').innerText(),/<żaden automat/);
  await page.getByRole('button',{name:'Edytuj wydarzenie',exact:true}).click();
  await page.getByLabel('Nazwa',{exact:true}).fill('Oddzwonić do Oli po pracy');
  await page.getByLabel('Godzina · zostaw pustą dla całego dnia',{exact:true}).fill('');
  await page.getByRole('button',{name:'Zapisz wydarzenie',exact:true}).click();await page.locator('.phone-form').waitFor({state:'detached'});
  assert.match(await page.locator('.cal-events').innerText(),/Cały dzień/);
  if(shots&&width===390){await page.locator('.toast').last().waitFor({state:'detached'});await page.screenshot({path:path.join(shots,os+'-kalendarz.png')});}
  await page.evaluate(()=>G.save(true));await page.reload();
  await page.evaluate(()=>{document.querySelector('.title-scr').remove();UI.renderHome();UI.openApp('calendar');});
  assert.equal(await page.evaluate(()=>G.s.phoneTools.calendar.find(e=>e.title==='Oddzwonić do Oli po pracy').evidence),'ev_dam_news','event edit and attachment survive reload');
  await page.getByRole('button',{name:'Następny miesiąc',exact:true}).click();await page.getByRole('button',{name:'2 listopada 2026',exact:true}).click();
  await page.locator('.cal-events .row').filter({hasText:'Oddzwonić do Oli po pracy'}).click();
  await page.getByRole('button',{name:'Usuń wydarzenie',exact:true}).click();await page.getByRole('button',{name:'Anuluj',exact:true}).click();
  assert.equal(await page.evaluate(()=>G.s.phoneTools.calendar.length),6,'cancel leaves event intact');
  await page.getByRole('button',{name:'Usuń wydarzenie',exact:true}).click();await page.getByRole('button',{name:'Usuń',exact:true}).click();
  await page.locator('.phone-event-detail').waitFor({state:'detached'});assert.equal(await page.evaluate(()=>G.s.phoneTools.calendar.length),5);
  await page.evaluate(()=>UI.openApp('clock'));
  await page.getByRole('spinbutton',{name:'Minuty',exact:true}).fill('0');await page.getByRole('spinbutton',{name:'Sekundy',exact:true}).fill('2');
  await page.getByLabel('Etykieta',{exact:true}).fill('Herbata');await page.getByRole('button',{name:'Start',exact:true}).click();
  await page.waitForTimeout(250);await page.getByRole('button',{name:'Wstrzymaj',exact:true}).click();
  const remaining=await page.evaluate(()=>G.s.phoneTools.timer.remaining);await page.waitForTimeout(350);
  assert.equal(await page.evaluate(()=>G.s.phoneTools.timer.remaining),remaining);
  await page.getByRole('button',{name:'Wznów',exact:true}).click();await page.evaluate(()=>UI.openApp('calendar'));
  await page.waitForFunction(()=>G.s.phoneTools.timer.finished);assert.equal(await page.locator('.banner').filter({hasText:'Minutnik zakończony'}).count(),1);
  await page.waitForTimeout(600);assert.equal(await page.locator('.banner').filter({hasText:'Minutnik zakończony'}).count(),1,'completion alerts exactly once');
  await page.locator('.banner').filter({hasText:'Minutnik zakończony'}).click();await page.getByRole('heading',{name:'Minutnik',exact:true}).waitFor();
  assert.match(await page.locator('.clock-state').innerText(),/Czas minął/);
  await page.getByRole('button',{name:'Anuluj',exact:true}).click();
  await page.getByRole('tab',{name:'Stoper',exact:true}).click();await page.getByRole('button',{name:'Start',exact:true}).click();
  await page.waitForTimeout(150);await page.getByRole('button',{name:'Okrążenie',exact:true}).click();await page.waitForTimeout(150);
  await page.getByRole('button',{name:'Okrążenie',exact:true}).click();await page.getByRole('button',{name:'Stop',exact:true}).click();
  assert.equal(await page.locator('.stopwatch-laps .row').count(),2);const elapsed=await page.evaluate(()=>G.s.phoneTools.stopwatch.elapsed);
  await page.waitForTimeout(150);assert.equal(await page.evaluate(()=>G.s.phoneTools.stopwatch.elapsed),elapsed);
  if(shots&&width===390)await page.screenshot({path:path.join(shots,os+'-stoper.png')});
  await page.getByRole('button',{name:'Wyzeruj',exact:true}).click();assert.equal(await page.locator('.stopwatch-laps .row').count(),0);
  await page.getByRole('tab',{name:'Alarmy',exact:true}).click();await page.getByRole('button',{name:'Dodaj alarm',exact:true}).click();
  await page.getByLabel('Godzina',{exact:true}).fill('23:11');await page.getByLabel('Etykieta',{exact:true}).fill('Oddzwonić');
  await page.getByRole('button',{name:'Zapisz alarm',exact:true}).click();await page.locator('.phone-form').waitFor({state:'detached'});
  assert.equal(await page.getByRole('switch',{name:'Alarm 23:11',exact:true}).getAttribute('aria-checked'),'true');
  await page.evaluate(()=>G.setClock('2026-10-21T23:11:00'));await page.waitForFunction(()=>G.s.phoneTools.alarms[0].on===false);
  await page.waitForTimeout(600);assert.equal(await page.locator('.banner').filter({hasText:'Oddzwonić'}).count(),1,'one-shot alarm cannot repeat in same minute');
  await page.getByRole('button',{name:'Edytuj alarm 23:11',exact:true}).click();await page.getByRole('button',{name:'Usuń alarm',exact:true}).click();await page.locator('.phone-form').waitFor({state:'detached'});
  assert.equal(await page.evaluate(()=>G.s.phoneTools.alarms.length),0);
  assert.deepEqual(await page.evaluate(()=>({pc:G.s.pc,chapter:G.s.chapter,pending:G.s.pending})),story,'personal apps never advance narrative');
  await page.locator('.banner').last().waitFor({state:'detached'});
  for(const appearance of ['light','dark']){
   await page.evaluate(appearance=>{G.settings.appearance=appearance;G.saveSettings();UI.openApp('calendar');},appearance);
   if(os==='android')assert.equal(await page.locator('#homebar.nav3 button').first().evaluate(e=>getComputedStyle(e).color),appearance==='dark'?'rgb(255, 255, 255)':'rgb(0, 0, 0)','Android navigation must remain visible on the app surface');
   assert.ok(await page.evaluate(()=>[...document.querySelectorAll('.cal button,.cal h2,.cal h3,.phone-help')].every(e=>e.scrollWidth<=e.clientWidth+1)),'calendar has no horizontal overflow');
   await page.evaluate(()=>UI.openApp('clock',{tab:'timer'}));
   assert.ok(await page.evaluate(()=>[...document.querySelectorAll('.clock-app button,.clock-help,.clock-label')].every(e=>e.scrollWidth<=e.clientWidth+1)),'clock has no horizontal overflow');
   const styles=await page.locator('.clock-help').evaluate(e=>({font:parseFloat(getComputedStyle(e).fontSize),color:getComputedStyle(e).color,background:getComputedStyle(e.closest('.pg')).backgroundColor}));
   assert.ok(styles.font>=15);assert.ok(contrast(styles.color,styles.background)>=4.5,'secondary clock text contrast >= 4.5:1');
   if(shots&&width===390)await page.screenshot({path:path.join(shots,os+'-minutnik-'+appearance+'.png')});
   await page.evaluate(()=>UI.openApp('weather'));assert.equal(await page.locator('.wx-top b').evaluate(e=>getComputedStyle(e).color),'rgb(255, 255, 255)','weather text readable on dark sky in both system themes');
  }
  if(os==='ios'&&width===390){
   await page.evaluate(()=>UI.openApp('clock',{tab:'timer'}));
   await page.getByRole('spinbutton',{name:'Sekundy',exact:true}).fill('1');await page.getByRole('button',{name:'Start',exact:true}).click();
   await page.reload();await page.waitForTimeout(1600);
   assert.equal(await page.locator('.banner').count(),0,'elapsed timer waits for user to enter the saved game');
   assert.equal(await page.evaluate(()=>G.s.phoneTools.timer.running),true);
   await page.evaluate(()=>{document.querySelector('.title-scr').remove();UI.renderHome();});
   await page.waitForFunction(()=>G.s.phoneTools.timer.finished);assert.equal(await page.locator('.banner').filter({hasText:'Minutnik zakończony'}).count(),1);
   await page.reload();await page.evaluate(()=>{document.querySelector('.title-scr').remove();UI.renderHome();});await page.waitForTimeout(600);
   assert.equal(await page.locator('.banner').count(),0,'a finished timer cannot notify again after reload');
  }
  assert.deepEqual(errors,[]);console.log(`PASS ${os} ${width}px: calendar CRUD, owned attachments, persistence, timer pause/resume/once, stopwatch laps, alarm once, themes, story isolation`);
  await ctx.close();
 }
 const offline=await browser.newContext({viewport:{width:390,height:844}}),page=await offline.newPage();await page.goto(base+'/');
 await page.evaluate(async()=>{await navigator.serviceWorker.ready;if(!navigator.serviceWorker.controller)await new Promise(r=>navigator.serviceWorker.addEventListener('controllerchange',r,{once:true}));});
 await offline.setOffline(true);await page.reload();await page.evaluate(()=>{G.newGame();document.querySelector('.title-scr').remove();UI.renderHome();UI.openApp('calendar');});
 await page.getByRole('button',{name:'Dodaj wydarzenie',exact:true}).first().click();await page.getByLabel('Nazwa',{exact:true}).fill('Sprawdzić trasę');
 await page.getByRole('button',{name:'Zapisz wydarzenie',exact:true}).click();await page.locator('.phone-form').waitFor({state:'detached'});
 await page.evaluate(()=>{UI.openApp('clock');G.save(true);});await page.reload();await page.evaluate(()=>{document.querySelector('.title-scr').remove();UI.renderHome();UI.openApp('clock');});
 assert.equal(await page.evaluate(()=>G.s.phoneTools.calendar.some(e=>e.title==='Sprawdzić trasę')),true);await page.getByRole('heading',{name:'Minutnik',exact:true}).waitFor();
 console.log('PASS personal calendar and clock work offline and survive reload');await offline.close();
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
