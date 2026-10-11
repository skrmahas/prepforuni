/* Delft AE Drill: helpers for the generated cards (problems-*-gen.js). Load before them.
   A generated card is registered with g(id, subject, difficulty, model, calc, gen). gen(R) gets random tools
   and returns { stem, choices, answer, solution, vals?, check?, verify? }. If it throws (numbers that don't
   work out), it is rolled again. */
(function () {
  const G = typeof window !== "undefined" ? window : globalThis;
  G.PROBLEMS = G.PROBLEMS || [];

  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
  // Reduced fraction in TeX ("3", "-\tfrac{2}{5}").
  function fr(n, d = 1) {
    if (d < 0) { n = -n; d = -d; }
    const k = gcd(n, d); n /= k; d /= k;
    if (d === 1) return String(n);
    return (n < 0 ? "-" : "") + "\\tfrac{" + Math.abs(n) + "}{" + d + "}";
  }
  // Choice objects: s is the display text, v the numeric value (used to keep distractors apart).
  const Q = (n, d = 1) => ({ v: n / d, s: "$" + fr(n, d) + "$" });
  const T = (s, v) => ({ s: "$" + s + "$", v });
  const X = (s, v) => ({ s, v });
  const pm = n => (n < 0 ? "-" : "+") + Math.abs(n);          // append a constant: "+3" / "-3"
  const par = n => (n < 0 ? "(" + n + ")" : String(n));        // bracket negatives in products
  // Polynomial from [[coef, power], ...], highest power first: poly([[2,2],[-1,1],[3,0]]) = "2x^{2}-x+3".
  function poly(terms, v = "x") {
    let out = "";
    for (const [c, p] of terms) {
      if (!c) continue;
      const mono = p === 0 ? "" : p === 1 ? v : v + "^{" + p + "}";
      const a = Math.abs(c), coef = a === 1 && mono ? "" : String(a);
      out += (c < 0 ? "-" : out ? "+" : "") + coef + mono;
    }
    return out || "0";
  }
  // Same with fractional coefficients: [[num, den, power], ...].
  function fpoly(terms, v = "x") {
    let out = "";
    for (let [n, d, p] of terms) {
      if (!n) continue;
      if (d < 0) { n = -n; d = -d; }
      const mono = p === 0 ? "" : p === 1 ? v : v + "^{" + p + "}";
      const coef = Math.abs(n) === d && mono ? "" : fr(Math.abs(n), d);
      out += (n < 0 ? "-" : out ? "+" : "") + coef + mono;
    }
    return out || "0";
  }
  // Simplified square root of a whole number: 12 -> "2\sqrt{3}", 49 -> "7".
  function sqrtStr(N) {
    let k = 1, m = N;
    for (let f = 2; f * f <= m; f++) while (m % (f * f) === 0) { m /= f * f; k *= f; }
    return m === 1 ? String(k) : (k === 1 ? "" : k) + "\\sqrt{" + m + "}";
  }
  // A multiple of pi given in twelfths of pi: 4 -> "\tfrac{\pi}{3}", 18 -> "\tfrac{3\pi}{2}".
  function piA(n) {
    if (!n) return "0";
    const k = gcd(n, 12), a = n / k, b = 12 / k, num = (a === 1 ? "" : a) + "\\pi";
    return b === 1 ? num : "\\tfrac{" + num + "}{" + b + "}";
  }
  // Physics numbers: 3 significant figures, powers of ten outside 0.001 to 99 999.
  function fmt(x) {
    if (x === 0) return "0";
    const e = Math.floor(Math.log10(Math.abs(x)));
    if (e >= 5 || e <= -4) { const m = +(x / 10 ** e).toPrecision(3); return m + "\\times10^{" + e + "}"; }
    return String(+x.toPrecision(3));
  }
  // Correct answer first, then the first n-1 distractors that differ from everything chosen so far, in text and
  // (when known) by more than 2% in value. Too few usable distractors means the numbers get rolled again.
  function choose(correct, cands, n = 4) {
    const out = [correct], seen = new Set([correct.s]);
    for (const c of cands) {
      if (out.length >= n) break;
      if (!c || seen.has(c.s)) continue;
      if (c.v != null && !isFinite(c.v)) continue;
      if (c.v != null && out.some(o => o.v != null && Math.abs(o.v - c.v) <= 0.02 * Math.max(Math.abs(o.v), Math.abs(c.v)))) continue;
      seen.add(c.s); out.push(c);
    }
    if (out.length < n) throw new Error("retry");
    return { choices: out.map(c => c.s), answer: 0, vals: out.every(c => c.v != null) ? out.map(c => c.v) : undefined };
  }
  const integ = (f, a, b, n = 4000) => { let s = 0; const h = (b - a) / n; for (let i = 0; i < n; i++) s += f(a + (i + 0.5) * h); return s * h; };
  const deriv = (f, x, h = 1e-5) => (f(x + h) - f(x - h)) / (2 * h);
  const roots = (f, a, b, n = 20000) => { let c = 0, prev = f(a); for (let i = 1; i <= n; i++) { const v = f(a + (b - a) * i / n); if (prev * v < 0) c++; prev = v; } return c; };

  function tools(rnd) {
    const ri = (a, b) => a + Math.floor(rnd() * (b - a + 1));
    const pick = arr => arr[Math.floor(rnd() * arr.length)];
    const nz = (a, b) => { let v; do v = ri(a, b); while (v === 0); return v; };
    const shuf = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
    return { ri, pick, nz, shuf, rnd };
  }
  function g(id, subject, difficulty, model, calc, gen) {
    const [topic, sub] = id.split("-");
    G.PROBLEMS.push({ id, subject, topic, sub, difficulty, model, calc, figure: null, generated: true,
      gen(rnd) { for (let i = 0; ; i++) { try { return gen(tools(rnd)); } catch (e) { if (i > 80) throw e; } } } });
  }
  G.DRILL_GEN = { g, gcd, fr, Q, T, X, pm, par, poly, fpoly, sqrtStr, piA, fmt, choose, integ, deriv, roots };
})();
