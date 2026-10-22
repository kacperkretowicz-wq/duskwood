'use strict';
/*
  Generator „zdjęć” SVG. Każdy obraz to funkcja rysująca + styl (aparat, podczerwień, klisza, flesz).
  Obrazy są deterministyczne (ziarno losowości = id obrazu) i cache'owane jako blob URL.
*/

const Art = (() => {
  const reg = {};
  const cache = {};
  const f = v => Math.round(v * 10) / 10;
  const esc = U.esc;
  const FONT = "Segoe UI, Roboto, Helvetica, Arial, sans-serif";
  const MONO = "Consolas, 'Courier New', monospace";
  const HAND = "'Segoe Print', 'Bradley Hand', 'Comic Sans MS', cursive";

  function def(id, meta) { reg[id] = meta; }
  // Identyfikator może mieć parametr: "c1_live_night@2026-10-24T23:41" — wtedy exif i stamp są funkcjami parametru.
  function get(id) {
    const [b, p] = String(id).split('@');
    const m = reg[b];
    if (!m || p == null) return m;
    return Object.assign({}, m, {
      exif: typeof m.exif === 'function' ? m.exif(p) : m.exif,
      stamp: typeof m.stamp === 'function' ? m.stamp(p) : m.stamp,
      param: p
    });
  }
  const has = id => !!reg[String(id).split('@')[0]];

  function kit(W, H, r) {
    let n = 0;
    const defs = [];
    const blurs = {};
    const nid = p => `${p}${n++}`;
    const k = {
      W, H, r, f, FONT, MONO, HAND, defs,
      def: s => { defs.push(s); },
      id: nid,
      lin(stops, x1 = 0, y1 = 0, x2 = 0, y2 = 1, extra = '') {
        const i = nid('g');
        defs.push(`<linearGradient id="${i}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${extra}>${stops.map(s => `<stop offset="${s[0]}" stop-color="${s[1]}" stop-opacity="${s[2] == null ? 1 : s[2]}"/>`).join('')}</linearGradient>`);
        return `url(#${i})`;
      },
      rad(stops, cx = 0.5, cy = 0.5, rr = 0.5, extra = '') {
        const i = nid('r');
        defs.push(`<radialGradient id="${i}" cx="${cx}" cy="${cy}" r="${rr}" ${extra}>${stops.map(s => `<stop offset="${s[0]}" stop-color="${s[1]}" stop-opacity="${s[2] == null ? 1 : s[2]}"/>`).join('')}</radialGradient>`);
        return `url(#${i})`;
      },
      blur(sd) {
        if (!blurs[sd]) { blurs[sd] = nid('b'); defs.push(`<filter id="${blurs[sd]}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${sd}"/></filter>`); }
        return `filter="url(#${blurs[sd]})"`;
      },
      rect: (x, y, w, h, fill, ex = '') => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}" ${ex}/>`,
      circle: (cx, cy, rr, fill, ex = '') => `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(rr)}" fill="${fill}" ${ex}/>`,
      ell: (cx, cy, rx, ry, fill, ex = '') => `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(rx)}" ry="${f(ry)}" fill="${fill}" ${ex}/>`,
      path: (d, fill, ex = '') => `<path d="${d}" ${/(^|\s)fill=/.test(ex) ? '' : `fill="${fill}"`} ${ex}/>`,
      line: (x1, y1, x2, y2, stroke, w = 1, ex = '') => `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${stroke}" stroke-width="${w}" ${ex}/>`,
      poly: (pts, fill, ex = '') => `<polygon points="${pts.map(p => f(p[0]) + ',' + f(p[1])).join(' ')}" fill="${fill}" ${ex}/>`,
      pl: (pts, stroke, w = 1, ex = '') => `<polyline points="${pts.map(p => f(p[0]) + ',' + f(p[1])).join(' ')}" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`,
      g: (inner, ex = '') => `<g ${ex}>${inner}</g>`,
      text: (x, y, s, size, fill, ex = '') => `<text x="${f(x)}" y="${f(y)}" font-size="${size}" fill="${fill}" ${/font-family=/.test(ex) ? '' : `font-family="${FONT}"`} ${ex}>${esc(s)}</text>`,
      mono: (x, y, s, size, fill, ex = '') => `<text x="${f(x)}" y="${f(y)}" font-size="${size}" fill="${fill}" font-family="${MONO}" ${ex}>${esc(s)}</text>`,
      hand: (x, y, s, size, fill, ex = '') => `<text x="${f(x)}" y="${f(y)}" font-size="${size}" fill="${fill}" font-family="${HAND}" ${ex}>${esc(s)}</text>`,
      full: fill => `<rect x="-5" y="-5" width="${W + 10}" height="${H + 10}" fill="${fill}"/>`,

      sky(stops) { return k.full(k.lin(stops)); },
      glow(cx, cy, rr, color, op = 1) { return k.circle(cx, cy, rr, k.rad([[0, color, op], [0.35, color, op * 0.45], [1, color, 0]])); },
      stars(count, maxY, op = 0.8) {
        let s = '';
        for (let i = 0; i < count; i++) s += k.circle(r() * W, r() * maxY, r() * 1.2 + 0.3, '#fff', `opacity="${f(r() * op)}"`);
        return s;
      },
      moon(cx, cy, rr, o = {}) {
        return k.glow(cx, cy, rr * 6, o.halo || '#cfdbe6', 0.25) + k.circle(cx, cy, rr, o.color || '#e9eef2') +
          k.circle(cx - rr * 0.3, cy - rr * 0.2, rr * 0.22, '#000', 'opacity=".07"') + k.circle(cx + rr * 0.25, cy + rr * 0.3, rr * 0.16, '#000', 'opacity=".06"');
      },
      // Pasmo górskie: suma sinusów o losowych fazach.
      ridge(base, amp, fill, o = {}) {
        const step = o.step || 10;
        const fr = o.freq || [0.004, 0.011, 0.027];
        const ph = fr.map(() => r() * 6.28);
        const am = o.amps || [1, 0.45, 0.18];
        let d = `M-10,${H + 10} L-10,${f(base)}`;
        for (let x = -10; x <= W + 10; x += step) {
          let y = 0;
          fr.forEach((q, i) => { y += Math.sin(x * q + ph[i]) * am[i]; });
          d += ` L${x},${f(base - (y + 1) * amp * 0.5)}`;
        }
        d += ` L${W + 10},${H + 10} Z`;
        return k.path(d, fill, o.ex || '');
      },
      spruce(x, base, h, w) {
        const tiers = Math.max(5, Math.round(h / 14));
        const R = [], L = [];
        for (let i = 1; i <= tiers; i++) {
          const t = i / tiers;
          const y = base - h + t * h * 0.94;
          const ww = w * (0.06 + 0.94 * Math.pow(t, 0.9)) * (0.82 + r() * 0.36);
          R.push(`${f(x + ww)},${f(y)}`, `${f(x + ww * 0.42)},${f(y - h * 0.012)}`);
          L.unshift(`${f(x - ww * 0.42)},${f(y - h * 0.012)}`, `${f(x - ww * (0.9 + r() * 0.2))},${f(y + r() * 2)}`);
        }
        const tw = Math.max(1.5, w * 0.06);
        return `M${f(x)},${f(base - h)} L${R.join(' L')} L${f(x + tw)},${f(base)} L${f(x - tw)},${f(base)} L${L.join(' L')} Z`;
      },
      forest(base, hmin, hmax, fill, o = {}) {
        const x0 = o.x0 != null ? o.x0 : -30, x1 = o.x1 != null ? o.x1 : W + 30;
        const count = o.count || Math.round((x1 - x0) / ((hmin + hmax) * 0.16));
        let d = '';
        for (let i = 0; i < count; i++) {
          const x = x0 + (x1 - x0) * (i + r() * 0.9) / count;
          const h = hmin + r() * (hmax - hmin);
          const b = base + (o.jy ? (r() - 0.5) * o.jy : 0) + (o.curve ? o.curve(x) : 0);
          d += k.spruce(x, b, h, h * (o.wr || 0.24));
        }
        return k.path(d, fill, o.ex || '') + (o.ground !== false ? k.rect(-10, base - 2 + (o.jy || 0) / 2, W + 20, H, fill, o.ex || '') : '');
      },
      // Mgła: szum fraktalny jako kanał alfa, zawężony gradientem pionowym.
      fog(y, h, o = {}) {
        const fid = nid('fog'), mid = nid('fm');
        const c = o.color || [0.78, 0.84, 0.88];
        const fx = o.fx || 0.0032, fy = o.fy || 0.011;
        defs.push(`<filter id="${fid}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="${fx} ${fy}" numOctaves="4" seed="${Math.floor(r() * 999)}"/><feColorMatrix values="0 0 0 0 ${c[0]}  0 0 0 0 ${c[1]}  0 0 0 0 ${c[2]}  ${o.a || 1.6} 0 0 0 ${o.b || -0.62}"/></filter>`);
        defs.push(`<mask id="${mid}"><rect x="0" y="${f(y)}" width="${W}" height="${f(h)}" fill="${k.lin([[0, '#fff', 0], [0.4, '#fff', 1], [0.65, '#fff', 1], [1, '#fff', 0]])}"/></mask>`);
        return `<g mask="url(#${mid})" opacity="${o.op || 0.7}"><rect x="0" y="${f(y)}" width="${W}" height="${f(h)}" filter="url(#${fid})"/></g>`;
      },
      haze(y, h, color, op) { return k.rect(-10, y, W + 20, h, k.lin([[0, color, 0], [0.5, color, op], [1, color, 0]])); },
      // Brud, zacieki, faktura ścian.
      grime(x, y, w, h, o = {}) {
        const fid = nid('gr');
        const c = o.color || [0.08, 0.06, 0.04];
        defs.push(`<filter id="${fid}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="${o.freq || 0.018}" numOctaves="4" seed="${Math.floor(r() * 999)}"/><feColorMatrix values="0 0 0 0 ${c[0]}  0 0 0 0 ${c[1]}  0 0 0 0 ${c[2]}  ${o.a || 2.2} 0 0 0 ${o.b || -1}"/></filter>`);
        return `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" filter="url(#${fid})" opacity="${o.op || 0.8}" ${o.ex || ''}/>`;
      },
      beam(x, y, ang, len, spread, color = '#fff6d8', op = 0.5, blurSd = 6) {
        const a = ang * Math.PI / 180, s = spread * Math.PI / 180;
        const p1 = [x + Math.cos(a - s) * len, y + Math.sin(a - s) * len];
        const p2 = [x + Math.cos(a + s) * len, y + Math.sin(a + s) * len];
        const gid = nid('bm');
        defs.push(`<linearGradient id="${gid}" gradientUnits="userSpaceOnUse" x1="${f(x)}" y1="${f(y)}" x2="${f(x + Math.cos(a) * len)}" y2="${f(y + Math.sin(a) * len)}"><stop offset="0" stop-color="${color}" stop-opacity="${op}"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient>`);
        return k.poly([[x, y], p1, p2], `url(#${gid})`, k.blur(blurSd) + ' style="mix-blend-mode:screen"') + k.glow(x, y, 26, color, 0.9);
      },
      // Sylwetka człowieka: kończyny jako grube linie z zaokrągleniem.
      human(x, y, H, o = {}) {
        const u = H / 8, c = o.fill || '#07080a';
        const top = y - H;
        const shY = top + 1.45 * u, sw = (o.broad ? 1.08 : o.slim ? 0.8 : 0.92) * u;
        const hipY = top + 4.15 * u, hw = (o.slim ? 0.55 : 0.64) * u;
        const coatY = top + (o.coat ? 5.2 : 4.3) * u;
        const hx = x + (o.lean || 0) * u * 0.3, hy = top + 0.56 * u;
        let s = '';
        const limb = (pts, w, col = c) => k.pl(pts, col, w);
        const legW = (o.slim ? 0.46 : 0.54) * u;
        const st = o.stride || 0;
        // nogi
        s += limb([[x - 0.3 * u, hipY], [x - 0.33 * u - st * u * 0.4, y - 0.95 * u], [x - 0.36 * u - st * u * 0.6, y - 0.18 * u]], legW);
        s += limb([[x + 0.3 * u, hipY], [x + 0.33 * u + st * u * 0.4, y - 0.95 * u], [x + 0.36 * u + st * u * 0.6, y - 0.18 * u]], legW);
        s += k.ell(x - 0.42 * u - st * u * 0.6, y - 0.1 * u, 0.36 * u, 0.15 * u, c) + k.ell(x + 0.42 * u + st * u * 0.6, y - 0.1 * u, 0.36 * u, 0.15 * u, c);
        // ręce
        const arm = (side, a1, a2) => {
          const sx = x + side * (sw - 0.2 * u), sy = shY + 0.22 * u;
          const r1 = a1 * Math.PI / 180, r2 = a2 * Math.PI / 180;
          const ex = sx + Math.sin(r1) * 1.5 * u, ey = sy + Math.cos(r1) * 1.5 * u;
          const hx2 = ex + Math.sin(r2) * 1.35 * u, hy2 = ey + Math.cos(r2) * 1.35 * u;
          return { svg: limb([[sx, sy], [ex, ey], [hx2, hy2]], 0.44 * u), hand: [hx2, hy2] };
        };
        const la = arm(-1, ...(o.la || [-9, -5])), ra = arm(1, ...(o.ra || [9, 5]));
        k.hands = { l: la.hand, r: ra.hand };
        // tułów
        const torso = `M${f(x - sw)},${f(shY + 0.3 * u)} Q${f(x - sw)},${f(shY)} ${f(x - sw * 0.55)},${f(shY - 0.06 * u)} L${f(x + sw * 0.55)},${f(shY - 0.06 * u)} Q${f(x + sw)},${f(shY)} ${f(x + sw)},${f(shY + 0.3 * u)} L${f(x + hw * 1.1)},${f(coatY)} L${f(x - hw * 1.1)},${f(coatY)} Z`;
        s += la.svg + ra.svg + k.path(torso, c);
        s += k.rect(hx - 0.17 * u, top + 0.92 * u, 0.34 * u, 0.62 * u, c);
        // włosy / nakrycie głowy (tył)
        if (o.hair === 'long') s += k.path(`M${f(hx - 0.46 * u)},${f(hy - 0.1 * u)} Q${f(hx - 0.6 * u)},${f(hy + 1.2 * u)} ${f(hx - 0.7 * u)},${f(shY + 0.75 * u)} L${f(hx + 0.7 * u)},${f(shY + 0.75 * u)} Q${f(hx + 0.6 * u)},${f(hy + 1.2 * u)} ${f(hx + 0.46 * u)},${f(hy - 0.1 * u)} Z`, o.hairFill || c);
        if (o.hair === 'tail') s += k.path(`M${f(hx + 0.2 * u)},${f(hy)} Q${f(hx + 0.9 * u)},${f(hy + 0.6 * u)} ${f(hx + 0.5 * u)},${f(shY + 0.6 * u)} Q${f(hx + 0.45 * u)},${f(hy + 0.6 * u)} ${f(hx + 0.1 * u)},${f(hy + 0.2 * u)} Z`, o.hairFill || c);
        if (o.hood) s += k.path(`M${f(hx - 0.62 * u)},${f(shY + 0.1 * u)} Q${f(hx - 0.7 * u)},${f(hy - 0.9 * u)} ${f(hx)},${f(hy - 0.78 * u)} Q${f(hx + 0.7 * u)},${f(hy - 0.9 * u)} ${f(hx + 0.62 * u)},${f(shY + 0.1 * u)} Z`, o.hoodFill || c);
        s += k.ell(hx, hy, 0.4 * u, 0.52 * u, c);
        if (o.hair === 'short') s += k.ell(hx, hy - 0.16 * u, 0.44 * u, 0.42 * u, o.hairFill || c);
        if (o.hair === 'bun') s += k.circle(hx, hy - 0.62 * u, 0.24 * u, o.hairFill || c);
        if (o.cap) s += k.ell(hx, hy - 0.22 * u, 0.46 * u, 0.36 * u, o.capFill || c) + k.ell(hx + (o.capDir || 0) * 0.3 * u, hy - 0.08 * u, 0.62 * u, 0.1 * u, o.capFill || c);
        if (o.beanie) s += k.path(`M${f(hx - 0.44 * u)},${f(hy - 0.08 * u)} Q${f(hx - 0.46 * u)},${f(hy - 0.82 * u)} ${f(hx)},${f(hy - 0.8 * u)} Q${f(hx + 0.46 * u)},${f(hy - 0.82 * u)} ${f(hx + 0.44 * u)},${f(hy - 0.08 * u)} Z`, o.beanieFill || c);
        // pasy odblaskowe
        if (o.stripes) {
          const sc = o.stripes;
          s += k.rect(x - sw * 0.98, shY + 1.55 * u, sw * 1.96, 0.16 * u, sc) + k.rect(x - hw * 1.08, top + 3.55 * u, hw * 2.16, 0.16 * u, sc);
          const band = (a, b) => { const mx = a[0] + (b[0] - a[0]) * 0.55, my = a[1] + (b[1] - a[1]) * 0.55; return k.circle(mx, my, 0.17 * u, sc); };
          s += band([x - sw, shY], la.hand) + band([x + sw, shY], ra.hand);
        }
        if (o.rim) {
          // poświata konturu od światła z tyłu
          s = k.g(s, `filter="url(#${k.rimFilter(o.rim)})"`);
        }
        return s;
      },
      rimFilter(color) {
        const id = nid('rim');
        defs.push(`<filter id="${id}" x="-20%" y="-20%" width="140%" height="140%"><feMorphology in="SourceAlpha" operator="dilate" radius="2" result="d"/><feGaussianBlur in="d" stdDeviation="3" result="b"/><feFlood flood-color="${color}" flood-opacity=".55"/><feComposite in2="b" operator="in" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`);
        return id;
      },
      // Dziecko w pelerynie z kapturem.
      child(x, y, H, o = {}) {
        const u = H / 6, c = o.fill || '#e3b52b', d = o.dark || '#7a5a10';
        let s = '';
        s += k.pl([[x - 0.32 * u, y - 1.6 * u], [x - 0.36 * u, y - 0.15 * u]], o.legs || '#2a2c33', 0.5 * u);
        s += k.pl([[x + 0.32 * u, y - 1.6 * u], [x + 0.36 * u, y - 0.15 * u]], o.legs || '#2a2c33', 0.5 * u);
        s += k.ell(x - 0.42 * u, y - 0.12 * u, 0.36 * u, 0.18 * u, o.boots || '#1f3a5a') + k.ell(x + 0.42 * u, y - 0.12 * u, 0.36 * u, 0.18 * u, o.boots || '#1f3a5a');
        s += k.path(`M${f(x - 0.55 * u)},${f(y - 4.6 * u)} L${f(x + 0.55 * u)},${f(y - 4.6 * u)} L${f(x + 1.25 * u)},${f(y - 1.45 * u)} Q${f(x)},${f(y - 1.2 * u)} ${f(x - 1.25 * u)},${f(y - 1.45 * u)} Z`, c);
        s += k.path(`M${f(x - 0.1 * u)},${f(y - 4.4 * u)} L${f(x + 0.05 * u)},${f(y - 1.4 * u)}`, 'none', `stroke="${d}" stroke-width="${f(0.08 * u)}" opacity=".5"`);
        s += k.path(`M${f(x - 0.72 * u)},${f(y - 4.35 * u)} Q${f(x - 0.85 * u)},${f(y - 6 * u)} ${f(x)},${f(y - 6 * u)} Q${f(x + 0.85 * u)},${f(y - 6 * u)} ${f(x + 0.72 * u)},${f(y - 4.35 * u)} Z`, c);
        s += k.ell(x + (o.face || 0) * 0.15 * u, y - 5.05 * u, 0.42 * u, 0.5 * u, o.faceFill || '#2a2014');
        if (o.toy) s += k.pl([[x - 0.2 * u, y - 4.4 * u], [x, y - 3.4 * u], [x + 0.2 * u, y - 4.4 * u]], '#ddd', 0.05 * u) + k.ell(x, y - 3.25 * u, 0.2 * u, 0.25 * u, o.toy);
        return s;
      },
      dog(x, y, s, o = {}) {
        const c = o.fill || '#2a1d14';
        if (o.kind === 'dachshund') {
          return k.g(
            k.ell(0, -28, 62, 18, c) + k.pl([[-40, -18], [-44, 0]], c, 9) + k.pl([[-28, -18], [-26, 0]], c, 9) + k.pl([[34, -18], [32, 0]], c, 9) + k.pl([[46, -18], [50, 0]], c, 9) +
            k.ell(68, -46, 20, 15, c) + k.ell(88, -40, 15, 8, c) + k.ell(60, -38, 8, 18, o.ear || '#1a120c', 'transform="rotate(15 60 -38)"') + k.pl([[-60, -32], [-82, -48]], c, 6) + k.circle(74, -50, 2.2, '#000'),
            `transform="translate(${f(x)},${f(y)}) scale(${s})"`);
        }
        return k.g(
          k.ell(0, -52, 60, 26, c) + k.pl([[-42, -36], [-46, 0]], c, 14) + k.pl([[-24, -34], [-22, 0]], c, 14) + k.pl([[30, -36], [28, 0]], c, 14) + k.pl([[46, -36], [50, 0]], c, 14) +
          k.ell(70, -84, 24, 22, c) + k.ell(92, -78, 16, 11, c) + k.path('M58,-102 L50,-128 L72,-104 Z', c) + k.path('M76,-104 L84,-128 L90,-100 Z', c) + k.pl([[-58, -60], [-84, -88]], c, 9),
          `transform="translate(${f(x)},${f(y)}) scale(${s})"`);
      },
      // Samochód: widok z tyłu (rear) albo z przodu (front), w skali s (szer. bazowa 240).
      car(x, y, s, o = {}) {
        const c = o.fill || '#15181c', gl = o.glass || '#05070a';
        let d = '';
        if (o.view === 'front') {
          d += k.path('M-120,-20 L-118,-62 Q-110,-78 -86,-84 L-60,-130 Q-56,-138 -44,-138 L44,-138 Q56,-138 60,-130 L86,-84 Q110,-78 118,-62 L120,-20 Z', c);
          d += k.path('M-52,-128 L52,-128 L74,-88 L-74,-88 Z', gl);
          d += k.rect(-118, -24, 236, 24, c) + k.rect(-104, -2, 24, 12, '#000') + k.rect(80, -2, 24, 12, '#000');
          d += k.rect(-34, -48, 68, 16, o.plateFill || '#cfd3d6', 'rx="2"');
          if (o.lights) d += k.glow(-82, -64, 120, '#fffbe6', 1) + k.glow(82, -64, 120, '#fffbe6', 1) + k.ell(-82, -64, 26, 12, '#fff') + k.ell(82, -64, 26, 12, '#fff');
          else d += k.ell(-82, -64, 24, 10, '#2a2f36') + k.ell(82, -64, 24, 10, '#2a2f36');
        } else {
          d += k.path('M-122,-18 L-120,-66 Q-114,-80 -92,-86 L-66,-132 Q-62,-140 -50,-140 L50,-140 Q62,-140 66,-132 L92,-86 Q114,-80 120,-66 L122,-18 Z', c);
          d += k.path('M-56,-130 L56,-130 L78,-90 L-78,-90 Z', gl);
          d += k.rect(-120, -22, 240, 22, c) + k.rect(-104, -2, 24, 12, '#000') + k.rect(80, -2, 24, 12, '#000');
          const tl = o.tail ? '#ff2a1a' : '#4a0c0a';
          d += k.path('M-118,-74 L-78,-78 L-78,-62 L-118,-58 Z', tl) + k.path('M118,-74 L78,-78 L78,-62 L118,-58 Z', tl);
          if (o.tail) d += k.glow(-98, -68, 70, '#ff2a1a', 0.7) + k.glow(98, -68, 70, '#ff2a1a', 0.7);
          d += k.rect(-36, -52, 72, 17, o.plateFill || '#cfd3d6', 'rx="2"') + k.rect(-36, -52, 7, 17, '#1d3d9a', 'rx="1"');
          if (o.plate) d += k.text(4, -38.5, o.plate, 12.5, o.plateText || '#111', 'text-anchor="middle" font-weight="700" letter-spacing="1"');
          if (o.trunk) d += k.path('M-78,-90 L78,-90 L92,-150 L-92,-150 Z', '#0b0d10') + k.glow(0, -110, 70, '#ffe9b0', 0.25);
        }
        return k.g(d, `transform="translate(${f(x)},${f(y)}) scale(${s})"`);
      },
      // Mur z cegieł; styl old (ciemne, nierówne) albo new (jaśniejsza dziurawka).
      bricks(x, y, w, h, o = {}) {
        const bw = o.bw || 56, bh = o.bh || 22, gap = o.gap || 3;
        const mortar = o.mortar || '#2a2420';
        let s = k.rect(x, y, w, h, mortar);
        const rows = Math.ceil(h / (bh + gap));
        for (let j = 0; j < rows; j++) {
          const off = (j % 2) * (bw / 2);
          for (let i = -1; i < Math.ceil(w / (bw + gap)) + 1; i++) {
            const bx = x + i * (bw + gap) - off, by = y + j * (bh + gap);
            const x0 = Math.max(x, bx), x1 = Math.min(x + w, bx + bw);
            if (x1 <= x0 || by >= y + h) continue;
            const hh = Math.min(bh, y + h - by);
            let col;
            if (o.style === 'new') { const l = 38 + r() * 8; col = `hsl(${12 + r() * 6},${48 + r() * 10}%,${l}%)`; }
            else { const l = 14 + r() * 12; col = `hsl(${8 + r() * 14},${30 + r() * 20}%,${l}%)`; }
            if (o.patch && bx + bw / 2 > o.patch[0] && bx + bw / 2 < o.patch[0] + o.patch[2] && by + bh / 2 > o.patch[1] && by + bh / 2 < o.patch[1] + o.patch[3]) {
              const l = 36 + r() * 9; col = `hsl(${14 + r() * 6},${50 + r() * 10}%,${l}%)`;
            }
            s += k.rect(x0 + r() * 1.5, by + r() * 1.5, x1 - x0 - r() * 2, hh - r() * 2, col, 'rx="1.5"');
            if (o.style === 'new' && o.holes && r() < 0.3) s += k.rect(x0 + 8, by + 6, 6, hh - 12, '#2a1a12', 'opacity=".5"') + k.rect(x0 + 20, by + 6, 6, hh - 12, '#2a1a12', 'opacity=".5"');
          }
        }
        return s;
      },
      // Okno hali: łukowe, szprosy, część szyb wybita.
      archWindow(x, y, w, h, o = {}) {
        const light = o.light || '#8fa3b3';
        const broken = o.broken != null ? o.broken : 0.45;
        let s = k.path(`M${f(x)},${f(y + h)} L${f(x)},${f(y + w / 2)} A${f(w / 2)},${f(w / 2)} 0 0 1 ${f(x + w)},${f(y + w / 2)} L${f(x + w)},${f(y + h)} Z`, light, `opacity="${o.op || 1}"`);
        const cols = o.cols || 4, rws = o.rows || 6;
        let panes = '';
        for (let j = 0; j < rws; j++) for (let i = 0; i < cols; i++) {
          const px = x + i * w / cols, py = y + w / 2 + j * (h - w / 2) / rws;
          if (r() > broken) panes += k.rect(px + 2, py + 2, w / cols - 4, (h - w / 2) / rws - 4, o.pane || '#1c2630', `opacity="${f(0.55 + r() * 0.4)}"`);
          else if (r() < 0.4) panes += k.poly([[px + 2, py + 2], [px + w / cols - 2, py + 2], [px + 2 + r() * (w / cols), py + r() * 20 + 6]], o.pane || '#1c2630', 'opacity=".7"');
        }
        s += panes;
        let bars = '';
        for (let i = 1; i < cols; i++) bars += k.line(x + i * w / cols, y + w / 2 - (i === cols / 2 ? w / 2 : w / 3), x + i * w / cols, y + h, o.frame || '#0a0c0e', 3);
        for (let j = 0; j <= rws; j++) bars += k.line(x, y + w / 2 + j * (h - w / 2) / rws, x + w, y + w / 2 + j * (h - w / 2) / rws, o.frame || '#0a0c0e', 3);
        s += bars + k.path(`M${f(x)},${f(y + h)} L${f(x)},${f(y + w / 2)} A${f(w / 2)},${f(w / 2)} 0 0 1 ${f(x + w)},${f(y + w / 2)} L${f(x + w)},${f(y + h)}`, 'none', `stroke="${o.frame || '#0a0c0e'}" stroke-width="6"`);
        return s;
      },
      // Bryła huty z zewnątrz: hala, dach szedowy, komin, okna.
      huta(x, base, s, o = {}) {
        const wall = o.wall || '#2b1a16', dark = o.dark || '#120c0a', sky = o.win || '#5d6f7d';
        let d = '';
        d += k.rect(-20, -470, 26, 470, o.chimney || '#2a1915') + k.path('M-26,-470 L12,-470 L12,-484 L-26,-484 Z', dark);
        for (let i = 0; i < 18; i++) d += k.line(-20, -450 + i * 25, 6, -450 + i * 25, dark, 1.5, 'opacity=".6"');
        d += k.rect(-260, -210, 520, 210, wall);
        let roof = 'M-270,-210';
        for (let i = 0; i < 6; i++) { const rx = -270 + i * 90; roof += ` L${rx + 70},-268 L${rx + 70},-210 L${rx + 90},-210`; }
        d += k.path(roof + ' L250,-210 Z', dark);
        for (let i = 0; i < 6; i++) {
          const wx = -236 + i * 80;
          d += k.archWindow(wx, -180, 50, 120, { light: sky, broken: 0.5, cols: 3, rows: 4, frame: dark, pane: '#141b22' });
        }
        d += k.rect(-262, -14, 524, 14, dark) + k.rect(260, -130, 210, 130, o.annex || '#24160f') + k.path('M255,-130 L475,-130 L455,-160 L275,-160 Z', dark);
        for (let i = 0; i < 4; i++) d += k.rect(280 + i * 46, -110, 28, 40, i === 2 ? (o.lit || '#141b22') : '#0e1317') + k.rect(280 + i * 46, -110, 28, 40, 'none', `stroke="${dark}" stroke-width="3"`);
        d += k.rect(-60, -90, 120, 90, '#0a0807') + k.path('M-60,-90 L60,-90 L60,-84 L-60,-84 Z', '#1f1511');
        if (o.sign) d += k.text(0, -222, 'HUTA SZKŁA „JUTRZENKA”', 18, '#6b5e52', 'text-anchor="middle" letter-spacing="4" font-weight="700" opacity=".6"');
        d += k.grime(-262, -270, 740, 270, { op: 0.55, freq: 0.012 });
        return k.g(d, `transform="translate(${f(x)},${f(base)}) scale(${s})"`);
      },
      fence(y, x0, x1, o = {}) {
        let s = '';
        const c = o.color || '#0d0f12';
        for (let x = x0; x <= x1; x += o.step || 90) s += k.rect(x - 3, y - (o.h || 120), 6, o.h || 120, c);
        s += k.line(x0, y - (o.h || 120) + 8, x1, y - (o.h || 120) + 8, c, 3) + k.line(x0, y - 10, x1, y - 10, c, 2);
        let mesh = '';
        for (let x = x0; x < x1; x += 14) mesh += `M${x},${y - (o.h || 120) + 8} L${x + 50},${y - 10} M${x + 50},${y - (o.h || 120) + 8} L${x},${y - 10} `;
        s += k.path(mesh, 'none', `stroke="${c}" stroke-width="1" opacity="${o.meshOp || 0.55}"`);
        return s;
      },
      tamagotchi(x, y, s, o = {}) {
        return k.g(
          k.ell(0, 0, 40, 46, o.shell || '#d98fb4') + k.ell(-8, -12, 26, 22, '#fff', 'opacity=".12"') +
          k.rect(-20, -22, 40, 30, '#9aa58a', 'rx="5"') + k.rect(-20, -22, 40, 30, 'none', 'rx="5" stroke="#5c3a4e" stroke-width="3"') +
          (o.pixel ? k.rect(-6, -12, 4, 4, '#2c3324') + k.rect(-2, -16, 4, 4, '#2c3324') + k.rect(2, -12, 4, 4, '#2c3324') + k.rect(-4, -8, 8, 4, '#2c3324') : '') +
          k.circle(-14, 22, 5, '#5c3a4e') + k.circle(0, 26, 5, '#5c3a4e') + k.circle(14, 22, 5, '#5c3a4e') +
          k.circle(0, -46, 6, 'none', 'stroke="#bbb" stroke-width="3"') + (o.dust ? k.ell(0, 0, 40, 46, '#7a6a5a', `opacity="${o.dust}"`) : ''),
          `transform="translate(${f(x)},${f(y)}) scale(${s}) rotate(${o.rot || 0})"`);
      },
      disposable(x, y, s, o = {}) {
        return k.g(
          k.rect(-110, -60, 220, 120, '#e5b81c', 'rx="10"') + k.rect(-110, -18, 220, 46, '#c3321f') + k.rect(-110, -60, 220, 120, 'none', 'rx="10" stroke="#5a3c05" stroke-width="3"') +
          k.circle(-40, 4, 34, '#1a1a1a') + k.circle(-40, 4, 22, '#2d3a44') + k.circle(-46, -2, 6, '#fff', 'opacity=".3"') +
          k.rect(40, -48, 46, 26, '#cfd7dc', 'rx="3"') + k.rect(60, -74, 26, 14, '#333', 'rx="2"') + k.rect(-90, -72, 30, 12, '#222', 'rx="3"') +
          k.text(40, 48, '400 FLASH', 14, '#5a1206', 'font-weight="800" letter-spacing="1"') + k.text(-98, -30, '27 exp.', 12, '#5a3c05', 'font-weight="700"') +
          (o.dust ? k.rect(-110, -60, 220, 120, '#6b5a40', `rx="10" opacity="${o.dust}"`) : ''),
          `transform="translate(${f(x)},${f(y)}) scale(${s}) rotate(${o.rot || 0})"`);
      },
      zenit(x, y, s) {
        return k.g(
          k.rect(-140, -55, 280, 110, '#151515', 'rx="12"') + k.rect(-140, -55, 280, 34, '#b9bcbf', 'rx="10"') + k.path('M-40,-55 L-22,-100 L22,-100 L40,-55 Z', '#b9bcbf') +
          k.rect(-30, -96, 60, 18, '#2a2a2a') + k.circle(0, 20, 64, '#0d0d0d') + k.circle(0, 20, 50, '#1e2328') + k.circle(0, 20, 30, '#2f4554') + k.circle(-12, 6, 10, '#fff', 'opacity=".25"') +
          k.circle(95, -62, 14, '#888') + k.circle(-100, -62, 16, '#888') + k.text(-12, -64, 'ZENIT-E', 13, '#222', 'text-anchor="middle" font-weight="800" letter-spacing="2"'),
          `transform="translate(${f(x)},${f(y)}) scale(${s})"`);
      },
      paper(x, y, w, h, rot, inner, o = {}) {
        return k.g(k.rect(4, 6, w, h, '#000', 'opacity=".35" ' + k.blur(6)) + k.rect(0, 0, w, h, o.fill || '#ece4d2') + k.grime(0, 0, w, h, { color: [0.45, 0.38, 0.25], op: 0.35, freq: 0.03 }) + inner,
          `transform="translate(${f(x)},${f(y)}) rotate(${rot})"`);
      },
      lockers(x, y, w, h, n, o = {}) {
        let s = '';
        const lw = w / n;
        for (let i = 0; i < n; i++) {
          const lx = x + i * lw;
          const num = (o.start || 1) + i;
          const col = o.colors ? o.colors[i % o.colors.length] : `hsl(${200 + r() * 20},${10 + r() * 10}%,${18 + r() * 8}%)`;
          if (o.open === num) {
            s += k.rect(lx, y, lw - 3, h, '#050607');
            s += k.path(`M${f(lx + lw - 3)},${f(y)} L${f(lx + lw + lw * 0.45)},${f(y + 16)} L${f(lx + lw + lw * 0.45)},${f(y + h - 10)} L${f(lx + lw - 3)},${f(y + h)} Z`, col);
            if (o.inside) s += o.inside(lx, y, lw, h);
          } else {
            s += k.rect(lx, y, lw - 3, h, col);
            for (let v = 0; v < 5; v++) s += k.rect(lx + lw * 0.25, y + 18 + v * 9, lw * 0.5, 4, '#000', 'opacity=".45"');
            s += k.rect(lx + lw - 16, y + h * 0.45, 6, 26, '#888', 'opacity=".5"');
          }
          s += k.rect(lx + lw * 0.3, y + h * 0.18, lw * 0.4, 20, '#d7d2c3', 'opacity=".75"') + k.text(lx + lw / 2 - 1.5, y + h * 0.18 + 15, String(num), 14, '#222', 'text-anchor="middle" font-weight="700"');
        }
        s += k.grime(x, y, w + 60, h, { op: 0.32, freq: 0.035 });
        return s;
      }
    };
    return k;
  }

  /* ---------- styl zdjęcia ---------- */
  const GRADES = {
    none: null,
    night: '0.78 0.1 0.12 0 0  0.04 0.82 0.14 0 0.005  0.04 0.12 0.98 0 0.03  0 0 0 1 0',
    cold: '0.9 0.05 0.05 0 0  0.03 0.92 0.06 0 0  0.03 0.06 1.02 0 0.02  0 0 0 1 0',
    warm: '1.08 0.04 0 0 0.01  0.03 0.98 0 0 0  0 0.02 0.86 0 0  0 0 0 1 0',
    film: '0.92 0.12 0.05 0 0.06  0.06 0.86 0.06 0 0.04  0.02 0.08 0.74 0 0.03  0 0 0 1 0',
    faded: '0.8 0.12 0.08 0 0.08  0.08 0.78 0.1 0 0.07  0.06 0.1 0.72 0 0.08  0 0 0 1 0',
    mono: '0.33 0.5 0.17 0 0  0.33 0.5 0.17 0 0  0.33 0.5 0.17 0 0  0 0 0 1 0',
    ir: '0.3 0.55 0.15 0 0.02  0.3 0.58 0.15 0 0.03  0.28 0.52 0.14 0 0.02  0 0 0 1 0',
    sepia: '0.39 0.77 0.19 0 0  0.35 0.69 0.17 0 0  0.27 0.53 0.13 0 0  0 0 0 1 0'
  };
  const STYLE = {
    photo: { grade: 'none', grain: 0.16, vig: 0.38, gf: 0.85 },
    night: { grade: 'night', grain: 0.26, vig: 0.55, gf: 0.8 },
    flash: { grade: 'cold', grain: 0.3, vig: 0.85, gf: 0.75, flash: true },
    ir: { grade: 'ir', grain: 0.36, vig: 0.75, gf: 0.7, ir: true },
    irday: { grade: 'none', grain: 0.2, vig: 0.4, gf: 0.8, ir: 'day' },
    film: { grade: 'film', grain: 0.38, vig: 0.5, gf: 0.62, leak: true, soft: 1 },
    print: { grade: 'faded', grain: 0.3, vig: 0.4, gf: 0.65 },
    news: { grade: 'mono', grain: 0.3, vig: 0.25, gf: 0.9 },
    screen: { grade: 'none', grain: 0, vig: 0 },
    clean: { grade: 'none', grain: 0.08, vig: 0.15, gf: 0.9 }
  };

  function finish(k, body, m) {
    const { W, H } = k;
    const st = Object.assign({}, STYLE[m.style || 'photo'], m.fx || {});
    const out = [];
    let gradeAttr = '';
    const gm = GRADES[m.grade || st.grade];
    if (gm || st.soft) {
      const id = k.id('gd');
      k.def(`<filter id="${id}" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">${st.soft ? `<feGaussianBlur stdDeviation="${st.soft}" result="s"/>` : ''}${gm ? `<feColorMatrix ${st.soft ? 'in="s"' : ''} values="${gm}"/>` : ''}</filter>`);
      gradeAttr = `filter="url(#${id})"`;
    }
    out.push(`<g ${gradeAttr}>${body}</g>`);
    if (st.ir === true) out.push(k.rect(0, 0, W, H, k.rad([[0, '#fff', 0.32], [0.45, '#fff', 0.08], [1, '#fff', 0]], 0.5, 0.62, 0.6), 'style="mix-blend-mode:screen"'));
    if (st.flash) out.push(k.rect(0, 0, W, H, k.rad([[0, '#fff', 1], [0.35, '#bbb', 1], [0.75, '#333', 1], [1, '#000', 1]], 0.5, 0.5, 0.65), 'style="mix-blend-mode:multiply"'));
    if (st.leak) {
      out.push(k.rect(0, 0, W * 0.4, H, k.lin([[0, '#ff7a1a', 0.55], [0.5, '#ff3d00', 0.18], [1, '#ff3d00', 0]], 0, 0, 1, 0), 'style="mix-blend-mode:screen"'));
      out.push(k.rect(W * 0.8, 0, W * 0.2, H, k.lin([[0, '#ffb000', 0], [1, '#ffb000', 0.25]], 0, 0, 1, 0), 'style="mix-blend-mode:screen"'));
    }
    if (st.grain) {
      const gid = k.id('gn');
      k.def(`<filter id="${gid}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="${st.gf || 0.8}" numOctaves="2" seed="${Math.floor(k.r() * 1000)}" stitchTiles="stitch"/><feColorMatrix values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 0 1"/></filter>`);
      out.push(`<rect width="${W}" height="${H}" filter="url(#${gid})" opacity="${st.grain}" style="mix-blend-mode:overlay"/>`);
    }
    if (st.vig) out.push(k.rect(0, 0, W, H, k.rad([[0, '#000', 0], [0.55, '#000', st.vig * 0.25], [1, '#000', st.vig]], 0.5, 0.5, 0.75)));
    if (m.stamp) out.push(stamp(k, m.stamp, st));
    if (m.over) out.push(m.over(k));
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><defs>${k.defs.join('')}</defs>${out.join('')}</svg>`;
  }

  // Nakładki: pasek fotopułapki albo pomarańczowa data z kompaktu.
  function stamp(k, s, st) {
    const { W, H } = k;
    if (s.kind === 'trap') {
      const bh = 40;
      const moon = s.moon || 'half';
      const mi = { full: '●', half: '◐', new: '○', wax: '◑' }[moon] || '◐';
      return k.rect(0, H - bh, W, bh, '#000', 'opacity=".88"') +
        k.mono(18, H - 13, 'BUSHVIEW', 19, '#fff', 'font-weight="700" letter-spacing="1"') +
        k.mono(170, H - 13, s.cam || 'CAM-01', 19, '#fff') +
        k.mono(W * 0.44, H - 13, `${mi}  ${s.temp != null ? s.temp : 4}°C ${Math.round((s.temp != null ? s.temp : 4) * 1.8 + 32)}°F`, 19, '#fff') +
        k.mono(W - 18, H - 13, `${s.date}  ${s.time}`, 19, '#fff', 'text-anchor="end"') +
        (s.id ? k.mono(W - 18, 30, s.id, 16, '#fff', 'text-anchor="end" opacity=".8"') : '');
    }
    if (s.kind === 'film') {
      return k.mono(W - 40, H - 36, s.text, 30, '#ff8a2a', `text-anchor="end" font-weight="700" letter-spacing="3" opacity=".9" ${k.blur(0.6)}`) +
        k.mono(W - 40, H - 36, s.text, 30, '#ffb35a', 'text-anchor="end" font-weight="700" letter-spacing="3" opacity=".6"');
    }
    return '';
  }

  function build(id) {
    const m = get(id);
    if (!m) return placeholder(id);
    const W = m.w || 1200, H = m.h || 900;
    const k = kit(W, H, U.rng('art:' + id));
    let body;
    try { body = m.draw(k, k.r, m.param); }
    catch (e) { console.error('Art', id, e); return placeholder(id); }
    return finish(k, body, m);
  }
  function placeholder(id) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300"><rect width="400" height="300" fill="#1a1d22"/><text x="200" y="155" fill="#556" font-size="16" text-anchor="middle" font-family="${FONT}">${esc(id)}</text></svg>`;
  }
  function url(id) {
    const source = get(id)?.src;
    if (source) return source;
    if (id === 'k_maja') return 'assets/maja-river.png';
    if (!cache[id]) cache[id] = URL.createObjectURL(new Blob([build(id)], { type: 'image/svg+xml' }));
    return cache[id];
  }

  /* ---------- awatary ---------- */
  const avReg = {};
  const avCache = {};
  function defAvatar(id, fn) { avReg[id] = fn; }
  function avatar(id) {
    if (!avCache[id]) {
      const fn = avReg[id] || avReg._default;
      const k = kit(200, 200, U.rng('av:' + id));
      const body = fn(k, id);
      avCache[id] = URL.createObjectURL(new Blob([`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><defs>${k.defs.join('')}</defs>${body}</svg>`], { type: 'image/svg+xml' }));
    }
    return avCache[id];
  }

  return { def, get, has, url, build, reg, defAvatar, avatar };
})();
