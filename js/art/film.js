'use strict';
/* Klisza z 1997, zdjęcia archiwalne, obrazy do rozmów, Kadru i stron. */

(() => {
  const D = Art.def;
  const ph = (date, time, extra = {}) => Object.assign({ date, time }, extra);

  /* ================= KLISZA Z SZAFKI 17 ================= */
  function filmBorder(k, n) {
    const { W, H } = k;
    let s = k.rect(0, 0, W, 34, '#000') + k.rect(0, H - 34, W, 34, '#000') + k.rect(0, 0, 18, H, '#000') + k.rect(W - 18, 0, 18, H, '#000');
    for (let i = 0; i < 16; i++) s += k.rect(30 + i * 75, 8, 40, 18, '#1a1a1a', 'rx="4"') + k.rect(30 + i * 75, H - 26, 40, 18, '#1a1a1a', 'rx="4"');
    s += k.mono(80, H - 38, `▸${n}`, 18, '#d8762a', 'opacity=".9"') + k.mono(W - 120, 30, `${n}A`, 18, '#d8762a', 'opacity=".8"');
    return s;
  }
  const dark = (exp) => exp < 1 ? `<rect x="0" y="0" width="100%" height="100%" fill="#000" opacity="${(1 - exp).toFixed(2)}"/>` : '';
  const flashBg = k => k.full('#030202') + k.rect(0, 0, k.W, k.H, k.rad([[0, '#6a4a34', 0.9], [0.5, '#2a1a12', 0.6], [1, '#000', 0]], 0.5, 0.55, 0.6));
  function teen(k, x, y, Hh, o = {}) {
    let s = k.human(x, y, Hh, Object.assign({ fill: o.fill || '#3a2a22' }, o));
    const u = Hh / 8;
    s += k.ell(x + (o.lean || 0) * u * 0.3, y - Hh + 0.6 * u, 0.36 * u, 0.44 * u, o.face || '#f0d8c0', 'opacity=".9"');
    if (o.hairC) s += k.ell(x + (o.lean || 0) * u * 0.3, y - Hh + 0.32 * u, 0.42 * u, 0.24 * u, o.hairC);
    if (o.policeCap) s += k.ell(x, y - Hh + 0.3 * u, 0.62 * u, 0.26 * u, '#1d2a44') + k.rect(x - 0.62 * u, y - Hh + 0.34 * u, 1.24 * u, 0.12 * u, '#111') + k.circle(x, y - Hh + 0.24 * u, 0.1 * u, '#d8b84a');
    return s;
  }
  function frame08(k, exp = 1) {
    const { W, H } = k;
    let s = flashBg(k);
    s += k.archWindow(80, 60, 220, 380, { light: '#2a3a48', broken: 0.4, cols: 3, rows: 4, frame: '#000', pane: '#111a22' });
    for (let i = 0; i < 40; i++) { const x = 90 + k.r() * 200, y = 120 + k.r() * 300; s += k.line(x, y, x - 6, y + 22, '#9ab', 1.5, 'opacity=".4"'); }
    s += k.rect(0, H * 0.72, W, H * 0.28, '#2a1d14');
    s += teen(k, 430, 690, 380, { la: [-30, -60], ra: [40, 100], hairC: '#3a2414', fill: '#2c3a5a' });
    s += teen(k, 640, 700, 410, { la: [-50, -120], ra: [20, 10], hairC: '#1a120c', fill: '#4a2a22', broad: true });
    s += teen(k, 860, 690, 370, { la: [-10, -4], ra: [60, 120], hairC: '#6a4a24', fill: '#2a4a2a', slim: true });
    s += teen(k, 1030, 700, 360, { la: [-20, -40], ra: [20, 30], hairC: '#2a1a10', fill: '#5a5a62' });
    s += k.rect(560, 380, 18, 54, '#5a2a0a', 'rx="4"') + k.rect(940, 430, 18, 54, '#5a2a0a', 'rx="4"') + k.rect(400, 470, 16, 50, '#5a3a0a', 'rx="4"');
    s += k.rect(300, 640, 120, 70, '#5a4428') + k.rect(700, 650, 140, 60, '#4a3a22');
    s += k.glow(640, 420, 520, '#fff2dc', 0.25);
    s += filmBorder(k, 8) + dark(exp);
    return s;
  }
  function frame14(k, exp = 1) {
    const { W, H } = k;
    let s = k.full('#020203') + k.rect(0, 0, W, H, k.rad([[0, '#3a3a40', 0.8], [1, '#000', 0]], 0.5, 0.7, 0.7));
    s += k.rect(820, 0, 70, H * 0.7, '#140c0a') + k.rect(810, 0, 90, 20, '#0a0606');
    s += k.rect(0, H * 0.62, W, H * 0.38, '#24221e');
    for (let i = 0; i < 160; i++) { const x = k.r() * W, y = k.r() * H; s += k.line(x, y, x - 8, y + 30, '#cfd6e0', 1.5, `opacity="${(0.2 + k.r() * 0.5).toFixed(2)}"`); }
    s += teen(k, 470, 720, 360, { la: [-60, -100], ra: [60, 100], stride: 0.9, hairC: '#1a120c', fill: '#3a2a2a' });
    s += teen(k, 640, 700, 330, { la: [-70, -120], ra: [50, 80], stride: 1, hairC: '#3a2414', fill: '#2a2a40', hood: true, hoodFill: '#2a2a40' });
    s += k.glow(560, 450, 380, '#fff', 0.18);
    s += filmBorder(k, 14) + dark(exp);
    return s;
  }
  function frame21(k, exp = 1) {
    const { W, H } = k;
    let s = flashBg(k);
    s += k.rect(140, 120, 360, 420, '#120c0a') + k.path('M140,540 L140,250 A180,180 0 0 1 500,250 L500,540 Z', '#2a1810') + k.path('M190,540 L190,280 A130,130 0 0 1 450,280 L450,540 Z', '#050302');
    s += k.rect(880, 140, 120, 440, '#050505') + k.rect(870, 130, 140, 14, '#2a1a12');
    s += k.child(940, 580, 230, { fill: '#f2c21a', dark: '#8a6a10', face: 0, faceFill: '#b89070', toy: '#e898b8' });
    s += k.glow(940, 460, 160, '#ffd84a', 0.18);
    s += k.rect(0, H * 0.73, W, H * 0.27, '#2c2016');
    s += teen(k, 330, 720, 420, { la: [-20, -10], ra: [70, 130], hairC: '#3a2414', fill: '#2c3a5a' });
    s += teen(k, 520, 730, 450, { la: [-40, -80], ra: [30, 20], hairC: '#1a120c', fill: '#3a3a3a', broad: true });
    s += k.rect(486, 420, 70, 26, '#7a2a1a', 'rx="6"');
    s += teen(k, 700, 725, 420, { la: [-60, -150], ra: [10, 4], hairC: '#6a4a24', fill: '#2a4a2a', slim: true });
    s += teen(k, 820, 735, 400, { la: [-30, -30], ra: [40, 60], hairC: '#2a1a10', fill: '#5a2a2a' });
    s += k.rect(640, 300, 12, 230, '#5a5048', 'transform="rotate(-24 646 415)"');
    s += k.glow(560, 430, 560, '#fff2dc', 0.22);
    s += filmBorder(k, 21) + dark(exp);
    return s;
  }
  function frame22(k, exp = 1) {
    const { W, H } = k;
    let s = k.full('#010101');
    s += k.g(k.beam(200, 120, 40, 1100, 16, '#fff6d8', 0.5, 14), '');
    s += k.path('M380,520 L540,440 L820,470 L900,600 L700,700 L420,680 Z', '#000');
    s += k.path('M420,560 L560,500 L780,520 L830,600 L690,660 L460,650 Z', '#0a1418');
    for (let i = 0; i < 8; i++) { const x = 380 + i * 70; s += k.rect(x, 440 + (i % 3) * 20, 60, 16, '#5a4430', `transform="rotate(${(k.r() - 0.5) * 70} ${x + 30} ${460})"`); }
    s += k.ell(620, 580, 60, 18, '#f2c21a', `opacity=".55" ${k.blur(4)}`);
    s += k.g(k.ell(0, 0, 70, 50, '#d8b8a0') + k.ell(-50, -30, 18, 40, '#d8b8a0', 'transform="rotate(-30 -50 -30)"') + k.ell(-10, -50, 14, 40, '#d8b8a0') + k.ell(26, -48, 14, 38, '#d8b8a0'), `transform="translate(980,700) rotate(-20)" ${k.blur(8)}`);
    s += filmBorder(k, 22) + dark(exp);
    return `<g ${k.blur(2.5)}>${s}</g>`;
  }
  function frame23(k, exp = 1) {
    const { W, H } = k;
    let s = flashBg(k);
    s += k.rect(0, H * 0.7, W, H * 0.3, '#1a120c');
    s += k.path('M760,560 L1120,540 L1150,700 L740,720 Z', '#020406') + k.path('M800,590 L1090,580 L1110,680 L790,690 Z', '#081014');
    s += k.ell(950, 640, 90, 24, '#f2c21a', 'opacity=".8"') + k.path('M880,632 q60,-20 140,4 q-30,20 -70,22 q-50,-4 -70,-26 Z', '#e8b818', 'opacity=".85"');
    s += teen(k, 520, 820, 760, { la: [-10, -5], ra: [-70, -120], hairC: '#2a1a10', fill: '#26324a', broad: true, policeCap: true });
    s += k.g(k.ell(0, 0, 150, 170, '#e6c2a2') + k.ell(-110, -110, 40, 100, '#e6c2a2', 'transform="rotate(-30 -110 -110)"') + k.ell(-40, -170, 34, 100, '#e6c2a2') + k.ell(36, -170, 34, 96, '#e6c2a2') + k.ell(100, -130, 30, 90, '#e6c2a2', 'transform="rotate(20 100 -130)"'), `transform="translate(300,330)" ${k.blur(14)} opacity=".85"`);
    s += k.rect(450, 470, 140, 30, '#d8c060', 'opacity=".6" transform="rotate(-8 520 485)"');
    s += k.glow(520, 300, 420, '#fff', 0.3);
    s += filmBorder(k, 23) + dark(exp);
    return s;
  }
  const negEdit = (res, ev) => ({ neg: true, target: { exp: [2.3, 3.9], con: [0.9, 1.7] }, result: res, ev, darkMsg: 'Pozytyw jest bardzo ciemny — przeterminowana klisza. Rozjaśnij mocno.' });
  const fexif = n => ({ date: '06.10.2026', time: '21:1' + (n % 10), device: 'Tellio A54 · zdjęcie negatywu na podświetlarce', file: `NEG_${n}.jpg`, note: 'Klisza 35 mm z 1997 roku, wywołana 5.10' });
  D('p_08', { src: 'assets/film/p_08.jpg', title: 'Negatyw 8', style: 'film', exif: fexif(8), edit: negEdit('p_08d', 'ev_frame08'), draw: k => frame08(k, 0.32) });
  D('p_14', { src: 'assets/film/p_14.jpg', title: 'Negatyw 14', style: 'film', exif: fexif(14), edit: negEdit('p_14d', null), draw: k => frame14(k, 0.32) });
  D('p_21', { src: 'assets/film/p_21.jpg', title: 'Negatyw 21', style: 'film', exif: fexif(21), edit: negEdit('p_21d', 'ev_frame21'), draw: k => frame21(k, 0.32) });
  D('p_22', { src: 'assets/film/p_22.jpg', title: 'Negatyw 22', style: 'film', exif: fexif(22), edit: negEdit('p_22d', 'ev_frame22'), draw: k => frame22(k, 0.32) });
  D('p_23fog', { src: 'assets/film/p_23fog.jpg', title: 'Negatyw 23', style: 'film', exif: Object.assign(fexif(23), { note: 'Klatka prześwietlona na podglądzie. Niewiele widać.' }), draw: k => k.full('#0a0806') + k.glow(600, 400, 500, '#2a2018', 0.6) + filmBorder(k, 23) });
  const positiveExif = n => ({ ...fexif(n), file: `POZYTYW_${n}.jpg`, note: 'Roboczy pozytyw ze zdjęcia negatywu. Jednorazowy aparat nie zapisał daty ani godziny wykonania klatki.' });
  D('p_08d', { src: 'assets/film/p_08d.jpg', title: 'Kadr 8 (wywołany)', style: 'film', exif: positiveExif(8), draw: k => frame08(k) });
  D('p_14d', { src: 'assets/film/p_14d.jpg', title: 'Kadr 14 (wywołany)', style: 'film', exif: positiveExif(14), draw: k => frame14(k) });
  D('p_21d', { src: 'assets/film/p_21d.jpg', title: 'Kadr 21 (wywołany)', style: 'film', exif: positiveExif(21), hotspots: [{ x: 988, y: 516, r: 110, label: 'Dziecko w żółtej pelerynie. Na szyi coś różowego na sznurku.' }], draw: k => frame21(k) });
  D('p_22d', { src: 'assets/film/p_22d.jpg', title: 'Kadr 22 (wywołany)', style: 'film', exif: positiveExif(22), hotspots: [{ x: 557, y: 621, r: 95, label: 'W czarnej wodzie — coś żółtego.' }], draw: k => frame22(k) });
  D('p_23d', { src: 'assets/film/p_23d.jpg', title: 'Kadr 23 · skan 2400 dpi', style: 'film', exif: { date: '10.10.2026', time: '', device: 'Skan: IGOR-SERWIS-PC · 2400 dpi', note: 'Data skanowania, nie wykonania klatki. Plik otrzymany od nieznanego nadawcy; aparat nie zapisał godziny.' }, onView: 'ev_frame23', hotspots: [{ x: 610, y: 94, r: 95, label: 'Za duża czapka. Policyjna, z orzełkiem. Jak u syna komendanta.' }, { x: 902, y: 686, r: 120, label: 'W kanale pieca, w czarnej wodzie — żółta peleryna.' }], draw: k => frame23(k) });

  /* ================= TOMEK, 1997 ================= */
  D('w_tomek', { src: 'assets/web/w_tomek.jpg',
    title: 'Tomek, czerwiec 1997', style: 'film', exif: ph('14.06.1997', '', { device: 'Skan odbitki 10×15', note: 'Z albumu rodziny Lisów' }), stamp: { kind: 'film', text: "'97 6 14" },
    draw: k => {
      const { W, H } = k;
      let s = k.sky([[0, '#9fb0bc'], [1, '#d6d6c8']]);
      s += k.rect(80, 60, 1040, 520, '#c9bfae') + k.grime(80, 60, 1040, 520, { op: 0.4, color: [0.4, 0.35, 0.3] });
      for (let r = 0; r < 4; r++) for (let c = 0; c < 8; c++) s += k.rect(130 + c * 125, 100 + r * 120, 70, 70, r === 3 && c === 3 ? '#5a3a2a' : '#4a5a6a', 'opacity=".85"') + k.rect(130 + c * 125, 170 + r * 120, 70, 6, '#e8e0d0');
      s += k.rect(0, 560, W, 240, '#5a5a50') + k.ell(380, 690, 220, 28, '#8a98a4', 'opacity=".6"');
      s += k.child(640, 740, 560, { fill: '#f4c418', dark: '#9a7410', faceFill: '#e8c0a0', toy: '#e898b8', boots: '#1f4a8a' });
      s += k.ell(640, 300, 52, 60, '#e8c0a0') + k.ell(622, 290, 7, 5, '#3a2a1a') + k.ell(658, 290, 7, 5, '#3a2a1a') + k.path('M624,320 Q640,334 656,320', 'none', 'stroke="#8a4a3a" stroke-width="4" stroke-linecap="round"');
      s += k.path('M598,268 Q640,236 682,268 Q660,256 640,256 Q620,256 598,268 Z', '#7a5230');
      return s;
    }
  });

  /* ================= ZDJĘCIA W ROZMOWACH ================= */
  D('b_ledger', { src: 'assets/s1x/b_ledger.jpg',
    title: 'Zeszyt napraw', w: 900, h: 1200, exif: ph('23.10.2026', '19:12', { device: 'Telefon Bartka', place: 'Auto-Sowa, biuro' }), grade: 'warm', onView: 'ev_owner',
    draw: k => {
      const { W, H } = k;
      let s = k.full('#2a1d14') + k.glow(200, 100, 700, '#ffcf85', 0.5);
      let lines = '';
      for (let i = 0; i < 26; i++) lines += k.line(40, 90 + i * 40, 820, 90 + i * 40, '#7a9ab8', 1.4, 'opacity=".5"');
      const rows = [
        ['03.09', 'DZG 21KM', 'Fabia', 'Nowak', 'olej + filtry'],
        ['11.09', 'DDZ 6K19', 'Magna gr.', 'R. Gajda', 'klocki + tarcze'],
        ['18.09', 'DDZ 4P02', 'Passat B5', 'Wierzba', 'rozrząd'],
        ['25.09', 'DB 7713C', 'Corsa', 'Lis W.', 'opony zim.'],
        ['02.10', 'DDZ 8HT1', 'Octavia', 'Bąk', 'hamulce'],
        ['16.10', 'DDZ 6K19', 'Magna gr.', 'R. Gajda', 'mycie podw. + dywaniki (błoto!)']
      ];
      let txt = '';
      rows.forEach((r, i) => {
        const y = 210 + i * 80;
        txt += k.hand(60, y, r[0], 30, '#1a2a6a') + k.hand(190, y, r[1], 32, '#1a2a6a') + k.hand(420, y, r[2], 28, '#1a2a6a') + k.hand(600, y, r[3], 28, '#1a2a6a');
        txt += k.hand(190, y + 34, r[4], 22, '#3a4a8a');
      });
      s += k.paper(30, 40, 840, 1100, 1.5, lines + k.line(170, 40, 170, 1100, '#c94a4a', 2, 'opacity=".5"') + k.hand(60, 120, 'WRZESIEŃ / PAŹDZIERNIK', 30, '#1a2a6a') + txt + k.ell(400, 290, 230, 44, 'none', 'stroke="#c22" stroke-width="5" opacity=".75"') + k.ell(400, 690, 230, 44, 'none', 'stroke="#c22" stroke-width="5" opacity=".75"'), { fill: '#f2ead8' });
      s += k.g(k.ell(0, 0, 70, 160, '#c99a7a') + k.ell(-20, -150, 30, 70, '#b88a6a'), 'transform="translate(800,1050) rotate(-35)"');
      return s;
    }
  });
  D('k_poster', { src: 'assets/kuba/k_poster.jpg',
    title: 'Plakat', w: 900, h: 1200, grade: 'cold',
    draw: k => {
      const { W, H } = k;
      let s = k.full('#4a5258') + k.rect(380, 0, 140, H, '#2a2e32') + k.grime(380, 0, 140, H, { op: 0.6 });
      s += k.paper(150, 140, 600, 860, -2,
        k.rect(0, 0, 600, 140, '#c8102e') + k.text(300, 100, 'ZAGINĘŁA', 82, '#fff', 'text-anchor="middle" font-weight="900" letter-spacing="4"') +
        k.rect(150, 170, 300, 360, '#7a6a5a') + k.human(300, 560, 420, { fill: '#3a2a24', hair: 'long', hairFill: '#6a2e1a' }) + k.rect(150, 170, 300, 360, 'none', 'stroke="#111" stroke-width="4"') +
        k.text(300, 590, 'MAJA WRONA', 44, '#111', 'text-anchor="middle" font-weight="800"') +
        k.text(300, 640, '22 lata · 165 cm · rude włosy do ramion', 22, '#222', 'text-anchor="middle"') +
        k.text(300, 680, 'Ostatnio widziana 14.10.2026 w Mglisku', 22, '#222', 'text-anchor="middle"') +
        k.text(300, 720, 'czerwona kurtka, czarne spodnie', 22, '#222', 'text-anchor="middle"') +
        k.rect(40, 760, 520, 70, '#111') + k.text(300, 806, 'KONTAKT: 604 228 961 · 112', 30, '#fff', 'text-anchor="middle" font-weight="700"'), { fill: '#f4f1ea' });
      s += k.rect(420, 120, 60, 40, '#ddd', 'opacity=".6" transform="rotate(-8 450 140)"') + k.rect(420, 980, 60, 40, '#ddd', 'opacity=".6" transform="rotate(6 450 1000)"');
      return s;
    }
  });
  D('k_kluska', { src: 'assets/kuba/k_kluska.jpg',
    title: 'Kluska, 2008', style: 'print', exif: ph('16.05.2008', '', { note: 'Skan starego zdjęcia' }), onView: 'ev_kluska',
    draw: k => {
      const { W, H } = k;
      let s = k.sky([[0, '#9cc0d8'], [1, '#d8e8c8']]) + k.rect(0, H * 0.45, W, H * 0.55, k.lin([[0, '#6a9a3a'], [1, '#3a6a20']]));
      for (let i = 0; i < 300; i++) { const x = k.r() * W, y = H * 0.45 + k.r() * H * 0.55; s += k.line(x, y, x + (k.r() - 0.5) * 8, y - 12 - k.r() * 16, '#4a7a28', 2); }
      s += k.dog(600, 700, 3.2, { kind: 'dachshund', fill: '#7a4218', ear: '#5a2e10' });
      s += k.rect(560, 560, 120, 22, '#c8102e', 'rx="10"');
      s += k.g(k.ell(0, 0, 70, 40, '#f0c8a8') + k.ell(-40, -20, 20, 36, '#f0c8a8'), 'transform="translate(330,640) rotate(-20)"');
      s += k.mono(W - 40, H - 40, "'08 5 16", 34, '#ff8a2a', 'text-anchor="end" font-weight="700" opacity=".85"');
      return s;
    }
  });
  D('k_kometa', { src: 'assets/kuba/k_kometa.jpg',
    title: 'Kometa-E', grade: 'warm', exif: ph('28.09.2026', '11:02', { device: 'Tellio A54', place: 'Mglisko, ul. Szklarska 4' }), onView: 'ev_kometa',
    draw: k => {
      const { W, H } = k;
      let s = k.full('#2a1a10') + k.rect(0, 0, W, H * 0.55, k.lin([[0, '#c9c2b0'], [1, '#8a826e']])) + k.glow(W * 0.85, H * 0.15, 500, '#fff6dc', 0.6);
      s += k.rect(0, H * 0.55, W, H * 0.45, k.lin([[0, '#7a4e2a'], [1, '#4a2e18']]));
      for (let i = 0; i < 12; i++) s += k.line(0, H * 0.58 + i * 34, W, H * 0.6 + i * 34, '#3a2210', 2, 'opacity=".35"');
      s += k.ell(600, 690, 330, 40, '#000', 'opacity=".4" ' + k.blur(10));
      s += k.kometa(600, 560, 1.9);
      return s;
    }
  });
  D('k_skate', { src: 'assets/kuba/k_skate.jpg', title: '.', grade: 'cold', w: 900, h: 900, draw: k => k.sky([[0, '#2a3a5a'], [1, '#d08a5a']]) + k.path('M0,600 Q300,600 450,420 L900,420 L900,900 L0,900 Z', '#5a5a5e') + k.rect(0, 600, 900, 300, '#4a4a4e') + k.g(k.rect(-90, -14, 180, 28, '#c23', 'rx="14"') + k.circle(-60, 20, 14, '#eee') + k.circle(60, 20, 14, '#eee'), 'transform="translate(520,640) rotate(-8)"') });
  D('o_cat', { src: 'assets/web/o_cat.jpg', title: 'Pani Fasolka', grade: 'warm', w: 900, h: 900, draw: k => k.full('#c9b8a0') + k.rect(120, 100, 660, 560, '#9ab0c0') + k.rect(100, 640, 700, 60, '#e8e0d0') + k.g(k.ell(0, 0, 110, 70, '#3a3a40') + k.circle(80, -70, 54, '#3a3a40') + k.path('M50,-110 L60,-150 L84,-116 Z M100,-114 L120,-150 L126,-104 Z', '#3a3a40') + k.path('M-100,20 Q-180,0 -170,-80', 'none', 'stroke="#3a3a40" stroke-width="22" stroke-linecap="round"'), 'transform="translate(430,600)"') + k.circle(700, 560, 70, '#3a6a2a') + k.rect(660, 580, 80, 70, '#b05a3a') });
  D('o_candle', { src: 'assets/web/o_candle.jpg', title: '🕯️', style: 'night', w: 900, h: 900, draw: k => k.full('#05070a') + k.rect(0, 600, 900, 300, '#1a140e') + k.glow(450, 420, 420, '#ffb347', 0.6) + k.rect(380, 440, 140, 180, '#e8d8b0', 'rx="12" opacity=".85"') + k.path('M450,330 Q474,372 462,400 Q450,420 438,400 Q426,372 450,330 Z', '#ffcf66') + k.path('M450,360 Q460,380 455,396 Q450,404 445,396 Q440,380 450,360 Z', '#fff4c2') + Array.from({ length: 40 }, () => { const x = k.r() * 900, y = k.r() * 580; return k.line(x, y, x, y + 20, '#9ab', 1.2, 'opacity=".2"'); }).join('') });
  D('b_car', { src: 'assets/web/b_car.jpg', title: 'Warsztat', grade: 'cold', w: 900, h: 900, draw: k => k.full('#2a2e32') + k.rect(0, 0, 900, 30, '#ddeeff', 'opacity=".9"') + k.glow(450, 20, 400, '#e8f4ff', 0.4) + k.rect(0, 760, 900, 140, '#3a3a38') + k.rect(160, 520, 20, 240, '#c8b020') + k.rect(720, 520, 20, 240, '#c8b020') + k.rect(140, 500, 620, 24, '#c8b020') + k.car(450, 500, 1.6, { view: 'rear', fill: '#5a6a7a', glass: '#1a2028', plate: 'DDZ 4P02' }) });
  D('b_shop', { src: 'assets/web/b_shop.jpg', title: 'Auto-Sowa', w: 900, h: 900, draw: k => k.sky([[0, '#8a9aa8'], [1, '#c8ccc8']]) + k.rect(80, 300, 740, 480, '#d8d0c0') + k.rect(140, 420, 280, 360, '#3a3e42') + k.rect(480, 420, 280, 360, '#3a3e42') + k.rect(120, 320, 660, 80, '#c23a2a') + k.text(450, 376, 'AUTO-SOWA', 54, '#fff', 'text-anchor="middle" font-weight="900" letter-spacing="3"') + k.rect(0, 780, 900, 120, '#4a4a46') + Array.from({ length: 5 }, (_, i) => k.circle(110 + i * 56, 760, 40, '#111') + k.circle(110 + i * 56, 760, 18, '#333')).join('') });
  D('i_desk', { src: 'assets/web/i_desk.jpg', title: 'Serwis', grade: 'cold', w: 900, h: 900, draw: k => k.full('#14161a') + k.rect(560, 120, 300, 200, '#0a0c10') + k.rect(574, 134, 272, 172, '#2a6a9a') + k.glow(710, 220, 300, '#4a9ada', 0.3) + k.rect(0, 520, 900, 380, '#3a3026') + k.rect(100, 300, 360, 140, '#6a6e72', 'rx="10"') + k.rect(110, 290, 340, 20, '#4a4e52') + Array.from({ length: 6 }, (_, i) => k.rect(80 + i * 120, 600 + (i % 2) * 40, 70, 140, '#111', 'rx="12"') + k.rect(86 + i * 120, 610 + (i % 2) * 40, 58, 116, i % 3 ? '#1a2a3a' : '#3a2a1a', 'rx="6"')).join('') + k.line(700, 560, 820, 760, '#c8b020', 10) });
  D('w_candle', { src: 'assets/web/w_candle.jpg', title: '8 lipca', style: 'night', draw: k => k.sky([[0, '#2a2a40'], [1, '#6a5a6a']]) + k.forest(420, 60, 120, '#14141e', { count: 30 }) + k.rect(0, 440, 1200, 200, '#3a3a50') + k.rect(0, 620, 1200, 300, '#1a1814') + Array.from({ length: 7 }, (_, i) => k.glow(300 + i * 100, 650 - (i % 2) * 20, 70, '#ffb347', 0.7) + k.rect(285 + i * 100, 650 - (i % 2) * 20, 30, 40, '#c8102e', 'opacity=".7"')).join('') + k.fog(400, 300, { op: 0.4 }) });
  D('kadr_hunt', { src: 'assets/web/kadr_hunt.jpg',
    title: 'Paśnik pod Ewą', grade: 'cold', exif: ph('02.11.2025', '14:30', { device: 'Telefon R. Gajdy', place: 'Sowia Kopa, wschodni stok' }),
    draw: k => {
      const { W, H } = k;
      let s = k.sky([[0, '#8a96a0'], [1, '#c0c4c0']]);
      s += k.forest(H * 0.5, 160, 300, '#2a3430', { count: 24, ground: false });
      s += k.path(`M0,${H * 0.62} L${W * 0.45},${H * 0.4} L${W},${H * 0.36} L${W},${H} L0,${H} Z`, '#5a5448');
      s += k.rect(W * 0.6, H * 0.32, 300, 240, '#4a4840') + k.path(`M${W * 0.6},${H * 0.32} L${W * 0.6 + 150},${H * 0.22} L${W * 0.6 + 300},${H * 0.32} Z`, '#3a3a34');
      s += k.rect(W * 0.6 + 60, H * 0.36, 180, 200, '#0a0a0a');
      for (let i = 0; i < 9; i++) s += k.rect(W * 0.6 + 66 + i * 20, H * 0.36, 7, 200, '#6a6a68');
      s += k.rect(W * 0.6 + 60, H * 0.42, 180, 8, '#6a6a68') + k.rect(W * 0.6 + 60, H * 0.54, 180, 8, '#6a6a68') + k.rect(W * 0.6 + 140, H * 0.47, 30, 30, '#9a8a40', 'rx="4"');
      s += k.rect(W * 0.6 + 20, H * 0.25, 120, 40, '#e8e4d0') + k.text(W * 0.6 + 80, H * 0.25 + 27, 'SZTOLNIA NR 3', 15, '#222', 'text-anchor="middle" font-weight="700"');
      s += k.rect(170, 420, 300, 16, '#6a4e30') + k.path('M150,420 L320,330 L490,420 Z', '#5a3e22') + k.rect(180, 436, 12, 200, '#5a3e22') + k.rect(448, 436, 12, 200, '#5a3e22');
      for (let i = 0; i < 12; i++) s += k.line(200 + i * 22, 440, 210 + i * 22, 560, '#7a5a34', 5);
      s += k.ell(320, 560, 140, 30, '#c8b060', 'opacity=".8"');
      s += k.human(620, H * 0.98, 520, { fill: '#2a3226', cap: true, capFill: '#2a3226', broad: true, la: [-10, -4], ra: [20, 60] });
      return s;
    }
  });
  D('g_fish', { src: 'assets/web/g_fish.jpg', title: 'Zawody wędkarskie', grade: 'warm', draw: k => k.sky([[0, '#8ab0d0'], [1, '#e8e0c8']]) + k.ridge(420, 60, '#5a7a6a') + k.rect(0, 440, 1200, 460, k.lin([[0, '#7a9ab0'], [1, '#3a5a70']])) + k.rect(0, 640, 1200, 30, '#6a4e30') + k.car(980, 640, 1.1, { view: 'front', fill: '#2a2e33', glass: '#14181c', plateFill: '#3a3a3a' }).replace('scale(1.1)', 'scale(1.1,1.1)') + k.human(500, 660, 380, { fill: '#2a3a26', cap: true, capFill: '#2a3a26', la: [-10, -4], ra: [-80, -120] }) + k.line(440, 360, 120, 120, '#222', 3) + k.path('M120,120 Q100,300 140,460', 'none', 'stroke="#ccc" stroke-width="1"') });
  D('g_award', { src: 'assets/web/g_award.jpg', title: 'Święto Policji', w: 900, h: 1125, draw: k => k.full('#20304a') + k.rect(60, 0, 140, 900, '#fff', 'opacity=".9"') + k.rect(60, 450, 140, 450, '#c8102e') + k.rect(700, 0, 140, 900, '#1d3d6b') + k.human(450, 1180, 980, { fill: '#1a2840', broad: true, cap: true, capFill: '#14203a' }) + k.ell(450, 380, 120, 150, '#e0b391') + k.ell(450, 250, 150, 50, '#14203a') + k.rect(300, 270, 300, 26, '#0a0a0a') + k.circle(450, 230, 18, '#d8b84a') + k.rect(560, 700, 80, 16, '#d8b84a') });
  D('l_ribbon', { src: 'assets/web/l_ribbon.jpg', title: 'Plac zabaw przy Wodnej', grade: 'warm', draw: k => k.sky([[0, '#9ac0e0'], [1, '#e8f0f0']]) + k.rect(0, 560, 1200, 340, '#6a9a3a') + k.rect(120, 300, 20, 300, '#c23') + k.rect(360, 300, 20, 300, '#c23') + k.rect(110, 290, 280, 20, '#e8b020') + k.path('M800,600 L900,360 L960,360 L940,600 Z', '#3a8ac8') + k.line(160, 520, 1040, 520, '#c8102e', 10) + k.human(560, 760, 400, { fill: '#22252c', broad: true, la: [-10, -4], ra: [50, 70] }) + k.human(760, 760, 360, { fill: '#5a2a3a', hair: 'long' }) + k.human(380, 770, 380, { fill: '#3a3a3a' }) });

  /* ================= STRONY ================= */
  D('web_flood97', { src: 'assets/web/web_flood97.jpg',
    title: 'Ulica Wodna, 8.07.1997', style: 'news',
    draw: k => {
      const { W, H } = k;
      let s = k.sky([[0, '#8a8a8a'], [1, '#c8c8c8']]);
      for (let b = 0; b < 3; b++) {
        const x = 60 + b * 400;
        s += k.rect(x, 140 - b * 30, 330, 520, '#5a5a5a');
        for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) s += k.rect(x + 30 + c * 75, 180 - b * 30 + r * 95, 44, 56, '#2a2a2a');
      }
      s += k.rect(0, 520, W, 380, k.lin([[0, '#6a6a62'], [1, '#3a3a36']]));
      for (let i = 0; i < 60; i++) { const y = 530 + k.r() * 360; s += k.rect(k.r() * W, y, 40 + k.r() * 160, 3, '#9a9a92', 'opacity=".5"'); }
      s += k.g(k.path('M-120,0 L120,0 L90,40 L-90,40 Z', '#2a2a2a') + k.human(-20, 0, 150, { fill: '#1a1a1a' }) + k.human(50, 0, 140, { fill: '#1a1a1a', cap: true }), 'transform="translate(700,700)"');
      s += k.rect(160, 560, 120, 70, '#3a3a3a', 'transform="rotate(12 220 595)"');
      return s;
    }
  });
  D('web_rybicki', { src: 'assets/web/web_rybicki.jpg', title: 'Adam Rybicki', w: 900, h: 1100, style: 'news', draw: k => k.full('#8a8a8a') + k.rect(0, 0, 900, 1100, k.rad([[0, '#bdbdbd'], [1, '#6a6a6a']], 0.5, 0.35, 0.7)) + k.human(450, 1260, 1050, { fill: '#2a2a2a', broad: true }) + k.ell(450, 420, 140, 175, '#cfcfcf') + k.ell(450, 280, 150, 70, '#6a6a6a') + k.circle(400, 430, 42, 'none', 'stroke="#111" stroke-width="8"') + k.circle(500, 430, 42, 'none', 'stroke="#111" stroke-width="8"') + k.line(442, 430, 458, 430, '#111', 8) + k.path('M400,520 Q450,540 500,520', 'none', 'stroke="#555" stroke-width="6"') });
  D('web_wojt', { src: 'assets/web/web_wojt.jpg', title: 'Leszek Malicki', w: 900, h: 1125, draw: k => k.full('#c8ccd4') + k.rect(0, 0, 900, 1125, k.rad([[0, '#f0f0f0'], [1, '#9aa0aa']], 0.5, 0.3, 0.8)) + k.human(450, 1300, 1080, { fill: '#22252c', broad: true }) + k.path('M370,560 L450,700 L530,560', 'none', 'stroke="#f0f0f0" stroke-width="40"') + k.path('M430,600 L470,600 L480,820 L450,860 L420,820 Z', '#8a1d2a') + k.ell(450, 400, 140, 175, '#e3b897') + k.path('M310,380 Q320,250 450,240 Q580,250 590,380 Q560,300 450,300 Q340,300 310,380 Z', '#5a4a3e') + k.path('M300,700 Q450,860 600,700', 'none', 'stroke="#d8b84a" stroke-width="16"') + k.circle(450, 790, 40, '#d8b84a') });
  D('web_dam', { src: 'assets/web/web_dam.jpg',
    title: 'Tama, 15.10', grade: 'cold', exif: ph('15.10.2026', '07:30', { device: 'Zdjęcie czytelnika', place: 'Zalew Mgliski, korona tamy' }),
    draw: k => {
      const { W, H } = k;
      let s = k.sky([[0, '#8a949c'], [1, '#c4c8ca']]);
      s += k.fog(100, 500, { op: 0.7 });
      s += k.rect(0, 420, W, 200, '#7a8a94') + k.fog(380, 260, { op: 0.6 });
      s += k.poly([[0, 600], [W, 520], [W, 900], [0, 900]], '#6a6a66');
      s += k.rect(0, 560, W, 14, '#3a3a3a', 'transform="rotate(-3.8 600 560)"');
      for (let i = 0; i < 14; i++) s += k.rect(40 + i * 90, 560 - i * 6, 10, 60, '#3a3a3a');
      s += k.car(560, 700, 1.25, { view: 'rear', fill: '#b8261e', glass: '#1a2026', plate: 'DDZ 23MW' });
      s += k.path('M700,512 Q760,520 750,590 L700,600 Q690,560 700,512 Z', '#8a1d1d');
      s += k.path('M0,640 Q300,610 620,660 Q900,700 1200,640', 'none', 'stroke="#f0d000" stroke-width="10"') + k.path('M0,640 Q300,610 620,660 Q900,700 1200,640', 'none', 'stroke="#111" stroke-width="10" stroke-dasharray="30 30"');
      s += k.human(250, 760, 260, { fill: '#1d2638', cap: true, capFill: '#151c2a' }) + k.rect(200, 600, 100, 12, '#c9d0d8', 'opacity=".6"');
      return s;
    }
  });
  D('web_anna', { src: 'assets/web/web_anna.jpg', title: 'Sztolnia Anna', grade: 'warm', draw: k => { let s = k.sky([[0, '#8ab0c8'], [1, '#d8d8c8']]) + k.forest(420, 140, 260, '#2a4a30', { count: 30, ground: false }) + k.path('M0,520 L1200,460 L1200,900 L0,900 Z', '#6a5a40'); s += k.path('M420,700 L420,420 A180,180 0 0 1 780,420 L780,700 Z', '#5a4a3a') + k.path('M470,700 L470,440 A130,130 0 0 1 730,440 L730,700 Z', '#0a0806') + k.glow(600, 520, 120, '#ffcf85', 0.6) + k.rect(560, 470, 80, 60, '#ffcf85', 'opacity=".3"') + k.rect(800, 520, 260, 120, '#2e6b3a') + k.text(930, 570, 'SZTOLNIA ANNA', 26, '#fff', 'text-anchor="middle" font-weight="800"') + k.text(930, 606, 'trasa turystyczna · kasa →', 18, '#fff', 'text-anchor="middle"') + k.human(300, 760, 220, { fill: '#c23a2a', hair: 'long' }) + k.human(360, 770, 240, { fill: '#2a4a8a', cap: true }); return s; } });
  D('web_waltraud', { src: 'assets/web/web_waltraud.jpg', title: 'Sztolnia Waltraud', grade: 'cold', draw: k => { let s = k.sky([[0, '#6a7680'], [1, '#a8aeb0']]) + k.forest(400, 140, 260, '#1e2e26', { count: 30, ground: false }) + k.path('M0,480 L1200,440 L1200,900 L0,900 Z', '#4a443a'); s += k.path('M440,720 L440,470 A160,160 0 0 1 760,470 L760,720 Z', '#3a342c') + k.path('M480,720 L480,500 A120,120 0 0 1 720,500 L720,720 Z', '#050505') + k.path('M480,560 L560,520 L640,540 L720,500 L720,720 L480,720 Z', '#3a3228') + k.rect(470, 640, 260, 80, '#2a3a44', 'opacity=".9"') + Array.from({ length: 14 }, () => { const x = 420 + k.r() * 360, y = 690 + k.r() * 60; return k.rect(x, y, 30 + k.r() * 40, 20, '#5a5040', `transform="rotate(${(k.r() - 0.5) * 60} ${x} ${y})"`); }).join('') + k.rect(820, 520, 200, 130, '#e8d020') + k.text(920, 575, 'UWAGA!', 30, '#111', 'text-anchor="middle" font-weight="900"') + k.text(920, 612, 'grozi zawaleniem', 18, '#111', 'text-anchor="middle" font-weight="700"'); return s; } });
  function ewaScene(k) {
    const { W, H } = k;
    let s = k.sky([[0, '#7a8690'], [1, '#b0b4b0']]) + k.forest(380, 160, 300, '#1e2a24', { count: 26, ground: false });
    s += k.path('M0,460 L1200,420 L1200,900 L0,900 Z', '#5a5246');
    s += k.rect(380, 360, 440, 380, '#6a6a64') + k.grime(380, 360, 440, 380, { op: 0.6 });
    s += k.rect(450, 430, 300, 310, '#050505');
    for (let i = 0; i < 12; i++) s += k.rect(458 + i * 24, 430, 9, 310, '#7a7a76');
    s += k.rect(450, 520, 300, 10, '#7a7a76') + k.rect(450, 640, 300, 10, '#7a7a76') + k.rect(580, 570, 40, 40, '#9a8a40', 'rx="5"');
    s += k.rect(860, 480, 230, 140, '#2e6b3a') + k.text(975, 525, 'OSTOJA NIETOPERZY', 18, '#fff', 'text-anchor="middle" font-weight="800"') + k.text(975, 556, 'NATURA 2000', 22, '#fff', 'text-anchor="middle" font-weight="800"') + k.text(975, 590, 'wstęp wzbroniony', 16, '#fff', 'text-anchor="middle"');
    s += k.rect(80, 600, 220, 12, '#6a4e30') + k.path('M60,600 L190,520 L320,600 Z', '#5a3e22') + k.rect(90, 612, 10, 140, '#5a3e22') + k.rect(280, 612, 10, 140, '#5a3e22');
    return s;
  }
  D('web_ewa', { src: 'assets/web/web_ewa.jpg', title: 'Sztolnia Ewa (nr 3)', grade: 'cold', draw: ewaScene });
  D('web_adits', { src: 'assets/web/web_ewa.jpg', title: 'Sztolnia Ewa (nr 3)', grade: 'cold', draw: ewaScene });

  /* ================= ZRZUTY EKRANU ================= */
  D('z_article', {
    src: 'assets/web/z_article.jpg', title: 'Zrzut ekranu', w: 900, h: 1600, style: 'screen', exif: ph('07.10.2026', '22:46', { device: 'Tellio A54 · zrzut ekranu' }),
    draw: k => {
      let s = k.full('#f7f3ea') + k.rect(0, 0, 900, 120, '#1d1d1d') + k.text(40, 80, '22:46', 30, '#fff') + k.rect(0, 120, 900, 90, '#ece8de') + k.rect(30, 140, 840, 50, '#fff', 'rx="25"') + k.text(60, 174, 'gazetasudecka.pl/archiwum/2007/07/…', 22, '#666');
      s += k.text(450, 290, 'Gazeta Sudecka', 54, '#1a1512', 'text-anchor="middle" font-family="Georgia, serif" font-weight="700"');
      s += k.text(40, 400, 'Dziesięć lat ciszy.', 50, '#1a1512', 'font-family="Georgia, serif" font-weight="700"') + k.text(40, 460, 'Kto widział Tomka Lisa?', 50, '#1a1512', 'font-family="Georgia, serif" font-weight="700"');
      s += k.rect(0, 510, 900, 600, k.lin([[0, '#9a9a9a'], [1, '#4a4a46']]));
      for (let b = 0; b < 3; b++) { s += k.rect(30 + b * 300, 560, 240, 360, '#5a5a5a'); for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) s += k.rect(55 + b * 300 + c * 70, 590 + r * 80, 34, 44, '#2a2a2a'); }
      s += k.rect(0, 900, 900, 210, '#5e5e58') + k.rect(0, 900, 900, 4, '#8a8a84');
      const lines = ['W nocy z 7 na 8 lipca 1997 roku woda w Mglicy', 'podniosła się o cztery metry. Dolne Mglisko…', '…Miał na sobie żółtą pelerynę', 'przeciwdeszczową z kapturem.'];
      lines.forEach((l, i) => { s += k.text(40, 1180 + i * 50, l, 30, '#2a2420', 'font-family="Georgia, serif"'); });
      s += k.rect(40, 1172 + 2 * 50 - 34, 520, 46, '#ffe066', 'opacity=".5"');
      return s;
    }
  });
  D('z_kruk', {
    src: 'assets/web/z_kruk.jpg', title: 'Zrzut ekranu', w: 900, h: 1600, style: 'screen', exif: ph('12.10.2026', '21:42', { device: 'Tellio A54 · zrzut ekranu' }),
    draw: k => {
      let s = k.full('#f2f3f5') + k.rect(0, 0, 900, 120, '#1d1d1d') + k.text(40, 80, '21:42', 30, '#fff') + k.rect(0, 120, 900, 110, '#c43d2f') + k.text(40, 196, 'Mglisko24.pl', 44, '#fff', 'font-weight="800"');
      s += k.text(40, 330, 'Tragiczny wypadek', 56, '#1d1f22', 'font-weight="800"') + k.text(40, 400, 'na moście kolejowym', 56, '#1d1f22', 'font-weight="800"') + k.text(40, 450, '14.09.2011', 26, '#888');
      const lines = ['W środę rano z przęsła remontowanego', 'mostu nad Mglicą spadł 30-letni', 'Dariusz K., mieszkaniec Mgliska…', '', 'Znajomi wspominają, że ostatnio często', 'powtarzał, że „musi coś komuś oddać”.'];
      lines.forEach((l, i) => { s += k.text(40, 540 + i * 56, l, 32, '#222'); });
      s += k.rect(30, 540 + 4 * 56 - 40, 840, 120, '#ffe066', 'opacity=".45"');
      return s;
    }
  });
})();
