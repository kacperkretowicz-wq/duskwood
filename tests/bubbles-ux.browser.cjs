// Skoki układu czatu (Chrome 390×844) i gest ekranu blokady.
// Przed v155: dymek zdjęcia 16→247 px, po załadowaniu ~855 px od dołu;
// pole odpowiedzi +94 px i scroll cofał się; „pisze…” i „Wysłano” budowane od nowa;
// blokada nie podążała za palcem (transform: none).
const assert = require('node:assert/strict');
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require(process.env.PLAYWRIGHT_MODULE || '/workspace/.onboarding-tools/node_modules/playwright')); }
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:5173';

const gapOf = () => {
  const body = document.querySelector('.chat-body');
  return body.scrollHeight - body.scrollTop - body.clientHeight;
};
const frames = n => new Promise(resolve => {
  const step = k => k ? requestAnimationFrame(() => step(k - 1)) : resolve();
  step(n);
});

(async () => {
  const browser = await chromium.launch({
    ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });
  const report = {};
  try {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    let releasePhoto;
    await page.route('**/assets/kuba/k_skate.jpg', async route => {
      await new Promise(r => { releasePhoto = r; });
      await route.continue();
    });
    await page.addInitScript(() => localStorage.setItem('mglisko.settings.v1', JSON.stringify({
      os: 'ios', appearance: 'light', speed: 'instant', sfx: false, ambient: false, vibrate: false
    })));
    await page.goto(base + '/?debug');
    const homeBefore = await page.evaluate(() => {
      G.newGame({ name: 'Alex', gender: 'f' });
      G.settings.sfx = false; G.settings.ambient = false; G.settings.vibrate = false;
      document.querySelector('.title-scr')?.remove();
      UI.renderHome();
      const home = document.querySelector('#home');
      const cs = getComputedStyle(home);
      const ic = document.querySelector('.app-ic');
      return {
        bg: cs.backgroundColor, image: cs.backgroundImage, pad: cs.paddingTop, font: cs.fontFamily,
        cls: home.className, icon: ic ? getComputedStyle(ic).width : '', text: getComputedStyle(document.body).fontSize
      };
    });

    await page.evaluate(() => UI.lock());
    const box = await page.locator('#lock').boundingBox();
    const x = box.x + box.width / 2;
    const y0 = box.y + Math.round(box.height * 0.7);
    await page.mouse.move(x, y0);
    await page.mouse.down();
    await page.mouse.move(x, y0 - 48);
    const partial = await page.evaluate(() => {
      const el = document.querySelector('#lock');
      const m = getComputedStyle(el).transform.match(/matrix\(([^)]+)\)/);
      return { y: m ? +m[1].split(',')[5] : 0, locked: UI.locked };
    });
    assert.ok(partial.locked, 'krótsze pociągnięcie nie odblokowuje');
    assert.ok(Math.abs(partial.y + 48) <= 8, 'ekran blokady podąża za palcem, ty=' + partial.y);
    await page.mouse.up();
    await page.waitForTimeout(450);
    const snapped = await page.evaluate(() => {
      const el = document.querySelector('#lock');
      const m = el && getComputedStyle(el).transform.match(/matrix\(([^)]+)\)/);
      return { locked: UI.locked, y: m ? +m[1].split(',')[5] : 0 };
    });
    assert.equal(snapped.locked, true);
    assert.ok(Math.abs(snapped.y) <= 2, 'po puszczeniu wraca na miejsce, ty=' + snapped.y);

    await page.mouse.move(x, y0);
    await page.mouse.down();
    await page.mouse.move(x, y0 - 120, { steps: 4 });
    const followed = await page.evaluate(() => {
      const m = getComputedStyle(document.querySelector('#lock')).transform.match(/matrix\(([^)]+)\)/);
      return m ? +m[1].split(',')[5] : 0;
    });
    assert.ok(followed <= -60, 'dłuższe pociągnięcie przesuwa blokadę, ty=' + followed);
    await page.mouse.up();
    await page.waitForTimeout(700);
    const homeAfter = await page.evaluate(() => {
      const home = document.querySelector('#home');
      const cs = getComputedStyle(home);
      const ic = document.querySelector('.app-ic');
      return {
        locked: UI.locked, lock: !!document.querySelector('#lock'),
        bg: cs.backgroundColor, image: cs.backgroundImage, pad: cs.paddingTop, font: cs.fontFamily,
        cls: home.className, icon: ic ? getComputedStyle(ic).width : '', text: getComputedStyle(document.body).fontSize
      };
    });
    assert.equal(homeAfter.locked, false);
    assert.equal(homeAfter.lock, false);
    assert.equal(homeAfter.bg, homeBefore.bg);
    assert.equal(homeAfter.image, homeBefore.image);
    assert.equal(homeAfter.pad, homeBefore.pad);
    assert.equal(homeAfter.font, homeBefore.font);
    assert.equal(homeAfter.cls, homeBefore.cls);
    assert.equal(homeAfter.icon, homeBefore.icon);
    assert.equal(homeAfter.text, homeBefore.text);
    report.lock = { partialY: partial.y, followed, homeUnchanged: true };

    await page.evaluate(() => {
      G.unlock('chat:ola'); G.unlock('chat:group');
      UI.openApp('gadka', { chat: 'ola' });
      for (let i = 0; i < 14; i++) G.post('ola', { from: i % 2 ? 'me' : 'ola', text: 'linia ' + i + ' — dość długa, żeby czat miał co przewijać i mierzyć dół.' });
      const body = document.querySelector('.chat-body');
      const orig = body.scrollTo.bind(body);
      window.__smooth = 0;
      body.scrollTo = function (a, b) { if (a && a.behavior === 'smooth') window.__smooth++; return orig(a, b); };
      window.__back = 0; window.__lastTop = body.scrollTop;
      body.addEventListener('scroll', () => {
        const t = body.scrollTop;
        if (t < window.__lastTop - 0.5) window.__back = Math.max(window.__back, window.__lastTop - t);
        window.__lastTop = t;
      });
    });
    await page.evaluate(frames, 2);

    const beforePhoto = await page.evaluate(() => {
      const body = document.querySelector('.chat-body');
      window.__back = 0; window.__lastTop = body.scrollTop;
      G.post('ola', { from: 'ola', img: 'k_skate', text: '' });
      const im = document.querySelector('.mimg');
      const bub = im.closest('.bub');
      return {
        bub: bub.offsetHeight,
        img: im.offsetHeight,
        ratio: getComputedStyle(im).aspectRatio,
        gap: (body.scrollHeight - body.scrollTop - body.clientHeight)
      };
    });
    await page.evaluate(frames, 3);
    const reserved = await page.evaluate(() => {
      const body = document.querySelector('.chat-body');
      const im = document.querySelector('.mimg');
      return {
        bub: im.closest('.bub').offsetHeight,
        img: im.offsetHeight,
        gap: body.scrollHeight - body.scrollTop - body.clientHeight,
        complete: im.complete
      };
    });
    assert.equal(reserved.complete, false, 'zdjęcie jeszcze wstrzymane');
    assert.ok(reserved.img >= 200, 'wysokość zdjęcia zarezerwowana przed załadowaniem, img=' + reserved.img);
    assert.ok(reserved.gap <= 2, 'po wstawieniu zdjęcia jesteśmy przy dole, gap=' + reserved.gap);
    releasePhoto();
    await page.waitForFunction(() => document.querySelector('.mimg')?.complete && document.querySelector('.mimg').naturalWidth > 0);
    await page.evaluate(frames, 3);
    const loaded = await page.evaluate(() => {
      const body = document.querySelector('.chat-body');
      const im = document.querySelector('.mimg');
      return {
        bub: im.closest('.bub').offsetHeight,
        img: im.offsetHeight,
        gap: body.scrollHeight - body.scrollTop - body.clientHeight
      };
    });
    assert.ok(Math.abs(loaded.bub - reserved.bub) <= 2, 'dymek nie rośnie po załadowaniu ' + reserved.bub + '→' + loaded.bub);
    assert.ok(Math.abs(loaded.img - reserved.img) <= 2, 'obraz nie zmienia wysokości ' + reserved.img + '→' + loaded.img);
    assert.ok(loaded.gap <= 2, 'po załadowaniu zdjęcia nadal przy dole, gap=' + loaded.gap);

    const next = await page.evaluate(() => {
      G.post('ola', { from: 'ola', text: 'kolejna wiadomość ma zostać na dole ekranu' });
      const body = document.querySelector('.chat-body');
      return body.scrollHeight - body.scrollTop - body.clientHeight;
    });
    await page.evaluate(frames, 3);
    const nextGap = await page.evaluate(() => {
      const body = document.querySelector('.chat-body');
      return body.scrollHeight - body.scrollTop - body.clientHeight;
    });
    assert.ok(nextGap <= 2, 'nowa wiadomość po zdjęciu nie ląduje poza ekranem, gap=' + nextGap);

    const composer = await page.evaluate(() => {
      const body = document.querySelector('.chat-body');
      const comp = document.querySelector('.composer');
      window.__back = 0; window.__lastTop = body.scrollTop;
      const h0 = comp.getBoundingClientRect().height;
      G.s.pending = { type: 'choose', chat: 'ola', options: [{ i: 0, text: 'Jasne, napisz jak dojdziesz.' }, { i: 1, text: 'Nie dziś.' }] };
      BUS.emit('pending');
      const h1 = comp.getBoundingClientRect().height;
      return { h0, h1, delta: h1 - h0, gap: body.scrollHeight - body.scrollTop - body.clientHeight };
    });
    await page.waitForTimeout(400);
    const composerSettled = await page.evaluate(() => {
      const body = document.querySelector('.chat-body');
      const comp = document.querySelector('.composer');
      return {
        h: comp.getBoundingClientRect().height,
        gap: body.scrollHeight - body.scrollTop - body.clientHeight,
        back: window.__back,
        smooth: window.__smooth
      };
    });
    assert.ok(composer.delta > 60, 'opcje nadal zajmują miejsce, delta=' + composer.delta);
    assert.ok(Math.abs(composerSettled.h - composer.h1) <= 2, 'wysokość pola odpowiedzi nie skacze po pojawieniu się');
    assert.ok(composerSettled.gap <= 2, 'po otwarciu odpowiedzi scroll nie zostaje w tyle, gap=' + composerSettled.gap);
    assert.ok(composerSettled.back <= 2, 'scroll nie cofa się, back=' + composerSettled.back);

    const receipts = await page.evaluate(() => {
      G.s.pending = null; BUS.emit('pending');
      UI.openApp('gadka', { chat: 'group' });
      const body = document.querySelector('.chat-body');
      for (let i = 0; i < 8; i++) G.post('group', { from: 'ola', text: 'wątek ' + i });
      G.post('group', { from: 'me', text: 'pierwsza ode mnie' });
      const d = document.querySelector('.delivery');
      const h0 = d.offsetHeight;
      G.post('group', { from: 'me', text: 'druga, potwierdzenie ma zostać tym samym elementem' });
      const d2 = document.querySelector('.delivery');
      const h1 = d2.offsetHeight;
      const same = d === d2;
      const count = document.querySelectorAll('.delivery').length;
      G.chat('group').msgs.at(-1).t = G.now() - 5000;
      BUS.emit('typing', { chat: 'group', on: false });
      const h2 = d2.offsetHeight;
      const seen = d2.classList.contains('seen');
      G.post('group', { from: 'kuba', text: 'już widziałem' });
      return {
        same, count, seen, h0, h1, h2, nAfter: document.querySelectorAll('.delivery').length,
        gap: body.scrollHeight - body.scrollTop - body.clientHeight
      };
    });
    await page.evaluate(frames, 3);
    const receiptGap = await page.evaluate(() => {
      const body = document.querySelector('.chat-body');
      return body.scrollHeight - body.scrollTop - body.clientHeight;
    });
    assert.equal(receipts.same, true, 'potwierdzenie jest aktualizowane w miejscu');
    assert.equal(receipts.count, 1);
    assert.equal(receipts.seen, true);
    assert.ok(Math.abs(receipts.h0 - receipts.h1) <= 1 && Math.abs(receipts.h1 - receipts.h2) <= 1, 'linia potwierdzenia ma stałą wysokość ' + [receipts.h0, receipts.h1, receipts.h2].join('→'));
    assert.equal(receipts.nAfter, 0, 'po cudzej wiadomości znika jeden element, bez zostawiania kopii');
    assert.ok(receiptGap <= 2, 'po zmianie potwierdzeń nadal przy dole, gap=' + receiptGap);

    const typing = await page.evaluate(() => {
      UI.openApp('gadka', { chat: 'ola' });
      const orig = Engine.typing;
      let who = null;
      Engine.typing = chat => chat === 'ola' ? who : orig(chat);
      const ids = new Set();
      let dots = null;
      const pulse = on => {
        who = on ? 'ola' : null;
        BUS.emit('typing', { chat: 'ola', who: 'ola', on });
        const el = document.querySelector('.msg.typing');
        if (on) {
          if (!el.dataset.uid) el.dataset.uid = String(ids.size + 1);
          ids.add(el.dataset.uid);
          const bub = el.querySelector('.bub');
          if (!dots) dots = bub;
          return bub === dots && el.querySelectorAll('.bub i').length === 3;
        }
        return !el;
      };
      let stable = true;
      for (let i = 0; i < 18; i++) {
        if (!pulse(true) || !pulse(false)) stable = false;
      }
      pulse(true);
      const el = document.querySelector('.msg.typing');
      const before = el;
      BUS.emit('phone-tools');
      const after = document.querySelector('.msg.typing');
      if (after && !after.dataset.uid) after.dataset.uid = 'x';
      ids.add(after && after.dataset.uid);
      const kept = before === after && after.querySelector('.bub') === dots;
      who = null; pulse(false);
      Engine.typing = orig;
      return { distinct: ids.size, stable, kept, visible: document.querySelectorAll('.msg.typing').length, smooth: window.__smooth, back: window.__back };
    });
    assert.equal(typing.distinct, 1, '18 przełączeń „pisze…” używa jednego elementu');
    assert.equal(typing.stable, true);
    assert.equal(typing.kept, true, 'przerysowanie czatu nie buduje dymka pisania od nowa');
    assert.equal(typing.visible, 0);
    assert.equal(typing.smooth, 0, 'brak smooth-scroll');
    assert.ok(errors.length === 0, errors.join('\n'));

    report.photo = {
      before: Math.round(beforePhoto.bub),
      reserved: Math.round(reserved.bub),
      loaded: Math.round(loaded.bub),
      grow: Math.round((loaded.bub - reserved.bub) * 10) / 10,
      gap: Math.round(loaded.gap * 10) / 10,
      nextGap: Math.round(nextGap * 10) / 10
    };
    report.composer = {
      delta: Math.round(composer.delta),
      gap: Math.round(composerSettled.gap * 10) / 10,
      back: Math.round(composerSettled.back * 10) / 10
    };
    report.receipts = { h: [receipts.h0, receipts.h1, receipts.h2].map(n => Math.round(n)), gap: Math.round(receiptGap * 10) / 10 };
    report.typing = { distinct: typing.distinct, smooth: typing.smooth, back: Math.round(typing.back * 10) / 10 };
    console.log('METRYKI ' + JSON.stringify(report));
    console.log('PASS bubbles-ux: zdjęcie, scroll, pisze…, potwierdzenia, blokada');
    await ctx.close();
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exit(1); });
