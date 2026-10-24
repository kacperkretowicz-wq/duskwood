// Whitelist export: no tests, source-control files, or developer docs in the app.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),out=path.join(root,'dist');
fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
for(const name of ['index.html','manifest.webmanifest','icon.svg','icon-192.png','icon-512.png','apple-touch-icon.png','sw.js','css','js','assets'])
 fs.cpSync(path.join(root,name),path.join(out,name),{recursive:true});
console.log('Mglisko: local game assets exported to dist/');
