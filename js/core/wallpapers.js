'use strict';
const Wallpapers = (() => {
  const imported = () => !!G.s && G.flag('wallpapersImported');
  const all = () => DATA.wallpapers.filter(w => !w.imported || imported());
  const selected = () => all().find(w => w.id === G.settings.wallpaper) || DATA.wallpapers[0];
  const style = w => `background-image:${w.src ? `linear-gradient(#06101b25,#0c182b66),url(${w.src})` : w.background};background-position:${w.position || 'center'};background-size:${w.size || 'cover'}`;
  function select(id) {
    if (!all().some(w => w.id === id)) return false;
    G.settings.wallpaper = id; G.saveSettings(); BUS.emit('wallpaper'); return true;
  }
  function importBackup() {
    if (!G.s || !G.isUnlocked('nimbus:auth') || !G.isUnlocked('maja:base')) return false;
    G.s.flags.wallpapersImported = true;
    G.addEv('ev_wallpaper_backup'); G.unlock('ded:ded_wallpaper');
    G.save(true); BUS.emit('wallpaper'); return true;
  }
  function inspectOriginal() {
    if (!imported()) return false;
    G.addEv('ev_wallpaper_original'); G.save(true); return true;
  }
  // Tylko puste tło. Przewijanie, drugi palec, powrót do systemu i kliknięcie ikony anulują gest.
  function bind(el, open) {
    let timer, start, held = false;
    const interactive = 'button,a,input,textarea,[role="button"],.banner,.lk-u';
    const clear = () => { clearTimeout(timer); timer = null; start = null; };
    el.addEventListener('pointerdown', e => {
      clear(); held = false;
      if (e.isPrimary === false || e.button !== 0 || e.target.closest(interactive)) return;
      start = { x: e.clientX, y: e.clientY, id: e.pointerId };
      timer = setTimeout(() => {
        timer = null; if (!start || !G.s || document.hidden) return;
        held = true; U.vibrate(18); open();
      }, 650);
    });
    el.addEventListener('pointermove', e => { if (start && (e.pointerId !== start.id || Math.hypot(e.clientX - start.x, e.clientY - start.y) > 10)) clear(); });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(type => el.addEventListener(type, clear));
    el.addEventListener('click', e => { if (held) { e.preventDefault(); e.stopImmediatePropagation(); held = false; } }, true);
    el.addEventListener('contextmenu', e => { if (!e.target.closest(interactive)) e.preventDefault(); });
    window.addEventListener('blur', clear);
    document.addEventListener('visibilitychange', clear);
    const off = BUS.on('app', clear);
    return () => { clear(); off(); window.removeEventListener('blur', clear); document.removeEventListener('visibilitychange', clear); };
  }
  return { all, selected, style, select, importBackup, inspectOriginal, bind, imported };
})();
