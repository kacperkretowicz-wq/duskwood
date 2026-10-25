// Authored opening played through real choices, phone records and search pages.
const assert=require('node:assert/strict');
let chromium;try{({chromium}=require('playwright'));}catch{({chromium}=require(process.env.PLAYWRIGHT_MODULE||'/workspace/.onboarding-tools/node_modules/playwright'));}
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:5173';
(async()=>{
 const browser=await chromium.launch({...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),headless:true});
 try{
 const ctx=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}),page=await ctx.newPage(),errors=[];
 page.setDefaultTimeout(20000);
 const log=async label=>console.log(label,await page.evaluate(()=>({chapter:G.s?.chapter,pc:G.s?.pc,goal:G.s?.objective?.text,pending:Engine.pending()?.type})));
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/?debug');
 await page.getByRole('button',{name:'Nowa gra',exact:true}).click();
 await page.getByPlaceholder('Twoje imię').fill('Alex');await page.locator('.su-o').first().click();
 await page.getByRole('button',{name:'Gotowe',exact:true}).click();
 await page.locator('.lk-u').waitFor();await page.locator('.lk-u').click({force:true});
 const open=async(app,params)=>page.evaluate(({app,params})=>UI.openApp(app,params),{app,params});
 const choice=async(index=0)=>{const b=page.locator('.composer .opt').nth(index);await b.waitFor();await b.click();};
 const show=async(ev)=>{
  await page.waitForFunction(()=>Engine.pending()?.type==='show');await open('messages',{chat:'kuba'});
  await page.locator('.composer.action button').click();
  const title=await page.evaluate(id=>DATA.evidence[id].title,ev);
  await page.locator('.evpick .row').filter({hasText:title}).click();
 };
 const search=async(query,result)=>{
  await open('browser',{});const input=page.getByPlaceholder('Szukaj w sieci…').last();
  await input.fill(query);await input.press('Enter');await page.locator('.res').filter({hasText:result}).click();
 };
 await open('messages',{chat:'ekipa'});await page.locator('.chat.skin-gadka').waitFor();
 await page.locator('.snap-tile:not(.opened)').click();await page.locator('.snap-ov video').waitFor();await page.waitForTimeout(2500);const bw=await page.evaluate(()=>{const i=document.querySelector('.snap-bar i');return i.getBoundingClientRect().width/i.parentElement.getBoundingClientRect().width;});assert.ok(bw>0.15&&bw<0.95,'pasek w trakcie: '+bw);await page.screenshot({path:'/tmp/opening-snap.png'});
 await page.waitForFunction(()=>G.flag('sawSnap'),null,{timeout:15000});
 assert.equal(await page.locator('.snap-ov').count(),0,'film znika po jednym obejrzeniu');
 await page.locator('.snap-tile.opened').waitFor();await page.screenshot({path:'/tmp/opening-ekipa.png'});
 await choice();await log('Ekipa snap watched once');
 await open('messages',{chat:'kuba'});await choice();await choice();await log('Kuba introduced');
 await page.waitForFunction(()=>G.s.objective?.text.includes('rejestr'));
 await open('phone',{});await page.waitForFunction(()=>G.flag('sawCalls'));
 await page.locator('.list .row').first().click();
 assert.match(await page.locator('.sheet, .sh').last().innerText(),/SMS z 13\.10/);
 assert.doesNotMatch(await page.locator('.sheet, .sh').last().innerText(),/Maja Wrona|ZAGINIONA/);
 await page.keyboard.press('Escape');
 await open('messages',{chat:'maja'});await page.waitForFunction(()=>G.has('ev_sms_maja')&&G.has('ev_missed')&&G.has('ev_backup_cut'));
 assert.ok(await page.evaluate(()=>G.chat('maja').msgs.some(m=>/23:58/.test(m.text||''))));
 await page.evaluate(()=>UI.goHome());await open('messages',{});
 const earlyCard=await page.locator('.case-card').last().innerText();
 assert.doesNotMatch(earlyCard,/Maja|ZAGINIONA/);assert.match(earlyCard,/731 402 118/);
 await log('Phone and SMS checked');
 await show('ev_sms_maja');await choice();
 await page.waitForFunction(()=>G.s.objective?.text.includes('Tomek Lis'));
 await search('Tomek Lis','Dziesięć lat ciszy');await page.waitForFunction(()=>G.has('ev_article2007'));await log('Article found');
 await show('ev_article2007');await choice();
 await page.waitForFunction(()=>G.s.objective?.text.includes('Adamem Rybickim'));
 await search('Adam Rybicki','Odszedł Adam Rybicki');await page.waitForFunction(()=>G.has('ev_obit'));
 await page.waitForFunction(()=>!G.s.objective||!/Rybickim/.test(G.s.objective.text));await log('Obituary found');
 await show('ev_obit');await choice();await choice();
 await page.waitForFunction(()=>G.isUnlocked('chat:group')&&G.flag('knowMaja')&&G.chat('group').msgs.some(m=>/dodałem/.test(m.text||'')));
 const added=await page.evaluate(()=>U.tpl(G.chat('group').msgs.find(m=>/dodałem/.test(m.text||'')).text));
 assert.match(added,/dodałem go/);assert.doesNotMatch(added,/dodałem Alex/);assert.match(added,/Alex/);
 await page.evaluate(()=>UI.goHome());await open('messages',{});
 assert.match(await page.locator('.case-card').last().innerText(),/Maja Wrona/);
 assert.match(await page.locator('.case-card').last().innerText(),/ZAGINIONA/);
 await open('messages',{chat:'group'});await choice();await choice();
 await open('messages',{chat:'kuba'});await choice();await log('Kuba recap (xCel)');
 await page.waitForFunction(()=>G.isUnlocked('chat:szklarz'),null,{timeout:60000});
 await open('messages',{chat:'szklarz'});
 assert.equal(await page.locator('.chat.glitchy').count(),0);
 assert.equal(await page.locator('#screen.glitch').count(),0);
 assert.equal(await page.evaluate(()=>G.isUnlocked('app:nimbus')),false,'Nimbus arrives when the next chapter unlocks it');
 assert.ok(await page.evaluate(()=>['ev_missed','ev_sms_maja','ev_article2007','ev_obit','ev_backup_cut','ev_sim_footer'].every(G.has)));
 assert.deepEqual(errors,[]);console.log('PASS authored prolog: calls → SMS → two searches → attachments → group → unknown sender');
 await ctx.close();
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
