/* Delft AE Drill: shared core (problem index, progress state, account sync, scheduler, queues).
   Loaded as a classic script by both the 2D app (index.html) and the 3D room (room.html), after the
   problem banks. Pages set onSyncChange / onStateReplaced to react to storage events. */
"use strict";

/* Page hooks. */
let onSyncChange = () => {};
let onStateReplaced = () => {};
const TOPICS = {
  M1: "Functions & graphs", M2: "Algebraic solving", M3: "Differential calculus", M4: "Integral calculus",
  M5: "Trigonometry", M6: "Geometry", M7: "Vectors",
  P1: "Fundamentals", P2: "Mechanics", P3: "Electricity & magnetism", P4: "Vibrations & waves", P5: "Modelling"
};
const SUBJECT = { math: "Mathematics", physics: "Physics" };
const EXAM_DATE = new Date(2027, 2, 11);
const DAY = 864e5, MIN = 6e4, STEPS = [1, 10], TARGET = 90;
const PROBLEMS = (window.PROBLEMS || []).slice();
const BY_ID = new Map(PROBLEMS.map(p => [p.id, p]));
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* ---------- State ---------- */
function todayKey(d = new Date()) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
function startOfDay(ms = Date.now()) { const d = new Date(ms); d.setHours(0, 0, 0, 0); return d.getTime(); }
function fresh() { return { v: 1, updated: 0, cards: {}, day: { date: todayKey(), newDone: 0, reviewed: 0, correct: 0 }, settings: { newPerDay: 20, hideCalc: false }, history: {}, exams: [] }; }
function sane(o) { return o && typeof o === "object" && o.v === 1 && o.cards && o.settings ? Object.assign(fresh(), o) : null; }
const LS_KEY = "delft-ae-drill-v1";
function readLocal() { try { return sane(JSON.parse(localStorage.getItem(LS_KEY))); } catch (e) { return null; } }
function writeLocal() { try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch (e) {} }
let S = readLocal() || fresh();
function rollDay() { if (S.day.date !== todayKey()) S.day = { date: todayKey(), newDone: 0, reviewed: 0, correct: 0 }; }
function cs(id) { return S.cards[id] || { s: "new" }; }

/* Account sync through the db capability: one private document per viewer. */
const remote = { ref: null, mode: "pending", timer: null, chain: Promise.resolve() };
function setSync(mode) {
  remote.mode = mode;
  onSyncChange(mode);
}
async function connect() {
  if (!window.claude || !window.claude.use) return setSync("local");
  try {
    const [user, db] = await Promise.all([claude.use("user"), claude.use("db")]);
    if (!user || !db) return setSync("local");
    const uid = await user.id();
    if (!uid) return setSync("local");
    remote.ref = db.doc("data/users/" + uid + "/progress");
    const snap = await remote.ref.get();
    if (snap.exists) {
      let other = null;
      try { other = sane(JSON.parse(snap.data().json)); } catch (e) {}
      if (other && other.updated > S.updated) { S = other; writeLocal(); onStateReplaced(); }
      else if (S.updated > ((other && other.updated) || 0)) pushRemote();
    } else if (S.updated) pushRemote();
    setSync("account");
  } catch (e) { remote.ref = null; setSync("local"); }
}
function pushRemote() {
  if (!remote.ref) return;
  clearTimeout(remote.timer);
  remote.timer = setTimeout(() => {
    const body = { v: 1, updated: S.updated, json: JSON.stringify(S) };
    remote.chain = remote.chain.then(() => remote.ref.set(body)).catch(err => {
      if (err && (err.code === "unavailable")) return new Promise(r => setTimeout(r, 1500 + Math.random() * 1000)).then(() => remote.ref && remote.ref.set(body)).catch(() => {});
      if (err && ["invalid_argument", "revoked", "not_granted", "capability_disabled", "capability_removed"].includes(err.code)) { remote.ref = null; setSync("local"); }
    });
  }, 800);
}
function save() { S.updated = Date.now(); writeLocal(); pushRemote(); }

/* ---------- Scheduler (SM-2 with Anki-style learning steps) ---------- */
function schedule(c0, r, now = Date.now()) {
  const c = Object.assign({ ease: 2.5, ivl: 0, step: 0, reps: 0, lapses: 0 }, c0);
  const relearn = c.s === "learn" && c.ivl > 0;
  const reviewDue = days => startOfDay(now) + days * DAY;
  if (c.s === "new" || c.s === "learn") {
    if (c.s === "new") { c.step = 0; c.ivl = 0; }
    if (r === 1) { c.s = "learn"; c.step = 0; c.due = now + STEPS[0] * MIN; }
    else if (r === 2) { c.s = "learn"; c.due = now + (c.step === 0 ? 6 : STEPS[c.step] * 1.5) * MIN; }
    else if (r === 3) {
      if (!relearn && c.step + 1 < STEPS.length) { c.s = "learn"; c.step += 1; c.due = now + STEPS[c.step] * MIN; }
      else { c.s = "review"; c.ivl = relearn ? Math.max(1, c.ivl) : 1; c.due = reviewDue(c.ivl); }
    } else { c.s = "review"; c.ivl = relearn ? Math.max(1, c.ivl) + 1 : 4; c.due = reviewDue(c.ivl); }
  } else {
    const late = Math.max(0, (now - c.due) / DAY);
    if (r === 1) { c.lapses += 1; c.ease = Math.max(1.3, c.ease - 0.2); c.ivl = Math.max(1, Math.round(c.ivl * 0.5)); c.s = "learn"; c.step = 0; c.due = now + 10 * MIN; }
    else {
      if (r === 2) { c.ease = Math.max(1.3, c.ease - 0.15); c.ivl = Math.max(c.ivl + 1, Math.round(c.ivl * 1.2)); }
      else if (r === 3) { c.ivl = Math.max(c.ivl + 1, Math.round((c.ivl + late / 2) * c.ease)); }
      else { c.ease += 0.15; c.ivl = Math.max(c.ivl + 2, Math.round((c.ivl + late) * c.ease * 1.3)); }
      c.ivl = Math.min(c.ivl, 365);
      c.due = reviewDue(c.ivl);
    }
  }
  c.reps += 1;
  return c;
}
function fmtIvl(c, now = Date.now()) {
  const ms = c.due - now;
  if (c.s === "learn") return ms < 60 * MIN ? Math.max(1, Math.round(ms / MIN)) + " min" : Math.round(ms / 36e5) + " h";
  const d = c.ivl;
  return d < 31 ? d + " d" : d < 365 ? (d / 30).toFixed(1).replace(".0", "") + " mo" : (d / 365).toFixed(1) + " y";
}

/* ---------- Decks and queues ---------- */
function inDeck(p, deck) {
  if (deck === "all") return true;
  if (deck === "math" || deck === "physics") return p.subject === deck;
  return p.id.startsWith(deck + "-");
}
function pool(deck) { return PROBLEMS.filter(p => inDeck(p, deck) && !(S.settings.hideCalc && p.calc)); }
function newLeft() { rollDay(); return Math.max(0, S.settings.newPerDay - S.day.newDone); }
function deckCounts(deck, now = Date.now()) {
  let due = 0, nw = 0, learned = 0, total = 0;
  for (const p of pool(deck)) {
    total++;
    const c = cs(p.id);
    if (c.s === "new") nw++;
    else { if (c.due <= now) due++; if (c.s === "review") learned++; }
  }
  return { due, nw, learned, total };
}
function deckName(deck) {
  if (deck === "all") return "All topics";
  if (SUBJECT[deck]) return SUBJECT[deck];
  const [t, s] = deck.split("-");
  return t + (s ? " " + s : "") + " \u00B7 " + TOPICS[t];
}
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function nextCard(deck, avoid, cram) {
  const now = Date.now(), ps = pool(deck);
  const learnDue = ps.filter(p => cs(p.id).s === "learn" && cs(p.id).due <= now).sort((a, b) => cs(a.id).due - cs(b.id).due);
  const pickNot = arr => arr.find(p => p.id !== avoid) || arr[0];
  if (learnDue.length) return pickNot(learnDue);
  const rev = shuffle(ps.filter(p => cs(p.id).s === "review" && cs(p.id).due <= now));
  if (rev.length) return pickNot(rev);
  if (newLeft() > 0) {
    const nw = ps.filter(p => cs(p.id).s === "new");
    if (nw.length) {
      // Easier first, random within a difficulty level, so topics interleave.
      const minD = Math.min(...nw.map(p => p.difficulty));
      const tier = shuffle(nw.filter(p => p.difficulty <= minD + (S.day.newDone > 6 ? 1 : 0)));
      return tier[0];
    }
  }
  const soon = ps.filter(p => cs(p.id).s === "learn" && cs(p.id).due <= now + 20 * MIN).sort((a, b) => cs(a.id).due - cs(b.id).due);
  if (soon.length) return pickNot(soon);
  if (cram) return pickNot(shuffle(ps.slice()));
  return null;
}

/* Solutions name options by their letter in the bank ("Option C"). Choices are shuffled on screen, so
   map each mentioned letter to the letter it is displayed under. perm[k] = bank index shown at position k. */
function relabel(text, perm) {
  const pos = L => "ABCDE"[perm.indexOf(L.charCodeAt(0) - 65)] || L;
  return text.replace(/\b([Oo]ptions?) ([A-E])\b(?: and ([A-E])\b)?/g, (m, w, a, b) => w + " " + pos(a) + (b ? " and " + pos(b) : ""));
}
