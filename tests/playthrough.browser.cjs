// Pełne przejście sezonu od prologu do napisów dla każdego zakończenia.
// Automat odpowiada wyłącznie przez interfejs silnika (pending/answer) i spełnia warunki
// oczekiwania tak, jak zrobiłby to gracz (dowód, rozwiązanie, obejrzany kadr).
const assert=require('node:assert/strict');
let chromium;try{({chromium}=require('playwright'));}catch{({chromium}=require(process.env.PLAYWRIGHT_MODULE||'/workspace/.onboarding-tools/node_modules/playwright'));}
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:5173';
(async()=>{
 const browser=await chromium.launch({...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),headless:true});
 try{
  for(const target of ['swit','odlamki','cisza','legacy']){
   const ctx=await browser.newContext({viewport:{width:+(process.env.E2E_WIDTH||390),height:+(process.env.E2E_HEIGHT||844)},reducedMotion:'reduce'}),page=await ctx.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
   await page.goto(base+'/?debug');
   if(target==='legacy'){
    const old=JSON.parse(require('node:fs').readFileSync(require('node:path').join(__dirname,'fixtures/story-v2-steps.json'),'utf8')).ch2;
    const pc=old.findIndex(st=>JSON.parse(st.sig)[4]==='słuchajcie, jeszcze ta klisza. maja dała mi negatywy do skanu w zeszłym tygodniu');
    await page.evaluate(pc=>{window.__legacyPc=pc;},pc);
   }
   const result=await page.evaluate(async run=>{
    const target=run==='legacy'?'swit':run;
    const done=async()=>{};
    Object.assign(UI,{chapterTitle:done,chapterEnd:done,interlude:done,fx:done,endingScreen:done,credits:done,endCall:done,
     incomingCall:async()=>'accept',outgoingCall:done,callScreen(){},packageSheet:async()=>target==='odlamki'?2:6});
    if(run==='legacy'){
     // Zapis z wersji 2: rozdział 2 tuż przed kliszą. Migracja v3 wznawia od nowej sceny „Komendant”.
     G.newGame({name:'Alex',gender:'f'});
     Object.assign(G.s,{v:2,chapter:'ch2',pc:window.__legacyPc,pending:null});
     G.unlock('chat:group');G.unlock('chat:kuba');G.unlock('app:notes');G.setFlag('knowKuba');G.save(true);G.load();
    } else G.newGame({name:'Alex',gender:'f'});
    G.settings.speed='instant';G.settings.sfx=false;G.settings.ambient=false;G.settings.autoHints=false;
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
    const scenes=new Set();const startPc=G.s.pc,startV=G.s.v;
    const t0=Date.now();let steps=0,lastKey='',same=0;
    while(Date.now()-t0<240000){
     await new Promise(r=>setTimeout(r,15));Engine.skip();
     if(G.s.finished)break;
     const ch=Engine.chapters[G.s.chapter],st=ch&&ch.steps[G.s.pc],p=Engine.pending();
     if(st&&st.scene)scenes.add(st.scene);
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
     majaFound:!!G.flag('majaFound'),caught:!!G.flag('gajdaCaught'),scenes:[...scenes].sort(),startPc,startV};
   },target);
   console.log(target,JSON.stringify(result));
   assert.ok(result.finished,`${target}: playthrough reached credits (${JSON.stringify(result)})`);
   const want=target==='legacy'?'swit':target;
   assert.equal(result.ending,want);assert.deepEqual(result.endings,[want]);
   const sceneBase=['f3reset','igorMid','s12','s13','s13go','s14','s15','s16','s17','s18','s19','s28','s29'];
   const scenesWant=(want==='cisza'?sceneBase:['epBartek','epIgor','epOla','f3lib',...sceneBase]).filter(x=>target!=='legacy'||x!=='f3reset').sort();
   if(target==='legacy')assert.equal(result.startV,13);
   assert.deepEqual(result.scenes.filter(x=>!/^(sc|x)[A-Z]/.test(x)),scenesWant);
   if(want==='cisza')assert.equal(result.majaFound,false);else assert.equal(result.majaFound,true);
   if(want==='swit')assert.equal(result.caught,true);
   assert.deepEqual(errors.filter(e=>!/favicon/.test(e)),[]);
   // Każdy czat tej ścieżki (także gorsze zakończenia) mieści się w szerokości telefonu.
   const over=await page.evaluate(async()=>{const W=innerWidth,out=[];document.querySelectorAll('.curtain').forEach(e=>e.remove());
    for(const id of Object.keys(G.s.chats||{})){if(!G.s.chats[id].msgs?.length)continue;UI.openApp('messages',{chat:id});await new Promise(r=>setTimeout(r,30));
     const bad=[...document.querySelectorAll('.screen *')].filter(e=>{const b=e.getBoundingClientRect();return b.width&&b.right>W+2&&getComputedStyle(e).position!=='fixed';});
     if(bad.length||document.documentElement.scrollWidth>W)out.push(id+':'+(bad[0]?.className||'doc'));}return out;});
   assert.deepEqual(over,[],'przepełnienie układu w czatach '+target);
   await ctx.close();
   console.log('PASS full playthrough →',target);
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
