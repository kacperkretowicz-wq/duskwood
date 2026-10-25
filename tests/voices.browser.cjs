// Odtwarzacz głosówki, napisy i dźwięk filmu po geście.
const assert = require('node:assert/strict');
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require(process.env.PLAYWRIGHT_MODULE || '/workspace/.onboarding-tools/node_modules/playwright')); }
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:5173';

(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}), args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(base + '/');
    await page.evaluate(() => {
      G.settings.speed = 'normal';
      G.settings.sfx = true;
      G.settings.volume = 0.8;
      G.settings.captions = true;
      G.newGame({ name: 'Ada', gender: 'f' });
      document.querySelector('.title-scr')?.remove();
      UI.renderHome();
      const v = document.createElement('video');
      v.className = 'mvid';
      v.src = 'assets/video/v_korytarz.mp4';
      v.muted = true;
      document.body.appendChild(v);
      Voices.attach(v);
    });
    assert.equal(await page.evaluate(() => document.querySelector('video.mvid').muted), true);
    await page.locator('#screen').click({ position: { x: 12, y: 12 } });
    await page.waitForFunction(() => document.querySelector('video.mvid') && document.querySelector('video.mvid').muted === false);
    await page.evaluate(() => document.querySelector('video.mvid').remove());

    await page.evaluate(() => UI.openApp('settings'));
    const napisy = page.getByRole('button', { name: 'Napisy' });
    await napisy.waitFor();
    assert.equal(await page.evaluate(() => document.documentElement.classList.contains('no-captions')), false);
    await napisy.click();
    assert.equal(await page.evaluate(() => document.documentElement.classList.contains('no-captions')), true);
    await napisy.click();
    assert.equal(await page.evaluate(() => G.settings.captions), true);

    const voice = 'voice:0:09||Szum pomieszczenia. Tyka zegar. Stuknięcie w szybę. Trzask szkła.';
    await page.evaluate(text => {
      G.post('szklarz', { from: 'szklarz', text });
      UI.openApp('messages', { chat: 'szklarz' });
    }, voice);
    const play = page.locator('.voice-play');
    await play.waitFor();
    assert.equal(await play.getAttribute('aria-pressed'), 'false');
    await page.locator('.voice-cc').click();
    assert.equal(await page.locator('.voice-tr').isVisible(), true);
    await play.click();
    await page.waitForFunction(() => Voices.playing(), null, { timeout: 8000 });
    assert.equal(await play.getAttribute('aria-pressed'), 'true');
    await play.click();
    assert.equal(await play.getAttribute('aria-pressed'), 'false');

    await page.evaluate(async () => {
      G.settings.sfx = true;
      G.settings.volume = 0.8;
      G.settings.speed = 'normal';
      await Voices.load();
      UI.phoneCall('604228961');
    });
    await page.locator('.call .c-cap .cl').waitFor({ timeout: 8000 });
    await page.waitForFunction(() => Voices.playing(), null, { timeout: 8000 });
    assert.deepEqual(errors, []);
    console.log('PASS voices player, captions, video unmute, voicemail');
  } finally {
    await browser.close();
  }
})().catch(e => { console.error(e); process.exit(1); });
