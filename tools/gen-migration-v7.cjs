// Generuje STORY_MIGRATIONS_V7: zapisy v6 (zrzut tests/fixtures/story-v6-steps.json) → bieżące kroki.
// Dopasowanie LCS po sygnaturach; krok usunięty lub zmieniony przechodzi do pierwszego nowego kroku po poprzednim zachowanym (czyli do zastępującego go wyboru).
// Użycie: node tools/gen-migration-v7.cjs tests/fixtures/story-v6-steps.json
const fs=require('fs');
const {chapters,sig}=require('./dump-steps.cjs');
const old=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const out={};
for(const [ch,c] of Object.entries(chapters)){
  const nl=x=>x.replace(/"([a-z]{1,2})\d+"/g,'"$1#"'); // numery etykiet przesuwają się po dopisaniu iff
  const o=old[ch]&&old[ch].map(nl);if(!o)continue;
  const n=c.steps.map(s=>nl(sig(s)));
  if(o.length===n.length&&o.every((x,i)=>x===n[i]))continue;
  const A=o.length,B=n.length,L=Array.from({length:A+1},()=>new Int32Array(B+1));
  for(let i=A-1;i>=0;i--)for(let j=B-1;j>=0;j--)L[i][j]=o[i]===n[j]?L[i+1][j+1]+1:Math.max(L[i+1][j],L[i][j+1]);
  const match=new Array(A).fill(-1);
  for(let i=0,j=0;i<A&&j<B;){if(o[i]===n[j]){match[i]=j;i++;j++;}else if(L[i+1][j]>=L[i][j+1])i++;else j++;}
  const exact=new Array(A+1);exact[A]=B;
  for(let i=0,last=-1;i<A;i++){if(match[i]>=0)last=match[i];exact[i]=match[i]>=0?match[i]:Math.min(last+1,B);}
  for(let i=1;i<=A;i++)if(exact[i]<exact[i-1])exact[i]=exact[i-1];
  const kept=new Set(match.filter(x=>x>=0));
  const resume=exact.map((ni,i)=>{let j=ni;while(j>0&&c.steps[j-1].scene&&!kept.has(j-1))j--;return j;});
  out[ch]={exact,resume};
}
process.stdout.write('// v6 → v7: scena xAnonim (anonimowy materiał CAM-01) w rozdziale 3. exact = ten sam krok, resume = początek nowej sceny tuż przed nim.\nconst STORY_MIGRATIONS_V7 = '+JSON.stringify(out)+';\n');
