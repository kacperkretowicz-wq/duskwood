const assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
let chromium;try{({chromium}=require('playwright'));}catch{({chromium}=require(process.env.PLAYWRIGHT_MODULE||'/workspace/.onboarding-tools/node_modules/playwright'));}
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:5173',shots=process.env.TEST_SCREENSHOT_DIR;
if(shots)fs.mkdirSync(shots,{recursive:true});
(async()=>{
 const browser=await chromium.launch({...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),headless:true});
 try{
 for(const os of ['ios','android'])for(const viewport of [{width:390,height:844},{width:360,height:740}]){
  const ctx=await browser.newContext({viewport,reducedMotion:'reduce'}),page=await ctx.newPage(),errors=[],external=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error'&&/Błąd|TypeError|ReferenceError/.test(m.text()))errors.push(m.text());});
  page.on('request',r=>{if(/^https?:/.test(r.url())&&!r.url().startsWith(base))external.push(r.url());});
  await page.addInitScript(os=>localStorage.setItem('mglisko.settings.v1',JSON.stringify({os,appearance:'light',speed:'instant',sfx:false,ambient:false})),os);
  await page.goto(base+'/?debug');
  await page.evaluate(()=>{
   G.newGame({name:'Alex',gender:'f'});G.s.chapter='ch1';G.s.pc=Engine.chapters.ch1.steps.length;
   document.querySelector('.title-scr').remove();
   G.unlock('app:notes');G.unlock('chat:kuba');G.unlock('chat:maja');G.unlock('chat:group');
   G.setFlag('knowKuba');G.setFlag('knowMaja');G.chat('kuba').name='Kuba Wrona';G.chat('kuba').avatar='kuba';
   G.s.objective={text:'Sprawdź ostatnie połączenia od Mai.',hints:[],level:0};UI.renderHome();
  });
  await page.locator('.toast').last().waitFor({state:'detached'});
  assert.equal(await page.locator('.dock .app-ic').count(),4);
  assert.equal(await page.locator('.hub-case').count(),0,'home is a phone launcher');
  await page.evaluate(()=>{G.s.objective.text='Poszukaj artykułu o Tomku Lisie.';BUS.emit('goal');});
  await page.getByRole('button',{name:'Co teraz? Otwórz notatkę'}).filter({hasText:'Tomku Lisie'}).waitFor();
  if(shots&&viewport.width===390)await page.screenshot({path:path.join(shots,os+'-ekran-glowny.png')});
  await page.getByRole('button',{name:'Szukaj',exact:true}).click();
  const search=page.getByRole('searchbox',{name:'Szukaj w telefonie'});
  await search.fill('Gajda');assert.match(await page.locator('.spotlight-results').innerText(),/Brak wyników/);
  await search.fill('Kuba');assert.match(await page.locator('.spotlight-results').innerText(),/Kuba Wrona/);
  await search.fill('zzzzzz');assert.match(await page.locator('.spotlight-results').innerText(),/Brak wyników/);
  await page.keyboard.press('Escape');
  await page.evaluate(()=>UI.openApp('notes'));
  const noteSearch=page.getByRole('searchbox',{name:'Szukaj w notatkach'});
  await noteSearch.fill('zakupy');assert.equal(await page.locator('.nt-row').count(),1);
  await noteSearch.fill('xxxxxxxx');assert.equal(await page.locator('.nt-row').count(),0);
  assert.equal(await noteSearch.evaluate(e=>document.activeElement===e),true,'search retains focus');
  await noteSearch.fill('');
  if(shots&&viewport.width===390)await page.screenshot({path:path.join(shots,os+'-notatki.png')});
  await page.evaluate(()=>{
   G.viewing='kuba';
   G.post('kuba',{from:'kuba',text:'hej. znalazłem jeszcze jej stary telefon w szufladzie'});
   G.post('kuba',{from:'me',text:'Spokojnie. Sprawdźmy najpierw, z kiedy są wiadomości.'});
   G.post('kuba',{from:'kuba',text:'dobra. nie będę nic kasować'});
   UI.openApp('messages',{chat:'kuba'});
  });
  const styles=await page.evaluate(()=>({font:getComputedStyle(document.body).fontFamily,bg:getComputedStyle(document.querySelector('.chat-body')).backgroundColor,size:getComputedStyle(document.querySelector('.bub')).fontSize}));
  assert.equal(styles.bg,'rgb(255, 255, 255)');assert.equal(styles.size,'17px');assert.ok(!styles.font.includes('Inter'));
  assert.equal(await page.locator('.chat.glitchy').count(),0);
  if(shots&&viewport.width===390)await page.screenshot({path:path.join(shots,os+'-wiadomosci.png')});
  await page.evaluate(()=>UI.openApp('settings'));
  await page.getByRole('button',{name:'Ciemny',exact:true}).click();assert.equal(await page.locator('body.dark-ui').count(),1);
  await page.evaluate(()=>UI.openApp('messages',{chat:'kuba'}));
  assert.equal(await page.locator('.chat-body').evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(0, 0, 0)');
  if(shots&&viewport.width===390)await page.screenshot({path:path.join(shots,os+'-wiadomosci-ciemne.png')});
  await page.evaluate(()=>UI.goHome());
  // Every visible launcher button has a working app target, including dock.
  const names=await page.locator('#home .app-ic').evaluateAll(es=>es.map(e=>e.getAttribute('aria-label')));
  for(const name of names){await page.getByRole('button',{name,exact:true}).first().click();assert.ok(await page.locator('.app:not(.closing)').count());await page.evaluate(()=>UI.goHome());await page.locator('.app.closing').waitFor({state:'detached'});}
  assert.equal(await page.locator('#device').evaluate(e=>e.getBoundingClientRect().width),viewport.width);
  assert.deepEqual(external,[],'no downloaded fonts, services or remote assets');assert.deepEqual(errors,[]);
  console.log('PASS '+os+' '+viewport.width+'px: launcher, live goal, search, notes, messages, appearance, all app icons, no external requests');await ctx.close();
 }
 const ctx=await browser.newContext(),page=await ctx.newPage();await page.goto(base+'/');
 await page.evaluate(async()=>{await navigator.serviceWorker.ready;if(!navigator.serviceWorker.controller)await new Promise(r=>navigator.serviceWorker.addEventListener('controllerchange',r,{once:true}));});
 await ctx.setOffline(true);await page.reload();
 assert.ok(await page.evaluate(async()=>(await fetch('css/native-ui.css')).ok&&(await fetch('js/core/native.js')).ok));
 console.log('PASS system UI offline');await ctx.close();
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
