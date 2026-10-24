// Przelicza tabele V3, V4, V5, V6 i V7 w js/data/migrations.js po zmianie kroków historii (V3 musi zostać na końcu pliku — tak sprawdza test).
// Tabele mapują stare zapisy wprost na bieżące kroki. Użycie: node tools/regen-migrations.cjs
const fs=require('fs'),path=require('path'),{execFileSync}=require('child_process');
const root=path.join(__dirname,'..'),file=path.join(root,'js/data/migrations.js');
const gen=(tool,fx)=>execFileSync(process.execPath,[path.join(__dirname,tool),path.join(root,'tests/fixtures',fx)],{encoding:'utf8'});
let src=fs.readFileSync(file,'utf8').replace(/\r\n/g,'\n');
const parts={V4:gen('gen-migration-v4.cjs','story-v3-steps.json'),V3:gen('gen-migration-v3.cjs','story-v2-steps.json'),V5:gen('gen-migration-v5.cjs','story-v4-steps.json'),V6:gen('gen-migration-v6.cjs','story-v5-steps.json'),V7:gen('gen-migration-v7.cjs','story-v6-steps.json'),V8:gen('gen-migration-v8.cjs','story-v7-steps.json'),V9:gen('gen-migration-v9.cjs','story-v8-steps.json'),V10:gen('gen-migration-v10.cjs','story-v9-steps.json'),V11:gen('gen-migration-v11.cjs','story-v10-steps.json'),V12:gen('gen-migration-v12.cjs','story-v11-steps.json'),V13:gen('gen-migration-v13.cjs','story-v12-steps.json'),V14:gen('gen-migration-v14.cjs','story-v13-steps.json'),V15:gen('gen-migration-v15.cjs','story-v14-steps.json')};
const lines=src.split('\n');const keep=[];
for(let i=0;i<lines.length;i++){
  if(/^\/\/ v([2-9]|1[0-4]) → v([3-9]|1[0-5]):/.test(lines[i])&&/^const STORY_MIGRATIONS_V([3-9]|1[0-5]) =/.test(lines[i+1]||'')){i++;continue;}
  keep.push(lines[i]);
}
while(keep.length&&keep[keep.length-1]==='')keep.pop();
fs.writeFileSync(file,keep.join('\n')+'\n'+parts.V4+parts.V5+parts.V6+parts.V7+parts.V8+parts.V9+parts.V10+parts.V11+parts.V12+parts.V13+parts.V14+parts.V15+parts.V3);
