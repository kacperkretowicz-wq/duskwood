'use strict';
// Optional native bridge. The standalone browser game needs no native runtime.
(() => {
  const cap = window.Capacitor;
  if (!cap?.isNativePlatform()) return;
  document.body.classList.add('native-app');
  const App = cap.registerPlugin('App');
  const StatusBar = cap.registerPlugin('StatusBar');
  StatusBar.hide().catch(e => console.warn('Native status bar:', e.message));
  App.addListener('appStateChange', ({ isActive }) => { if (!isActive) G.save(true); });
  App.addListener('backButton', () => { if (G.s) UI.back(); });
})();
