// Straszaki: każdy rodzaj działa w trybie pełnym i łagodnym, odpala się raz na zapis,
// nie wraca po wczytaniu i nie psuje zapisu.
const assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
let chromium;try{({chromium}=require('playwright'));}catch{({chromium}=require(process.env.PLAYWRIGHT_MODULE));}
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:5173',shots=process.env.TEST_SCREENSHOT_DIR;
if(shots)fs.mkdirSync(shots,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
 try{
  for(const soft of [false,true]){
   const ctx=await browser.newContext({viewport:{width:390,height:844}}),page=await ctx.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   await page.addInitScript(soft=>{localStorage.setItem('mglisko.settings.v1',JSON.stringify({os:'ios',appearance:'light',sfx:true,ambient:false,speed:'normal',softScares:soft}));},soft);
   await page.goto(base+'/?debug');
   await page.evaluate(()=>{G.newGame();document.querySelector('.title-scr')?.remove();G.s.chapter='ch1';G.s.pc=Engine.chapters.ch1.steps.length;G.save(true);UI.renderHome();});
   // 1) każdy rodzaj pokazuje się i sam znika
   for(const kind of ['glitch','face','photo','breath']){
    const r=page.evaluate(k=>UI.scare(k,{img:'c1_0058',caption:'CAM-01',ms:400}).then(()=>true),kind);
    if(kind==='face'||kind==='photo'){await page.locator('.scare-ov').waitFor();assert.equal(await page.locator('.scare-ov.soft').count(),soft?1:0);if(shots&&kind==='face'&&!soft)await page.screenshot({path:path.join(shots,'straszak-kamera.png')});}
    if(kind==='glitch')assert.equal(await page.evaluate(()=>UI.screen.classList.contains('scare-glitch')),true);
    assert.equal(await r,true);
    assert.equal(await page.locator('.scare-ov').count(),0,kind+' sprząta po sobie');
   }
   // 2) telefon: nieodebrany wpada do rejestru, odebrany kończy się sam
   const missed=page.evaluate(()=>UI.scare('call',{name:'Adam Rybicki · dom',number:'',ms:500}));
   await page.locator('.scare-call').waitFor();
   if(shots&&!soft)await page.screenshot({path:path.join(shots,'straszak-telefon.png')});
   assert.equal(await missed,'missed');
   assert.equal(await page.evaluate(()=>G.s.calls[0].dir+'|'+G.s.calls[0].label),'missed|Adam Rybicki · dom');
   const picked=page.evaluate(()=>UI.scare('call',{name:'Nieznany numer',ms:5000,listen:300}));picked.catch(()=>{});
   await page.locator('.scare-call:not(.out) .c-btn.acc').waitFor({state:'attached'});await page.evaluate(()=>document.querySelector('.scare-call:not(.out) .c-btn.acc').click());
   assert.equal(await picked,'accept');
   // 3) engine: raz na zapis, bez powtórki po wczytaniu, zapis czytelny
   const once=await page.evaluate(async()=>{
    Engine.chapter('zz_scare',{num:99,title:'Test'},D=>[D.scene('scTest',[D.scare('t_once','glitch')]),D.say('kuba','kuba','po'),D.scene('scTest2',[D.scare('t_once','glitch')]),D.label('koniec'),D.pause(60000)]);
    let n=0;const orig=UI.scare;UI.scare=(k,o)=>{n++;return orig(k,o);};
    G.unlock('chat:kuba');Engine.jump('zz_scare');Engine.run();
    await new Promise(r=>setTimeout(r,2500));
    const first=n;G.save(true);G.load();
    G.s.pc=0;Engine.restart();Engine.run();await new Promise(r=>setTimeout(r,1500));
    UI.scare=orig;
    return {first,after:n,stored:!!G.s.scares.t_once,json:JSON.parse(localStorage.getItem('mglisko.save.v1')).scares};
   });
   assert.equal(once.first,1,'jeden straszak mimo dwóch kroków z tym samym id');
   assert.equal(once.after,1,'po wczytaniu i powtórce nie wraca');
   assert.ok(once.stored&&once.json.t_once);
   assert.deepEqual(errors,[]);
   await ctx.close();
   console.log('PASS scares soft='+soft);
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
