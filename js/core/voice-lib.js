'use strict';
/* Identyfikatory nagrań wspólne dla gry i tools/voices.
   Klucz to nadawca + tekst taki, jaki trafia do dymka (po wording, przed %name%).
   Płeć wchodzi do klucza tylko wtedy, gdy tekst albo głos od niej zależą. */

const VoiceLib = (() => {
  const PLAIN = new Set(['natan', 'bartek', 'zuza', 'szklarz']);
  const PLAIN_MAP = { ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z', Ą: 'A', Ć: 'C', Ę: 'E', Ł: 'L', Ń: 'N', Ó: 'O', Ś: 'S', Ź: 'Z', Ż: 'Z' };

  function parseVoice(text) {
    const m = /^voice:(\d+:\d\d)\|([^|]*)\|([\s\S]*)$/.exec(String(text || ''));
    if (!m) return null;
    return { dur: m[1], label: m[2], body: m[3] };
  }

  function asPosted(who, text) {
    const s = String(text || '');
    if (!PLAIN.has(who) || s.startsWith('voice:')) return s;
    return s.replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, c => PLAIN_MAP[c]);
  }

  function expand(text, gender) {
    const g = gender === 'f' ? 'f' : 'm';
    return String(text || '')
      .replace(/%name%/g, '')
      .replace(/\{([^{}|]*)\|([^{}]*)\}/g, (_, a, b) => (g === 'f' ? b : a));
  }

  function canon(text, gender) {
    let s = expand(text, gender);
    s = s.replace(/\[[^\]]*\]/g, ' ');
    s = s.replace(/\([^)]*\)/g, ' ');
    s = s.replace(/[*_`]/g, '');
    s = s.replace(/[„”«»"'“”]/g, '');
    s = s.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu, '');
    s = s.replace(/\s+/g, ' ').trim();
    return s;
  }

  function forTts(text, gender) {
    let s = canon(text, gender);
    s = s.replace(/\bxd+\b/gi, '');
    s = s.replace(/…/g, ', ');
    s = s.replace(/\s+,/g, ',');
    s = s.replace(/(,\s*)+/g, ', ');
    s = s.replace(/\s+/g, ' ').trim();
    return s.replace(/^[,.\s]+|[,.\s]+$/g, '');
  }

  function hash32(str) {
    let h1 = 1779033703 ^ str.length;
    for (let i = 0; i < str.length; i++) {
      h1 = Math.imul(h1 ^ str.charCodeAt(i), 3432918353);
      h1 = h1 << 13 | h1 >>> 19;
    }
    return (h1 ^ h1 >>> 16) >>> 0;
  }

  function keyed(who, text, gender, forceGender) {
    const g = gender === 'f' ? 'f' : 'm';
    const differs = canon(text, 'm') !== canon(text, 'f');
    const tag = (forceGender || differs) ? g : '';
    const key = String(who || '') + '\n' + tag + '\n' + canon(text, g);
    return hash32(key).toString(16).padStart(8, '0') + hash32('~' + key).toString(16).padStart(8, '0');
  }

  function clipId(who, text, gender, forceGender) {
    return keyed(who, text, gender, !!forceGender);
  }

  /* Najpierw wariant zależny od płci, potem nagranie wspólne. */
  function candidates(who, text, gender) {
    const forced = clipId(who, text, gender, true);
    const shared = clipId(who, text, gender, false);
    return forced === shared ? [shared] : [forced, shared];
  }

  function allowScare(id, flags) {
    if (id === 's1_odsluch') return !!(flags && flags.s1_odsluchHeard);
    return true;
  }

  return { parseVoice, asPosted, expand, canon, forTts, clipId, candidates, allowScare };
})();

if (typeof module !== 'undefined' && module.exports) module.exports = VoiceLib;
