// Zapis kolejności wiadomości jak u gracza: node tools/transcript.browser.cjs [doRozdziału=ch2] > transkrypt.txt
let chromium;try{({chromium}=require('playwright'));}catch{({chromium}=require(process.env.PLAYWRIGHT_MODULE));}
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:5184';const stopAt=process.argv[2]||'ch2';
(async()=>{
 const browser=await chromium.launch({...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),headless:true});
 const page=await (await browser.newContext({viewport:{width:390,height:844}})).newPage();
 await page.goto(base+'/?debug');
 const out=await page.evaluate(async stopAt=>{
  const log=[];const done=async()=>{};
  Object.assign(UI,{chapterTitle:async ch=>{log.push(`\n===== ${ch.id} · ${ch.title} · ${ch.when||''}`);},chapterEnd:done,interlude:done,fx:done,endingScreen:done,credits:done,endCall:done,incomingCall:async()=>'accept',outgoingCall:done,callScreen(){},packageSheet:async()=>6});
  G.newGame({name:'Alex',gender:'f'});G.settings.speed='instant';G.settings.sfx=false;G.settings.ambient=false;G.settings.autoHints=false;
  document.querySelector('.title-scr')?.remove();UI.renderHome();
  const t=d=>{const x=new Date(d);return x.toLocaleString('pl-PL',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'});};
  BUS.on('msg',({chat,msg})=>log.push(`[${t(msg.t)}] (${chat}) ${msg.from}: ${msg.text||''}${msg.img?' [img:'+msg.img+']':''}${msg.snap?' [SNAP]':''}${msg.ev?' [ev:'+msg.ev+']':''}`));
  let lastObj='';
  const satisfy=c=>{for(const k of [].concat(c)){if(typeof k!=='string')continue;const [ty,...r]=k.split(':');const id=r.join(':');if(ty==='ev')G.addEv(id,true);else if(ty==='solved')G.solve(id);else if(ty==='flag')G.setFlag(id);else if(ty==='seen')G.markSeen(id);else if(ty==='unlocked')G.unlock(id);}};
  const chats=()=>[...new Set([...Object.keys(G.s.chats||{}),...Object.keys(DATA.chats||{})])];
  Engine.restart();const t0=Date.now();let lastKey='',same=0;
  while(Date.now()-t0<200000){
   await new Promise(r=>setTimeout(r,15));Engine.skip();
   if(G.s.chapter===stopAt||G.s.finished)break;
   const o=G.s.objective&&G.s.objective.text;if(o&&o!==lastObj){log.push(`   >> CEL: ${o}`);lastObj=o;}
   const ch=Engine.chapters[G.s.chapter],st=ch&&ch.steps[G.s.pc],p=Engine.pending();
   const key=G.s.chapter+':'+G.s.pc+':'+(p&&p.type);same=key===lastKey?same+1:0;lastKey=key;
   if(p){
    if(p.type==='choose'){log.push(`   ?? WYBÓR (${p.chat}): `+p.options.map(x=>x.text).join(' | '));Engine.answer(p.options[0].i);}
    else if(p.type==='ask'){const a=st.answers.find(a=>a.match)?.match[0]||'tak';log.push(`   ?? PYTANIE → ${a}`);Engine.answer(a);}
    else if(p.type==='show'){const ev=st.accept[0].ev[0];G.addEv(ev,true);log.push(`   ?? POKAŻ → ${ev}`);Engine.answer(ev);}
    else if(p.type==='place')Engine.answer(st.accept[0].place[0]);
    else if(p.type==='dial')Engine.answer(p.numbers.includes('112')?'112':p.numbers[0]);
    continue;}
   if(st&&st.t==='wait'&&same>2){
    if(typeof st.cond==='function'){G.setFlag('sawCalls');if(G.s.chapter==='ch1'&&!G.has('ev_ola_sorry'))G.addEv('ev_ola_fight',true);for(const c of chats()){G.viewing=c;G.change();if(G.test(st.cond))break;}}
    else satisfy(st.cond);G.change();}
   if(same>400){log.push('STUCK '+key);break;}
  }
  return log.join('\n');
 },stopAt);
 console.log(out);await browser.close();
})();
