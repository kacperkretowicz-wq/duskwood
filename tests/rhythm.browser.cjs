const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
let chromium;try{({chromium}=require('playwright'));}catch{({chromium}=require(process.env.PLAYWRIGHT_MODULE));}
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:5173',shots=process.env.TEST_SCREENSHOT_DIR;
if(shots)fs.mkdirSync(shots,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
 try{for(const os of ['ios','android']){
  const ctx=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}),page=await ctx.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(os=>localStorage.setItem('mglisko.settings.v1',JSON.stringify({os,speed:'instant',sfx:false,ambient:false})),os);
  await page.goto(base+'/?debug');
  await page.evaluate(()=>{
   G.newGame({name:'Alex',gender:'f'});G.s.chapter='ch1';
   G.s.pc=Engine.chapters.ch1.steps.findIndex(st=>st.rest==='s1_night');
   G.unlock('app:notes');SeasonPacing.configure('daily');document.querySelector('.title-scr')?.remove();
   UI.renderHome();Engine.restart();
  });
  await page.waitForFunction(()=>!!G.s.pacing.rest);
  const before=await page.evaluate(()=>({at:G.s.pacing.rest.at,pc:G.s.pc,count:Object.values(G.s.chats).reduce((n,c)=>n+c.msgs.length,0)}));
  await page.evaluate(()=>UI.openSeason());await page.getByRole('status').filter({hasText:'Powrót do rozmowy'}).waitFor();
  if(shots)await page.screenshot({path:path.join(shots,os+'-przerwa.png')});
  await page.reload();await page.getByRole('button',{name:'Kontynuuj',exact:true}).click();
  await page.waitForFunction(()=>!!G.s.pacing.rest&&G.s.clock.paused);
  assert.deepEqual(await page.evaluate(()=>({at:G.s.pacing.rest.at,pc:G.s.pc,count:Object.values(G.s.chats).reduce((n,c)=>n+c.msgs.length,0)})),before);
  await page.evaluate(()=>UI.openSeason());await page.getByRole('button',{name:'Własne tempo',exact:true}).click();
  // xNieSpisz: spokojne „nie śpisz?” Kuby po przerwie, przed nocnym alarmem.
  await page.waitForFunction(()=>Engine.pending()?.type==='choose');
  await page.evaluate(()=>UI.openApp('messages',{chat:'kuba'}));await page.locator('.composer .opt').first().click();
  await page.waitForFunction(()=>G.isUnlocked('maja:cam57'));
  assert.equal(await page.evaluate(()=>!!G.s.pacing.rest),false);
  // A real deadline can also release a break in the middle of a later season.
  await page.goto(base+'/?debug');
  await page.evaluate(()=>{
   G.newGame({name:'Alex',gender:'f'});G.s.seasonId='s5';G.s.chapter='g0';
   G.s.pc=Engine.chapters.g0.steps.findIndex(st=>st.rest==='s5_voice');
   SeasonPacing.configure('daily');document.querySelector('.title-scr')?.remove();UI.renderHome();Engine.restart();
  });
  await page.waitForFunction(()=>!!G.s.pacing.rest);
  await page.evaluate(()=>{const due=G.s.pacing.rest.at;Date.now=()=>due+1000;SeasonPacing.wake();});
  await page.locator('.call .c-btn.acc').waitFor();
  assert.equal(await page.evaluate(()=>!!G.s.pacing.rest),false);
  // Revised option is both displayed and sent, and still sets the original story flag.
  await page.goto(base+'/?debug');
  await page.evaluate(()=>{
   G.newGame({name:'Alex',gender:'f'});G.s.seasonId='s5';G.s.chapter='g1';
   G.s.pc=Engine.chapters.g1.steps.findIndex(st=>st.t==='choose'&&st.options.some(o=>o.wording?.includes('fiszek')));
   G.unlock('chat:maja2');document.querySelector('.title-scr')?.remove();UI.renderHome();UI.openApp('messages',{chat:'maja2'});Engine.restart();
  });
  await page.locator('.opt').filter({hasText:'Z tych starych fiszek'}).click();
  await page.waitForFunction(()=>G.flag('g_hasloK'));
  assert.ok(await page.evaluate(()=>G.chat('maja2').msgs.some(m=>m.from==='me'&&m.text.includes('fiszek'))));
  // The pinned season note follows the current case after a season transition.
  await page.evaluate(()=>{G.unlock('app:notes');UI.openApp('notes');});
  await page.locator('.nt-row').filter({hasText:'Twoim głosem'}).waitFor();
  assert.equal(await page.locator('.nt-row').filter({hasText:'Szkło pamięta'}).count(),0);
  // Everyday conversation remains readable after leaving and reloading the app.
  await page.goto(base+'/?debug');
  await page.evaluate(()=>{
   G.newGame({name:'Alex',gender:'f'});G.s.chapter='ch3';G.s.pc=Engine.chapters.ch3.steps.length;
   G.addEv('ev_ola_fight',true);document.querySelector('.title-scr')?.remove();UI.renderHome();UI.openConversation('ola_cafe');
  });
  await page.getByRole('button',{name:'Dobra chociaż ta matcha?'}).click();
  await page.getByRole('button',{name:'Co masz na tych zajęciach?'}).waitFor();
  if(shots)await page.screenshot({path:path.join(shots,os+'-ola-kawiarnia.png')});
  const count=await page.evaluate(()=>Conversations.state('ola_cafe').transcript.length);
  await page.evaluate(()=>G.save(true));await page.reload();
  await page.evaluate(()=>{G.load();document.querySelector('.title-scr')?.remove();UI.openConversation('ola_cafe');});
  assert.equal(await page.evaluate(()=>Conversations.state('ola_cafe').transcript.length),count);
  assert.deepEqual(errors,[]);await ctx.close();console.log('PASS rhythm '+os+': persisted real break, free mode, timed wake, revised option, everyday chat');
 }}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
