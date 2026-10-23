// Przelicza tabele V3, V4 i V5 w js/data/migrations.js po zmianie kroków historii (V3 musi zostać na końcu pliku — tak sprawdza test).
// Tabele mapują stare zapisy wprost na bieżące kroki. Użycie: node tools/regen-migrations.cjs
const fs=require('fs'),path=require('path'),{execFileSync}=require('child_process');
const root=path.join(__dirname,'..'),file=path.join(root,'js/data/migrations.js');
const gen=(tool,fx)=>execFileSync(process.execPath,[path.join(__dirname,tool),path.join(root,'tests/fixtures',fx)],{encoding:'utf8'});
let src=fs.readFileSync(file,'utf8').replace(/\r\n/g,'\n');
const parts={V4:gen('gen-migration-v4.cjs','story-v3-steps.json'),V3:gen('gen-migration-v3.cjs','story-v2-steps.json'),V5:gen('gen-migration-v5.cjs','story-v4-steps.json')};
const lines=src.split('\n');const keep=[];
for(let i=0;i<lines.length;i++){
  if(/^\/\/ v[2-4] → v[3-5]:/.test(lines[i])&&/^const STORY_MIGRATIONS_V[345] =/.test(lines[i+1]||'')){i++;continue;}
  keep.push(lines[i]);
}
while(keep.length&&keep[keep.length-1]==='')keep.pop();
fs.writeFileSync(file,keep.join('\n')+'\n'+parts.V4+parts.V5+parts.V3);
