const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
function load(win,nav){const ctx=vm.createContext({console,window:win,navigator:nav,document:{addEventListener(){}},G:{settings:{vibrate:true}}});
 vm.runInContext(fs.readFileSync(path.join(__dirname,'../js/core/util.js'),'utf8')+';this.U=U;',ctx);return ctx;}
test('vibration patterns map to sensible haptic calls',()=>{
 const {U}=load({},{});
 assert.deepEqual({...U.hapticPlan(20)},{kind:'impact',style:'LIGHT'});
 assert.deepEqual({...U.hapticPlan(40)},{kind:'impact',style:'MEDIUM'});
 assert.deepEqual({...U.hapticPlan([30,30,50])},{kind:'notify',type:'SUCCESS'});
 assert.deepEqual({...U.hapticPlan([20,40,20,40,60])},{kind:'notify',type:'WARNING'});
 assert.deepEqual({...U.hapticPlan([400,200,400])},{kind:'vibrate',duration:800});
 assert.equal(U.hapticPlan(0),null);
});
test('native Haptics plugin is preferred, web falls back to navigator.vibrate, setting off silences both',()=>{
 const calls=[],H={impact:o=>calls.push(['impact',o.style]),notification:o=>calls.push(['notify',o.type]),vibrate:o=>calls.push(['vibrate',o.duration])};
 const nav={vibrate:p=>calls.push(['web',p])};
 const nat=load({Capacitor:{isNativePlatform:()=>true,Plugins:{Haptics:H}}},nav);
 nat.U.vibrate(40);nat.U.vibrate(200);assert.deepEqual(calls,[['impact','MEDIUM'],['vibrate',200]]);
 calls.length=0;const web=load({},nav);web.U.vibrate([30,70,30]);assert.deepEqual(calls,[['web',[30,70,30]]]);
 calls.length=0;nat.G.settings.vibrate=false;web.G.settings.vibrate=false;nat.U.vibrate(40);web.U.vibrate(40);assert.equal(calls.length,0);
});
