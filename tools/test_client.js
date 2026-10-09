/* Game data tests: run `node tools/test_client.js` (needs Playwright + Chromium; CI installs them).
 * Opens index.html in a headless browser with a fake server and checks what the game sends and shows. */
const path = require('path'), { execSync } = require('child_process');
let pw;
try { pw = require('playwright'); } catch (e) { try { pw = require(path.join(execSync('npm root -g').toString().trim(), 'playwright')); } catch (e2) { console.log('SKIP: Playwright is not installed'); process.exit(0); } }
const FILE = 'file://' + path.join(__dirname, '..', 'index.html');
let pass = 0, fail = 0;
function ok(c, m) { if (c) pass++; else { fail++; console.log('  FAIL: ' + m); } }

(async () => {
  let browser;
  try { browser = await pw.chromium.launch(); } catch (e) { browser = await pw.chromium.launch({ executablePath: process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' }); }
  async function open(server) {
    const pg = await browser.newPage({ viewport: { width: 430, height: 900 } }), errs = [], sent = [];
    pg.on('pageerror', e => errs.push(e.message));
    await pg.route('**/*', r => {
      if (r.request().method() !== 'POST') return r.continue();
      let b = {}; try { b = JSON.parse(r.request().postData()); } catch (e) { }
      sent.push(b);
      const res = (server && server(b)) || { ok: true, sv: 5 };
      return r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(res) });
    });
    await pg.goto(FILE); await pg.waitForTimeout(1200);
    return { pg, errs, sent };
  }
  const signIn = (pg, teacher) => pg.evaluate(t => { const g = window.__game; g.S.started = true; g.AUTH.mode = 'google'; g.AUTH.user = { email: 'a@s', zh: '你', en: 'A', guest: false, cls: '1A', teacher: t }; g.AUTH.token = 'x'; g.AUTH.exp = Date.now() + 1e8; g.render(); }, !!teacher);
  console.log('Game data tests');

  { // 1. what the game sends on save
    const { pg, errs, sent } = await open();
    await signIn(pg);
    const loc = await pg.evaluate(async () => {
      const g = window.__game, S = g.S;
      S.pets.mochi.xp = 500; S.xpTotal = 120;                     // an old save whose total started late
      S.streak = 6; S.shields = 2; S.lastDay = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
      g.leg.gain(10, 20);                                         // real reward path
      const after = { xp: S.xpTotal, pet: S.pets.mochi.xp };
      g.dev.cloudSave(); await new Promise(r => setTimeout(r, 500));
      return after;
    });
    const s = sent.filter(b => b.action === 'save').pop();
    ok(!!s, 'the game sends a save');
    const sum = s && s.summary || {};
    ok(isFinite(loc.xp) && loc.xp > 120 && isFinite(loc.pet) && loc.pet > 500, 'a reward raises XP and stays a real number');
    ok(sum.xp >= loc.pet, 'saved XP is never below the pal XP (' + sum.xp + ' >= ' + loc.pet + ')');
    ['xp', 'col', 'leg', 'myth', 'streak', 'best', 'level'].forEach(k => ok(typeof sum[k] === 'number' && isFinite(sum[k]), 'summary.' + k + ' is a number'));
    ok(/^\d{4}-\d\d-\d\d$/.test(sum.lastDay || ''), 'summary.lastDay is a date');
    ok(sum.alive >= sum.lastDay, 'streak alive day counts the Streak Freezes left (' + sum.alive + ')');
    ok(Array.isArray(sum.frz), 'freeze days are sent');
    ok(errs.length === 0, 'no page errors: ' + errs.join(' | '));
    await pg.close();
  }
  { // 2. heavy players stay under the 50,000-character cell limit, and nothing is lost on the way back
    const { pg, sent } = await open();
    await signIn(pg);
    const before = await pg.evaluate(async () => {
      const g = window.__game, S = g.S;
      for (let u = 1; u <= 6; u++) for (let s = 1; s <= 9; s++) for (let q = 0; q < 50; q++) S.q[u + '.' + s + '#' + q] = q % 7 ? 1 : 0;
      for (let u = 1; u <= 6; u++) for (let s = 1; s <= 9; s++) S.seen[u + '.' + s] = Array.from({ length: 30 }, (_, i) => i);
      for (let i = 0; i < 400; i++) S.owned['item_' + i] = 1;
      for (let i = 0; i < 40; i++) S.pets['pal' + i] = { xp: 100 + i, stage: 2, energy: 80, happy: 80, eq: { hat: null, glasses: null, acc: null, hand: null } };
      const q = JSON.stringify(Object.entries(S.q).sort()), len = JSON.stringify(S).length;
      g.dev.cloudSave(); await new Promise(r => setTimeout(r, 500)); return { q, len };
    });
    const s = sent.filter(b => b.action === 'save').pop();
    ok(s && s.state.length < 49000, 'heavy save fits the cell (' + before.len + ' -> ' + (s && s.state.length) + ' chars)');
    const back = await pg.evaluate(st => JSON.stringify(Object.entries(window.__game.dev.upgrade(JSON.parse(st)).q).sort()), s.state);
    ok(back === before.q, 'every question result comes back exactly');
    await pg.close();
  }
  { // 3. the class board shows the student's own live numbers and re-ranks
    const row = (n, v, me) => ({ n, c: '1A', p: 'mochi', lv: 3, v, me: !!me });
    const boardRes = { ok: true, sv: 5, scope: 'class', cats: { xp: { top: [row('甲', 900), row('乙', 600), row('你', 100, 1)], me: { rank: 3, v: 100 } }, streak: { top: [row('甲', 9), row('你', 2, 1)], me: { rank: 2, v: 2 } }, col: { top: [row('甲', 30), row('你', 5, 1)], me: { rank: 2, v: 5 } } } };
    const { pg } = await open(b => b.action === 'board' ? boardRes : null);
    await pg.evaluate(() => { const S = window.__game.S; S.xpTotal = 700; S.streak = 6; S.lastDay = new Date().toISOString().slice(0, 10); });
    await signIn(pg); await pg.waitForTimeout(800);
    const t = await pg.evaluate(() => { const el = document.getElementById('lbBox'); return el ? el.textContent : ''; });
    ok(t.indexOf('700 XP') >= 0, 'own XP on the board is the live value');
    ok(t.indexOf('700') < t.indexOf('600 XP'), 'the board re-ranks with the live value');
    await pg.close();
  }
  { // 4. teachers are warned when the deployed server is older than the game needs
    const statsRes = sv => ({ ok: true, sv, students: [], records: [], progress: {}, seen: {} });
    for (const sv of [3, 5]) {
      const { pg } = await open(b => b.action === 'stats' ? statsRes(sv) : { ok: true, sv });
      await signIn(pg, true);
      await pg.evaluate(() => document.querySelector('[data-nav=teacher]').click()); await pg.waitForTimeout(800);
      const warned = await pg.evaluate(() => !!document.getElementById('srvWarn'));
      ok(warned === (sv < 5), sv < 5 ? 'old server (v' + sv + ') shows a warning' : 'current server shows no warning');
      await pg.close();
    }
  }
  { // 5. tier badges line up
    const { pg } = await open();
    await pg.evaluate(() => { const g = window.__game; g.S.started = true; g.AUTH.mode = 'guest'; g.AUTH.user = { email: 'g@s', guest: true }; g.render(); });
    await pg.evaluate(() => document.querySelector('[data-nav=shop]').click()); await pg.waitForTimeout(400);
    await pg.evaluate(() => document.querySelector('[data-shop=wear]').click()); await pg.waitForTimeout(600);
    const tops = await pg.evaluate(() => [...document.querySelectorAll('.tlegend .tier')].map(e => Math.round(e.getBoundingClientRect().top)));
    ok(tops.length >= 6 && new Set(tops).size === 1, 'all tier badges sit on one line (' + tops.join(',') + ')');
    await pg.close();
  }
  await browser.close();
  console.log((fail ? 'FAILED ' : 'OK ') + pass + ' passed, ' + fail + ' failed');
  process.exit(fail ? 1 : 0);
})().catch(e => { console.log('ERROR', e.message); process.exit(1); });
