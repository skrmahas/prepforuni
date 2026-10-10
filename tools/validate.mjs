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

for (const p of P) {
  const where = p.id;
  if (ids.has(p.id)) errors.push(`${where}: duplicate id`);
  ids.add(p.id);
  for (const k of ["stem", "solution", "model"]) if (typeof p[k] !== "string" || !p[k]) errors.push(`${where}: missing ${k}`);
  if (![1, 2, 3].includes(p.difficulty)) errors.push(`${where}: bad difficulty`);
  if (!Array.isArray(p.choices) || p.choices.length < 4 || p.choices.length > 5) errors.push(`${where}: needs 4-5 choices`);
  if (!(p.answer >= 0 && p.answer < p.choices.length)) errors.push(`${where}: answer out of range`);
  if (new Set(p.choices).size !== p.choices.length) errors.push(`${where}: duplicate choice text`);
  if (!syllabus[p.topic] || !roman.slice(0, syllabus[p.topic]).includes(p.sub)) errors.push(`${where}: unknown syllabus code`);
  const key = `${p.topic}-${p.sub}`;
  cover[key] = (cover[key] || 0) + 1;
  // Unbalanced $ delimiters break rendering.
  for (const s of [p.stem, p.solution, ...p.choices]) if (((s.match(/(?<!\\)\$/g) || []).length) % 2) errors.push(`${where}: odd number of $ in "${s.slice(0, 40)}…"`);
  // A raw < or > inside TeX is parsed as HTML when the card is rendered; use \lt / \gt.
  for (const s of [p.stem, p.solution, ...p.choices]) for (const m of s.match(/\$[^$]*\$/g) || []) if (/[<>]/.test(m)) errors.push(`${where}: raw < or > inside TeX "${m.slice(0, 40)}"`);
  if (p.vals) {
    if (p.vals.length !== p.choices.length) errors.push(`${where}: vals length mismatch`);
    // nearOk marks deliberate close traps (e.g. sin vs tan of a small angle).
    const ans = p.vals[p.answer];
    p.vals.forEach((v, i) => {
      if (!p.nearOk && i !== p.answer && v != null && ans != null && close(v, ans, 0.02)) errors.push(`${where}: distractor ${i} (${v}) too close to answer (${ans})`);
    });
    if (typeof p.check === "function") {
      const c = p.check();
      checked++;
      if (!close(c, ans, 0.01)) errors.push(`${where}: check() = ${c} but answer value = ${ans}`);
    }
  }
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
console.log(`numerically checked: ${checked} (${Math.round((100 * checked) / P.length)}%)`);
warn.forEach((w) => console.log("warn:", w));
if (errors.length) { errors.forEach((e) => console.log("ERROR:", e)); process.exit(1); }
console.log("OK");
