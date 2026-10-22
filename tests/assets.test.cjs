// Każdy obraz użyty w kodzie istnieje, jest w cache offline (sw.js) i nie jest za ciężki na telefon.
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..');
const walk=d=>fs.readdirSync(path.join(root,d),{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(d+'/'+e.name):[d+'/'+e.name]);
test('assets: referenced files exist, are cached offline and stay light',()=>{
 const src=[...walk('js'),...walk('css'),'index.html'].filter(f=>/\.(js|css|html)$/.test(f)).map(f=>fs.readFileSync(path.join(root,f),'utf8')).join('\n');
 const refs=[...new Set(src.match(/assets\/[\w\-/.]+\.(?:jpg|png|webp|svg|mp4)/g))];
 const sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');
 assert.deepEqual(refs.filter(r=>!fs.existsSync(path.join(root,r))),[],'brakujące pliki');
 assert.deepEqual(refs.filter(r=>!sw.includes('./'+r)),[],'brak w cache offline');
 for(const f of [...sw.matchAll(/'\.\/([^']+)'/g)].map(m=>m[1]).filter(Boolean))assert.ok(fs.existsSync(path.join(root,f)),'sw.js wskazuje na nieistniejący '+f);
 const heavy=walk('assets').filter(f=>fs.statSync(path.join(root,f)).size>450*1024);
 assert.deepEqual(heavy,[],'obrazy powyżej 450 KB');
});
