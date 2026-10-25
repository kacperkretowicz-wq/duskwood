// Service worker: offline Range dla wideo, brak zapisu 206/404, fallback nawigacji.
const test=require('node:test'),assert=require('node:assert'),fs=require('fs'),path=require('path'),vm=require('vm');
function load(store, net){
  const h={};const put=[];
  const caches={match:async(r)=>{const k=typeof r==='string'?r:new URL(r.url).pathname;const v=store[k];return v?v.clone():undefined;},
    open:async()=>({put:async(r,res)=>put.push([new URL(r.url).pathname,res.status])}),keys:async()=>[]};
  const ctx={self:{addEventListener:(n,f)=>h[n]=f},caches,fetch:net,location:{origin:'http://x'},URL,Response,Promise,console};
  vm.runInNewContext(fs.readFileSync(path.join(__dirname,'..','sw.js'),'utf8'),ctx);
  return {h,put};
}
async function go(h,url,{range,mode}={}){let p,w=[];h.fetch({request:{url:'http://x'+url,method:'GET',mode:mode||'cors',headers:{get:k=>k==='range'?range:null}},respondWith:x=>p=x,waitUntil:x=>w.push(x)});const r=await p;await Promise.all(w);return r;}
const off=()=>Promise.reject(new Error('offline'));
test('offline Range na wideo zwraca 206',async()=>{
  const {h}=load({'/v.mp4':new Response(new Uint8Array(100),{status:200,headers:{'Content-Type':'video/mp4'}})},off);
  const r=await go(h,'/v.mp4',{range:'bytes=10-19'});
  assert.equal(r.status,206);assert.equal(r.headers.get('Content-Range'),'bytes 10-19/100');assert.equal((await r.arrayBuffer()).byteLength,10);
  const t=await go(h,'/v.mp4',{range:'bytes=0-'});assert.equal(t.headers.get('Content-Range'),'bytes 0-99/100');
});
test('mp4 zapisany jako octet-stream i tak wraca jako video/mp4 przy Range',async()=>{
  const {h}=load({'/v.mp4':new Response(new Uint8Array(20),{status:200,headers:{'Content-Type':'application/octet-stream'}})},off);
  const r=await go(h,'/v.mp4',{range:'bytes=0-3'});
  assert.equal(r.status,206);assert.equal(r.headers.get('Content-Type'),'video/mp4');
});
test('offline nawigacja wraca do index.html',async()=>{
  const {h}=load({'./index.html':new Response('idx')},off);
  assert.equal(await (await go(h,'/cokolwiek?x=1',{mode:'navigate'})).text(),'idx');
});
test('nie zapisuje 404 ani odpowiedzi na Range',async()=>{
  const {h,put}=load({},async u=>u.url.includes('404')?new Response('',{status:404}):Object.defineProperty(new Response('ok'),'type',{value:'basic'}));
  await go(h,'/404.jpg');await go(h,'/v.mp4',{range:'bytes=0-'});await go(h,'/ok.jpg');
  assert.deepEqual(put.map(p=>p[0]),['/ok.jpg']);
});
