const assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
let chromium;try{({chromium}=require('playwright'));}catch{({chromium}=require(process.env.PLAYWRIGHT_MODULE));}
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:5173',shots=process.env.TEST_SCREENSHOT_DIR;
if(shots)fs.mkdirSync(shots,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
 try{
 for(const os of ['ios','android'])for(const width of [390,360]){
  const ctx=await browser.newContext({viewport:{width,height:width===390?844:740},reducedMotion:'reduce'}),page=await ctx.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)errors.push(r.status()+' '+r.url());});
  await page.addInitScript(os=>{if(!localStorage.getItem('mglisko.settings.v1'))localStorage.setItem('mglisko.settings.v1',JSON.stringify({os,appearance:'light',sfx:false,ambient:false,speed:'instant'}));},os);
  await page.goto(base+'/?debug');await page.evaluate(()=>{
   G.newGame();G.s.chapter='ch1';G.s.pc=Engine.chapters.ch1.steps.length;
   document.querySelector('.title-scr').remove();
   for(const k of ['chat:group','app:notes','app:nimbus','maja:base','nimbus:auth'])G.unlock(k);
   G.addEv('ev_dam_news',true);G.s.objective={text:'Porównaj pochodzenie zdjęcia z datą kopii.',hints:[]};G.save(true);UI.renderHome();
  });
  const initial=await page.evaluate(()=>({pc:G.s.pc,chapter:G.s.chapter,pending:G.s.pending}));
  await page.getByRole('button',{name:'Nimbus',exact:true}).click();
  await page.locator('.nb-tile').filter({hasText:'Tapety'}).click();
  await page.getByRole('button',{name:'Zachowaj warianty tapety'}).click();
  assert.equal(await page.locator('.wallpaper-card').count(),4);
  await page.getByRole('button',{name:'Nad wodą · zbliżenie',exact:true}).click();
  assert.equal(await page.evaluate(()=>Wallpapers.selected().id),'forest','selection is a draft until applied');
  await page.getByRole('button',{name:'Informacje o oryginale'}).click();
  await page.waitForFunction(()=>G.has('ev_wallpaper_original'));
  assert.match(await page.locator('.sheet').last().innerText(),/15.08.2026/);
  await page.keyboard.press('Escape');
  await page.locator('.wallpaper-picker').evaluate(e=>e.closest('.sh-b').scrollTop=0);
  await page.locator('.toast').last().waitFor({state:'detached'});
  if(shots&&width===390)await page.screenshot({path:path.join(shots,os+'-tapety.png')});
  await page.getByRole('button',{name:'Ustaw parę tapet'}).click();
  assert.equal(await page.evaluate(()=>Wallpapers.selected().id),'maja_river_crop');
  await page.evaluate(()=>UI.openApp('notes',{note:'questions',ded:'ded_wallpaper'}));
  const pick=page.locator('.ded-solve .row');
  await page.locator('.ded-o').filter({hasText:'Tak. Zdjęcie'}).click();
  await pick.filter({hasText:'Tapeta Mai · kopia'}).click();await pick.filter({hasText:'Źródło tapety'}).click();
  await page.getByRole('button',{name:'Gotowe',exact:true}).click();await page.locator('.ded-fail').waitFor();
  assert.equal(await page.evaluate(()=>G.has('ev_wallpaper_checked')),false);
  await page.getByRole('button',{name:'Jeszcze raz',exact:true}).click();
  await page.locator('.ded-o').filter({hasText:'Starsze zdjęcie dowodzi'}).click();
  await pick.filter({hasText:'Tapeta Mai · kopia'}).click();await pick.filter({hasText:'Źródło tapety'}).click();
  await page.getByRole('button',{name:'Gotowe',exact:true}).click();await page.locator('.ded-fail').waitFor();
  assert.equal(await page.evaluate(()=>G.has('ev_wallpaper_checked')),false,'opposite unsupported certainty also fails');
  await page.getByRole('button',{name:'Jeszcze raz',exact:true}).click();
  await page.locator('.ded-o').filter({hasText:'Nie da się tego ustalić'}).click();
  await pick.filter({hasText:'Samochód Mai na tamie'}).click();await pick.filter({hasText:'Źródło tapety'}).click();
  await page.getByRole('button',{name:'Gotowe',exact:true}).click();await page.locator('.ded-fail').waitFor();
  assert.equal(await page.evaluate(()=>G.has('ev_wallpaper_checked')),false,'correct answer with wrong support also fails');
  await page.getByRole('button',{name:'Jeszcze raz',exact:true}).click();
  await page.locator('.ded-o').filter({hasText:'Nie da się tego ustalić'}).click();
  await pick.filter({hasText:'Tapeta Mai · kopia'}).click();await pick.filter({hasText:'Źródło tapety'}).click();
  await page.getByRole('button',{name:'Gotowe',exact:true}).click();await page.waitForFunction(()=>G.has('ev_wallpaper_checked'));
  assert.deepEqual(await page.evaluate(()=>({pc:G.s.pc,chapter:G.s.chapter,pending:G.s.pending})),initial);
  await page.evaluate(()=>{UI.goHome();G.save(true);});await page.reload();await page.getByRole('button',{name:'Kontynuuj',exact:true}).click();
  await page.locator('.title-scr').waitFor({state:'detached'});
  assert.equal(await page.evaluate(()=>Wallpapers.selected().id),'maja_river_crop');
  const blank=await page.evaluate(()=>{
   for(let y=230;y<innerHeight-200;y+=15)for(let x=8;x<innerWidth-8;x+=15){
    const e=document.elementFromPoint(x,y);if(e?.closest('#home')&&!e.closest('button,a,input'))return {x,y};
   }throw new Error('No blank wallpaper point');
  });
  // Short tap and drag never open customization.
  await page.mouse.click(blank.x,blank.y);await page.waitForTimeout(720);assert.equal(await page.locator('.wallpaper-picker').count(),0);
  await page.mouse.move(blank.x,blank.y);await page.mouse.down();await page.mouse.move(blank.x+30,blank.y+30);await page.waitForTimeout(720);await page.mouse.up();assert.equal(await page.locator('.wallpaper-picker').count(),0);
  await page.mouse.move(blank.x,blank.y);await page.mouse.down();await page.waitForTimeout(720);await page.mouse.up();await page.locator('.wallpaper-picker').waitFor();
  await page.keyboard.press('Escape');await page.locator('.wallpaper-picker').waitFor({state:'detached'});
  // App icon is never treated as wallpaper.
  const icon=page.getByRole('button',{name:'Notatki',exact:true}).first(),box=await icon.boundingBox();
  await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.waitForTimeout(720);await page.mouse.up();
  assert.equal(await page.locator('.wallpaper-picker').count(),0);assert.equal(await page.evaluate(()=>UI.currentApp()),'notes');
  await page.evaluate(()=>{UI.goHome();UI.lock();});
  await page.mouse.move(width/2,210);await page.mouse.down();await page.waitForTimeout(720);await page.mouse.up();
  await page.locator('.wallpaper-picker').waitFor();assert.equal(await page.evaluate(()=>UI.locked),true);
  await page.getByRole('button',{name:'Grafit',exact:true}).click();await page.getByRole('button',{name:'Ustaw parę tapet'}).click();
  assert.match(await page.locator('#lock').getAttribute('style'),/linear-gradient/);await page.evaluate(()=>UI.unlockScreen());
  await page.locator('#lock').waitFor({state:'detached'});await page.evaluate(()=>UI.openSeason());
  await page.getByRole('button',{name:'Zapisz podsumowanie sesji'}).click();
  assert.equal(await page.locator('.season-episodes li').count(),30);
  assert.equal(await page.locator('.season-episodes').filter({hasText:'Druga karta'}).count(),0,'future reveal title hidden');
  assert.match(await page.locator('.season-recap').filter({hasText:'Przed przerwą'}).innerText(),/Porównaj pochodzenie/);
  if(shots&&width===390)await page.screenshot({path:path.join(shots,os+'-sezon.png')});
  assert.ok(await page.evaluate(()=>document.querySelector('.season-body').scrollWidth<=document.querySelector('.season-body').clientWidth+1));
  // Finished saves have an accessible post-season route, with the correct cast.
  await page.evaluate(()=>{G.s.finished=true;G.s.vars.endingId='swit';G.setFlag('majaFound');delete G.s.seasonArchive;G.save(true);});
  await page.reload();await page.getByRole('button',{name:'Po zakończeniu',exact:true}).click();
  assert.equal(await page.evaluate(()=>G.s.seasonArchive.s1.outcome.ending),'swit','completed legacy saves acquire the continuation archive');
  await page.getByRole('button',{name:'Wróć do śledztwa'}).click();
  await page.evaluate(()=>UI.openConversation('maja_aftercare'));await page.locator('.side-person').filter({hasText:'Maja'}).waitFor();
  assert.equal(await page.evaluate(()=>Conversations.open('kuba_missing')),null);
  await page.evaluate(()=>{
   UI.goHome();G.s.finished=false;G.s.chapter='ch1';G.s.pc=0;G.s.pacing=null;
   SeasonPacing.configure('daily','18:00');G.s.chapter='ch2';Engine.restart();
  });
  await page.waitForFunction(()=>G.s.pacing?.waiting?.chapter==='ch2');
  assert.equal(await page.evaluate(()=>G.s.pc),0,'release holds before the first step');
  assert.equal(await page.evaluate(()=>G.s.clock.paused),true);
  await page.evaluate(()=>{const d=new Date(G.s.pacing.anchor);d.setDate(d.getDate()-32);G.s.pacing.anchor=d.getTime();SeasonPacing.wake();});
  await page.waitForFunction(()=>G.s.pc>0&&!G.s.pacing.waiting);
  assert.deepEqual(errors,[]);console.log(`PASS ${os} ${width}px: wallpaper import, fair red herring, short/long/drag/icon/lock gestures, persistence, recap, spoilers, post-season`);await ctx.close();
 }
 const ctx=await browser.newContext(),p=await ctx.newPage();await p.goto(base+'/');
 await p.evaluate(async()=>{await navigator.serviceWorker.ready;if(!navigator.serviceWorker.controller)await new Promise(r=>navigator.serviceWorker.addEventListener('controllerchange',r,{once:true}));});
 await ctx.setOffline(true);await p.reload();assert.ok(await p.evaluate(async()=>{
  const files=['js/apps/wallpapers.js','js/apps/seasons.js','js/core/seasons.js','js/data/season-conversations.js','css/seasons.css'];return(await Promise.all(files.map(async f=>(await fetch(f)).ok))).every(Boolean);
 }));console.log('PASS season and wallpaper resources offline');await ctx.close();
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
