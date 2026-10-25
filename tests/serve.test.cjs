// Safari na iPhonie odtwarza <video> dopiero przy video/mp4 i odpowiedzi Range (206).
const {test}=require('node:test'), assert=require('node:assert/strict');
const {createServer}=require('../serve.js');
function listen(srv){return new Promise(r=>srv.listen(0,'127.0.0.1',()=>r(srv.address().port)));}
function close(srv){return new Promise(r=>srv.close(r));}
test('mp4 idzie jako video/mp4, z Accept-Ranges i 206',async()=>{
 const srv=createServer();const port=await listen(srv);
 try{
  const full=await fetch(`http://127.0.0.1:${port}/assets/video/v_snap.mp4`);
  assert.equal(full.status,200);
  assert.equal(full.headers.get('content-type'),'video/mp4');
  assert.equal(full.headers.get('accept-ranges'),'bytes');
  const len=+full.headers.get('content-length');
  assert.ok(len>100);
  await full.arrayBuffer();
  const part=await fetch(`http://127.0.0.1:${port}/assets/video/v_snap.mp4`,{headers:{Range:'bytes=0-7'}});
  assert.equal(part.status,206);
  assert.equal(part.headers.get('content-type'),'video/mp4');
  assert.equal(part.headers.get('content-range'),`bytes 0-7/${len}`);
  assert.equal((await part.arrayBuffer()).byteLength,8);
  const tail=await fetch(`http://127.0.0.1:${port}/assets/video/v_snap.mp4`,{headers:{Range:'bytes=-4'}});
  assert.equal(tail.status,206);
  assert.equal(tail.headers.get('content-range'),`bytes ${len-4}-${len-1}/${len}`);
  const bad=await fetch(`http://127.0.0.1:${port}/assets/video/v_snap.mp4`,{headers:{Range:'bytes=999999999-999999999'}});
  assert.equal(bad.status,416);
  const js=await fetch(`http://127.0.0.1:${port}/js/core/engine.js`);
  assert.equal(js.status,200);
  assert.match(js.headers.get('content-type'),/javascript/);
  await js.arrayBuffer();
 }finally{await close(srv);}
});
