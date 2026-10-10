/* Delft AE Drill: physics bank.
   Original problems written against the TU Delft AE Selection Exam syllabus (Mathematics & Physics, v2024).
   Difficulty and style are calibrated to: TU Delft Pre-University Physics (MOOC), Dutch VWO Natuurkunde
   central exams, and Cambridge ENGAA/ESAT physics. No items are copied from those sources. */
(function () {
  const G = typeof window !== "undefined" ? window : globalThis;
  G.PROBLEMS = G.PROBLEMS || [];
  const t = String.raw;
  const PI = Math.PI, sqrt = Math.sqrt, ln = Math.log;
  const g = 9.81, kC = 8.99e9, e = 1.602e-19, mp = 1.673e-27, GM = 3.986e14;
  function q(id, difficulty, model, calc, stem, choices, answer, solution, extra) {
    const [code, sub] = id.split("-");
    G.PROBLEMS.push(Object.assign({
      id, subject: "physics", topic: code, sub,
      difficulty, model, calc, stem, choices, answer, solution, figure: null
    }, extra || {}));
  }
  const PP = "Pre-Uni Physics", VWO = "VWO Natuurkunde", EN = "ENGAA/ESAT";
  const gNote = t` Use $g=9.81\ \text{m/s}^2$.`;

  /* ---------- P1 Fundamentals ---------- */
  q("P1-i-01", 1, PP, false,
    t`What is the newton expressed in SI base units?`,
    [t`$\text{kg·m·s}^{-2}$`, t`$\text{kg·m}^2\text{·s}^{-2}$`, t`$\text{kg·m·s}^{-1}$`, t`$\text{kg·s}^{-2}$`], 0,
    t`$F=ma$, so the unit is kg times m/s², which is $\text{kg·m·s}^{-2}$. Option B is the joule.`);

  q("P1-i-02", 2, VWO, false,
    t`The air resistance on a car is modelled as $F=kv^2$. What is the SI unit of $k$?`,
    [t`$\text{kg/m}$`, t`$\text{kg/s}$`, t`$\text{N·s/m}$`, t`$\text{kg·m}$`], 0,
    t`$k=\dfrac{F}{v^2}$, which has units $\dfrac{\text{kg·m·s}^{-2}}{\text{m}^2\text{s}^{-2}}=\text{kg·m}^{-1}$. Option C, N·s/m, would be the unit for a drag force linear in $v$.`);

  q("P1-i-03", 3, EN, false,
    t`The orbital period $T$ of a satellite depends only on $G$ (unit $\text{m}^3\text{kg}^{-1}\text{s}^{-2}$), the planet mass $M$ and the orbit radius $r$, with $T\propto G^aM^br^c$. What are $a$, $b$ and $c$?`,
    [t`$a=-\tfrac12,\ b=-\tfrac12,\ c=\tfrac32$`, t`$a=\tfrac12,\ b=\tfrac12,\ c=-\tfrac32$`, t`$a=-1,\ b=-1,\ c=3$`, t`$a=-\tfrac12,\ b=\tfrac12,\ c=\tfrac32$`], 0,
    t`Match the units $\text{m}^{3a+c}\,\text{kg}^{-a+b}\,\text{s}^{-2a}=\text{s}^1$. Seconds: $a=-\tfrac12$. Kilograms: $b=a=-\tfrac12$. Metres: $c=-3a=\tfrac32$. This gives $T\propto\sqrt{r^3/(GM)}$, which is Kepler's third law.`);

  q("P1-i-04", 1, PP, false,
    t`What is power ($P=W/t$) in SI base units?`,
    [t`$\text{kg·m}^2\text{·s}^{-3}$`, t`$\text{kg·m}^2\text{·s}^{-2}$`, t`$\text{kg·m·s}^{-3}$`, t`$\text{kg·m}^2\text{·s}^{-1}$`], 0,
    t`A joule is $\text{kg·m}^2\text{s}^{-2}$. Dividing by seconds gives $\text{kg·m}^2\text{s}^{-3}$.`);

  q("P1-ii-01", 1, VWO, false,
    t`Forces of 6 N (east) and 8 N (north) act on a point. What is the magnitude of the resultant?`,
    [t`$10$ N`, t`$14$ N`, t`$2$ N`, t`$48$ N`], 0,
    t`The forces are perpendicular: $\sqrt{6^2+8^2}=10$ N.`,
    { vals: [10, 14, 2, 48], check: () => Math.hypot(6, 8) });

  q("P1-ii-02", 2, EN, false,
    t`Two forces of 10 N each act on a point, one at $0^\circ$ and one at $120^\circ$ to the $x$-axis. What is the resultant?`,
    [t`$10$ N at $60^\circ$`, t`$20$ N at $60^\circ$`, t`$17.3$ N at $60^\circ$`, t`$10$ N at $120^\circ$`], 0,
    t`Components: $x=10+10\cos120^\circ=5$ and $y=10\sin120^\circ=5\sqrt3$. Magnitude $\sqrt{25+75}=10$ N at $\tan^{-1}\sqrt3=60^\circ$. (A rhombus of equal sides with $120^\circ$ between them gives a diagonal equal to the sides.)`);

  q("P1-iii-01", 1, VWO, false,
    t`An aircraft taxis at 72 km/h. What is that in m/s?`,
    [t`$20$ m/s`, t`$259$ m/s`, t`$7.2$ m/s`, t`$1.2$ m/s`], 0,
    t`Divide by 3.6: $72/3.6=20$ m/s.`,
    { vals: [20, 259.2, 7.2, 1.2], check: () => 72 / 3.6 });

  q("P1-iii-02", 2, PP, false,
    t`A composite has a stiffness of 4.5 GPa. What is that in $\text{N/mm}^2$?`,
    [t`$4.5\times10^{3}$`, t`$4.5$`, t`$4.5\times10^{6}$`, t`$4.5\times10^{-3}$`], 0,
    t`$4.5\ \text{GPa}=4.5\times10^9\ \text{N/m}^2$. Since $1\ \text{m}^2=10^6\ \text{mm}^2$: $4.5\times10^9/10^6=4.5\times10^3\ \text{N/mm}^2$.`,
    { vals: [4.5e3, 4.5, 4.5e6, 4.5e-3], check: () => 4.5e9 / 1e6 });

  q("P1-iv-01", 2, VWO, true,
    t`A quantity decays as $N(t)=N_0e^{-\lambda t}$ with $\lambda=0.05\ \text{s}^{-1}$. After how long is half of it left?`,
    [t`$13.9$ s`, t`$10$ s`, t`$20$ s`, t`$6.0$ s`], 0,
    t`$\tfrac12=e^{-\lambda t}\Rightarrow t=\dfrac{\ln2}{\lambda}=\dfrac{0.693}{0.05}\approx13.9$ s.`,
    { vals: [13.86, 10, 20, 6.02], check: () => ln(2) / 0.05 });

  q("P1-iv-02", 2, EN, true,
    t`Air pressure falls with altitude as $p=p_0e^{-h/H}$ with $H=8.0$ km. At what altitude is the pressure half of $p_0$?`,
    [t`$5.5$ km`, t`$4.0$ km`, t`$16$ km`, t`$2.4$ km`], 0,
    t`$e^{-h/H}=\tfrac12\Rightarrow h=H\ln2=8.0\times0.693\approx5.5$ km. Option D uses $\log_{10}2$ instead of $\ln 2$.`,
    { vals: [5.545, 4, 16, 2.408], check: () => 8 * ln(2) });

  q("P1-v-01", 1, PP, false,
    t`Evaluate $\dfrac{(3\text{E}8)\times(2\text{E}{-3})}{6\text{E}2}$.`,
    [t`$1\times10^{3}$`, t`$1\times10^{-3}$`, t`$1\times10^{9}$`, t`$1\times10^{2}$`], 0,
    t`Numerator: $6\times10^{5}$. Divide by $6\times10^2$: $10^{3}$.`,
    { vals: [1e3, 1e-3, 1e9, 1e2], check: () => (3e8 * 2e-3) / 6e2 });

  q("P1-v-02", 2, EN, false,
    t`A wing has an area of $1.2\text{E}2\ \text{m}^2$ and carries a load of $4.8\text{E}5$ N. What is the average load per unit area?`,
    [t`$4.0\times10^{3}\ \text{N/m}^2$`, t`$4.0\times10^{2}\ \text{N/m}^2$`, t`$5.8\times10^{7}\ \text{N/m}^2$`, t`$2.5\times10^{-4}\ \text{N/m}^2$`], 0,
    t`$\dfrac{4.8\times10^5}{1.2\times10^2}=4.0\times10^{3}\ \text{N/m}^2$. Divide the mantissas ($4.8/1.2=4$) and subtract the exponents ($5-2=3$).`,
    { vals: [4e3, 4e2, 5.76e7, 2.5e-4], check: () => 4.8e5 / 1.2e2 });

  q("P1-vi-01", 2, EN, false,
    t`On a double-logarithmic plot, the power $P$ a propeller needs against the airspeed $v$ is a straight line with slope 3. By what factor does $P$ increase when $v$ doubles?`,
    [t`$8$`, t`$6$`, t`$3$`, t`$9$`], 0,
    t`A straight line with slope 3 on log-log axes means $P\propto v^3$. Doubling $v$ multiplies $P$ by $2^3=8$.`,
    { vals: [8, 6, 3, 9], check: () => 2 ** 3 });

  q("P1-vi-02", 2, VWO, false,
    t`A graph of $\log_{10} y$ against $t$ is a straight line through $(0,\ 1)$ and $(5,\ 3)$. What is $y$ at $t=5$?`,
    [t`$1000$`, t`$3$`, t`$100$`, t`$30$`], 0,
    t`At $t=5$, $\log_{10}y=3$, so $y=10^3=1000$. In general $y=10\cdot10^{0.4t}$, an exponential.`,
    { vals: [1000, 3, 100, 30], check: () => 10 * 10 ** (0.4 * 5) });

  q("P1-vii-01", 1, PP, false,
    t`Round $0.0040560$ to three significant figures.`,
    [t`$0.00406$`, t`$0.004$`, t`$0.0041$`, t`$0.00405$`], 0,
    t`The leading zeros are not significant. The first three significant digits are 4, 0, 5, and the next digit is 6, so round up: $0.00406$.`,
  );

  q("P1-vii-02", 2, VWO, false,
    t`A sample has mass $12.5$ g and volume $4.2\ \text{cm}^3$. How should its density be reported?`,
    [t`$3.0\ \text{g/cm}^3$`, t`$2.976\ \text{g/cm}^3$`, t`$2.98\ \text{g/cm}^3$`, t`$3\ \text{g/cm}^3$`], 0,
    t`$12.5/4.2=2.976\ldots$. The least precise input, 4.2, has 2 significant figures, so report 2: $3.0$ g/cm³. Writing "3" would show only one.`);

  q("P1-viii-01", 1, VWO, false,
    t`A block measuring $0.20\ \text{m}\times0.10\ \text{m}\times0.050\ \text{m}$ has a mass of 2.7 kg. What is its density?`,
    [t`$2.7\times10^3\ \text{kg/m}^3$`, t`$2.7\ \text{kg/m}^3$`, t`$270\ \text{kg/m}^3$`, t`$1.0\times10^3\ \text{kg/m}^3$`], 0,
    t`$V=1.0\times10^{-3}\ \text{m}^3$, so $\rho=2.7/10^{-3}=2700\ \text{kg/m}^3$ (aluminium).`,
    { vals: [2700, 2.7, 270, 1000], check: () => 2.7 / (0.2 * 0.1 * 0.05) });

  q("P1-viii-02", 2, PP, false,
    t`A 60 kg person stands on one stiletto heel with a contact area of $1.0\ \text{cm}^2$. What pressure does it exert on the floor?` + gNote,
    [t`$5.9\times10^{6}$ Pa`, t`$5.9\times10^{2}$ Pa`, t`$6.0\times10^{5}$ Pa`, t`$5.9\times10^{4}$ Pa`], 0,
    t`$F=mg=589$ N and $A=1.0\times10^{-4}\ \text{m}^2$. $p=F/A\approx5.9\times10^{6}$ Pa. Forgetting that $1\ \text{cm}^2=10^{-4}\ \text{m}^2$ is the classic slip.`,
    { vals: [5.886e6, 588.6, 6e5, 5.886e4], check: () => 60 * g / 1e-4 });

  /* ---------- P2 Mechanics ---------- */
  q("P2-i-01", 1, VWO, false,
    t`A car starts from rest and accelerates uniformly at $2.5\ \text{m/s}^2$ for 8.0 s. How far does it travel?`,
    [t`$80$ m`, t`$20$ m`, t`$160$ m`, t`$40$ m`], 0,
    t`$s=\tfrac12at^2=\tfrac12\cdot2.5\cdot64=80$ m.`,
    { vals: [80, 20, 160, 40], check: () => 0.5 * 2.5 * 64 });

  q("P2-i-02", 2, VWO, false,
    t`The $(v,t)$-diagram shows a drone's horizontal flight. How far does it travel in total?`,
    [t`$550$ m`, t`$700$ m`, t`$600$ m`, t`$450$ m`], 0,
    t`Distance is the area under the graph. Acceleration phase $\tfrac12\cdot10\cdot20=100$, cruise $20\cdot20=400$, braking $\tfrac12\cdot5\cdot20=50$. Total 550 m.`,
    { vals: [550, 700, 600, 450], check: () => 100 + 400 + 50,
      figure: t`<svg viewBox="0 0 320 190" role="img" aria-label="Velocity-time graph: rises from 0 to 20 m/s over 10 s, constant 20 m/s until 30 s, falls to 0 at 35 s"><g fill="none" stroke="currentColor" stroke-width="1.2"><path d="M40 150H305M40 150V25"/><path d="M40 150L114.3 40L262.9 40L300 150" stroke-width="2.2"/></g><g stroke="currentColor" stroke-dasharray="3 3" opacity=".45"><path d="M40 40H114.3M114.3 40V150M262.9 40V150"/></g><g fill="currentColor" font-size="11" font-family="inherit"><text x="22" y="44">20</text><text x="30" y="164">0</text><text x="108" y="164">10</text><text x="255" y="164">30</text><text x="293" y="164">35</text><text x="250" y="182">t (s)</text><text x="6" y="22">v (m/s)</text></g></svg>` });

  q("P2-i-03", 1, PP, true,
    t`A stone is dropped from a height of 45 m. How long does it take to reach the ground (no air resistance)?` + gNote,
    [t`$3.0$ s`, t`$4.6$ s`, t`$9.2$ s`, t`$2.1$ s`], 0,
    t`$h=\tfrac12gt^2\Rightarrow t=\sqrt{2h/g}=\sqrt{90/9.81}\approx3.0$ s. Option B is $h/g$ with the square root forgotten.`,
    { vals: [3.029, 4.587, 9.17, 2.142], check: () => sqrt(90 / g) });

  q("P2-i-04", 2, VWO, false,
    t`A 1200 kg car travelling at 25 m/s brakes with a constant braking force of 6000 N. What is its stopping distance?`,
    [t`$62.5$ m`, t`$125$ m`, t`$31.3$ m`, t`$5.0$ m`], 0,
    t`$a=F/m=5\ \text{m/s}^2$. $s=\dfrac{v^2}{2a}=\dfrac{625}{10}=62.5$ m. (Or by energy: $\tfrac12mv^2=Fs$.)`,
    { vals: [62.5, 125, 31.25, 5], check: () => 25 ** 2 / (2 * 6000 / 1200) });

  q("P2-i-05", 3, EN, false,
    t`A ball is thrown vertically upward at 20 m/s from the top of a 25 m cliff. After how long does it hit the ground at the foot of the cliff? Use $g=10\ \text{m/s}^2$.`,
    [t`$5.0$ s`, t`$4.0$ s`, t`$2.0$ s`, t`$6.0$ s`], 0,
    t`Taking up as positive: $-25=20t-5t^2\Rightarrow t^2-4t-5=0\Rightarrow(t-5)(t+1)=0$, so $t=5$ s. (4 s is when it returns to cliff height.)`,
    { vals: [5, 4, 2, 6], check: () => (4 + sqrt(16 + 20)) / 2 });

  q("P2-ii-01", 1, PP, false,
    t`A resultant force of 20 N acts on a 5.0 kg trolley. What is its acceleration?`,
    [t`$4.0\ \text{m/s}^2$`, t`$100\ \text{m/s}^2$`, t`$0.25\ \text{m/s}^2$`, t`$15\ \text{m/s}^2$`], 0,
    t`$a=F/m=20/5=4.0\ \text{m/s}^2$.`,
    { vals: [4, 100, 0.25, 15], check: () => 20 / 5 });

  q("P2-ii-02", 1, VWO, false,
    t`A 4.0 kg block slides down a frictionless slope at $30^\circ$. What is its acceleration?` + gNote,
    [t`$4.9\ \text{m/s}^2$`, t`$8.5\ \text{m/s}^2$`, t`$9.8\ \text{m/s}^2$`, t`$2.5\ \text{m/s}^2$`], 0,
    t`The component of gravity along the slope is $mg\sin30^\circ$, so $a=g\sin30^\circ=4.9\ \text{m/s}^2$. The mass cancels. Option B uses $\cos$.`,
    { vals: [4.905, 8.496, 9.81, 2.45], check: () => g * 0.5 });

  q("P2-ii-03", 2, VWO, false,
    t`A 10 kg crate on a level floor is pulled horizontally with 50 N. The coefficient of friction is 0.30. What is the crate's acceleration?` + gNote,
    [t`$2.1\ \text{m/s}^2$`, t`$5.0\ \text{m/s}^2$`, t`$3.5\ \text{m/s}^2$`, t`$0.0\ \text{m/s}^2$`], 0,
    t`Friction $=\mu mg=0.30\cdot98.1=29.4$ N. Net force $=50-29.4=20.6$ N, so $a\approx2.1\ \text{m/s}^2$.`,
    { vals: [2.057, 5, 3.5, 0], check: () => (50 - 0.3 * 10 * g) / 10 });

  q("P2-ii-04", 1, PP, false,
    t`A 0.50 kg mass hangs at rest from a spring with $C=200$ N/m. How far is the spring stretched?` + gNote,
    [t`$2.5$ cm`, t`$0.25$ cm`, t`$25$ cm`, t`$1.0$ cm`], 0,
    t`At equilibrium $Cu=mg$, so $u=\dfrac{0.50\cdot9.81}{200}=0.0245$ m, about 2.5 cm.`,
    { vals: [2.45, 0.245, 24.5, 1], check: () => 0.5 * g / 200 * 100 });

  q("P2-ii-05", 3, EN, true,
    t`An 80 kg skydiver experiences drag $F=kv^2$ with $k=0.25$ kg/m. What is the terminal velocity?` + gNote,
    [t`$56$ m/s`, t`$3.1\times10^3$ m/s`, t`$40$ m/s`, t`$18$ m/s`], 0,
    t`At terminal velocity drag equals weight: $kv^2=mg\Rightarrow v=\sqrt{mg/k}=\sqrt{784.8/0.25}\approx56$ m/s. Option B forgets the square root.`,
    { vals: [56.03, 3139, 40, 17.9], check: () => sqrt(80 * g / 0.25) });

  q("P2-ii-06", 3, EN, false,
    t`Masses of 3.0 kg and 5.0 kg hang on either side of a light, frictionless pulley. What is the tension in the string?` + gNote,
    [t`$37$ N`, t`$29$ N`, t`$49$ N`, t`$20$ N`], 0,
    t`$a=\dfrac{(5-3)g}{3+5}=\tfrac{g}{4}=2.45\ \text{m/s}^2$. For the 3 kg mass: $T-3g=3a\Rightarrow T=3(g+a)\approx36.8$ N. The tension lies between the two weights (29 N and 49 N), as it must.`,
    { vals: [36.79, 29.43, 49.05, 19.62], check: () => { const a = 2 * g / 8; return 3 * (g + a); } });

  q("P2-iii-01", 1, VWO, false,
    t`How much gravitational potential energy does a 50 kg load gain when lifted 12 m?` + gNote,
    [t`$5.9$ kJ`, t`$600$ J`, t`$59$ kJ`, t`$4.2$ kJ`], 0,
    t`$E_z=mgh=50\cdot9.81\cdot12\approx5.9\times10^3$ J.`,
    { vals: [5886, 600, 58860, 4200], check: () => 50 * g * 12 });

  q("P2-iii-02", 2, VWO, false,
    t`A 2.0 kW winch lifts a 200 kg load at constant speed. Ignoring losses, what is the speed?` + gNote,
    [t`$1.0$ m/s`, t`$10$ m/s`, t`$0.10$ m/s`, t`$9.8$ m/s`], 0,
    t`At constant speed $P=Fv=mgv$, so $v=\dfrac{2000}{200\cdot9.81}\approx1.0$ m/s.`,
    { vals: [1.019, 10, 0.1, 9.81], check: () => 2000 / (200 * g) });

  q("P2-iii-03", 1, PP, true,
    t`A ball is dropped from 20 m. Using energy conservation, what is its speed just before impact?` + gNote,
    [t`$20$ m/s`, t`$14$ m/s`, t`$392$ m/s`, t`$9.8$ m/s`], 0,
    t`$mgh=\tfrac12mv^2\Rightarrow v=\sqrt{2gh}=\sqrt{392}\approx19.8$ m/s.`,
    { vals: [19.81, 14.0, 392, 9.81], check: () => sqrt(2 * g * 20) });

  q("P2-iii-04", 2, VWO, false,
    t`A spring launcher ($C=800$ N/m) is compressed by 10 cm and fires a 50 g ball straight up. Ignoring friction, how high does the ball rise above the launch point?` + gNote,
    [t`$8.2$ m`, t`$16$ m`, t`$0.82$ m`, t`$82$ m`], 0,
    t`$E_{\text{spring}}=\tfrac12Cu^2=\tfrac12\cdot800\cdot0.01=4.0$ J. $h=\dfrac{4.0}{0.050\cdot9.81}\approx8.2$ m. Option B forgets the $\tfrac12$.`,
    { vals: [8.155, 16.31, 0.8155, 81.55], check: () => (0.5 * 800 * 0.01) / (0.05 * g) });

  q("P2-iii-05", 3, EN, false,
    t`A pump with 75% efficiency raises $3.0\ \text{m}^3$ of water ($\rho=1000\ \text{kg/m}^3$) through 10 m in 2.0 minutes. What is its electrical input power?` + gNote,
    [t`$3.3$ kW`, t`$2.5$ kW`, t`$1.8$ kW`, t`$196$ kW`], 0,
    t`Useful energy $=mgh=3000\cdot9.81\cdot10=2.94\times10^5$ J. Over 120 s, useful power $=2.45$ kW. Input $=2.45/0.75\approx3.3$ kW. Option C multiplies by $\eta$ instead of dividing.`,
    { vals: [3270, 2452.5, 1839, 196200], check: () => 3000 * g * 10 / 120 / 0.75 });

  q("P2-iii-06", 2, PP, false,
    t`A 1000 kg car accelerates from rest to 20 m/s in 10 s on a level road. Ignoring losses, what is the average power delivered?`,
    [t`$20$ kW`, t`$2.0$ kW`, t`$40$ kW`, t`$200$ kW`], 0,
    t`$\Delta E_k=\tfrac12\cdot1000\cdot400=2.0\times10^5$ J. $P=\Delta E/t=20$ kW.`,
    { vals: [20000, 2000, 40000, 200000], check: () => 0.5 * 1000 * 400 / 10 });

  q("P2-iv-01", 1, VWO, false,
    t`A turbine shaft spins at 3000 revolutions per minute. What is its period of rotation?`,
    [t`$0.020$ s`, t`$50$ s`, t`$0.33$ ms`, t`$3.0$ s`], 0,
    t`$f=3000/60=50$ Hz, so $T=1/f=0.020$ s.`,
    { vals: [0.02, 50, 0.000333, 3], check: () => 60 / 3000 });

  q("P2-iv-02", 2, PP, false,
    t`An 800 kg car takes a flat bend of radius 50 m at 15 m/s. What centripetal force is needed?`,
    [t`$3.6$ kN`, t`$240$ N`, t`$12$ kN`, t`$7.8$ kN`], 0,
    t`$F_c=\dfrac{mv^2}{r}=\dfrac{800\cdot225}{50}=3600$ N. Friction between the tyres and the road supplies it.`,
    { vals: [3600, 240, 12000, 7848], check: () => 800 * 225 / 50 });

  q("P2-iv-03", 2, VWO, true,
    t`A satellite moves in a circular orbit of radius $7.0\times10^{6}$ m around the Earth ($GM=3.986\times10^{14}\ \text{m}^3/\text{s}^2$). What is its orbital speed?`,
    [t`$7.5$ km/s`, t`$57$ km/s`, t`$11$ km/s`, t`$2.4$ km/s`], 0,
    t`Gravity supplies the centripetal force: $\dfrac{GMm}{r^2}=\dfrac{mv^2}{r}\Rightarrow v=\sqrt{\dfrac{GM}{r}}=\sqrt{5.69\times10^{7}}\approx7.5$ km/s.`,
    { vals: [7546, 56943, 10670, 2400], check: () => sqrt(GM / 7.0e6) });

  q("P2-iv-04", 3, EN, false,
    t`Satellite B orbits a planet at four times the orbital radius of satellite A. What is $T_B/T_A$?`,
    [t`$8$`, t`$4$`, t`$16$`, t`$2$`], 0,
    t`$\dfrac{GMm}{r^2}=m\dfrac{4\pi^2r}{T^2}\Rightarrow T^2\propto r^3$. $T_B/T_A=4^{3/2}=8$.`,
    { vals: [8, 4, 16, 2], check: () => 4 ** 1.5 });

  q("P2-iv-05", 3, EN, true,
    t`A geostationary satellite has an orbital period of 24.0 h. What is its orbital radius? ($GM_{\text{Earth}}=3.986\times10^{14}\ \text{m}^3/\text{s}^2$)`,
    [t`$4.2\times10^{7}$ m`, t`$6.4\times10^{6}$ m`, t`$3.6\times10^{7}$ m`, t`$1.4\times10^{9}$ m`], 0,
    t`$r^3=\dfrac{GMT^2}{4\pi^2}$ with $T=86400$ s, so $r\approx4.22\times10^7$ m. Option C, about 36 000 km, is the height above the surface, not the radius.`,
    { vals: [4.224e7, 6.371e6, 3.586e7, 1.4e9], check: () => Math.cbrt(GM * 86400 ** 2 / (4 * PI * PI)) });

  /* ---------- P3 Electricity and magnetism ---------- */
  q("P3-i-01", 1, VWO, false,
    t`A resistor carries a charge of 3.0 C in 1.5 minutes. What is the current?`,
    [t`$33$ mA`, t`$2.0$ A`, t`$4.5$ A`, t`$0.50$ A`], 0,
    t`$I=Q/t=3.0/90=0.033$ A $=33$ mA. Option B forgets to convert minutes to seconds.`,
    { vals: [0.0333, 2, 4.5, 0.5], check: () => 3 / 90 * 1 });

  q("P3-i-02", 1, PP, false,
    t`A 12 V supply is connected across a 4.0 Ω resistor. What current flows?`,
    [t`$3.0$ A`, t`$48$ A`, t`$0.33$ A`, t`$8.0$ A`], 0,
    t`Ohm's law: $I=U/R=12/4.0=3.0$ A.`,
    { vals: [3, 48, 0.333, 8], check: () => 12 / 4 });

  q("P3-i-03", 2, VWO, false,
    t`A current of 0.50 A flows for 1.0 hour. How many electrons pass a point in the wire? ($e=1.602\times10^{-19}$ C)`,
    [t`$1.1\times10^{22}$`, t`$3.1\times10^{18}$`, t`$1.9\times10^{20}$`, t`$2.9\times10^{-16}$`], 0,
    t`$Q=It=0.50\cdot3600=1800$ C. $N=Q/e=1800/1.602\times10^{-19}\approx1.1\times10^{22}$. Option C uses 60 s instead of 3600 s.`,
    { vals: [1.124e22, 3.12e18, 1.87e20, 2.88e-16], check: () => 1800 / e });

  q("P3-ii-01", 1, PP, false,
    t`What is the equivalent resistance of 6.0 Ω and 3.0 Ω in parallel?`,
    [t`$2.0$ Ω`, t`$9.0$ Ω`, t`$4.5$ Ω`, t`$0.50$ Ω`], 0,
    t`$\dfrac1R=\dfrac16+\dfrac13=\dfrac12$, so $R=2.0$ Ω. A parallel combination is always smaller than the smallest branch. Option D forgets to invert.`,
    { vals: [2, 9, 4.5, 0.5], check: () => 1 / (1 / 6 + 1 / 3) });

  q("P3-ii-02", 2, VWO, false,
    t`A 12 V battery is connected to a 4.0 Ω resistor in series with a parallel pair of 6.0 Ω and 12 Ω. What is the current through the 6.0 Ω resistor?`,
    [t`$1.0$ A`, t`$1.5$ A`, t`$0.50$ A`, t`$2.0$ A`], 0,
    t`The parallel pair is $\left(\tfrac16+\tfrac1{12}\right)^{-1}=4.0$ Ω, so $R_{\text{tot}}=8.0$ Ω and $I=1.5$ A. The pair gets $1.5\cdot4.0=6.0$ V, so $I_6=6.0/6.0=1.0$ A. Option B is the total current.`,
    { vals: [1, 1.5, 0.5, 2], check: () => { const Rp = 1 / (1 / 6 + 1 / 12); const I = 12 / (4 + Rp); return I * Rp / 6; } });

  q("P3-ii-03", 2, PP, false,
    t`A 12 V battery and a 6.0 V battery are connected in series but in opposition (+ to +), together with a 3.0 Ω resistor. What current flows?`,
    [t`$2.0$ A`, t`$6.0$ A`, t`$4.0$ A`, t`$0$ A`], 0,
    t`Kirchhoff's voltage law: the net emf is $12-6.0=6.0$ V. $I=6.0/3.0=2.0$ A. Option B adds the emfs.`,
    { vals: [2, 6, 4, 0], check: () => (12 - 6) / 3 });

  q("P3-ii-04", 3, EN, false,
    t`A 9.0 V supply drives $R_1=1.0$ kΩ and $R_2=2.0$ kΩ in series. A voltmeter with an internal resistance of 2.0 kΩ is connected across $R_2$. What does it read?`,
    [t`$4.5$ V`, t`$6.0$ V`, t`$3.0$ V`, t`$9.0$ V`], 0,
    t`The meter in parallel with $R_2$ gives 1.0 kΩ, now equal to $R_1$, so the supply voltage splits evenly: 4.5 V. Option B is the reading of an ideal meter. The meter itself loads the circuit.`,
    { vals: [4.5, 6, 3, 9], check: () => { const Rp = 1 / (1 / 2 + 1 / 2); return 9 * Rp / (1 + Rp); } });

  q("P3-iii-01", 1, VWO, false,
    t`A 60 W lamp runs on 230 V mains. What current does it draw?`,
    [t`$0.26$ A`, t`$3.8$ A`, t`$14$ kA`, t`$0.0011$ A`], 0,
    t`$P=UI\Rightarrow I=60/230\approx0.26$ A.`,
    { vals: [0.2609, 3.833, 13800, 0.0011], check: () => 60 / 230 });

  q("P3-iii-02", 2, VWO, false,
    t`An electric motor draws 5.0 A at 24 V and lifts a 10 kg mass at a steady 0.90 m/s. What is its efficiency?` + gNote,
    [t`$74\%$`, t`$88\%$`, t`$37\%$`, t`$100\%$`], 0,
    t`$P_{\text{in}}=UI=120$ W. $P_{\text{out}}=mgv=10\cdot9.81\cdot0.90=88.3$ W. $\eta=88.3/120\approx74\%$.`,
    { vals: [73.6, 88, 37, 100], check: () => 10 * g * 0.9 / 120 * 100 });

  q("P3-iii-03", 1, PP, false,
    t`A 10 Ω resistor carries 2.0 A for 5.0 minutes. How much electrical energy does it dissipate?`,
    [t`$12$ kJ`, t`$200$ J`, t`$6.0$ kJ`, t`$100$ J`], 0,
    t`$P=I^2R=40$ W. $E=Pt=40\cdot300=1.2\times10^4$ J.`,
    { vals: [12000, 200, 6000, 100], check: () => 4 * 10 * 300 });

  q("P3-iv-01", 2, VWO, false,
    t`Point charges of $+2.0\ \mu\text{C}$ and $-3.0\ \mu\text{C}$ are 0.30 m apart. What is the force between them? ($k=8.99\times10^9\ \text{N·m}^2/\text{C}^2$)`,
    [t`$0.60$ N, attractive`, t`$0.60$ N, repulsive`, t`$0.18$ N, attractive`, t`$6.0\times10^{5}$ N, attractive`], 0,
    t`$F=k\dfrac{|q_1q_2|}{r^2}=8.99\times10^9\cdot\dfrac{6.0\times10^{-12}}{0.090}\approx0.60$ N. Opposite charges attract. Option C forgets to square $r$.`);

  q("P3-iv-02", 2, EN, false,
    t`Two point charges are both doubled while the distance between them is halved. By what factor does the Coulomb force change?`,
    [t`$16$`, t`$8$`, t`$4$`, t`$1$`], 0,
    t`$F\propto\dfrac{q_1q_2}{r^2}$, so the factor is $\dfrac{2\cdot2}{(1/2)^2}=16$.`,
    { vals: [16, 8, 4, 1], check: () => 4 / 0.25 });

  q("P3-v-01", 1, PP, false,
    t`A flat rectangular loop of $0.20\ \text{m}\times0.50\ \text{m}$ lies perpendicular to a uniform field of 0.40 T. What is the magnetic flux through it?`,
    [t`$0.040$ Wb`, t`$0.28$ Wb`, t`$0.25$ Wb`, t`$4.0$ Wb`], 0,
    t`$\Phi=BA=0.40\cdot0.10=0.040$ Wb.`,
    { vals: [0.04, 0.28, 0.25, 4], check: () => 0.4 * 0.2 * 0.5 });

  q("P3-v-02", 2, VWO, false,
    t`A coil face of area $0.020\ \text{m}^2$ is in a uniform 0.50 T field. The field lines make an angle of $60^\circ$ with the normal to the surface. What is the flux through it?`,
    [t`$5.0$ mWb`, t`$8.7$ mWb`, t`$10$ mWb`, t`$0$ mWb`], 0,
    t`Only the field component along the normal counts: $\Phi=BA\cos60^\circ=0.50\cdot0.020\cdot0.5=5.0\times10^{-3}$ Wb.`,
    { vals: [5, 8.66, 10, 0], check: () => 0.5 * 0.02 * 0.5 * 1000 });

  q("P3-vi-01", 2, PP, false,
    t`A proton moves at $2.0\times10^{5}$ m/s perpendicular to a 0.10 T magnetic field. What is the magnitude of the Lorentz force on it? ($e=1.602\times10^{-19}$ C)`,
    [t`$3.2\times10^{-15}$ N`, t`$3.2\times10^{-14}$ N`, t`$1.6\times10^{-15}$ N`, t`$2.0\times10^{4}$ N`], 0,
    t`$F=qvB=1.602\times10^{-19}\cdot2.0\times10^{5}\cdot0.10=3.2\times10^{-15}$ N.`,
    { vals: [3.204e-15, 3.204e-14, 1.6e-15, 2e4], check: () => e * 2e5 * 0.1 });

  q("P3-vi-02", 2, VWO, false,
    t`An electron moves in the $+x$ direction through a magnetic field pointing in the $+z$ direction (out of the page). In which direction is the Lorentz force on it?`,
    [t`$+y$`, t`$-y$`, t`$+z$`, t`no force`], 0,
    t`For a positive charge, $\mathbf F\propto\mathbf v\times\mathbf B=\hat x\times\hat z=-\hat y$. The electron is negative, so the force is reversed: $+y$. (With the right-hand rule, point the fingers along the conventional current, which is $-x$ for an electron.)`);

  q("P3-vi-03", 3, EN, true,
    t`A proton ($m=1.673\times10^{-27}$ kg) moves at $1.0\times10^{6}$ m/s perpendicular to a 0.50 T field. What is the radius of its circular path? ($e=1.602\times10^{-19}$ C)`,
    [t`$2.1$ cm`, t`$4.2$ cm`, t`$2.1$ m`, t`$1.0$ cm`], 0,
    t`The Lorentz force supplies the centripetal force: $qvB=\dfrac{mv^2}{r}\Rightarrow r=\dfrac{mv}{qB}=\dfrac{1.673\times10^{-21}}{8.01\times10^{-20}}\approx0.021$ m.`,
    { vals: [2.089, 4.18, 208.9, 1.0], check: () => mp * 1e6 / (e * 0.5) * 100 });

  /* ---------- P4 Vibrations and waves ---------- */
  q("P4-i-01", 1, PP, false,
    t`An engine vibrates at 50 Hz. What is the period of the vibration?`,
    [t`$20$ ms`, t`$50$ s`, t`$2.0$ s`, t`$0.20$ s`], 0,
    t`$T=1/f=1/50=0.020$ s $=20$ ms.`,
    { vals: [20, 50000, 2000, 200], check: () => 1000 / 50 });

  q("P4-i-02", 2, VWO, false,
    t`A wing panel is shaken by a vibration source whose frequency is slowly increased. When is the panel's amplitude largest?`,
    [t`When the driving frequency equals the panel's natural frequency`, t`When the driving frequency is as high as possible`, t`When the driving frequency is twice the natural frequency`, t`The amplitude does not depend on the driving frequency`], 0,
    t`This is resonance: energy transfer is most effective when the driving frequency matches the natural frequency. Damping limits the peak amplitude. Flutter and engine-mount design are about avoiding this.`);

  q("P4-ii-01", 2, PP, false,
    t`A 0.50 kg mass oscillates on a spring with $C=200$ N/m. What is the period?`,
    [t`$0.31$ s`, t`$0.050$ s`, t`$3.2$ s`, t`$20$ s`], 0,
    t`$T=2\pi\sqrt{m/C}=2\pi\sqrt{0.0025}=2\pi\cdot0.050\approx0.31$ s.`,
    { vals: [0.3142, 0.05, 3.18, 20], check: () => 2 * PI * sqrt(0.5 / 200) });

  q("P4-ii-02", 1, VWO, false,
    t`The mass on a spring is made four times as large. By what factor does the period of oscillation change?`,
    [t`$\times2$`, t`$\times4$`, t`$\times\tfrac12$`, t`$\times16$`], 0,
    t`$T\propto\sqrt m$, and $\sqrt4=2$.`,
    { vals: [2, 4, 0.5, 16], check: () => sqrt(4) });

  q("P4-ii-03", 3, EN, false,
    t`A 1.0 kg mass on a spring with $C=400$ N/m oscillates with an amplitude of 0.10 m. What is its maximum speed?`,
    [t`$2.0$ m/s`, t`$4.0$ m/s`, t`$0.20$ m/s`, t`$40$ m/s`], 0,
    t`$\omega=\sqrt{C/m}=20$ rad/s, so $v_{\max}=A\omega=2.0$ m/s. Check by energy: $\tfrac12CA^2=2.0$ J $=\tfrac12mv^2$ gives $v=2.0$ m/s.`,
    { vals: [2, 4, 0.2, 40], check: () => 0.1 * sqrt(400 / 1) });

  q("P4-iii-01", 1, VWO, false,
    t`Sound travels at 340 m/s. What is the wavelength of a 680 Hz tone?`,
    [t`$0.50$ m`, t`$2.0$ m`, t`$2.3\times10^5$ m`, t`$1.0$ m`], 0,
    t`$\lambda=v/f=340/680=0.50$ m.`,
    { vals: [0.5, 2, 231200, 1], check: () => 340 / 680 });

  q("P4-iii-02", 1, PP, false,
    t`What is the wavelength of a 100 MHz radio signal? ($c=3.0\times10^8$ m/s)`,
    [t`$3.0$ m`, t`$0.33$ m`, t`$30$ m`, t`$3.0$ mm`], 0,
    t`$\lambda=c/f=3.0\times10^8/1.0\times10^8=3.0$ m.`,
    { vals: [3, 0.333, 30, 0.003], check: () => 3e8 / 1e8 });

  q("P4-iii-03", 2, VWO, false,
    t`Which statement about waves is correct?`,
    [t`Sound in air is a longitudinal wave`, t`Light is a longitudinal wave`, t`Sound travels faster in air than light does`, t`A transverse wave's particles move parallel to the direction of travel`], 0,
    t`Sound consists of compressions and rarefactions along the direction of travel, which makes it longitudinal. Light is transverse. In a transverse wave, particles move perpendicular to the direction of travel.`);

  q("P4-iii-04", 2, EN, false,
    t`A sonar pulse returns 0.60 s after being sent towards a cliff. The speed of sound is 340 m/s. How far away is the cliff?`,
    [t`$102$ m`, t`$204$ m`, t`$567$ m`, t`$51$ m`], 0,
    t`The pulse travels there and back: $d=\tfrac12vt=\tfrac12\cdot340\cdot0.60=102$ m.`,
    { vals: [102, 204, 567, 51], check: () => 0.5 * 340 * 0.6 });

  /* ---------- P5 Modelling ---------- */
  q("P5-i-01", 2, VWO, false,
    t`A computer model of a car contains: <br><code>Fres := Fmotor − k*v^2</code><br><code>a := Fres/m</code><br><code>v := v + a*dt</code><br><code>x := x + v*dt</code><br>with Fmotor = 600 N, k = 1.5 kg/m and m = 900 kg. Which speed does $v$ approach in the long run?`,
    [t`$20$ m/s`, t`$400$ m/s`, t`$0.67$ m/s`, t`$v$ keeps increasing`], 0,
    t`$v$ stops changing when $a=0$, i.e. $F_{\text{motor}}=kv^2$, so $v=\sqrt{600/1.5}=20$ m/s. The mass only affects how quickly it gets there.`,
    { vals: [20, 400, 0.667, null], check: () => { let v = 0; for (let i = 0; i < 200000; i++) { const a = (600 - 1.5 * v * v) / 900; v += a * 0.01; } return v; } });

  q("P5-i-02", 2, PP, false,
    t`A model of a ball thrown upward runs these lines each step, in this order: <br><code>a := −g</code><br><code>v := v + a*dt</code><br><code>h := h + v*dt</code><br>It starts with $h=0$, $v=10$ m/s, $g=9.81\ \text{m/s}^2$ and $dt=0.10$ s. What is $h$ after the first step?`,
    [t`$0.90$ m`, t`$1.0$ m`, t`$0.95$ m`, t`$0.098$ m`], 0,
    t`$v=10-0.981=9.019$ m/s is updated first, then $h=0+9.019\cdot0.10\approx0.90$ m. Using the old $v$ would give 1.0 m. The order of lines matters.`,
    { vals: [0.9019, 1.0, 0.951, 0.0981], check: () => { const v = 10 - g * 0.1; return v * 0.1; } });

  q("P5-i-03", 1, VWO, false,
    t`A numerical model of a falling object gives slightly different results for $dt=0.1$ s and $dt=0.01$ s. Which statement is correct?`,
    [t`The result with $dt=0.01$ s is more accurate`, t`The result with $dt=0.1$ s is more accurate`, t`$dt$ has no influence on the result`, t`A smaller $dt$ changes the physics being modelled`], 0,
    t`The model assumes $a$ and $v$ are constant within each step. Smaller steps make that assumption better, so the result converges to the true motion, at the cost of more steps.`);

  q("P5-ii-01", 2, VWO, false,
    t`A model of free fall contains: <br><code>Fres := m*g</code><br><code>a := Fres/m</code><br><code>v := v + a*dt</code><br>Which change adds air resistance proportional to $v^2$, with downward taken as positive?`,
    [t`<code>Fres := m*g − k*v^2</code>`, t`<code>Fres := m*g + k*v^2</code>`, t`<code>a := Fres/m − k*v^2</code>`, t`<code>v := v + a*dt − k*v^2</code>`], 0,
    t`Air resistance is a force opposing the motion. It belongs in the force balance with a minus sign when downward is positive. Options C and D mix up forces, accelerations and velocities, so their units do not match.`);

  q("P5-ii-02", 3, EN, false,
    t`A model of a mass-spring system contains: <br><code>F := −C*u</code><br><code>a := F/m</code><br><code>v := v + a*dt</code><br><code>u := u + v*dt</code><br>Which change makes the oscillation die out (damping)?`,
    [t`<code>F := −C*u − b*v</code>`, t`<code>F := −C*u − b*u</code>`, t`<code>F := −C*u + b*v</code>`, t`<code>a := F/m − b</code>`], 0,
    t`Damping is a friction-like force opposing the velocity: $-bv$. The term $-bu$ only acts like a stiffer spring. $+bv$ pumps energy in and makes the amplitude grow.`);
})();
