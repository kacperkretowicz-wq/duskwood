'use strict';
/* Awatary postaci: minimalistyczne popiersia 200×200. */

(() => {
  const A = Art.defAvatar;

  function bust(k, o) {
    const { f } = k;
    let s = k.rect(0, 0, 200, 200, k.lin([[0, o.bg[0]], [1, o.bg[1]]], 0, 0, 1, 1));
    s += k.circle(150, 40, 70, '#fff', 'opacity=".05"');
    const skin = o.skin || '#e8c0a0', hair = o.hair || '#2a1d16', cloth = o.cloth || '#333';
    const shade = 'rgba(0,0,0,.18)';
    // tył włosów
    if (o.hs === 'long') s += k.path('M58,92 Q52,150 46,200 L154,200 Q148,150 142,92 Q140,40 100,38 Q60,40 58,92 Z', hair);
    if (o.hs === 'bob') s += k.path('M56,96 Q54,140 64,152 L136,152 Q146,140 144,96 Q140,42 100,40 Q60,42 56,96 Z', hair);
    if (o.hs === 'bun') s += k.circle(100, 36, 20, hair);
    // ramiona i szyja
    s += k.path('M24,200 Q28,150 72,140 L128,140 Q172,150 176,200 Z', cloth);
    if (o.collar) s += k.path('M78,140 L100,170 L122,140 L112,138 L100,156 L88,138 Z', o.collar);
    if (o.hood) s += k.path('M60,146 Q100,182 140,146 L132,140 Q100,164 68,140 Z', o.hood);
    s += k.rect(86, 112, 28, 34, skin) + k.rect(86, 128, 28, 14, shade);
    // głowa
    s += k.ell(100, 86, 33, 40, skin);
    s += k.path('M70,92 Q74,124 100,127 Q126,124 130,92 Q128,118 100,121 Q72,118 70,92 Z', shade);
    if (o.beard) s += k.path('M70,90 Q72,128 100,130 Q128,128 130,90 Q126,112 112,114 L88,114 Q74,112 70,90 Z', o.beard);
    if (o.mustache) s += k.path('M86,106 Q100,99 114,106 Q100,103 86,106 Z', o.mustache) ;
    // włosy z przodu
    if (o.hs === 'short') s += k.path('M66,82 Q64,44 100,42 Q136,44 134,82 Q128,60 100,58 Q72,60 66,82 Z', hair);
    if (o.hs === 'messy') s += k.path('M64,86 Q60,40 98,40 Q140,38 136,84 Q132,62 118,58 L112,66 L104,56 L94,66 L86,56 Q70,64 64,86 Z', hair);
    if (o.hs === 'long' || o.hs === 'bob') s += k.path('M66,90 Q64,44 100,44 Q138,44 134,90 Q126,62 104,60 Q84,70 66,90 Z', hair);
    if (o.hs === 'bun') s += k.path('M67,84 Q66,48 100,46 Q134,48 133,84 Q126,62 100,60 Q74,62 67,84 Z', hair);
    if (o.hs === 'bald') s += k.path('M68,80 Q70,58 82,52 Q72,66 70,84 Z', hair) + k.path('M132,80 Q130,58 118,52 Q128,66 130,84 Z', hair);
    if (o.hs === 'gray') s += k.path('M67,80 Q66,48 100,46 Q134,48 133,80 Q128,64 100,63 Q72,64 67,80 Z', hair);
    if (o.beanie) s += k.path('M62,80 Q60,30 100,30 Q140,30 138,80 L138,86 Q100,74 62,86 Z', o.beanie) + k.rect(60, 70, 80, 14, 'rgba(0,0,0,.18)', 'rx="6"');
    if (o.glasses) s += k.circle(86, 88, 10, 'none', `stroke="${o.glasses}" stroke-width="3"`) + k.circle(114, 88, 10, 'none', `stroke="${o.glasses}" stroke-width="3"`) + k.line(96, 88, 104, 88, o.glasses, 3);
    if (o.headphones) s += k.path('M64,150 Q100,176 136,150', 'none', 'stroke="#111" stroke-width="7" stroke-linecap="round"') + k.rect(56, 140, 16, 20, '#111', 'rx="5"') + k.rect(128, 140, 16, 20, '#111', 'rx="5"');
    if (o.strap) s += k.path('M70,142 L120,200', 'none', `stroke="${o.strap}" stroke-width="7"`);
    if (o.epaulette) s += k.rect(40, 152, 30, 7, o.epaulette, 'rx="3" transform="rotate(14 55 155)"') + k.rect(130, 152, 30, 7, o.epaulette, 'rx="3" transform="rotate(-14 145 155)"');
    if (o.tie) s += k.path('M96,144 L104,144 L108,186 L100,196 L92,186 Z', o.tie);
    return s;
  }

  A('kuba', k => bust(k, { bg: ['#f2a65a', '#9a4f16'], skin: '#efc6a4', hair: '#5a3a22', hs: 'short', beanie: '#e8732c', cloth: '#5e6670', hood: '#4a5158' }));
  A('ola', k => bust(k, { bg: ['#55c9b8', '#1d6b62'], skin: '#f0c9ae', hair: '#1d1714', hs: 'long', cloth: '#0f4c48', collar: '#e6efe9' }));
  A('bartek', k => bust(k, { bg: ['#e58b62', '#7a3018'], skin: '#d9a982', hair: '#2b1d14', hs: 'short', beard: '#3a2618', cloth: '#3b3f2a', collar: '#2b2e1e' }));
  A('igor', k => bust(k, { bg: ['#ab9ef8', '#4b3d9c'], skin: '#eec7a8', hair: '#2a2220', hs: 'messy', glasses: '#141414', cloth: '#222533', headphones: true }));
  A('weronika', k => bust(k, { bg: ['#ddc072', '#7a6020'], skin: '#efcbb0', hair: '#6b4a32', hs: 'bun', glasses: '#5a3a1a', cloth: '#7a2e38', collar: '#efe3d0' }));
  A('gajda', k => bust(k, { bg: ['#86a7d6', '#2c4670'], skin: '#e0b391', hair: '#8f8f8f', hs: 'gray', cloth: '#1e2f4c', collar: '#a8bedc', epaulette: '#c9b66a' }));
  A('maja', k => bust(k, { bg: ['#f19ab0', '#8a2e4a'], skin: '#f2cdb5', hair: '#7a3a22', hs: 'bob', cloth: '#2a2a30', strap: '#111' }));
  A('mama', k => bust(k, { bg: ['#c9a0b4', '#5e3a4a'], skin: '#ecc5aa', hair: '#5a3a2a', hs: 'bob', cloth: '#5a4a60' }));
  A('leszek', k => bust(k, { bg: ['#9fb0c0', '#3a4654'], skin: '#e3b897', hair: '#5a4a3e', hs: 'bald', cloth: '#22252c', collar: '#f0f0f0', tie: '#8a1d2a' }));
  A('marek', k => bust(k, { bg: ['#b09a7a', '#4a3a28'], skin: '#d8a882', hair: '#4a3a2c', hs: 'gray', mustache: '#3a2a1c', cloth: '#4a5030', collar: '#383c22' }));
  A('rybicki', k => bust(k, { bg: ['#a0a0a0', '#3c3c3c'], skin: '#d6d0c8', hair: '#5a5a5a', hs: 'gray', glasses: '#111', cloth: '#3a3a3a', collar: '#cfcfcf' }));
  A('tomek', k => {
    let s = k.rect(0, 0, 200, 200, k.lin([[0, '#f5d76e'], [1, '#a07a12']], 0, 0, 1, 1));
    s += k.path('M30,200 Q36,140 100,132 Q164,140 170,200 Z', '#e3b52b');
    s += k.path('M56,120 Q50,40 100,38 Q150,40 144,120 Q140,150 100,152 Q60,150 56,120 Z', '#e9bf34');
    s += k.ell(100, 98, 30, 36, '#f0c9a6') + k.path('M70,82 Q74,60 100,58 Q126,60 130,82 Q120,72 100,72 Q80,72 70,82 Z', '#7a5230');
    return s;
  });
  A('szklarz', k => {
    let s = k.rect(0, 0, 200, 200, '#030506');
    const sil = 'M30,200 Q36,146 78,138 L84,118 Q66,104 66,82 Q66,44 100,42 Q134,44 134,82 Q134,104 116,118 L122,138 Q164,146 170,200 Z';
    s += k.path(sil, '#ff2050', 'opacity=".55" transform="translate(-5,1)"') + k.path(sil, '#20f0ff', 'opacity=".55" transform="translate(5,-1)"') + k.path(sil, '#0b0f12');
    for (let i = 0; i < 6; i++) s += k.rect(0, 30 + i * 28 + k.r() * 10, 200, 2 + k.r() * 3, '#9ff', `opacity="${(0.05 + k.r() * 0.12).toFixed(2)}"`);
    s += k.path('M100,60 L92,96 L108,112 L96,150 M92,96 L70,104 M108,112 L132,120 M96,150 L80,176 M96,150 L118,190', 'none', 'stroke="#cff" stroke-width="1.6" opacity=".7"');
    return s;
  });
  A('unknown', k => k.rect(0, 0, 200, 200, k.lin([[0, '#59626e'], [1, '#2a3038']], 0, 0, 1, 1)) + k.circle(100, 82, 32, '#b9c0c9') + k.path('M38,200 Q44,132 100,130 Q156,132 162,200 Z', '#b9c0c9'));
  A('group', k => {
    let s = k.rect(0, 0, 200, 200, k.lin([[0, '#2a2016'], [1, '#0d0a07']], 0, 0, 0, 1));
    s += k.glow(100, 78, 70, '#ffb347', 0.55) + k.rect(84, 92, 32, 76, '#efe4cf', 'rx="4"') + k.rect(84, 92, 32, 10, '#d8ccb4', 'rx="3"');
    s += k.path('M100,52 Q112,70 106,84 Q100,94 94,84 Q88,70 100,52 Z', '#ffcf66') + k.path('M100,64 Q106,74 103,82 Q100,87 97,82 Q94,74 100,64 Z', '#fff4c2') + k.line(100, 84, 100, 93, '#333', 2);
    return s;
  });
  A('dispatcher', k => k.rect(0, 0, 200, 200, k.lin([[0, '#e5484d'], [1, '#8a1d20']], 0, 0, 1, 1)) + k.text(100, 122, '112', 64, '#fff', 'text-anchor="middle" font-weight="800"'));
  A('duty', k => k.rect(0, 0, 200, 200, k.lin([[0, '#3a5f96'], [1, '#14284a']], 0, 0, 1, 1)) + k.path('M100,40 L150,60 Q150,130 100,160 Q50,130 50,60 Z', '#c9b66a') + k.path('M100,56 L136,70 Q136,122 100,144 Q64,122 64,70 Z', '#1e3a66') + k.text(100, 112, 'P', 46, '#c9b66a', 'text-anchor="middle" font-weight="800"'));
  A('prosecutor', k => k.rect(0, 0, 200, 200, k.lin([[0, '#7a2a2a'], [1, '#2e0e0e']], 0, 0, 1, 1)) + k.line(100, 50, 100, 150, '#e8d9a8', 6) + k.line(56, 70, 144, 70, '#e8d9a8', 6) + k.path('M56,70 L40,110 L72,110 Z M144,70 L128,110 L160,110 Z', 'none', 'stroke="#e8d9a8" stroke-width="4"') + k.rect(70, 146, 60, 10, '#e8d9a8'));
  A('nimbus', k => k.rect(0, 0, 200, 200, k.lin([[0, '#f49bb4'], [1, '#b8355c']], 0, 0, 1, 1)) + k.path('M62,136 L140,136 A28,28 0 0 0 144,80 A42,42 0 0 0 64,90 A24,24 0 0 0 62,136 Z', '#fff'));
  A('bushview', k => k.rect(0, 0, 200, 200, k.lin([[0, '#94a550'], [1, '#3d4a1b']], 0, 0, 1, 1)) + k.rect(64, 40, 72, 120, '#fff', 'rx="16"') + k.circle(100, 86, 20, '#4d5a2a') + k.circle(100, 86, 8, '#c6d38a'));
  A('gmina', k => k.rect(0, 0, 200, 200, k.lin([[0, '#2a5fa0'], [1, '#0f2a52']], 0, 0, 1, 1)) + k.path('M100,40 L146,62 L146,112 Q146,146 100,166 Q54,146 54,112 L54,62 Z', '#c8102e') + k.text(100, 118, 'M', 52, '#fff', 'text-anchor="middle" font-weight="800"'));
  A('_default', k => k.rect(0, 0, 200, 200, '#3a4048') + k.circle(100, 82, 30, '#8a929c') + k.path('M40,200 Q46,134 100,132 Q154,134 160,200 Z', '#8a929c'));
})();
