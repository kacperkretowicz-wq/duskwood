const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
function adapter(permission='granted'){
 const calls=[],listeners={};let granted=permission;
 const plugin={
  async addListener(k,f){listeners[k]=f;return {remove(){}};},
  async cancel(p){calls.push(['cancel',p]);},async checkPermissions(){calls.push(['check']);return {display:granted};},
  async requestPermissions(){calls.push(['request']);return {display:granted};},
  async schedule(p){calls.push(['schedule',p]);return {notifications:[]};},async createChannel(p){calls.push(['channel',p]);}
 };
 const G={s:{chapter:'prolog',pc:0},save(){},pauseClock(){},resumeClock(){}};
 const ctx=vm.createContext({console,Date,Promise,G,document:{hidden:false,querySelector:()=>null},
  window:{Capacitor:{isNativePlatform:()=>true,getPlatform:()=> 'android',registerPlugin:()=>plugin}},
  BUS:{on(){},emit(){}},UI:{openApp(){}},Engine:{run(){}},Seasons:{current:()=>({chapters:['prolog','ch1','ch2','ch3','ch4','ch5','epilog']})}});
 vm.runInContext(fs.readFileSync(path.join(__dirname,'../js/core/pacing.js'),'utf8'),ctx);
 return {...vm.runInContext('({P:SeasonPacing,N:NativeNotifications})',ctx),G,calls,deny:()=>granted='denied'};
}
test('native queue schedules only after consent and a reached boundary; alarms are inexact',async()=>{
 const {P,N,G,calls}=adapter();P.configure('daily','18:00');await N.sync();assert.equal(calls.some(c=>c[0]==='schedule'),false);
 G.s.chapter='ch2';P.hold('ch2');await N.sync();assert.equal(calls.some(c=>c[0]==='request'),false);assert.equal(calls.some(c=>c[0]==='schedule'),false);
 assert.equal(await N.enable(),true);const n=calls.filter(c=>c[0]==='schedule').at(-1)[1].notifications[0];
 assert.equal(n.id,7001);assert.equal(n.isExactNotification,false);assert.ok(n.schedule.at.getTime()>Date.now());assert.equal(n.extra.chapter,'ch2');
 assert.equal(calls.filter(c=>c[0]==='request').length,1);
 await N.disable();assert.equal(calls.at(-1)[0],'cancel');assert.equal(G.s.pacing.notify,false);
});
test('denial never schedules and changing to free mode cancels an already scheduled reminder',async()=>{
 const denied=adapter('denied');denied.P.configure('daily');denied.G.s.chapter='ch2';denied.P.hold('ch2');
 assert.equal(await denied.N.enable(),false);await denied.N.sync();assert.equal(denied.calls.some(c=>c[0]==='schedule'),false);
 const {P,N,G,calls}=adapter();P.configure('daily');G.s.chapter='ch2';P.hold('ch2');await N.enable();
 assert.ok(calls.some(c=>c[0]==='schedule'));P.configure('free');await N.sync();assert.equal(calls.at(-1)[0],'cancel');assert.equal(G.s.pacing.waiting,undefined);
 G.s=null;await N.sync();assert.equal(calls.at(-1)[0],'cancel','new game / wipe clears pending OS notification');
});
