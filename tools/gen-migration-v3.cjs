// Generuje STORY_MIGRATIONS_V3 z listy kroków v2 (zrzut przed dopisaniem scen) i bieżącej.
// Użycie: node tools/gen-migration-v3.cjs v2steps.json  → wypisuje JS do wklejenia w js/data/migrations.js
const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.join(__dirname,'..');
const ctx=vm.createContext({console,window:{}});
for(const f of ['js/core/engine.js',...fs.readdirSync(path.join(root,'js/story')).sort().map(f=>'js/story/'+f)])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx);
const chapters=vm.runInContext('Engine.chapters',ctx);
const sig=s=>JSON.stringify([s.t,s.name,s.to,s.self,s.text,s.chat,s.who,s.ev,s.k,s.iso]);
const old=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const out={};
for(const [ch,c] of Object.entries(chapters)){
  const keep=[];c.steps.forEach((s,i)=>{if(!s.scene)keep.push(i);});
  const o=old[ch];if(!o)continue; // nowe rozdziały (np. sprawa 2) nie mają zapisów v2
  if(keep.length!==o.length)throw new Error(ch+': liczba kroków nie zgadza się '+keep.length+'/'+o.length);
  keep.forEach((ni,i)=>{if(sig(c.steps[ni])!==o[i].sig)throw new Error(ch+': rozbieżny krok '+i);});
  if(keep.every((ni,i)=>ni===i))continue;
  const exact=[...keep,c.steps.length];
  // resume: jeśli tuż przed krokiem stoi nowa scena, wznowienie zaczyna się od jej początku.
  const resume=exact.map(ni=>{let j=ni;while(j>0&&c.steps[j-1].scene)j--;return j;});
  out[ch]={exact,resume};
}
process.stdout.write('// v2 → v3: dopisane sceny sesji 12–19 i 28–29. exact = ten sam krok, resume = początek nowej sceny tuż przed nim.\nconst STORY_MIGRATIONS_V3 = '+JSON.stringify(out)+';\n');
