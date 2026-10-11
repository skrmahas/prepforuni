/* Delft AE Drill: generated mathematics cards.
   Each card is a template: gen(rnd) rolls new numbers every time the card comes up, so a repeat is a fresh
   problem of the same type and the answer can't be remembered. The scheduler still tracks the card by its id.
   Original problems on the TU Delft AE selection exam syllabus, in the style of TU Delft Pre-University Calculus,
   VWO Wiskunde B and ENGAA/ESAT. Shared helpers live in problems-gen-lib.js. */
(function () {
  const G = typeof window !== "undefined" ? window : globalThis;
  const L = G.DRILL_GEN, t = String.raw;
  const { g, fr, Q, T, X, pm, par, poly, fpoly, sqrtStr, choose, integ, deriv, roots, gcd, piA } = L;
  const PC = "Pre-Uni Calculus", VWO = "VWO Wiskunde B", EN = "ENGAA/ESAT";
  const PI = Math.PI, sqrt = Math.sqrt;
  const mg = (id, d, model, calc, gen) => g(id, "math", d, model, calc, gen);
  const cf = k => (k === 1 ? "" : k === -1 ? "-" : String(k));          // coefficient in front of a symbol
  const xp = n => (n === 1 ? "x" : "x^{" + n + "}");

  /* ---------- M1 Functions and graphs ---------- */
  mg("M1-i-G01", 1, PC, false, R => {
    const a = R.pick([2, 3, 4, -2, -3]), b = R.nz(-5, 5), c = R.nz(-4, 4), k = R.nz(-3, 3);
    const gk = k * k + c, ans = a * gk + b, fk = a * k + b, gf = fk * fk + c;
    return { ...choose(Q(ans), [Q(gf), Q(a * k * k + c + b), Q(fk + gk), Q(a * k * k + b), Q(fk * gk)]),
      stem: t`Let $f(x)=${poly([[a, 1], [b, 0]])}$ and $g(x)=${poly([[1, 2], [c, 0]])}$. What is $f(g(${k}))$?`,
      solution: t`Work from the inside out: $g(${k})=${par(k)}^2${pm(c)}=${gk}$, so $f(g(${k}))=f(${gk})=${a}\cdot ${par(gk)}${pm(b)}=${ans}$. The other order gives $g(f(${k}))=${gf}$, a different number.`,
      check: () => a * (k * k + c) + b };
  });

  mg("M1-iii-G01", 2, PC, false, R => {
    const a = R.ri(2, 5), b = R.ri(2, 4), c = R.nz(-5, 5);
    const xm = poly([[1, 1], [-c, 0]]), xq = poly([[1, 1], [c, 0]]), ym = poly([[1, 1], [-c, 0]], "y");
    const Ln = num => t`\tfrac{1}{${b}}\ln\!\left(\dfrac{${num}}{${a}}\right)`;
    return { ...choose(T(Ln(xm)), [T(Ln(xq)), T(t`\tfrac{1}{${b}}\ln\!\left(\dfrac{x}{${a}}\right)${pm(-c)}`), T(t`${b}\ln\!\left(\dfrac{${xm}}{${a}}\right)`), T(t`\ln\!\left(\dfrac{${xm}}{${a * b}}\right)`)]),
      stem: t`What is the inverse function of $f(x)=${a}e^{${b}x}${pm(c)}$?`,
      solution: t`Write $y=${a}e^{${b}x}${pm(c)}$ and solve for $x$: $e^{${b}x}=\dfrac{${ym}}{${a}}$, so $${b}x=\ln\!\left(\dfrac{${ym}}{${a}}\right)$ and $x=\tfrac{1}{${b}}\ln\!\left(\dfrac{${ym}}{${a}}\right)$. Swap $x$ and $y$: $f^{-1}(x)=${Ln(xm)}$.` };
  });

  mg("M1-ii-G01", 1, VWO, false, R => {
    const a = R.nz(-5, 5), c = R.ri(1, 3), d = R.nz(-6, 6), b = R.nz(-6, 6);
    if (a * d - b * c === 0) throw 0;
    const A = (x, y) => X(t`vertical $x=${x}$, horizontal $y=${y}$`);
    return { ...choose(A(fr(-d, c), fr(a, c)), [A(fr(d, c), fr(a, c)), A(fr(-d, c), String(a)), A(fr(-b, a), fr(a, c)), A(fr(a, c), fr(-d, c)), A(fr(-d, c), fr(b, d))]),
      stem: t`What are the asymptotes of the graph of $f(x)=\dfrac{${poly([[a, 1], [b, 0]])}}{${poly([[c, 1], [d, 0]])}}$?`,
      solution: t`The denominator is zero at $x=${fr(-d, c)}$ and the numerator is not, so $x=${fr(-d, c)}$ is a vertical asymptote. For large $|x|$ only the $x$-terms matter: $f(x)\approx\dfrac{${poly([[a, 1]])}}{${poly([[c, 1]])}}=${fr(a, c)}$, so $y=${fr(a, c)}$ is the horizontal asymptote.` };
  });

  mg("M1-ii-G02", 2, VWO, false, R => {
    const p = R.ri(2, 6), s = p * p;
    const opts = { out: t`$x\lt -${p}$ or $x\gt ${p}$`, in: t`$-${p}\lt x\lt ${p}$`, outc: t`$x\le -${p}$ or $x\ge ${p}$`, inc: t`$-${p}\le x\le ${p}$`, pos: t`$x\gt ${p}$` };
    const [f, key, sol] = R.pick([
      [t`\ln(x^2-${s})`, "out", t`The logarithm needs $x^2-${s}\gt 0$, so $x^2\gt ${s}$: $x\lt -${p}$ or $x\gt ${p}$. Don't forget the left branch: $x\gt ${p}$ alone misses half the graph.`],
      [t`\ln(${s}-x^2)`, "in", t`The logarithm needs $${s}-x^2\gt 0$, so $x^2\lt ${s}$: $-${p}\lt x\lt ${p}$. The end points would give $\ln 0$, which is undefined.`],
      [t`\sqrt{x^2-${s}}`, "outc", t`The square root needs $x^2-${s}\ge 0$, so $x\le -${p}$ or $x\ge ${p}$. The end points are allowed because $\sqrt0=0$.`],
      [t`\dfrac{1}{\sqrt{${s}-x^2}}`, "in", t`The root needs $${s}-x^2\ge 0$ and the denominator may not be $0$, so $${s}-x^2\gt 0$: $-${p}\lt x\lt ${p}$.`]]);
    return { ...choose(X(opts[key]), R.shuf(Object.keys(opts).filter(k => k !== key)).map(k => X(opts[k]))),
      stem: t`What is the domain of $f(x)=${f}$?`, solution: sol };
  });

  mg("M1-ii-G03", 1, VWO, false, R => {
    const h = R.ri(1, 4), k = R.ri(2, 4), v = R.nz(-4, 4), av = Math.abs(v);
    const [f0, F] = R.pick([[t`e^{x}`, u => t`e^{${u}}`], [t`\ln x`, u => t`\ln(${u})`], [t`\sqrt{x}`, u => t`\sqrt{${u}}`], [t`x^2`, u => t`(${u})^2`]]);
    const sh = poly([[1, 1], [-h, 0]]), sp = poly([[1, 1], [h, 0]]), Y = s => T("y=" + s);
    return { ...choose(Y(`${k}${F(sh)}${pm(v)}`), R.shuf([Y(`${k}${F(sp)}${pm(v)}`), Y(`${k}(${F(sh)}${pm(v)})`), Y(`${F(poly([[k, 1], [-h, 0]]))}${pm(v)}`), Y(`${k}${F(poly([[1, 1], [-h + v, 0]]))}`)])),
      stem: t`The graph of $y=${f0}$ is shifted ${h} unit${h > 1 ? "s" : ""} to the right, then stretched vertically by a factor ${k}, then shifted ${av} unit${av > 1 ? "s" : ""} ${v > 0 ? "up" : "down"}. What is the equation of the new graph?`,
      solution: t`Shifting ${h} to the right replaces $x$ by $${sh}$: $y=${F(sh)}$. The vertical stretch multiplies the whole function by ${k}: $y=${k}${F(sh)}$. Finally move it ${v > 0 ? "up" : "down"} by ${av}: $y=${k}${F(sh)}${pm(v)}$. The order matters: moving it first and stretching afterwards would give $y=${k}(${F(sh)}${pm(v)})$.` };
  });

  /* ---------- M2 Algebraic solving ---------- */
  mg("M2-iii-G01", 1, VWO, false, R => {
    const a = R.pick([1, 1, 2, 3]), r = R.nz(-6, 6), m = R.nz(-7, 7);
    if (r * a === m) throw 0;
    const B = -(m + a * r), C = m * r;
    const set = (u, w) => {
      if (u[0] * w[1] === w[0] * u[1]) return null;
      const [p, q] = [u, w].sort((x, y) => x[0] / x[1] - y[0] / y[1]);
      return X(t`$x=${fr(p[0], p[1])}$ or $x=${fr(q[0], q[1])}$`);
    };
    const eq = poly([[a, 2], [B, 1], [C, 0]]), f1 = poly([[1, 1], [-r, 0]]), f2 = poly([[a, 1], [-m, 0]]);
    return { ...choose(set([r, 1], [m, a]), [set([-r, 1], [-m, a]), set([-r, 1], [m, a]), set([r, 1], [-m, a]), set([r, 1], [m, 1]), set([m, 1], [r, a])]),
      stem: t`Solve $${eq}=0$.`,
      solution: t`Factorise: $${eq}=(${f1})(${f2})$. A product is zero when a factor is zero: $x=${r}$ or ${a === 1 ? t`$x=${m}$` : t`$${a}x=${m}$, i.e. $x=${fr(m, a)}$`}. (Check: the product of the roots is $\tfrac{c}{a}=${fr(C, a)}$.)` };
  });

  mg("M2-ii-G01", 2, EN, false, R => {
    const b = R.pick([2, 3]), maxE = b === 2 ? 4 : 3, p = R.ri(0, maxE), q = R.ri(0, maxE);
    if (p === q) throw 0;
    const S = b ** p + b ** q, P = b ** (p + q);
    return { ...choose(Q(p + q), [Q(p * q), Q(S), Q(p + q + 1), Q(Math.abs(p - q)), Q(Math.max(p, q))]),
      stem: t`What is the sum of all real solutions of $${b}^{2x}-${S}\cdot ${b}^{x}+${P}=0$?`,
      solution: t`Put $u=${b}^x$, so $${b}^{2x}=u^2$: $u^2-${S}u+${P}=0$, which factorises as $(u-${b ** p})(u-${b ** q})=0$. So $${b}^x=${b ** p}$ or $${b}^x=${b ** q}$, giving $x=${p}$ or $x=${q}$. The sum is $${p + q}$.`,
      check: () => { const d = sqrt(S * S - 4 * P); return Math.round((Math.log((S + d) / 2) + Math.log((S - d) / 2)) / Math.log(b) * 1e6) / 1e6; } };
  });

  mg("M2-ii-G02", 2, VWO, false, R => {
    const b = R.pick([2, 3, 10]), k = R.ri(1, 5), r = R.ri(k + 1, k + 6), c = r * (r - k), o = k - r;
    const lg = b === 10 ? "\\log" : "\\log_{" + b + "}";
    return { ...choose(X(t`$x=${r}$ only`), [X(t`$x=${r}$ or $x=${o}$`), X(t`$x=${o}$ only`), X(t`$x=${fr(c + k, 2)}$ only`), X("no real solution")]),
      stem: t`Solve $${lg} x+${lg}(x-${k})=${lg} ${c}$.`,
      solution: t`Combine the logarithms: $${lg}\big(x(x-${k})\big)=${lg} ${c}$, so $${poly([[1, 2], [-k, 1], [-c, 0]])}=0$, i.e. $(x-${r})(x${pm(-o)})=0$, with roots $x=${r}$ and $x=${o}$. Both logarithms need a positive argument, so $x\gt ${k}$ and $x=${o}$ is rejected. Only $x=${r}$ remains. (Adding the arguments instead, $x+(x-${k})=${c}$, is the classic mistake.)` };
  });

  mg("M2-i-G01", 2, VWO, false, R => {
    const p = R.nz(-4, 4), q = R.nz(-6, 6), r = R.nz(-5, 5);
    if (p * r + q === 0) throw 0;
    const fx = x => (p * x + q) / (x - r), y0 = p + 2.5, ny = (a, c) => poly([[a, 1], [c, 0]], "y");
    const F = (num, den, xf) => X(t`$x=\dfrac{${num}}{${den}}$`, fx(xf(y0)));
    const num = poly([[p, 1], [q, 0]]), den = poly([[1, 1], [-r, 0]]);
    return { ...choose(F(ny(r, q), ny(1, -p), y => (r * y + q) / (y - p)), [F(ny(r, -q), ny(1, -p), y => (r * y - q) / (y - p)), F(ny(r, q), t`${p}-y`, y => (r * y + q) / (p - y)), F(ny(p, q), ny(1, -r), y => (p * y + q) / (y - r)), F(ny(q, r), ny(1, -p), y => (q * y + r) / (y - p))]),
      stem: t`Given $y=\dfrac{${num}}{${den}}$, express $x$ in terms of $y$.`,
      solution: t`Multiply both sides by $${den}$: $y(${den})=${num}$. Expand and collect the $x$-terms on the left: $x(${ny(1, -p)})=${ny(r, q)}$, so $x=\dfrac{${ny(r, q)}}{${ny(1, -p)}}$.`,
      check: () => y0 };
  });

  mg("M2-iv-G01", 1, VWO, false, R => {
    const x = R.ri(-6, 6), y = R.ri(-6, 6), a1 = R.nz(-5, 5), b1 = R.nz(-5, 5), a2 = R.nz(-5, 5), b2 = R.nz(-5, 5);
    const det = a1 * b2 - a2 * b1; if (!det) throw 0;
    const c1 = a1 * x + b1 * y, c2 = a2 * x + b2 * y;
    const lin = (a, b) => poly([[a, 1]]) + poly([[b, 1]], "y").replace(/^(?!-)/, "+");
    const asks = [["x+y", x + y], ["xy", x * y], ["x-y", x - y]], [lab, ans] = R.pick(asks);
    return { ...choose(Q(ans), asks.filter(a => a[0] !== lab).map(a => Q(a[1])).concat([Q(y - x), Q(x), Q(y), Q(-ans)])),
      stem: t`Given $${lin(a1, b1)}=${c1}$ and $${lin(a2, b2)}=${c2}$, what is $${lab}$?`,
      solution: t`Eliminate $y$: multiply the first equation by $${par(b2)}$ and the second by $${par(b1)}$ and subtract. That leaves $${det}x=${c1 * b2 - c2 * b1}$, so $x=${x}$. Substituting back gives $y=${y}$, so $${lab}=${ans}$.`,
      check: () => { const X0 = (c1 * b2 - c2 * b1) / det, Y0 = (a1 * c2 - a2 * c1) / det; return lab === "x+y" ? X0 + Y0 : lab === "xy" ? X0 * Y0 : X0 - Y0; } };
  });

  mg("M2-ii-G03", 1, VWO, false, R => {
    const r1 = R.ri(-6, 4), r2 = R.ri(r1 + 1, 7), rel = R.pick(["\\lt", "\\gt", "\\le", "\\ge"]);
    const forms = { "\\lt": t`$${r1}\lt x\lt ${r2}$`, "\\gt": t`$x\lt ${r1}$ or $x\gt ${r2}$`, "\\le": t`$${r1}\le x\le ${r2}$`, "\\ge": t`$x\le ${r1}$ or $x\ge ${r2}$`, neg: t`$${-r2}\lt x\lt ${-r1}$` };
    const inside = rel === "\\lt" || rel === "\\le";
    return { ...choose(X(forms[rel]), R.shuf(Object.keys(forms).filter(k => k !== rel)).map(k => X(forms[k]))),
      stem: t`Solve $${poly([[1, 2], [-(r1 + r2), 1], [r1 * r2, 0]])}${rel} 0$.`,
      solution: t`Factorise: $(${poly([[1, 1], [-r1, 0]])})(${poly([[1, 1], [-r2, 0]])})${rel} 0$. The parabola opens upward and is zero at $x=${r1}$ and $x=${r2}$, so it is negative between the roots and positive outside them. We need the part ${inside ? "below" : "above"} the axis${rel === "\\le" || rel === "\\ge" ? ", including the roots" : ""}: ${forms[rel]}.` };
  });

  mg("M2-ii-G04", 3, EN, false, R => {
    const a = R.ri(-5, 5), b = R.ri(-5, 5); if (a === b) throw 0;
    const rel = R.pick(["\\le", "\\lt", "\\ge", "\\gt"]), incl = rel === "\\le" || rel === "\\ge", between = rel === "\\le" || rel === "\\lt";
    const lo = Math.min(a, b), hi = Math.max(a, b), cL = incl && lo === a, cR = incl && hi === a;
    const btw = (iL, iR) => X(t`$${lo}${iL ? "\\le" : "\\lt"} x${iR ? "\\le" : "\\lt"} ${hi}$`);
    const outs = (iL, iR) => X(t`$x${iL ? "\\le" : "\\lt"} ${lo}$ or $x${iR ? "\\ge" : "\\gt"} ${hi}$`);
    const correct = between ? btw(cL, cR) : outs(cL, cR);
    const cands = between ? [btw(true, true), outs(cL, cR), btw(!cL, !cR), btw(false, false), outs(true, true)] : [outs(true, true), btw(cL, cR), outs(!cL, !cR), outs(false, false), btw(true, true)];
    return { ...choose(correct, cands),
      stem: t`Solve $\dfrac{${poly([[1, 1], [-a, 0]])}}{${poly([[1, 1], [-b, 0]])}}${rel} 0$.`,
      solution: t`The fraction is zero at $x=${a}$ (numerator) and undefined at $x=${b}$ (denominator). Between ${lo} and ${hi} the numerator and denominator have opposite signs, so the fraction is negative there and positive outside. ${incl ? t`Equality is allowed, so $x=${a}$ is included, but $x=${b}$ never is.` : "The inequality is strict, so neither end point is included."} Answer: ${correct.s}.`,
      verify: () => {
        for (let x = -8; x <= 8; x += 0.25) {
          if (x === b) continue;
          const truth = { "\\le": (x - a) / (x - b) <= 0, "\\lt": (x - a) / (x - b) < 0, "\\ge": (x - a) / (x - b) >= 0, "\\gt": (x - a) / (x - b) > 0 }[rel];
          const inBtw = (x > lo || (cL && x === lo)) && (x < hi || (cR && x === hi)), inOut = (x < lo || (cL && x === lo)) || (x > hi || (cR && x === hi));
          if (truth !== (between ? inBtw : inOut)) return false;
        }
        return true;
      } };
  });

  /* ---------- M3 Differential calculus ---------- */
  mg("M3-i-G01", 2, PC, false, R => {
    const n = R.ri(2, 4), k = R.nz(-3, 3), kx = poly([[k, 1]]);
    const E = c => (c === 0 ? T("0", 0) : T(cf(c) + "e^{" + k + "}", c * Math.exp(k)));
    return { ...choose(E(n + k), [E(n), E(k), E(n * k), E(n - k), E(n + 1)]),
      stem: t`Let $f(x)=${xp(n)}e^{${kx}}$. What is $f'(1)$?`,
      solution: t`Product rule, with the chain rule for $e^{${kx}}$: $f'(x)=${n}${xp(n - 1)}e^{${kx}}+${xp(n)}\cdot ${par(k)}e^{${kx}}=e^{${kx}}${xp(n - 1)}(${poly([[n, 0], [k, 1]])})$. At $x=1$: $f'(1)=(${n}${pm(k)})e^{${k}}=${E(n + k).s.slice(1, -1)}$. Forgetting the product rule gives only one of the two terms.`,
      check: () => deriv(x => x ** n * Math.exp(k * x), 1) };
  });

  mg("M3-i-G02", 1, PC, false, R => {
    const a = R.pick([2, 3, -2]), b = R.nz(-3, 3), n = R.pick([3, 4]), x0 = R.pick([0, 1, -1]), u = a * x0 + b;
    if (u === 0 || Math.abs(u) > 4) throw 0;
    const ans = n * a * u ** (n - 1), inner = poly([[a, 1], [b, 0]]);
    return { ...choose(Q(ans), [Q(n * u ** (n - 1)), Q(a * u ** (n - 1)), Q(n * a * u ** n), Q(-ans), Q((n - 1) * a * u ** (n - 1))]),
      stem: t`Let $f(x)=(${inner})^{${n}}$. What is $f'(${x0})$?`,
      solution: t`Chain rule: $f'(x)=${n}(${inner})^{${n - 1}}\cdot ${par(a)}$. At $x=${x0}$ the bracket is $${u}$, so $f'(${x0})=${n}\cdot ${par(u)}^{${n - 1}}\cdot ${par(a)}=${ans}$. Forgetting the inner derivative ${a} gives ${n * u ** (n - 1)}.`,
      check: () => Math.round(deriv(x => (a * x + b) ** n, x0) * 1e4) / 1e4 };
  });

  mg("M3-i-G03", 2, PC, false, R => {
    const a = R.nz(-4, 4), b = R.nz(-5, 5), c = R.ri(1, 3), d = R.nz(-4, 4), x0 = R.ri(-2, 3);
    const D = a * d - b * c, den = c * x0 + d; if (!D || !den) throw 0;
    const num = poly([[a, 1], [b, 0]]), dn = poly([[c, 1], [d, 0]]);
    return { ...choose(Q(D, den * den), [Q(-D, den * den), Q(D, den), Q(a, c), Q(a * den + c * (a * x0 + b), den * den)]),
      stem: t`Let $f(x)=\dfrac{${num}}{${dn}}$. What is $f'(${x0})$?`,
      solution: t`Quotient rule: $f'(x)=\dfrac{${par(a)}(${dn})-(${num})\cdot ${par(c)}}{(${dn})^2}=\dfrac{${D}}{(${dn})^2}$, because the $x$-terms cancel. At $x=${x0}$ the denominator is $(${den})^2=${den * den}$, so $f'(${x0})=${fr(D, den * den)}$.`,
      check: () => deriv(x => (a * x + b) / (c * x + d), x0) };
  });

  mg("M3-i-G04", 2, PC, false, R => {
    const k = R.ri(2, 5), useCos = R.rnd() < 0.5, x1 = 0.3, s = useCos ? -1 : 1;
    const fn = useCos ? "\\cos" : "\\sin", other = useCos ? "\\sin" : "\\cos", M = useCos ? Math.cos : Math.sin, O = useCos ? Math.sin : Math.cos;
    const neg = v => (v < 0 ? "-" : "");
    return { ...choose(T(t`${neg(s)}${k}\sin(${2 * k}x)`, s * k * Math.sin(2 * k * x1)), [
        T(t`${neg(s)}2\sin(${k}x)\cos(${k}x)`, s * 2 * Math.sin(k * x1) * Math.cos(k * x1)),
        T(t`${neg(-s)}${k}\sin(${2 * k}x)`, -s * k * Math.sin(2 * k * x1)),
        T(t`2${fn}(${k}x)`, 2 * M(k * x1)),
        T(t`${2 * k}${other}(${k}x)`, 2 * k * O(k * x1))]),
      stem: t`What is $f'(x)$ for $f(x)=${fn}^2(${k}x)$?`,
      solution: t`Write $f(x)=\big(${fn}(${k}x)\big)^2$ and use the chain rule twice: $f'(x)=2${fn}(${k}x)\cdot ${useCos ? t`\big(-\sin(${k}x)\big)` : t`\cos(${k}x)`}\cdot ${k}$. With $2\sin u\cos u=\sin 2u$ this is $${neg(s)}${k}\sin(${2 * k}x)$. Leaving out the factor ${k} from the inner function is the usual slip.`,
      check: () => deriv(x => M(k * x) ** 2, x1) };
  });

  mg("M3-ii-G01", 2, VWO, false, R => {
    const a = R.ri(-3, 3), b = R.ri(-2, 4); if (a >= b || (a + b) % 2) throw 0;
    const c = R.ri(-5, 5), B = -3 * (a + b) / 2, C = 3 * a * b;
    const f = x => x ** 3 + B * x * x + C * x + c, fa = f(a), fb = f(b);
    return { ...choose(Q(fa), [Q(fb), Q(a), Q(c), Q(-fa), Q(b)]),
      stem: t`What is the local maximum value of $f(x)=${poly([[1, 3], [B, 2], [C, 1], [c, 0]])}$?`,
      solution: t`$f'(x)=${poly([[3, 2], [2 * B, 1], [C, 0]])}=3(${poly([[1, 1], [-a, 0]])})(${poly([[1, 1], [-b, 0]])})$, which is zero at $x=${a}$ and $x=${b}$. $f'$ is positive for $x\lt ${a}$ and negative between the roots, so the maximum is at $x=${a}$: $f(${a})=${fa}$. (At $x=${b}$ there is a local minimum, $f(${b})=${fb}$.) The question asks for the value, not the $x$-coordinate.`,
      check: () => { let best = null; const N = 4000, x0 = a - 2, step = (b - a + 4) / N; let prev = deriv(f, x0); for (let i = 1; i <= N; i++) { const x = x0 + i * step, cur = deriv(f, x); if (prev > 0 && cur <= 0) best = f(x - step / 2); prev = cur; } return Math.round(best * 100) / 100; } };
  });

  mg("M3-iii-G01", 1, VWO, false, R => {
    const a = R.nz(-3, 3), b = R.ri(-5, 5), c = R.ri(-5, 5), x0 = R.nz(-3, 3);
    const f = x => a * x * x + b * x + c, m = 2 * a * x0 + b, y0 = f(x0), k = y0 - m * x0, xt = x0 + 1.7, m2 = a * x0 + b;
    const Ln = (s, i) => T("y=" + poly([[s, 1], [i, 0]]), s * xt + i);
    return { ...choose(Ln(m, k), [Ln(m, y0 + m * x0), Ln(m2, y0 - m2 * x0), Ln(m, y0), Ln(-m, y0 + m * x0)]),
      stem: t`What is the equation of the tangent line to $y=${poly([[a, 2], [b, 1], [c, 0]])}$ at $x=${x0}$?`,
      solution: t`The point of contact is $(${x0},\,${y0})$. The slope is $y'(${x0})$ with $y'=${poly([[2 * a, 1], [b, 0]])}$, so $m=${m}$. Then $${poly([[1, 1], [-y0, 0]], "y")}=${m}(${poly([[1, 1], [-x0, 0]])})$, which gives $y=${poly([[m, 1], [k, 0]])}$.`,
      check: () => y0 + deriv(f, x0) * (xt - x0) };
  });

  mg("M3-iii-G02", 2, EN, false, R => {
    if (R.rnd() < 0.5) {
      const Lf = R.pick([48, 60, 72, 96, 120, 144]), A = Lf * Lf / 8, U = v => T(v + t`\ \text{m}^2`, v);
      return { ...choose(U(A), [U(Lf * Lf / 9), U(Lf * Lf / 16), U(Lf * Lf / 4), U(Lf * Lf / 6)]),
        stem: t`A farmer has ${Lf} m of fencing to enclose a rectangular field along a straight river. No fence is needed along the river. What is the largest area that can be enclosed?`,
        solution: t`Let $x$ be the two sides at right angles to the river; the side parallel to it is $${Lf}-2x$. The area is $A(x)=x(${Lf}-2x)=${Lf}x-2x^2$, and $A'(x)=${Lf}-4x=0$ gives $x=${Lf / 4}$ m. The parallel side is then ${Lf / 2} m, so $A=${Lf / 4}\cdot ${Lf / 2}=${A}\ \text{m}^2$. Splitting the fence into three equal sides gives only ${Lf * Lf / 9}.`,
        check: () => { let best = 0; for (let i = 1; i < 20000; i++) { const x = Lf / 2 * i / 20000; best = Math.max(best, x * (Lf - 2 * x)); } return best; } };
    }
    const m = R.ri(1, 4), V = 4 * m ** 3, S = 12 * m * m, U = v => T(v + t`\ \text{cm}^2`, v);
    return { ...choose(U(S), [U(16 * m * m), U(17 * m * m), U(8 * m * m), U(20 * m * m)]),
      stem: t`An open box (no lid) with a square base must hold ${V} cm³. What is the smallest possible total surface area of the box?`,
      solution: t`Base side $x$, height $h$: $x^2h=${V}$, so $h=\dfrac{${V}}{x^2}$. The area is $S=x^2+4xh=x^2+\dfrac{${4 * V}}{x}$. Then $S'=2x-\dfrac{${4 * V}}{x^2}=0$ gives $x^3=${2 * V}$, so $x=${2 * m}$ and $h=${m}$. That makes $S=${4 * m * m}+${8 * m * m}=${S}\ \text{cm}^2$.`,
      check: () => { let best = Infinity; for (let i = 1; i < 40000; i++) { const x = 10 * m * i / 40000; best = Math.min(best, x * x + 4 * V / x); } return best; } };
  });

  mg("M3-ii-G02", 2, PC, false, R => {
    const k = R.ri(2, 5);
    if (R.rnd() < 0.5) {
      const o = { a: t`$x\lt \tfrac{1}{${k}}$`, b: t`$x\gt \tfrac{1}{${k}}$`, c: t`$x\lt ${k}$`, d: t`$x\gt ${k}$`, e: t`$x\gt 0$` };
      return { ...choose(X(o.a), R.shuf([X(o.b), X(o.c), X(o.d), X(o.e)])),
        stem: t`On which interval is $f(x)=xe^{-${k}x}$ increasing?`,
        solution: t`Product rule: $f'(x)=e^{-${k}x}-${k}xe^{-${k}x}=e^{-${k}x}(1-${k}x)$. The exponential is always positive, so $f'(x)\gt 0$ exactly when $1-${k}x\gt 0$, i.e. $x\lt \tfrac{1}{${k}}$.`,
        verify: () => [-2, -0.5, 0.5 / k, 2 / k, 3].every(x => (deriv(z => z * Math.exp(-k * z), x) > 0) === (x < 1 / k)) };
    }
    const e2 = fr(2, k), o = { a: t`$0\lt x\lt ${e2}$`, b: t`$x\lt ${e2}$`, c: t`$x\gt ${e2}$`, d: t`$x\lt 0$ or $x\gt ${e2}$` };
    return { ...choose(X(o.a), R.shuf([X(o.b), X(o.c), X(o.d)])),
      stem: t`On which interval is $f(x)=x^2e^{-${k}x}$ increasing?`,
      solution: t`Product rule: $f'(x)=2xe^{-${k}x}-${k}x^2e^{-${k}x}=xe^{-${k}x}(2-${k}x)$. The exponential is positive, so the sign is that of $x(2-${k}x)$: positive only for $0\lt x\lt ${e2}$. For $x\lt 0$ the function decreases towards its minimum at $x=0$.`,
      verify: () => [-1, -0.1, 0.5 / k, 1.5 / k, 3 / k, 4].every(x => (deriv(z => z * z * Math.exp(-k * z), x) > 0) === (x > 0 && x < 2 / k)) };
  });

  mg("M3-i-G05", 2, VWO, false, R => {
    const a = R.ri(1, 3), b = R.ri(1, 5), x0 = R.ri(1, 3), D = a * x0 * x0 + b;
    return { ...choose(Q(2 * a * x0, D), [Q(1, D), Q(2 * x0, D), Q(2 * a * x0), Q(a * x0, D), Q(2 * a * x0, D * D)]),
      stem: t`Let $f(x)=\ln(${poly([[a, 2], [b, 0]])})$. What is $f'(${x0})$?`,
      solution: t`Chain rule: $f'(x)=\dfrac{1}{${poly([[a, 2], [b, 0]])}}\cdot ${2 * a}x$. At $x=${x0}$: $f'(${x0})=\dfrac{${2 * a * x0}}{${D}}${gcd(2 * a * x0, D) > 1 ? "=" + fr(2 * a * x0, D) : ""}$.`,
      check: () => deriv(x => Math.log(a * x * x + b), x0) };
  });

  /* ---------- M4 Integral calculus ---------- */
  mg("M4-i-G01", 1, PC, false, R => {
    const a = R.nz(-3, 4), b = R.ri(-4, 4), c = R.ri(-5, 5), m = R.ri(1, 3);
    const num = 2 * a * m ** 3 + 3 * b * m * m + 6 * c * m, f = x => a * x * x + b * x + c;
    return { ...choose(Q(num, 6), [Q(a * m ** 3 + b * m * m + c * m), Q(2 * a * m + b), Q(3 * a * m ** 3 + 2 * b * m * m + 6 * c * m, 6), Q(a * m * m + b * m + c)]),
      stem: t`Evaluate $\displaystyle\int_0^{${m}}(${poly([[a, 2], [b, 1], [c, 0]])})\,dx$.`,
      solution: t`An antiderivative is $F(x)=${fpoly([[a, 3, 3], [b, 2, 2], [c, 1, 1]])}$. The integral is $F(${m})-F(0)=${fr(num, 6)}$. Remember to divide by the new power: $x^2$ becomes $\tfrac13x^3$.`,
      check: () => integ(f, 0, m) };
  });

  mg("M4-ii-G01", 2, PC, false, R => {
    const k = R.pick([2, 3]), a = R.ri(2, k === 3 ? 4 : 6), m = R.ri(1, 4), A = a ** k;
    return { ...choose(Q(m * (A - 1), k), [Q(m * (A - 1)), Q(m * A, k), Q(m * (a - 1), k), Q(m * k * (A - 1)), Q(m * (a ** (k + 1) - 1), k + 1)]),
      stem: t`Evaluate $\displaystyle\int_0^{\ln ${a}} ${cf(m)}e^{${k}x}\,dx$.`,
      solution: t`An antiderivative of $${cf(m)}e^{${k}x}$ is $${fr(m, k)}e^{${k}x}$. So the integral is $${fr(m, k)}\left(e^{${k}\ln ${a}}-e^0\right)=${fr(m, k)}\left(${a}^{${k}}-1\right)=${fr(m * (A - 1), k)}$, using $e^{${k}\ln ${a}}=\left(e^{\ln ${a}}\right)^{${k}}=${A}$.`,
      check: () => integ(x => m * Math.exp(k * x), 0, Math.log(a)) };
  });

  mg("M4-ii-G02", 1, PC, false, R => {
    const k = R.ri(2, 4), m = R.ri(1, 6);
    if (R.rnd() < 0.5) return { ...choose(Q(m, k), [Q(m * k), Q(m), Q(-m, k), Q(m, 2 * k), Q(2 * m, k)]),
      stem: t`Evaluate $\displaystyle\int_0^{\pi/${2 * k}} ${cf(m)}\cos(${k}x)\,dx$.`,
      solution: t`An antiderivative is $\tfrac{${m}}{${k}}\sin(${k}x)$ (divide by the inner derivative ${k}). So the integral is $\tfrac{${m}}{${k}}\left(\sin\tfrac{\pi}{2}-\sin 0\right)=${fr(m, k)}$.`,
      check: () => integ(x => m * Math.cos(k * x), 0, PI / (2 * k)) };
    return { ...choose(Q(2 * m, k), [Q(m, k), Q(2 * m * k), Q(0), Q(-2 * m, k), Q(m)]),
      stem: t`Evaluate $\displaystyle\int_0^{\pi/${k}} ${cf(m)}\sin(${k}x)\,dx$.`,
      solution: t`An antiderivative is $-\tfrac{${m}}{${k}}\cos(${k}x)$. So the integral is $-\tfrac{${m}}{${k}}(\cos\pi-\cos 0)=-\tfrac{${m}}{${k}}(-1-1)=${fr(2 * m, k)}$. On this interval $\sin(${k}x)\ge 0$, so the answer must be positive.`,
      check: () => integ(x => m * Math.sin(k * x), 0, PI / k) };
  });

  mg("M4-ii-G03", 2, PC, false, R => {
    const c = R.ri(2, 4), k = R.ri(1, 4), N = c * k + 1, Lg = Math.log(N);
    return { ...choose(T(t`\tfrac{1}{${c}}\ln ${N}`, Lg / c), [T(t`\ln ${N}`, Lg), T(t`${c}\ln ${N}`, c * Lg), T(t`\tfrac{${k}}{${N}}`, k / N), T(t`\tfrac{1}{${c}}\ln ${c * k}`, Math.log(c * k) / c)]),
      stem: t`Evaluate $\displaystyle\int_0^{${k}}\dfrac{1}{${c}x+1}\,dx$.`,
      solution: t`An antiderivative is $\tfrac{1}{${c}}\ln|${c}x+1|$ (the factor $\tfrac{1}{${c}}$ undoes the inner derivative ${c}). So the integral is $\tfrac{1}{${c}}(\ln ${N}-\ln 1)=\tfrac{1}{${c}}\ln ${N}$.`,
      check: () => integ(x => 1 / (c * x + 1), 0, k) };
  });

  mg("M4-iii-G01", 2, VWO, false, R => {
    if (R.rnd() < 0.5) {
      const m = R.ri(2, 6);
      return { ...choose(Q(m ** 3, 6), [Q(m ** 3, 2), Q(m ** 3, 3), Q(m * m, 2), Q(m ** 3), Q(m ** 3, 12)]),
        stem: t`What is the area of the region enclosed by $y=x^2$ and $y=${m}x$?`,
        solution: t`The graphs meet where $x^2=${m}x$: at $x=0$ and $x=${m}$. In between, the line lies above the parabola, so $A=\displaystyle\int_0^{${m}}(${m}x-x^2)\,dx=\left[${fpoly([[m, 2, 2], [-1, 3, 3]])}\right]_0^{${m}}=${fr(m ** 3, 2)}-${fr(m ** 3, 3)}=${fr(m ** 3, 6)}$.`,
        check: () => integ(x => m * x - x * x, 0, m) };
    }
    const p = R.ri(1, 4), s = p * p;
    return { ...choose(Q(4 * p ** 3, 3), [Q(2 * p ** 3, 3), Q(2 * p ** 3), Q(8 * p ** 3, 3), Q(p ** 3, 3), Q(4 * p ** 3)]),
      stem: t`What is the area of the region enclosed by $y=x^2$ and $y=${s}$?`,
      solution: t`They meet at $x=\pm${p}$. The line lies above the parabola there, so $A=\displaystyle\int_{-${p}}^{${p}}(${s}-x^2)\,dx=\left[${s}x-\tfrac13x^3\right]_{-${p}}^{${p}}=${2 * p * s}-${fr(2 * p ** 3, 3)}=${fr(4 * p ** 3, 3)}$.`,
      check: () => integ(x => s - x * x, -p, p) };
  });

  mg("M4-iii-G02", 2, VWO, false, R => {
    const k = R.ri(1, 4), a = R.ri(1, 5);
    const P = (n, d) => { const v = n / d; return T((v === 1 ? "" : fr(n, d)) + "\\pi", PI * v); };
    if (R.rnd() < 0.5) return { ...choose(P(k * k * a * a, 2), [P(k * k * a * a, 1), P(k * k * a ** 3, 3), P(k * a * a, 2), P(k * k * a * a, 4)]),
      stem: t`The region under $y=${cf(k)}\sqrt{x}$ for $0\le x\le ${a}$ is rotated about the $x$-axis. What is the volume of the solid?`,
      solution: t`$V=\pi\displaystyle\int_0^{${a}} y^2\,dx=\pi\int_0^{${a}} ${cf(k * k)}x\,dx=\pi\left[${fpoly([[k * k, 2, 2]])}\right]_0^{${a}}=${P(k * k * a * a, 2).s.slice(1, -1)}$. Square the whole function${k > 1 ? t`, including the factor ${k}` : ""}.`,
      check: () => PI * integ(x => k * k * x, 0, a) };
    return { ...choose(P(k * k * a ** 3, 3), [P(k * k * a ** 3, 1), P(k * a ** 3, 3), P(k * k * a * a, 2), P(k * a * a, 2)]),
      stem: t`The region under $y=${cf(k)}x$ for $0\le x\le ${a}$ is rotated about the $x$-axis, giving a cone. What is its volume?`,
      solution: t`$V=\pi\displaystyle\int_0^{${a}} (${cf(k)}x)^2\,dx=\pi\int_0^{${a}} ${cf(k * k)}x^2\,dx=\pi\left[${fpoly([[k * k, 3, 3]])}\right]_0^{${a}}=${P(k * k * a ** 3, 3).s.slice(1, -1)}$. This matches the cone formula $\tfrac13\pi r^2h$ with $r=${k * a}$ and $h=${a}$.`,
      check: () => PI * integ(x => k * k * x * x, 0, a) };
  });

  mg("M4-iii-G03", 2, PC, false, R => {
    const b = R.nz(-3, 3), c = R.ri(-4, 4), a = R.ri(1, 4), f = x => b * x * x + c;
    return { ...choose(Q(b * a * a + 3 * c, 3), [Q(b * a * a + 2 * c, 2), Q(b * a ** 3 + 3 * c * a, 3), Q(b * a * a + 4 * c, 4), Q(b * a * a + c)]),
      stem: t`What is the mean value of $f(x)=${poly([[b, 2], [c, 0]])}$ on the interval $[0,\,${a}]$?`,
      solution: t`The mean value is $\dfrac{1}{${a}}\displaystyle\int_0^{${a}} f(x)\,dx=\dfrac{1}{${a}}\left[${fpoly([[b, 3, 3], [c, 1, 1]])}\right]_0^{${a}}=${fr(b * a * a + 3 * c, 3)}$. Averaging only the end values, $\tfrac12\big(f(0)+f(${a})\big)$, is a different (wrong) number for a curved graph.`,
      check: () => integ(f, 0, a) / a };
  });

  /* ---------- M5 Trigonometry ---------- */
  const EXACT = [[0, "0"], [0.5, t`\tfrac12`], [Math.SQRT1_2, t`\tfrac{\sqrt2}{2}`], [sqrt(3) / 2, t`\tfrac{\sqrt3}{2}`], [1, "1"], [sqrt(3), t`\sqrt3`], [sqrt(3) / 3, t`\tfrac{\sqrt3}{3}`]];
  const exact = x => { for (const [e, s] of EXACT) if (Math.abs(Math.abs(x) - e) < 1e-9) return T((x < 0 && e ? "-" : "") + s, x); throw 0; };
  mg("M5-ii-G01", 1, VWO, false, R => {
    const fam = R.pick([6, 4]), n = R.pick(fam === 6 ? [1, 2, 4, 5, 7, 8, 10, 11] : [1, 3, 5, 7]), ang = n * PI / fam;
    const fn = R.pick(["sin", "cos", "tan"]), F = "\\" + fn, v = Math[fn](ang), a12 = n * 12 / fam;
    const pool = (fam === 6 ? [0.5, sqrt(3) / 2, sqrt(3), sqrt(3) / 3] : [Math.SQRT1_2, 1]).flatMap(x => [x, -x]);
    const comp = fn === "sin" ? Math.cos(ang) : fn === "cos" ? Math.sin(ang) : 1 / v;
    const q = Math.floor(ang / (PI / 2)), refN = Math.min(a12 % 12, 12 - (a12 % 12));
    return { ...choose(exact(v), [exact(-v), exact(comp)].concat(R.shuf(pool).map(exact))),
      stem: t`What is the exact value of $${F}\!\left(${piA(a12)}\right)$?`,
      solution: t`The angle $${piA(a12)}$ lies in quadrant ${["I", "II", "III", "IV"][q]}, with reference angle $${piA(refN)}$. There $${F}$ is ${v < 0 ? "negative" : "positive"}, so $${F}\!\left(${piA(a12)}\right)=${exact(v).s.slice(1, -1)}$.`,
      check: () => Math[fn](ang) };
  });

  const CVALS = [[0.5, t`\tfrac12`], [-0.5, t`-\tfrac12`], [Math.SQRT1_2, t`\tfrac{\sqrt2}{2}`], [-Math.SQRT1_2, t`-\tfrac{\sqrt2}{2}`], [sqrt(3) / 2, t`\tfrac{\sqrt3}{2}`], [-sqrt(3) / 2, t`-\tfrac{\sqrt3}{2}`]];
  mg("M5-iii-G01", 2, EN, false, R => {
    const k = R.ri(2, 4), fn = R.pick(["sin", "cos"]), F = "\\" + fn, [c, cTex] = R.pick(CVALS), full = R.rnd() < 0.6, Lr = full ? 2 * PI : PI;
    const N = roots(x => Math[fn](k * x) - c, 0, Lr, 99991);   // prime step count: no grid point lands exactly on a root
    const periods = full ? k : k / 2, uEnd = full ? 2 * k : k;
    const how = Number.isInteger(periods)
      ? t`which is exactly ${periods} period${periods > 1 ? "s" : ""} of $${F} u$. Each period gives 2 solutions, so there are ${N}.`
      : t`which is ${(k - 1) / 2} full period${k > 3 ? "s" : ""} (giving ${k - 1} solutions) plus an extra half period, $[${k - 1}\pi,${k}\pi)$, where the graph meets the line $y=${cTex}$ ${N - (k - 1)} more time${N - (k - 1) === 1 ? "" : "s"}. That makes ${N}.`;
    return { ...choose(Q(N), [Q(2 * k), Q(k), Q(4 * k), Q(N + 1), Q(N - 1), Q(N + 2)]),
      stem: t`How many solutions does $${F}(${k}x)=${cTex}$ have for $0\le x\lt ${full ? "2\\pi" : "\\pi"}$?`,
      solution: t`Put $u=${k}x$. As $x$ runs over $[0,${full ? "2\\pi" : "\\pi"})$, $u$ runs over $[0,${uEnd}\pi)$, ${how}`,
      check: () => roots(x => Math[fn](k * x) - c, 1e-7, Lr - 1e-7, 39989) };
  });

  mg("M5-iv-G01", 2, VWO, false, R => {
    const [p, q, h] = R.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]), quad = R.pick([2, 3, 4]), giveSin = R.rnd() < 0.5;
    let [s, c] = R.rnd() < 0.5 ? [p, q] : [q, p];
    const sg = { 2: [1, -1], 3: [-1, -1], 4: [-1, 1] }[quad]; s *= sg[0]; c *= sg[1];
    const ord = ["", "first", "second", "third", "fourth"][quad], given = giveSin ? t`\sin\theta=${fr(s, h)}` : t`\cos\theta=${fr(c, h)}`;
    const kind = R.pick(["other", "tan", "sin2", "cos2"]);
    let ask, ans, cands, last;
    if (kind === "other") { ask = giveSin ? t`\cos\theta` : t`\sin\theta`; const o = giveSin ? c : s, gv = giveSin ? s : c; ans = Q(o, h); cands = [Q(-o, h), Q(Math.sign(o) * Math.abs(gv), h), Q(o, gv), Q(h, o)]; last = t`$${ask}=${fr(o, h)}$.`; }
    else if (kind === "tan") { ask = t`\tan\theta`; ans = Q(s, c); cands = [Q(-s, c), Q(c, s), Q(-c, s), Q(s, h)]; last = t`$\tan\theta=\dfrac{\sin\theta}{\cos\theta}=${fr(s, c)}$.`; }
    else if (kind === "sin2") { ask = t`\sin 2\theta`; ans = Q(2 * s * c, h * h); cands = [Q(-2 * s * c, h * h), Q(s * c, h * h), Q(2 * s * c, h), Q(c * c - s * s, h * h)]; last = t`$\sin 2\theta=2\sin\theta\cos\theta=2\cdot ${fr(s, h)}\cdot ${fr(c, h)}=${fr(2 * s * c, h * h)}$.`; }
    else { ask = t`\cos 2\theta`; ans = Q(c * c - s * s, h * h); cands = [Q(s * s - c * c, h * h), Q(2 * s * c, h * h), Q(2 * c * c, h * h), Q(1)]; last = t`$\cos 2\theta=\cos^2\theta-\sin^2\theta=${fr(c * c, h * h)}-${fr(s * s, h * h)}=${fr(c * c - s * s, h * h)}$.`; }
    const th = Math.atan2(s, c);
    return { ...choose(ans, cands),
      stem: t`Given $${given}$ with $\theta$ in the ${ord} quadrant, what is $${ask}$?`,
      solution: t`Use a right triangle with sides ${Math.abs(s)}, ${Math.abs(c)} and ${h} ($${s * s}+${c * c}=${h * h}$). In the ${ord} quadrant $\sin\theta$ is ${s < 0 ? "negative" : "positive"} and $\cos\theta$ is ${c < 0 ? "negative" : "positive"}, so $\sin\theta=${fr(s, h)}$ and $\cos\theta=${fr(c, h)}$. Then ${last}`,
      check: () => ({ other: giveSin ? Math.cos(th) : Math.sin(th), tan: Math.tan(th), sin2: Math.sin(2 * th), cos2: Math.cos(2 * th) })[kind] };
  });

  mg("M5-v-G01", 2, VWO, false, R => {
    const m = R.ri(-3, 4), M = m + 2 * R.ri(1, 4), e = (M + m) / 2, A = (M - m) / 2, t1 = R.ri(1, 4), h = R.ri(2, 6);
    if (!e) throw 0;
    const ts = t1 + 0.37 * h, arg = (B, sgn) => t`\tfrac{${B}}{${h}}(t${sgn}${t1})`;
    const Y = (amp, fn, B, sgn, f) => T(t`y=${e}+${cf(amp)}${"\\" + fn}\!\left(${arg(B, sgn)}\right)`, e + amp * f(ts));
    const W = PI / h;
    return { ...choose(Y(A, "cos", "\\pi", "-", x => Math.cos(W * (x - t1))), [
        Y(A, "sin", "\\pi", "-", x => Math.sin(W * (x - t1))), Y(2 * A, "cos", "\\pi", "-", x => Math.cos(W * (x - t1))),
        Y(A, "cos", "2\\pi", "-", x => Math.cos(2 * W * (x - t1))), Y(A, "cos", "\\pi", "+", x => Math.cos(W * (x + t1)))]),
      stem: t`A sinusoid has a maximum of ${M} at $t=${t1}$, and the next minimum after that is ${m} at $t=${t1 + h}$. Which formula fits?`,
      solution: t`The equilibrium is $\tfrac{${M}+${par(m)}}{2}=${e}$ and the amplitude $\tfrac{${M}-${par(m)}}{2}=${A}$. From a maximum to the next minimum is half a period, so the period is ${2 * h} and $B=\tfrac{2\pi}{${2 * h}}=\tfrac{\pi}{${h}}$. A cosine starts at its maximum, so start it at $t=${t1}$: $y=${e}+${cf(A)}\cos\!\left(\tfrac{\pi}{${h}}(t-${t1})\right)$.` };
  });

  mg("M5-i-G01", 1, VWO, false, R => {
    const b = R.ri(1, 8), A = R.ri(2, 9), fn = R.pick(["sin", "cos"]), F = "\\" + fn, askF = R.rnd() < 0.35, bp = (b === 1 ? "\\pi" : b + "\\pi") + " ";
    const U = (n, d, u) => { const q = Q(n, d); return { v: q.v, s: q.s.slice(0, -1) + t`\ \text{${u}}$` }; };
    const ch = askF ? choose(U(b, 2, "Hz"), [U(2, b, "Hz"), U(b, 1, "Hz"), U(2 * b, 1, "Hz"), U(b, 4, "Hz")]) : choose(U(2, b, "s"), [U(b, 2, "s"), U(2 * b, 1, "s"), U(1, b, "s"), U(4, b, "s")]);
    return { ...ch,
      stem: t`What is the ${askF ? "frequency" : "period"} of $y=${A}${F}(${bp}t)$, with $t$ in seconds?`,
      solution: t`For $y=A${F}(Bt)$ the period is $T=\tfrac{2\pi}{B}$. Here $B=${bp}$, so $T=\tfrac{2\pi}{${bp}}=${fr(2, b)}$ s.${askF ? t` The frequency is $f=\tfrac1T=${fr(b, 2)}$ Hz.` : ""} The amplitude ${A} plays no part.`,
      check: () => (askF ? b / 2 : 2 / b) };
  });

  mg("M5-iii-G02", 1, VWO, false, R => {
    const TB = [[0.5, t`\tfrac12`, 4], [-0.5, t`-\tfrac12`, 8], [Math.SQRT1_2, t`\tfrac{\sqrt2}{2}`, 3], [-Math.SQRT1_2, t`-\tfrac{\sqrt2}{2}`, 9], [sqrt(3) / 2, t`\tfrac{\sqrt3}{2}`, 2], [-sqrt(3) / 2, t`-\tfrac{\sqrt3}{2}`, 10]];
    const [c, cTex, ac] = R.pick(TB), useSin = R.rnd() < 0.5, fn = useSin ? "sin" : "cos", F = "\\" + fn, as = 6 - ac;
    const norm = v => ((v % 24) + 24) % 24;
    const set = arr => X("$x=" + [...new Set(arr.map(norm))].sort((a, b) => a - b).map(piA).join("$ or $x=") + "$");
    const sinSet = [as, 12 - as], cosSet = [ac, 24 - ac];
    const right = useSin ? sinSet : cosSet, wrongFn = useSin ? cosSet : sinSet, p0 = right[0];
    const flip = useSin ? [-as, 12 + as] : [12 - ac, 12 + ac];
    return { ...choose(set(right), [set(wrongFn), set(flip), set([p0, p0 + 12]), set([p0])]),
      stem: t`Solve $${F} x=${cTex}$ for $0\le x\lt 2\pi$.`,
      solution: useSin
        ? t`One solution is $x=${as < 0 ? "-" : ""}${piA(Math.abs(as))}$, since $\sin\!\left(${as < 0 ? "-" : ""}${piA(Math.abs(as))}\right)=${cTex}$. Because $\sin(\pi-x)=\sin x$, the other is $\pi-\left(${as < 0 ? "-" : ""}${piA(Math.abs(as))}\right)$. Bringing both into $[0,2\pi)$ gives ${set(right).s}.`
        : t`One solution is $x=${piA(ac)}$, since $\cos${piA(ac)}=${cTex}$. Because $\cos(2\pi-x)=\cos x$, the other is $2\pi-${piA(ac)}=${piA(24 - ac)}$. So ${set(right).s}.`,
      verify: () => right.every(n => Math.abs(Math[fn](norm(n) * PI / 12) - c) < 1e-9) && roots(x => Math[fn](x) - c, 1e-7, 2 * PI - 1e-7, 49999) === new Set(right.map(norm)).size };
  });

  /* ---------- M6 Geometry ---------- */
  mg("M6-iii-G01", 2, VWO, false, R => {
    const a = R.ri(2, 9), b = R.ri(2, 9); if (a === b) throw 0;
    const C = R.pick([60, 120]), s2 = a * a + b * b, N = C === 60 ? s2 - a * b : s2 + a * b, S = n => T(sqrtStr(n), sqrt(n));
    return { ...choose(S(N), [S(C === 60 ? s2 + a * b : s2 - a * b), S(s2), S(C === 60 ? s2 - 2 * a * b : s2 + 2 * a * b), S(a * b)]),
      stem: t`In triangle $ABC$, $a=BC=${a}$, $b=AC=${b}$ and $\angle C=${C}^\circ$. How long is $c=AB$?`,
      solution: t`Cosine rule: $c^2=a^2+b^2-2ab\cos C=${a * a}+${b * b}-2\cdot ${a}\cdot ${b}\cdot\left(${C === 60 ? t`\tfrac12` : t`-\tfrac12`}\right)=${N}$, so $c=${sqrtStr(N)}$. Note that $\cos ${C}^\circ$ is ${C === 60 ? "positive" : "negative"}.`,
      check: () => sqrt(a * a + b * b - 2 * a * b * Math.cos(C * PI / 180)) };
  });

  mg("M6-iv-G01", 1, VWO, false, R => {
    const h = R.ri(-5, 5), k = R.ri(-5, 5), r = R.ri(2, 6); if (!h || !k) throw 0;
    const D = -2 * h, E = -2 * k, F = h * h + k * k - r * r;
    const term = (c, v) => (c ? (c < 0 ? "-" : "+") + (Math.abs(c) === 1 ? "" : Math.abs(c)) + v : "");
    const eq = "x^2+y^2" + term(D, "x") + term(E, "y") + (F ? pm(F) : "") + "=0";
    const CR = (x, y, rr) => X(t`centre $(${x},\,${y})$, radius $${rr}$`);
    return { ...choose(CR(h, k, r), [CR(-h, -k, r), CR(h, k, r * r), CR(-h, -k, r * r), CR(k, h, r)]),
      stem: t`What are the centre and radius of the circle $${eq}$?`,
      solution: t`Complete the squares: $${eq.replace("=0", "")}=(${poly([[1, 1], [-h, 0]])})^2-${h * h}+(${poly([[1, 1], [-k, 0]], "y")})^2-${k * k}${F ? pm(F) : ""}$. So the equation becomes $(${poly([[1, 1], [-h, 0]])})^2+(${poly([[1, 1], [-k, 0]], "y")})^2=${r * r}$: centre $(${h},\,${k})$, radius $\sqrt{${r * r}}=${r}$. The signs flip: $x${pm(-h)}$ belongs to $x=${h}$.` };
  });

  mg("M6-vi-G01", 2, EN, false, R => {
    const [p, q] = R.pick([[3, 4], [4, 3], [5, 12], [12, 5], [6, 8], [8, 6]]), n = Math.hypot(p, q);
    const a = p * R.pick([1, -1]), b = q * R.pick([1, -1]), c = R.nz(-20, 20), x0 = R.ri(-5, 5), y0 = R.ri(-5, 5);
    const val = a * x0 + b * y0 + c, av = Math.abs(val); if (!val) throw 0;
    const line = poly([[a, 1]]) + (b < 0 ? "-" : "+") + Math.abs(b) + "y" + pm(c);
    return { ...choose(Q(av, n), [val < 0 ? Q(val, n) : null, Q(av), Q(av, n * n), Q(av, Math.abs(a) + Math.abs(b)), Q(Math.abs(a * x0 + b * y0), n)]),
      stem: t`What is the distance from the point $(${x0},\,${y0})$ to the line $${line}=0$?`,
      solution: t`$d=\dfrac{|ax_0+by_0+c|}{\sqrt{a^2+b^2}}=\dfrac{|${a}\cdot ${par(x0)}+${par(b)}\cdot ${par(y0)}${pm(c)}|}{\sqrt{${a * a}+${b * b}}}=\dfrac{${av}}{${n}}${gcd(av, n) > 1 ? "=" + fr(av, n) : ""}$.`,
      check: () => { const [px, py] = b ? [0, -c / b] : [-c / a, 0], dx = -b, dy = a; return Math.abs((x0 - px) * dy - (y0 - py) * dx) / Math.hypot(dx, dy); } };
  });

  mg("M6-iv-G02", 1, VWO, false, R => {
    const m = R.nz(-4, 4), c0 = R.ri(-5, 5), x0 = R.ri(-4, 4), y0 = R.ri(-5, 5), xt = x0 + 2.3;
    const Ln = (sn, sd, kn, kd) => T("y=" + fpoly([[sn, sd, 1], [kn, kd, 0]]), sn / sd * xt + kn / kd);
    return { ...choose(Ln(-1, m, y0 * m + x0, m), [Ln(m, 1, y0 - m * x0, 1), Ln(-1, m, y0 * m - x0, m), Ln(1, m, y0 * m - x0, m), Ln(-m, 1, y0 + m * x0, 1)]),
      stem: t`Which line passes through $(${x0},\,${y0})$ and is perpendicular to $y=${poly([[m, 1], [c0, 0]])}$?`,
      solution: t`Perpendicular slopes multiply to $-1$, so the new slope is $${fr(-1, m)}$. Through $(${x0},\,${y0})$: $${poly([[1, 1], [-y0, 0]], "y")}=${fr(-1, m)}(${poly([[1, 1], [-x0, 0]])})$, which gives $y=${fpoly([[-1, m, 1], [y0 * m + x0, m, 0]])}$.`,
      check: () => y0 - (xt - x0) / m };
  });

  /* ---------- M7 Vectors ---------- */
  mg("M7-ii-G01", 2, VWO, false, R => {
    const a = R.nz(-5, 5), b = R.nz(-5, 5), p = R.nz(-6, 6); if (a + b === 0 || (p * (a + b)) % a) throw 0;
    const c = p * (a + b) / a, pc = poly([[1, 1], [-c, 0]], "p");
    return { ...choose(Q(p), [Q(-p), Q(a * c, b - a), Q(c), Q(a * c, b), Q(c, a + b)]),
      stem: t`For which value of $p$ are $\begin{pmatrix}p\\ ${a}\end{pmatrix}$ and $\begin{pmatrix}${b}\\ ${pc}\end{pmatrix}$ perpendicular?`,
      solution: t`Perpendicular vectors have dot product zero: $${par(b)}p+${par(a)}(${pc})=0$, so $${a + b}p=${a * c}$ and $p=${p}$.`,
      check: () => a * c / (a + b) };
  });

  mg("M7-iii-G01", 2, VWO, false, R => {
    const a = R.ri(1, 3), b = R.ri(1, 8), t0 = R.ri(1, 3), vx = 2 * a * t0, N = vx * vx + b * b, S = n => T(sqrtStr(n), sqrt(n));
    return { ...choose(S(N), [S(a * a * t0 * t0 + b * b), S(a * a * t0 ** 4 + b * b * t0 * t0), T(String(vx + b), vx + b), S(vx * vx + b)]),
      stem: t`A point moves with $\mathbf r(t)=\begin{pmatrix}${cf(a)}t^2\\ ${cf(b)}t\end{pmatrix}$. What is its speed at $t=${t0}$?`,
      solution: t`The velocity is $\mathbf v(t)=\mathbf r'(t)=\begin{pmatrix}${2 * a}t\\ ${b}\end{pmatrix}$, which is $\begin{pmatrix}${vx}\\ ${b}\end{pmatrix}$ at $t=${t0}$. The speed is its length: $\sqrt{${vx}^2+${b}^2}=${sqrtStr(N)}$. (The length of $\mathbf r$ itself is the distance from the origin, not the speed.)`,
      check: () => Math.hypot(deriv(x => a * x * x, t0), deriv(x => b * x, t0)) };
  });

  mg("M7-vi-G01", 2, PC, false, R => {
    const p = R.ri(-3, 3), q = R.ri(-4, 6), t0 = R.nz(-2, 3), num = 3 * t0 * t0 - q, den = 2 * t0 + p;
    if (!num || !den) throw 0;
    return { ...choose(Q(num, den), [Q(den, num), Q(num), Q(3 * t0 - q, den), Q(-num, den)]),
      stem: t`A curve is given by $x=${poly([[1, 2], [p, 1]], "t")}$, $y=${poly([[1, 3], [-q, 1]], "t")}$. What is the slope of the tangent at $t=${t0}$?`,
      solution: t`$\dfrac{dy}{dx}=\dfrac{dy/dt}{dx/dt}=\dfrac{${poly([[3, 2], [-q, 0]], "t")}}{${poly([[2, 1], [p, 0]], "t")}}$. At $t=${t0}$: $\dfrac{${num}}{${den}}=${fr(num, den)}$. Dividing the other way round gives the reciprocal.`,
      check: () => deriv(t2 => t2 ** 3 - q * t2, t0) / deriv(t2 => t2 * t2 + p * t2, t0) };
  });

  mg("M7-vii-G01", 1, VWO, false, R => {
    const P = [0, 1, 2].map(() => [R.ri(1, 5), R.ri(0, 6), R.ri(0, 6)]), M = P.reduce((s, p) => s + p[0], 0);
    const Sx = P.reduce((s, p) => s + p[0] * p[1], 0), Sy = P.reduce((s, p) => s + p[0] * p[2], 0);
    const pt = (xn, xd, yn, yd) => X(t`$\left(${fr(xn, xd)},\ ${fr(yn, yd)}\right)$`);
    return { ...choose(pt(Sx, M, Sy, M), [pt(P[0][1] + P[1][1] + P[2][1], 3, P[0][2] + P[1][2] + P[2][2], 3), pt(Sy, M, Sx, M), pt(Sx, 3, Sy, 3), pt(Sx, M + 1, Sy, M + 1)]),
      stem: t`Point masses of ${P[0][0]} kg at $(${P[0][1]},\,${P[0][2]})$, ${P[1][0]} kg at $(${P[1][1]},\,${P[1][2]})$ and ${P[2][0]} kg at $(${P[2][1]},\,${P[2][2]})$. Where is their centre of mass?`,
      solution: t`Weight each position by its mass and divide by the total mass $${M}$ kg: $\bar x=\dfrac{${P.map(p => p[0] + "\\cdot " + p[1]).join("+")}}{${M}}=${fr(Sx, M)}$ and $\bar y=\dfrac{${P.map(p => p[0] + "\\cdot " + p[2]).join("+")}}{${M}}=${fr(Sy, M)}$.` };
  });
})();
