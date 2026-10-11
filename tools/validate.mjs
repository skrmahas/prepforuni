// Validates the Delft AE Drill problem bank: schema, coverage and numeric answers.
import { readFileSync, readdirSync } from "node:fs";
import vm from "node:vm";
import path from "node:path";

const appDir = path.resolve(process.argv[2] || "app");
const ctx = vm.createContext({ Math, Number, Set, Object, String, console });
for (const f of readdirSync(appDir).filter((n) => /^problems-.*\.js$/.test(n)).sort()) {
  vm.runInContext(readFileSync(path.join(appDir, f), "utf8"), ctx, { filename: f });
}
const P = ctx.PROBLEMS;
const errors = [], warn = [];
const ids = new Set();
const close = (a, b, tol) => Math.abs(a - b) <= tol * Math.max(Math.abs(a), Math.abs(b));

const syllabus = {
  M1: 3, M2: 4, M3: 3, M4: 3, M5: 5, M6: 6, M7: 7,
  P1: 8, P2: 4, P3: 6, P4: 3, P5: 2,
};
const roman = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"];
const cover = {};
let checked = 0;

// Checks one concrete card (a fixed card, or one roll of a generated card); returns error strings.
function checkCard(p) {
  const errs = [];
  for (const k of ["stem", "solution", "model"]) if (typeof p[k] !== "string" || !p[k]) errs.push(`missing ${k}`);
  if (!Array.isArray(p.choices) || p.choices.length < 4 || p.choices.length > 5) return errs.concat("needs 4-5 choices");
  if (!(p.answer >= 0 && p.answer < p.choices.length)) errs.push("answer out of range");
  if (new Set(p.choices).size !== p.choices.length) errs.push("duplicate choice text");
  for (const s of [p.stem, p.solution, ...p.choices]) {
    if (typeof s !== "string") { errs.push("non-string text"); continue; }
    if (((s.match(/(?<!\\)\$/g) || []).length) % 2) errs.push(`odd number of $ in "${s.slice(0, 50)}…"`);
    for (const m of s.match(/\$[^$]*\$/g) || []) if (/[<>]/.test(m)) errs.push(`raw < or > inside TeX "${m.slice(0, 40)}"`);
    if (/NaN|Infinity|\[object|[=({$]undefined|undefined[})$]/.test(s)) errs.push(`bad value in "${s.slice(0, 60)}"`);
  }
  if (p.vals) {
    if (p.vals.length !== p.choices.length) errs.push("vals length mismatch");
    const ans = p.vals[p.answer];
    p.vals.forEach((v, i) => { if (!p.nearOk && i !== p.answer && v != null && ans != null && close(v, ans, 0.02)) errs.push(`distractor ${i} (${v}) too close to answer (${ans})`); });
    if (typeof p.check === "function") { const c = p.check(); if (!close(c, ans, 0.01) && !(Math.abs(ans) < 1e-9 && Math.abs(c) < 1e-6)) errs.push(`check() = ${c} but answer value = ${ans}`); }
  }
  if (typeof p.verify === "function" && !p.verify()) errs.push("verify() failed");
  return errs;
}

let generated = 0, rolls = 0;
for (const p of P) {
  const where = p.id;
  if (ids.has(p.id)) errors.push(`${where}: duplicate id`);
  ids.add(p.id);
  if (![1, 2, 3].includes(p.difficulty)) errors.push(`${where}: bad difficulty`);
  if (!syllabus[p.topic] || !roman.slice(0, syllabus[p.topic]).includes(p.sub)) errors.push(`${where}: unknown syllabus code`);
  const key = `${p.topic}-${p.sub}`;
  cover[key] = (cover[key] || 0) + 1;
  if (typeof p.gen === "function") {
    // Roll a generated card many times: every roll must be a valid card, and rolls should actually vary.
    generated++;
    const seen = new Set(), msgs = new Map();
    const N = 400;
    for (let i = 0; i < N; i++) {
      let inst;
      try { inst = Object.assign({}, p, p.gen(Math.random)); } catch (e) { msgs.set("gen threw: " + e.message, (msgs.get("gen threw: " + e.message) || 0) + 1); continue; }
      rolls++; seen.add(inst.stem);
      if (inst.vals && typeof inst.check === "function") checked++;
      for (const e of checkCard(inst)) msgs.set(e.replace(/[-\d.]+/g, "#"), (msgs.get(e.replace(/[-\d.]+/g, "#")) || 0) + 1) || msgs.set("ex:" + e, 1);
      if (i < 3) for (const e of checkCard(inst)) errors.push(`${where} (roll ${i}): ${e}`);
    }
    for (const [m, n] of msgs) if (!m.startsWith("ex:")) errors.push(`${where}: ${n}/${N} rolls: ${m}`);
    if (seen.size < 8) warn.push(`${where}: only ${seen.size} distinct stems in ${N} rolls`);
    continue;
  }
  for (const e of checkCard(p)) errors.push(`${where}: ${e}`);
  if (p.vals && typeof p.check === "function") checked++;
}

for (const [topic, n] of Object.entries(syllabus)) {
  for (const r of roman.slice(0, n)) {
    const c = cover[`${topic}-${r}`] || 0;
    if (c === 0) errors.push(`${topic}-${r}: no cards`);
    else if (c < 2) warn.push(`${topic}-${r}: only ${c} card`);
  }
}

const by = (f) => P.reduce((m, p) => ((m[f(p)] = (m[f(p)] || 0) + 1), m), {});
console.log(`cards: ${P.length}`, by((p) => p.subject));
console.log("difficulty:", by((p) => p.difficulty));
console.log("model:", by((p) => p.model));
console.log(`generated card types: ${generated} (${rolls} rolls checked)`);
console.log(`numerically checked: ${P.filter(p => !p.gen && p.vals && typeof p.check === "function").length} fixed cards, plus every roll of generated cards that have a check`);
warn.forEach((w) => console.log("warn:", w));
if (errors.length) { errors.forEach((e) => console.log("ERROR:", e)); process.exit(1); }
console.log("OK");
