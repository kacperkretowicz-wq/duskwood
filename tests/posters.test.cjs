// Każdy klip ma plakat z pierwszej klatki: ten sam kadr (proporcje i rozmiar) co wideo, żeby nie było skoku przy starcie.
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const dir=path.join(__dirname,'..','assets','video');
const jpgSize=b=>{let i=2;while(i<b.length){const m=b[i+1],l=b.readUInt16BE(i+2);if(m>=0xc0&&m<=0xcf&&m!==0xc4&&m!==0xc8&&m!==0xcc)return [b.readUInt16BE(i+7),b.readUInt16BE(i+5)];i+=2+l;}};
const mp4Size=b=>{let best=null;for(let i=b.indexOf('tkhd');i>=0;i=b.indexOf('tkhd',i+4)){const v=b[i+4],o=i+4+(v===1?88:76);const w=b.readUInt32BE(o)>>>16,h=b.readUInt32BE(o+4)>>>16;if(w&&h)best=[w,h];}return best;};
for(const f of fs.readdirSync(dir).filter(f=>f.endsWith('.mp4'))){
 test('plakat '+f,()=>{const p=path.join(dir,f.replace(/\.mp4$/,'.jpg'));assert.ok(fs.existsSync(p),'brak plakatu');
  const [vw,vh]=mp4Size(fs.readFileSync(path.join(dir,f))),[pw,ph]=jpgSize(fs.readFileSync(p));
  assert.ok(Math.abs(vw/vh-pw/ph)<0.02,`proporcje ${vw}x${vh} vs ${pw}x${ph}`);
  assert.ok(fs.statSync(p).size<60000,'plakat za ciężki');});
}
