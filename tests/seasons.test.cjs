const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.join(__dirname,'..');
function game(){
 let time=Date.now();const storage={},events={};
 class Clock extends Date {static now(){return time;}}
 const document={hidden:false,addEventListener(k,f){events[k]=f;}};
 const ctx=vm.createContext({console,Date:Clock,setTimeout:()=>0,clearTimeout(){},document,
  window:{addEventListener(){}},Art:{def(){}},localStorage:{getItem:k=>storage[k],setItem:(k,v)=>storage[k]=v,removeItem:k=>delete storage[k]}});
 for(const p of ['core/util','data/migrations','core/state','data/characters','data/evidence','data/world','data/conversations','data/season-conversations','data/wallpapers','data/seasons','core/conversations','core/wallpapers','core/seasons','core/pacing'])vm.runInContext(fs.readFileSync(path.join(root,'js',p+'.js'),'utf8'),ctx);
 const api=vm.runInContext('({G,DATA,Wallpapers,Seasons,Conversations,SeasonPacing})',ctx);
 api.G.newGame();return {...api,storage,document,events,advance:n=>time+=n};
}
test('wallpaper import requires authorized backup; new saves never inherit another owner’s clues',()=>{
 const {G,Wallpapers:W}=game();assert.equal(W.importBackup(),false);assert.equal(W.inspectOriginal(),false);
 assert.equal(W.select('maja_river'),false);G.unlock('nimbus:auth');assert.equal(W.importBackup(),false);
 G.unlock('maja:base');assert.equal(W.importBackup(),true);assert.equal(G.has('ev_wallpaper_original'),false);
 assert.equal(W.all().length,4);assert.ok(G.isUnlocked('ded:ded_wallpaper'));
 W.inspectOriginal();assert.ok(G.has('ev_wallpaper_original'));assert.equal(G.has('ev_wallpaper_checked'),false);
 W.select('maja_river_crop');G.save(true);G.load();assert.equal(W.selected().id,'maja_river_crop');
 G.newGame();assert.equal(W.selected().id,'forest');assert.equal(W.all().length,2);assert.equal(G.has('ev_wallpaper_original'),false);
});
test('a month of real absence freezes fiction; resuming does not charge time to the investigation',()=>{
 const {G,advance,document,events}=game();const start=G.now();advance(2000);assert.equal(G.now(),start+2000);
 document.hidden=true;events.visibilitychange();advance(31*86400000);G.save(true);assert.equal(G.now(),start+2000);
 document.hidden=false;events.visibilitychange();advance(3000);assert.equal(G.now(),start+5000);
 G.pauseClock();G.setClock('2026-10-24T22:40');document.hidden=true;events.visibilitychange();
 G.save(true);advance(86400000);document.hidden=false;G.load();const restored=G.now();advance(1000);assert.equal(G.now(),restored+1000);
});
test('stable season stages validate sources; future titles and endings stay concealed',()=>{
 const {G,DATA,Seasons:S}=game(),eps=S.current().episodes;
 assert.equal(eps.length,30);assert.equal(new Set(eps.map(e=>e.id)).size,30);
 for(const ep of eps)for(const cond of Array.isArray(ep.done)?ep.done:[ep.done])if(typeof cond==='string'&&cond.startsWith('ev:'))assert.ok(DATA.evidence[cond.slice(3)],cond);
 assert.equal(S.progress()[0].available,true);assert.equal(S.progress()[29].available,false);
 G.s.chapter='ch3';const p=S.progress();assert.ok(p.filter(e=>e.chapter==='prolog'||e.chapter==='ch1'||e.chapter==='ch2').every(e=>e.done));
 assert.equal(p.find(e=>e.id==='s1.23').available,false);
 const legacy=JSON.parse(JSON.stringify(G.s));delete legacy.seasonId;delete legacy.seasons;delete legacy.seasonArchive;
 G.s=legacy;assert.equal(S.current().id,'s1');assert.ok(S.saveSession());assert.ok(G.s.seasons.s1);
});
test('session recaps persist without changing pending choices, outcomes survive checkpoint replay',()=>{
 const {G,Seasons:S}=game();G.s.pc=91;G.s.pending={type:'choose',chat:'group',label:'c20'};
 G.s.objective={text:'Sprawdź lokalizację.',hints:[]};G.addEv('ev_sms_maja',true);
 S.saveSession();S.saveSession();assert.equal(G.s.seasons.s1.sessions.length,1);
 assert.equal(G.s.pc,91);assert.equal(G.s.pending.label,'c20');G.save(true);G.load();assert.equal(S.recap().goal,'Sprawdź lokalizację.');
 assert.deepEqual(Array.from(S.recap().found,e=>e.id),['ev_sms_maja']);
 G.checkpoint('ch1');G.s.finished=true;G.s.vars.endingId='odlamki';G.setFlag('majaFound');G.setFlag('gajdaCaught');S.archive();
 G.loadCheckpoint('ch1');assert.equal(G.s.seasonArchive.s1.outcome.gajdaCaught,true);assert.equal(G.s.finished,undefined);
 G.s.finished=true;G.s.vars.endingId='cisza';G.s.flags.majaFound=false;G.s.flags.gajdaCaught=false;S.archive();
 assert.deepEqual(Array.from(G.s.seasonArchive.s1.endings),['odlamki','cisza']);assert.equal(G.s.seasonArchive.s1.outcome.majaFound,false);
});
test('post-season cast respects rescue and missing branches',()=>{
 const {G,Conversations:C}=game();G.s.finished=true;G.s.vars.endingId='cisza';
 assert.equal(C.open('maja_aftercare'),null);assert.equal(C.open('kuba_november'),null);assert.ok(C.open('kuba_missing'));
 G.newGame();G.s.finished=true;G.s.vars.endingId='swit';G.setFlag('majaFound');
 assert.equal(C.open('kuba_missing'),null);assert.ok(C.open('maja_aftercare'));assert.ok(C.open('kuba_november'));
});
test('captured Gajda stays captured in the partial ending and is never declared dead from an abandoned car',()=>{
 const {G,DATA}=game();G.setFlag('gajdaCaught');G.setFlag('reportBoth');
 assert.match(DATA.endings.odlamki.text[1](),/zatrzymany/);assert.doesNotMatch(DATA.endings.odlamki.text[1](),/wychodzi na wolność/);
 G.s.flags.gajdaCaught=false;assert.match(DATA.endings.odlamki.text[2](),/nie jest dowodem jego śmierci/);
});
test('daily pilot opens tutorial immediately, catches up after absence, and never splits the rescue',()=>{
 const {G,SeasonPacing:P,advance}=game();assert.equal(P.configure('daily','99:99'),false);
 assert.equal(P.configure('daily','18:15'),true);assert.equal(P.release('prolog'),0);assert.equal(P.release('ch1'),0);
 assert.ok(P.release('ch2')>Date.now());G.s.chapter='ch2';G.s.pc=0;assert.equal(P.hold('ch2'),true);
 assert.equal(G.s.clock.paused,true);assert.equal(G.s.pacing.waiting.chapter,'ch2');
 G.save(true);G.load();assert.equal(P.hold('ch2'),true);assert.equal(G.s.clock.paused,true);
 advance(32*86400000);assert.equal(P.hold('ch2'),false);assert.equal(G.s.pacing.waiting,undefined);assert.equal(G.s.clock.paused,false);
 assert.equal(P.release('ch4'),P.release('ch5'));assert.equal(P.hold('ch5'),false);
 const pending={chat:'group',type:'choose'};G.s.pending=pending;P.configure('free','18:15');assert.equal(P.release('epilog'),0);assert.equal(G.s.pending,pending);
 G.newGame();P.configure('daily');P.configure('free');G.s.chapter='ch4';G.s.pc=50;P.configure('daily');
 assert.equal(P.release('ch4'),0);assert.equal(P.release('ch5'),0,'re-enabling daily during the rescue preparation cannot lock its second half');
});
