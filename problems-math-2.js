/* Delft AE Drill: mathematics bank, set 2.
   Original problems on the TU Delft AE Selection Exam syllabus (Mathematics & Physics, v2024),
   calibrated to TU Delft Pre-University Calculus, Dutch VWO Wiskunde B and Cambridge ENGAA/ESAT.
   Ids use serials from 11 upward to stay clear of set 1. */
(function () {
  const G = typeof window !== "undefined" ? window : globalThis;
  G.PROBLEMS = G.PROBLEMS || [];
  const t = String.raw;
  const PI = Math.PI, sqrt = Math.sqrt, E = Math.E, ln = Math.log;
  function q(id, difficulty, model, calc, stem, choices, answer, solution, extra) {
    const [code, sub] = id.split("-");
    G.PROBLEMS.push(Object.assign({
      id, subject: "math", topic: code, sub,
      difficulty, model, calc, stem, choices, answer, solution, figure: null
    }, extra || {}));
  }
  const PC = "Pre-Uni Calculus", VWO = "VWO Wiskunde B", EN = "ENGAA/ESAT";
  const count = (f, a, b, n = 200000) => { let c = 0, prev = f(a); for (let i = 1; i <= n; i++) { const x = a + (b - a) * i / n, v = f(x); if (prev === 0 || prev * v < 0) c++; prev = v; } return c; };
  const integ = (f, a, b, n = 20000) => { let s = 0; const h = (b - a) / n; for (let i = 0; i < n; i++) s += f(a + (i + 0.5) * h) * h; return s; };

  /* ---------- M1 Functions and graphs ---------- */
  q("M1-i-11", 2, PC, false,
    t`Let $f(x)=\dfrac{1}{x-1}$. Which expression equals $f(f(x))$ where it is defined?`,
    [t`$\dfrac{x-1}{2-x}$`, t`$\dfrac{1}{x-2}$`, t`$x-1$`, t`$\dfrac{x-1}{x}$`], 0,
    t`$f(f(x))=\dfrac{1}{\frac{1}{x-1}-1}=\dfrac{1}{\frac{1-(x-1)}{x-1}}=\dfrac{x-1}{2-x}$.`);

  q("M1-i-12", 2, EN, false,
    t`Let $f(x)=2x+3$. Which expression equals $f(f(f(x)))$?`,
    [t`$8x+21$`, t`$8x+9$`, t`$6x+9$`, t`$8x+27$`], 0,
    t`$f(f(x))=2(2x+3)+3=4x+9$, then $f(4x+9)=8x+18+3=8x+21$.`);

  q("M1-i-13", 1, VWO, false,
    t`Let $f(x)=x^2$ and $g(x)=\sin x$. Which expression is $g(f(x))$?`,
    [t`$\sin(x^2)$`, t`$\sin^2 x$`, t`$x^2\sin x$`, t`$\sin(2x)$`], 0,
    t`Apply $f$ first, then $g$: $g(x^2)=\sin(x^2)$. $\sin^2x=(\sin x)^2$ is $f(g(x))$.`);

  q("M1-ii-11", 2, EN, false,
    t`How many real solutions does $e^{-x}=x^2$ have?`,
    [t`$1$`, t`$0$`, t`$2$`, t`$3$`], 0,
    t`For $x\le0$: $e^{-x}\ge1$ and it grows faster than $x^2$ as $x\to-\infty$; at $x=-1$ it is $e\gt 1$ and at $x=0$ it is $1\gt 0$, so the graphs do not meet there. For $x\gt 0$, $e^{-x}$ falls from 1 while $x^2$ rises from 0, so they cross exactly once (near $x\approx0.70$).`,
    { vals: [1, 0, 2, 3], check: () => count(x => Math.exp(-x) - x * x, -20, 20) });

  q("M1-ii-12", 1, VWO, false,
    t`Solve $|x-2|-3=0$.`,
    [t`$x=-1$ or $x=5$`, t`$x=5$ only`, t`$x=1$ or $x=-5$`, t`$x=-1$ only`], 0,
    t`$|x-2|=3$ means $x-2=3$ or $x-2=-3$, so $x=5$ or $x=-1$.`);

  q("M1-ii-13", 3, EN, false,
    t`What is the domain of $f(x)=\sqrt{\ln(x-1)}$?`,
    [t`$x\ge2$`, t`$x\gt 1$`, t`$x\ge1$`, t`$x\gt e$`], 0,
    t`We need $x-1\gt 0$ for the logarithm and $\ln(x-1)\ge0$ for the root, so $x-1\ge1$, i.e. $x\ge2$.`);

  q("M1-ii-14", 2, PC, false,
    t`Which describes the graph of $f(x)=\dfrac{x^2-1}{x-1}$?`,
    [t`The line $y=x+1$ with a hole at $(1,2)$`, t`The line $y=x+1$`, t`The line $y=x+1$ with a vertical asymptote $x=1$`, t`The line $y=x-1$ with a hole at $(1,0)$`], 0,
    t`$\dfrac{(x-1)(x+1)}{x-1}=x+1$ for $x\ne1$. At $x=1$ the function is undefined but the factor cancels, so there is a hole at $(1,2)$, not an asymptote.`);

  q("M1-ii-15", 1, VWO, false,
    t`Which point lies on the graph of $y=\log_3 x$?`,
    [t`$(9,\ 2)$`, t`$(2,\ 9)$`, t`$(3,\ 0)$`, t`$(0,\ 1)$`], 0,
    t`$\log_3 9=2$ because $3^2=9$. The graph passes through $(1,0)$ and $(3,1)$, not $(3,0)$, and $x=0$ is outside the domain.`);

  q("M1-ii-16", 3, EN, false,
    t`What are the horizontal asymptotes of $f(x)=\dfrac{3e^{x}+2}{e^{x}+1}$?`,
    [t`$y=2$ and $y=3$`, t`$y=3$ only`, t`$y=2$ only`, t`$y=\tfrac52$`], 0,
    t`As $x\to-\infty$, $e^x\to0$ and $f\to\tfrac21=2$. As $x\to\infty$, divide by $e^x$: $f=\dfrac{3+2e^{-x}}{1+e^{-x}}\to3$. So there are two asymptotes.`);

  q("M1-iii-11", 2, VWO, false,
    t`What is the inverse of $f(x)=\dfrac{2x+1}{x-3}$?`,
    [t`$f^{-1}(x)=\dfrac{3x+1}{x-2}$`, t`$f^{-1}(x)=\dfrac{x-3}{2x+1}$`, t`$f^{-1}(x)=\dfrac{3x-1}{x+2}$`, t`$f^{-1}(x)=\dfrac{x+1}{2x-3}$`], 0,
    t`$y(x-3)=2x+1\Rightarrow xy-2x=3y+1\Rightarrow x=\dfrac{3y+1}{y-2}$. Swap letters. Option B is the reciprocal.`);

  q("M1-iii-12", 3, EN, false,
    t`Let $f(x)=x^2-4x+7$ for $x\ge2$. What is $f^{-1}(x)$?`,
    [t`$2+\sqrt{x-3},\ x\ge3$`, t`$2-\sqrt{x-3},\ x\ge3$`, t`$\sqrt{x-7}+4,\ x\ge7$`, t`$2+\sqrt{x+3},\ x\ge-3$`], 0,
    t`Complete the square: $f(x)=(x-2)^2+3$. On $x\ge2$, solve $y=(x-2)^2+3$: $x=2+\sqrt{y-3}$ (the $+$ root, since $x\ge2$). The range of $f$ is $y\ge3$, which is the domain of $f^{-1}$.`);

  q("M1-iii-13", 1, PC, false,
    t`Let $f(x)=e^{x}+2$. What is $f^{-1}(3)$?`,
    [t`$0$`, t`$1$`, t`$\ln 3$`, t`$e^3+2$`], 0,
    t`$e^x+2=3\Rightarrow e^x=1\Rightarrow x=0$. Option D is $f(3)$.`,
    { vals: [0, 1, ln(3), Math.exp(3) + 2], check: () => ln(3 - 2) });

  /* ---------- M2 Algebraic solving ---------- */
  q("M2-i-11", 2, VWO, false,
    t`The thin-lens formula is $\dfrac1f=\dfrac1u+\dfrac1v$. Which expression gives $v$?`,
    [t`$v=\dfrac{uf}{u-f}$`, t`$v=\dfrac{uf}{f-u}$`, t`$v=u-f$`, t`$v=\dfrac{u-f}{uf}$`], 0,
    t`$\dfrac1v=\dfrac1f-\dfrac1u=\dfrac{u-f}{uf}$, so $v=\dfrac{uf}{u-f}$.`);

  q("M2-i-12", 2, EN, false,
    t`The energy of a body is $E=\tfrac12mv^2+mgh$. Which expression gives $v$ (with $v\gt 0$)?`,
    [t`$v=\sqrt{\dfrac{2E}{m}-2gh}$`, t`$v=\sqrt{\dfrac{2(E-gh)}{m}}$`, t`$v=\sqrt{\dfrac{E}{2m}-gh}$`, t`$v=\dfrac{2E}{m}-2gh$`], 0,
    t`$\tfrac12mv^2=E-mgh\Rightarrow v^2=\dfrac{2E}{m}-2gh$. Option B subtracts $gh$ from an energy, so the units do not match.`);

  q("M2-ii-11", 2, VWO, false,
    t`Solve $\dfrac{x+1}{x-2}\ge0$.`,
    [t`$x\le-1$ or $x\gt 2$`, t`$-1\le x\lt 2$`, t`$x\le-1$ or $x\ge2$`, t`$x\ge-1$`], 0,
    t`The quotient is non-negative when numerator and denominator have the same sign, or the numerator is zero. Sign chart around $-1$ and $2$: positive for $x\lt -1$, zero at $x=-1$, negative between, undefined at $x=2$, positive after.`);

  q("M2-ii-12", 3, EN, false,
    t`How many real solutions does $x^2-5|x|+6=0$ have?`,
    [t`$4$`, t`$2$`, t`$3$`, t`$0$`], 0,
    t`With $u=|x|\ge0$: $u^2-5u+6=0\Rightarrow u=2$ or $u=3$. Each gives two values of $x$: $\pm2,\pm3$.`,
    { vals: [4, 2, 3, 0], check: () => [2, -2, 3, -3].filter(x => x * x - 5 * Math.abs(x) + 6 === 0).length });

  q("M2-ii-13", 2, VWO, false,
    t`Solve $\log_2 x+\log_2(x-2)=3$.`,
    [t`$x=4$`, t`$x=-2$ or $x=4$`, t`$x=5$`, t`$x=2+\sqrt8$`], 0,
    t`$\log_2\big(x(x-2)\big)=3\Rightarrow x^2-2x-8=0\Rightarrow(x-4)(x+2)=0$. Only $x=4$ satisfies $x\gt 2$, which both logarithms need.`);

  q("M2-ii-14", 1, PC, false,
    t`Solve $3^{2x+1}=27^{x-1}$.`,
    [t`$x=4$`, t`$x=2$`, t`$x=-4$`, t`$x=\tfrac43$`], 0,
    t`$27^{x-1}=3^{3x-3}$. Equal exponents: $2x+1=3x-3\Rightarrow x=4$.`,
    { vals: [4, 2, -4, 4 / 3], check: () => 4 });

  q("M2-ii-15", 3, EN, false,
    t`Solve $\sqrt{x+5}=x-1$.`,
    [t`$x=4$ only`, t`$x=-1$ or $x=4$`, t`$x=-1$ only`, t`no solution`], 0,
    t`Squaring: $x+5=x^2-2x+1\Rightarrow x^2-3x-4=0\Rightarrow x=4$ or $x=-1$. Check: $x=-1$ gives $\sqrt4=2$ but $x-1=-2$, so it is a false root introduced by squaring.`);

  q("M2-iii-11", 2, PC, false,
    t`What is the sum of the roots of $3x^2-12x+5=0$?`,
    [t`$4$`, t`$-4$`, t`$\tfrac53$`, t`$12$`], 0,
    t`For $ax^2+bx+c$ the roots sum to $-\tfrac ba=\tfrac{12}{3}=4$. (The discriminant $144-60\gt 0$, so both roots are real.)`,
    { vals: [4, -4, 5 / 3, 12], check: () => { const d = sqrt(144 - 60); return (12 + d) / 6 + (12 - d) / 6; } });

  q("M2-iii-12", 3, EN, false,
    t`What is the sum of the squares of all real roots of $x^4-5x^2+4=0$?`,
    [t`$10$`, t`$5$`, t`$4$`, t`$0$`], 0,
    t`With $u=x^2$: $u^2-5u+4=0\Rightarrow u=1$ or $4$, so $x=\pm1,\pm2$. Squares: $1+1+4+4=10$. Option B counts each $u$ once.`,
    { vals: [10, 5, 4, 0], check: () => 1 + 1 + 4 + 4 });

  q("M2-iv-11", 2, VWO, false,
    t`A light aircraft flies 600 km in 1.5 h with a tailwind and the same 600 km back in 2.0 h against it. What is the wind speed (assumed constant)?`,
    [t`$50$ km/h`, t`$100$ km/h`, t`$25$ km/h`, t`$350$ km/h`], 0,
    t`$v+w=400$ and $v-w=300$. Subtracting: $2w=100\Rightarrow w=50$ km/h. The airspeed is 350 km/h (option D).`,
    { vals: [50, 100, 25, 350], check: () => (400 - 300) / 2 });

  q("M2-iv-12", 3, EN, false,
    t`Solve $0.5x+0.2y=3.4$ and $0.3x-0.4y=-1.6$. What is $y$?`,
    [t`$7$`, t`$4$`, t`$5$`, t`$-7$`], 0,
    t`Multiply by 10: $5x+2y=34$ and $3x-4y=-16$. Double the first and add: $13x=52\Rightarrow x=4$. Then $2y=34-20\Rightarrow y=7$.`,
    { vals: [7, 4, 5, -7], check: () => (34 - 5 * 4) / 2 });

  /* ---------- M3 Differential calculus ---------- */
  q("M3-i-11", 1, PC, false,
    t`What is $\dfrac{d}{dx}\ln(3x^2+1)$?`,
    [t`$\dfrac{6x}{3x^2+1}$`, t`$\dfrac{1}{3x^2+1}$`, t`$\dfrac{6x}{\ln(3x^2+1)}$`, t`$6x\ln(3x^2+1)$`], 0,
    t`Chain rule: $\dfrac{1}{3x^2+1}\cdot6x$.`);

  q("M3-i-12", 2, VWO, false,
    t`Let $f(x)=e^{x}\sin x$. What is $f'(0)$?`,
    [t`$1$`, t`$0$`, t`$2$`, t`$-1$`], 0,
    t`$f'(x)=e^x\sin x+e^x\cos x$. At 0: $0+1=1$.`,
    { vals: [1, 0, 2, -1], check: () => { const h = 1e-6, f = x => Math.exp(x) * Math.sin(x); return (f(h) - f(-h)) / (2 * h); } });

  q("M3-i-13", 2, EN, false,
    t`What is $f'(x)$ for $f(x)=\cos^3(2x)$?`,
    [t`$-6\cos^2(2x)\sin(2x)$`, t`$-3\cos^2(2x)\sin(2x)$`, t`$3\cos^2(2x)$`, t`$6\cos^2(2x)\sin(2x)$`], 0,
    t`Outer: $3\cos^2(2x)$. Middle: $-\sin(2x)$. Inner: $2$. Product: $-6\cos^2(2x)\sin(2x)$.`);

  q("M3-i-14", 1, PC, false,
    t`What is the derivative of $f(x)=2^x$?`,
    [t`$2^x\ln2$`, t`$x\cdot2^{x-1}$`, t`$2^x$`, t`$\dfrac{2^x}{\ln2}$`], 0,
    t`$2^x=e^{x\ln2}$, so $f'(x)=\ln2\cdot e^{x\ln2}=2^x\ln2$. Option B applies the power rule to an exponential, which is wrong.`);

  q("M3-ii-11", 2, VWO, false,
    t`What is the minimum value of $f(x)=x+\dfrac4x$ for $x\gt 0$?`,
    [t`$4$`, t`$2$`, t`$5$`, t`$8$`], 0,
    t`$f'(x)=1-\dfrac4{x^2}=0\Rightarrow x=2$, and $f''=\dfrac8{x^3}\gt 0$ so it is a minimum: $f(2)=2+2=4$. Option B is where it occurs.`,
    { vals: [4, 2, 5, 8], check: () => { let m = 1e9; for (let x = 0.01; x < 10; x += 1e-4) m = Math.min(m, x + 4 / x); return m; } });

  q("M3-ii-12", 3, EN, false,
    t`For which values of $a$ does $f(x)=x^3+ax^2+3x$ have no local extrema?`,
    [t`$-3\le a\le3$`, t`$a\gt 3$`, t`$-1\le a\le1$`, t`$a\le-3$ or $a\ge3$`], 0,
    t`$f'(x)=3x^2+2ax+3$. No sign change needs discriminant $\le0$: $4a^2-36\le0\Rightarrow|a|\le3$. (At $|a|=3$, $f'$ touches zero without changing sign.)`);

  q("M3-ii-13", 1, PC, false,
    t`What is the minimum value of $f(x)=e^x-x$?`,
    [t`$1$`, t`$0$`, t`$e-1$`, t`$-1$`], 0,
    t`$f'(x)=e^x-1=0\Rightarrow x=0$; $f''=e^x\gt 0$. $f(0)=1-0=1$.`,
    { vals: [1, 0, E - 1, -1], check: () => Math.exp(0) - 0 });

  q("M3-ii-14", 3, VWO, false,
    t`Where are the inflection points of $f(x)=x^4-6x^2$?`,
    [t`$(-1,-5)$ and $(1,-5)$`, t`$(0,0)$ only`, t`$(-\sqrt3,-9)$ and $(\sqrt3,-9)$`, t`$(-1,5)$ and $(1,5)$`], 0,
    t`$f''(x)=12x^2-12=0\Rightarrow x=\pm1$, and $f''$ changes sign there. $f(\pm1)=1-6=-5$. Option C gives the minima.`);

  q("M3-iii-11", 3, EN, false,
    t`A line through the origin is tangent to $y=\ln x$. What is its equation?`,
    [t`$y=\dfrac{x}{e}$`, t`$y=x$`, t`$y=ex$`, t`$y=\dfrac{x}{2}$`], 0,
    t`At $x=a$ the tangent is $y=\ln a+\tfrac1a(x-a)$. Through $(0,0)$: $\ln a-1=0\Rightarrow a=e$. Slope $\tfrac1e$.`);

  q("M3-iii-12", 2, VWO, false,
    t`A rectangular enclosure is built against a straight wall using 40 m of fence for the other three sides. What is the largest possible area?`,
    [t`$200\ \text{m}^2$`, t`$100\ \text{m}^2$`, t`$400\ \text{m}^2$`, t`$160\ \text{m}^2$`], 0,
    t`With side $x$ perpendicular to the wall: $A=x(40-2x)$. $A'=40-4x=0\Rightarrow x=10$, $A=10\cdot20=200\ \text{m}^2$. Option B is the square of side 10.`,
    { vals: [200, 100, 400, 160], check: () => { let m = 0; for (let x = 0; x <= 20; x += 0.001) m = Math.max(m, x * (40 - 2 * x)); return m; } });

  q("M3-iii-13", 2, PC, true,
    t`A ball's height is $h(t)=20t-4.9t^2$ (m, s). What is its maximum height?`,
    [t`$20.4$ m`, t`$40.8$ m`, t`$10.2$ m`, t`$2.04$ m`], 0,
    t`$h'(t)=20-9.8t=0\Rightarrow t=2.04$ s. $h=20\cdot2.04-4.9\cdot2.04^2=\dfrac{400}{19.6}\approx20.4$ m. Option D is the time.`,
    { vals: [20.41, 40.82, 10.2, 2.04], check: () => 400 / 19.6 });

  q("M3-iii-14", 3, EN, false,
    t`A closed cylindrical can must hold a fixed volume. For the least surface area, what is the ratio height : radius?`,
    [t`$2$`, t`$1$`, t`$\tfrac12$`, t`$\pi$`], 0,
    t`$V=\pi r^2h$ fixed, so $h=\dfrac{V}{\pi r^2}$. $A=2\pi r^2+2\pi rh=2\pi r^2+\dfrac{2V}{r}$. $A'=4\pi r-\dfrac{2V}{r^2}=0\Rightarrow V=2\pi r^3\Rightarrow h=\dfrac{2\pi r^3}{\pi r^2}=2r$.`,
    { vals: [2, 1, 0.5, PI], check: () => { const V = 1; let best = 1e9, br = 0; for (let r = 0.1; r < 2; r += 1e-5) { const A = 2 * PI * r * r + 2 * V / r; if (A < best) { best = A; br = r; } } return V / (PI * br * br) / br; } });

  /* ---------- M4 Integral calculus ---------- */
  q("M4-i-11", 1, PC, false,
    t`Evaluate $\displaystyle\int_{-1}^{1}x^3\,dx$.`,
    [t`$0$`, t`$\tfrac12$`, t`$\tfrac14$`, t`$2$`], 0,
    t`$\big[\tfrac{x^4}{4}\big]_{-1}^{1}=\tfrac14-\tfrac14=0$. The function is odd, so the signed areas cancel. The enclosed area would be $\tfrac12$.`,
    { vals: [0, 0.5, 0.25, 2], check: () => 0 });

  q("M4-i-12", 2, VWO, false,
    t`Given $\displaystyle\int_0^3 f(x)\,dx=5$ and $\displaystyle\int_0^3 g(x)\,dx=2$, what is $\displaystyle\int_0^3\big(2f(x)-3g(x)+1\big)\,dx$?`,
    [t`$7$`, t`$5$`, t`$4$`, t`$10$`], 0,
    t`Linearity: $2\cdot5-3\cdot2+\int_0^3 1\,dx=10-6+3=7$. Forgetting that $\int 1\,dx=3$ gives 5.`,
    { vals: [7, 5, 4, 10], check: () => 10 - 6 + 3 });

  q("M4-ii-11", 1, VWO, false,
    t`Which is an antiderivative of $\dfrac{1}{x^2}$?`,
    [t`$-\dfrac1x$`, t`$\dfrac1x$`, t`$\ln(x^2)$`, t`$-\dfrac{2}{x^3}$`], 0,
    t`$\int x^{-2}dx=\dfrac{x^{-1}}{-1}+C=-\dfrac1x+C$. Option D is the derivative.`);

  q("M4-ii-12", 2, PC, false,
    t`Evaluate $\displaystyle\int_0^{\ln 2}e^{2x}\,dx$.`,
    [t`$\tfrac32$`, t`$3$`, t`$1$`, t`$\tfrac12$`], 0,
    t`$\big[\tfrac12e^{2x}\big]_0^{\ln2}=\tfrac12(e^{2\ln 2}-1)=\tfrac12(4-1)=\tfrac32$.`,
    { vals: [1.5, 3, 1, 0.5], check: () => integ(x => Math.exp(2 * x), 0, ln(2)) });

  q("M4-ii-13", 2, VWO, false,
    t`Evaluate $\displaystyle\int_1^4\frac{1}{\sqrt x}\,dx$.`,
    [t`$2$`, t`$1$`, t`$4$`, t`$\tfrac12$`], 0,
    t`$\int x^{-1/2}dx=2\sqrt x$. $\big[2\sqrt x\big]_1^4=4-2=2$.`,
    { vals: [2, 1, 4, 0.5], check: () => integ(x => 1 / sqrt(x), 1, 4) });

  q("M4-ii-14", 3, EN, false,
    t`Evaluate $\displaystyle\int_0^{\pi/2}\sin x\cos x\,dx$.`,
    [t`$\tfrac12$`, t`$1$`, t`$0$`, t`$\tfrac{\pi}{4}$`], 0,
    t`$\sin x\cos x=\tfrac12\sin2x$. $\big[-\tfrac14\cos2x\big]_0^{\pi/2}=-\tfrac14(-1-1)=\tfrac12$.`,
    { vals: [0.5, 1, 0, PI / 4], check: () => integ(x => Math.sin(x) * Math.cos(x), 0, PI / 2) });

  q("M4-ii-15", 3, EN, false,
    t`Evaluate $\displaystyle\int_0^1(2x+1)^3\,dx$.`,
    [t`$10$`, t`$20$`, t`$40$`, t`$\tfrac{81}{4}$`], 0,
    t`$\int(2x+1)^3dx=\dfrac{(2x+1)^4}{4\cdot2}$. $\big[\tfrac{(2x+1)^4}{8}\big]_0^1=\tfrac{81-1}{8}=10$. Forgetting to divide by the inner factor 2 gives 20.`,
    { vals: [10, 20, 40, 81 / 4], check: () => integ(x => (2 * x + 1) ** 3, 0, 1) });

  q("M4-iii-11", 1, VWO, false,
    t`What is the area under one arch of $y=\sin x$, from $x=0$ to $x=\pi$?`,
    [t`$2$`, t`$1$`, t`$\pi$`, t`$0$`], 0,
    t`$\big[-\cos x\big]_0^\pi=-(-1)+1=2$.`,
    { vals: [2, 1, PI, 0], check: () => integ(Math.sin, 0, PI) });

  q("M4-iii-12", 3, EN, false,
    t`What is the area enclosed between $y=x^2$ and $y=2x-x^2$?`,
    [t`$\tfrac13$`, t`$\tfrac23$`, t`$1$`, t`$\tfrac16$`], 0,
    t`They meet where $x^2=2x-x^2\Rightarrow x=0,1$. Area $=\int_0^1(2x-2x^2)\,dx=1-\tfrac23=\tfrac13$.`,
    { vals: [1 / 3, 2 / 3, 1, 1 / 6], check: () => integ(x => 2 * x - 2 * x * x, 0, 1) });

  q("M4-iii-13", 3, VWO, false,
    t`The region under $y=\dfrac1x$ for $1\le x\le3$ is rotated about the $x$-axis. What is the volume?`,
    [t`$\dfrac{2\pi}{3}$`, t`$\pi\ln3$`, t`$\dfrac{\pi}{3}$`, t`$\dfrac{8\pi}{9}$`], 0,
    t`$V=\pi\int_1^3x^{-2}dx=\pi\big[-\tfrac1x\big]_1^3=\pi\left(1-\tfrac13\right)=\tfrac{2\pi}{3}$. Option B forgets to square.`,
    { vals: [2 * PI / 3, PI * ln(3), PI / 3, 8 * PI / 9], check: () => PI * integ(x => 1 / (x * x), 1, 3) });

  q("M4-iii-14", 3, EN, false,
    t`What is the arc length of $y=\tfrac13(x^2+2)^{3/2}$ from $x=0$ to $x=3$?`,
    [t`$12$`, t`$9$`, t`$6$`, t`$15$`], 0,
    t`$y'=x\sqrt{x^2+2}$, so $1+y'^2=1+2x^2+x^4=(x^2+1)^2$. $L=\int_0^3(x^2+1)\,dx=9+3=12$.`,
    { vals: [12, 9, 6, 15], check: () => integ(x => sqrt(1 + x * x * (x * x + 2)), 0, 3) });

  q("M4-iii-15", 2, PC, true,
    t`What is the mean value of $f(x)=\dfrac1x$ on $[1,\ e]$?`,
    [t`$\dfrac{1}{e-1}$`, t`$1$`, t`$\dfrac1e$`, t`$\dfrac{e-1}{2}$`], 0,
    t`$\dfrac{1}{e-1}\int_1^e\dfrac{dx}{x}=\dfrac{1}{e-1}\cdot1\approx0.58$.`,
    { vals: [1 / (E - 1), 1, 1 / E, (E - 1) / 2], check: () => integ(x => 1 / x, 1, E) / (E - 1) });

  /* ---------- M5 Trigonometry ---------- */
  q("M5-i-11", 1, VWO, false,
    t`An alternating voltage is $U=325\cos(100\pi t)$ V. What is its frequency?`,
    [t`$50$ Hz`, t`$100$ Hz`, t`$100\pi$ Hz`, t`$0.02$ Hz`], 0,
    t`$\omega=100\pi=2\pi f\Rightarrow f=50$ Hz. The period is 0.02 s.`,
    { vals: [50, 100, 100 * PI, 0.02], check: () => 100 * PI / (2 * PI) });

  q("M5-i-12", 2, PC, true,
    t`What is 2.5 rad in degrees, to the nearest degree?`,
    [t`$143^\circ$`, t`$450^\circ$`, t`$72^\circ$`, t`$157^\circ$`], 0,
    t`$2.5\cdot\dfrac{180}{\pi}\approx143.2^\circ$.`,
    { vals: [143, 450, 72, 157], check: () => Math.round(2.5 * 180 / PI) });

  q("M5-ii-11", 1, VWO, false,
    t`What is $\cos\!\left(\tfrac{2\pi}{3}\right)$?`,
    [t`$-\tfrac12$`, t`$\tfrac12$`, t`$-\tfrac{\sqrt3}{2}$`, t`$\tfrac{\sqrt3}{2}$`], 0,
    t`$\tfrac{2\pi}{3}=120^\circ$ is in the second quadrant, where cosine is negative, with reference angle $60^\circ$: $-\tfrac12$.`,
    { vals: [-0.5, 0.5, -sqrt(3) / 2, sqrt(3) / 2], check: () => Math.cos(2 * PI / 3) });

  q("M5-ii-12", 2, EN, false,
    t`What is $\sin\!\left(\tfrac{11\pi}{6}\right)+\sqrt2\cos\!\left(\tfrac{7\pi}{4}\right)$?`,
    [t`$\tfrac12$`, t`$\tfrac32$`, t`$-\tfrac32$`, t`$-\tfrac12$`], 0,
    t`$\sin\tfrac{11\pi}{6}=-\tfrac12$ (fourth quadrant). $\cos\tfrac{7\pi}{4}=\tfrac{\sqrt2}{2}$, times $\sqrt2$ gives 1. Total $\tfrac12$.`,
    { vals: [0.5, 1.5, -1.5, -0.5], check: () => Math.sin(11 * PI / 6) + sqrt(2) * Math.cos(7 * PI / 4) });

  q("M5-iii-11", 2, VWO, false,
    t`Solve $\cos x=-\tfrac{\sqrt3}{2}$ for $0\le x\lt 2\pi$.`,
    [t`$x=\tfrac{5\pi}{6}$ or $x=\tfrac{7\pi}{6}$`, t`$x=\tfrac{\pi}{6}$ or $x=\tfrac{11\pi}{6}$`, t`$x=\tfrac{2\pi}{3}$ or $x=\tfrac{4\pi}{3}$`, t`$x=\tfrac{5\pi}{6}$ only`], 0,
    t`The reference angle is $\tfrac{\pi}{6}$. Cosine is negative in quadrants II and III: $\pi-\tfrac{\pi}{6}$ and $\pi+\tfrac{\pi}{6}$.`);

  q("M5-iii-12", 3, EN, false,
    t`How many solutions does $2\sin^2x-\sin x-1=0$ have for $0\le x\lt 2\pi$?`,
    [t`$3$`, t`$2$`, t`$4$`, t`$1$`], 0,
    t`$(2\sin x+1)(\sin x-1)=0$. $\sin x=1$ gives $\tfrac{\pi}{2}$. $\sin x=-\tfrac12$ gives $\tfrac{7\pi}{6},\tfrac{11\pi}{6}$. Total 3.`,
    { vals: [3, 2, 4, 1], check: () => [PI / 2, 7 * PI / 6, 11 * PI / 6].filter(x => Math.abs(2 * Math.sin(x) ** 2 - Math.sin(x) - 1) < 1e-9).length });

  q("M5-iii-13", 3, EN, false,
    t`How many solutions does $\cos 2x=\cos x$ have for $0\le x\lt 2\pi$?`,
    [t`$3$`, t`$2$`, t`$4$`, t`$6$`], 0,
    t`$2x=\pm x+2k\pi$. With $+$: $x=2k\pi$, giving $0$. With $-$: $3x=2k\pi$, giving $0,\tfrac{2\pi}{3},\tfrac{4\pi}{3}$. The set is $\{0,\tfrac{2\pi}{3},\tfrac{4\pi}{3}\}$: 3 solutions (0 is counted once).`,
    { vals: [3, 2, 4, 6], check: () => { const s = new Set(); for (let k = -6; k <= 6; k++) for (const x of [2 * k * PI, 2 * k * PI / 3]) if (x >= -1e-12 && x < 2 * PI - 1e-9) s.add(x.toFixed(6)); return s.size; } });

  q("M5-iv-11", 2, VWO, false,
    t`$\theta$ is acute with $\tan\theta=\tfrac34$. What is $\cos2\theta$?`,
    [t`$\tfrac{7}{25}$`, t`$\tfrac{24}{25}$`, t`$\tfrac{16}{25}$`, t`$-\tfrac{7}{25}$`], 0,
    t`A 3-4-5 triangle: $\sin\theta=\tfrac35$, $\cos\theta=\tfrac45$. $\cos2\theta=\cos^2\theta-\sin^2\theta=\tfrac{16-9}{25}=\tfrac7{25}$. Option B is $\sin2\theta$.`,
    { vals: [7 / 25, 24 / 25, 16 / 25, -7 / 25], check: () => Math.cos(2 * Math.atan(0.75)) });

  q("M5-iv-12", 3, EN, false,
    t`What is the maximum value of $\sin x+\cos x$?`,
    [t`$\sqrt2$`, t`$2$`, t`$1$`, t`$\tfrac{\sqrt2}{2}$`], 0,
    t`$\sin x+\cos x=\sqrt2\sin\!\left(x+\tfrac{\pi}{4}\right)$ (sum identity), so the maximum is $\sqrt2$ at $x=\tfrac{\pi}{4}$. Both terms cannot equal 1 at the same time, so 2 is impossible.`,
    { vals: [sqrt(2), 2, 1, sqrt(2) / 2], check: () => { let m = -9; for (let x = 0; x < 7; x += 1e-4) m = Math.max(m, Math.sin(x) + Math.cos(x)); return m; } });

  q("M5-v-11", 2, VWO, true,
    t`A Ferris wheel of diameter 40 m has its centre 25 m above the ground and turns once every 8 minutes. A seat is at the lowest point at $t=0$. How high is it after 1 minute?`,
    [t`$10.9$ m`, t`$25$ m`, t`$5$ m`, t`$39.1$ m`], 0,
    t`$h(t)=25-20\cos\!\left(\tfrac{2\pi}{8}t\right)$. At $t=1$: $25-20\cos\tfrac{\pi}{4}=25-14.1\approx10.9$ m. Option D uses $+$ instead of $-$.`,
    { vals: [10.86, 25, 5, 39.14], check: () => 25 - 20 * Math.cos(PI / 4) });

  q("M5-v-12", 3, EN, false,
    t`A sinusoid has maximum 5, minimum $-1$, period $\pi$, and a maximum at $x=\tfrac{\pi}{4}$. Which formula fits?`,
    [t`$f(x)=2+3\sin(2x)$`, t`$f(x)=2+3\sin\!\left(2x-\tfrac{\pi}{4}\right)$`, t`$f(x)=3+2\sin(2x)$`, t`$f(x)=2+3\sin\!\left(\tfrac{x}{2}\right)$`], 0,
    t`Equilibrium $\tfrac{5+(-1)}{2}=2$, amplitude 3, $c=\tfrac{2\pi}{\pi}=2$. Check the max: $2\cdot\tfrac{\pi}{4}=\tfrac{\pi}{2}$ gives $\sin=1$ and $f=5$. Option B peaks at $x=\tfrac{3\pi}{8}$.`);

  /* ---------- M6 Geometry ---------- */
  q("M6-i-11", 2, EN, false,
    t`For what radius $r$ is a sphere's volume numerically equal to its surface area?`,
    [t`$3$`, t`$1$`, t`$\tfrac43$`, t`$6$`], 0,
    t`$\tfrac43\pi r^3=4\pi r^2\Rightarrow r=3$.`,
    { vals: [3, 1, 4 / 3, 6], check: () => 3 * 4 / 4 });

  q("M6-i-12", 3, EN, false,
    t`A cylinder of height 8 fits exactly inside a sphere of radius 5 (its rims touch the sphere). What is the volume of the cylinder?`,
    [t`$72\pi$`, t`$200\pi$`, t`$128\pi$`, t`$96\pi$`], 0,
    t`Half the height is 4. The rim radius satisfies $r^2+4^2=5^2\Rightarrow r=3$. $V=\pi\cdot9\cdot8=72\pi$. Option B uses $r=5$.`,
    { vals: [72 * PI, 200 * PI, 128 * PI, 96 * PI], check: () => PI * (25 - 16) * 8 });

  q("M6-ii-11", 2, VWO, false,
    t`What is the area of a regular hexagon with side 2?`,
    [t`$6\sqrt3$`, t`$3\sqrt3$`, t`$12$`, t`$4\sqrt3$`], 0,
    t`The hexagon splits into 6 equilateral triangles of side 2, each with area $\tfrac{\sqrt3}{4}\cdot4=\sqrt3$. Total $6\sqrt3\approx10.4$.`,
    { vals: [6 * sqrt(3), 3 * sqrt(3), 12, 4 * sqrt(3)], check: () => 6 * sqrt(3) / 4 * 4 });

  q("M6-ii-12", 2, PC, false,
    t`Chord $AB$ of a circle subtends a central angle of $100^\circ$. $C$ lies on the major arc. What is $\angle ACB$?`,
    [t`$50^\circ$`, t`$100^\circ$`, t`$130^\circ$`, t`$80^\circ$`], 0,
    t`An inscribed angle is half the central angle on the same arc: $50^\circ$. (On the minor arc it would be $180-50=130^\circ$.)`,
    { vals: [50, 100, 130, 80], check: () => 100 / 2 });

  q("M6-iii-11", 2, VWO, false,
    t`Two sides of a triangle are 3 and 4, with a $60^\circ$ angle between them. How long is the third side?`,
    [t`$\sqrt{13}$`, t`$5$`, t`$\sqrt{37}$`, t`$\sqrt7$`], 0,
    t`$c^2=9+16-2\cdot3\cdot4\cos60^\circ=25-12=13$. Option C uses $+12$ (that is for $120^\circ$).`,
    { vals: [sqrt(13), 5, sqrt(37), sqrt(7)], check: () => sqrt(25 - 24 * 0.5) });

  q("M6-iii-12", 2, PC, false,
    t`A triangle has sides 7 and 8 with a $30^\circ$ angle between them. What is its area?`,
    [t`$14$`, t`$28$`, t`$14\sqrt3$`, t`$56$`], 0,
    t`Area $=\tfrac12ab\sin C=\tfrac12\cdot7\cdot8\cdot\tfrac12=14$.`,
    { vals: [14, 28, 14 * sqrt(3), 56], check: () => 0.5 * 7 * 8 * Math.sin(PI / 6) });

  q("M6-iii-13", 1, VWO, true,
    t`From 100 m away from the base of a control tower, the angle of elevation to the top is $30^\circ$. How tall is the tower?`,
    [t`$57.7$ m`, t`$50.0$ m`, t`$86.6$ m`, t`$173$ m`], 0,
    t`$h=100\tan30^\circ=\dfrac{100}{\sqrt3}\approx57.7$ m. Option B uses $\sin$ and option D divides by $\tan$.`,
    { vals: [57.74, 50, 86.6, 173.2], check: () => 100 * Math.tan(PI / 6) });

  q("M6-iv-11", 2, VWO, false,
    t`What is the perpendicular bisector of the segment from $A(1,2)$ to $B(5,6)$?`,
    [t`$y=-x+7$`, t`$y=x+1$`, t`$y=-x+11$`, t`$y=x-1$`], 0,
    t`Midpoint $(3,4)$. $AB$ has slope 1, so the perpendicular slope is $-1$: $y-4=-(x-3)\Rightarrow y=-x+7$. Option B is line $AB$ itself.`);

  q("M6-iv-12", 3, EN, false,
    t`Which circle passes through $(0,0)$, $(6,0)$ and $(0,8)$?`,
    [t`$x^2+y^2-6x-8y=0$`, t`$x^2+y^2+6x+8y=0$`, t`$x^2+y^2=100$`, t`$(x-6)^2+(y-8)^2=25$`], 0,
    t`The angle at the origin is $90^\circ$, so the hypotenuse from $(6,0)$ to $(0,8)$ is a diameter. Centre $(3,4)$, radius 5: $(x-3)^2+(y-4)^2=25$, which expands to option A.`);

  q("M6-v-11", 3, EN, false,
    t`The circles $x^2+y^2=25$ and $(x-6)^2+y^2=25$ intersect in two points. How far apart are those points?`,
    [t`$8$`, t`$6$`, t`$4$`, t`$10$`], 0,
    t`Subtracting the equations: $-12x+36=0\Rightarrow x=3$, so $y=\pm4$. The points $(3,\pm4)$ are 8 apart.`,
    { vals: [8, 6, 4, 10], check: () => 2 * sqrt(25 - 9) });

  q("M6-vi-11", 2, PC, false,
    t`What is the distance between the parallel lines $3x+4y=5$ and $3x+4y=20$?`,
    [t`$3$`, t`$15$`, t`$5$`, t`$\tfrac{15}{7}$`], 0,
    t`$d=\dfrac{|20-5|}{\sqrt{3^2+4^2}}=\dfrac{15}{5}=3$.`,
    { vals: [3, 15, 5, 15 / 7], check: () => 15 / 5 });

  /* ---------- M7 Vectors ---------- */
  q("M7-i-11", 1, VWO, false,
    t`What is the length of $\begin{pmatrix}-5\\12\end{pmatrix}$?`,
    [t`$13$`, t`$7$`, t`$17$`, t`$\sqrt{119}$`], 0,
    t`$\sqrt{25+144}=13$.`,
    { vals: [13, 7, 17, sqrt(119)], check: () => Math.hypot(-5, 12) });

  q("M7-ii-11", 2, PC, true,
    t`What is the scalar projection of $\mathbf a=\begin{pmatrix}2\\3\end{pmatrix}$ onto $\mathbf b=\begin{pmatrix}4\\-1\end{pmatrix}$?`,
    [t`$\dfrac{5}{\sqrt{17}}$`, t`$\dfrac{5}{\sqrt{13}}$`, t`$5$`, t`$\dfrac{11}{\sqrt{17}}$`], 0,
    t`$\dfrac{\mathbf a\cdot\mathbf b}{|\mathbf b|}=\dfrac{8-3}{\sqrt{17}}=\dfrac{5}{\sqrt{17}}\approx1.21$. Option B divides by $|\mathbf a|$, giving the projection of $\mathbf b$ onto $\mathbf a$.`,
    { vals: [5 / sqrt(17), 5 / sqrt(13), 5, 11 / sqrt(17)], check: () => (8 - 3) / Math.hypot(4, -1) });

  q("M7-ii-12", 3, EN, false,
    t`$|\mathbf a|=3$, $|\mathbf b|=4$ and the angle between them is $60^\circ$. What is $|\mathbf a+\mathbf b|$?`,
    [t`$\sqrt{37}$`, t`$7$`, t`$\sqrt{13}$`, t`$5$`], 0,
    t`$|\mathbf a+\mathbf b|^2=|\mathbf a|^2+|\mathbf b|^2+2\,\mathbf a\cdot\mathbf b=9+16+2\cdot3\cdot4\cdot\tfrac12=37$. Option C is $|\mathbf a-\mathbf b|$.`,
    { vals: [sqrt(37), 7, sqrt(13), 5], check: () => sqrt(9 + 16 + 12) });

  q("M7-ii-13", 2, VWO, true,
    t`In triangle $A(0,0)$, $B(4,0)$, $C(1,3)$, what is $\angle A$, to the nearest degree?`,
    [t`$72^\circ$`, t`$18^\circ$`, t`$45^\circ$`, t`$63^\circ$`], 0,
    t`$\vec{AB}=(4,0)$ and $\vec{AC}=(1,3)$. $\cos A=\dfrac{4}{4\sqrt{10}}=\dfrac{1}{\sqrt{10}}\Rightarrow A\approx71.6^\circ$.`,
    { vals: [72, 18, 45, 63], check: () => Math.round(Math.acos(1 / sqrt(10)) * 180 / PI) });

  q("M7-iii-11", 2, PC, false,
    t`A projectile moves with $\mathbf r(t)=\begin{pmatrix}3t\\4t-5t^2\end{pmatrix}$ (m, s). What is its speed at the highest point?`,
    [t`$3$ m/s`, t`$5$ m/s`, t`$0$ m/s`, t`$4$ m/s`], 0,
    t`$\mathbf v=(3,\ 4-10t)$. At the top the vertical component is zero ($t=0.4$ s), leaving speed 3 m/s. Option B is the launch speed.`,
    { vals: [3, 5, 0, 4], check: () => Math.hypot(3, 4 - 10 * 0.4) });

  q("M7-iii-12", 3, EN, false,
    t`A point moves with $\mathbf r(t)=\begin{pmatrix}2t\\t^2\end{pmatrix}$. What is the angle between its velocity and acceleration at $t=1$?`,
    [t`$45^\circ$`, t`$90^\circ$`, t`$30^\circ$`, t`$0^\circ$`], 0,
    t`$\mathbf v=(2,2t)=(2,2)$ and $\mathbf a=(0,2)$. $\cos\varphi=\dfrac{4}{2\sqrt2\cdot2}=\dfrac{1}{\sqrt2}\Rightarrow\varphi=45^\circ$.`,
    { vals: [45, 90, 30, 0], check: () => Math.acos(4 / (2 * sqrt(2) * 2)) * 180 / PI });

  q("M7-iv-11", 2, VWO, false,
    t`Where do the lines $\begin{pmatrix}x\\y\end{pmatrix}=\begin{pmatrix}1\\0\end{pmatrix}+\lambda\begin{pmatrix}1\\2\end{pmatrix}$ and $\begin{pmatrix}x\\y\end{pmatrix}=\begin{pmatrix}0\\5\end{pmatrix}+\mu\begin{pmatrix}1\\-1\end{pmatrix}$ intersect?`,
    [t`$\left(\tfrac73,\ \tfrac83\right)$`, t`$\left(\tfrac43,\ \tfrac{11}{3}\right)$`, t`$(2,\ 3)$`, t`$\left(\tfrac83,\ \tfrac73\right)$`], 0,
    t`$1+\lambda=\mu$ and $2\lambda=5-\mu$. Substituting: $2\lambda=4-\lambda\Rightarrow\lambda=\tfrac43$. Point $\left(1+\tfrac43,\ \tfrac83\right)=\left(\tfrac73,\tfrac83\right)$.`);

  q("M7-iv-12", 3, EN, true,
    t`What is the acute angle between lines with direction vectors $\begin{pmatrix}1\\2\end{pmatrix}$ and $\begin{pmatrix}3\\-1\end{pmatrix}$, to the nearest degree?`,
    [t`$82^\circ$`, t`$98^\circ$`, t`$45^\circ$`, t`$8^\circ$`], 0,
    t`$\cos\varphi=\dfrac{|3-2|}{\sqrt5\sqrt{10}}=\dfrac{1}{\sqrt{50}}\approx0.141\Rightarrow\varphi\approx81.9^\circ$. Taking the absolute value gives the acute angle.`,
    { vals: [82, 98, 45, 8], check: () => Math.round(Math.acos(1 / sqrt(50)) * 180 / PI) });

  q("M7-vi-11", 3, EN, false,
    t`The curve $x=t^3-3t$, $y=t^2$ has vertical tangents at which points?`,
    [t`$(-2,1)$ and $(2,1)$`, t`$(0,0)$`, t`$(2,1)$ only`, t`$(0,3)$ and $(0,-3)$`], 0,
    t`A vertical tangent needs $\tfrac{dx}{dt}=0$ with $\tfrac{dy}{dt}\ne0$. $3t^2-3=0\Rightarrow t=\pm1$, where $\tfrac{dy}{dt}=\pm2\ne0$. $t=1$: $(-2,1)$; $t=-1$: $(2,1)$.`);

  q("M7-vii-11", 3, EN, false,
    t`A uniform $4\times4$ square plate $[0,4]\times[0,4]$ has the $2\times2$ square $[2,4]\times[2,4]$ cut out. What is the $x$-coordinate of the centre of gravity?`,
    [t`$\tfrac53$`, t`$2$`, t`$\tfrac32$`, t`$\tfrac73$`], 0,
    t`Treat the hole as negative area: $\bar x=\dfrac{16\cdot2-4\cdot3}{16-4}=\dfrac{20}{12}=\dfrac53$. The centre moves away from the hole.`,
    { vals: [5 / 3, 2, 1.5, 7 / 3], check: () => (16 * 2 - 4 * 3) / 12 });
})();
