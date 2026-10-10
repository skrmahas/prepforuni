/* Delft AE Drill: mathematics bank.
   Original problems written against the TU Delft AE Selection Exam syllabus (Mathematics & Physics, v2024).
   Difficulty and style are calibrated to: TU Delft Pre-University Calculus (MOOC), Dutch VWO Wiskunde B
   central exams, and Cambridge ENGAA/ESAT Section 1. No items are copied from those sources. */
(function () {
  const G = typeof window !== "undefined" ? window : globalThis;
  G.PROBLEMS = G.PROBLEMS || [];
  const t = String.raw;
  const PI = Math.PI, sqrt = Math.sqrt, E = Math.E, ln = Math.log;
  function q(id, difficulty, model, calc, stem, choices, answer, solution, extra) {
    const [code, sub] = id.split("-");
    G.PROBLEMS.push(Object.assign({
      id, subject: code[0] === "M" ? "math" : "physics", topic: code, sub,
      difficulty, model, calc, stem, choices, answer, solution, figure: null
    }, extra || {}));
  }
  const PC = "Pre-Uni Calculus", VWO = "VWO Wiskunde B", EN = "ENGAA/ESAT";

  /* ---------- M1 Functions and graphs ---------- */
  q("M1-i-01", 1, VWO, false,
    t`Let $f(x)=\sqrt{x}$ and $g(x)=x^2-4x+4$. Which expression equals $f(g(x))$ for every real $x$?`,
    [t`$x-2$`, t`$|x-2|$`, t`$\sqrt{x}-2$`, t`$x^2-2$`], 1,
    t`$g(x)=(x-2)^2$, so $f(g(x))=\sqrt{(x-2)^2}=|x-2|$. The square root is never negative, so $x-2$ is wrong for $x\lt 2$.`);

  q("M1-i-02", 2, EN, false,
    t`Let $f(x)=3x-1$ and $g(x)=x^2$. For how many real values of $x$ is $f(g(x))=g(f(x))$?`,
    [t`$0$`, t`$1$`, t`$2$`, t`infinitely many`], 0,
    t`$f(g(x))=3x^2-1$ and $g(f(x))=(3x-1)^2=9x^2-6x+1$. Setting them equal: $6x^2-6x+2=0 \Rightarrow 3x^2-3x+1=0$. The discriminant is $9-12\lt 0$, so there are no real solutions.`,
    { vals: [0, 1, 2, null], check: () => 0 });

  q("M1-i-03", 1, PC, false,
    t`Let $f(x)=\ln x$ and $g(x)=e^{2x}+1$. What is $g(f(3))$?`,
    [t`$7$`, t`$10$`, t`$e^6+1$`, t`$19$`], 1,
    t`$f(3)=\ln 3$, so $g(\ln 3)=e^{2\ln 3}+1=e^{\ln 9}+1=9+1=10$.`,
    { vals: [7, 10, Math.exp(6) + 1, 19], check: () => Math.exp(2 * ln(3)) + 1 });

  q("M1-ii-01", 1, VWO, false,
    t`What are the asymptotes of the graph of $f(x)=\dfrac{2x+1}{x-3}$?`,
    [t`$x=3$ and $y=2$`, t`$x=-3$ and $y=2$`, t`$x=3$ and $y=-\tfrac13$`, t`$x=\tfrac12$ and $y=3$`], 0,
    t`Vertical asymptote where the denominator is zero and the numerator is not: $x=3$. As $x\to\pm\infty$, $f(x)\to \tfrac{2x}{x}=2$, so $y=2$.`);

  q("M1-ii-02", 2, VWO, false,
    t`What is the range of $f(x)=\ln(4-x^2)$?`,
    [t`$(-\infty,\ \ln 4]$`, t`$(0,\ \ln 4]$`, t`$(-2,\ 2)$`, t`$[\ln 4,\ \infty)$`], 0,
    t`The domain is $-2\lt x\lt 2$. There $0\lt 4-x^2\le 4$, with maximum $4$ at $x=0$. Since $\ln$ is increasing and $\ln u\to-\infty$ as $u\to 0^+$, the range is $(-\infty,\ln 4]$. Option C is the domain, not the range.`);

  q("M1-ii-03", 1, PC, false,
    t`The graph of $y=e^x$ is shifted 2 units to the right, then stretched vertically by a factor 3, then reflected in the $x$-axis. Which equation results?`,
    [t`$y=-3e^{x-2}$`, t`$y=-3e^{x+2}$`, t`$y=3e^{-(x-2)}$`, t`$y=-e^{3(x-2)}$`], 0,
    t`Shift right 2: $e^{x-2}$. Vertical stretch 3: $3e^{x-2}$. Reflect in the $x$-axis (multiply by $-1$): $-3e^{x-2}$.`);

  q("M1-ii-04", 3, EN, false,
    t`The graph of $f(x)=x^3-3x^2+5x+2$ is point-symmetric. About which point?`,
    [t`$(1,\ 5)$`, t`$(0,\ 2)$`, t`$(1,\ 3)$`, t`$(-1,\ -7)$`], 0,
    t`A cubic is symmetric about its inflection point. $f''(x)=6x-6=0 \Rightarrow x=1$, and $f(1)=1-3+5+2=5$. So the point is $(1,5)$. (Check: $f(x)=(x-1)^3+2(x-1)+5$, an odd function shifted to $(1,5)$.)`);

  q("M1-iii-01", 1, PC, false,
    t`What is the inverse of $f(x)=2e^{3x}-1$?`,
    [t`$f^{-1}(x)=\tfrac13\ln\!\left(\tfrac{x+1}{2}\right)$`, t`$f^{-1}(x)=3\ln\!\left(\tfrac{x+1}{2}\right)$`, t`$f^{-1}(x)=\tfrac13\ln(2x+1)$`, t`$f^{-1}(x)=\tfrac{1}{2e^{3x}-1}$`], 0,
    t`Write $y=2e^{3x}-1$. Then $e^{3x}=\tfrac{y+1}{2}$, so $x=\tfrac13\ln\tfrac{y+1}{2}$. Swap the letters to get $f^{-1}(x)=\tfrac13\ln\tfrac{x+1}{2}$. Option D is the reciprocal, not the inverse.`);

  q("M1-iii-02", 2, VWO, false,
    t`Let $f(x)=\log_2(x-1)+3$. What is $f^{-1}(7)$?`,
    [t`$17$`, t`$9$`, t`$129$`, t`$\log_2 6+3$`], 0,
    t`$f^{-1}(7)$ is the $x$ with $f(x)=7$: $\log_2(x-1)=4 \Rightarrow x-1=16 \Rightarrow x=17$. Option D is $f(7)$.`,
    { vals: [17, 9, 129, ln(6) / ln(2) + 3], check: () => 2 ** 4 + 1 });

  q("M1-iii-03", 2, PC, false,
    t`Let $f(x)=\sqrt{x+4}-1$ for $x\ge -4$. Which gives $f^{-1}$ with its domain?`,
    [t`$f^{-1}(x)=(x+1)^2-4,\ x\ge -1$`, t`$f^{-1}(x)=(x+1)^2-4,\ x\ge -4$`, t`$f^{-1}(x)=(x-1)^2+4,\ x\ge 1$`, t`$f^{-1}(x)=\sqrt{x-4}+1,\ x\ge 4$`], 0,
    t`$y=\sqrt{x+4}-1 \Rightarrow (y+1)^2=x+4 \Rightarrow x=(y+1)^2-4$. The domain of $f^{-1}$ is the range of $f$. Since $\sqrt{\cdot}\ge 0$, $f(x)\ge -1$, so the domain is $x\ge -1$.`);

  /* ---------- M2 Algebraic solving ---------- */
  q("M2-i-01", 1, VWO, false,
    t`The period of a pendulum is $T=2\pi\sqrt{\dfrac{L}{g}}$. Which expression gives $g$?`,
    [t`$g=\dfrac{4\pi^2L}{T^2}$`, t`$g=\dfrac{2\pi L}{T^2}$`, t`$g=\dfrac{T^2}{4\pi^2L}$`, t`$g=\dfrac{4\pi^2 T^2}{L}$`], 0,
    t`Square both sides: $T^2=4\pi^2\dfrac{L}{g}$. Multiply by $g$ and divide by $T^2$: $g=\dfrac{4\pi^2 L}{T^2}$.`);

  q("M2-i-02", 2, EN, false,
    t`Given $y=\dfrac{3x+2}{x-1}$, express $x$ in terms of $y$.`,
    [t`$x=\dfrac{y+2}{y-3}$`, t`$x=\dfrac{y-2}{y+3}$`, t`$x=\dfrac{y+2}{3-y}$`, t`$x=\dfrac{2-y}{y-3}$`], 0,
    t`$y(x-1)=3x+2 \Rightarrow yx-y=3x+2 \Rightarrow x(y-3)=y+2 \Rightarrow x=\dfrac{y+2}{y-3}$.`);

  q("M2-ii-01", 1, PC, false,
    t`Simplify $\dfrac{x^2-9}{x^2+x-6}$ for the values of $x$ where it is defined.`,
    [t`$\dfrac{x-3}{x-2}$`, t`$\dfrac{x+3}{x-2}$`, t`$\dfrac{x-3}{x+2}$`, t`$\dfrac{3}{2}$`], 0,
    t`$x^2-9=(x-3)(x+3)$ and $x^2+x-6=(x+3)(x-2)$. Cancel $(x+3)$ to get $\dfrac{x-3}{x-2}$.`);

  q("M2-ii-02", 2, VWO, false,
    t`Solve $\ln x \le 2\ln 3-\ln x$.`,
    [t`$0\lt x\le 3$`, t`$x\le 3$`, t`$-3\le x\le 3$`, t`$0\lt x\le 9$`], 0,
    t`$2\ln x\le \ln 9 \Rightarrow \ln x^2\le\ln 9 \Rightarrow x^2\le 9$. With the domain $x\gt 0$ of $\ln x$, this gives $0\lt x\le 3$.`);

  q("M2-ii-03", 3, EN, false,
    t`What is the sum of all real solutions of $4^x-6\cdot 2^x+8=0$?`,
    [t`$3$`, t`$6$`, t`$2$`, t`$\log_2 6$`], 0,
    t`Let $u=2^x$, so $4^x=u^2$: $u^2-6u+8=0 \Rightarrow (u-2)(u-4)=0$. Then $2^x=2$ or $2^x=4$, so $x=1$ or $x=2$, and the sum is $3$.`,
    { vals: [3, 6, 2, ln(6) / ln(2)], check: () => 1 + 2 });

  q("M2-ii-04", 2, PC, false,
    t`Solve $e^{2x}-5e^{x}+6=0$.`,
    [t`$x=\ln 2$ or $x=\ln 3$`, t`$x=2$ or $x=3$`, t`$x=-\ln 2$ or $x=-\ln 3$`, t`$x=\ln 6$`], 0,
    t`Let $u=e^x\gt 0$: $u^2-5u+6=(u-2)(u-3)=0$. So $e^x=2$ or $e^x=3$, giving $x=\ln 2$ or $x=\ln 3$.`);

  q("M2-iii-01", 1, VWO, false,
    t`Solve $2x^2-7x+3=0$.`,
    [t`$x=\tfrac12$ or $x=3$`, t`$x=-\tfrac12$ or $x=-3$`, t`$x=1$ or $x=\tfrac32$`, t`$x=\tfrac{7\pm\sqrt{73}}{4}$`], 0,
    t`$2x^2-7x+3=(2x-1)(x-3)$, so $x=\tfrac12$ or $x=3$. (Discriminant check: $49-24=25$.)`);

  q("M2-iii-02", 2, EN, false,
    t`Which is the solution set of $x^3-4x^2-x+4=0$?`,
    [t`$\{-1,\ 1,\ 4\}$`, t`$\{1,\ 4\}$`, t`$\{-4,\ -1,\ 1\}$`, t`$\{-1,\ 4\}$`], 0,
    t`Group the terms: $x^2(x-4)-(x-4)=(x-4)(x^2-1)=(x-4)(x-1)(x+1)$, so $x\in\{-1,1,4\}$.`);

  q("M2-iii-03", 2, EN, false,
    t`For which values of $k\neq 0$ does $kx^2+4x+k=0$ have exactly one real solution?`,
    [t`$k=\pm 2$`, t`$k=2$ only`, t`$k=\pm 4$`, t`$-2\lt k\lt 2$`], 0,
    t`Exactly one solution means the discriminant is zero: $16-4k^2=0 \Rightarrow k^2=4 \Rightarrow k=\pm2$.`);

  q("M2-iv-01", 1, VWO, false,
    t`Given $2x+3y=12$ and $x-y=1$, what is $xy$?`,
    [t`$6$`, t`$5$`, t`$3$`, t`$\tfrac{12}{5}$`], 0,
    t`From the second equation $x=y+1$. Substituting: $2y+2+3y=12 \Rightarrow y=2,\ x=3$, so $xy=6$.`,
    { vals: [6, 5, 3, 2.4], check: () => 3 * 2 });

  q("M2-iv-02", 2, PC, false,
    t`Given $3a-2b=4$ and $5a+4b=36$, what is $a+b$?`,
    [t`$8$`, t`$6$`, t`$10$`, t`$\tfrac{40}{11}$`], 0,
    t`Double the first equation: $6a-4b=8$. Add the second: $11a=44 \Rightarrow a=4$. Then $b=(3\cdot4-4)/2=4$, so $a+b=8$.`,
    { vals: [8, 6, 10, 40 / 11], check: () => { const a = 44 / 11, b = (3 * a - 4) / 2; return a + b; } });

  /* ---------- M3 Differential calculus ---------- */
  q("M3-i-01", 1, PC, false,
    t`What is $f'(x)$ for $f(x)=x^2e^{-x}$?`,
    [t`$(2x-x^2)e^{-x}$`, t`$(2x+x^2)e^{-x}$`, t`$-2xe^{-x}$`, t`$2xe^{-x}$`], 0,
    t`Product rule: $f'=2x\cdot e^{-x}+x^2\cdot(-e^{-x})=(2x-x^2)e^{-x}$.`);

  q("M3-i-02", 2, VWO, false,
    t`What is $f'(x)$ for $f(x)=\sin^2(3x)$?`,
    [t`$3\sin(6x)$`, t`$6\sin(3x)$`, t`$2\sin(3x)\cos(3x)$`, t`$6\cos(3x)$`], 0,
    t`Chain rule twice: $f'=2\sin(3x)\cdot\cos(3x)\cdot 3=6\sin 3x\cos 3x=3\cdot 2\sin3x\cos3x=3\sin 6x$. Option C forgets the inner factor 3.`);

  q("M3-i-03", 2, PC, false,
    t`Let $f(x)=\dfrac{x^2+1}{x-1}$. What is $f'(2)$?`,
    [t`$-1$`, t`$1$`, t`$5$`, t`$-5$`], 0,
    t`Quotient rule: $f'(x)=\dfrac{2x(x-1)-(x^2+1)}{(x-1)^2}=\dfrac{x^2-2x-1}{(x-1)^2}$. At $x=2$: $\dfrac{4-4-1}{1}=-1$.`,
    { vals: [-1, 1, 5, -5], check: () => (4 - 4 - 1) / 1 });

  q("M3-i-04", 3, EN, false,
    t`Let $f(x)=\sqrt{1+e^{2x}}$. What is $f'(0)$?`,
    [t`$\dfrac{1}{\sqrt2}$`, t`$\dfrac{1}{2\sqrt2}$`, t`$\sqrt2$`, t`$1$`], 0,
    t`$f'(x)=\dfrac{1}{2\sqrt{1+e^{2x}}}\cdot 2e^{2x}=\dfrac{e^{2x}}{\sqrt{1+e^{2x}}}$. At $0$: $\dfrac{1}{\sqrt2}$.`,
    { vals: [1 / sqrt(2), 1 / (2 * sqrt(2)), sqrt(2), 1], check: () => { const h = 1e-6; const f = x => sqrt(1 + Math.exp(2 * x)); return (f(h) - f(-h)) / (2 * h); } });

  q("M3-ii-01", 1, VWO, false,
    t`What is the local maximum value of $f(x)=x^3-6x^2+9x+1$?`,
    [t`$5$`, t`$1$`, t`$9$`, t`$3$`], 0,
    t`$f'(x)=3x^2-12x+9=3(x-1)(x-3)$. $f''(x)=6x-12$ is negative at $x=1$, so that is a maximum: $f(1)=1-6+9+1=5$. ($f(3)=1$ is the local minimum.)`,
    { vals: [5, 1, 9, 3], check: () => 1 - 6 + 9 + 1 });

  q("M3-ii-02", 2, PC, false,
    t`At what $x$ does $f(x)=xe^{-x}$ have an inflection point?`,
    [t`$x=2$`, t`$x=1$`, t`$x=0$`, t`$x=e$`], 0,
    t`$f'=(1-x)e^{-x}$ and $f''=(x-2)e^{-x}$. $f''$ changes sign at $x=2$. ($x=1$ is the maximum.)`,
    { vals: [2, 1, 0, E], check: () => 2 });

  q("M3-ii-03", 2, VWO, false,
    t`On which interval is $f(x)=x^4-4x^3$ concave (curving downward)?`,
    [t`$0\lt x\lt 2$`, t`$0\lt x\lt 3$`, t`$x\lt 0$`, t`$x\gt 2$`], 0,
    t`$f''(x)=12x^2-24x=12x(x-2)$, which is negative exactly when $0\lt x\lt 2$.`);

  q("M3-ii-04", 3, EN, false,
    t`What is the maximum value of $f(x)=\dfrac{\ln x}{x}$ for $x\gt 0$?`,
    [t`$\dfrac1e$`, t`$e$`, t`$1$`, t`$0$`], 0,
    t`$f'(x)=\dfrac{1-\ln x}{x^2}=0 \Rightarrow x=e$, and $f$ goes from increasing to decreasing there. $f(e)=\dfrac{1}{e}$.`,
    { vals: [1 / E, E, 1, 0], check: () => ln(E) / E });

  q("M3-iii-01", 1, PC, false,
    t`What is the equation of the tangent line to $y=x^3$ at $x=2$?`,
    [t`$y=12x-16$`, t`$y=12x-8$`, t`$y=3x+2$`, t`$y=4x$`], 0,
    t`Slope $3x^2=12$ at $x=2$, through $(2,8)$: $y-8=12(x-2) \Rightarrow y=12x-16$.`);

  q("M3-iii-02", 2, VWO, false,
    t`The normal line to $y=e^{2x}$ at $x=0$ crosses the $x$-axis at which $x$?`,
    [t`$2$`, t`$-\tfrac12$`, t`$\tfrac12$`, t`$-2$`], 0,
    t`The tangent slope at 0 is $2e^{0}=2$, so the normal slope is $-\tfrac12$. The normal through $(0,1)$ is $y=1-\tfrac12x$, which is zero at $x=2$. The tangent $y=2x+1$ crosses at $-\tfrac12$ (option B).`,
    { vals: [2, -0.5, 0.5, -2], check: () => 1 / 0.5 });

  q("M3-iii-03", 2, VWO, false,
    t`An open box is made from a $12\times12$ cm sheet by cutting a square of side $x$ cm from each corner and folding up the sides. Which $x$ maximises the volume?`,
    [t`$2$ cm`, t`$3$ cm`, t`$4$ cm`, t`$6$ cm`], 0,
    t`$V=x(12-2x)^2$. $V'=(12-2x)^2-4x(12-2x)=(12-2x)(12-6x)=0 \Rightarrow x=2$ ($x=6$ gives $V=0$). $V(2)=128$ cm³.`,
    { vals: [2, 3, 4, 6], check: () => { let best = 0, bx = 0; for (let x = 0; x <= 6; x += 0.001) { const v = x * (12 - 2 * x) ** 2; if (v > best) { best = v; bx = x; } } return Math.round(bx * 100) / 100; } });

  q("M3-iii-04", 2, PC, false,
    t`A point moves along a line with $s(t)=t^3-6t^2+9t$ (m, s). What is its acceleration the first time its velocity is zero?`,
    [t`$-6\ \text{m/s}^2$`, t`$6\ \text{m/s}^2$`, t`$0\ \text{m/s}^2$`, t`$-12\ \text{m/s}^2$`], 0,
    t`$v=3t^2-12t+9=3(t-1)(t-3)$, which is first zero at $t=1$. $a=6t-12=-6$ m/s².`,
    { vals: [-6, 6, 0, -12], check: () => 6 * 1 - 12 });

  q("M3-iii-05", 3, EN, false,
    t`A rectangle has its base on the $x$-axis and its top corners on $y=9-x^2$. What is its maximum area?`,
    [t`$12\sqrt3$`, t`$6\sqrt3$`, t`$18$`, t`$36$`], 0,
    t`With corners at $\pm x$: $A=2x(9-x^2)=18x-2x^3$. $A'=18-6x^2=0 \Rightarrow x=\sqrt3$. $A=2\sqrt3\cdot 6=12\sqrt3\approx 20.8$.`,
    { vals: [12 * sqrt(3), 6 * sqrt(3), 18, 36], check: () => { let b = 0; for (let x = 0; x <= 3; x += 1e-4) b = Math.max(b, 2 * x * (9 - x * x)); return b; } });

  /* ---------- M4 Integral calculus ---------- */
  q("M4-i-01", 1, PC, false,
    t`Evaluate $\displaystyle\int_0^2 (3x^2+1)\,dx$.`,
    [t`$10$`, t`$8$`, t`$12$`, t`$14$`], 0,
    t`$\big[x^3+x\big]_0^2=8+2=10$.`,
    { vals: [10, 8, 12, 14], check: () => 8 + 2 });

  q("M4-i-02", 1, PC, false,
    t`$F$ is an antiderivative of $f$, with $F(1)=2$ and $\displaystyle\int_1^4 f(x)\,dx=7$. What is $F(4)$?`,
    [t`$9$`, t`$5$`, t`$7$`, t`$14$`], 0,
    t`$\int_1^4 f\,dx=F(4)-F(1)$, so $F(4)=7+2=9$.`,
    { vals: [9, 5, 7, 14], check: () => 7 + 2 });

  q("M4-ii-01", 1, VWO, false,
    t`Which is an antiderivative of $e^{3x-1}$?`,
    [t`$\tfrac13e^{3x-1}$`, t`$3e^{3x-1}$`, t`$e^{3x-1}$`, t`$\tfrac{1}{3x-1}e^{3x}$`], 0,
    t`For $f(ax+b)$, divide by $a$: $\int e^{3x-1}dx=\tfrac13e^{3x-1}+C$. Check by differentiating.`);

  q("M4-ii-02", 2, VWO, false,
    t`Evaluate $\displaystyle\int_0^{\pi/6}\cos(2x)\,dx$.`,
    [t`$\dfrac{\sqrt3}{4}$`, t`$\dfrac{\sqrt3}{2}$`, t`$\dfrac14$`, t`$\sqrt3$`], 0,
    t`$\big[\tfrac12\sin 2x\big]_0^{\pi/6}=\tfrac12\sin\tfrac{\pi}{3}=\tfrac12\cdot\tfrac{\sqrt3}{2}=\tfrac{\sqrt3}{4}$.`,
    { vals: [sqrt(3) / 4, sqrt(3) / 2, 0.25, sqrt(3)], check: () => 0.5 * Math.sin(PI / 3) });

  q("M4-ii-03", 2, PC, false,
    t`Evaluate $\displaystyle\int_0^1 \frac{1}{2x+1}\,dx$.`,
    [t`$\tfrac12\ln 3$`, t`$\ln 3$`, t`$2\ln 3$`, t`$\tfrac13$`], 0,
    t`$\big[\tfrac12\ln(2x+1)\big]_0^1=\tfrac12\ln3-\tfrac12\ln 1=\tfrac12\ln 3\approx0.549$.`,
    { vals: [0.5 * ln(3), ln(3), 2 * ln(3), 1 / 3], check: () => 0.5 * ln(3) });

  q("M4-ii-04", 3, EN, false,
    t`Evaluate $\displaystyle\int_0^{\pi}\sin^2x\,dx$.`,
    [t`$\dfrac{\pi}{2}$`, t`$\pi$`, t`$0$`, t`$1$`], 0,
    t`$\sin^2x=\tfrac12(1-\cos2x)$, so $\int_0^\pi\sin^2x\,dx=\big[\tfrac x2-\tfrac14\sin2x\big]_0^\pi=\tfrac{\pi}{2}$.`,
    { vals: [PI / 2, PI, 0, 1], check: () => PI / 2 });

  q("M4-iii-01", 1, VWO, false,
    t`What is the area of the region enclosed by $y=x^2$ and $y=4$?`,
    [t`$\dfrac{32}{3}$`, t`$\dfrac{16}{3}$`, t`$16$`, t`$8$`], 0,
    t`They intersect at $x=\pm2$. Area $=\int_{-2}^{2}(4-x^2)\,dx=\big[4x-\tfrac{x^3}{3}\big]_{-2}^{2}=16-\tfrac{16}{3}=\tfrac{32}{3}$.`,
    { vals: [32 / 3, 16 / 3, 16, 8], check: () => 16 - 16 / 3 });

  q("M4-iii-02", 2, PC, false,
    t`What is the area enclosed between $y=x$ and $y=x^2$?`,
    [t`$\dfrac16$`, t`$\dfrac12$`, t`$\dfrac13$`, t`$\dfrac56$`], 0,
    t`They meet at $x=0,1$, with $x\ge x^2$ in between. $\int_0^1(x-x^2)\,dx=\tfrac12-\tfrac13=\tfrac16$.`,
    { vals: [1 / 6, 1 / 2, 1 / 3, 5 / 6], check: () => 0.5 - 1 / 3 });

  q("M4-iii-03", 2, VWO, false,
    t`The region under $y=\sqrt{x}$ for $0\le x\le 4$ is rotated about the $x$-axis. What is the volume of the solid?`,
    [t`$8\pi$`, t`$16\pi$`, t`$\dfrac{16\pi}{3}$`, t`$4\pi$`], 0,
    t`$V=\pi\int_0^4(\sqrt x)^2dx=\pi\int_0^4x\,dx=\pi\cdot 8=8\pi$. Option C is $\pi\int_0^4\sqrt{x}\,dx$, which forgets to square.`,
    { vals: [8 * PI, 16 * PI, 16 * PI / 3, 4 * PI], check: () => PI * 8 });

  q("M4-iii-04", 3, EN, true,
    t`The region under $y=e^{x}$ for $0\le x\le 1$ is rotated about the $x$-axis. What is the volume?`,
    [t`$\tfrac{\pi}{2}(e^2-1)$`, t`$\pi(e-1)$`, t`$\pi(e^2-1)$`, t`$\tfrac{\pi}{2}e^2$`], 0,
    t`$V=\pi\int_0^1 e^{2x}dx=\pi\big[\tfrac12e^{2x}\big]_0^1=\tfrac{\pi}{2}(e^2-1)\approx 10.0$.`,
    { vals: [PI / 2 * (E * E - 1), PI * (E - 1), PI * (E * E - 1), PI / 2 * E * E], check: () => { let s = 0, n = 10000; for (let i = 0; i < n; i++) { const x = (i + 0.5) / n; s += Math.exp(2 * x) / n; } return PI * s; } });

  q("M4-iii-05", 3, EN, false,
    t`What is the arc length of $y=\tfrac23x^{3/2}$ from $x=0$ to $x=3$?`,
    [t`$\dfrac{14}{3}$`, t`$\dfrac{16}{3}$`, t`$2\sqrt3$`, t`$\dfrac{7}{3}$`], 0,
    t`$y'=\sqrt x$, so $L=\int_0^3\sqrt{1+x}\,dx=\big[\tfrac23(1+x)^{3/2}\big]_0^3=\tfrac23(8-1)=\tfrac{14}{3}$.`,
    { vals: [14 / 3, 16 / 3, 2 * sqrt(3), 7 / 3], check: () => { let s = 0, n = 20000; for (let i = 0; i < n; i++) { const x = 3 * (i + 0.5) / n; s += sqrt(1 + x) * 3 / n; } return s; } });

  q("M4-iii-06", 2, PC, false,
    t`What is the mean value of $f(x)=\sin x$ on $[0,\pi]$?`,
    [t`$\dfrac{2}{\pi}$`, t`$\dfrac12$`, t`$\dfrac{1}{\pi}$`, t`$2$`], 0,
    t`Mean $=\dfrac{1}{\pi-0}\int_0^\pi\sin x\,dx=\dfrac{1}{\pi}\big[-\cos x\big]_0^\pi=\dfrac{2}{\pi}\approx0.64$. Option D is the integral before dividing by the interval length.`,
    { vals: [2 / PI, 0.5, 1 / PI, 2], check: () => 2 / PI });

  q("M4-iii-07", 1, VWO, false,
    t`What is the mean value of $f(x)=3x^2$ on $[0,2]$?`,
    [t`$4$`, t`$8$`, t`$6$`, t`$12$`], 0,
    t`$\dfrac{1}{2}\int_0^2 3x^2\,dx=\dfrac12\cdot 8=4$.`,
    { vals: [4, 8, 6, 12], check: () => 8 / 2 });

  /* ---------- M5 Trigonometry ---------- */
  q("M5-i-01", 1, VWO, false,
    t`What is the period of $y=3\sin(4\pi t)$?`,
    [t`$\tfrac12$`, t`$2$`, t`$4\pi$`, t`$\tfrac{\pi}{2}$`], 0,
    t`Period $=\dfrac{2\pi}{4\pi}=\tfrac12$. The frequency is $2$ (option B).`,
    { vals: [0.5, 2, 4 * PI, PI / 2], check: () => 2 * PI / (4 * PI) });

  q("M5-i-02", 1, PC, false,
    t`What is $150^\circ$ in radians?`,
    [t`$\dfrac{5\pi}{6}$`, t`$\dfrac{3\pi}{4}$`, t`$\dfrac{2\pi}{3}$`, t`$\dfrac{5\pi}{3}$`], 0,
    t`$150\cdot\dfrac{\pi}{180}=\dfrac{5\pi}{6}$.`,
    { vals: [5 * PI / 6, 3 * PI / 4, 2 * PI / 3, 5 * PI / 3], check: () => 150 * PI / 180 });

  q("M5-ii-01", 2, VWO, false,
    t`What is the exact value of $\sin\!\left(\tfrac{2\pi}{3}\right)\cos\!\left(\tfrac{5\pi}{4}\right)$?`,
    [t`$-\dfrac{\sqrt6}{4}$`, t`$\dfrac{\sqrt6}{4}$`, t`$-\dfrac{\sqrt2}{4}$`, t`$-\dfrac{\sqrt3}{4}$`], 0,
    t`$\sin\tfrac{2\pi}{3}=\tfrac{\sqrt3}{2}$ (second quadrant, positive). $\cos\tfrac{5\pi}{4}=-\tfrac{\sqrt2}{2}$ (third quadrant, negative). The product is $-\tfrac{\sqrt6}{4}$.`,
    { vals: [-sqrt(6) / 4, sqrt(6) / 4, -sqrt(2) / 4, -sqrt(3) / 4], check: () => Math.sin(2 * PI / 3) * Math.cos(5 * PI / 4) });

  q("M5-ii-02", 2, PC, false,
    t`What is the exact value of $\tan\!\left(\tfrac{7\pi}{6}\right)+\cos\!\left(\tfrac{5\pi}{3}\right)$?`,
    [t`$\dfrac{\sqrt3}{3}+\dfrac12$`, t`$-\dfrac{\sqrt3}{3}+\dfrac12$`, t`$\dfrac{\sqrt3}{3}-\dfrac12$`, t`$\sqrt3+\dfrac12$`], 0,
    t`$\tan$ has period $\pi$: $\tan\tfrac{7\pi}{6}=\tan\tfrac{\pi}{6}=\tfrac{\sqrt3}{3}$. $\cos\tfrac{5\pi}{3}=\cos\!\left(-\tfrac{\pi}{3}\right)=\tfrac12$.`,
    { vals: [sqrt(3) / 3 + 0.5, -sqrt(3) / 3 + 0.5, sqrt(3) / 3 - 0.5, sqrt(3) + 0.5], check: () => Math.tan(7 * PI / 6) + Math.cos(5 * PI / 3) });

  q("M5-iii-01", 1, VWO, false,
    t`Solve $2\sin x=1$ for $0\le x\lt 2\pi$.`,
    [t`$x=\tfrac{\pi}{6}$ or $x=\tfrac{5\pi}{6}$`, t`$x=\tfrac{\pi}{6}$ only`, t`$x=\tfrac{\pi}{3}$ or $x=\tfrac{2\pi}{3}$`, t`$x=\tfrac{\pi}{6}$ or $x=\tfrac{7\pi}{6}$`], 0,
    t`$\sin x=\tfrac12$ gives $x=\tfrac{\pi}{6}$, and by symmetry $x=\pi-\tfrac{\pi}{6}=\tfrac{5\pi}{6}$.`);

  q("M5-iii-02", 2, VWO, false,
    t`How many solutions does $\cos(2x)=\tfrac12$ have for $0\le x\lt 2\pi$?`,
    [t`$4$`, t`$2$`, t`$1$`, t`$8$`], 0,
    t`$2x=\pm\tfrac{\pi}{3}+2k\pi \Rightarrow x=\pm\tfrac{\pi}{6}+k\pi$. In $[0,2\pi)$: $\tfrac{\pi}{6},\tfrac{5\pi}{6},\tfrac{7\pi}{6},\tfrac{11\pi}{6}$, which is four solutions. Doubling the argument doubles the number of solutions.`,
    { vals: [4, 2, 1, 8], check: () => { let c = 0; for (let k = -3; k <= 3; k++) for (const s of [1, -1]) { const x = s * PI / 6 + k * PI; if (x >= 0 && x < 2 * PI - 1e-9) c++; } return c; } });

  q("M5-iii-03", 3, EN, false,
    t`How many solutions does $\sin(3x)=\sin\!\left(x+\tfrac{\pi}{2}\right)$ have for $0\le x\lt \pi$?`,
    [t`$3$`, t`$2$`, t`$4$`, t`$6$`], 0,
    t`Case 1: $3x=x+\tfrac{\pi}{2}+2k\pi \Rightarrow x=\tfrac{\pi}{4}+k\pi$, giving $\tfrac{\pi}{4}$. Case 2: $3x=\pi-\left(x+\tfrac{\pi}{2}\right)+2k\pi \Rightarrow x=\tfrac{\pi}{8}+\tfrac{k\pi}{2}$, giving $\tfrac{\pi}{8},\tfrac{5\pi}{8}$. That is 3 solutions in total.`,
    { vals: [3, 2, 4, 6], check: () => { const s = new Set(); for (let k = -4; k <= 4; k++) { for (const x of [PI / 4 + k * PI, PI / 8 + k * PI / 2]) if (x >= -1e-12 && x < PI - 1e-12) s.add(x.toFixed(6)); } return s.size; } });

  q("M5-iii-04", 2, PC, false,
    t`Solve $\tan(2x)=\sqrt3$ for $0\le x\lt \pi$.`,
    [t`$x=\tfrac{\pi}{6}$ or $x=\tfrac{2\pi}{3}$`, t`$x=\tfrac{\pi}{6}$ only`, t`$x=\tfrac{\pi}{3}$ or $x=\tfrac{4\pi}{3}$`, t`$x=\tfrac{\pi}{6}$ or $x=\tfrac{7\pi}{6}$`], 0,
    t`$2x=\tfrac{\pi}{3}+k\pi \Rightarrow x=\tfrac{\pi}{6}+\tfrac{k\pi}{2}$. In $[0,\pi)$: $\tfrac{\pi}{6}$ and $\tfrac{2\pi}{3}$.`);

  q("M5-iv-01", 2, VWO, false,
    t`$\sin\theta=\tfrac35$ and $\theta$ lies in the second quadrant. What is $\sin 2\theta$?`,
    [t`$-\dfrac{24}{25}$`, t`$\dfrac{24}{25}$`, t`$\dfrac{7}{25}$`, t`$-\dfrac{6}{5}$`], 0,
    t`In Q2, $\cos\theta=-\sqrt{1-\tfrac{9}{25}}=-\tfrac45$. $\sin2\theta=2\sin\theta\cos\theta=2\cdot\tfrac35\cdot\left(-\tfrac45\right)=-\tfrac{24}{25}$.`,
    { vals: [-24 / 25, 24 / 25, 7 / 25, -6 / 5], check: () => { const th = PI - Math.asin(0.6); return Math.sin(2 * th); } });

  q("M5-iv-02", 2, EN, false,
    t`Simplify $\dfrac{1-\cos 2x}{\sin 2x}$.`,
    [t`$\tan x$`, t`$\cot x$`, t`$\sin x$`, t`$2\tan x$`], 0,
    t`$1-\cos2x=2\sin^2x$ and $\sin2x=2\sin x\cos x$. The ratio is $\dfrac{\sin x}{\cos x}=\tan x$.`);

  q("M5-iv-03", 3, EN, false,
    t`What is the exact value of $\cos 75^\circ$?`,
    [t`$\dfrac{\sqrt6-\sqrt2}{4}$`, t`$\dfrac{\sqrt6+\sqrt2}{4}$`, t`$\dfrac{\sqrt3-1}{2}$`, t`$\dfrac{\sqrt2}{4}$`], 0,
    t`$\cos(45^\circ+30^\circ)=\cos45\cos30-\sin45\sin30=\tfrac{\sqrt2}{2}\cdot\tfrac{\sqrt3}{2}-\tfrac{\sqrt2}{2}\cdot\tfrac12=\tfrac{\sqrt6-\sqrt2}{4}\approx0.259$. Option B is $\cos 15^\circ$.`,
    { vals: [(sqrt(6) - sqrt(2)) / 4, (sqrt(6) + sqrt(2)) / 4, (sqrt(3) - 1) / 2, sqrt(2) / 4], check: () => Math.cos(75 * PI / 180) });

  q("M5-v-01", 2, VWO, false,
    t`A sinusoid has a maximum of 7 at $t=1$ and the next minimum of 1 at $t=4$. Which formula fits?`,
    [t`$f(t)=4+3\sin\!\left(\tfrac{\pi}{3}(t+\tfrac12)\right)$`, t`$f(t)=4+3\sin\!\left(\tfrac{\pi}{3}(t-1)\right)$`, t`$f(t)=4+3\sin\!\left(\tfrac{\pi}{6}(t+\tfrac12)\right)$`, t`$f(t)=3+4\sin\!\left(\tfrac{\pi}{3}(t+\tfrac12)\right)$`], 0,
    t`Equilibrium $a=\tfrac{7+1}{2}=4$, amplitude $b=3$. Half a period is $4-1=3$, so the period is 6 and $c=\tfrac{2\pi}{6}=\tfrac{\pi}{3}$. The sine rises through equilibrium a quarter period (1.5) before the max: $t=-\tfrac12$. So the shift is $t+\tfrac12$.`);

  q("M5-v-02", 2, VWO, false,
    t`The water level in a harbour is $h(t)=2+1.5\sin\!\left(\tfrac{\pi}{6}(t-3)\right)$ m, with $t$ in hours. At what time $t\gt 0$ is the level first at its maximum?`,
    [t`$t=6$`, t`$t=3$`, t`$t=9$`, t`$t=12$`], 0,
    t`Maximum when $\tfrac{\pi}{6}(t-3)=\tfrac{\pi}{2}$, i.e. $t-3=3$, so $t=6$. ($t=3$ is the upward pass through equilibrium.)`,
    { vals: [6, 3, 9, 12], check: () => 3 + 3 });

  q("M5-v-03", 1, PC, false,
    t`What are the equilibrium value and amplitude of $f(x)=5-2\sin(3x-1)$?`,
    [t`equilibrium 5, amplitude 2`, t`equilibrium 5, amplitude $-2$`, t`equilibrium $-2$, amplitude 5`, t`equilibrium 3, amplitude 2`], 0,
    t`Equilibrium is the constant term, 5. Amplitude is $|b|=|-2|=2$; the minus sign only reflects the graph.`);

  /* ---------- M6 Geometry ---------- */
  q("M6-i-01", 1, VWO, false,
    t`A solid cone has base radius 3 and height 4. What is its total surface area (base included)?`,
    [t`$24\pi$`, t`$15\pi$`, t`$12\pi$`, t`$21\pi$`], 0,
    t`Slant height $\ell=\sqrt{3^2+4^2}=5$. Lateral area $\pi r\ell=15\pi$, base $\pi r^2=9\pi$, total $24\pi$. ($12\pi$ is the volume.)`,
    { vals: [24 * PI, 15 * PI, 12 * PI, 21 * PI], check: () => PI * 3 * 5 + PI * 9 });

  q("M6-i-02", 1, PC, false,
    t`A circle is inscribed in a square of side 6. What is the area inside the square but outside the circle?`,
    [t`$36-9\pi$`, t`$36-36\pi$`, t`$36-6\pi$`, t`$9\pi-36$`], 0,
    t`The radius is 3, so the circle area is $9\pi$. The remaining area is $36-9\pi\approx7.7$.`,
    { vals: [36 - 9 * PI, 36 - 36 * PI, 36 - 6 * PI, 9 * PI - 36], check: () => 36 - 9 * PI });

  q("M6-i-03", 2, VWO, false,
    t`A square pyramid has base side 6 and height 4. What is its total surface area?`,
    [t`$96$`, t`$60$`, t`$48$`, t`$84$`], 0,
    t`Slant height of a face $=\sqrt{4^2+3^2}=5$. Each triangle has area $\tfrac12\cdot6\cdot5=15$, so four give 60. Plus the base 36: 96. (Volume $=\tfrac13\cdot36\cdot4=48$.)`,
    { vals: [96, 60, 48, 84], check: () => 4 * 0.5 * 6 * 5 + 36 });

  q("M6-ii-01", 2, EN, false,
    t`In triangle $ABC$, $AB=AC$ and $\angle A=36^\circ$. The bisector of $\angle B$ meets $AC$ at $D$. What is $\angle BDC$?`,
    [t`$72^\circ$`, t`$36^\circ$`, t`$108^\circ$`, t`$54^\circ$`], 0,
    t`Base angles are $\tfrac{180-36}{2}=72^\circ$. The bisector gives $\angle DBC=36^\circ$. In triangle $BDC$: $\angle BDC=180-36-72=72^\circ$.`,
    { vals: [72, 36, 108, 54], check: () => 180 - 36 - 72 });

  q("M6-ii-02", 2, PC, false,
    t`An equilateral triangle has side $2\sqrt3$. What is the radius of its inscribed circle?`,
    [t`$1$`, t`$\sqrt3$`, t`$2$`, t`$\tfrac{\sqrt3}{2}$`], 0,
    t`Height $=\tfrac{\sqrt3}{2}\cdot2\sqrt3=3$. The incentre lies at $\tfrac13$ of the height from the base: $r=1$. (The circumradius is 2.)`,
    { vals: [1, sqrt(3), 2, sqrt(3) / 2], check: () => (sqrt(3) / 2 * 2 * sqrt(3)) / 3 });

  q("M6-ii-03", 1, VWO, false,
    t`A chord of length 8 lies in a circle of radius 5. How far is the chord from the centre?`,
    [t`$3$`, t`$4$`, t`$\sqrt{41}$`, t`$1$`], 0,
    t`The perpendicular from the centre bisects the chord, giving a right triangle with hypotenuse 5 and leg 4. The other leg is 3.`,
    { vals: [3, 4, sqrt(41), 1], check: () => sqrt(25 - 16) });

  q("M6-iii-01", 1, PC, false,
    t`A right triangle has hypotenuse 10 and one angle of $30^\circ$. How long is the side opposite the $30^\circ$ angle?`,
    [t`$5$`, t`$5\sqrt3$`, t`$10\sqrt3$`, t`$\tfrac{10}{\sqrt3}$`], 0,
    t`Opposite $=10\sin30^\circ=5$.`,
    { vals: [5, 5 * sqrt(3), 10 * sqrt(3), 10 / sqrt(3)], check: () => 10 * Math.sin(PI / 6) });

  q("M6-iii-02", 2, VWO, false,
    t`A triangle has sides 5, 7 and 8. What is the angle opposite the side of length 7?`,
    [t`$60^\circ$`, t`$45^\circ$`, t`$30^\circ$`, t`$120^\circ$`], 0,
    t`Cosine rule: $\cos\gamma=\dfrac{5^2+8^2-7^2}{2\cdot5\cdot8}=\dfrac{40}{80}=\tfrac12 \Rightarrow \gamma=60^\circ$.`,
    { vals: [60, 45, 30, 120], check: () => Math.acos((25 + 64 - 49) / 80) * 180 / PI });

  q("M6-iii-03", 2, VWO, false,
    t`In triangle $ABC$, $\angle A=45^\circ$, $\angle B=60^\circ$ and $a=BC=10$. What is $b=AC$?`,
    [t`$5\sqrt6$`, t`$\tfrac{10\sqrt6}{3}$`, t`$10\sqrt2$`, t`$5\sqrt3$`], 0,
    t`Sine rule: $b=\dfrac{a\sin B}{\sin A}=\dfrac{10\cdot\frac{\sqrt3}{2}}{\frac{\sqrt2}{2}}=10\sqrt{\tfrac32}=5\sqrt6\approx12.2$. Option B swaps the sines.`,
    { vals: [5 * sqrt(6), 10 * sqrt(6) / 3, 10 * sqrt(2), 5 * sqrt(3)], check: () => 10 * Math.sin(PI / 3) / Math.sin(PI / 4) });

  q("M6-iii-04", 3, EN, true,
    t`An aircraft flies 300 km on a bearing of $060^\circ$, then 400 km on a bearing of $180^\circ$. How far is it from its start?`,
    [t`$\approx 361$ km`, t`$500$ km`, t`$\approx 608$ km`, t`$100$ km`], 0,
    t`The heading changes by $120^\circ$, so the angle inside the triangle at the turn is $180-120=60^\circ$. $d^2=300^2+400^2-2\cdot300\cdot400\cos60^\circ=130\,000$, so $d\approx361$ km. Using $\cos 120^\circ$ by mistake gives 608 km.`,
    { vals: [sqrt(130000), 500, sqrt(370000), 100], check: () => { const x = 300 * Math.sin(PI / 3), y = 300 * Math.cos(PI / 3) - 400; return Math.hypot(x, y); } });

  q("M6-iv-01", 1, VWO, false,
    t`Which line passes through $(1,2)$ and is parallel to $3x-y=5$?`,
    [t`$y=3x-1$`, t`$y=3x+2$`, t`$y=-\tfrac13x+\tfrac73$`, t`$y=3x-5$`], 0,
    t`The given line is $y=3x-5$, slope 3. Through $(1,2)$: $y-2=3(x-1)\Rightarrow y=3x-1$. Option C is the perpendicular line.`);

  q("M6-iv-02", 2, PC, false,
    t`What are the centre and radius of the circle $x^2+y^2-6x+4y-12=0$?`,
    [t`centre $(3,-2)$, radius 5`, t`centre $(-3,2)$, radius 5`, t`centre $(3,-2)$, radius $\sqrt{12}$`, t`centre $(6,-4)$, radius 12`], 0,
    t`Complete the square: $(x-3)^2-9+(y+2)^2-4-12=0 \Rightarrow (x-3)^2+(y+2)^2=25$.`);

  q("M6-iv-03", 2, VWO, false,
    t`What is the tangent line to the circle $x^2+y^2=25$ at the point $(3,4)$?`,
    [t`$3x+4y=25$`, t`$4x+3y=25$`, t`$y=\tfrac43x$`, t`$3x-4y=-7$`], 0,
    t`The radius to $(3,4)$ has direction $(3,4)$, and the tangent is perpendicular to it: $3x+4y=c$. Through $(3,4)$, $c=9+16=25$.`);

  q("M6-v-01", 2, VWO, false,
    t`Where does the line $y=x+1$ intersect the circle $x^2+y^2=13$?`,
    [t`$(2,3)$ and $(-3,-2)$`, t`$(3,2)$ and $(-2,-3)$`, t`$(2,3)$ only`, t`$(-2,-1)$ and $(3,4)$`], 0,
    t`$x^2+(x+1)^2=13 \Rightarrow 2x^2+2x-12=0 \Rightarrow x^2+x-6=0 \Rightarrow x=2$ or $x=-3$, giving $(2,3)$ and $(-3,-2)$.`);

  q("M6-v-02", 3, EN, false,
    t`For which values of $c$ is the line $y=x+c$ tangent to the circle $x^2+y^2=8$?`,
    [t`$c=\pm4$`, t`$c=\pm2\sqrt2$`, t`$c=\pm 8$`, t`$c=\pm2$`], 0,
    t`Distance from the origin to $x-y+c=0$ is $\dfrac{|c|}{\sqrt2}$. Set it equal to the radius $\sqrt8$: $|c|=\sqrt{16}=4$. (Alternatively, set the discriminant of $2x^2+2cx+c^2-8=0$ to zero.)`);

  q("M6-vi-01", 1, PC, false,
    t`What is the distance from the point $(1,2)$ to the line $3x+4y-1=0$?`,
    [t`$2$`, t`$10$`, t`$\tfrac{11}{5}$`, t`$\tfrac{12}{5}$`], 0,
    t`$d=\dfrac{|3\cdot1+4\cdot2-1|}{\sqrt{3^2+4^2}}=\dfrac{10}{5}=2$.`,
    { vals: [2, 10, 11 / 5, 12 / 5], check: () => Math.abs(3 + 8 - 1) / 5 });

  q("M6-vi-02", 2, VWO, false,
    t`Circle $C_1$ has centre $(0,0)$ and radius 2. Circle $C_2$ has centre $(6,8)$ and radius 3. What is the shortest distance between a point on $C_1$ and a point on $C_2$?`,
    [t`$5$`, t`$10$`, t`$15$`, t`$7$`], 0,
    t`The distance between centres is $\sqrt{36+64}=10$. Subtract both radii: $10-2-3=5$.`,
    { vals: [5, 10, 15, 7], check: () => Math.hypot(6, 8) - 5 });

  /* ---------- M7 Vectors ---------- */
  q("M7-i-01", 1, PC, false,
    t`What angle does the vector $\begin{pmatrix}-1\\ \sqrt3\end{pmatrix}$ make with the positive $x$-axis?`,
    [t`$120^\circ$`, t`$60^\circ$`, t`$150^\circ$`, t`$-60^\circ$`], 0,
    t`Length 2, so $\cos\alpha=-\tfrac12$ and $\sin\alpha=\tfrac{\sqrt3}{2}$, which is the second quadrant: $\alpha=120^\circ$. A calculator's $\tan^{-1}(-\sqrt3)=-60^\circ$ is in the wrong quadrant.`,
    { vals: [120, 60, 150, -60], check: () => Math.atan2(sqrt(3), -1) * 180 / PI });

  q("M7-i-02", 1, VWO, false,
    t`Which is the unit vector in the direction of $\begin{pmatrix}6\\8\end{pmatrix}$?`,
    [t`$\begin{pmatrix}0.6\\0.8\end{pmatrix}$`, t`$\begin{pmatrix}0.8\\0.6\end{pmatrix}$`, t`$\begin{pmatrix}\tfrac{3}{7}\\ \tfrac{4}{7}\end{pmatrix}$`, t`$\begin{pmatrix}1\\1\end{pmatrix}$`], 0,
    t`Length $=\sqrt{36+64}=10$. Divide each component by 10.`);

  q("M7-ii-01", 1, PC, false,
    t`Let $\mathbf a=\begin{pmatrix}2\\-1\end{pmatrix}$ and $\mathbf b=\begin{pmatrix}1\\3\end{pmatrix}$. What is $3\mathbf a-2\mathbf b$?`,
    [t`$\begin{pmatrix}4\\-9\end{pmatrix}$`, t`$\begin{pmatrix}8\\3\end{pmatrix}$`, t`$\begin{pmatrix}4\\3\end{pmatrix}$`, t`$\begin{pmatrix}5\\-9\end{pmatrix}$`], 0,
    t`$3\mathbf a=(6,-3)$ and $2\mathbf b=(2,6)$. The difference is $(4,-9)$.`);

  q("M7-ii-02", 2, VWO, false,
    t`What is the angle between $\begin{pmatrix}1\\2\end{pmatrix}$ and $\begin{pmatrix}3\\1\end{pmatrix}$?`,
    [t`$45^\circ$`, t`$30^\circ$`, t`$60^\circ$`, t`$90^\circ$`], 0,
    t`$\cos\varphi=\dfrac{1\cdot3+2\cdot1}{\sqrt5\sqrt{10}}=\dfrac{5}{\sqrt{50}}=\dfrac{1}{\sqrt2}\Rightarrow\varphi=45^\circ$.`,
    { vals: [45, 30, 60, 90], check: () => Math.acos(5 / sqrt(50)) * 180 / PI });

  q("M7-ii-03", 2, PC, false,
    t`For which $p$ are $\begin{pmatrix}p\\3\end{pmatrix}$ and $\begin{pmatrix}2\\p-5\end{pmatrix}$ perpendicular?`,
    [t`$p=3$`, t`$p=5$`, t`$p=-3$`, t`$p=\tfrac{15}{2}$`], 0,
    t`The dot product must be zero: $2p+3(p-5)=5p-15=0\Rightarrow p=3$.`,
    { vals: [3, 5, -3, 7.5], check: () => 15 / 5 });

  q("M7-ii-04", 3, EN, false,
    t`What is the distance from $P(4,3)$ to the line through the origin with direction $\begin{pmatrix}1\\1\end{pmatrix}$?`,
    [t`$\tfrac{1}{\sqrt2}$`, t`$\tfrac{7}{\sqrt2}$`, t`$1$`, t`$5$`], 0,
    t`The projection of $\vec{OP}$ on the unit direction $\tfrac{1}{\sqrt2}(1,1)$ has length $\tfrac{7}{\sqrt2}$. By Pythagoras, the distance is $\sqrt{|OP|^2-\tfrac{49}{2}}=\sqrt{25-24.5}=\tfrac{1}{\sqrt2}$. (Check: the line is $x-y=0$ and $\tfrac{|4-3|}{\sqrt2}$ gives the same.)`,
    { vals: [1 / sqrt(2), 7 / sqrt(2), 1, 5], check: () => Math.abs(4 - 3) / sqrt(2) });

  q("M7-ii-05", 1, VWO, false,
    t`A constant force $\mathbf F=\begin{pmatrix}3\\4\end{pmatrix}$ N moves an object through the displacement $\begin{pmatrix}5\\-1\end{pmatrix}$ m. How much work does it do?`,
    [t`$11$ J`, t`$19$ J`, t`$25$ J`, t`$\sqrt{26}\cdot5$ J`], 0,
    t`$W=\mathbf F\cdot\mathbf s=3\cdot5+4\cdot(-1)=11$ J.`,
    { vals: [11, 19, 25, 5 * sqrt(26)], check: () => 15 - 4 });

  q("M7-iii-01", 1, PC, false,
    t`A point moves with $\mathbf r(t)=\begin{pmatrix}t^2\\3t-t^3\end{pmatrix}$. What is its speed at $t=1$?`,
    [t`$2$`, t`$0$`, t`$\sqrt{13}$`, t`$\sqrt5$`], 0,
    t`$\mathbf v=(2t,\ 3-3t^2)=(2,0)$ at $t=1$, so the speed is 2.`,
    { vals: [2, 0, sqrt(13), sqrt(5)], check: () => Math.hypot(2, 0) });

  q("M7-iii-02", 2, VWO, false,
    t`A point moves with $\mathbf r(t)=\begin{pmatrix}4\cos 2t\\4\sin 2t\end{pmatrix}$. What is the magnitude of its acceleration?`,
    [t`$16$`, t`$8$`, t`$4$`, t`$32$`], 0,
    t`$\mathbf v=(-8\sin2t,\ 8\cos2t)$ with speed 8. $\mathbf a=(-16\cos2t,\ -16\sin2t)$ with magnitude 16. (This equals $v^2/r=64/4$.)`,
    { vals: [16, 8, 4, 32], check: () => 64 / 4 });

  q("M7-iii-03", 3, EN, false,
    t`A point moves with $\mathbf r(t)=\begin{pmatrix}t^2-4t\\2t\end{pmatrix}$. What is its minimum speed?`,
    [t`$2$`, t`$0$`, t`$4$`, t`$2\sqrt5$`], 0,
    t`$\mathbf v=(2t-4,\ 2)$, so speed$^2=(2t-4)^2+4$. This is smallest at $t=2$, where the speed is 2. At that moment $\mathbf v\perp\mathbf a$.`,
    { vals: [2, 0, 4, 2 * sqrt(5)], check: () => { let m = 1e9; for (let s = 0; s <= 5; s += 1e-4) m = Math.min(m, Math.hypot(2 * s - 4, 2)); return m; } });

  q("M7-iv-01", 1, VWO, false,
    t`Which is a vector equation of the line through $A(1,2)$ and $B(4,-1)$?`,
    [t`$\begin{pmatrix}x\\y\end{pmatrix}=\begin{pmatrix}1\\2\end{pmatrix}+\lambda\begin{pmatrix}1\\-1\end{pmatrix}$`, t`$\begin{pmatrix}x\\y\end{pmatrix}=\begin{pmatrix}1\\2\end{pmatrix}+\lambda\begin{pmatrix}4\\-1\end{pmatrix}$`, t`$\begin{pmatrix}x\\y\end{pmatrix}=\begin{pmatrix}4\\-1\end{pmatrix}+\lambda\begin{pmatrix}1\\1\end{pmatrix}$`, t`$\begin{pmatrix}x\\y\end{pmatrix}=\begin{pmatrix}3\\-3\end{pmatrix}+\lambda\begin{pmatrix}1\\2\end{pmatrix}$`], 0,
    t`The direction is $B-A=(3,-3)$, which is parallel to $(1,-1)$. Any point on the line works as the support vector. Option B uses $B$ itself as the direction, which is wrong.`);

  q("M7-iv-02", 2, PC, false,
    t`Where does the line $\begin{pmatrix}x\\y\end{pmatrix}=\begin{pmatrix}2\\1\end{pmatrix}+\lambda\begin{pmatrix}1\\3\end{pmatrix}$ cross the $x$-axis?`,
    [t`$x=\tfrac53$`, t`$x=\tfrac73$`, t`$x=1$`, t`$x=-\tfrac13$`], 0,
    t`$y=1+3\lambda=0\Rightarrow\lambda=-\tfrac13$. Then $x=2-\tfrac13=\tfrac53$.`,
    { vals: [5 / 3, 7 / 3, 1, -1 / 3], check: () => 2 - 1 / 3 });

  q("M7-v-01", 2, VWO, false,
    t`Which is a vector equation of the line $2x-3y=6$?`,
    [t`$\begin{pmatrix}x\\y\end{pmatrix}=\begin{pmatrix}3\\0\end{pmatrix}+\lambda\begin{pmatrix}3\\2\end{pmatrix}$`, t`$\begin{pmatrix}x\\y\end{pmatrix}=\begin{pmatrix}3\\0\end{pmatrix}+\lambda\begin{pmatrix}2\\-3\end{pmatrix}$`, t`$\begin{pmatrix}x\\y\end{pmatrix}=\begin{pmatrix}0\\2\end{pmatrix}+\lambda\begin{pmatrix}3\\2\end{pmatrix}$`, t`$\begin{pmatrix}x\\y\end{pmatrix}=\begin{pmatrix}0\\-2\end{pmatrix}+\lambda\begin{pmatrix}2\\3\end{pmatrix}$`], 0,
    t`The normal vector is $(2,-3)$, so a direction vector is $(3,2)$. $(3,0)$ lies on the line ($6-0=6$). Option B uses the normal as the direction. Option C's point $(0,2)$ is not on the line.`);

  q("M7-v-02", 2, PC, false,
    t`Write the line $\begin{pmatrix}x\\y\end{pmatrix}=\begin{pmatrix}1\\-2\end{pmatrix}+\lambda\begin{pmatrix}2\\5\end{pmatrix}$ in the form $ax+by=c$.`,
    [t`$5x-2y=9$`, t`$2x+5y=-8$`, t`$5x+2y=1$`, t`$5x-2y=1$`], 0,
    t`A normal is $(5,-2)$, perpendicular to $(2,5)$. So $5x-2y=c$ with $c=5\cdot1-2\cdot(-2)=9$.`);

  q("M7-vi-01", 2, VWO, false,
    t`A curve is given by $x=t^2$, $y=t^3-3t$. What is the slope of the tangent at $t=2$?`,
    [t`$\tfrac94$`, t`$\tfrac49$`, t`$9$`, t`$\tfrac12$`], 0,
    t`$\dfrac{dy}{dx}=\dfrac{dy/dt}{dx/dt}=\dfrac{3t^2-3}{2t}=\dfrac{9}{4}$ at $t=2$.`,
    { vals: [9 / 4, 4 / 9, 9, 0.5], check: () => (3 * 4 - 3) / (2 * 2) });

  q("M7-vi-02", 2, PC, false,
    t`An ellipse is given by $x=2\cos t$, $y=3\sin t$. What is the slope of the tangent at $t=\tfrac{\pi}{4}$?`,
    [t`$-\tfrac32$`, t`$-\tfrac23$`, t`$\tfrac32$`, t`$-1$`], 0,
    t`$\dfrac{dy}{dx}=\dfrac{3\cos t}{-2\sin t}=-\tfrac32$ at $t=\tfrac{\pi}{4}$, since $\cos t=\sin t$ there.`,
    { vals: [-1.5, -2 / 3, 1.5, -1], check: () => 3 * Math.cos(PI / 4) / (-2 * Math.sin(PI / 4)) });

  q("M7-vi-03", 3, EN, false,
    t`A curve is given by $x=e^t$, $y=e^{-t}$. Which line is tangent to it at $t=0$?`,
    [t`$y=-x+2$`, t`$y=x$`, t`$y=-x+1$`, t`$y=2x-1$`], 0,
    t`At $t=0$ the point is $(1,1)$. $\dfrac{dy}{dx}=\dfrac{-e^{-t}}{e^{t}}=-1$. Tangent: $y-1=-(x-1)\Rightarrow y=-x+2$. (The curve is $y=1/x$.)`);

  q("M7-vii-01", 1, VWO, false,
    t`What is the centre of gravity of the triangle with vertices $(0,0)$, $(6,0)$ and $(0,3)$?`,
    [t`$(2,\ 1)$`, t`$(3,\ 1.5)$`, t`$(2,\ 1.5)$`, t`$(3,\ 1)$`], 0,
    t`The centroid is the average of the vertices: $\left(\tfrac{0+6+0}{3},\tfrac{0+0+3}{3}\right)=(2,1)$.`);

  q("M7-vii-02", 3, EN, false,
    t`A uniform L-shaped plate consists of the rectangles $[0,4]\times[0,1]$ and $[0,1]\times[1,4]$. What is the $x$-coordinate of its centre of gravity?`,
    [t`$\tfrac{19}{14}$`, t`$\tfrac54$`, t`$2$`, t`$\tfrac{17}{14}$`], 0,
    t`Areas are 4 and 3, with centroids $(2,\tfrac12)$ and $(\tfrac12,\tfrac52)$. $\bar x=\dfrac{4\cdot2+3\cdot\frac12}{7}=\dfrac{9.5}{7}=\dfrac{19}{14}\approx1.36$.`,
    { vals: [19 / 14, 1.25, 2, 17 / 14], check: () => (4 * 2 + 3 * 0.5) / 7 });

  q("M7-vii-03", 2, PC, false,
    t`Point masses of 2 kg at $(0,0)$, 3 kg at $(5,0)$ and 5 kg at $(2,4)$. Where is their centre of mass?`,
    [t`$(2.5,\ 2)$`, t`$(\tfrac73,\ \tfrac43)$`, t`$(2,\ 2.5)$`, t`$(3.5,\ 2)$`], 0,
    t`$\bar{\mathbf r}=\dfrac{2(0,0)+3(5,0)+5(2,4)}{10}=\dfrac{(25,20)}{10}=(2.5,2)$. Option B is the unweighted average.`);
})();
