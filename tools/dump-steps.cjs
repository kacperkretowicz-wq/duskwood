// Zrzut sygnatur kroków wszystkich rozdziałów (podstawa do generowania migracji zapisów).
const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.join(__dirname,'..');
const ctx=vm.createContext({console,window:{}});
for(const f of ['js/core/engine.js',...fs.readdirSync(path.join(root,'js/story')).sort().map(f=>'js/story/'+f)])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx);
const chapters=vm.runInContext('Engine.chapters',ctx);
const sig=s=>JSON.stringify([s.t,s.name,s.to,s.self,s.text,s.chat,s.who,s.ev,s.k,s.iso,s.scene||null]);
const out={};for(const [ch,c] of Object.entries(chapters))out[ch]=c.steps.map(sig);
if(require.main===module)process.stdout.write(JSON.stringify(out));
module.exports={chapters,sig,load:()=>out};
