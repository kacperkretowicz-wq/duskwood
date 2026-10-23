// P7: wejścia do S2 po „Odłamkach” (Gajda niezatrzymany) i do S3 po „Cudzym podpisie” pokazują własne sceny.
const assert=require('node:assert/strict');
let chromium;try{({chromium}=require('playwright'));}catch{({chromium}=require(process.env.PLAYWRIGHT_MODULE));}
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:5173';
const CASES=[
 {name:'S2 po odlamki',setup:'s1',ending:'odlamki',chat:'maja2',until:'m1',want:'radiowóz dalej przejeżdża',chapter:'m0'},
 {name:'S2 po swit',setup:'s1',ending:'swit',chat:'maja2',until:'m1',not:'radiowóz dalej przejeżdża',chapter:'m0'},
 {name:'S3 po cudzy_podpis',setup:'s2',ending:'cudzy_podpis',chat:'weronika',until:'k1',want:'Pani Krystyna dalej nie otwiera',chapter:'k0'},
 {name:'S3 po pelny_kadr',setup:'s2',ending:'pelny_kadr',chat:'weronika',until:'k1',not:'Pani Krystyna dalej nie otwiera',chapter:'k0'}
];
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
 try{for(const c of CASES){
  const ctx=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}),page=await ctx.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.goto(base+'/?debug');
  const res=await page.evaluate(async c=>{
   G.newGame({name:'Alex',gender:'m'});Object.assign(G.settings,{speed:'instant',sfx:false,ambient:false,autoHints:false});document.querySelector('.title-scr')?.remove();
   G.s.finished=true;G.s.chapter='epilog';G.s.vars.endingId=c.setup==='s1'?c.ending:'swit';G.setFlag('majaFound');G.unlock('app:notes');
   if(!Seasons.startNext())return{err:'s1 start'};
   if(c.setup==='s2'){G.s.finished=true;G.s.chapter='m5';G.s.vars.s2Ending=c.ending;if(!Seasons.startNext())return{err:'s2 start'};}
   const first=G.s.chapter;
   const done=async()=>{};Object.assign(UI,{endingScreen:done,credits:done,chapterTitle:done,chapterEnd:done,interlude:done,fx:done,endCall:done,incomingCall:async()=>'accept',outgoingCall:done,callScreen(){}});
   const satisfy=k=>{for(const x of [].concat(k)){if(typeof x!=='string')continue;const [t,...r]=x.split(':');const id=r.join(':');if(t==='ev')G.addEv(id,true);else if(t==='solved')G.solve(id);else if(t==='flag')G.setFlag(id);else if(t==='seen')G.markSeen(id);else if(t==='unlocked')G.unlock(id);}};
   Engine.restart();const t0=Date.now();let last='',same=0;
   while(Date.now()-t0<60000&&G.s.chapter!==c.until&&!G.s.finished){
    await new Promise(r=>setTimeout(r,15));Engine.skip();
    const ch=Engine.chapters[G.s.chapter],st=ch&&ch.steps[G.s.pc],p=Engine.pending();
    const key=G.s.chapter+':'+G.s.pc+':'+(p&&p.type);same=key===last?same+1:0;last=key;
    if(p){if(p.type==='choose')Engine.answer(p.options[0].i);else if(p.type==='dial')Engine.answer(p.numbers[0]);else if(p.type==='show'){const ev=st.accept[0].ev[0];G.addEv(ev,true);Engine.answer(ev);}else if(p.type==='ask')Engine.answer(st.answers[0].match?st.answers[0].match[0]:'tak');continue;}
    if(st&&st.t==='wait'&&same>2){if(typeof st.cond==='function'){UI.openApp('browser',{page:'tt_archiwum'});await new Promise(r=>setTimeout(r,150));UI.goHome();}else satisfy(st.cond);G.change();}
    if(same>400)return{stuck:key};
   }
   const texts=(G.s.chats[c.chat]?.msgs||[]).map(m=>String(m.text||''));
   return{first,reached:G.s.chapter,has:c.want?texts.some(t=>t.includes(c.want)):null,hasNot:c.not?texts.some(t=>t.includes(c.not)):null};
  },c);
  assert.equal(res.first,c.chapter,JSON.stringify(res));assert.equal(res.reached,c.until,JSON.stringify(res));
  if(c.want)assert.equal(res.has,true,c.name);if(c.not)assert.equal(res.hasNot,false,c.name);
  assert.deepEqual(errors,[]);await ctx.close();console.log('PASS',c.name);
 }}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
