'use strict';
/* Warstwy mapy Mgliska (1000×1300) i wycinki map. */

(() => {
  const D = Art.def;
  const M = { w: 1000, h: 1300, style: 'screen' };
  const RIVER = 'M960,40 C900,120 880,200 840,300 C800,400 780,470 750,540 C720,610 640,700 600,760 C560,820 520,880 450,900 C380,920 340,860 300,780 C280,740 300,710 300,700';
  const LAKE = 'M300,690 C290,640 250,560 170,545 C90,535 40,590 50,650 C60,710 130,735 200,730 C250,726 290,720 300,700 Z';
  const ROADS = [
    { d: 'M1000,1010 C900,960 800,920 742,905 C680,880 600,800 520,772 C450,750 380,720 300,695 C200,670 100,655 0,650', w: 9, c: '#5a6370', name: 'ul. Wrocławska' },
    { d: 'M520,772 C560,740 590,700 602,668 C610,620 590,520 560,430', w: 6, c: '#4a525e', name: 'ul. Szklarska' },
    { d: 'M520,772 C500,820 480,860 470,900 C460,960 470,1100 480,1300', w: 6, c: '#4a525e' },
    { d: 'M742,905 C760,840 770,760 770,700 C772,620 770,540 768,482', w: 5, c: '#444c57' },
    { d: 'M600,760 C640,800 680,840 690,868', w: 4, c: '#3c444e' },
    { d: 'M420,740 C430,780 420,820 404,846', w: 4, c: '#3c444e' }
  ];
  const label = (k, x, y, t, size = 14, fill = '#8a96a4', ex = '') => k.text(x, y, t, size, fill, `text-anchor="middle" font-weight="600" ${ex} style="paint-order:stroke" stroke="#121820" stroke-width="4"`);

  function base(k) {
    let s = k.full('#151b22');
    const forest = '#132019';
    s += k.path('M440,0 L1000,0 L1000,620 C900,600 820,560 760,500 C700,440 640,380 600,330 C560,280 480,200 440,0 Z', forest);
    s += k.path('M0,0 L300,0 C280,120 200,220 120,300 C80,340 30,380 0,400 Z', forest);
    s += k.path('M0,1100 C120,1080 220,1120 300,1300 L0,1300 Z', forest) + k.path('M760,1300 C780,1180 860,1120 1000,1100 L1000,1300 Z', forest);
    for (let i = 0; i < 260; i++) {
      const x = 440 + k.r() * 560, y = k.r() * 600;
      if (y > 620 - (x - 440) * 0.2 || (x < 600 && y > 330)) continue;
      s += k.circle(x, y, 2 + k.r() * 3, '#1a2c22', 'opacity=".9"');
    }
    for (let r = 0; r < 5; r++) s += k.ell(836, 250, 70 + r * 46, 52 + r * 36, 'none', `stroke="#1e3428" stroke-width="1.5" opacity="${0.8 - r * 0.12}"`);
    s += k.path(LAKE, '#1d3850') + k.path(LAKE, 'none', 'stroke="#2c5270" stroke-width="2"');
    s += k.path(RIVER, 'none', 'stroke="#1d3850" stroke-width="13" stroke-linecap="round"');
    s += k.line(296, 668, 306, 716, '#8a96a4', 7);
    for (let i = 0; i < 70; i++) {
      const a = k.r() * 6.28, d = 30 + k.r() * 150;
      const x = 540 + Math.cos(a) * d * 1.2, y = 790 + Math.sin(a) * d * 0.8;
      s += k.rect(x - 10, y - 7, 14 + k.r() * 16, 10 + k.r() * 10, '#232b35', `transform="rotate(${(k.r() - 0.5) * 30} ${x} ${y})"`);
    }
    for (let i = 0; i < 12; i++) s += k.rect(580 + k.r() * 60, 600 + k.r() * 120, 16, 12, '#232b35');
    s += k.rect(500, 395, 110, 60, '#3a2622') + k.rect(610, 410, 50, 40, '#2e1f1b') + k.rect(548, 360, 10, 40, '#3a2622');
    ROADS.forEach(r => { s += k.path(r.d, 'none', `stroke="${r.c}" stroke-width="${r.w}" stroke-linecap="round" fill="none"`); });
    s += k.path('M0,985 C200,970 380,955 500,950 C700,945 860,930 1000,925', 'none', 'stroke="#6a6a6a" stroke-width="3" stroke-dasharray="14 8"');
    s += label(k, 540, 840, 'MGLISKO', 34, '#5a6676', 'letter-spacing="10"');
    s += label(k, 160, 640, 'Zalew Mgliski', 15, '#4a7a9a', 'font-style="italic"');
    s += label(k, 690, 610, 'Mglica', 14, '#4a7a9a', 'font-style="italic" transform="rotate(-48 690 610)"');
    s += label(k, 640, 560, 'ul. Szklarska', 12, '#6a7684', 'transform="rotate(-80 640 560)"');
    s += label(k, 870, 990, 'ul. Wrocławska', 12, '#6a7684', 'transform="rotate(22 870 990)"');
    s += label(k, 840, 210, 'Sowia Kopa', 16, '#4a7a5a', 'font-style="italic"');
    s += label(k, 660, 1020, 'linia kolejowa', 11, '#5a5a5a');
    s += label(k, 120, 1250, '↑ N', 18, '#5a6676');
    return s;
  }
  D('map_base', Object.assign({}, M, { draw: base }));

  D('map_forest', Object.assign({}, M, {
    draw: k => {
      const dash = 'stroke="#b08a5a" stroke-width="4" stroke-dasharray="12 8" fill="none" stroke-linecap="round"';
      let s = '';
      s += k.path('M768,482 C800,450 840,410 880,356', 'none', dash);
      s += k.path('M880,356 C900,300 870,240 800,176', 'none', dash);
      s += k.path('M650,336 C670,320 690,305 712,296', 'none', dash);
      s += k.path('M560,430 C620,420 700,430 768,482', 'none', 'stroke="#8a7a5a" stroke-width="3" stroke-dasharray="6 6" fill="none"');
      s += k.path('M600,560 C620,460 630,400 650,336', 'none', 'stroke="#8a7a5a" stroke-width="4" fill="none"');
      for (let r = 0; r < 8; r++) s += k.ell(836, 250, 40 + r * 34, 30 + r * 27, 'none', `stroke="#3a5a40" stroke-width="1.2" opacity="${0.75 - r * 0.07}"`);
      s += label(k, 920, 470, 'oddz. 214', 11, '#6a8a6a') + label(k, 700, 160, 'oddz. 209', 11, '#6a8a6a') + label(k, 960, 250, 'oddz. 216', 11, '#6a8a6a');
      s += label(k, 830, 430, 'droga leśna nr 7', 11, '#b08a5a', 'transform="rotate(-42 830 430)"');
      return s;
    }
  }));
  D('map_hunt', Object.assign({}, M, {
    draw: k => {
      const pid = k.id('hatch');
      k.def(`<pattern id="${pid}" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="16" height="16" fill="none"/><line x1="0" y1="0" x2="0" y2="16" stroke="#e8a040" stroke-width="3" opacity=".35"/></pattern>`);
      const poly = 'M770,90 L990,80 L995,525 L790,515 L762,300 Z';
      return k.path(poly, `url(#${pid})`) + k.path(poly, 'none', 'stroke="#e8a040" stroke-width="4" stroke-dasharray="16 8"') + label(k, 900, 560, 'Obwód łowiecki 117 · KŁ „Sokół”', 13, '#e8a040');
    }
  }));
  D('map_route1410', Object.assign({}, M, {
    draw: k => {
      const st = 'stroke="#e88aa2" stroke-width="6" fill="none" stroke-linecap="round" stroke-dasharray="2 12"';
      let s = k.path('M602,668 C590,700 560,740 520,772 C600,800 680,880 742,905', 'none', st);
      s += k.path('M602,668 C610,620 590,520 560,430', 'none', 'stroke="#e88aa2" stroke-width="7" fill="none" stroke-linecap="round"');
      s += k.circle(560, 430, 26, '#e5484d', 'opacity=".35"') + k.circle(560, 430, 12, '#e5484d');
      s += label(k, 470, 420, '22:58 → 23:58', 15, '#ff9aa8') + label(k, 470, 440, 'ostatni sygnał', 12, '#ff9aa8');
      s += label(k, 790, 940, '17:05–17:40', 13, '#e88aa2') + label(k, 680, 690, '22:41 wyjazd', 13, '#e88aa2');
      s += k.circle(300, 692, 22, 'none', 'stroke="#8a96a4" stroke-width="3" stroke-dasharray="5 5"') + label(k, 300, 735, 'tama — brak śladu', 12, '#8a96a4');
      return s;
    }
  }));
  D('map_circle', Object.assign({}, M, {
    draw: k => k.circle(800, 290, 125, '#e88aa2', 'opacity=".16"') + k.circle(800, 290, 125, 'none', 'stroke="#e88aa2" stroke-width="4"') + k.circle(800, 290, 6, '#e88aa2') + label(k, 800, 438, '24.10, 03:07 · ±800 m', 13, '#ff9aa8')
  }));

  // Wycinek lasu: środek kadru = środek okręgu (800,290). Skala 2×.
  D('find_snip', {
    w: 1200, h: 1000, style: 'screen',
    draw: k => {
      const T = (x, y) => [(x - 800) * 2 + 600, (y - 290) * 2 + 500];
      let s = k.full('#132019');
      for (let r = 0; r < 9; r++) { const [cx, cy] = T(836, 250); s += k.ell(cx, cy, (40 + r * 34) * 2, (30 + r * 27) * 2, 'none', `stroke="#24402e" stroke-width="2" opacity="${0.85 - r * 0.07}"`); }
      const road = (pts, st) => { const p = pts.map(([x, y]) => T(x, y)); return k.pl(p, '#b08a5a', 6, st || 'stroke-dasharray="18 12"'); };
      s += road([[768, 482], [820, 430], [880, 356]]) + road([[880, 356], [890, 290], [850, 220], [800, 176]]) + road([[650, 336], [690, 305], [712, 296]]);
      s += k.path((() => { const p = [[960, 40], [900, 120], [880, 200], [840, 300], [800, 400], [780, 470]].map(([x, y]) => T(x, y)); return 'M' + p.map(q => q.join(',')).join(' L'); })(), 'none', 'stroke="#1d3850" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"');
      const adit = (x, y, n) => { const [a, b] = T(x, y); return k.rect(a - 16, b - 16, 32, 32, '#c9a85a', 'rx="6"') + k.text(a, b + 7, '⌂', 20, '#222', 'text-anchor="middle" font-weight="900"') + label(k, a, b + 44, n, 22, '#e8d8a8'); };
      s += adit(712, 296, 'Anna') + adit(880, 356, 'Ewa (nr 3)') + adit(800, 176, 'Waltraud');
      const [kx, ky] = T(836, 250);
      s += label(k, kx + 60, ky - 10, '▲ Sowia Kopa 912', 20, '#7a9a7a');
      return s;
    }
  });
  // Mapka ze strony koła łowieckiego — „skan” starej mapy obwodu.
  D('web_kolo_map', {
    w: 900, h: 700, style: 'print',
    draw: k => {
      const T = (x, y) => [(x - 600) * 2.1 + 40, (y - 60) * 1.25 + 20];
      let s = k.full('#e9dfc4') + k.grime(0, 0, 900, 700, { color: [0.5, 0.42, 0.28], op: 0.4, freq: 0.02 });
      for (let r = 0; r < 7; r++) { const [cx, cy] = T(836, 250); s += k.ell(cx, cy, (40 + r * 34) * 2.1, (30 + r * 27) * 1.25, 'none', 'stroke="#9a8a5a" stroke-width="1.5" opacity=".6"'); }
      const poly = [[770, 90], [990, 80], [995, 525], [790, 515], [762, 300]].map(([x, y]) => T(x, y));
      s += k.poly(poly, '#c8302a', 'opacity=".14"') + k.pl([...poly, poly[0]], '#c8302a', 4, 'stroke-dasharray="14 8"');
      const mark = (x, y, n) => { const [a, b] = T(x, y); return k.circle(a, b, 9, '#3a2a1a') + k.hand(a + 14, b + 6, n, 24, '#3a2a1a'); };
      s += mark(880, 356, 'szt. Ewa (paśnik)') + mark(800, 176, 'szt. Waltraud') + mark(712, 296, 'szt. Anna');
      const [ax, ay] = T(712, 296);
      s += k.hand(ax - 20, ay + 40, '(poza obwodem)', 20, '#6a5a3a');
      s += k.hand(500, 640, 'Obwód nr 117 — KŁ „Sokół”', 32, '#c8302a');
      s += k.rect(10, 10, 880, 680, 'none', 'stroke="#6a5a3a" stroke-width="3"');
      return s;
    }
  });
  D('map_snip1410', {
    w: 1200, h: 900, style: 'screen',
    draw: k => {
      let s = `<g transform="translate(-260,-230) scale(1.35)">${base(k)}${Art.reg.map_route1410.draw(k)}</g>`;
      return s;
    }
  });
})();
