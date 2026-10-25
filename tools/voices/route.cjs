'use strict';
/* Którym głosem czytać linię. Podmiana lepszego TTS: zmienić model w cast.json
   albo wstawić gotowy mp3 pod tę samą ścieżkę w manifeście. */
const VoiceLib = require('../../js/core/voice-lib.js');

function bedsOf(body) {
  const s = String(body || '').toLowerCase();
  if (/idealnie czysto/.test(s)) return [];
  const beds = [];
  if (/wiatr/.test(s)) beds.push('wind');
  if (/autobus/.test(s)) beds.push('bus');
  if (/telewizor/.test(s)) beds.push('tv');
  if (/dzieci/.test(s)) beds.push('crowd');
  if (/dzwonek/.test(s)) beds.push('bell');
  if (/chrap/.test(s)) beds.push('snore');
  if (/pies/.test(s)) beds.push('dog');
  if (/drzwi|kroki|klatce/.test(s)) beds.push('door');
  if (/kierunkowskaz/.test(s)) beds.push('tick');
  return beds;
}

function fxOf(body, fallback) {
  const s = String(body || '').toLowerCase();
  if (/idealnie czysto/.test(s)) return 'clone';
  if (/szeptem/.test(s)) return 'whisper';
  if (/\(cicho\)|\(ciszej\)/.test(s)) return 'whisper';
  return fallback;
}

function route(who, raw) {
  const parsed = VoiceLib.parseVoice(raw);
  const label = parsed ? parsed.label : '';
  const body = parsed ? parsed.body : String(raw || '');
  const kind = parsed ? 'voice' : 'call';
  const lab = label.toLowerCase();
  const base = { who, text: body, label, kind, voice: who || 'unknown', fx: 'phone', gendered: false, sfx: null, segments: null, beds: bedsOf(body), scare: null, hit: null, gain: 1 };

  if (who === 'szklarz' && /szum pomieszczenia|tyka zegar|trzask szkła/i.test(body)) {
    return Object.assign(base, { voice: 'szklarz', sfx: 'odsluch', beds: [], scare: 's1_odsluch', hit: 7.05 });
  }
  if (/nikt nic nie mówi/.test(body) || (who === 'cicho' && !VoiceLib.forTts(body, 'm'))) {
    return Object.assign(base, { voice: 'cicho', sfx: 'breath-tick', beds: [] });
  }
  if (/od mai/.test(lab)) {
    return Object.assign(base, { voice: 'maja', fx: /idealnie czysto/.test(body) ? 'clone' : 'phone' });
  }
  if (/echo/.test(lab)) return Object.assign(base, { voice: 'igor', fx: 'clone', beds: [] });
  if (/Wera, to ja|Wera, czemu nie odbierasz/.test(body)) {
    return Object.assign(base, { voice: 'tomek', fx: 'phone-far' });
  }
  if (who === 'oskar' && /próbka/.test(lab)) {
    return Object.assign(base, { voice: 'player', fx: 'room', gendered: true });
  }
  if (/^No, Maja\. Przyjdź pod hutę/.test(body.trim())) {
    return Object.assign(base, { voice: 'player', fx: 'clone', gendered: true, beds: [] });
  }
  if (/głos Henryka|przez głośnik kamery/.test(body) || /odsłuch kasety/.test(lab)) {
    return Object.assign(base, { voice: 'henryk', fx: 'speaker', beds: ['tape'] });
  }
  if (who === 'archiwum' || /głos z nagrania/.test(lab)) {
    return Object.assign(base, { voice: 'rybicki', fx: 'tape', beds: ['tape'] });
  }
  if (/wszyscy mówili, że od pioruna/.test(body)) {
    return Object.assign(base, {
      voice: 'lena', fx: 'tape', beds: ['wind'],
      segments: [
        { voice: 'lena', text: 'Wszyscy mówili, że od pioruna. A ja widziałam, kto stał przy stodole Pawlaków. Miałam siedem lat, ale widziałam.' },
        { voice: 'rybicki', text: 'Nikomu tego nie mówiłaś?' },
        { voice: 'lena', text: 'Panu mówię.' }
      ]
    });
  }
  if (/^maja\b/i.test(label)) return Object.assign(base, { voice: 'maja', fx: fxOf(body, 'phone') });
  if (!VoiceLib.forTts(body, 'm') && !base.segments) {
    return Object.assign(base, { voice: who || 'operator', sfx: 'hiss', beds: [] });
  }
  return Object.assign(base, { fx: fxOf(body, 'phone'), gain: /\(cicho\)|\(ciszej\)|szeptem/.test(body) ? 0.72 : 1 });
}

module.exports = { route, bedsOf };
