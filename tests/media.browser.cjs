// Nowe mechaniki telefonu: przesyłanie w pobliżu, aparat w grze, znikające wiadomości z zrzutem, wideo w czacie.
const assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
let chromium;try{({chromium}=require('playwright'));}catch{({chromium}=require(process.env.PLAYWRIGHT_MODULE));}
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:5173',shots=process.env.TEST_SCREENSHOT_DIR;if(shots)fs.mkdirSync(shots,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
 try{
  for(const os of ['ios','android']){
   const ctx=await browser.newContext({viewport:{width:390,height:844}}),page=await ctx.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   await page.addInitScript(os=>localStorage.setItem('mglisko.settings.v1',JSON.stringify({os,appearance:'light',sfx:true,ambient:false,speed:'normal'})),os);
   await page.goto(base+'/?debug');
   await page.evaluate(()=>{G.newGame({name:'Alex',gender:'f'});document.querySelector('.title-scr')?.remove();G.s.chapter='ch1';G.s.pc=Engine.chapters.ch1.steps.length;G.save(true);UI.renderHome();
    Engine.chapter('zz_media',{num:98,title:'Media'},D=>[
     D.nearby('t_near',{device:'Telefon',img:'k_peron',flag:'t_nearOk',ev:'ev_k_peron'}),
     D.say('blysk','blysk','sekret',{vanish:true}),
     D.choose('blysk',[D.opt('Zrób zrzut ekranu',[],{shot:true,set:{t_shot:true}}),D.opt('Nic',[])]),
     D.vanish('blysk'),
     D.say('lena','lena','',{vid:'assets/video/v_petla.mp4',img:'v_petla'}),
     D.camera('maja2',[D.opt('Cała strona',[],{img:'k_zeszyt'}),D.opt('Zbliżenie',[],{img:'k_zeszyt_zoom',set:{t_zoom:true}}),D.opt('Z galerii',[],{img:'k_biurko',gallery:true})]),
     D.label('koniec'),D.pause(60000)]);
    ['chat:blysk','chat:lena','chat:maja2'].forEach(k=>G.unlock(k));Engine.jump('zz_media');Engine.run();});
   await page.locator('.nearby-card').waitFor();
   await page.waitForTimeout(400);if(shots)await page.screenshot({path:path.join(shots,`${os}-przesylanie-w-poblizu.png`)});
   await page.locator('.nearby-card .btn.pri').click();
   await page.waitForFunction(()=>G.flag('t_nearOk')&&G.has('ev_k_peron'));
   await page.evaluate(()=>{document.querySelectorAll('.viewer,.sheet,.overlay').forEach(n=>n.remove());UI.goHome();UI.openApp('messages',{chat:'blysk'});});
   await page.locator('.opt.shot').waitFor();
   await page.waitForTimeout(700);if(shots)await page.screenshot({path:path.join(shots,`${os}-blysk-znika.png`)});
   await page.locator('.opt.shot').click();
   await page.waitForFunction(()=>G.flag('t_shot')&&!G.chat('blysk').msgs.some(m=>m.vanish));
   const sys=await page.evaluate(()=>G.chat('blysk').msgs.filter(m=>m.from==='sys').map(m=>m.text));
   assert.ok(sys.some(t=>/zrzut ekranu/.test(t))&&sys.some(t=>/zniknęły/.test(t)),JSON.stringify(sys));
   await page.evaluate(()=>{UI.goHome();UI.openApp('messages',{chat:'maja2'});});
   await page.locator('.opt.cam-open').waitFor();await page.locator('.opt.cam-open').click();
   await page.locator('.cam-ov').waitFor();await page.locator('.cam-chip').nth(1).click();
   if(shots)await page.screenshot({path:path.join(shots,`${os}-aparat.png`)});
   await page.locator('.cam-shutter').click();
   await page.waitForFunction(()=>G.flag('t_zoom'));
   assert.equal(await page.evaluate(()=>G.chat('maja2').msgs.at(-1).img),'k_zeszyt_zoom');
   await page.evaluate(()=>{UI.goHome();UI.openApp('messages',{chat:'lena'});});
   await page.locator('video.mvid').waitFor();
   await page.waitForTimeout(900);if(shots)await page.screenshot({path:path.join(shots,`${os}-wideo.png`)});
   assert.deepEqual(errors,[]);await ctx.close();console.log('PASS media',os);
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
