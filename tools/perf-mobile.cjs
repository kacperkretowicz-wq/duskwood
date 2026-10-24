// Pomiar: start na słabym telefonie (CPU 4x, 4G ~9 Mb/s, RTT 150 ms) i pamięć po odtworzeniu klipów.
let chromium;try{({chromium}=require('playwright'));}catch{({chromium}=require(process.env.PLAYWRIGHT_MODULE));}
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:5173';
(async()=>{const b=await chromium.launch({...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});const out={};
 try{const ctx=await b.newContext({viewport:{width:360,height:740},isMobile:true,hasTouch:true,deviceScaleFactor:3}),p=await ctx.newPage(),cdp=await ctx.newCDPSession(p);
 await cdp.send('Network.enable');await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
 await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:9e6/8,uploadThroughput:2e6/8});
 await cdp.send('Performance.enable');let bytes=0;p.on('response',async r=>{bytes+=+r.headers()['content-length']||0;});
 const t0=Date.now();await p.goto(base+'/?debug');await p.waitForFunction(()=>typeof G!=='undefined'&&document.querySelector('.title-scr'));
 out.coldTitleMs=Date.now()-t0;out.coldKB=Math.round(bytes/1024);
 const m=async()=>Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.filter(x=>['JSHeapUsedSize','Nodes'].includes(x.name)).map(x=>[x.name,x.name==='Nodes'?x.value:Math.round(x.value/1048576)+'MB']));
 out.afterLoad=await m();
 await p.reload();const t1=Date.now();await p.waitForFunction(()=>typeof G!=='undefined'&&document.querySelector('.title-scr'));out.warmTitleMs=Date.now()-t1;
 await p.evaluate(()=>{G.newGame({name:'A',gender:'f'});document.querySelector('.title-scr')?.remove();UI.renderHome();});
 const vids=['assets/video/v_most40.mp4','assets/video/v_most42.mp4','assets/video/v_stodola.mp4'];
 for(const v of vids)await p.evaluate(async src=>{const el=document.createElement('video');el.muted=true;el.playsInline=true;el.src=src;document.body.append(el);await el.play().catch(()=>{});await new Promise(r=>setTimeout(r,1500));el.pause();el.removeAttribute('src');el.load();el.remove();},v);
 out.afterVideos=await m();
 await cdp.send('HeapProfiler.collectGarbage');out.afterGC=await m();
 console.log(JSON.stringify(out));}finally{await b.close();}})().catch(e=>{console.error(e);process.exit(1);});
