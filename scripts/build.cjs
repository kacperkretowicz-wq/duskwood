// Whitelist export: no tests, source-control files, or developer docs in the app.
// Startup: local <script>/<link> tags are bundled into one JS and one CSS file in dist/
// (order preserved), so the app does ~2 requests instead of ~90 on cold start.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),out=path.join(root,'dist');
fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
for(const name of ['index.html','manifest.webmanifest','icon.svg','icon-192.png','icon-512.png','apple-touch-icon.png','sw.js','css','js','assets'])
 fs.cpSync(path.join(root,name),path.join(out,name),{recursive:true});
let html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const scripts=[...html.matchAll(/^[ \t]*<script src="(js\/[^"]+)"><\/script>\s*$/gm)].map(m=>m[1]);
const styles=[...html.matchAll(/^[ \t]*<link rel="stylesheet" href="(css\/[^"]+)">\s*$/gm)].map(m=>m[1]);
const js=scripts.map(s=>`// ${s}\n`+fs.readFileSync(path.join(root,s),'utf8')+'\n;').join('\n');
const css=styles.map(s=>`/* ${s} */\n`+fs.readFileSync(path.join(root,s),'utf8')).join('\n');
fs.writeFileSync(path.join(out,'js/app.bundle.js'),js);fs.writeFileSync(path.join(out,'css/app.bundle.css'),css);
let firstJs=true,firstCss=true;
html=html.replace(/^[ \t]*<script src="js\/[^"]+"><\/script>\s*\n/gm,m=>firstJs?(firstJs=false,'  <script src="js/app.bundle.js"></script>\n'):'')
 .replace(/^[ \t]*<link rel="stylesheet" href="css\/[^"]+">\s*\n/gm,m=>firstCss?(firstCss=false,'  <link rel="stylesheet" href="css/app.bundle.css">\n'):'');
fs.writeFileSync(path.join(out,'index.html'),html);
console.log(`Mglisko: dist/ ready (${scripts.length} scripts, ${styles.length} styles bundled)`);
module.exports={scripts,styles};
