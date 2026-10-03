/**
 * Mochi Science Island 麻糬科學島 – co-op squads (part of the class server)
 * ----------------------------------------------------------------------------
 * Add this as a SECOND script file called "Coop" in the same Apps Script project
 * as Code.gs, then deploy a new version of the web app.
 *
 * - Students on the Users list make squads of 2–4 (any class) with a 6-letter invite code.
 * - Correct quiz answers become building materials (soft cap: 30 a day at full rate,
 *   then slower materials + bonus coins).
 * - Squad days (every member studied) build the island; missed days bring the Fog.
 * - Daily Blueprint puzzle (one part per member, teammates can rescue), repair quizzes,
 *   a weekly Murk Raid and three end-of-term Wonders.
 * Data lives in the tab "合作小隊 Coop Squads" (one row per squad, JSON in the last column).
 * Script property COOP_PAUSE = 1 pauses the Fog (holidays / exams); teachers can toggle it in the game.
 */
var COOP_SQ = '合作小隊 Coop Squads';
var COOP_HEAD = ['小隊編號 Squad ID', '小隊名稱 Squad name', '邀請碼 Invite code', '成員 Members', '更新時間 Updated', '資料 Data (do not edit)'];
var COOP_TZ = 'Asia/Hong_Kong';
var COOP_CAP = 30, COOP_SOFT = 45, COOP_COINS = 100, COOP_MAXN = 4, COOP_REPAIRS = 3;
var COOP_B = { safety: 1, water: 2, green: 3, cell: 4, power: 5, part: 6 };
var COOP_ROLES = { chem: [2, 6], bio: [3, 4], phys: [5, 1], eng: [] };
var COOP_DECO = { lamp: 3, flag: 2, bench: 2, tree: 3, statue: 5, fountain: 6 };
var COOP_STARS = [7, 14, 30, 60];

function cDay(t) { return Utilities.formatDate(t || new Date(), COOP_TZ, 'yyyy-MM-dd'); }
function cAdd(d, n) { var p = d.split('-'); return Utilities.formatDate(new Date(Date.UTC(+p[0], +p[1] - 1, +p[2] + n, 12)), 'UTC', 'yyyy-MM-dd'); }
function cDow(d) { var p = d.split('-'); return new Date(Date.UTC(+p[0], +p[1] - 1, +p[2], 12)).getUTCDay(); }
function cDiff(a, b) { var p = a.split('-'), q = b.split('-'); return Math.round((Date.UTC(+q[0], +q[1] - 1, +q[2]) - Date.UTC(+p[0], +p[1] - 1, +p[2])) / 864e5); }

/* ---------- storage ---------- */
function coopData() {
  var sh = sheet(COOP_SQ, COOP_HEAD), last = sh.getLastRow(), rows = [];
  if (last > 1) sh.getRange(2, 1, last - 1, COOP_HEAD.length).getValues().forEach(function (v, i) {
    if (!v[0]) return;
    var st; try { st = JSON.parse(v[5]); } catch (e) { return; }
    rows.push({ r: i + 2, id: String(v[0]), name: String(v[1]), code: String(v[2]), st: st });
  });
  return { sh: sh, rows: rows };
}
function coopFind(D, email) { for (var i = 0; i < D.rows.length; i++) if (D.rows[i].st.m[email]) return D.rows[i]; return null; }
function coopWrite(D, row) {
  var mem = Object.keys(row.st.m).map(function (e) { var u = findUser(e); return u ? fullName(u.zh, u.en) : e; }).join('、');
  var vals = [[row.id, row.name, row.code, mem, new Date(), JSON.stringify(row.st)]];
  if (!row.r) { row.r = D.sh.getLastRow() + 1; D.rows.push(row); }
  D.sh.getRange(row.r, 1, 1, COOP_HEAD.length).setValues(vals);
}
function coopDelete(D, row) {
  D.sh.deleteRow(row.r);
  D.rows = D.rows.filter(function (x) { return x !== row; });
  D.rows.forEach(function (x) { if (x.r > row.r) x.r--; });
}
function coopProp(k, def) { try { return JSON.parse(PROPS.getProperty(k) || def); } catch (e) { return JSON.parse(def); } }
function coopPaused() { return PROPS.getProperty('COOP_PAUSE') === '1'; }

/* ---------- squad state ---------- */
function coopNewState() {
  var t = cDay();
  return { v: 1, m: {}, mats: [0, 0, 0, 0, 0, 0, 0], bp: 0, spark: 0, crys: 0, star: 0,
    bld: { safety: 0, water: 0, green: 0, cell: 0, power: 0, part: 0, obs: 0, museum: 0, light: 0 },
    con: null, fog: 0, fogB: null, frz: 1, blk: false, streak: 0, best: 0, sg: [], day: cAdd(t, -1), wk: {}, puz: null, log: [], deco: {}, prize: false, created: t };
}
function coopMember(role) { return { role: role || '', joined: cDay(), days: [], dk: '', dm: 0, fr: 0, soft: 0, dc: 0, owe: 0, rep: { d: '', n: 0 }, tot: 0 }; }
function coopLog(st, k, x) { st.log.unshift({ d: cDay(), k: k, x: x || '' }); if (st.log.length > 25) st.log.length = 25; }
function coopMark(st, e, d) { var m = st.m[e]; if (!m || !d) return false; if (m.days.indexOf(d) >= 0) return false; m.days.push(d); m.days.sort(); if (m.days.length > 21) m.days = m.days.slice(-21); return true; }
function coopFactor(st) { return Math.max(0.5, Object.keys(st.m).length / 4); }

/* building costs (materials scale with squad size; blueprints and stars do not) */
function coopCost(st, b, lv) {
  var f = coopFactor(st), c = { mats: [0, 0, 0, 0, 0, 0, 0], bp: 0, star: 0, spark: 0, crys: 0, need: 1 };
  function m(u, n) { c.mats[u] += Math.round(n * f); }
  if (COOP_B[b]) {
    var u = COOP_B[b], a = u % 6 + 1, z = (u + 1) % 6 + 1;
    if (lv === 1) { m(u, 40); c.bp = 1; c.need = 1; }
    if (lv === 2) { m(u, 120); m(a, 40); m(z, 40); c.bp = 3; c.need = 3; }
    if (lv === 3) { m(u, 250); m(a, 80); m(z, 80); c.bp = 5; c.star = 1; c.need = 5; }
    if (st.bld.power >= 2) c.need = Math.max(1, c.need - 1);
  } else if (b === 'obs') { c.bp = 3; c.spark = 10; c.need = 5; }
  else if (b === 'museum') { for (var k = 1; k <= 6; k++) m(k, 50); c.star = 2; c.need = 5; }
  else if (b === 'light') { c.star = 3; c.spark = 10; c.crys = 20; c.need = 7; }
  return c;
}
function coopReqOk(st, b) {
  var all = ['safety', 'water', 'green', 'cell', 'power', 'part'];
  if (b === 'obs' || b === 'museum') return all.every(function (k) { return st.bld[k] >= 2; });
  if (b === 'light') return all.every(function (k) { return st.bld[k] >= 3; });
  return true;
}

/* ---------- daily roll-over: squad days, Fog, freezes, construction, stars, Sunday raid ---------- */
function coopRoll(row) {
  var st = row.st, today = cDay(), changed = false, n = 0, paused = coopPaused();
  while (st.day < cAdd(today, -1) && n < 31) {
    var d = cAdd(st.day, 1); n++; changed = true; st.day = d;
    var mem = Object.keys(st.m).filter(function (e) { return st.m[e].joined <= d; });
    if (cDow(d) === 1) { st.frz = 1 + (st.bld.safety >= 3 ? 1 : 0); st.blk = false; }
    if (!mem.length || paused) continue;
    var absent = mem.filter(function (e) { return st.m[e].days.indexOf(d) < 0; });
    if (!absent.length) {
      st.streak++; st.best = Math.max(st.best, st.streak);
      COOP_STARS.forEach(function (s) { if (st.streak === s && st.sg.indexOf(s) < 0) { st.sg.push(s); st.star++; coopLog(st, 'star', s); } });
      if (st.con) { st.con.done++; if (st.con.done >= st.con.need) { st.bld[st.con.b] = st.con.lv; coopLog(st, 'built', st.con.b + ':' + st.con.lv); if (st.con.b === 'light') st.prize = true; st.con = null; } }
    } else {
      st.streak = 0;
      if (st.frz > 0) { st.frz--; coopLog(st, 'freeze', absent.length); }
      else {
        var hit = absent.length;
        if (st.bld.safety >= 2 && !st.blk) { st.blk = true; hit--; coopLog(st, 'block', ''); }
        if (hit > 0) { st.fog = Math.min(10, st.fog + hit); coopLog(st, 'fog', hit); }
      }
    }
    if (st.bld.water >= 1 && st.fog > 0 && absent.length === 0) st.fog--;
    if (st.fog >= 9) { for (var u = 1; u <= 6; u++) st.mats[u] -= Math.floor(st.mats[u] * 0.05); coopLog(st, 'steal', ''); }
    if (cDow(d) === 0) {
      var c = 0; for (var k = 0; k < 7; k++) c += (st.wk[cAdd(d, -k)] || 0);
      var need = 120 * mem.length;
      if (c >= need) { st.crys += 3; coopLog(st, 'raidwin', c + '/' + need); }
      else { st.fog = Math.min(10, st.fog + 3); coopLog(st, 'raidlose', c + '/' + need); }
    }
    coopFogB(st);
  }
  Object.keys(st.wk).forEach(function (k) { if (cDiff(k, today) > 14) delete st.wk[k]; });
  return changed;
}
function coopFogB(st) {
  if (st.fog < 3) { st.fogB = null; return; }
  if (st.fogB && st.bld[st.fogB] > 0) return;
  var built = Object.keys(COOP_B).filter(function (k) { return st.bld[k] > 0; });
  st.fogB = built.length ? built[Math.floor(Math.random() * built.length)] : null;
}

/* ---------- materials from quizzes (called from the record action) ---------- */
function coopEarn(u, recs) {
  var ok = recs.filter(function (r) { return /^(quiz|practice|dict_listen|dict_meaning)$/.test(String(r.mode)) && /^[1-6]$/.test(String(r.unit)) && num(r.cor) > 0; });
  var today = cDay(), D = null, lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    D = coopData(); var row = coopFind(D, u.email);
    if (!row) return;
    coopRoll(row);
    var st = row.st;
    coopMark(st, u.email, today);
    if (ok.length) {
      var m = st.m[u.email];
      if (m.dk !== today) { m.dk = today; m.dm = 0; m.soft = 0; m.dc = 0; }
      ok.forEach(function (r) {
        var un = Number(r.unit), cor = Math.min(num(r.cor), 30), mul = COOP_ROLES[m.role] && COOP_ROLES[m.role].indexOf(un) >= 0 ? 1.5 : m.role === 'eng' ? 1.2 : 1;
        st.wk[today] = (st.wk[today] || 0) + cor;
        for (var i = 0; i < cor; i++) {
          if (m.dm < COOP_CAP) { m.fr += mul; var g = Math.floor(m.fr); m.fr -= g; st.mats[un] += g; m.dm += g; m.tot += g; }
          else {
            m.soft++;
            if (m.soft % 3 === 0 && m.dm < COOP_SOFT) { st.mats[un]++; m.dm++; m.tot++; }
            if (m.dc < COOP_COINS) { m.owe += 2; m.dc += 2; }
          }
        }
      });
    }
    coopWrite(D, row);
  } finally { lock.releaseLock(); }
}
/* a study day reported by the normal save also counts as a squad day for that member */
function coopTouch(email, lastDay) {
  if (!lastDay || lastDay !== cDay()) return;
  var cache = CacheService.getScriptCache(), key = 'ct_' + email + '_' + lastDay;
  if (cache.get(key)) return;
  var lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    var D = coopData(), row = coopFind(D, email);
    if (row) { coopRoll(row); coopMark(row.st, email, lastDay); coopWrite(D, row); }
    cache.put(key, '1', 21600);
  } finally { lock.releaseLock(); }
}

/* ---------- actions from the game ---------- */
function coopAction(u, b) {
  if (b.action === 'coopAll') { if (!u.teacher) return { ok: false, error: 'forbidden' }; return coopAll(); }
  var lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    var D = coopData(), row = coopFind(D, u.email), today = cDay(), err = null, extra = {};
    if (row && coopRoll(row)) coopWrite(D, row);
    var left = coopProp('COOP_LEFT', '{}'), cool = left[u.email] ? Math.max(0, 7 - cDiff(left[u.email], today)) : 0;
    switch (b.action) {
      case 'coopGet': break;
      case 'coopCreate':
        if (row) { err = 'in_squad'; break; } if (cool) { err = 'cooldown'; break; }
        var code; do { code = coopCode(); } while (D.rows.some(function (x) { return x.code === code; }));
        row = { id: 'S' + Date.now().toString(36), name: clean(b.name, 24) || 'Squad', code: code, st: coopNewState() };
        row.st.m[u.email] = coopMember(b.role); coopMark(row.st, u.email, b.studied ? today : '');
        coopLog(row.st, 'create', ''); coopWrite(D, row); break;
      case 'coopJoin':
        if (row) { err = 'in_squad'; break; } if (cool) { err = 'cooldown'; break; }
        var c2 = String(b.code || '').toUpperCase().replace(/[^A-Z0-9]/g, ''), t = null;
        D.rows.forEach(function (x) { if (x.code === c2) t = x; });
        if (!t) { err = 'no_code'; break; }
        if (Object.keys(t.st.m).length >= COOP_MAXN) { err = 'full'; break; }
        coopRoll(t); t.st.m[u.email] = coopMember(b.role); if (b.studied) coopMark(t.st, u.email, today);
        coopLog(t.st, 'join', fullName(u.zh, u.en)); coopWrite(D, t); row = t; break;
      case 'coopLeave':
        if (!row) break;
        delete row.st.m[u.email]; coopLog(row.st, 'leave', fullName(u.zh, u.en));
        left[u.email] = today; PROPS.setProperty('COOP_LEFT', JSON.stringify(coopPrune(left, today)));
        if (!Object.keys(row.st.m).length) coopDelete(D, row); else coopWrite(D, row);
        row = null; cool = 7; break;
      case 'coopRole':
        if (!row || !COOP_ROLES[b.role]) { err = 'bad'; break; }
        row.st.m[u.email].role = b.role; coopWrite(D, row); break;
      case 'coopBuild': err = row ? coopBuild(row.st, String(b.b)) : 'no_squad'; if (!err) coopWrite(D, row); break;
      case 'coopPuzzle': err = row ? coopPuzzle(row.st, u, b) : 'no_squad'; if (!err) coopWrite(D, row); break;
      case 'coopRepair': err = row ? coopRepair(row.st, u.email, b) : 'no_squad'; if (!err) coopWrite(D, row); break;
      case 'coopTrade': err = row ? coopTrade(row.st, b) : 'no_squad'; if (!err) coopWrite(D, row); break;
      case 'coopForge': err = row ? coopForge(row.st, b) : 'no_squad'; if (!err) coopWrite(D, row); break;
      case 'coopDeco': err = row ? coopDeco(row.st, b) : 'no_squad'; if (!err) coopWrite(D, row); break;
      case 'coopClaim':
        if (row) { extra.coins = row.st.m[u.email].owe || 0; row.st.m[u.email].owe = 0; coopWrite(D, row); } break;
      case 'coopPause':
        if (!u.teacher) { err = 'forbidden'; break; }
        PROPS.setProperty('COOP_PAUSE', b.on ? '1' : '0'); break;
      case 'coopKick':
        if (!u.teacher) { err = 'forbidden'; break; }
        D.rows.forEach(function (x) { if (x.id === b.id && x.st.m[b.email]) { delete x.st.m[b.email]; coopLog(x.st, 'kick', ''); if (Object.keys(x.st.m).length) coopWrite(D, x); else coopDelete(D, x); } });
        row = coopFind(D, u.email); break;
      default: err = 'unknown_action';
    }
    if (row && row.st && coopPuzzleEnsure(row.st)) coopWrite(D, row);
    var res = coopView(u, row, cool);
    if (err) { res.ok = false; res.error = err; }
    for (var k in extra) res[k] = extra[k];
    return res;
  } finally { lock.releaseLock(); }
}
function coopCode() { var a = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789', s = ''; for (var i = 0; i < 6; i++) s += a.charAt(Math.floor(Math.random() * a.length)); return s; }
function coopPrune(left, today) { for (var e in left) if (cDiff(left[e], today) > 8) delete left[e]; return left; }

function coopBuild(st, b) {
  if (st.con) return 'busy';
  var lv = (st.bld[b] || 0) + 1, wonder = !COOP_B[b];
  if (st.bld[b] == null) return 'bad';
  if ((wonder && lv > 1) || lv > 3) return 'max';
  if (!coopReqOk(st, b)) return 'locked';
  var c = coopCost(st, b, lv);
  for (var u = 1; u <= 6; u++) if (st.mats[u] < c.mats[u]) return 'short';
  if (st.bp < c.bp || st.star < c.star || st.spark < c.spark || st.crys < c.crys) return 'short';
  for (var k = 1; k <= 6; k++) st.mats[k] -= c.mats[k];
  st.bp -= c.bp; st.star -= c.star; st.spark -= c.spark; st.crys -= c.crys;
  st.con = { b: b, lv: lv, need: c.need, done: 0, since: cDay() };
  coopLog(st, 'start', b + ':' + lv); return null;
}
/* one Blueprint puzzle a day: one part per member (at least 2); a wrong part can be rescued by a teammate */
function coopPuzzleEnsure(st) {
  var today = cDay();
  if (st.puz && st.puz.day === today) return coopPuzzleShare(st);
  var mem = Object.keys(st.m), n = Math.max(2, mem.length), u = st.con && COOP_B[st.con.b] ? COOP_B[st.con.b] : (cDiff('2026-01-05', today) % 6 + 6) % 6 + 1;
  var parts = []; for (var i = 0; i < n; i++) parts.push({ e: mem[i % mem.length], ok: null, by: '', tried: [] });
  st.puz = { day: today, u: u, seed: Math.floor(Math.random() * 100000), parts: parts, done: false };
  return true;
}
/* members who joined (or left) after today's puzzle was made: give every member one part */
function coopPuzzleShare(st) {
  var p = st.puz, mem = Object.keys(st.m), changed = false;
  if (p.done) return false;
  var count = function (e) { return p.parts.filter(function (x) { return x.e === e; }).length; };
  p.parts.forEach(function (x) { if (x.ok === null && !st.m[x.e]) { x.e = mem.filter(function (e) { return !count(e); })[0] || mem[0]; changed = true; } });
  mem.forEach(function (e) {
    if (count(e)) return;
    var spare = p.parts.filter(function (x) { return x.ok === null && count(x.e) > 1; })[0];
    if (spare) spare.e = e; else p.parts.push({ e: e, ok: null, by: '', tried: [] });
    changed = true;
  });
  return changed;
}
function coopPuzzle(st, u, b) {
  coopPuzzleEnsure(st);
  var p = st.puz.parts[Number(b.i)], ok = !!b.ok;
  if (!p) return 'bad';
  if (!b.rescue) {
    if (p.e !== u.email || p.ok !== null) return 'bad';
    p.ok = ok;
  } else {
    if (p.ok !== false || p.e === u.email || p.tried.indexOf(u.email) >= 0) return 'bad';
    p.tried.push(u.email);
    if (ok) { p.ok = true; p.by = fullName(u.zh, u.en); st.spark++; coopLog(st, 'rescue', p.by); }
  }
  coopMark(st, u.email, cDay());
  if (!st.puz.done && st.puz.parts.every(function (x) { return x.ok === true; })) { st.puz.done = true; st.bp++; coopLog(st, 'blueprint', ''); }
  return null;
}
function coopRepair(st, email, b) {
  var m = st.m[email], today = cDay();
  if (st.fog <= 0) return 'no_fog';
  if (m.rep.d !== today) m.rep = { d: today, n: 0 };
  if (m.rep.n >= COOP_REPAIRS) return 'limit';
  var need = st.bld.safety >= 1 ? 4 : 5, cor = num(b.cor);
  m.rep.n++;
  if (cor < need - 1) return null;
  var clear = (st.bld.water >= 2 ? 4 : 2) + (m.role === 'eng' ? 1 : 0);
  st.fog = Math.max(0, st.fog - clear); st.crys += 1 + (st.bld.water >= 3 ? 1 : 0);
  coopFogB(st); coopLog(st, 'repair', clear); return null;
}
function coopTrade(st, b) {
  if (st.bld.part < 1) return 'locked';
  var f = Number(b.from), t = Number(b.to), n = Math.max(1, Math.min(50, Math.floor(num(b.n)))), rate = st.bld.part >= 2 ? 2 : 3;
  if (!(f >= 1 && f <= 6 && t >= 1 && t <= 6) || f === t) return 'bad';
  if (st.mats[f] < rate * n) return 'short';
  st.mats[f] -= rate * n; st.mats[t] += n; return null;
}
function coopForge(st, b) {
  if (st.bld.part < 3) return 'locked';
  var f = Number(b.from); if (!(f >= 1 && f <= 6)) return 'bad';
  if (st.mats[f] < 60) return 'short';
  st.mats[f] -= 60; st.bp++; coopLog(st, 'forge', ''); return null;
}
function coopDeco(st, b) {
  var it = String(b.item), slot = Math.floor(num(b.slot));
  if (!COOP_DECO[it] || slot > 5) return 'bad';
  if (st.crys < COOP_DECO[it]) return 'short';
  st.crys -= COOP_DECO[it]; st.deco[slot] = it; return null;
}

/* ---------- what the game sees ---------- */
function coopView(u, row, cool) {
  var res = { ok: true, pause: coopPaused(), cool: cool || 0, today: cDay(), squad: null };
  if (!row) return res;
  var st = row.st, pets = coopPets(), mem = Object.keys(st.m), idx = {};
  mem.forEach(function (e, i) { idx[e] = i; });
  var today = cDay(), sun = cAdd(today, (7 - cDow(today)) % 7), wc = 0;
  for (var k = 0; k < 7; k++) { var d = cAdd(sun, -k); if (d <= today) wc += (st.wk[d] || 0); }
  var me = st.m[u.email] || {};
  res.squad = {
    id: row.id, name: row.name, code: row.code, n: mem.length,
    members: mem.map(function (e) { var x = findUser(e) || {}, m = st.m[e]; return { n: fullName(x.zh, x.en), c: x.cls || '', p: pets[e] || 'mochi', role: m.role, today: m.days.indexOf(today) >= 0, me: e === u.email, tot: m.tot }; }),
    mats: st.mats, bp: st.bp, spark: st.spark, crys: st.crys, star: st.star, bld: st.bld, con: st.con, fog: st.fog, fogB: st.fogB,
    frz: st.frz, streak: st.streak, best: st.best, log: st.log, deco: st.deco, prize: st.prize,
    wk: { c: wc, need: 120 * mem.length, left: cDiff(today, sun) },
    puz: st.puz ? { day: st.puz.day, u: st.puz.u, seed: st.puz.seed, done: st.puz.done, parts: st.puz.parts.map(function (p) { return { who: idx[p.e], mine: p.e === u.email, ok: p.ok, by: p.by, tried: p.tried.indexOf(u.email) >= 0 }; }) } : null,
    me: { dm: me.dk === today ? me.dm : 0, dc: me.dk === today ? me.dc : 0, owe: me.owe || 0, rep: me.rep && me.rep.d === today ? me.rep.n : 0, role: me.role || '' },
    costs: coopCosts(st)
  };
  return res;
}
function coopCosts(st) {
  var out = {};
  Object.keys(st.bld).forEach(function (b) { var lv = st.bld[b] + 1; if ((COOP_B[b] && lv <= 3) || (!COOP_B[b] && lv === 1)) { out[b] = coopCost(st, b, lv); out[b].req = coopReqOk(st, b); } });
  return out;
}
function coopPets() {
  var p = {}; try { boardRows().forEach(function (r) { p[r.e] = r.p; }); } catch (e) { }
  return p;
}
function coopAll() {
  var D = coopData();
  return { ok: true, pause: coopPaused(), today: cDay(), squads: D.rows.map(function (row) {
    var st = row.st;
    return { id: row.id, name: row.name, code: row.code, streak: st.streak, best: st.best, fog: st.fog, bld: st.bld, con: st.con, prize: st.prize,
      members: Object.keys(st.m).map(function (e) { var x = findUser(e) || {}; return { e: e, n: fullName(x.zh, x.en), c: x.cls || '', role: st.m[e].role, tot: st.m[e].tot, days: st.m[e].days.length, last: st.m[e].days[st.m[e].days.length - 1] || '' }; }) };
  }) };
}
