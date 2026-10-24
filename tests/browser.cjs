// Run against `node serve.js`. Tooling is external to this dependency-free app.
const assert = require('node:assert/strict');
let chromium;
try { ({chromium}=require('playwright')); }
catch { ({chromium}=require(process.env.PLAYWRIGHT_MODULE || '/workspace/.onboarding-tools/node_modules/playwright')); }
const base=process.env.TEST_BASE_URL || 'http://127.0.0.1:5173';
(async()=>{
const browser=await chromium.launch({...(process.env.CHROMIUM_PATH ? {executablePath:process.env.CHROMIUM_PATH} : {}),headless:true,args:['--no-sandbox']});
let passed=0;
try {
 for(const viewport of [{width:1440,height:1050},{width:390,height:844}]) {
  const ctx=await browser.newContext({viewport, reducedMotion:'reduce'}),page=await ctx.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error' && /Błąd|Error|TypeError|ReferenceError/.test(m.text())) errors.push(m.text());});
  await page.goto(base+'/?debug');
  await page.getByRole('button',{name:'Nowa gra',exact:true}).click();
  await page.getByPlaceholder('Twoje imię').fill('Alex');
  await page.locator('.su-o').first().click();await page.getByRole('button',{name:'Gotowe',exact:true}).click();
  await page.locator('.lk-u').waitFor({state:'visible'});await page.locator('.lk-u').click({force:true});
  await page.waitForFunction(()=>G.s.chats.kuba?.msgs.length>=2);
  await page.evaluate(()=>UI.openApp('messages',{chat:'kuba'}));
  await page.locator('.composer .opt').first().waitFor();
  await page.locator('.composer .opt').first().click();
  await page.waitForFunction(()=>G.chat('kuba').msgs.some(m=>m.from==='me'));
  assert.equal(await page.evaluate(()=>G.s.player.name),'Alex');
  assert.equal(await page.locator('.chat .delivery').count(),1);
  await page.evaluate(()=>G.save(true));await page.reload();
  await page.getByRole('button',{name:'Kontynuuj',exact:true}).click();
  assert.equal(await page.evaluate(()=>G.s.player.name),'Alex');
  console.log('PASS new game, choice, save/resume at '+viewport.width+'px');passed++;
  await ctx.close();assert.deepEqual(errors,[]);
 }
 const ctx=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}),page=await ctx.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/?debug');
 await page.evaluate(()=>{
  G.newGame({name:'Alex',gender:'f'});G.settings.sfx=false;G.settings.ambient=false;
  document.querySelector('.title-scr').remove();UI.renderHome();
  for(const id of ['kuba','ola','maja','group'])G.unlock('chat:'+id);
  Object.assign(G.chat('kuba'),{name:'Kuba Wrona',avatar:'kuba'});
  Object.assign(G.chat('maja'),{name:'Maja Wrona',avatar:'maja'});
  G.viewing='kuba';G.post('kuba',{from:'kuba',text:'to numer, na który dzwoniła maja?'});
  G.viewing='ola';G.post('ola',{from:'ola',text:'Daj znać, jak coś znajdziesz.'});
  G.markRead('ola');G.chat('kuba').unread=1;G.viewing=null;UI.openApp('messages');
 });
 const rows=page.locator('.conversation-list .crow');assert.equal(await rows.count(),4);
 await page.getByRole('searchbox',{name:'Szukaj rozmowy'}).fill('KUBA');assert.equal(await rows.count(),1);
 await page.getByRole('searchbox',{name:'Szukaj rozmowy'}).fill('nieistniejąca');assert.equal(await rows.count(),0);
 await page.getByRole('searchbox',{name:'Szukaj rozmowy'}).fill('');
 await page.getByRole('button',{name:'Nieprzeczytane',exact:true}).click();assert.equal(await rows.count(),1);
 await rows.first().click();await page.getByRole('button',{name:'Otwórz profil rozmówcy'}).click();
 assert.match(await page.locator('.contact-profile').innerText(),/informatyka, pierwszy rok/);
 await page.keyboard.press('Escape');
 await page.locator('.contact-profile').waitFor({state:'detached'});
 console.log('PASS search, unread filter, contact profile, close with Escape');passed++;
 await page.evaluate(()=>UI.openApp('browser',{page:'kadr:maja.wrona'}));
assert.ok(await page.locator('.photo-av, .av img[src*="assets/people/"]').count()>0);
 await page.evaluate(()=>UI.goHome());
 for(const app of ['phone','browser','gallery','maps','settings']) {
  await page.evaluate(id=>UI.openApp(id),app);
  assert.equal(await page.locator('.app-'+app+':not(.closing)').count(),1);
 }
 console.log('PASS phone, browser, gallery, maps, settings mounts');passed++;
 await page.evaluate(()=>{
  const legacy=JSON.parse(JSON.stringify(G.s));legacy.v=1;legacy.chapter='prolog';legacy.pc=173;
  localStorage.setItem('mglisko.save.v1',JSON.stringify(legacy));localStorage.setItem('mglisko.cp.v1.prolog',JSON.stringify(legacy));
  G.load();
 });
 assert.equal(await page.evaluate(()=>Engine.chapters.prolog.steps[G.s.pc].self),'c36');
 await page.evaluate(()=>G.loadCheckpoint('prolog'));
 assert.equal(await page.evaluate(()=>G.s.v),7);
 assert.equal(await page.evaluate(()=>Engine.chapters.prolog.steps[G.s.pc].self),'c36');
 console.log('PASS legacy save and checkpoint migration');passed++;
 const timing=await page.evaluate(async()=>{
  UI.goHome();G.newGame({name:'Alex',gender:'m'});G.viewing='kuba';G.settings.speed='normal';
  const events=[];const off=BUS.on('typing',e=>events.push({on:e.on,at:performance.now()}));
  const start=performance.now();await Engine.talk('kuba','kuba','hej, jesteś jeszcze?');off();
  return {elapsed:performance.now()-start,typing:events[1].at-events[0].at};
 });assert.ok(timing.elapsed>2000 && timing.typing>1000);
 await page.evaluate(async()=>{
  G.s.pc=Engine.chapters.prolog.steps.length;
  const pending=Engine.talk('kuba','kuba','Ta wiadomość nie może pojawić się po restarcie.').catch(()=>{});
  Engine.restart();await pending;
 });
 assert.equal(await page.evaluate(()=>G.chat('kuba').msgs.some(m=>m.text.startsWith('Ta wiadomość'))),false);
 console.log('PASS normal pacing and cancellation on restart');passed++;
 assert.deepEqual(errors,[]);await ctx.close();
 const offline=await browser.newContext({reducedMotion:'reduce'}),op=await offline.newPage();
 await op.goto(base+'/');await op.evaluate(async()=>{await navigator.serviceWorker.ready;if(!navigator.serviceWorker.controller)await new Promise(r=>navigator.serviceWorker.addEventListener('controllerchange',r,{once:true}));});
 await offline.setOffline(true);await op.reload();await op.getByRole('button',{name:'Nowa gra',exact:true}).waitFor();
 const assets=await op.evaluate(async()=>{
  const urls=['css/messenger.css','assets/people.jpg','assets/forest.jpg','assets/maja-river.jpg','assets/gajda.jpg','js/data/migrations.js'];
  return Promise.all(urls.map(async u=>(await fetch(u)).ok));
 });assert.ok(assets.every(Boolean));
 console.log('PASS offline reload with new styles, photos, migration');passed++;
 await offline.close();console.log(passed+' browser scenarios passed');
} finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
