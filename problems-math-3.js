/* Delft AE Drill: mathematics bank, set 3.
   Original problems on the TU Delft AE Selection Exam syllabus (Mathematics, v2024), calibrated to TU Delft
   Pre-University Calculus, Dutch VWO Wiskunde B and Cambridge ENGAA/ESAT. Question types that the generated
   cards don't cover. Ids use serials from 31 upward to stay clear of sets 1 and 2. */
(function () {
  const G = typeof window !== "undefined" ? window : globalThis;
  G.PROBLEMS = G.PROBLEMS || [];
  const t = String.raw;
  const PI = Math.PI, sqrt = Math.sqrt, E = Math.E, ln = Math.log;
  function q(id, difficulty, model, calc, stem, choices, answer, solution, extra) {
    const [code, sub] = id.split("-");
    G.PROBLEMS.push(Object.assign({ id, subject: "math", topic: code, sub, difficulty, model, calc, stem, choices, answer, solution, figure: null }, extra || {}));
  }
  const PC = "Pre-Uni Calculus", VWO = "VWO Wiskunde B", EN = "ENGAA/ESAT";
  const integ = (f, a, b, n = 20000) => { let s = 0; const h = (b - a) / n; for (let i = 0; i < n; i++) s += f(a + (i + 0.5) * h) * h; return s; };
  const roots = (f, a, b, n = 99991) => { let c = 0, prev = f(a); for (let i = 1; i <= n; i++) { const v = f(a + (b - a) * i / n); if (prev * v < 0) c++; prev = v; } return c; };
  const minOf = (f, a, b, n = 200000) => { let m = Infinity; for (let i = 0; i <= n; i++) m = Math.min(m, f(a + (b - a) * i / n)); return m; };

  /* ---------- M1 Functions and graphs ---------- */
  q("M1-i-31", 2, PC, false,
    t`Let $f(x)=\sqrt{x+1}$ and $g(x)=x^2-5$. What is the domain of $f(g(x))$?`,
    [t`$x\le -2$ or $x\ge 2$`, t`$x\ge 2$`, t`$x\ge -1$`, t`$-2\le x\le 2$`], 0,
    t`$f(g(x))=\sqrt{x^2-5+1}=\sqrt{x^2-4}$, which needs $x^2-4\ge 0$: $x\le -2$ or $x\ge 2$. The domain of $f$ alone ($x\ge -1$) is a condition on $g(x)$, not on $x$.`);

  q("M1-ii-31", 1, PC, false,
    t`Which of these functions is even (its graph is symmetric in the $y$-axis)?`,
    [t`$f(x)=x^4+\cos x$`, t`$f(x)=x^3-x$`, t`$f(x)=e^x+x^2$`, t`$f(x)=\sin x+1$`], 0,
    t`Even means $f(-x)=f(x)$. $(-x)^4=x^4$ and $\cos(-x)=\cos x$, so $x^4+\cos x$ is even. $x^3-x$ is odd, and the other two are neither: $e^{-x}\ne e^x$ and $\sin(-x)+1=-\sin x+1$.`);

  q("M1-ii-32", 2, EN, false,
    t`How many real solutions does $|x^2-4|=3$ have?`,
    [t`$4$`, t`$2$`, t`$3$`, t`$0$`], 0,
    t`Either $x^2-4=3$, so $x=\pm\sqrt7$, or $x^2-4=-3$, so $x=\pm1$. That makes 4 solutions. On the graph, the horizontal line $y=3$ crosses the reflected bump between $-2$ and $2$ as well as both outer branches.`,
    { vals: [4, 2, 3, 0], check: () => roots(x => Math.abs(x * x - 4) - 3, -5, 5) });

  {
    const f = x => (2 * x - 1) / (x + 3), y0 = 0.7;
    const cand = [y => (3 * y + 1) / (2 - y), y => (3 * y - 1) / (y - 2), y => (y + 3) / (2 * y - 1), y => (2 * y + 1) / (y - 3)];
    q("M1-iii-31", 2, PC, false,
      t`Let $f(x)=\dfrac{2x-1}{x+3}$. Which expression is $f^{-1}(x)$?`,
      [t`$\dfrac{3x+1}{2-x}$`, t`$\dfrac{3x-1}{x-2}$`, t`$\dfrac{x+3}{2x-1}$`, t`$\dfrac{2x+1}{x-3}$`], 0,
      t`Write $y=\dfrac{2x-1}{x+3}$, so $y(x+3)=2x-1$, i.e. $xy+3y=2x-1$. Collect the $x$-terms: $x(y-2)=-1-3y$, so $x=\dfrac{3y+1}{2-y}$. Swap the letters: $f^{-1}(x)=\dfrac{3x+1}{2-x}$. ($\dfrac{x+3}{2x-1}$ is $\dfrac{1}{f(x)}$, not the inverse.)`,
      { vals: cand.map(c => f(c(y0))), check: () => y0 });
  }

  /* ---------- M2 Algebraic solving ---------- */
  q("M2-ii-31", 2, VWO, false,
    t`Solve $e^{2x}-5e^x+6=0$.`,
    [t`$x=\ln 2$ or $x=\ln 3$`, t`$x=2$ or $x=3$`, t`$x=e^2$ or $x=e^3$`, t`$x=-\ln 2$ or $x=-\ln 3$`], 0,
    t`Put $u=e^x$: $u^2-5u+6=(u-2)(u-3)=0$, so $e^x=2$ or $e^x=3$, giving $x=\ln 2$ or $x=\ln 3$. Stopping at $u=2,3$ answers the wrong question.`);

  q("M2-ii-32", 1, PC, false,
    t`What is $\log_2 8+\log_2\tfrac14-\log_2\sqrt2$?`,
    [t`$\tfrac12$`, t`$1$`, t`$\tfrac32$`, t`$-\tfrac12$`], 0,
    t`$\log_2 8=3$, $\log_2\tfrac14=-2$ and $\log_2\sqrt2=\tfrac12$. So the total is $3-2-\tfrac12=\tfrac12$.`,
    { vals: [0.5, 1, 1.5, -0.5], check: () => Math.log2(8) + Math.log2(0.25) - Math.log2(sqrt(2)) });

  q("M2-ii-33", 2, VWO, false,
    t`Solve $\ln x-\ln(x-1)=\ln 3$.`,
    [t`$x=\tfrac32$`, t`$x=3$`, t`$x=\tfrac23$`, t`$x=4$`], 0,
    t`$\ln\dfrac{x}{x-1}=\ln 3$, so $\dfrac{x}{x-1}=3$, i.e. $x=3x-3$ and $x=\tfrac32$. It satisfies $x\gt 1$, so both logarithms exist.`,
    { vals: [1.5, 3, 2 / 3, 4], check: () => { let a = 1.0001, b = 50; for (let i = 0; i < 200; i++) { const m = (a + b) / 2; (ln(m) - ln(m - 1) - ln(3) > 0) ? (a = m) : (b = m); } return (a + b) / 2; } });

  q("M2-iii-31", 2, PC, false,
    t`For which values of $k$ does $x^2+kx+9=0$ have no real solutions?`,
    [t`$-6\lt k\lt 6$`, t`$k\lt -6$ or $k\gt 6$`, t`$-3\lt k\lt 3$`, t`$k\lt 6$`], 0,
    t`No real solutions means a negative discriminant: $k^2-4\cdot 1\cdot 9\lt 0$, so $k^2\lt 36$ and $-6\lt k\lt 6$.`);

  q("M2-ii-34", 1, PC, false,
    t`Simplify $\dfrac{x^{3/2}\cdot x^{1/2}}{x^{-1}}$ for $x\gt 0$.`,
    [t`$x^3$`, t`$x$`, t`$x^{-3}$`, t`$x^{3/4}$`], 0,
    t`Multiply: add the exponents, $\tfrac32+\tfrac12=2$. Divide by $x^{-1}$: subtract, $2-(-1)=3$. So the result is $x^3$.`);

  /* ---------- M3 Differential calculus ---------- */
  q("M3-i-31", 2, PC, false,
    t`What is $f'(x)$ for $f(x)=\dfrac{e^x}{x}$?`,
    [t`$\dfrac{e^x(x-1)}{x^2}$`, t`$\dfrac{e^x(1-x)}{x^2}$`, t`$e^x$`, t`$\dfrac{e^x(x+1)}{x^2}$`], 0,
    t`Quotient rule: $f'(x)=\dfrac{e^x\cdot x-e^x\cdot 1}{x^2}=\dfrac{e^x(x-1)}{x^2}$. Swapping the order in the numerator gives the wrong sign.`);

  q("M3-i-32", 2, PC, false,
    t`What is $f'(x)$ for $f(x)=\ln(\sin x)$, where $\sin x\gt 0$?`,
    [t`$\dfrac{\cos x}{\sin x}$`, t`$\dfrac{1}{\sin x}$`, t`$\dfrac{1}{\cos x}$`, t`$-\dfrac{\sin x}{\cos x}$`], 0,
    t`Chain rule: $f'(x)=\dfrac{1}{\sin x}\cdot\cos x=\dfrac{\cos x}{\sin x}$, which is $\cot x$. Forgetting the inner derivative leaves $\dfrac{1}{\sin x}$.`);

  q("M3-ii-31", 2, VWO, false,
    t`What is the minimum value of $f(x)=x\ln x$ for $x\gt 0$?`,
    [t`$-\tfrac1e$`, t`$\tfrac1e$`, t`$-1$`, t`$0$`], 0,
    t`$f'(x)=\ln x+x\cdot\tfrac1x=\ln x+1$, which is zero at $x=\tfrac1e$. $f'$ goes from negative to positive there, so it is a minimum: $f\!\left(\tfrac1e\right)=\tfrac1e\ln\tfrac1e=-\tfrac1e$.`,
    { vals: [-1 / E, 1 / E, -1, 0], check: () => minOf(x => x * ln(x), 1e-6, 3) });

  q("M3-ii-32", 3, EN, false,
    t`A function has derivative $f'(x)=(x-1)^2(x+2)$. Which statement about its stationary points is true?`,
    [t`$f$ has a local minimum at $x=-2$, and no extremum at $x=1$`, t`$f$ has a local maximum at $x=-2$ and a local minimum at $x=1$`, t`$f$ has local minima at $x=-2$ and at $x=1$`, t`$f$ has a local minimum at $x=1$ only`], 0,
    t`$f'$ is zero at $x=-2$ and $x=1$. Look at the sign of $f'$: $(x-1)^2\ge 0$ always, so the sign is that of $x+2$. Around $x=-2$, $f'$ goes from negative to positive: a minimum. Around $x=1$, $f'$ stays positive on both sides: the graph flattens out but keeps rising (a horizontal point of inflection), so there is no extremum.`);

  q("M3-iii-31", 3, EN, false,
    t`The radius of a spherical balloon grows at a constant $0.5$ cm/s. How fast is its volume increasing when the radius is 10 cm?`,
    [t`$200\pi\ \text{cm}^3/\text{s}$`, t`$400\pi\ \text{cm}^3/\text{s}$`, t`$100\pi\ \text{cm}^3/\text{s}$`, t`$\tfrac{2000}{3}\pi\ \text{cm}^3/\text{s}$`], 0,
    t`$V=\tfrac43\pi r^3$, so by the chain rule $\dfrac{dV}{dt}=4\pi r^2\dfrac{dr}{dt}=4\pi\cdot 100\cdot 0.5=200\pi\ \text{cm}^3/\text{s}$.`,
    { vals: [200 * PI, 400 * PI, 100 * PI, 2000 / 3 * PI], check: () => { const V = r => 4 / 3 * PI * r ** 3, h = 1e-6; return (V(10 + 0.5 * h) - V(10 - 0.5 * h)) / (2 * h); } });

  q("M3-iii-32", 2, VWO, false,
    t`What is the shortest distance from the point $(2,0)$ to the curve $y=\sqrt x$?`,
    [t`$\tfrac12\sqrt7$`, t`$\sqrt2$`, t`$\tfrac32$`, t`$\tfrac12\sqrt6$`], 0,
    t`A point on the curve is $(x,\sqrt x)$. Its squared distance to $(2,0)$ is $D(x)=(x-2)^2+x$, which is easier to minimise than the distance itself. $D'(x)=2(x-2)+1=0$ gives $x=\tfrac32$, and $D=\tfrac14+\tfrac32=\tfrac74$. So the distance is $\sqrt{\tfrac74}=\tfrac12\sqrt7$.`,
    { vals: [sqrt(7) / 2, sqrt(2), 1.5, sqrt(6) / 2], check: () => sqrt(minOf(x => (x - 2) ** 2 + x, 0, 5)) });

  /* ---------- M4 Integral calculus ---------- */
  q("M4-ii-31", 2, PC, false,
    t`Which function is an antiderivative of $xe^{x^2}$?`,
    [t`$\tfrac12e^{x^2}$`, t`$e^{x^2}$`, t`$2xe^{x^2}$`, t`$\tfrac12x^2e^{x^2}$`], 0,
    t`Guess $e^{x^2}$ and differentiate: $\dfrac{d}{dx}e^{x^2}=2xe^{x^2}$, twice too much. So $\tfrac12e^{x^2}$ works: its derivative is $\tfrac12\cdot 2xe^{x^2}=xe^{x^2}$.`);

  q("M4-ii-32", 2, PC, false,
    t`Evaluate $\displaystyle\int_0^{\pi/2}\sin x\cos x\,dx$.`,
    [t`$\tfrac12$`, t`$1$`, t`$0$`, t`$\tfrac14$`], 0,
    t`$\sin x\cos x=\tfrac12\sin 2x$, with antiderivative $-\tfrac14\cos 2x$. So the integral is $-\tfrac14(\cos\pi-\cos 0)=-\tfrac14(-1-1)=\tfrac12$. (Or: $\tfrac12\sin^2x$ is an antiderivative, giving $\tfrac12(1-0)$.)`,
    { vals: [0.5, 1, 0, 0.25], check: () => integ(x => Math.sin(x) * Math.cos(x), 0, PI / 2) });

  q("M4-i-31", 2, VWO, false,
    t`Evaluate $\displaystyle\int_{-1}^{2}|x|\,dx$.`,
    [t`$\tfrac52$`, t`$\tfrac32$`, t`$3$`, t`$\tfrac12$`], 0,
    t`Split at $x=0$, where $|x|$ changes formula: $\displaystyle\int_{-1}^{0}(-x)\,dx+\int_0^2 x\,dx=\tfrac12+2=\tfrac52$. Ignoring the absolute value gives $\tfrac32$.`,
    { vals: [2.5, 1.5, 3, 0.5], check: () => integ(Math.abs, -1, 2) });

  q("M4-iii-31", 2, EN, false,
    t`What is the total area enclosed between the graph of $y=\sin x$ and the $x$-axis for $0\le x\le 2\pi$?`,
    [t`$4$`, t`$0$`, t`$2$`, t`$2\pi$`], 0,
    t`$\displaystyle\int_0^{2\pi}\sin x\,dx=0$ because the part below the axis cancels the part above. For area, count both as positive: $\displaystyle\int_0^{\pi}\sin x\,dx=2$, and the region from $\pi$ to $2\pi$ is the same size. The total is $4$.`,
    { vals: [4, 0, 2, 2 * PI], check: () => integ(x => Math.abs(Math.sin(x)), 0, 2 * PI) });

  q("M4-i-32", 2, PC, false,
    t`Given $\displaystyle\int_0^3 f(x)\,dx=5$ and $\displaystyle\int_0^3 g(x)\,dx=2$, what is $\displaystyle\int_0^3\big(2f(x)-3g(x)+1\big)\,dx$?`,
    [t`$7$`, t`$4$`, t`$5$`, t`$8$`], 0,
    t`Integrals split over sums and constant factors: $2\cdot 5-3\cdot 2+\displaystyle\int_0^3 1\,dx=10-6+3=7$. The constant 1 contributes the length of the interval, 3, not 1.`,
    { vals: [7, 4, 5, 8], check: () => 2 * 5 - 3 * 2 + 3 });

  /* ---------- M5 Trigonometry ---------- */
  q("M5-iv-31", 2, VWO, false,
    t`Simplify $\dfrac{\sin 2x}{1+\cos 2x}$.`,
    [t`$\tan x$`, t`$\cot x$`, t`$\sin x$`, t`$2\tan x$`], 0,
    t`Use $\sin 2x=2\sin x\cos x$ and $1+\cos 2x=2\cos^2x$: $\dfrac{2\sin x\cos x}{2\cos^2x}=\dfrac{\sin x}{\cos x}=\tan x$.`);

  q("M5-iii-31", 2, VWO, false,
    t`How many solutions does $\sin 2x=\cos x$ have for $0\le x\lt 2\pi$?`,
    [t`$4$`, t`$2$`, t`$3$`, t`$6$`], 0,
    t`$2\sin x\cos x=\cos x$, so $\cos x\,(2\sin x-1)=0$. Either $\cos x=0$: $x=\tfrac{\pi}{2},\tfrac{3\pi}{2}$; or $\sin x=\tfrac12$: $x=\tfrac{\pi}{6},\tfrac{5\pi}{6}$. That makes 4. Dividing by $\cos x$ loses the first two.`,
    { vals: [4, 2, 3, 6], check: () => roots(x => Math.sin(2 * x) - Math.cos(x), 1e-7, 2 * PI - 1e-7) });

  /* ---------- M6 Geometry ---------- */
  q("M6-iii-31", 1, EN, false,
    t`A triangle has two sides of 7 and 8 with an angle of $30^\circ$ between them. What is its area?`,
    [t`$14$`, t`$28$`, t`$14\sqrt3$`, t`$56$`], 0,
    t`Area $=\tfrac12ab\sin C=\tfrac12\cdot 7\cdot 8\cdot\sin 30^\circ=\tfrac12\cdot 56\cdot\tfrac12=14$.`,
    { vals: [14, 28, 14 * sqrt(3), 56], check: () => 0.5 * 7 * 8 * Math.sin(PI / 6) });

  /* ---------- M7 Vectors ---------- */
  q("M7-ii-31", 2, VWO, false,
    t`Vectors $\mathbf a$ and $\mathbf b$ have lengths 3 and 4, and the angle between them is $60^\circ$. What is $|\mathbf a+\mathbf b|$?`,
    [t`$\sqrt{37}$`, t`$7$`, t`$5$`, t`$\sqrt{13}$`], 0,
    t`$|\mathbf a+\mathbf b|^2=(\mathbf a+\mathbf b)\cdot(\mathbf a+\mathbf b)=|\mathbf a|^2+2\,\mathbf a\cdot\mathbf b+|\mathbf b|^2=9+2\cdot 3\cdot 4\cos 60^\circ+16=37$. So $|\mathbf a+\mathbf b|=\sqrt{37}$. Lengths only add (to 7) when the vectors point the same way.`,
    { vals: [sqrt(37), 7, 5, sqrt(13)], check: () => Math.hypot(3 + 4 * Math.cos(PI / 3), 4 * Math.sin(PI / 3)) });

  q("M7-iv-31", 2, VWO, false,
    t`Where does the line $\begin{pmatrix}x\\ y\end{pmatrix}=\begin{pmatrix}1\\ 2\end{pmatrix}+\lambda\begin{pmatrix}3\\ -1\end{pmatrix}$ cross the $x$-axis?`,
    [t`$(7,\,0)$`, t`$(5,\,0)$`, t`$\left(0,\,\tfrac73\right)$`, t`$(-5,\,0)$`], 0,
    t`On the $x$-axis $y=0$: $2-\lambda=0$, so $\lambda=2$ and $x=1+3\cdot 2=7$. The point is $(7,0)$. ($\left(0,\tfrac73\right)$ is where it crosses the $y$-axis.)`);
})();
