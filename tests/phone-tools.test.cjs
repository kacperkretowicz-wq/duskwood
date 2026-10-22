const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
function game(){
 const storage={};const ctx=vm.createContext({console,Date,setTimeout:()=>0,clearTimeout(){},window:{addEventListener(){}},document:{addEventListener(){}},localStorage:{getItem:k=>storage[k],setItem:(k,v)=>storage[k]=v,removeItem:k=>delete storage[k]}});
 for(const file of ['core/util','data/migrations','core/state','core/phone-tools'])vm.runInContext(fs.readFileSync(path.join(__dirname,'../js',file+'.js'),'utf8'),ctx);
 return vm.runInContext('({G,PhoneTools})',ctx);
}
test('personal reactions, pins and saved quotes survive reload without changing story/evidence',()=>{
 const {G,PhoneTools:P}=game();G.newGame();G.unlock('chat:kuba');G.s.pc=83;G.s.pending={chat:'kuba',type:'show'};
 const m=G.post('kuba',{from:'kuba',text:'gdzie moja ładowarka 💀'});
 assert.ok(P.react('kuba',m.id,'💀'));assert.equal(P.react('kuba',m.id,'nope'),false);
 P.toggleSaved('kuba',m.id);P.togglePin('kuba');G.save(true);G.load();
 assert.equal(P.reaction('kuba',m.id),'💀');assert.equal(P.saved().length,1);assert.ok(P.pinned('kuba'));
 assert.equal(G.s.pc,83);assert.equal(G.s.pending.type,'show');assert.equal(Object.keys(G.s.ev).length,0);
 assert.equal(G.chat('kuba').msgs.length,1);assert.equal(G.chat('kuba').msgs[0].text,'gdzie moja ładowarka 💀');
 P.react('kuba',m.id,'💀');assert.equal(P.reaction('kuba',m.id),'');P.toggleSaved('kuba',m.id);assert.equal(P.saved().length,0);
 G.newGame();assert.equal(P.saved().length,0);assert.equal(P.pinned('kuba'),false);
});
test('hidden messages and invented ids cannot be bookmarked or reacted to',()=>{
 const {G,PhoneTools:P}=game();G.newGame();const m=G.post('gajda',{from:'gajda',text:'secret'});
 assert.equal(P.toggleSaved('gajda',m.id),false);assert.equal(P.react('gajda',m.id,'👍'),false);assert.equal(P.togglePin('gajda'),false);
 G.unlock('chat:gajda');assert.equal(P.toggleSaved('gajda','invented'),false);
 const sys=G.post('gajda',{from:'sys',text:'system'});assert.equal(P.react('gajda',sys.id,'👍'),false);
});
