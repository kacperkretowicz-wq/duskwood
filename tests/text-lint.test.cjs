// Drobne usterki tekstu w dialogach: podwójne spacje, spacja przed przecinkiem, dwie kropki.
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
test('dialogi bez podwójnych spacji, „ ,” i „..”',()=>{
  const dir=path.join(__dirname,'../js/story'),bad=[];
  for(const f of fs.readdirSync(dir).filter(f=>f.endsWith('.js')))fs.readFileSync(path.join(dir,f),'utf8').split('\n').forEach((l,i)=>{
    for(const m of l.matchAll(/'((?:[^'\\]|\\.)*)'/g)){const t=m[1];if(/\S  \S| ,|[^.]\.\.(?!\.)/.test(t))bad.push(f+':'+(i+1)+' '+t.slice(0,60));}});
  assert.deepEqual(bad,[]);
});
