// Każdy klucz obrazu użyty w historii (img: '…', pic(…, '…')) ma definicję Art.def / D(…) albo jest dowodem.
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..');
const read=d=>fs.readdirSync(path.join(root,d)).filter(f=>f.endsWith('.js')).map(f=>fs.readFileSync(path.join(root,d,f),'utf8')).join('\n');
test('klucze obrazów w historii są zdefiniowane',()=>{
  const story=read('js/story'),all=story+read('js/data')+read('js/art')+read('js/core');
  const used=new Set([...story.matchAll(/\bimg:\s*'([\w-]+)'/g)].map(m=>m[1]).concat([...story.matchAll(/\bpic\(\s*'[\w-]+'\s*,\s*'[\w-]+'\s*,\s*'([\w-]+)'/g)].map(m=>m[1])));
  const defined=k=>new RegExp(`\\b[A-Za-z.]+\\(\\s*'${k}'\\s*,|\\['${k}',|\\b${k}\\s*:|'${k}'\\s*:`).test(all);
  const missing=[...used].filter(k=>!defined(k));
  assert.ok(used.size>20,'za mało kluczy — regex nie działa');
  assert.deepEqual(missing,[]);
});
