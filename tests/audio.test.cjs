const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
test('backgrounding suspends audio and incoming sounds cannot reopen it',async()=>{
 const handlers={},calls={resume:0,suspend:0,osc:0};
 const param=()=>({value:0,setValueAtTime(){},linearRampToValueAtTime(){},exponentialRampToValueAtTime(){}});
 class AudioContext{
  constructor(){this.state='running';this.destination={};this.currentTime=0;}
  createGain(){return {gain:param(),connect(){}};}
  createOscillator(){calls.osc++;return {frequency:param(),connect(){},start(){},stop(){}};}
  resume(){calls.resume++;return Promise.resolve();}suspend(){calls.suspend++;return Promise.resolve();}
 }
 const ctx=vm.createContext({window:{AudioContext},document:{hidden:false,addEventListener:(n,fn)=>handlers[n]=fn},G:{settings:{sfx:true,volume:.5}},U:{vibrate(){}},setTimeout,clearTimeout,setInterval,clearInterval});
 vm.runInContext(fs.readFileSync(path.join(__dirname,'../js/core/audio.js'),'utf8'),ctx);
 const SFX=vm.runInContext('SFX',ctx);SFX.play.msg();assert.ok(calls.osc>0);
 ctx.document.hidden=true;handlers.visibilitychange();assert.equal(calls.suspend,1);
 const before=calls.osc;SFX.play.msg();SFX.unlockAudio();assert.equal(calls.osc,before);assert.equal(calls.resume,0);
 ctx.document.hidden=false;handlers.visibilitychange();assert.equal(calls.resume,1);SFX.play.msg();assert.ok(calls.osc>before);
 SFX.setActive(false);assert.equal(calls.suspend,2);
});
