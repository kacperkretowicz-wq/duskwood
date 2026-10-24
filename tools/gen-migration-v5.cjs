// Generuje STORY_MIGRATIONS_V5: zapisy v4 (zrzut tests/fixtures/story-v4-steps.json) → bieżące kroki.
// Dopasowanie LCS po sygnaturach; krok usunięty lub zmieniony przechodzi do pierwszego nowego kroku po poprzednim zachowanym (czyli do zastępującego go wyboru).
// Użycie: node tools/gen-migration-v5.cjs tests/fixtures/story-v4-steps.json
const fs=require('fs');
const {chapters,sig}=require('./dump-steps.cjs');
const old=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const out={};
for(const [ch,c] of Object.entries(chapters)){
  const o=old[ch];if(!o)continue;
  const n=c.steps.map(sig);
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
process.stdout.write('// v4 → v5: sceny S1 z planu wdrożenia (P1–P5). exact = ten sam krok, resume = początek nowej sceny tuż przed nim.\nconst STORY_MIGRATIONS_V5 = '+JSON.stringify(out)+';\n');
