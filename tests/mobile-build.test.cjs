const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
test('shipped Capacitor runtime detects native iOS before the game bridge starts',()=>{
 const vm=require('node:vm'),ctx=vm.createContext({console});
 vm.runInContext('this.window=this;this.webkit={messageHandlers:{bridge:{postMessage(){}}}}',ctx);
 vm.runInContext(read('js/vendor/capacitor-runtime.js'),ctx);
 assert.equal(ctx.Capacitor.isNativePlatform(),true);assert.equal(ctx.Capacitor.getPlatform(),'ios');
 assert.equal(typeof ctx.Capacitor.registerPlugin,'function');
 const html=read('index.html');assert.ok(html.indexOf('js/vendor/capacitor-runtime.js')<html.indexOf('js/core/native.js'));
});
test('mobile payload includes every local script/style and no remote fonts or dev files',()=>{
 execFileSync(process.execPath,[path.join(root,'scripts/build.cjs')]);
 const html=read('dist/index.html');
 assert.equal(/fonts\.googleapis|https:\/\//.test(html),false);
 for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)){
  assert.ok(fs.existsSync(path.join(root,'dist',match[1])),match[1]);
  assert.deepEqual(fs.readFileSync(path.join(root,match[1])),fs.readFileSync(path.join(root,'dist',match[1])));
 }
 for(const forbidden of ['.git','node_modules','tests','docs','package-lock.json'])assert.equal(fs.existsSync(path.join(root,'dist',forbidden)),false);
});
test('native projects agree on identity, use local game files, and restrict phone orientation',()=>{
 const config=JSON.parse(read('capacitor.config.json'));
 assert.equal(config.webDir,'dist');assert.equal(config.server.url,undefined);
 assert.ok(read('android/app/build.gradle').includes('applicationId "'+config.appId+'"'));
 assert.ok(read('ios/App/App.xcodeproj/project.pbxproj').includes('PRODUCT_BUNDLE_IDENTIFIER = '+config.appId));
 assert.ok(read('android/app/src/main/AndroidManifest.xml').includes('android:screenOrientation="portrait"'));
 assert.match(read('ios/App/App/Info.plist'),/UISupportedInterfaceOrientations<\/key>\s*<array>\s*<string>UIInterfaceOrientationPortrait<\/string>\s*<\/array>/);
 assert.equal(config.ios.contentInset,'never');
});
