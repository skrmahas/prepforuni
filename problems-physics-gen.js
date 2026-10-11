/* Delft AE Drill: generated physics cards. New numbers every time a card comes up (see problems-gen-lib.js).
   Original problems on the TU Delft AE selection exam syllabus, in the style of TU Delft Pre-University Physics,
   VWO Natuurkunde and ENGAA/ESAT. g = 9.81 m/s^2 throughout. */
(function () {
  const G = typeof window !== "undefined" ? window : globalThis;
  const { g, T, fmt, choose } = G.DRILL_GEN, t = String.raw;
  const PP = "Pre-Uni Physics", VN = "VWO Natuurkunde", EN = "ENGAA/ESAT", g0 = 9.81, sqrt = Math.sqrt, PI = Math.PI;
  const pg = (id, d, model, calc, gen) => g(id, "physics", d, model, calc, gen);
  const U = (v, unit) => T(fmt(v) + "\\ " + unit, v);
  const m_ = t`\text{m}`, ms = t`\text{m/s}`, ms2 = t`\text{m/s}^2`, N_ = t`\text{N}`, W_ = t`\text{W}`, A_ = t`\text{A}`, s_ = t`\text{s}`;

  pg("P1-iii-G01", 1, VN, true, R => {
    const v = R.pick([18, 36, 54, 72, 90, 108, 126, 144, 180, 216, 252, 288, 324]);
    if (R.rnd() < 0.5) return { ...choose(U(v / 3.6, ms), [U(v * 3.6, ms), U(v / 60, ms), U(v * 1000 / 60, ms), U(v / 36, ms)]),
      stem: t`An aircraft moves at ${v} km/h. What is that in m/s?`,
      solution: t`$1\ \text{km/h}=\dfrac{1000\ \text{m}}{3600\ \text{s}}=\dfrac{1}{3.6}\ \text{m/s}$, so divide by 3.6: $\dfrac{${v}}{3.6}=${fmt(v / 3.6)}\ \text{m/s}$.`,
      check: () => v * 1000 / 3600 };
    const u = v / 3.6, kmh = t`\text{km/h}`;
    return { ...choose(U(v, kmh), [U(u / 3.6, kmh), U(u * 60, kmh), U(u * 36, kmh), U(u * 1000, kmh)]),
      stem: t`A car moves at ${fmt(u)} m/s. What is that in km/h?`,
      solution: t`In one hour (3600 s) it covers $${fmt(u)}\cdot 3600$ m $=${fmt(u * 3.6)}$ km, so multiply by 3.6: ${fmt(u * 3.6)} km/h.`,
      check: () => u * 3600 / 1000 };
  });

  pg("P1-viii-G01", 1, VN, true, R => {
    const h = R.ri(2, 40), kPa = t`\text{kPa}`, p = 101 + g0 * h;
    return { ...choose(U(p, kPa), [U(g0 * h, kPa), U(101 + h, kPa), U(101 + 10 * g0 * h, kPa), U(101 + g0 * h / 10, kPa)]),
      stem: t`What is the total pressure at a depth of ${h} m in fresh water ($\rho=1000\ \text{kg/m}^3$)? The air pressure at the surface is 101 kPa; use $g=9.81\ \text{m/s}^2$.`,
      solution: t`The water adds $\rho gh=1000\cdot 9.81\cdot ${h}=${fmt(1000 * g0 * h)}\ \text{Pa}=${fmt(g0 * h)}\ \text{kPa}$. The total is $101+${fmt(g0 * h)}=${fmt(p)}\ \text{kPa}$. Without the air on top you would get only the gauge pressure.`,
      check: () => (101e3 + 1000 * g0 * h) / 1000 };
  });

  pg("P2-i-G01", 1, VN, true, R => {
    const v = R.ri(10, 30), a = R.ri(2, 8), s = v * v / (2 * a);
    return { ...choose(U(s, m_), [U(v * v / a, m_), U(v / a, m_), U(v * v * a / 2, m_), U(v / (2 * a), m_)]),
      stem: t`A car travelling at ${v} m/s brakes with a constant deceleration of ${a} m/s². How far does it travel before it stops?`,
      solution: t`With $v^2=v_0^2-2as$ and final speed 0: $s=\dfrac{v_0^2}{2a}=\dfrac{${v}^2}{2\cdot ${a}}=${fmt(s)}\ \text{m}$. (Or: it stops after $t=\tfrac{${v}}{${a}}$ s at an average speed of $\tfrac{${v}}{2}$ m/s.)`,
      check: () => { const tt = v / a; return v * tt - a * tt * tt / 2; } };
  });

  pg("P2-i-G02", 2, EN, true, R => {
    const u = R.ri(5, 25), h = R.pick([5, 10, 15, 20, 30, 45, 60, 80]), tf = sqrt(2 * h / g0), x = u * tf;
    return { ...choose(U(x, m_), [U(u * 2 * h / g0, m_), U(u * sqrt(h / g0), m_), U(u * u / g0, m_), U(u * h / g0, m_)]),
      stem: t`A ball is thrown horizontally at ${u} m/s from a height of ${h} m. How far from the base does it land? Ignore air resistance; use $g=9.81\ \text{m/s}^2$.`,
      solution: t`The vertical motion is a free fall from rest: $${h}=\tfrac12\cdot 9.81\,t^2$ gives $t=\sqrt{\tfrac{2\cdot ${h}}{9.81}}=${fmt(tf)}\ \text{s}$. Horizontally the speed stays ${u} m/s, so $x=${u}\cdot ${fmt(tf)}=${fmt(x)}\ \text{m}$.`,
      check: () => { let y = h, vy = 0, xx = 0; const dt = 1e-5; while (y > 0) { vy += g0 * dt; y -= vy * dt; xx += u * dt; } return xx; } };
  });

  pg("P2-ii-G01", 2, VN, true, R => {
    const [s, c, desc] = R.pick([[0.6, 0.8, t`$\sin\alpha=0.60$ ($\cos\alpha=0.80$)`], [0.5, sqrt(3) / 2, t`$\alpha=30^\circ$`], [0.8, 0.6, t`$\sin\alpha=0.80$ ($\cos\alpha=0.60$)`]]);
    const mu = R.pick([0.1, 0.15, 0.2, 0.25, 0.3, 0.4]); if (s - mu * c <= 0.1) throw 0;
    const a = g0 * (s - mu * c);
    return { ...choose(U(a, ms2), [U(g0 * (s + mu * c), ms2), U(g0 * s, ms2), U(g0 * (s - mu), ms2), U(g0 * (c - mu * s), ms2)]),
      stem: t`A block slides down a slope with ${desc}. The coefficient of kinetic friction is ${mu}. What is its acceleration? Use $g=9.81\ \text{m/s}^2$.`,
      solution: t`Along the slope: $ma=mg\sin\alpha-\mu mg\cos\alpha$, so the mass cancels and $a=g(\sin\alpha-\mu\cos\alpha)=9.81(${fmt(s)}-${mu}\cdot ${fmt(c)})=${fmt(a)}\ \text{m/s}^2$. Friction acts up the slope, against the motion.` };
  });

  pg("P2-ii-G02", 1, VN, true, R => {
    const m = R.ri(2, 20), mu = R.pick([0.1, 0.2, 0.25, 0.3, 0.4]), Ff = mu * m * g0, F = Math.round(Ff + R.ri(5, 40)), a = (F - Ff) / m;
    return { ...choose(U(a, ms2), [U(F / m, ms2), U((F + Ff) / m, ms2), U((F - mu * m) / m, ms2), U((F - mu * g0) / m, ms2)]),
      stem: t`A ${m} kg crate on a level floor is pulled horizontally with a force of ${F} N. The coefficient of kinetic friction is ${mu}. What is its acceleration? Use $g=9.81\ \text{m/s}^2$.`,
      solution: t`Friction: $F_w=\mu mg=${mu}\cdot ${m}\cdot 9.81=${fmt(Ff)}\ \text{N}$. Resultant force: $${F}-${fmt(Ff)}=${fmt(F - Ff)}\ \text{N}$, so $a=\dfrac{F_\text{res}}{m}=${fmt(a)}\ \text{m/s}^2$.`,
      check: () => (F - mu * m * g0) / m };
  });

  pg("P2-iii-G01", 1, VN, true, R => {
    const u = R.ri(0, 12), h = R.ri(5, 40), v = sqrt(u * u + 2 * g0 * h);
    return { ...choose(U(v, ms), [U(sqrt(2 * g0 * h), ms), U(u + sqrt(2 * g0 * h), ms), U(sqrt(u * u + g0 * h), ms), U(sqrt(u * u + 2 * h), ms)]),
      stem: u ? t`A stone is thrown straight down at ${u} m/s from a cliff ${h} m high. How fast is it moving when it hits the ground? Ignore air resistance; use $g=9.81\ \text{m/s}^2$.`
        : t`A stone is dropped from a cliff ${h} m high. How fast is it moving when it hits the ground? Ignore air resistance; use $g=9.81\ \text{m/s}^2$.`,
      solution: t`Energy conservation: $\tfrac12mv^2=\tfrac12mu^2+mgh$, so $v=\sqrt{u^2+2gh}=\sqrt{${u}^2+2\cdot 9.81\cdot ${h}}=${fmt(v)}\ \text{m/s}$. Speeds don't add: the kinetic energies do.`,
      check: () => { let y = h, vv = u; const dt = 1e-5; while (y > 0) { vv += g0 * dt; y -= vv * dt; } return vv; } };
  });

  pg("P2-iii-G02", 1, PP, true, R => {
    const m = R.pick([50, 80, 100, 150, 200, 250, 400, 500]), v = R.pick([0.5, 0.8, 1.2, 1.5, 2.0, 2.5]), P = m * g0 * v;
    return { ...choose(U(P, W_), [U(m * v, W_), U(m * g0 / v, W_), U(0.5 * m * v * v, W_), U(P * 2, W_)]),
      stem: t`A winch lifts a ${m} kg load at a constant speed of ${v} m/s. What power does it deliver, ignoring losses? Use $g=9.81\ \text{m/s}^2$.`,
      solution: t`At constant speed the pulling force equals the weight, $F=mg=${fmt(m * g0)}\ \text{N}$. Power is force times speed: $P=Fv=${fmt(m * g0)}\cdot ${v}=${fmt(P)}\ \text{W}$. The kinetic energy doesn't change, so $\tfrac12mv^2$ plays no part.`,
      check: () => m * g0 * v };
  });

  pg("P2-iv-G01", 1, VN, true, R => {
    const m = 100 * R.ri(5, 15), v = R.ri(10, 30), r = 10 * R.ri(2, 20), F = m * v * v / r;
    return { ...choose(U(F, N_), [U(m * v / r, N_), U(m * v * v / (2 * r), N_), U(v * v / r, N_), U(m * g0, N_)]),
      stem: t`${String(m)[0] === "8" ? "An" : "A"} ${m} kg car takes a flat bend of radius ${r} m at ${v} m/s. How large is the centripetal force on the car?`,
      solution: t`$F_\text{c}=\dfrac{mv^2}{r}=\dfrac{${m}\cdot ${v}^2}{${r}}=${fmt(F)}\ \text{N}$. On a flat road this force comes from friction between the tyres and the road.`,
      check: () => m * v * v / r };
  });

  pg("P2-iv-G02", 2, EN, true, R => {
    const hk = R.pick([300, 400, 500, 600, 800, 1000, 1500, 2000]), GM = 3.99e14, Re = 6.37e6, r = Re + hk * 1000, v = sqrt(GM / r) / 1000, kms = t`\text{km/s}`;
    return { ...choose(U(v, kms), [U(sqrt(GM / (hk * 1000)) / 1000, kms), U(sqrt(2 * GM / r) / 1000, kms), U(GM / r / 1e6, kms), U(sqrt(GM / r) / 100, kms)]),
      stem: t`A satellite circles the Earth at ${hk} km above the surface. What is its orbital speed? Use $GM_\text{E}=3.99\times10^{14}\ \text{m}^3/\text{s}^2$ and $R_\text{E}=6.37\times10^{6}$ m.`,
      solution: t`Gravity provides the centripetal force: $\dfrac{GMm}{r^2}=\dfrac{mv^2}{r}$, so $v=\sqrt{\dfrac{GM}{r}}$ with $r=R_\text{E}+h=${fmt(r)}$ m (from the Earth's centre, not the surface). $v=\sqrt{\dfrac{3.99\times10^{14}}{${fmt(r)}}}=${fmt(v * 1000)}\ \text{m/s}=${fmt(v)}\ \text{km/s}$.`,
      check: () => { const T = 2 * PI * sqrt(r ** 3 / GM); return 2 * PI * r / T / 1000; } };
  });

  pg("P3-ii-G01", 2, VN, true, R => {
    const [R2, R3] = R.pick([[3, 6], [4, 12], [6, 12], [10, 15], [12, 12], [20, 30], [6, 3], [12, 4]]), Rp = R2 * R3 / (R2 + R3);
    const R1 = R.ri(1, 10), I = R.pick([0.5, 1, 1.5, 2, 3]), V = I * (R1 + Rp), Om = t`\Omega`;
    return { ...choose(U(I, A_), [U(V / (R1 + R2 + R3), A_), U(V / R1, A_), U(V / Rp, A_), U(V * (1 / R1 + 1 / R2 + 1 / R3), A_)]),
      stem: t`A ${fmt(V)} V battery is connected to a $${R1}\ ${Om}$ resistor in series with a parallel pair of $${R2}\ ${Om}$ and $${R3}\ ${Om}$. What current does the battery deliver?`,
      solution: t`The parallel pair: $\dfrac{1}{R_p}=\dfrac{1}{${R2}}+\dfrac{1}{${R3}}$, so $R_p=${fmt(Rp)}\ ${Om}$. In series with $${R1}\ ${Om}$ the total is $${fmt(R1 + Rp)}\ ${Om}$, so $I=\dfrac{U}{R}=\dfrac{${fmt(V)}}{${fmt(R1 + Rp)}}=${fmt(I)}\ \text{A}$.`,
      check: () => V / (R1 + 1 / (1 / R2 + 1 / R3)) };
  });

  pg("P3-iii-G01", 1, VN, true, R => {
    const V = R.pick([6, 9, 12, 24, 230]), Rr = V === 230 ? R.pick([25, 50, 100, 200, 400]) : R.pick([2, 3, 4, 6, 8, 12, 16]), P = V * V / Rr, Om = t`\Omega`;
    return { ...choose(U(P, W_), [U(V / Rr, W_), U(V * Rr, W_), U(V / (Rr * Rr), W_), U(V * V * Rr / 1000, W_)]),
      stem: t`A $${Rr}\ ${Om}$ heating element is connected to ${V} V. What power does it dissipate?`,
      solution: t`$I=\dfrac{U}{R}=${fmt(V / Rr)}\ \text{A}$, and $P=UI=\dfrac{U^2}{R}=\dfrac{${V}^2}{${Rr}}=${fmt(P)}\ \text{W}$.`,
      check: () => V * (V / Rr) };
  });

  pg("P4-ii-G01", 1, VN, true, R => {
    const m = R.pick([0.1, 0.2, 0.25, 0.4, 0.5, 1, 2]), C = R.pick([20, 40, 50, 80, 100, 200, 400]), Tp = 2 * PI * sqrt(m / C);
    return { ...choose(U(Tp, s_), [U(2 * PI * sqrt(C / m), s_), U(sqrt(m / C), s_), U(2 * PI * m / C, s_), U(PI * sqrt(m / C), s_)]),
      stem: t`A ${m} kg mass hangs from a spring with spring constant $C=${C}$ N/m. What is the period of its vertical oscillation?`,
      solution: t`$T=2\pi\sqrt{\dfrac{m}{C}}=2\pi\sqrt{\dfrac{${m}}{${C}}}=${fmt(Tp)}\ \text{s}$. A heavier mass or a softer spring means a longer period. Gravity only shifts the equilibrium; it doesn't change $T$.`,
      check: () => { let x = 0.01, v = 0, tt = 0, crossings = 0, prev = x; const dt = 1e-5; while (crossings < 2) { v += -C / m * x * dt; x += v * dt; tt += dt; if (prev > 0 && x <= 0 || prev < 0 && x >= 0) crossings++; prev = x; } return tt * 4 / 3; } };
  });

  pg("P4-iii-G01", 1, VN, true, R => {
    const [v, what, fs] = R.pick([[340, "a sound wave in air (340 m/s)", [[170, "Hz"], [440, "Hz"], [680, "Hz"], [1.7, "kHz"], [3.4, "kHz"]]], [1500, "a sound wave in water (1500 m/s)", [[500, "Hz"], [750, "Hz"], [3, "kHz"], [15, "kHz"]]], [3e8, "a radio wave ($c=3.0\\times10^8$ m/s)", [[100, "MHz"], [150, "MHz"], [600, "MHz"], [1.2, "GHz"], [2.4, "GHz"]]]]);
    const [fv, fu] = R.pick(fs), f = fv * { Hz: 1, kHz: 1e3, MHz: 1e6, GHz: 1e9 }[fu], lam = v / f;
    return { ...choose(U(lam, m_), [U(f / v, m_), U(v / fv, m_), U(lam / 2, m_), U(lam * 1000, m_)]),
      stem: t`What is the wavelength of ${what} with a frequency of ${fv} ${fu}?`,
      solution: t`$\lambda=\dfrac{v}{f}=\dfrac{${fmt(v)}}{${fmt(f)}}=${fmt(lam)}\ \text{m}$.${fu === "Hz" ? "" : t` Convert the frequency to hertz first: $${fv}\ \text{${fu}}=${fmt(f)}$ Hz.`}`,
      check: () => v / f };
  });
})();
