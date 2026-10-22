// Pełne przejście sezonu od prologu do napisów dla każdego zakończenia.
// Automat odpowiada wyłącznie przez interfejs silnika (pending/answer) i spełnia warunki
// oczekiwania tak, jak zrobiłby to gracz (dowód, rozwiązanie, obejrzany kadr).
const assert=require('node:assert/strict');
let chromium;try{({chromium}=require('playwright'));}catch{({chromium}=require(process.env.PLAYWRIGHT_MODULE||'/workspace/.onboarding-tools/node_modules/playwright'));}
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:5173';
(async()=>{
 const browser=await chromium.launch({...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),headless:true});
 try{
  for(const target of ['swit','odlamki','cisza']){
   const ctx=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}),page=await ctx.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
   await page.goto(base+'/?debug');
   const result=await page.evaluate(async target=>{
    const done=async()=>{};
    Object.assign(UI,{chapterTitle:done,chapterEnd:done,interlude:done,fx:done,endingScreen:done,credits:done,endCall:done,
     incomingCall:async()=>'accept',outgoingCall:done,callScreen(){},packageSheet:async()=>target==='odlamki'?2:6});
    G.newGame({name:'Alex',gender:'f'});G.settings.speed='instant';G.settings.sfx=false;G.settings.ambient=false;G.settings.autoHints=false;
    document.querySelector('.title-scr')?.remove();UI.renderHome();
    const chats=()=>[...new Set([...Object.keys(G.s.chats||{}),...Object.keys(DATA.chats||{})])];
    const score=o=>{const set=o.set||{},inc=o.inc||{};let v=0;
     const bad=set.toldGajda||set.gajdaAlert||inc.leaks;
     if(target==='cisza')v+=(set.toldGajda?20:0)+(set.gajdaAlert||inc.leaks?8:0);
     else v+=(bad?-20:0)+(set.reportBoth?6:0)+(set.named112?6:0)+(o.exit?3:0)+(set.dispatchLocal?-6:0);
     return v;};
    const satisfy=c=>{for(const k of [].concat(c)){if(typeof k!=='string')continue;const [t,...r]=k.split(':');const id=r.join(':');
     if(t==='ev')G.addEv(id,true);else if(t==='solved')G.solve(id);else if(t==='flag')G.setFlag(id);else if(t==='seen')G.markSeen(id);else if(t==='unlocked')G.unlock(id);}};
    Engine.restart();
    const t0=Date.now();let steps=0,lastKey='',same=0;
    while(Date.now()-t0<240000){
     await new Promise(r=>setTimeout(r,15));Engine.skip();
     if(G.s.finished)break;
     const ch=Engine.chapters[G.s.chapter],st=ch&&ch.steps[G.s.pc],p=Engine.pending();
     const key=G.s.chapter+':'+G.s.pc+':'+(p&&p.type);
     same=key===lastKey?same+1:0;lastKey=key;
     if(p){steps++;
      if(p.type==='choose'){const full=st.options;const best=p.options.map(o=>({i:o.i,s:score(full[o.i])})).sort((a,b)=>b.s-a.s)[0];Engine.answer(best.i);}
      else if(p.type==='ask')Engine.answer(st.answers.find(a=>a.match)?.match[0]||'tak');
      else if(p.type==='show'){const ev=st.accept[0].ev[0];G.addEv(ev,true);Engine.answer(ev);}
      else if(p.type==='place')Engine.answer(st.accept[0].place[0]);
      else if(p.type==='dial')Engine.answer(p.numbers.includes('112')?'112':p.numbers[0]);
      continue;}
     if(st&&st.t==='wait'&&same>2){
      if(typeof st.cond==='function'){
       G.setFlag('sawCalls');if(G.s.chapter==='ch1'&&!G.has('ev_ola_sorry'))G.addEv('ev_ola_fight',true);
       for(const c of chats()){G.viewing=c;G.change();if(G.test(st.cond))break;}
      }else satisfy(st.cond);
      G.change();
     }
     if(same>400)return{stuck:key,step:st&&st.t};
    }
    return{finished:!!G.s.finished,ending:G.s.vars.endingId,endings:[...G.s.endings],steps,
     majaFound:!!G.flag('majaFound'),caught:!!G.flag('gajdaCaught')};
   },target);
   console.log(target,JSON.stringify(result));
   assert.ok(result.finished,`${target}: playthrough reached credits (${JSON.stringify(result)})`);
   assert.equal(result.ending,target);assert.deepEqual(result.endings,[target]);
   if(target==='cisza')assert.equal(result.majaFound,false);else assert.equal(result.majaFound,true);
   if(target==='swit')assert.equal(result.caught,true);
   assert.deepEqual(errors.filter(e=>!/favicon/.test(e)),[]);
   await ctx.close();
   console.log('PASS full playthrough →',target);
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
