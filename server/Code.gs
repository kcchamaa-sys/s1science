/**
 * Mochi Science Pals – class server (Google Apps Script web app)
 * ----------------------------------------------------------------
 * - Checks each Google sign-in (ID token) and looks the email up in the Users sheet.
 * - Saves quiz / study records and each student's game progress to the spreadsheet.
 * - Gives class statistics to staff accounts only.
 *
 * Script Properties (Project Settings → Script properties):
 *   SHEET_ID        ID of the Google Sheet that holds the Users tab   (required)
 *   CLIENT_ID       Google OAuth Web client ID used by the game       (required)
 *   TEACHER_EMAILS  optional, comma-separated. If set, ONLY these emails can open the
 *                   teacher dashboard. If empty, every "教職員" user can.
 *   USERS_SHEET     optional, name of the users tab (default: 使用者 Users)
 */
var PROPS = PropertiesService.getScriptProperties();
var USERS_DEFAULT = '使用者 Users';
var REC = '科學記錄 Science Records';
var PROG = '科學進度 Science Progress';
var REC_HEAD = ['記錄時間 Timestamp', '練習編號 Session ID', '電郵 Email', '身分 Role', '班別 Class', '班號 Class No.',
  '中文姓名 Chinese Name', '英文姓名 English Name', '模式 Mode', '單元 Unit', '小節 Sub-topic', '已答題數 Answered',
  '答對題數 Correct', '準確率 Accuracy %', '星星 Stars', '用時(秒) Seconds', '狀態 Status', '語言 Language',
  '開始時間 Start', '結束時間 End', '題目 Question IDs', '答錯題目 Wrong IDs'];
var PROG_HEAD = ['電郵 Email', '更新時間 Updated', '連續日數 Streak', '最佳連續 Best streak', '星星 Stars', '寵物等級 Pet level',
  '金幣 Coins', '寵物 Pet', '測驗次數 Quizzes', '待清除錯題 Mistakes', '已清除錯題 Cleared', '獎盃 Trophies',
  '最後溫習日 Last study day', '進度資料 Data (do not edit)'];
var MODES = { quiz: '測驗 Quiz', practice: '錯題練習 Mistake practice', study: '溫習筆記 Study notes', vocab: '詞彙跟讀 Vocab', match: '詞彙配對 Term Match',
  dict_listen: '默書（聽音）Dictation – listen', dict_meaning: '默書（看義／圖）Dictation – meaning/picture' };
var STATUS = { done: '完成', quit: '中途結束' };

function doGet() {
  return out({ ok: true, app: 'Mochi Science Pals', time: new Date().toISOString() });
}

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var v = verifyToken(body.token);
    if (!v.ok) return out(v);
    var user = findUser(v.email);
    if (!user) return out({ ok: false, error: 'not_listed' });
    switch (body.action) {
      case 'login': return out({ ok: true, user: user, progress: getProgress(user.email) });
      case 'save': saveProgress(user, body.state, body.summary || {}); return out({ ok: true });
      case 'record': return out({ ok: true, saved: appendRecords(user, body.records || []) });
      case 'stats':
        if (!user.teacher) return out({ ok: false, error: 'forbidden' });
        return out(stats());
      default: return out({ ok: false, error: 'unknown_action' });
    }
  } catch (err) {
    return out({ ok: false, error: 'server: ' + err });
  }
}

function out(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function book() { return SpreadsheetApp.openById(PROPS.getProperty('SHEET_ID')); }
function sheet(name, head) {
  var ss = book(), sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(head);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, head.length).setFontWeight('bold').setBackground('#FFF1C5');
  }
  return sh;
}
function clean(s, n) { return String(s == null ? '' : s).slice(0, n || 200).replace(/^[=+\-@\t\r]+/, ''); }
function num(x) { var n = Number(x); return isFinite(n) ? Math.max(0, Math.min(n, 100000)) : 0; }
function when(s) { var d = new Date(s); return isNaN(d) ? '' : d; }

/** Verifies a Google ID token with Google and caches the result until it expires. */
function verifyToken(token) {
  if (!token) return { ok: false, error: 'no_token' };
  var cache = CacheService.getScriptCache();
  var key = 'tk_' + Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, token)).slice(0, 43);
  var hit = cache.get(key);
  if (hit) return JSON.parse(hit);
  var r = UrlFetchApp.fetch('https://oauth2.googleapis.com/tokeninfo?id_token=' + encodeURIComponent(token), { muteHttpExceptions: true });
  if (r.getResponseCode() !== 200) return { ok: false, error: 'expired' };
  var p = JSON.parse(r.getContentText());
  if (p.aud !== PROPS.getProperty('CLIENT_ID')) return { ok: false, error: 'bad_client' };
  if (String(p.email_verified) !== 'true') return { ok: false, error: 'unverified' };
  var left = Number(p.exp) - Math.floor(Date.now() / 1000);
  if (left <= 0) return { ok: false, error: 'expired' };
  var res = { ok: true, email: String(p.email).trim().toLowerCase() };
  cache.put(key, JSON.stringify(res), Math.max(1, Math.min(left, 3000)));
  return res;
}

function isStaffRole(role) { return /教職員|staff|teacher|老師/i.test(role); }
function findUser(email) {
  var cache = CacheService.getScriptCache(), c = cache.get('u_' + email);
  if (c) return JSON.parse(c);
  var sh = book().getSheetByName(PROPS.getProperty('USERS_SHEET') || USERS_DEFAULT);
  if (!sh) throw 'Users sheet not found';
  var v = sh.getDataRange().getValues();
  var teachers = (PROPS.getProperty('TEACHER_EMAILS') || '').toLowerCase().split(/[,\s]+/).filter(String);
  for (var i = 1; i < v.length; i++) {
    if (String(v[i][0]).trim().toLowerCase() !== email) continue;
    var role = String(v[i][1] || '');
    var u = {
      email: email, role: role, zh: String(v[i][2] || ''), en: String(v[i][3] || ''),
      cls: String(v[i][4] || ''), no: v[i][5] === '' || v[i][5] == null ? '' : String(v[i][5]),
      teacher: teachers.length ? teachers.indexOf(email) >= 0 : isStaffRole(role)
    };
    cache.put('u_' + email, JSON.stringify(u), 300);
    return u;
  }
  return null;
}

function appendRecords(u, recs) {
  if (!recs.length) return 0;
  var lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    var sh = sheet(REC, REC_HEAD);
    var rows = recs.slice(0, 300).map(function (r) {
      var ans = num(r.ans), cor = Math.min(num(r.cor), ans || num(r.cor));
      return [new Date(), clean(r.session, 40), u.email, u.role, u.cls, u.no, u.zh, u.en,
        MODES[r.mode] || clean(r.mode, 30), clean(r.unit, 10), clean(r.sec, 10), ans, cor,
        ans ? Math.round(cor / ans * 100) : '', num(r.stars), num(r.secs), STATUS[r.status] || clean(r.status, 20),
        clean(r.lang, 12), when(r.start), when(r.end), clean(r.ids, 600), clean(r.wrong, 600)];
    });
    var start = sh.getLastRow() + 1;
    sh.getRange(start, 10, rows.length, 2).setNumberFormat('@'); // keep "1.1" as text
    sh.getRange(start, 1, rows.length, REC_HEAD.length).setValues(rows);
    return rows.length;
  } finally { lock.releaseLock(); }
}

function findRow(sh, email) {
  var last = sh.getLastRow();
  if (last < 2) return -1;
  var col = sh.getRange(2, 1, last - 1, 1).getValues();
  for (var i = 0; i < col.length; i++) if (String(col[i][0]).toLowerCase() === email) return i + 2;
  return -1;
}
function saveProgress(u, state, s) {
  state = String(state || '');
  if (state.length > 49000) throw 'progress too large';
  var lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    var sh = sheet(PROG, PROG_HEAD);
    var row = [u.email, new Date(), num(s.streak), num(s.best), num(s.stars), num(s.level), num(s.coins), clean(s.pet, 20),
      num(s.quizzes), num(s.mistakes), num(s.cleared), num(s.trophies), clean(s.lastDay, 12), state];
    var r = findRow(sh, u.email);
    if (r < 0) r = sh.getLastRow() + 1;
    sh.getRange(r, 13).setNumberFormat('@');
    sh.getRange(r, 1, 1, row.length).setValues([row]);
  } finally { lock.releaseLock(); }
}
function getProgress(email) {
  var sh = book().getSheetByName(PROG);
  if (!sh) return null;
  var r = findRow(sh, email);
  return r < 0 ? null : String(sh.getRange(r, PROG_HEAD.length).getValue() || '') || null;
}

function stats() {
  var ss = book();
  var uv = ss.getSheetByName(PROPS.getProperty('USERS_SHEET') || USERS_DEFAULT).getDataRange().getValues();
  var students = [];
  for (var i = 1; i < uv.length; i++) {
    if (!uv[i][0] || isStaffRole(String(uv[i][1] || ''))) continue;
    students.push({ email: String(uv[i][0]).trim().toLowerCase(), zh: String(uv[i][2] || ''), en: String(uv[i][3] || ''),
      cls: String(uv[i][4] || ''), no: uv[i][5] === '' || uv[i][5] == null ? '' : String(uv[i][5]) });
  }
  var rev = {}; for (var k in MODES) rev[MODES[k]] = k;
  var records = [], rs = ss.getSheetByName(REC);
  if (rs && rs.getLastRow() > 1) {
    rs.getRange(2, 1, rs.getLastRow() - 1, REC_HEAD.length).getValues().forEach(function (r) {
      var t = r[0] instanceof Date ? r[0].toISOString() : String(r[0]);
      records.push({ t: t, email: String(r[2]).toLowerCase(), mode: rev[r[8]] || String(r[8]), unit: String(r[9]), sec: String(r[10]),
        ans: r[11], cor: r[12], stars: r[14], secs: r[15], status: r[16] === STATUS.quit ? 'quit' : 'done', lang: r[17],
        ids: String(r[20] || ''), wrong: String(r[21] || '') });
    });
  }
  var progress = {}, ps = ss.getSheetByName(PROG);
  if (ps && ps.getLastRow() > 1) {
    ps.getRange(2, 1, ps.getLastRow() - 1, PROG_HEAD.length - 1).getValues().forEach(function (r) {
      progress[String(r[0]).toLowerCase()] = { upd: r[1] instanceof Date ? r[1].toISOString() : '', streak: r[2], best: r[3], stars: r[4],
        level: r[5], coins: r[6], pet: r[7], quizzes: r[8], mistakes: r[9], cleared: r[10], trophies: r[11], lastDay: String(r[12] || '') };
    });
  }
  return { ok: true, students: students, records: records, progress: progress };
}
