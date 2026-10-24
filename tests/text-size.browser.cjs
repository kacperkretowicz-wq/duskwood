const assert=require('node:assert/strict');
let chromium;try{({chromium}=require('playwright'));}catch{({chromium}=require(process.env.PLAYWRIGHT_MODULE||'/workspace/.onboarding-tools/node_modules/playwright'));}
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:5173';
(async()=>{
 const browser=await chromium.launch({...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),headless:true});
 try{
  const ctx=await browser.newContext({viewport:{width:375,height:667},reducedMotion:'reduce'}),page=await ctx.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{if(!sessionStorage.getItem('init')){sessionStorage.setItem('init','1');localStorage.setItem('mglisko.settings.v1',JSON.stringify({speed:'instant',sfx:false,ambient:false}));}});
  await page.goto(base+'/?debug');
  const size=()=>page.evaluate(()=>{const b=document.createElement('div');b.className='bub';b.textContent='x';document.body.append(b);const s=parseFloat(getComputedStyle(b).fontSize);b.remove();return s;});
  assert.equal(await page.evaluate(()=>G.settings.textSize),'m');
  const m=await size();
  for(const [k,cls] of [['l','ts-l'],['xl','ts-xl']]){
   await page.evaluate(k=>{G.settings.textSize=k;G.saveSettings();BUS.emit('settings');},k);
   assert.ok(await page.evaluate(c=>document.body.classList.contains(c),cls),cls);
  }
  const xl=await size();assert.ok(xl>m,`xl ${xl} > m ${m}`);
  await page.reload();
  assert.equal(await page.evaluate(()=>G.settings.textSize),'xl','persists');
  assert.ok(await page.evaluate(()=>document.body.classList.contains('ts-xl')));
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'no horizontal overflow');
  assert.deepEqual(errors,[]);console.log('text-size OK');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
