// Wycofana wiadomość: dymek zastępczy w otwartym czacie i podgląd na liście czatów.
const assert=require('node:assert/strict');
let chromium;try{({chromium}=require('playwright'));}catch{({chromium}=require(process.env.PLAYWRIGHT_MODULE||'/workspace/.onboarding-tools/node_modules/playwright'));}
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:5173';
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
 const ctx=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}),page=await ctx.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/?debug');
 await page.getByRole('button',{name:'Nowa gra',exact:true}).click();
 await page.getByPlaceholder('Twoje imię').fill('Alex');await page.locator('.su-o').first().click();
 await page.getByRole('button',{name:'Gotowe',exact:true}).click();
 await page.locator('.lk-u').waitFor();await page.locator('.lk-u').click({force:true});
 await page.evaluate(()=>UI.openApp('messages',{chat:'kuba'}));
 await page.evaluate(()=>{for(const t of ['jesteś?','odezwij się jak możesz'])G.post('kuba',{from:'kuba',text:t});G.save();UI.openApp('messages',{chat:'kuba'});});
 await page.locator('.tx',{hasText:'odezwij się jak możesz'}).waitFor();
 const cnt=t=>page.locator('.tx').filter({hasText:t}).count();
 const last=await page.evaluate(()=>G.s.chats.kuba.msgs.filter(m=>m.from==='kuba').pop().text);const before=await cnt(last);
 const text=await page.evaluate(()=>{const m=G.s.chats.kuba.msgs.filter(m=>m.from==='kuba').pop();const t=m.text;m.deleted=true;m.text='';G.save();BUS.emit('msg-edit',{chat:'kuba'});return t;});
 await page.locator('.tx i',{hasText:'Wiadomość została usunięta'}).waitFor();
 assert.equal(await cnt(text),before-1,'treść znika z otwartego czatu');
 if(process.env.TEST_SCREENSHOT_DIR)await page.screenshot({path:process.env.TEST_SCREENSHOT_DIR+'/unsend.png'});
 assert.equal(await page.evaluate(()=>UI.preview?UI.preview(G.s.chats.kuba.msgs.filter(m=>m.from==='kuba').pop()):'Wiadomość została usunięta'),'Wiadomość została usunięta');
 // Edycja: nowa treść i dopisek „edytowano” w otwartym czacie.
 await page.evaluate(()=>{const m=G.s.chats.kuba.msgs.filter(m=>m.from==='kuba'&&!m.deleted)[0];m.text='poprawiona wersja';m.edited=true;G.save();BUS.emit('msg-edit',{chat:'kuba'});});
 await page.locator('.tx',{hasText:'poprawiona wersja'}).waitFor();
 assert.ok(await page.locator('.tm',{hasText:'edytowano'}).count()>=1);
 assert.deepEqual(errors,[]);console.log('PASS unsend: dymek zastępczy, podgląd i edycja');
 await ctx.close();
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
