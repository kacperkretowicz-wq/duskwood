'use strict';
/* Zdjęcia: huta, fotopułapki, galeria Mai, zdjęcia przysyłane w rozmowach. */

(() => {
  const D = Art.def;
  const phone = (date, time, extra = {}) => Object.assign({ date, time, device: 'Galaxy A54 · aparat główny', file: `IMG_${date.split('.').reverse().join('')}_${time.replace(':', '')}${String(Math.floor(Math.random() * 90 + 10))}.jpg` }, extra);
  const trap = (cam, n, date, time, extra = {}) => Object.assign({ date, time, device: `BushView Trail 4G · ${cam}`, place: cam === 'CAM-01' ? 'Huta „Jutrzenka” — brama i dziedziniec' : 'Huta „Jutrzenka” — hala A, przy odprężarce', file: `${cam.replace('-', '')}_IMG_${String(n).padStart(4, '0')}.JPG` }, extra);
  const tstamp = (cam, n, date, time, temp, moon) => ({ kind: 'trap', cam, date: date.replace(/\./g, '/'), time, temp, moon, id: `IMG_${String(n).padStart(4, '0')}` });

  /* ================= HUTA Z ZEWNĄTRZ ================= */
  function hutaExt(k, o = {}) {
    const { W, H } = k;
    const t = o.time || 'fog';
    const skies = {
      fog: [[0, '#5c6770'], [0.55, '#8b949a'], [1, '#a7adb0']],
      dusk: [[0, '#151b25'], [0.5, '#3f4552'], [0.78, '#806656'], [1, '#b08466']],
      night: [[0, '#04070a'], [0.7, '#0f1720'], [1, '#18232d']]
    };
    let s = k.sky(skies[t]);
    if (t === 'night') s += k.stars(70, H * 0.45, 0.55) + k.moon(W * 0.8, H * 0.15, 16);
    if (t === 'dusk') s += k.glow(W * 0.15, H * 0.62, 380, '#e89a5a', 0.35);
    s += k.ridge(H * 0.55, 140, t === 'night' ? '#0b1218' : t === 'dusk' ? '#2c2f38' : '#5e6870', { amps: [1, 0.5, 0.2] });
    s += k.fog(H * 0.3, H * 0.4, { op: t === 'night' ? 0.25 : 0.6, color: t === 'night' ? [0.35, 0.42, 0.5] : [0.78, 0.81, 0.83] });
    s += k.forest(H * 0.68, 90, 190, t === 'night' ? '#060a0d' : t === 'dusk' ? '#151619' : '#2e373c', { count: 46, ground: false });
    const wall = t === 'night' ? '#140d0b' : t === 'dusk' ? '#2a1813' : '#4a3029';
    s += k.huta(W * 0.4, H * 0.87, o.scale || 1.35, { wall, dark: t === 'night' ? '#080605' : '#1a100d', win: t === 'night' ? '#1a2530' : t === 'dusk' ? '#6f6a6a' : '#9aa5ad', chimney: wall, annex: t === 'night' ? '#110b08' : '#3a251c', sign: o.sign, lit: o.lit || null });
    s += k.rect(-10, H * 0.86, W + 20, H * 0.2, k.lin([[0, t === 'night' ? '#0d0e0d' : '#3d3b33'], [1, t === 'night' ? '#050505' : '#1d1c18']]));
    for (let i = 0; i < 90; i++) { const x = k.r() * W, y = H * 0.87 + k.r() * H * 0.13; s += k.line(x, y, x + (k.r() - 0.5) * 8, y - 8 - k.r() * 18, t === 'night' ? '#121410' : '#4e5440', 2); }
    s += k.fog(H * 0.74, H * 0.3, { op: t === 'night' ? 0.2 : 0.5, fx: 0.004, fy: 0.02 });
    return s;
  }
  D('m_huta_ext', { title: 'Huta „Jutrzenka”', exif: phone('03.10.2026', '15:20', { place: 'Mglisko, ul. Szklarska' }), draw: k => hutaExt(k, { time: 'fog', sign: true }) });
  D('title_bg', { w: 900, h: 1600, style: 'night', draw: k => hutaExt(k, { time: 'night', scale: 1.3, lit: '#d89a4a' }) + k.glow(608 + 0.47 * 0, 1220, 40, '#ffb35a', 0.0) });
  D('wallpaper', {
    w: 900, h: 1950, style: 'night', draw: k => {
      const { W, H } = k;
      let s = k.sky([[0, '#05080c'], [0.45, '#0e1822'], [0.75, '#22313b'], [1, '#2f3d45']]);
      s += k.stars(120, H * 0.4, 0.5) + k.moon(W * 0.74, H * 0.36, 20);
      s += k.ridge(H * 0.55, 200, '#101a22', { amps: [1, 0.4, 0.2] });
      s += k.fog(H * 0.42, H * 0.3, { op: 0.45, color: [0.5, 0.58, 0.64] });
      s += k.forest(H * 0.68, 220, 420, '#0a1117', { count: 22 });
      s += k.fog(H * 0.62, H * 0.25, { op: 0.4, color: [0.55, 0.62, 0.68] });
      s += k.forest(H * 0.82, 380, 700, '#040709', { count: 9 });
      s += k.glow(W * 0.36, H * 0.6, 12, '#ffb35a', 0.9);
      return s;
    }
  });

  /* ================= OGRODZENIE I TRAFOSTACJA ================= */
  D('m_fence', {
    title: 'Ogrodzenie przy trafostacji', exif: phone('03.10.2026', '15:12', { place: 'Mglisko, teren huty od wschodu' }),
    hotspots: [{ x: 880, y: 640, r: 120, ev: 'ev_fence_gap' }],
    draw: k => {
      const { W, H } = k;
      let s = k.sky([[0, '#66717a'], [1, '#a2a8ab']]);
      s += k.fog(H * 0.2, H * 0.4, { op: 0.5 });
      s += k.forest(H * 0.5, 120, 220, '#39434a', { count: 30, ground: false });
      s += k.rect(-10, H * 0.62, W + 20, H, k.lin([[0, '#4b4a3e'], [1, '#26261f']]));
      // trafostacja
      s += k.rect(560, 250, 260, 400, '#5a3a2e') + k.path('M545,250 L835,250 L800,205 L580,205 Z', '#2a1c16') + k.rect(620, 420, 90, 230, '#2b2f30');
      s += k.bricks(560, 250, 260, 400, { bw: 30, bh: 12, gap: 2, mortar: '#4a3026' }).replace(/hsl\((\d+\.?\d*),(\d+\.?\d*)%,(\d+\.?\d*)%\)/g, (m, a, b, c) => `hsl(${a},${b}%,${(+c + 14).toFixed(1)}%)`);
      s += k.rect(620, 420, 90, 230, '#2b2f30') + k.rect(636, 300, 60, 52, '#e8c21c') + k.path('M666,308 L652,340 L664,336 L658,350 L680,320 L668,324 Z', '#111') + k.text(666, 372, 'WYSOKIE NAPIĘCIE', 9, '#111', 'text-anchor="middle" font-weight="700"');
      s += k.grime(560, 250, 260, 400, { op: 0.7 });
      // siatka z dziurą
      s += k.fence(H * 0.78, -20, 560, { h: 260, step: 110, color: '#1b1d1e' });
      s += k.fence(H * 0.75, 820, W + 40, { h: 250, step: 110, color: '#1b1d1e' });
      s += k.path('M840,430 L960,445 L990,700 L900,690 Q860,600 880,520 Z', '#3f3e35', 'opacity=".55"');
      s += k.path('M860,430 Q900,520 880,690 M960,445 Q930,560 990,700', 'none', 'stroke="#1b1d1e" stroke-width="3"');
      s += k.pl([[860, 430], [820, 460], [800, 520]], '#1b1d1e', 3) + k.pl([[880, 690], [830, 650], [812, 600]], '#1b1d1e', 3);
      for (let i = 0; i < 140; i++) { const x = k.r() * W, y = H * 0.66 + k.r() * H * 0.34; s += k.line(x, y, x + (k.r() - 0.5) * 10, y - 10 - k.r() * 26, '#59603f', 2); }
      s += k.fog(H * 0.55, H * 0.4, { op: 0.35 });
      return s;
    }
  });

  /* ================= PLAN EWAKUACJI ================= */
  D('m_plan', {
    title: 'Plan ewakuacji — hala A', exif: phone('03.10.2026', '15:31', { place: 'Huta „Jutrzenka”, hala A', note: 'Tablica przy wejściu do hali A' }),
    onView: 'ev_plan',
    draw: k => {
      const { W, H } = k;
      let s = k.full('#3b2a22') + k.bricks(0, 0, W, H, { bw: 70, bh: 26, mortar: '#2a1e18' }) + k.grime(0, 0, W, H, { op: 0.8 });
      s += k.rect(150, 90, 900, 700, '#000', 'opacity=".4" ' + k.blur(8));
      s += k.rect(140, 80, 900, 700, '#cdd8c7') + k.rect(140, 80, 900, 70, '#2f7a3a');
      s += k.text(590, 128, 'PLAN EWAKUACJI · HUTA SZKŁA „JUTRZENKA” · HALA A / B', 22, '#fff', 'text-anchor="middle" font-weight="700" letter-spacing="1"');
      const ln = 'stroke="#1a2a1e" stroke-width="5" fill="none"';
      s += `<rect x="190" y="200" width="460" height="460" ${ln}/><rect x="650" y="200" width="340" height="460" ${ln}/>`;
      s += k.text(420, 236, 'HALA A', 24, '#1a2a1e', 'text-anchor="middle" font-weight="800"') + k.text(820, 236, 'HALA B', 24, '#1a2a1e', 'text-anchor="middle" font-weight="800"');
      s += k.rect(260, 290, 150, 110, '#e8b25a', 'opacity=".7"') + k.text(335, 345, 'PIEC', 18, '#1a2a1e', 'text-anchor="middle" font-weight="700"') + k.text(335, 368, 'WANNOWY', 18, '#1a2a1e', 'text-anchor="middle" font-weight="700"');
      s += k.rect(420, 300, 210, 70, '#9a9a9a', 'opacity=".6"') + k.text(525, 330, 'ODPRĘŻARKA', 17, '#1a2a1e', 'text-anchor="middle" font-weight="700"') + k.text(525, 354, 'poziom −1 (za piecem)', 14, '#1a2a1e', 'text-anchor="middle"');
      s += k.rect(700, 290, 240, 130, '#7ab0d0', 'opacity=".55"') + k.text(820, 340, 'SZATNIA', 20, '#1a2a1e', 'text-anchor="middle" font-weight="700"') + k.text(820, 366, 'piętro 1 · schody →', 15, '#1a2a1e', 'text-anchor="middle"');
      s += k.rect(700, 470, 240, 120, '#b8c4b0') + k.text(820, 535, 'MAGAZYN', 17, '#1a2a1e', 'text-anchor="middle" font-weight="700"');
      s += k.rect(230, 470, 380, 140, '#b8c4b0') + k.text(420, 548, 'FORMOWNIA', 17, '#1a2a1e', 'text-anchor="middle" font-weight="700"');
      s += k.path('M400,640 L400,720 L380,700 M400,720 L420,700', 'none', 'stroke="#2f7a3a" stroke-width="7"') + k.path('M960,640 L960,720 L940,700 M960,720 L980,700', 'none', 'stroke="#2f7a3a" stroke-width="7"');
      s += k.circle(300, 640, 16, '#d0262d') + k.text(326, 646, 'TU JESTEŚ', 16, '#d0262d', 'font-weight="800"');
      s += k.text(590, 760, 'W razie pożaru: nie używać wind · zbiórka: dziedziniec przy bramie', 15, '#1a2a1e', 'text-anchor="middle"');
      s += k.grime(140, 80, 900, 700, { color: [0.4, 0.35, 0.2], op: 0.55, freq: 0.01 });
      s += k.rect(140, 80, 900, 700, k.rad([[0, '#fff', 0.18], [1, '#fff', 0]], 0.35, 0.3, 0.6));
      return s;
    }
  });

  /* ================= HALA — WNĘTRZE ================= */
  function hall(k, o = {}) {
    const { W, H } = k;
    const L = o.light || 'day';
    const dark = L === 'day' ? '#1d1714' : '#080706';
    const winC = L === 'day' ? '#c9d2d6' : L === 'dusk' ? '#a08070' : '#2a3540';
    let s = k.full(dark);
    const bx0 = W * 0.22, bx1 = W * 0.78, by0 = H * 0.14, by1 = H * 0.6;
    s += k.poly([[0, 0], [W, 0], [bx1, by0], [bx0, by0]], L === 'day' ? '#141010' : '#050404');
    for (let i = 0; i < 6; i++) { const t = i / 6; s += k.line(W * t, 0, bx0 + (bx1 - bx0) * t, by0, '#000', 4, 'opacity=".6"'); }
    s += k.rect(bx0, by0, bx1 - bx0, by1 - by0, L === 'day' ? '#3a2620' : '#120c0a');
    for (let i = 0; i < 3; i++) s += k.archWindow(bx0 + 30 + i * ((bx1 - bx0 - 60) / 3) + 10, by0 + 30, (bx1 - bx0 - 60) / 3 - 30, by1 - by0 - 70, { light: winC, broken: 0.5, cols: 3, rows: 4, frame: '#120c0a', pane: L === 'day' ? '#56606a' : '#0d1218' });
    s += k.poly([[0, 0], [bx0, by0], [bx0, by1], [0, H]], L === 'day' ? '#2c1d18' : '#0b0807');
    s += k.poly([[W, 0], [bx1, by0], [bx1, by1], [W, H]], L === 'day' ? '#26191500' : '#0b0807');
    s += k.poly([[W, 0], [bx1, by0], [bx1, by1], [W, H]], L === 'day' ? '#2a1b16' : '#0a0706');
    for (let i = 0; i < 3; i++) {
      const t0 = 0.15 + i * 0.28, t1 = t0 + 0.16;
      const p = (t, y) => [W * (1 - t) + bx1 * t - (W - bx1) * 0, 0];
      const x0 = W - (W - bx1) * t0, x1 = W - (W - bx1) * t1;
      s += k.poly([[x0, H * 0.18 + by0 * t0 * 0.2], [x1, by0 * 0.4 + t1 * 30], [x1, by1 - 40 * (1 - t1)], [x0, H * 0.72 - t0 * 120]], winC, `opacity="${L === 'day' ? 0.85 : 0.5}"`);
    }
    s += k.poly([[0, H], [W, H], [bx1, by1], [bx0, by1]], k.lin([[0, L === 'day' ? '#2b2621' : '#0c0b0a'], [1, L === 'day' ? '#4a423a' : '#161412']], 0, 0, 0, 1));
    s += k.grime(0, by1, W, H - by1, { op: 0.6, freq: 0.01 });
    if (L === 'day' || L === 'dusk') {
      for (let i = 0; i < 3; i++) {
        const x = bx0 + 60 + i * ((bx1 - bx0) / 3);
        s += k.poly([[x, by0 + 40], [x + 120, by0 + 40], [x + 360 - i * 200, H], [x - 100 - i * 160, H]], '#fff6e0', `opacity="${L === 'day' ? 0.13 : 0.08}" ${k.blur(14)} style="mix-blend-mode:screen"`);
      }
    }
    const cols = o.cols != null ? o.cols : 3;
    for (let i = 0; i < cols; i++) {
      const t = i / cols;
      const xl = U.lerp(W * 0.08, bx0 + 20, t), xr = U.lerp(W * 0.92, bx1 - 20, t);
      const ytop = U.lerp(0, by0, t), ybot = U.lerp(H * 0.98, by1, t), w = U.lerp(46, 12, t);
      s += k.rect(xl - w / 2, ytop, w, ybot - ytop, '#0a0807') + k.rect(xr - w / 2, ytop, w, ybot - ytop, '#0a0807');
    }
    for (let i = 0; i < 30; i++) { const x = k.r() * W, y = by1 + 30 + k.r() * (H - by1 - 30); s += k.poly([[x, y], [x + 10 + k.r() * 30, y - 4], [x + 18 + k.r() * 30, y + 6], [x + 4, y + 10]], '#0a0807', 'opacity=".8"'); }
    if (o.puddle) s += k.ell(W * 0.55, H * 0.82, 200, 26, winC, 'opacity=".25"');
    return s;
  }
  D('m_hall', { title: 'Hala A', exif: phone('03.10.2026', '15:40', { place: 'Huta „Jutrzenka”, hala A' }), draw: k => hall(k, { light: 'day', puddle: true }) });
  D('m_cam_install', { src: 'assets/maja/m_cam_install.jpg',
    title: 'Fotopułapka na filarze', exif: phone('09.10.2026', '17:30', { place: 'Huta „Jutrzenka”, hala A' }),
    draw: k => {
      let s = hall(k, { light: 'dusk', cols: 2 });
      s += k.rect(420, -10, 300, 920, '#141110') + k.rect(440, -10, 30, 920, '#1e1a18') + k.grime(420, 0, 300, 900, { op: 0.6 });
      s += k.rect(470, 380, 200, 270, '#3d4628', 'rx="22"') + k.grime(470, 380, 200, 270, { color: [0.1, 0.14, 0.05], op: 0.9, freq: 0.04 });
      s += k.circle(570, 470, 42, '#0e100a') + k.circle(570, 470, 28, '#1d2a30') + k.circle(560, 460, 8, '#fff', 'opacity=".25"');
      s += k.rect(520, 560, 100, 22, '#0e100a', 'rx="6"') + k.circle(530, 410, 6, '#c23', 'opacity=".9"');
      s += k.rect(410, 420, 320, 16, '#111') + k.rect(410, 600, 320, 16, '#111') + k.rect(722, 412, 12, 32, '#111') + k.rect(722, 592, 12, 32, '#111');
      return s;
    }
  });

  /* ================= SZATNIA ================= */
  function lockerRoom(k, o = {}) {
    const { W, H } = k;
    let s = k.full('#141414');
    s += k.rect(0, 0, W, H * 0.7, '#3d4446') + k.grime(0, 0, W, H * 0.7, { color: [0.2, 0.18, 0.12], op: 0.4, freq: 0.03 });
    for (let i = 0; i < 6; i++) s += k.path(`M${k.r() * W},0 q${(k.r() - 0.5) * 30},${120 + k.r() * 140} ${(k.r() - 0.5) * 20},${260 + k.r() * 200}`, 'none', 'stroke="#5d5040" stroke-width="3" opacity=".5"');
    s += k.rect(70, 60, 250, 230, '#cfd8dc', 'opacity=".85"') + k.line(195, 60, 195, 290, '#222', 6) + k.line(70, 175, 320, 175, '#222', 6) + k.poly([[200, 180], [320, 180], [320, 290], [260, 240]], '#1a1d1f');
    s += k.poly([[70, 290], [320, 290], [600, H], [-200, H]], '#fff8e8', `opacity=".1" ${k.blur(18)}`);
    s += k.rect(0, H * 0.7, W, H * 0.3, k.lin([[0, '#2a2826'], [1, '#121110']]));
    s += k.lockers(360, 200, 760, 470, 8, { start: 12, open: o.open || null, colors: ['#4e6870', '#5a7a7e', '#4a6066', '#56707a'], inside: o.inside });
    if (o.padlock !== false) s += k.path('M887,420 q0,-24 18,-24 q18,0 18,24', 'none', 'stroke="#8a8a80" stroke-width="5"') + k.rect(880, 416, 50, 40, '#9a8a50', 'rx="5" transform="rotate(24 905 436)"') + k.grime(870, 390, 70, 80, { op: 0.6 });
    for (let i = 0; i < 20; i++) { const x = 340 + k.r() * 780; s += k.rect(x, H * 0.72 + k.r() * 180, 20 + k.r() * 50, 6 + k.r() * 6, '#0d0c0b', `transform="rotate(${(k.r() - 0.5) * 50} ${x} ${H * 0.8})"`); }
    return s;
  }
  D('m_lockers', {
    title: 'Szatnia, hala B', exif: phone('03.10.2026', '16:02', { place: 'Huta „Jutrzenka”, hala B, piętro 1' }),
    hotspots: [{ x: 880, y: 300, r: 80, ev: 'ev_szafka17' }, { x: 905, y: 435, r: 50, ev: 'ev_szafka17' }],
    draw: k => lockerRoom(k, {})
  });
  D('m_kodak', {
    title: 'Co było w szafce 17', exif: phone('03.10.2026', '16:10', { place: 'Huta „Jutrzenka”, szatnia', note: 'Lampa błyskowa' }), style: 'flash',
    draw: k => {
      const { W, H } = k;
      let s = k.full('#2a3438') + k.rect(0, 0, W, H, k.lin([[0, '#46565c'], [1, '#2a3438']], 0, 0, 1, 0));
      s += k.rect(80, 0, 30, H, '#1d2528') + k.rect(1090, 0, 30, H, '#1d2528');
      s += k.rect(110, 380, 980, 26, '#5d6e74') + k.rect(110, 406, 980, 10, '#1d2528');
      s += k.grime(110, 0, 980, H, { op: 0.7, color: [0.25, 0.22, 0.15] });
      s += k.disposable(520, 300, 1.25, { rot: -8, dust: 0.28 });
      s += k.ell(520, 384, 160, 14, '#000', 'opacity=".4" ' + k.blur(6));
      s += k.rect(700, 330, 200, 50, '#cfc6b0', 'transform="rotate(4 800 355)"') + k.text(712, 362, 'D.K.', 26, '#5a2a1a', 'font-family="Segoe Print, cursive" transform="rotate(4 800 355)"');
      s += k.path('M140,520 L1060,520 L1060,880 L140,880 Z', '#1a2023') + k.text(600, 700, '17', 160, '#2b3337', 'text-anchor="middle" font-weight="800"');
      return s;
    }
  });

  /* ================= ODPRĘŻARKA — MUR ================= */
  function lehrWall(k, o = {}) {
    const { W, H } = k;
    const cx = W * 0.5, archW = 520, archTop = H * 0.16, archBot = H * 0.8;
    let s = k.full('#0b0807');
    s += k.bricks(0, 0, W, H * 0.86, { bw: 64, bh: 24, gap: 3, mortar: '#1e1714' });
    const archPath = `M${cx - archW / 2},${archBot} L${cx - archW / 2},${archTop + archW / 2} A${archW / 2},${archW / 2} 0 0 1 ${cx + archW / 2},${archTop + archW / 2} L${cx + archW / 2},${archBot} Z`;
    const cid = k.id('clip');
    k.def(`<clipPath id="${cid}"><path d="${archPath}"/></clipPath>`);
    s += `<g clip-path="url(#${cid})">${k.bricks(cx - archW / 2, archTop, archW, archBot - archTop, { style: 'new', bw: 50, bh: 20, gap: 4, mortar: o.mortar || '#8a8478', holes: true })}`;
    if (o.patch) s += k.rect(cx - 110, archBot - 210, 230, 150, '#b9b4aa') + k.bricks(cx - 100, archBot - 200, 210, 130, { style: 'new', bw: 50, bh: 20, gap: 5, mortar: '#d0ccc2' });
    if (o.hole) {
      const hx = cx - 20, hy = archBot - 170;
      s += k.path(`M${hx - 120},${hy + 40} L${hx - 90},${hy - 50} L${hx - 10},${hy - 80} L${hx + 90},${hy - 60} L${hx + 130},${hy + 10} L${hx + 100},${hy + 90} L${hx - 70},${hy + 100} Z`, '#020202');
      s += k.ell(hx + 20, hy + 40, 60, 26, '#d8a51e', `opacity=".85" ${k.blur(3)}`) + k.path(`M${hx - 10},${hy + 30} q30,-20 70,0 q-10,30 -40,34 q-30,-4 -30,-34 Z`, '#f0c22c', 'opacity=".9"');
      s += k.path(`M${hx - 120},${hy + 40} L${hx - 90},${hy - 50} L${hx - 10},${hy - 80} L${hx + 90},${hy - 60} L${hx + 130},${hy + 10} L${hx + 100},${hy + 90} L${hx - 70},${hy + 100} Z`, 'none', 'stroke="#c9a090" stroke-width="5" opacity=".6"');
      for (let i = 0; i < 12; i++) { const bx = hx - 150 + k.r() * 300, by = H * 0.82 + k.r() * 60; s += k.rect(bx, by, 40 + k.r() * 20, 16, `hsl(14,52%,${36 + k.r() * 10}%)`, `transform="rotate(${(k.r() - 0.5) * 70} ${bx} ${by})"`); }
    }
    s += '</g>';
    s += k.path(archPath, 'none', 'stroke="#140e0c" stroke-width="10"');
    s += k.rect(0, H * 0.84, W, H * 0.16, k.lin([[0, '#2a2420'], [1, '#141110']]));
    s += k.grime(0, H * 0.82, W, H * 0.18, { color: [0.35, 0.3, 0.25], op: 0.7, freq: 0.03 });
    if (o.toy) s += k.glow(o.toy[0] + 30, o.toy[1], 140, '#ffe6c8', 0.16) + k.tamagotchi(o.toy[0], o.toy[1], o.toy[2] || 0.42, { rot: -28, dust: 0.3, shell: '#d695b2' });
    for (let i = 0; i < 25; i++) { const x = k.r() * W; s += k.ell(x, H * 0.86 + k.r() * 100, 4 + k.r() * 14, 2 + k.r() * 5, '#0d0b09', 'opacity=".8"'); }
    if (o.pallets) {
      s += k.g(Array.from({ length: 6 }, (_, i) => k.rect(i * 40, 0, 26, 300, '#7a6a50')).join('') + k.rect(-10, 40, 240, 26, '#6a5a42') + k.rect(-10, 240, 240, 26, '#6a5a42'), `transform="translate(${cx + 150},${H * 0.5}) rotate(-12)"`);
      s += k.path(`M${cx - 380},${H * 0.42} Q${cx - 300},${H * 0.38} ${cx - 160},${H * 0.45} L${cx - 120},${H * 0.92} L${cx - 420},${H * 0.95} Z`, '#2d4a5a', 'opacity=".95"') + k.path(`M${cx - 380},${H * 0.42} Q${cx - 280},${H * 0.6} ${cx - 300},${H * 0.94}`, 'none', 'stroke="#1a2d38" stroke-width="5"');
    }
    s += k.grime(0, 0, W, H, { op: 0.45, freq: 0.008 });
    return s;
  }
  D('m_lehr', {
    title: 'Odprężarka — zamurowany fragment', exif: phone('08.10.2026', '14:05', { place: 'Huta „Jutrzenka”, hala A, poziom −1', note: 'Lampa błyskowa + czołówka' }), style: 'flash',
    hotspots: [{ x: 600, y: 420, r: 190, ev: 'ev_bricks' }, { x: 290, y: 772, r: 40, ev: 'ev_toy', zoom: 1.8 }],
    draw: k => lehrWall(k, { toy: [290, 772, 0.5] })
  });
  D('m_bricks', {
    title: 'Dwie cegły', exif: phone('08.10.2026', '14:09', { place: 'Huta „Jutrzenka”, odprężarka', note: 'Makro' }), style: 'flash',
    draw: k => {
      const { W, H } = k;
      let s = k.bricks(0, 0, W * 0.55, H, { bw: 230, bh: 90, gap: 10, mortar: '#1e1714' });
      s += k.bricks(W * 0.55, 0, W * 0.45, H, { style: 'new', bw: 200, bh: 80, gap: 14, mortar: '#9a9488' });
      s += k.rect(W * 0.6, H * 0.42, 190, 80, '#b0503a') + [0, 1, 2, 3, 4].map(i => k.rect(W * 0.6 + 16 + i * 36, H * 0.42 + 14, 22, 52, '#2a120c', 'rx="3"')).join('');
      s += k.path(`M${W * 0.55},0 Q${W * 0.56},${H / 2} ${W * 0.55},${H}`, 'none', 'stroke="#aaa294" stroke-width="16" opacity=".7"');
      s += k.grime(0, 0, W, H, { op: 0.5, freq: 0.02 });
      return s;
    }
  });

  /* ================= CIEMNIA W ŁAZIENCE ================= */
  D('m_darkroom', {
    title: 'Ciemnia', exif: phone('05.10.2026', '22:47', { place: 'Mglisko, ul. Szklarska 4' }), style: 'photo', grade: 'none',
    draw: k => {
      const { W, H } = k;
      let s = k.full('#120202');
      s += k.rect(0, 0, W, H, k.rad([[0, '#a0100c'], [0.5, '#3a0504'], [1, '#0a0101']], 0.75, 0.2, 0.8));
      for (let i = 0; i < 9; i++) for (let j = 0; j < 5; j++) s += k.rect(i * 140 - 20, 120 + j * 160, 136, 156, 'none', 'stroke="#2a0403" stroke-width="3"');
      s += k.glow(W * 0.78, H * 0.16, 160, '#ff2a10', 0.6) + k.rect(W * 0.74, H * 0.1, 90, 60, '#ff3a20', 'rx="8"');
      s += k.line(-10, 170, W + 10, 200, '#1a0606', 4);
      for (let i = 0; i < 4; i++) {
        const x = 170 + i * 230, y = 176 + i * 7;
        s += k.rect(x - 8, y - 10, 16, 30, '#3a0a08') + k.rect(x - 22, y + 16, 44, 470 + (i % 2) * 60, '#2a0806');
        for (let f = 0; f < 6; f++) s += k.rect(x - 16, y + 30 + f * 74, 32, 60, '#5a1410', 'opacity=".9"');
        s += k.rect(x - 22, y + 16, 6, 470 + (i % 2) * 60, '#120303') + k.rect(x + 16, y + 16, 6, 470 + (i % 2) * 60, '#120303');
      }
      s += k.rect(0, H * 0.8, W, H * 0.2, '#0a0101') + k.rect(100, H * 0.72, 300, 80, '#200403', 'rx="10"') + k.rect(460, H * 0.74, 240, 70, '#200403', 'rx="10"');
      return s;
    }
  });

  /* ================= BIBLIOTEKA ================= */
  function library(k, o = {}) {
    const { W, H } = k;
    let s = k.full('#2a1d14');
    for (let sh = 0; sh < 4; sh++) {
      const y = 60 + sh * 180;
      s += k.rect(0, y + 150, W, 16, '#4a3020');
      let x = 0;
      while (x < W) { const bw = 18 + k.r() * 26, bh = 110 + k.r() * 36; s += k.rect(x, y + 150 - bh, bw - 2, bh, `hsl(${k.r() * 360},${20 + k.r() * 30}%,${18 + k.r() * 20}%)`); x += bw; }
    }
    s += k.rect(0, 0, W, H, k.rad([[0, '#ffcf85', 0.35], [1, '#000', 0.4]], 0.4, 0.75, 0.7), 'style="mix-blend-mode:soft-light"');
    if (o.table !== false) {
      s += k.rect(-20, H * 0.7, W + 40, H * 0.3, '#3a2416') + k.rect(-20, H * 0.7, W + 40, 10, '#5a3a24');
      s += k.paper(300, H * 0.73, 420, 200, -4, k.rect(20, 20, 180, 130, '#5a4a38') + k.rect(220, 20, 180, 130, '#6a5a44') + k.rect(30, 30, 160, 110, '#a89070', 'opacity=".5"'), { fill: '#2a1e14' });
      s += k.ell(860, H * 0.82, 60, 20, '#ddd') + k.rect(810, H * 0.74, 100, 80, '#e8e0d0', 'rx="10"') + k.ell(860, H * 0.74, 50, 12, '#5a3a20');
      s += k.glow(140, H * 0.5, 300, '#ffcf85', 0.4);
    }
    return s;
  }
  D('m_library', { title: 'Biblioteka Gminna', exif: phone('11.10.2026', '16:00', { place: 'Mglisko, Rynek 9' }), grade: 'warm', draw: k => library(k) });
  D('w_books', { title: 'Tydzień Bibliotek', grade: 'warm', w: 900, h: 900, draw: k => library(k, { table: false }) });

  /* ================= LUSTRO / ZAPOWIEDŹ ================= */
  D('m_mirror', {
    title: 'Szkło pamięta', w: 900, h: 1125, exif: phone('12.10.2026', '15:48', { place: 'Huta „Jutrzenka”, biuro hali B' }), grade: 'cold',
    draw: k => {
      const { W, H } = k;
      let s = k.full('#14181b');
      s += k.rect(0, 0, W, H, k.rad([[0, '#cfd8dc', 0.5], [1, '#000', 0]], 0.75, 0.25, 0.7));
      s += k.rect(110, 120, 680, 880, '#0b0e10') + k.rect(130, 140, 640, 840, k.lin([[0, '#5c6a72'], [1, '#232a2f']], 0, 0, 1, 1));
      s += k.glow(560, 300, 420, '#e8eef0', 0.4);
      const mc = k.id('mc');
      k.def(`<clipPath id="${mc}"><rect x="130" y="140" width="640" height="840"/></clipPath>`);
      s += `<g clip-path="url(#${mc})">` + k.human(450, 1300, 1150, { fill: '#0e1214', hair: 'long', la: [-120, 110], ra: [120, -110], slim: true });
      s += k.rect(370, 196, 160, 104, '#060708', 'rx="12"') + k.circle(450, 252, 40, '#1a2228') + k.circle(440, 242, 10, '#fff', 'opacity=".4"') + '</g>';
      const cracks = ['M450,560 L300,300 L220,170', 'M450,560 L620,260 L700,150', 'M450,560 L760,520', 'M450,560 L640,880 L700,980', 'M450,560 L220,760 L140,900', 'M450,560 L160,520', 'M300,300 L360,250', 'M620,260 L700,320', 'M640,880 L560,940'];
      s += cracks.map(d => k.path(d, 'none', 'stroke="#e9f2f5" stroke-width="2.4" opacity=".75"')).join('');
      s += k.poly([[450, 560], [620, 260], [760, 520]], '#fff', 'opacity=".07"') + k.poly([[450, 560], [220, 760], [160, 520]], '#000', 'opacity=".2"');
      return s;
    }
  });

  /* ================= OKNO — AUTO POD DOMEM ================= */
  D('m_window', { src: 'assets/maja/m_window.jpg',
    title: 'Z okna', w: 900, h: 1200, exif: phone('13.10.2026', '23:10', { place: 'Mglisko, ul. Szklarska 4, piętro', note: 'Tryb nocny' }), style: 'night',
    hotspots: [{ x: 540, y: 870, r: 150, ev: 'ev_car_window' }],
    draw: k => {
      const { W, H } = k;
      let s = k.sky([[0, '#06090d'], [1, '#1a1f26']]);
      s += k.rect(0, 380, W, 300, '#0f1216') + k.path('M0,380 L120,300 L260,380 Z M300,380 L470,280 L640,380 Z M660,380 L800,310 L900,380 Z', '#0b0d10');
      s += k.rect(80, 440, 70, 90, '#3a2a10', 'opacity=".8"') + k.rect(560, 460, 60, 80, '#2a2a1a', 'opacity=".5"');
      s += k.rect(0, 680, W, 520, k.lin([[0, '#1c1a16'], [1, '#0a0a09']]));
      s += k.rect(740, 300, 10, 520, '#111') + k.glow(745, 300, 260, '#ff9a3a', 0.55) + k.ell(745, 300, 30, 10, '#ffd08a');
      s += k.ell(620, 960, 300, 60, '#ff9a3a', 'opacity=".12"');
      s += k.car(470, 1000, 1.05, { fill: '#121417', glass: '#07090b', view: 'front', plateFill: '#3a3c40' });
      s += k.ell(440, 880, 22, 26, '#050607') + k.rect(415, 900, 50, 40, '#050607');
      s += k.fog(500, 500, { op: 0.35, color: [0.6, 0.55, 0.45] });
      for (let i = 0; i < 70; i++) { const x = k.r() * W, y = k.r() * H, r = 2 + k.r() * 6; s += k.ell(x, y, r, r * 1.3, '#cfd6dc', `opacity="${(0.1 + k.r() * 0.25).toFixed(2)}"`); if (k.r() < 0.3) s += k.line(x, y, x + (k.r() - 0.5) * 4, y + 20 + k.r() * 40, '#cfd6dc', 1.5, 'opacity=".15"'); }
      s += k.rect(0, 0, 40, H, '#1a1612') + k.rect(W - 40, 0, 40, H, '#1a1612') + k.rect(0, H / 2 - 18, W, 36, '#1a1612');
      return s;
    }
  });

  /* ================= NAD ZALEWEM / PIES ================= */
  D('m_ola_lake', { src: 'assets/maja/m_ola_lake.jpg',
    title: 'Z Olą nad zalewem', exif: phone('21.09.2026', '18:42', { place: 'Zalew Mgliski, tama' }), grade: 'warm',
    draw: k => {
      const { W, H } = k;
      let s = k.sky([[0, '#2a3a5a'], [0.45, '#d47a52'], [0.62, '#f7b56a'], [0.66, '#ffd9a0']]);
      s += k.glow(W * 0.6, H * 0.6, 420, '#ffcf85', 0.7) + k.circle(W * 0.6, H * 0.6, 46, '#fff2cc');
      s += k.ridge(H * 0.6, 70, '#3a2a3a', { amps: [1, 0.6, 0.2] });
      s += k.rect(-10, H * 0.62, W + 20, H * 0.4, k.lin([[0, '#c87a52'], [1, '#2a2030']]));
      for (let i = 0; i < 40; i++) { const y = H * 0.64 + k.r() * H * 0.3; s += k.rect(W * 0.6 - 120 + (k.r() - 0.5) * 200, y, 30 + k.r() * 140, 2, '#ffe0a0', `opacity="${(0.2 + k.r() * 0.4).toFixed(2)}"`); }
      s += k.rect(-10, H * 0.74, W + 20, 18, '#1a1414') + Array.from({ length: 13 }, (_, i) => k.rect(i * 100, H * 0.66, 10, H * 0.1, '#1a1414')).join('') + k.rect(-10, H * 0.66, W + 20, 10, '#1a1414');
      s += k.human(500, H * 0.86, 330, { fill: '#160f12', hair: 'long', la: [-10, 40], ra: [30, 60], lean: -0.6 });
      s += k.human(610, H * 0.86, 310, { fill: '#160f12', hair: 'short', slim: true, la: [-40, -60], ra: [8, 4], lean: 0.6 });
      s += k.rect(-10, H * 0.86, W + 20, H * 0.2, '#100c0e');
      return s;
    }
  });
  D('m_bandzior', { src: 'assets/maja/m_bandzior.jpg',
    title: 'Bandzior', exif: phone('24.09.2026', '20:15', { place: 'Mglisko, ul. Szklarska 4' }), grade: 'warm',
    draw: k => {
      const { W, H } = k;
      let s = k.full('#3a2a20') + k.glow(W * 0.2, H * 0.2, 500, '#ffcf85', 0.5);
      s += k.rect(-20, H * 0.45, W + 40, H * 0.6, '#5a3a3a', 'rx="60"') + k.rect(-20, H * 0.3, W + 40, H * 0.25, '#6a4646', 'rx="50"') + k.rect(60, H * 0.5, W - 120, 30, '#4a2e2e', 'rx="14"');
      s += k.rect(700, H * 0.38, 260, 170, '#c9a87a', 'rx="40" transform="rotate(-8 830 420)"');
      s += k.dog(560, H * 0.78, 2.6, { fill: '#2a1d14' });
      s += k.ell(740, H * 0.5, 30, 22, '#2a1d14');
      return s;
    }
  });

  /* ================= FOTOPUŁAPKA 1: DZIEDZINIEC ================= */
  function yard(k, o = {}) {
    const { W, H } = k;
    const day = o.mode === 'day' || o.mode === 'dawn';
    const c = day ? {
      sky: o.mode === 'dawn' ? [[0, '#6d7a84'], [1, '#c2bfb4']] : [[0, '#7a858c'], [1, '#b8bcbc']],
      trees: '#2e3a3a', wall: '#4e3a30', gate: '#26292b', ground1: '#55534a', ground2: '#2c2b26', hall: '#4a3029', win: '#7d8890', weed: '#5c6a3a'
    } : { sky: [[0, '#050505'], [1, '#0d0d0d']], trees: '#141414', wall: '#262626', gate: '#3c3c3c', ground1: '#4c4c4c', ground2: '#141414', hall: '#2c2c2c', win: '#0a0a0a', weed: '#5c5c5c' };
    let s = k.sky(c.sky);
    s += k.forest(H * 0.4, 80, 170, c.trees, { count: 28, ground: false });
    if (day) s += k.fog(H * 0.1, H * 0.45, { op: o.mode === 'dawn' ? 0.6 : 0.35 });
    s += k.rect(0, H * 0.36, W * 0.62, H * 0.16, c.wall) + k.grime(0, H * 0.36, W * 0.62, H * 0.16, { op: 0.6 });
    s += k.rect(250, H * 0.2, 26, H * 0.38, c.gate) + k.rect(560, H * 0.2, 26, H * 0.38, c.gate);
    for (let i = 0; i < 14; i++) s += k.rect(282 + i * 20, H * 0.24, 5, H * 0.32, c.gate);
    s += k.rect(276, H * 0.24, 284, 8, c.gate) + k.rect(276, H * 0.4, 284, 6, c.gate) + k.rect(276, H * 0.54, 284, 8, c.gate);
    s += k.pl([[400, H * 0.38], [415, H * 0.44], [430, H * 0.38]], day ? '#777' : '#7a7a7a', 4);
    s += k.rect(W * 0.62, 0, W * 0.4, H * 0.62, c.hall) + k.bricks(W * 0.62, 0, W * 0.4, H * 0.62, { bw: 40, bh: 15, gap: 2, mortar: day ? '#3a2a22' : '#1c1c1c' }).replace(/hsl\(([^)]+)\)/g, m => day ? m : '#2a2a2a');
    s += k.rect(W * 0.7, H * 0.2, 140, H * 0.42, day ? '#1d1714' : '#060606') + k.rect(W * 0.86, H * 0.08, 90, 120, c.win) + k.rect(W * 0.86, H * 0.32, 90, 120, c.win);
    s += k.poly([[-10, H * 0.55], [W * 0.62, H * 0.55], [W * 0.62, H * 0.62], [W + 10, H * 0.62], [W + 10, H + 10], [-10, H + 10]], k.lin([[0, c.ground2], [1, c.ground1]]));
    s += k.grime(0, H * 0.56, W, H * 0.44, { op: 0.5, freq: 0.015, color: day ? [0.15, 0.13, 0.1] : [0.05, 0.05, 0.05] });
    for (let i = 0; i < 8; i++) { const x = k.r() * W, y = H * 0.62 + k.r() * H * 0.34; s += k.pl([[x, y], [x + 30 + k.r() * 60, y + 10 + k.r() * 20], [x + 50 + k.r() * 100, y + k.r() * 30]], day ? '#222' : '#1a1a1a', 2); }
    for (let i = 0; i < 160; i++) { const x = k.r() * W, y = H * 0.58 + k.r() * H * 0.42; s += k.line(x, y, x + (k.r() - 0.5) * 8, y - 8 - k.r() * 24 * (y / H), c.weed, 2); }
    if (o.puddle !== false) s += k.ell(W * 0.38, H * 0.8, 160, 22, day ? '#8e989c' : '#2a2a2a', 'opacity=".6"');
    return s;
  }
  const irF = 'fill';
  const fig = (k, x, y, H, o) => k.human(x, y, H, Object.assign({ fill: '#1c1c1c' }, o));

  D('c1_0003', {
    title: 'CAM-01 · test', w: 1280, h: 720, style: 'irday', exif: trap('CAM-01', 3, '09.10.2026', '18:02'), stamp: tstamp('CAM-01', 3, '09.10.2026', '18:02:11', 9, 'wax'),
    draw: k => yard(k, { mode: 'day' }) + k.g(k.ell(0, 0, 260, 330, '#d9a888') + k.ell(-180, -200, 70, 160, '#d9a888', 'transform="rotate(-20 -180 -200)"') + k.ell(-60, -300, 60, 170, '#d9a888') + k.ell(70, -300, 58, 160, '#d9a888') + k.ell(190, -230, 54, 150, '#d9a888', 'transform="rotate(18 190 -230)"'), `transform="translate(900,760)" ${k.blur(22)}`)
  });
  D('c1_0011', { src: 'assets/trap/c1_0011.jpg',
    title: 'CAM-01 · lis', w: 1280, h: 720, style: 'ir', exif: trap('CAM-01', 11, '10.10.2026', '02:44'), stamp: tstamp('CAM-01', 11, '10.10.2026', '02:44:52', 3, 'wax'),
    draw: k => yard(k) + k.g(k.ell(0, 0, 90, 34, '#8a8a8a') + k.ell(96, -30, 34, 26, '#8a8a8a') + k.path('M110,-46 L104,-80 L124,-50 Z M86,-50 L84,-82 L102,-52 Z', '#8a8a8a') + k.ell(132, -22, 22, 10, '#8a8a8a') + k.pl([[-60, 20], [-64, 60]], '#8a8a8a', 12) + k.pl([[50, 20], [54, 60]], '#8a8a8a', 12) + k.path('M-88,-6 Q-170,-20 -200,30 Q-150,10 -86,14 Z', '#9a9a9a') + k.circle(108, -34, 7, '#fff') + k.circle(126, -32, 6, '#fff') + k.glow(117, -33, 30, '#fff', 0.8), 'transform="translate(560,560)"')
  });
  D('c1_0014', {
    title: 'CAM-01 · sarna', w: 1280, h: 720, style: 'irday', exif: trap('CAM-01', 14, '11.10.2026', '06:58'), stamp: tstamp('CAM-01', 14, '11.10.2026', '06:58:03', 2, 'wax'),
    draw: k => yard(k, { mode: 'dawn' }) + k.g(k.ell(0, 0, 110, 50, '#6b4a30') + k.pl([[-70, 30], [-76, 130]], '#5a3c26', 12) + k.pl([[-40, 30], [-38, 130]], '#5a3c26', 12) + k.pl([[60, 30], [64, 130]], '#5a3c26', 12) + k.pl([[86, 30], [92, 130]], '#5a3c26', 12) + k.path('M90,-20 L130,-110 L160,-100 L120,-10 Z', '#6b4a30') + k.ell(160, -110, 30, 20, '#6b4a30') + k.ell(184, -104, 14, 9, '#3a2a1a') + k.path('M146,-126 L138,-160 L152,-128 Z M160,-126 L166,-160 L170,-126 Z', '#5a3c26') + k.ell(-100, -10, 22, 18, '#e8e0d0'), 'transform="translate(820,470) scale(.8)"') + k.fog(250, 300, { op: 0.4 })
  });
  D('c1_0021', { src: 'assets/trap/c1_0021.jpg',
    title: 'CAM-01 · 14.10, 22:57', w: 1280, h: 720, style: 'ir', exif: trap('CAM-01', 21, '14.10.2026', '22:57'), stamp: tstamp('CAM-01', 21, '14.10.2026', '22:57:40', 4, 'wax'), onView: 'ev_cam1_maja',
    draw: k => yard(k) + fig(k, 760, 560, 300, { fill: '#4a4a4a', hair: 'tail', hairFill: '#555', la: [-14, -8], ra: [16, 10], stride: 0.4 }) + k.rect(728, 330, 64, 90, '#3a3a3a', 'rx="12"') + k.glow(768, 286, 60, '#fff', 1) + k.beam(768, 286, -20, 600, 14, '#fff', 0.35, 10)
  });
  D('c1_0022', { src: 'assets/trap/c1_0022.jpg',
    title: 'CAM-01 · 15.10, 01:20', w: 1280, h: 720, style: 'ir', exif: trap('CAM-01', 22, '15.10.2026', '01:20'), stamp: tstamp('CAM-01', 22, '15.10.2026', '01:20:17', 2, 'wax'), onView: 'ev_cam1_car',
    draw: k => yard(k) + k.car(420, 600, 1.15, { view: 'front', lights: true, fill: '#262626', glass: '#0a0a0a', plateFill: '#ddd' }) + k.glow(330, 520, 320, '#fff', 0.7) + k.glow(510, 520, 320, '#fff', 0.7)
  });
  D('c1_0023', {
    title: 'CAM-01 · 15.10, 02:05', w: 1280, h: 720, style: 'ir', exif: trap('CAM-01', 23, '15.10.2026', '02:05', { note: 'Zdjęcie bardzo ciemne' }), stamp: tstamp('CAM-01', 23, '15.10.2026', '02:05:44', 1, 'wax'),
    edit: { target: { exp: [2.2, 3.6], con: [1.2, 1.9] }, result: 'c1_0023e', ev: 'ev_plate_cam', darkMsg: 'Zdjęcie jest niedoświetlone — IR nie doświetlił odjeżdżającego auta. Rozjaśnij mocno.', doneMsg: 'Tablica częściowo czytelna: DDZ 6K1… Zapisano w Galerii → Wywołane.' },
    fx: { grain: 0.4 },
    draw: k => `<g opacity=".32">${yard(k)}</g>` + `<g opacity=".38">${k.car(430, 590, 1.0, { view: 'rear', tail: true, fill: '#3a3a3a', glass: '#141414', plate: 'DDZ 6K1', plateFill: '#9a9a9a', plateText: '#3a3a3a' })}</g>` + k.ell(470, 543, 14, 12, '#141414', 'opacity=".9"')
  });
  D('c1_0023e', {
    title: 'CAM-01 · 15.10, 02:05 (rozjaśnione)', w: 1280, h: 720, style: 'ir', exif: trap('CAM-01', 23, '15.10.2026', '02:05', { note: 'Rozjaśnione w Ciemni' }), stamp: tstamp('CAM-01', 23, '15.10.2026', '02:05:44', 1, 'wax'),
    fx: { grain: 0.5 },
    draw: k => `<g opacity=".85">${yard(k)}</g>` + k.car(430, 590, 1.0, { view: 'rear', tail: true, fill: '#5a5a5a', glass: '#2a2a2a', plate: 'DDZ 6K1', plateFill: '#e0e0e0', plateText: '#111' }) + k.ell(470, 543, 14, 12, '#3a3226') + k.glow(330, 522, 90, '#fff', 0.6) + k.glow(530, 522, 90, '#fff', 0.6)
  });
  D('c1_0031', { src: 'assets/trap/c1_0031.jpg',
    title: 'CAM-01 · 16.10, 11:12', w: 1280, h: 720, style: 'irday', exif: trap('CAM-01', 31, '16.10.2026', '11:12'), stamp: tstamp('CAM-01', 31, '16.10.2026', '11:12:30', 8, 'half'),
    draw: k => yard(k, { mode: 'day' }) + fig(k, 520, 600, 260, { fill: '#1d2638', cap: true, capFill: '#151c2a', la: [-10, -4], ra: [80, 80] }) + fig(k, 680, 590, 250, { fill: '#1d2638', cap: true, capFill: '#151c2a' }) + k.rect(620, 480, 120, 14, '#c9d0d8', 'opacity=".7"')
  });
  D('c1_0044', {
    title: 'CAM-01 · 19.10, 03:30', w: 1280, h: 720, style: 'ir', exif: trap('CAM-01', 44, '19.10.2026', '03:30'), stamp: tstamp('CAM-01', 44, '19.10.2026', '03:30:02', 0, 'half'),
    draw: k => yard(k) + k.g(k.ell(0, 0, 26, 36, '#8a8a8a') + k.circle(0, -38, 20, '#8a8a8a') + k.circle(-8, -40, 5, '#fff') + k.circle(8, -40, 5, '#fff') + k.path('M-16,-52 L-12,-66 L-4,-56 Z M16,-52 L12,-66 L4,-56 Z', '#8a8a8a'), 'transform="translate(574,140)"')
  });
  D('c1_0057', { src: 'assets/trap/c1_0057.jpg',
    title: 'CAM-01 · 22.10, 02:13', w: 1280, h: 720, style: 'ir', exif: trap('CAM-01', 57, '22.10.2026', '02:13'), stamp: tstamp('CAM-01', 57, '22.10.2026', '02:13:26', 3, 'wax'),
    hotspots: [{ x: 470, y: 360, r: 90, ev: 'ev_jacket', zoom: 1.8 }],
    draw: k => {
      let s = yard(k);
      s += fig(k, 700, 640, 420, { fill: '#5c5c5c', broad: true, hood: true, hoodFill: '#555', la: [-12, -6], ra: [30, 70], stripes: '#f2f2f2', stride: 0.3 });
      s += k.text(700, 420, 'O-SOWA', 30, '#e6e6e6', 'text-anchor="middle" font-weight="800" letter-spacing="2" opacity=".85"') + k.text(700, 448, 'MGLISKO', 15, '#cfcfcf', 'text-anchor="middle" font-weight="700" letter-spacing="3" opacity=".6"');
      s += k.beam(800, 420, -40, 500, 12, '#fff', 0.3, 10);
      return s;
    }
  });
  D('c1_0058', { src: 'assets/trap/c1_0058.jpg',
    title: 'CAM-01 · 22.10, 23:41', w: 1280, h: 720, style: 'ir', exif: trap('CAM-01', 58, '22.10.2026', '23:41'), stamp: tstamp('CAM-01', 58, '22.10.2026', '23:41:09', 2, 'half'),
    draw: k => yard(k) + fig(k, 880, 600, 250, { fill: '#4e4e4e', beanie: true, beanieFill: '#5a5a5a', la: [-20, -60], ra: [20, 10], stride: 0.5 }) + fig(k, 1010, 610, 270, { fill: '#555', hair: 'short', la: [-10, -5], ra: [40, 90] }) + k.circle(1000, 446, 6, '#fff', 'opacity=".8"') + k.circle(1020, 446, 6, '#fff', 'opacity=".8"') + k.glow(1060, 520, 30, '#fff', 0.8)
  });
  D('c1_0060', { src: 'assets/trap/c1_0060.jpg',
    title: 'CAM-01 · 23.10, 00:12', w: 1280, h: 720, style: 'ir', exif: trap('CAM-01', 60, '23.10.2026', '00:12'), stamp: tstamp('CAM-01', 60, '23.10.2026', '00:12:51', 2, 'half'),
    draw: k => yard(k) + k.car(420, 600, 1.15, { view: 'front', lights: true, fill: '#262626', glass: '#0a0a0a', plateFill: '#ddd' }) + k.glow(330, 520, 300, '#fff', 0.7) + k.glow(510, 520, 300, '#fff', 0.7) + fig(k, 640, 590, 260, { fill: '#4a4a4a', broad: true, la: [-8, -4], ra: [60, 90] }) + k.glow(700, 470, 40, '#fff', 1)
  });
  D('c1_0061', {
    title: 'CAM-01 · 23.10, 00:31', w: 1280, h: 720, style: 'ir', exif: trap('CAM-01', 61, '23.10.2026', '00:31', { note: 'Ostatnie zdjęcie przed utratą połączenia' }), stamp: tstamp('CAM-01', 61, '23.10.2026', '00:31:12', 2, 'half'),
    draw: k => yard(k) + k.g(k.ell(0, 0, 300, 360, '#4a4a4a') + k.ell(-200, -240, 80, 190, '#4a4a4a', 'transform="rotate(-20 -200 -240)"') + k.ell(-70, -340, 70, 200, '#4a4a4a') + k.ell(70, -340, 66, 190, '#4a4a4a') + k.ell(200, -270, 60, 170, '#4a4a4a', 'transform="rotate(18 200 -270)"'), `transform="translate(640,820)" ${k.blur(16)}`) + k.glow(1100, 120, 260, '#fff', 0.9)
  });
  const liveExif = p => { const d = p.split('T')[0].split('-').reverse().join('.'); return trap('CAM-01', 'LIVE', d, p.split('T')[1].slice(0, 5), { file: 'CAM01_LIVE.JPG', note: 'Zdjęcie na żądanie (panel)' }); };
  const liveStamp = (temp) => p => { const [d, t] = p.split('T'); return { kind: 'trap', cam: 'CAM-01', date: d.split('-').reverse().join('/'), time: t, temp, moon: 'wax', id: 'LIVE' }; };
  D('c1_live_day', { title: 'CAM-01 · na żywo', w: 1280, h: 720, style: 'irday', exif: liveExif, stamp: liveStamp(7), draw: k => yard(k, { mode: 'day' }) });
  D('c1_live_night', { title: 'CAM-01 · na żywo', w: 1280, h: 720, style: 'ir', exif: liveExif, stamp: liveStamp(1), draw: k => yard(k) });
  D('c1_live_gajda', {
    title: 'CAM-01 · na żywo', w: 1280, h: 720, style: 'ir', exif: liveExif, stamp: liveStamp(1),
    draw: k => {
      let s = yard(k);
      s += k.car(450, 600, 1.1, { view: 'rear', tail: true, trunk: true, fill: '#2e2e2e', glass: '#0e0e0e', plate: 'DDZ 6K19', plateFill: '#ddd' });
      s += k.rect(600, 540, 60, 80, '#5a5a5a', 'rx="6"') + k.rect(612, 528, 26, 14, '#5a5a5a') + k.rect(680, 548, 56, 74, '#5a5a5a', 'rx="6"') + k.rect(690, 536, 24, 14, '#5a5a5a');
      s += fig(k, 800, 600, 270, { fill: '#4a4a4a', broad: true, la: [-20, -30], ra: [30, 40] }) + k.rect(822, 470, 50, 70, '#5a5a5a', 'rx="6"');
      return s;
    }
  });

  /* ================= FOTOPUŁAPKA 2: HALA A ================= */
  function hallTrap(k) {
    const { W, H } = k;
    let s = k.full('#060606');
    s += k.rect(0, H * 0.1, W, H * 0.55, '#1c1c1c') + k.bricks(0, H * 0.1, W, H * 0.55, { bw: 50, bh: 19, gap: 3, mortar: '#121212' }).replace(/hsl\([^)]+\)/g, () => `hsl(0,0%,${(14 + k.r() * 9).toFixed(1)}%)`);
    s += k.path(`M${W * 0.45},${H * 0.65} L${W * 0.45},${H * 0.3} A${W * 0.11},${W * 0.11} 0 0 1 ${W * 0.67},${H * 0.3} L${W * 0.67},${H * 0.65} Z`, '#080808');
    s += k.rect(0, H * 0.62, W, H * 0.4, k.lin([[0, '#1a1a1a'], [1, '#4a4a4a']]));
    s += k.grime(0, H * 0.62, W, H * 0.38, { op: 0.5 });
    s += k.rect(80, -10, 90, H + 20, '#2e2e2e') + k.rect(96, -10, 16, H + 20, '#3a3a3a');
    s += k.poly([[W * 0.72, H * 0.64], [W * 0.95, H * 0.64], [W, H * 0.8], [W * 0.7, H * 0.8]], '#0a0a0a');
    for (let i = 0; i < 5; i++) s += k.rect(W * 0.72 + i * 10, H * 0.66 + i * 26, W * 0.24, 6, '#262626');
    return s;
  }
  D('c2_0004', {
    title: 'CAM-02 · test', w: 1280, h: 720, style: 'ir', exif: trap('CAM-02', 4, '09.10.2026', '18:20'), stamp: tstamp('CAM-02', 4, '09.10.2026', '18:20:45', 7, 'wax'),
    draw: k => hallTrap(k) + fig(k, 640, 640, 330, { fill: '#555', hair: 'tail', hairFill: '#5a5a5a', stride: 0.4 }) + k.rect(600, 380, 80, 110, '#444', 'rx="14"')
  });
  D('c2_0019', { src: 'assets/trap/c2_0019.jpg',
    title: 'CAM-02 · 13.10, 02:40', w: 1280, h: 720, style: 'ir', exif: trap('CAM-02', 19, '13.10.2026', '02:40'), stamp: tstamp('CAM-02', 19, '13.10.2026', '02:40:33', 3, 'wax'), onView: 'ev_cam2_0019',
    draw: k => hallTrap(k) + fig(k, 760, 650, 400, { fill: '#4a4a4a', broad: true, la: [-10, -6], ra: [-60, -110] }) + k.glow(700, 340, 260, '#fff', 1) + k.glow(700, 340, 90, '#fff', 1) + k.circle(700, 340, 30, '#fff') + k.beam(700, 340, 160, 900, 18, '#fff', 0.3, 20)
  });

  /* ================= ZALEGŁE ZDJĘCIA MAI (14.10) ================= */
  D('s_wall', {
    title: '14.10, 23:44', exif: phone('14.10.2026', '23:44', { place: 'Huta „Jutrzenka”, odprężarka', note: 'Zsynchronizowano 24.10, 03:06' }), style: 'flash', onView: 'ev_sync_wall',
    draw: k => lehrWall(k, { hole: true }) + k.rect(0, 0, k.W, k.H, k.rad([[0, '#fff', 0.0], [0.3, '#000', 0.1], [1, '#000', 0.85]], 0.5, 0.62, 0.6))
  });
  D('s_door', {
    title: '14.10, 23:53', exif: phone('14.10.2026', '23:53', { place: 'Huta „Jutrzenka”, hala A', note: 'Poruszone · zsynchronizowano 24.10, 03:06' }), style: 'night', fx: { soft: 2.5, grain: 0.4 }, onView: 'ev_sync_door',
    draw: k => {
      const { W, H } = k;
      let s = hall(k, { light: 'night', cols: 2 });
      s += k.rect(W * 0.42, H * 0.2, W * 0.18, H * 0.42, '#1a1f24');
      s += k.human(W * 0.51, H * 0.64, H * 0.46, { fill: '#050607', broad: true, la: [-8, -4], ra: [-40, -100] });
      s += k.rect(W * 0.44, H * 0.3, 24, 14, '#cfc9a0', 'opacity=".75" transform="rotate(-12 540 280)"');
      s += k.glow(W * 0.47, H * 0.33, 240, '#fffbe6', 1) + k.circle(W * 0.47, H * 0.33, 26, '#fff');
      s += k.g(k.glow(W * 0.47, H * 0.33, 200, '#fff', 0.4), 'transform="translate(60,10)"');
      return s;
    }
  });
  D('s_blur', {
    title: '14.10, 23:54', exif: phone('14.10.2026', '23:54', { place: 'Huta „Jutrzenka”, hala A', note: 'Zsynchronizowano 24.10, 03:06' }), style: 'night', fx: { soft: 6, grain: 0.5 },
    draw: k => {
      const { W, H } = k;
      let s = k.full('#050404') + k.rect(0, H * 0.5, W, H * 0.5, '#151210');
      s += k.g(k.line(0, H * 0.6, W, H * 0.3, '#fff2c0', 18, 'opacity=".6"') + k.line(0, H * 0.7, W, H * 0.4, '#fff2c0', 8, 'opacity=".4"'), k.blur(8));
      s += k.ell(W * 0.6, H * 0.75, 300, 80, '#2a221c');
      return s;
    }
  });

  /* ================= ZDJĘCIA OD KUBY I IGORA (22.10) ================= */
  D('k_maja', {
    title: 'Maja', w: 900, h: 1200, exif: phone('15.08.2026', '19:20', { device: 'Telefon Kuby', place: 'Łąka nad Mglicą' }), grade: 'warm',
    draw: k => {
      const { W, H } = k;
      let s = k.sky([[0, '#f3c27a'], [0.6, '#e89a5a'], [1, '#6a4a30']]);
      s += k.glow(W * 0.75, H * 0.35, 520, '#fff2cc', 0.9);
      s += k.ridge(H * 0.62, 60, '#7a5a40');
      s += k.rect(-10, H * 0.64, W + 20, H, k.lin([[0, '#a07840'], [1, '#3a2a18']]));
      for (let i = 0; i < 260; i++) { const x = k.r() * W, y = H * 0.64 + k.r() * H * 0.36; s += k.line(x, y, x + (k.r() - 0.5) * 12, y - 20 - k.r() * 60, '#d8b070', 2, 'opacity=".5"'); }
      s += k.human(W * 0.5, H * 1.75, H * 1.55, { fill: '#2a1a14', hair: 'long', hairFill: '#4a2416', la: [-120, 110], ra: [120, -110], rim: '#ffd9a0' });
      s += k.rect(W * 0.5 - 115, 318, 230, 140, '#111', 'rx="16"') + k.rect(W * 0.5 - 115, 318, 230, 34, '#9a9ea2', 'rx="12"') + k.circle(W * 0.5, 400, 58, '#1c1c1c') + k.circle(W * 0.5, 400, 38, '#33485a') + k.circle(W * 0.5 - 12, 388, 11, '#fff', 'opacity=".5"');
      return s;
    }
  });
  D('k_gate', {
    title: 'Brama', w: 900, h: 1200, exif: phone('22.10.2026', '23:36', { device: 'Telefon Kuby', place: 'Huta „Jutrzenka”' }), style: 'flash',
    draw: k => {
      const { W, H } = k;
      let s = k.full('#0d0e10') + k.rect(0, H * 0.75, W, H * 0.25, '#2a2924');
      s += k.rect(80, 120, 40, 1000, '#3a3c3e') + k.rect(780, 120, 40, 1000, '#3a3c3e');
      for (let i = 0; i < 16; i++) s += k.rect(130 + i * 41, 180, 9, 880, '#4a4c4e');
      s += k.rect(120, 200, 660, 14, '#4a4c4e') + k.rect(120, 600, 660, 12, '#4a4c4e') + k.rect(120, 1000, 660, 14, '#4a4c4e');
      for (let i = 0; i < 9; i++) s += k.ell(420 + i * 12, 560 + Math.sin(i) * 30 + i * 18, 14, 9, 'none', 'stroke="#8a8a80" stroke-width="5"');
      s += k.rect(400, 700, 70, 60, '#9a8a50', 'rx="6"');
      s += k.rect(250, 300, 400, 200, '#e8e4d8') + k.rect(250, 300, 400, 200, 'none', 'stroke="#c8102e" stroke-width="10"') + k.text(450, 380, 'TEREN PRYWATNY', 38, '#c8102e', 'text-anchor="middle" font-weight="800"') + k.text(450, 440, 'WSTĘP WZBRONIONY', 30, '#222', 'text-anchor="middle" font-weight="700"');
      s += k.grime(250, 300, 400, 200, { op: 0.5 });
      return s;
    }
  });
  D('k_locker', {
    title: 'Szafka 17 od środka', w: 900, h: 1200, exif: phone('22.10.2026', '23:58', { device: 'Telefon Kuby', place: 'Huta „Jutrzenka”, szatnia' }), style: 'flash', onView: 'ev_dk97',
    draw: k => {
      const { W, H } = k;
      let s = k.full('#4a5c62') + k.rect(0, 0, W, H, k.lin([[0, '#5a6e74'], [1, '#2a3438']], 0, 0, 1, 1));
      for (let v = 0; v < 6; v++) s += k.rect(250, 140 + v * 34, 400, 14, '#1a2226', 'rx="4"');
      s += k.grime(0, 0, W, H, { op: 0.7, color: [0.2, 0.17, 0.1] });
      const scr = (d) => k.path(d, 'none', 'stroke="#c9d0cc" stroke-width="5" stroke-linecap="round" opacity=".85"') + k.path(d, 'none', 'stroke="#20282b" stroke-width="2" stroke-linecap="round" transform="translate(2,2)" opacity=".6"');
      s += scr('M250,620 L250,780 Q330,780 330,700 Q330,620 250,620') + scr('M360,780 L364,775') + scr('M420,620 L420,780 M420,700 L490,620 M420,700 L495,780') + scr('M528,780 L532,775');
      s += scr('M362,905 A32,32 0 1 0 361,906 M362,905 Q364,980 330,1032') + scr('M420,870 L500,870 L450,1030');
      for (let i = 0; i < 30; i++) { const x = 150 + k.r() * 600, y = 500 + k.r() * 600; s += k.line(x, y, x + (k.r() - 0.5) * 60, y + (k.r() - 0.5) * 20, '#a8b0aa', 1.5, 'opacity=".35"'); }
      return s;
    }
  });
  D('k_wall', {
    title: 'Mur w odprężarce', exif: phone('23.10.2026', '00:04', { device: 'Telefon Kuby', place: 'Huta „Jutrzenka”, odprężarka' }), style: 'flash', onView: 'ev_patch',
    draw: k => lehrWall(k, { patch: true, pallets: true })
  });
  D('k_headlamp', {
    title: 'Czołówka', exif: phone('23.10.2026', '00:06', { device: 'Telefon Kuby', place: 'Huta „Jutrzenka”, odprężarka' }), style: 'flash', onView: 'ev_headlamp',
    draw: k => {
      const { W, H } = k;
      let s = k.full('#2a2420') + k.grime(0, 0, W, H, { color: [0.35, 0.3, 0.24], op: 0.9, freq: 0.03 });
      for (let i = 0; i < 40; i++) { const x = k.r() * W, y = k.r() * H; s += k.ell(x, y, 6 + k.r() * 26, 3 + k.r() * 10, '#14110e', 'opacity=".7"'); }
      s += k.path('M260,520 Q420,380 640,420 Q860,460 980,600', 'none', 'stroke="#1d1d22" stroke-width="34" stroke-linecap="round"') + k.path('M260,520 Q420,380 640,420 Q860,460 980,600', 'none', 'stroke="#c23a4a" stroke-width="8" stroke-linecap="round" opacity=".7"');
      s += k.rect(520, 380, 220, 150, '#2a2d33', 'rx="30"') + k.circle(630, 455, 56, '#555c66') + k.circle(630, 455, 44, '#c8d0d8') + k.circle(630, 455, 30, '#fff', 'opacity=".8"');
      s += k.path('M600,420 L640,460 L620,490 M640,460 L672,440', 'none', 'stroke="#333" stroke-width="3"');
      s += k.rect(700, 400, 70, 50, '#f0e6d0', 'rx="8" transform="rotate(10 735 425)"') + k.g(k.ell(0, 0, 26, 9, '#7a4a20') + k.ell(26, -6, 9, 7, '#7a4a20') + k.pl([[-16, 6], [-17, 14]], '#7a4a20', 4) + k.pl([[16, 6], [17, 14]], '#7a4a20', 4), 'transform="translate(728,428) rotate(10)"');
      return s;
    }
  });
  D('k_mount', {
    title: 'Filar w hali A', w: 900, h: 1200, exif: phone('23.10.2026', '00:09', { device: 'Telefon Igora', place: 'Huta „Jutrzenka”, hala A' }), style: 'flash', onView: 'ev_mount',
    draw: k => {
      const { W, H } = k;
      let s = k.full('#0e0d0c') + k.rect(260, 0, 380, H, '#2a2522') + k.rect(290, 0, 40, H, '#38322e') + k.grime(260, 0, 380, H, { op: 0.8 });
      s += k.rect(250, 500, 400, 22, '#111', 'rx="4"') + k.rect(250, 760, 400, 22, '#111', 'rx="4"');
      s += k.path('M640,500 L700,560 L690,575 L630,520 Z', '#111') + k.path('M640,760 L690,830 L676,840 L628,782 Z', '#111');
      s += k.path('M380,560 L470,540 L500,610 L430,660 L390,640 Z', '#3d4628') + k.path('M470,540 L520,560 L500,610 Z', '#2a301c');
      return s;
    }
  });
  D('i_car', {
    title: 'Auto przy bramie', exif: phone('23.10.2026', '00:14', { device: 'Telefon Igora', place: 'Huta „Jutrzenka”, przy trafostacji', note: 'Zoom cyfrowy 8×' }), style: 'night', fx: { soft: 1.8, grain: 0.55 },
    onView: 'ev_car_igor',
    draw: k => {
      const { W, H } = k;
      let s = k.sky([[0, '#05070a'], [1, '#141a20']]);
      s += k.rect(0, H * 0.5, W, H * 0.5, '#0c0d0e');
      s += k.rect(W * 0.62, 280, 22, 440, '#090909') + k.glow(W * 0.63, 280, 300, '#ff9a3a', 0.4);
      s += k.car(560, 700, 1.4, { view: 'rear', fill: '#151719', glass: '#08090a', plate: '', plateFill: '#7a7a72' });
      s += k.rect(510, 627, 30, 22, '#7a7a72') + k.text(565, 645, '19', 21, '#1a1a1a', 'text-anchor="middle" font-weight="800"');
      s += k.ell(500, 638, 22, 16, '#7a7a72', `${k.blur(4)}`) + k.ell(470, 638, 30, 16, '#4a4a46', `${k.blur(6)}`);
      s += k.fence(H * 0.95, -20, W + 20, { h: 420, step: 140, color: '#030303', meshOp: 0.75 });
      return s;
    }
  });

  /* ================= SZKLARZ ================= */
  D('sz_window', {
    title: '▒▒▒', w: 900, h: 1200, style: 'night', fx: { grain: 0.5 },
    draw: k => {
      const { W, H } = k;
      let s = k.full('#030405') + k.archWindow(150, 120, 600, 960, { light: '#16222c', broken: 0.55, cols: 4, rows: 6, frame: '#000', pane: '#0a1016' });
      s += k.human(450, 1180, 760, { fill: '#000', broad: true, rim: '#7ff' });
      for (let i = 0; i < 14; i++) { const y = k.r() * H, h2 = 4 + k.r() * 30; s += `<g transform="translate(${(k.r() - 0.5) * 60},0)"><rect x="0" y="${y.toFixed(0)}" width="${W}" height="${h2.toFixed(0)}" fill="#0ff" opacity="${(0.05 + k.r() * 0.15).toFixed(2)}"/></g>`; }
      s += k.mono(W / 2, H - 60, 'kazde szklo ma dwie strony', 30, '#9ff', 'text-anchor="middle" opacity=".8"');
      return s;
    }
  });
})();
