/* Delft AE Drill: physics bank, set 2.
   Original problems on the TU Delft AE Selection Exam syllabus (Mathematics & Physics, v2024),
   calibrated to TU Delft Pre-University Physics, Dutch VWO Natuurkunde, Cambridge ENGAA/ESAT, and the
   style of Krotov's "Aptitude Test Problems in Physics" for the stretch items (kept inside the syllabus).
   No problem is copied from any of these. Ids use serials from 11 upward. */
(function () {
  const G = typeof window !== "undefined" ? window : globalThis;
  G.PROBLEMS = G.PROBLEMS || [];
  const t = String.raw;
  const PI = Math.PI, sqrt = Math.sqrt, ln = Math.log;
  const g = 9.81, kC = 8.99e9, e = 1.602e-19, me = 9.109e-31, GM = 3.986e14, Gc = 6.674e-11;
  function q(id, difficulty, model, calc, stem, choices, answer, solution, extra) {
    const [code, sub] = id.split("-");
    G.PROBLEMS.push(Object.assign({
      id, subject: "physics", topic: code, sub,
      difficulty, model, calc, stem, choices, answer, solution, figure: null
    }, extra || {}));
  }
  const PP = "Pre-Uni Physics", VWO = "VWO Natuurkunde", EN = "ENGAA/ESAT", KR = "Krotov";
  const gNote = t` Use $g=9.81\ \text{m/s}^2$.`;
  const deg = Math.PI / 180;

  /* ---------- P1 Fundamentals ---------- */
  q("P1-i-11", 1, PP, false,
    t`What is the pascal in SI base units?`,
    [t`$\text{kg·m}^{-1}\text{·s}^{-2}$`, t`$\text{kg·m·s}^{-2}$`, t`$\text{kg·m}^{-2}\text{·s}^{-2}$`, t`$\text{kg·m}^{-1}\text{·s}^{-1}$`], 0,
    t`$1\ \text{Pa}=1\ \text{N/m}^2=\dfrac{\text{kg·m·s}^{-2}}{\text{m}^2}=\text{kg·m}^{-1}\text{s}^{-2}$.`);

  q("P1-i-12", 3, EN, false,
    t`The speed of a wave on a string depends only on the tension $F$ (N) and the mass per unit length $\mu$ (kg/m). Which formula is dimensionally possible?`,
    [t`$v=\sqrt{F/\mu}$`, t`$v=F/\mu$`, t`$v=\sqrt{F\mu}$`, t`$v=\mu/F$`], 0,
    t`$\dfrac{F}{\mu}$ has units $\dfrac{\text{kg·m·s}^{-2}}{\text{kg·m}^{-1}}=\text{m}^2\text{s}^{-2}$, so its square root is a speed. None of the others gives m/s.`);

  q("P1-i-13", 3, KR, false,
    t`The drag on an aircraft is written as $F=C\rho^a v^b A^c$, with $C$ dimensionless, $\rho$ the air density, $v$ the airspeed and $A$ the wing area. What are $a$, $b$ and $c$?`,
    [t`$a=1,\ b=2,\ c=1$`, t`$a=1,\ b=1,\ c=1$`, t`$a=2,\ b=1,\ c=1$`, t`$a=1,\ b=2,\ c=2$`], 0,
    t`$\text{kg}^a\text{m}^{-3a}\cdot\text{m}^b\text{s}^{-b}\cdot\text{m}^{2c}=\text{kg·m·s}^{-2}$. Kilograms: $a=1$. Seconds: $b=2$. Metres: $-3+2+2c=1\Rightarrow c=1$. That gives the familiar $F=\tfrac12C_D\rho v^2A$.`);

  q("P1-ii-11", 2, VWO, false,
    t`An aircraft heads due north at an airspeed of 250 m/s. A wind blows towards the east at 50 m/s. What is its speed over the ground?`,
    [t`$255$ m/s`, t`$300$ m/s`, t`$245$ m/s`, t`$200$ m/s`], 0,
    t`The velocities are perpendicular: $\sqrt{250^2+50^2}\approx255$ m/s, on a track slightly east of north.`,
    { vals: [254.95, 300, 244.95, 200], check: () => Math.hypot(250, 50) });

  q("P1-ii-12", 3, KR, true,
    t`The same aircraft (airspeed 250 m/s, wind 50 m/s towards the east) must fly a track due north. How many degrees west of north must it head?`,
    [t`$11.5^\circ$`, t`$11.3^\circ$`, t`$78.5^\circ$`, t`$5.7^\circ$`], 0,
    t`The eastward wind must be cancelled by the westward component of the airspeed: $250\sin\theta=50\Rightarrow\theta=\sin^{-1}0.2\approx11.5^\circ$. Option B uses $\tan^{-1}(50/250)$, which is the wrong triangle.`,
    { nearOk: true, vals: [11.54, 11.31, 78.46, 5.7], check: () => Math.asin(0.2) / deg });

  q("P1-iii-11", 1, PP, false,
    t`A wavelength of $0.35\ \mu\text{m}$ is how many nanometres?`,
    [t`$350$ nm`, t`$35$ nm`, t`$3.5$ nm`, t`$3500$ nm`], 0,
    t`$1\ \mu\text{m}=1000$ nm, so $0.35\ \mu\text{m}=350$ nm.`,
    { vals: [350, 35, 3.5, 3500], check: () => 0.35e-6 / 1e-9 });

  q("P1-iii-12", 1, VWO, false,
    t`How many megajoules are in 1 kWh?`,
    [t`$3.6$ MJ`, t`$1.0$ MJ`, t`$0.36$ MJ`, t`$60$ MJ`], 0,
    t`$1\ \text{kWh}=1000\ \text{W}\times3600\ \text{s}=3.6\times10^6$ J.`,
    { vals: [3.6, 1, 0.36, 60], check: () => 1000 * 3600 / 1e6 });

  q("P1-iv-11", 2, VWO, false,
    t`Sound level is $L=10\log_{10}\!\left(\dfrac{I}{I_0}\right)$ dB. If the sound intensity becomes 100 times larger, by how much does $L$ increase?`,
    [t`$20$ dB`, t`$100$ dB`, t`$10$ dB`, t`$2$ dB`], 0,
    t`$\Delta L=10\log_{10}100=10\cdot2=20$ dB.`,
    { vals: [20, 100, 10, 2], check: () => 10 * Math.log10(100) });

  q("P1-vi-11", 2, EN, false,
    t`A double-logarithmic plot of $y$ against $x$ is a straight line through $(\log x,\log y)=(0,\ 1)$ and $(2,\ 0)$. Which relation holds?`,
    [t`$y=10\,x^{-1/2}$`, t`$y=10-0.5x$`, t`$y=10\,e^{-x/2}$`, t`$y=10\,x^{-2}$`], 0,
    t`The slope is $\tfrac{0-1}{2-0}=-\tfrac12$, so $y\propto x^{-1/2}$. The intercept $\log y=1$ at $x=1$ gives the factor 10.`);

  q("P1-vii-11", 1, PP, false,
    t`A panel measures 4.5 m by 2.25 m. How should its area be reported?`,
    [t`$1.0\times10^{1}\ \text{m}^2$`, t`$10.125\ \text{m}^2$`, t`$10.13\ \text{m}^2$`, t`$10.1\ \text{m}^2$`], 0,
    t`$4.5\times2.25=10.125$, but 4.5 has only 2 significant figures, so the result gets 2: $1.0\times10^1\ \text{m}^2$. Writing "10" would leave the precision unclear.`);

  q("P1-viii-11", 2, VWO, false,
    t`By how much does the pressure at 10 m depth in water ($\rho=1000\ \text{kg/m}^3$) exceed the pressure at the surface?` + gNote,
    [t`$9.8\times10^{4}$ Pa`, t`$1.0\times10^{4}$ Pa`, t`$2.0\times10^{5}$ Pa`, t`$9.8\times10^{3}$ Pa`], 0,
    t`$\Delta p=\rho gh=1000\cdot9.81\cdot10\approx9.8\times10^4$ Pa, about one extra atmosphere. Option C is the total absolute pressure.`,
    { vals: [98100, 1e4, 1.994e5, 9810], check: () => 1000 * g * 10 });

  q("P1-viii-12", 3, KR, false,
    t`Equal masses of water ($1000\ \text{kg/m}^3$) and alcohol ($800\ \text{kg/m}^3$) are mixed. Assuming the volumes simply add, what is the density of the mixture?`,
    [t`$889\ \text{kg/m}^3$`, t`$900\ \text{kg/m}^3$`, t`$850\ \text{kg/m}^3$`, t`$1800\ \text{kg/m}^3$`], 0,
    t`For mass $m$ of each: $V=\tfrac{m}{1000}+\tfrac{m}{800}$, so $\rho=\dfrac{2m}{V}=\dfrac{2}{1/1000+1/800}\approx889\ \text{kg/m}^3$. This is the harmonic mean, which is less than the plain average of 900 because there is more volume of the lighter liquid.`,
    { nearOk: true, vals: [888.9, 900, 850, 1800], check: () => 2 / (1 / 1000 + 1 / 800) });

  /* ---------- P2 Mechanics ---------- */
  q("P2-i-11", 1, VWO, false,
    t`A car speeds up uniformly from 10 m/s to 30 m/s over 200 m. What is its acceleration?`,
    [t`$2.0\ \text{m/s}^2$`, t`$0.10\ \text{m/s}^2$`, t`$4.0\ \text{m/s}^2$`, t`$1.0\ \text{m/s}^2$`], 0,
    t`$v^2=v_0^2+2as\Rightarrow a=\dfrac{900-100}{400}=2.0\ \text{m/s}^2$.`,
    { vals: [2, 0.1, 4, 1], check: () => (900 - 100) / 400 });

  q("P2-i-12", 3, KR, false,
    t`A stone dropped from rest covers 25 m during the last second of its fall. From what height was it dropped? Use $g=10\ \text{m/s}^2$.`,
    [t`$45$ m`, t`$25$ m`, t`$31$ m`, t`$80$ m`], 0,
    t`If the fall lasts $T$: $5T^2-5(T-1)^2=25\Rightarrow10T-5=25\Rightarrow T=3$ s. $h=5\cdot9=45$ m.`,
    { vals: [45, 25, 31.25, 80], check: () => { const T = 3; return 5 * T * T; } });

  q("P2-i-13", 2, EN, false,
    t`Car A starts from rest with acceleration $2.0\ \text{m/s}^2$ at the moment car B passes it at a constant 20 m/s. After how long does A catch up with B?`,
    [t`$20$ s`, t`$10$ s`, t`$40$ s`, t`$14$ s`], 0,
    t`$\tfrac12\cdot2t^2=20t\Rightarrow t=20$ s (both 400 m from the start). At $t=10$ s A only matches B's speed; the gap is largest then.`,
    { vals: [20, 10, 40, 14.1], check: () => 20 * 2 / 2 });

  q("P2-i-14", 2, VWO, false,
    t`From rest, a body has $a=2.0\ \text{m/s}^2$ for 5.0 s and then $a=-1.0\ \text{m/s}^2$ for 4.0 s. What is its final speed?`,
    [t`$6.0$ m/s`, t`$10$ m/s`, t`$14$ m/s`, t`$1.0$ m/s`], 0,
    t`The change in velocity is the area under the $(a,t)$-diagram: $2\cdot5-1\cdot4=6$ m/s.`,
    { vals: [6, 10, 14, 1], check: () => 10 - 4 });

  q("P2-i-15", 2, PP, false,
    t`A ball rolls off a table 1.25 m high at 3.0 m/s. How far from the table's edge does it land? Use $g=10\ \text{m/s}^2$.`,
    [t`$1.5$ m`, t`$3.0$ m`, t`$0.75$ m`, t`$1.25$ m`], 0,
    t`The vertical fall sets the time: $1.25=5t^2\Rightarrow t=0.50$ s. The horizontal speed stays 3.0 m/s, so $x=1.5$ m.`,
    { vals: [1.5, 3, 0.75, 1.25], check: () => 3 * sqrt(2 * 1.25 / 10) });

  q("P2-i-16", 3, EN, true,
    t`A projectile is launched at 20 m/s at $30^\circ$ above level ground. What is its range? Use $g=10\ \text{m/s}^2$ and ignore air resistance.`,
    [t`$34.6$ m`, t`$40.0$ m`, t`$20.0$ m`, t`$17.3$ m`], 0,
    t`$R=\dfrac{v^2\sin2\theta}{g}=\dfrac{400\cdot\sin60^\circ}{10}\approx34.6$ m. 40 m is the maximum range, at $45^\circ$.`,
    { vals: [34.64, 40, 20, 17.32], check: () => { const vx = 20 * Math.cos(30 * deg), vy = 20 * Math.sin(30 * deg); return vx * 2 * vy / 10; } });

  q("P2-i-17", 3, KR, false,
    t`A river is 100 m wide and flows at 3.0 m/s. A boat moves at 5.0 m/s relative to the water. If it heads so that it crosses straight to the point opposite, how long does the crossing take?`,
    [t`$25$ s`, t`$20$ s`, t`$33$ s`, t`$12.5$ s`], 0,
    t`Part of the boat's velocity must cancel the current. Its across-river component is $\sqrt{5^2-3^2}=4$ m/s, so $t=100/4=25$ s. 20 s would be the time when heading straight across and drifting downstream.`,
    { vals: [25, 20, 33.3, 12.5], check: () => 100 / sqrt(25 - 9) });

  q("P2-i-18", 3, KR, true,
    t`Rain falls vertically at 8.0 m/s. A cyclist rides at 6.0 m/s. At what angle to the vertical does the rain appear to come at them?`,
    [t`$37^\circ$`, t`$53^\circ$`, t`$45^\circ$`, t`$49^\circ$`], 0,
    t`Relative to the cyclist the rain has a horizontal component of 6.0 m/s towards them and 8.0 m/s down. $\tan\alpha=\tfrac68\Rightarrow\alpha\approx37^\circ$ from the vertical.`,
    { vals: [36.87, 53.13, 45, 48.6], check: () => Math.atan(6 / 8) / deg });

  q("P2-ii-11", 2, VWO, false,
    t`A 70 kg person stands on bathroom scales in a lift that accelerates upward at $2.0\ \text{m/s}^2$. What force do the scales show?` + gNote,
    [t`$827$ N`, t`$687$ N`, t`$547$ N`, t`$140$ N`], 0,
    t`$N-mg=ma\Rightarrow N=m(g+a)=70\cdot11.81\approx827$ N. Option C is for downward acceleration.`,
    { vals: [826.7, 686.7, 546.7, 140], check: () => 70 * (g + 2) });

  q("P2-ii-12", 2, EN, false,
    t`Blocks of 2.0 kg and 3.0 kg touch on a frictionless table. A 10 N horizontal force pushes the 2.0 kg block, which pushes the 3.0 kg block. What is the contact force between them?`,
    [t`$6.0$ N`, t`$4.0$ N`, t`$10$ N`, t`$5.0$ N`], 0,
    t`Together: $a=\tfrac{10}{5}=2\ \text{m/s}^2$. The contact force is the only horizontal force on the 3.0 kg block: $3\cdot2=6.0$ N.`,
    { vals: [6, 4, 10, 5], check: () => 3 * 10 / 5 });

  q("P2-ii-13", 3, KR, false,
    t`A block slides down a $30^\circ$ slope with coefficient of friction 0.20. What is its acceleration?` + gNote,
    [t`$3.2\ \text{m/s}^2$`, t`$4.9\ \text{m/s}^2$`, t`$3.9\ \text{m/s}^2$`, t`$6.6\ \text{m/s}^2$`], 0,
    t`Along the slope: $a=g(\sin30^\circ-\mu\cos30^\circ)=9.81(0.500-0.173)\approx3.2\ \text{m/s}^2$. Option C uses $\mu\sin$ instead of $\mu\cos$ for the friction. The normal force is $mg\cos\theta$.`,
    { vals: [3.206, 4.905, 3.924, 6.604], check: () => g * (Math.sin(30 * deg) - 0.2 * Math.cos(30 * deg)) });

  q("P2-ii-14", 2, VWO, true,
    t`A crate rests on a ramp at $25^\circ$ and is just about to slip. What is the coefficient of static friction?`,
    [t`$0.47$`, t`$0.42$`, t`$0.91$`, t`$2.1$`], 0,
    t`On the point of slipping: $mg\sin\theta=\mu mg\cos\theta\Rightarrow\mu=\tan25^\circ\approx0.47$. Option B is $\sin25^\circ$.`,
    { vals: [0.4663, 0.4226, 0.9063, 2.145], check: () => Math.tan(25 * deg) });

  q("P2-ii-15", 3, KR, false,
    t`A 2.0 kg block on a table ($\mu=0.25$) is tied by a string over a light pulley at the table edge to a hanging 1.0 kg mass. What is the acceleration?` + gNote,
    [t`$1.6\ \text{m/s}^2$`, t`$3.3\ \text{m/s}^2$`, t`$4.9\ \text{m/s}^2$`, t`$2.5\ \text{m/s}^2$`], 0,
    t`The driving force is the hanging weight, $9.81$ N, minus friction $0.25\cdot2.0\cdot9.81=4.91$ N, giving a net 4.91 N. The whole system of 3.0 kg accelerates: $a\approx1.6\ \text{m/s}^2$. Option B ignores friction.`,
    { vals: [1.635, 3.27, 4.905, 2.45], check: () => (1 * g - 0.25 * 2 * g) / 3 });

  q("P2-ii-16", 2, PP, false,
    t`Springs with $C_1=100$ N/m and $C_2=300$ N/m are connected end to end (in series). What is the combined spring constant?`,
    [t`$75$ N/m`, t`$400$ N/m`, t`$200$ N/m`, t`$150$ N/m`], 0,
    t`In series both carry the same force and their extensions add: $\dfrac1C=\dfrac1{100}+\dfrac1{300}=\dfrac{4}{300}\Rightarrow C=75$ N/m. 400 N/m is the parallel value.`,
    { vals: [75, 400, 200, 150], check: () => 1 / (1 / 100 + 1 / 300) });

  q("P2-ii-17", 3, KR, false,
    t`A 5.0 kg lamp hangs from two cables, each making $30^\circ$ with the horizontal. What is the tension in each cable?` + gNote,
    [t`$49$ N`, t`$25$ N`, t`$28$ N`, t`$98$ N`], 0,
    t`Vertical balance: $2T\sin30^\circ=mg\Rightarrow T=mg=49$ N. Shallow cables need large tensions; option B just splits the weight in two.`,
    { vals: [49.05, 24.5, 28.3, 98.1], check: () => 5 * g / (2 * Math.sin(30 * deg)) });

  q("P2-ii-18", 3, EN, true,
    t`A road curve of radius 100 m is banked at $15^\circ$. At what speed can a car take it with no sideways friction needed?` + gNote,
    [t`$16$ m/s`, t`$31$ m/s`, t`$8.1$ m/s`, t`$26$ m/s`], 0,
    t`The horizontal component of the normal force provides the centripetal force: $\tan\theta=\dfrac{v^2}{rg}\Rightarrow v=\sqrt{rg\tan15^\circ}=\sqrt{262.9}\approx16$ m/s.`,
    { vals: [16.21, 31.3, 8.1, 26], check: () => sqrt(100 * g * Math.tan(15 * deg)) });

  q("P2-ii-19", 1, VWO, false,
    t`A skydiver with parachute (total 90 kg) descends at a constant 5.0 m/s. How large is the air resistance?` + gNote,
    [t`$883$ N`, t`$450$ N`, t`$0$ N`, t`$1766$ N`], 0,
    t`Constant velocity means zero resultant force (Newton's first law), so drag equals weight: $90\cdot9.81\approx883$ N. The speed itself does not matter.`,
    { vals: [882.9, 450, 0, 1766], check: () => 90 * g });

  q("P2-iii-11", 1, PP, false,
    t`A roller-coaster car starts from rest at a height of 30 m. Ignoring friction, what is its speed at a height of 10 m?` + gNote,
    [t`$19.8$ m/s`, t`$24.3$ m/s`, t`$14.0$ m/s`, t`$9.9$ m/s`], 0,
    t`$\tfrac12v^2=g\Delta h=9.81\cdot20\Rightarrow v\approx19.8$ m/s. Option B uses the full 30 m drop.`,
    { vals: [19.81, 24.26, 14.0, 9.9], check: () => sqrt(2 * g * 20) });

  q("P2-iii-12", 3, KR, false,
    t`A car runs on a frictionless track with a vertical loop of radius 8.0 m. From what minimum height above the bottom of the loop must it start from rest to stay on the track at the top?`,
    [t`$20$ m`, t`$16$ m`, t`$24$ m`, t`$12$ m`], 0,
    t`At the top the minimum speed satisfies $mg=\dfrac{mv^2}{R}$, so $v^2=gR$. Energy: $gh=g\cdot2R+\tfrac12gR\Rightarrow h=2.5R=20$ m. 16 m is just the top of the loop, where the car would arrive with zero speed and fall off.`,
    { vals: [20, 16, 24, 12], check: () => 2.5 * 8 });

  q("P2-iii-13", 2, KR, false,
    t`A 2.0 kg sledge starts from rest 5.0 m up a rough slope and reaches the bottom at 8.0 m/s. How much energy did friction dissipate?` + gNote,
    [t`$34$ J`, t`$64$ J`, t`$98$ J`, t`$162$ J`], 0,
    t`$E_{\text{lost}}=mgh-\tfrac12mv^2=98.1-64=34$ J.`,
    { vals: [34.1, 64, 98.1, 162.1], check: () => 2 * g * 5 - 0.5 * 2 * 64 });

  q("P2-iii-14", 1, VWO, false,
    t`A cyclist delivers 300 W while riding at a constant 10 m/s. How large is the total resistive force?`,
    [t`$30$ N`, t`$3000$ N`, t`$3.0$ N`, t`$300$ N`], 0,
    t`At constant speed the driving force equals the resistance, and $P=Fv$. So $F=\tfrac{300}{10}=30$ N.`,
    { vals: [30, 3000, 3, 300], check: () => 300 / 10 });

  q("P2-iii-15", 3, EN, true,
    t`A 1200 kg car climbs a road where $\sin\theta=0.050$ at a constant 20 m/s, against 500 N of rolling and air resistance. What power must the engine deliver?` + gNote,
    [t`$22$ kW`, t`$10$ kW`, t`$12$ kW`, t`$240$ kW`], 0,
    t`Driving force $=mg\sin\theta+F_w=588.6+500=1088.6$ N. $P=Fv\approx21.8$ kW. Option B forgets the climb; option C ignores the resistance.`,
    { vals: [21772, 10000, 11772, 240000], check: () => (1200 * g * 0.05 + 500) * 20 });

  q("P2-iii-16", 2, PP, false,
    t`A spring with $C=500$ N/m is stretched from 0.10 m to 0.30 m extension. How much work does this take?`,
    [t`$20$ J`, t`$10$ J`, t`$22.5$ J`, t`$100$ J`], 0,
    t`$W=\tfrac12C(u_2^2-u_1^2)=250(0.09-0.01)=20$ J. Using $\tfrac12C(\Delta u)^2=250\cdot0.04$ gives 10 J, which is wrong because the spring already had some energy stored.`,
    { vals: [20, 10, 22.5, 100], check: () => 0.5 * 500 * (0.09 - 0.01) });

  q("P2-iii-17", 3, KR, false,
    t`A 0.50 kg ball on a 1.0 m string is whirled in a vertical circle, just fast enough to keep the string taut at the top. What is the tension at the bottom?` + gNote,
    [t`$29$ N`, t`$4.9$ N`, t`$15$ N`, t`$25$ N`], 0,
    t`Top: $v_t^2=gR$. Energy down $2R$: $v_b^2=gR+4gR=5gR$. Bottom: $T-mg=\dfrac{mv_b^2}{R}=5mg\Rightarrow T=6mg\approx29$ N. This $6mg$ result holds for any radius.`,
    { vals: [29.43, 4.905, 14.7, 24.5], check: () => 6 * 0.5 * g });

  q("P2-iv-11", 2, VWO, false,
    t`The Earth rotates once in 86 164 s and has an equatorial radius of $6.37\times10^6$ m. What is the centripetal acceleration of a point on the equator?`,
    [t`$0.034\ \text{m/s}^2$`, t`$3.4\ \text{m/s}^2$`, t`$9.8\ \text{m/s}^2$`, t`$4.6\times10^{-4}\ \text{m/s}^2$`], 0,
    t`$\omega=\dfrac{2\pi}{86\,164}=7.29\times10^{-5}$ rad/s. $a=\omega^2R\approx0.034\ \text{m/s}^2$, about 0.3% of $g$. Option D is the speed (465 m/s) divided by $10^6$, not an acceleration.`,
    { vals: [0.0339, 3.39, 9.81, 4.64e-4], check: () => (2 * PI / 86164) ** 2 * 6.37e6 });

  q("P2-iv-12", 3, KR, true,
    t`A conical pendulum has a 1.0 m string that makes $30^\circ$ with the vertical. What is its period of revolution?` + gNote,
    [t`$1.87$ s`, t`$2.01$ s`, t`$1.42$ s`, t`$3.73$ s`], 0,
    t`$T\cos\theta=mg$ and $T\sin\theta=m\omega^2L\sin\theta\Rightarrow\omega^2=\dfrac{g}{L\cos\theta}$. Period $=2\pi\sqrt{\dfrac{L\cos30^\circ}{g}}\approx1.87$ s. Option B is a simple pendulum of length 1 m.`,
    { vals: [1.867, 2.006, 1.42, 3.73], check: () => 2 * PI * sqrt(Math.cos(30 * deg) / g) });

  q("P2-iv-13", 2, EN, false,
    t`At what acceleration does a body fall at a height above the Earth's surface equal to one Earth radius? (Surface value $9.81\ \text{m/s}^2$.)`,
    [t`$2.45\ \text{m/s}^2$`, t`$4.91\ \text{m/s}^2$`, t`$9.81\ \text{m/s}^2$`, t`$1.09\ \text{m/s}^2$`], 0,
    t`The distance from the centre doubles, and $g\propto1/r^2$, so $g/4\approx2.45\ \text{m/s}^2$.`,
    { vals: [2.4525, 4.905, 9.81, 1.09], check: () => g / 4 });

  q("P2-iv-14", 3, VWO, true,
    t`A space station orbits at 400 km altitude ($r=6.77\times10^6$ m, $GM=3.986\times10^{14}\ \text{m}^3/\text{s}^2$). What is its orbital period?`,
    [t`$92$ min`, t`$46$ min`, t`$24$ h`, t`$185$ min`], 0,
    t`$T=2\pi\sqrt{\dfrac{r^3}{GM}}=2\pi\sqrt{\dfrac{3.10\times10^{20}}{3.986\times10^{14}}}\approx5.54\times10^3$ s $\approx92$ min.`,
    { vals: [92.4, 46.2, 1440, 184.8], check: () => 2 * PI * sqrt(6.77e6 ** 3 / GM) / 60 });

  q("P2-iv-15", 3, EN, true,
    t`The Moon orbits at $3.84\times10^8$ m with a period of 27.3 days. Estimate the mass of the Earth. ($G=6.67\times10^{-11}\ \text{N·m}^2/\text{kg}^2$)`,
    [t`$6.0\times10^{24}$ kg`, t`$6.0\times10^{22}$ kg`, t`$4.0\times10^{14}$ kg`, t`$2.0\times10^{30}$ kg`], 0,
    t`$M=\dfrac{4\pi^2r^3}{GT^2}$ with $T=27.3\cdot86\,400=2.36\times10^6$ s, giving $M\approx6.0\times10^{24}$ kg. Option C is $GM$ without dividing by $G$.`,
    { vals: [6.0e24, 6.0e22, 4.0e14, 2.0e30], check: () => { const T = 27.3 * 86400; return 4 * PI * PI * (3.84e8) ** 3 / (Gc * T * T); } });

  q("P2-iv-16", 2, KR, false,
    t`A car drives over a hump-backed bridge with a radius of curvature of 40 m. Above what speed do its wheels leave the road at the top?` + gNote,
    [t`$19.8$ m/s`, t`$28.0$ m/s`, t`$9.9$ m/s`, t`$392$ m/s`], 0,
    t`The wheels lose contact when gravity alone provides the centripetal force: $mg=\dfrac{mv^2}{r}\Rightarrow v=\sqrt{gr}\approx19.8$ m/s.`,
    { vals: [19.81, 28.0, 9.9, 392.4], check: () => sqrt(g * 40) });

  /* ---------- P3 Electricity and magnetism ---------- */
  q("P3-i-11", 2, VWO, false,
    t`A phone battery is rated 3.7 V, 3000 mAh. How much energy does it store when full?`,
    [t`$40$ kJ`, t`$11$ J`, t`$11$ kJ`, t`$0.67$ kJ`], 0,
    t`Charge $Q=3.0\ \text{A}\times3600\ \text{s}=10\,800$ C. $E=QU=10\,800\cdot3.7\approx4.0\times10^4$ J. Option B multiplies $3.7\times3$ without converting hours to seconds.`,
    { vals: [39960, 11.1, 11100, 666], check: () => 3.7 * 3 * 3600 });

  q("P3-i-12", 1, PP, false,
    t`A current of 2.0 A flows for 10 s. How much charge passes?`,
    [t`$20$ C`, t`$5.0$ C`, t`$0.20$ C`, t`$12$ C`], 0,
    t`$Q=It=20$ C.`,
    { vals: [20, 5, 0.2, 12], check: () => 2 * 10 });

  q("P3-ii-11", 1, VWO, false,
    t`Two 6.0 Ω resistors in parallel are connected in series with a third 6.0 Ω resistor. What is the total resistance?`,
    [t`$9.0$ Ω`, t`$18$ Ω`, t`$4.0$ Ω`, t`$2.0$ Ω`], 0,
    t`The parallel pair gives 3.0 Ω; adding 6.0 Ω in series gives 9.0 Ω.`,
    { vals: [9, 18, 4, 2], check: () => 1 / (1 / 6 + 1 / 6) + 6 });

  q("P3-ii-12", 2, EN, false,
    t`In a bridge circuit, one branch has 2.0 Ω then 4.0 Ω and the other has 3.0 Ω then an unknown $X$. A meter connected between the midpoints of the branches reads zero. What is $X$?`,
    [t`$6.0$ Ω`, t`$1.5$ Ω`, t`$2.7$ Ω`, t`$5.0$ Ω`], 0,
    t`No current through the meter means both midpoints are at the same potential, so the ratios match: $\tfrac{2.0}{4.0}=\tfrac{3.0}{X}\Rightarrow X=6.0$ Ω.`,
    { vals: [6, 1.5, 2.67, 5], check: () => 3 * 4 / 2 });

  q("P3-ii-13", 2, PP, false,
    t`A battery with emf 12 V and internal resistance 0.50 Ω is connected to a 5.5 Ω resistor. What is the voltage across the battery terminals?`,
    [t`$11$ V`, t`$12$ V`, t`$1.0$ V`, t`$10$ V`], 0,
    t`$I=\dfrac{12}{5.5+0.5}=2.0$ A. The internal voltage drop is $2.0\cdot0.50=1.0$ V, leaving $U=11$ V.`,
    { vals: [11, 12, 1, 10], check: () => 12 - (12 / 6) * 0.5 });

  q("P3-ii-14", 3, EN, false,
    t`Two batteries, 10 V with a 2.0 Ω series resistor and 4.0 V with a 2.0 Ω series resistor, are connected in parallel (positive to positive) across a 1.0 Ω load. What current flows through the load?`,
    [t`$3.5$ A`, t`$7.0$ A`, t`$2.8$ A`, t`$4.7$ A`], 0,
    t`Let the load voltage be $V$. Kirchhoff's current law at the top node: $\dfrac{10-V}{2}+\dfrac{4-V}{2}=\dfrac{V}{1}\Rightarrow14-2V=2V\Rightarrow V=3.5$ V. The load current is 3.5 A. (The 4 V battery is being charged by 0.25 A.)`,
    { vals: [3.5, 7, 2.8, 4.67], check: () => { const V = 14 / 4; return V / 1; } });

  q("P3-ii-15", 1, VWO, false,
    t`How many identical 100 Ω resistors must be connected in parallel to give 20 Ω?`,
    [t`$5$`, t`$4$`, t`$20$`, t`$80$`], 0,
    t`$n$ equal resistors in parallel give $R/n$, so $100/n=20\Rightarrow n=5$.`,
    { vals: [5, 4, 20, 80], check: () => 100 / 20 });

  q("P3-iii-11", 3, KR, true,
    t`Lamps rated 60 W and 100 W (both for 230 V) are connected in series to 230 V. Assuming constant resistances, what power does the 60 W lamp dissipate?`,
    [t`$23$ W`, t`$60$ W`, t`$14$ W`, t`$38$ W`], 0,
    t`$R_{60}=\tfrac{230^2}{60}=882$ Ω and $R_{100}=529$ Ω. $I=\tfrac{230}{1411}=0.163$ A. $P_{60}=I^2R_{60}\approx23$ W. The "60 W" lamp is now the brighter one, because it has the larger resistance. The 100 W lamp gets 14 W.`,
    { vals: [23.4, 60, 14.1, 37.5], check: () => { const R1 = 230 * 230 / 60, R2 = 230 * 230 / 100, I = 230 / (R1 + R2); return I * I * R1; } });

  q("P3-iii-12", 1, VWO, false,
    t`A 2.0 kW heater runs for 3.0 hours at €0.30 per kWh. What does it cost?`,
    [t`€1.80`, t`€0.60`, t`€18.00`, t`€0.20`], 0,
    t`$E=2.0\cdot3.0=6.0$ kWh, and $6.0\cdot0.30=$ €1.80.`,
    { vals: [1.8, 0.6, 18, 0.2], check: () => 2 * 3 * 0.3 });

  q("P3-iv-11", 3, KR, false,
    t`Charge $+4q$ is at $x=0$ and charge $+q$ at $x=3.0$ m. At what point between them does a third charge feel no net force?`,
    [t`$x=2.0$ m`, t`$x=1.0$ m`, t`$x=1.5$ m`, t`$x=2.4$ m`], 0,
    t`The forces must balance: $\dfrac{4q}{x^2}=\dfrac{q}{(3-x)^2}\Rightarrow2(3-x)=x\Rightarrow x=2.0$ m. The point is nearer the smaller charge. The third charge's sign does not matter.`,
    { vals: [2, 1, 1.5, 2.4], check: () => 6 / 3 });

  q("P3-iv-12", 2, EN, true,
    t`What is the Coulomb force between the electron and proton in a hydrogen atom, $5.3\times10^{-11}$ m apart? ($k=8.99\times10^9\ \text{N·m}^2/\text{C}^2$, $e=1.602\times10^{-19}$ C)`,
    [t`$8.2\times10^{-8}$ N`, t`$4.4\times10^{-18}$ N`, t`$2.3\times10^{-28}$ N`, t`$8.2\times10^{-10}$ N`], 0,
    t`$F=\dfrac{ke^2}{r^2}=\dfrac{8.99\times10^9\cdot2.57\times10^{-38}}{2.81\times10^{-21}}\approx8.2\times10^{-8}$ N. Option B forgets to square $r$; option C forgets to divide by $r^2$ at all.`,
    { vals: [8.21e-8, 4.35e-18, 2.31e-28, 8.2e-10], check: () => kC * e * e / (5.3e-11) ** 2 });

  q("P3-iv-13", 2, VWO, false,
    t`Two charges repel with 0.90 N when 10 cm apart. What is the force when they are 30 cm apart?`,
    [t`$0.10$ N`, t`$0.30$ N`, t`$2.7$ N`, t`$0.030$ N`], 0,
    t`$F\propto1/r^2$. Three times the distance gives $\tfrac19$ of the force: $0.10$ N.`,
    { vals: [0.1, 0.3, 2.7, 0.03], check: () => 0.9 / 9 });

  q("P3-v-11", 2, PP, false,
    t`A square loop of side 10 cm is perpendicular to a uniform field that increases from 0.20 T to 0.60 T. By how much does the flux through the loop change?`,
    [t`$4.0\times10^{-3}$ Wb`, t`$4.0\times10^{-2}$ Wb`, t`$6.0\times10^{-3}$ Wb`, t`$0.40$ Wb`], 0,
    t`$\Delta\Phi=\Delta B\cdot A=0.40\cdot0.010=4.0\times10^{-3}$ Wb. Remember $(0.10\ \text{m})^2=0.010\ \text{m}^2$.`,
    { vals: [4e-3, 4e-2, 6e-3, 0.4], check: () => 0.4 * 0.01 });

  q("P3-v-12", 3, EN, false,
    t`A flat coil of area $0.050\ \text{m}^2$ starts perpendicular to a 0.80 T field (normal parallel to the field) and is turned through $60^\circ$. What is the flux now?`,
    [t`$0.020$ Wb`, t`$0.035$ Wb`, t`$0.040$ Wb`, t`$0$ Wb`], 0,
    t`The angle between the field and the normal is now $60^\circ$: $\Phi=BA\cos60^\circ=0.80\cdot0.050\cdot0.5=0.020$ Wb. After $90^\circ$ it would be zero.`,
    { vals: [0.02, 0.0346, 0.04, 0], check: () => 0.8 * 0.05 * Math.cos(60 * deg) });

  q("P3-vi-11", 2, VWO, false,
    t`A 0.50 m straight wire carrying 3.0 A lies perpendicular to a uniform 0.20 T field. What force acts on it?`,
    [t`$0.30$ N`, t`$3.0$ N`, t`$0.030$ N`, t`$7.5$ N`], 0,
    t`$F=BIL=0.20\cdot3.0\cdot0.50=0.30$ N. This is the sum of the Lorentz forces on the moving charges in the wire.`,
    { vals: [0.3, 3, 0.03, 7.5], check: () => 0.2 * 3 * 0.5 });

  q("P3-vi-12", 3, EN, true,
    t`An electron starting from rest is accelerated through a potential difference of 100 V. What speed does it reach? ($e=1.602\times10^{-19}$ C, $m_e=9.11\times10^{-31}$ kg)`,
    [t`$5.9\times10^{6}$ m/s`, t`$3.5\times10^{13}$ m/s`, t`$4.2\times10^{6}$ m/s`, t`$5.9\times10^{5}$ m/s`], 0,
    t`$\Delta E=qU=1.602\times10^{-17}$ J $=\tfrac12mv^2\Rightarrow v=\sqrt{\dfrac{2qU}{m}}\approx5.9\times10^6$ m/s. Option B forgets the square root; option C leaves out the factor 2.`,
    { vals: [5.93e6, 3.52e13, 4.19e6, 5.93e5], check: () => sqrt(2 * e * 100 / me) });

  q("P3-vi-13", 3, EN, false,
    t`A positive ion moves horizontally due north through a magnetic field that points vertically down into the ground. In which direction is the Lorentz force?`,
    [t`West`, t`East`, t`Up`, t`South`], 0,
    t`Take east $=\hat x$, north $=\hat y$, up $=\hat z$. $\mathbf F\propto\mathbf v\times\mathbf B=\hat y\times(-\hat z)=-\hat x$, which is west. A negative ion would be pushed east.`);

  /* ---------- P4 Vibrations and waves ---------- */
  q("P4-i-11", 1, VWO, false,
    t`What is the period of a simple pendulum 1.0 m long? ($T=2\pi\sqrt{L/g}$)` + gNote,
    [t`$2.0$ s`, t`$1.0$ s`, t`$6.3$ s`, t`$0.32$ s`], 0,
    t`$T=2\pi\sqrt{1.0/9.81}=2\pi\cdot0.319\approx2.0$ s. Option D is $\sqrt{L/g}$ without the $2\pi$.`,
    { vals: [2.006, 1, 6.28, 0.319], check: () => 2 * PI * sqrt(1 / g) });

  q("P4-i-12", 2, EN, false,
    t`A wave has wavelength 2.0 m. What is the phase difference between two points 0.50 m apart along the direction of travel?`,
    [t`$\tfrac{\pi}{2}$ rad`, t`$\pi$ rad`, t`$\tfrac{\pi}{4}$ rad`, t`$0.50$ rad`], 0,
    t`$\dfrac{\Delta x}{\lambda}=\tfrac14$ of a cycle, which is $\tfrac14\cdot2\pi=\tfrac{\pi}{2}$ rad.`,
    { vals: [PI / 2, PI, PI / 4, 0.5], check: () => 2 * PI * 0.5 / 2 });

  q("P4-ii-11", 2, PP, false,
    t`A 0.20 kg mass on a spring oscillates with period 0.50 s. What is the spring constant?`,
    [t`$32$ N/m`, t`$2.5$ N/m`, t`$0.80$ N/m`, t`$16$ N/m`], 0,
    t`$T=2\pi\sqrt{m/C}\Rightarrow C=\dfrac{4\pi^2m}{T^2}=\dfrac{39.5\cdot0.20}{0.25}\approx32$ N/m.`,
    { vals: [31.58, 2.5, 0.8, 15.8], check: () => 4 * PI * PI * 0.2 / 0.25 });

  q("P4-ii-12", 3, KR, false,
    t`A 0.50 kg mass hangs from two identical 100 N/m springs connected end to end. What is the period of vertical oscillation?`,
    [t`$0.63$ s`, t`$0.44$ s`, t`$0.31$ s`, t`$0.89$ s`], 0,
    t`In series the combined spring constant is $50$ N/m. $T=2\pi\sqrt{0.50/50}=2\pi\cdot0.10\approx0.63$ s. Option C treats the springs as parallel ($C=200$ N/m).`,
    { vals: [0.628, 0.444, 0.314, 0.888], check: () => 2 * PI * sqrt(0.5 / 50) });

  q("P4-ii-13", 3, EN, true,
    t`An engine part vibrates as $u(t)=0.050\sin(10\pi t)$ (m, s). What is its maximum acceleration?`,
    [t`$49\ \text{m/s}^2$`, t`$1.6\ \text{m/s}^2$`, t`$5.0\ \text{m/s}^2$`, t`$4.9\ \text{m/s}^2$`], 0,
    t`$a_{\max}=A\omega^2=0.050\cdot(10\pi)^2\approx49\ \text{m/s}^2$, about $5g$. Option B is the maximum speed $A\omega$.`,
    { vals: [49.35, 1.571, 5, 4.935], check: () => 0.05 * (10 * PI) ** 2 });

  q("P4-ii-14", 2, VWO, false,
    t`A mass-spring system with $C=200$ N/m oscillates with amplitude 0.10 m. What is its total vibrational energy?`,
    [t`$1.0$ J`, t`$2.0$ J`, t`$10$ J`, t`$20$ J`], 0,
    t`At maximum displacement all the energy is in the spring: $\tfrac12CA^2=\tfrac12\cdot200\cdot0.01=1.0$ J.`,
    { vals: [1, 2, 10, 20], check: () => 0.5 * 200 * 0.01 });

  q("P4-iii-11", 1, PP, false,
    t`A wave has frequency 2.0 Hz and wavelength 1.5 m. What is its speed?`,
    [t`$3.0$ m/s`, t`$0.75$ m/s`, t`$1.3$ m/s`, t`$3.5$ m/s`], 0,
    t`$v=f\lambda=2.0\cdot1.5=3.0$ m/s.`,
    { vals: [3, 0.75, 1.33, 3.5], check: () => 2 * 1.5 });

  q("P4-iii-12", 1, VWO, false,
    t`Thunder is heard 3.0 s after a lightning flash. The speed of sound is 340 m/s. How far away was the strike?`,
    [t`$1.0$ km`, t`$0.51$ km`, t`$113$ m`, t`$2.0$ km`], 0,
    t`Light arrives almost instantly, so $d=vt=340\cdot3.0\approx1.0$ km. No factor $\tfrac12$ here: the sound travels one way, unlike an echo.`,
    { vals: [1.02, 0.51, 0.113, 2.04], check: () => 340 * 3 / 1000 });

  q("P4-iii-13", 3, EN, false,
    t`A travelling wave is described by $u=0.020\sin\!\left(2\pi\left(\dfrac{t}{0.010}-\dfrac{x}{0.50}\right)\right)$ (SI units). What is the wave speed?`,
    [t`$50$ m/s`, t`$0.020$ m/s`, t`$5.0\times10^{-3}$ m/s`, t`$100$ m/s`], 0,
    t`Reading off $T=0.010$ s and $\lambda=0.50$ m: $v=\dfrac{\lambda}{T}=50$ m/s. Option C multiplies instead of dividing.`,
    { vals: [50, 0.02, 0.005, 100], check: () => 0.5 / 0.01 });

  q("P4-iii-14", 2, VWO, false,
    t`Medical ultrasound of 5.0 MHz travels through tissue at 1540 m/s. What is its wavelength?`,
    [t`$0.31$ mm`, t`$3.1$ mm`, t`$7.7$ km`, t`$31\ \mu\text{m}$`], 0,
    t`$\lambda=\dfrac{v}{f}=\dfrac{1540}{5.0\times10^6}=3.1\times10^{-4}$ m $=0.31$ mm.`,
    { vals: [0.308, 3.08, 7.7e6, 0.0308], check: () => 1540 / 5e6 * 1000 });

  /* ---------- P5 Modelling ---------- */
  q("P5-i-11", 2, VWO, false,
    t`A rocket model contains: <br><code>m := m − r*dt</code><br><code>F := Fthrust − m*g</code><br><code>a := F/m</code><br>with constant <code>Fthrust</code> and burn rate <code>r</code>. How does $a$ change during the burn?`,
    [t`It increases`, t`It decreases`, t`It stays constant`, t`It becomes negative`], 0,
    t`$a=\dfrac{F_{\text{thrust}}}{m}-g$. As $m$ decreases, $\dfrac{F_{\text{thrust}}}{m}$ grows, so the acceleration rises throughout the burn.`);

  q("P5-i-12", 3, KR, false,
    t`A skydiver model uses <code>Fres := m*g − k*v^2</code> with $m=80$ kg. At $t=40$ s the parachute opens and $k$ jumps from 0.20 kg/m to 20 kg/m. What speed does the model settle at after the parachute opens?` + gNote,
    [t`$6.3$ m/s`, t`$63$ m/s`, t`$39$ m/s`, t`$2.0$ m/s`], 0,
    t`The new terminal speed is $v=\sqrt{mg/k}=\sqrt{784.8/20}\approx6.3$ m/s. 63 m/s is the free-fall terminal speed with $k=0.20$.`,
    { vals: [6.26, 62.6, 39.2, 2.0], check: () => sqrt(80 * g / 20) });

  q("P5-i-13", 2, PP, false,
    t`A spring model runs <code>F := −C*u</code>, <code>a := F/m</code>, <code>v := v + a*dt</code>, <code>u := u + v*dt</code> in that order, with $C=10$ N/m, $m=1.0$ kg, $dt=0.10$ s, and starting values $u=0.10$ m, $v=0$. What is $u$ after one step?`,
    [t`$0.090$ m`, t`$0.10$ m`, t`$0.080$ m`, t`$0.099$ m`], 0,
    t`$F=-1.0$ N, $a=-1.0\ \text{m/s}^2$, $v=-0.10$ m/s, and $u=0.10+(-0.10)(0.10)=0.090$ m. Using the old $v=0$ would leave $u=0.10$.`,
    { vals: [0.09, 0.1, 0.08, 0.099], check: () => { const a = -10 * 0.1 / 1, v = a * 0.1; return 0.1 + v * 0.1; } });

  q("P5-ii-11", 1, VWO, false,
    t`A braking model reduces $v$ each step. Which stop condition ends the model when the car has stopped?`,
    [t`<code>if v <= 0 then stop</code>`, t`<code>if v = 0 then stop</code>`, t`<code>if a = 0 then stop</code>`, t`<code>if x <= 0 then stop</code>`], 0,
    t`$v$ decreases in finite steps and will almost never hit exactly 0, so test for $\le0$. $a$ stays constant while braking, and $x$ keeps increasing.`);

  q("P5-ii-12", 3, EN, false,
    t`A 2D orbit model computes <code>ax := −G*M*x/r^3</code> and <code>ay := −G*M*y/r^3</code>. Which line must come before these?`,
    [t`<code>r := sqrt(x^2 + y^2)</code>`, t`<code>r := x + y</code>`, t`<code>r := sqrt(vx^2 + vy^2)</code>`, t`<code>r := G*M/v^2</code>`], 0,
    t`$r$ is the distance from the planet, $\sqrt{x^2+y^2}$. Then $-\dfrac{GM}{r^2}$ times the unit vector $\left(\tfrac xr,\tfrac yr\right)$ gives the $r^3$ in the denominators. Option C is the speed.`);

  q("P5-ii-13", 2, VWO, false,
    t`A car model currently has a constant motor force. Which line models an engine that delivers a constant power $P$ instead?`,
    [t`<code>Fmotor := P/v</code>`, t`<code>Fmotor := P*v</code>`, t`<code>Fmotor := P/t</code>`, t`<code>Fmotor := P*dt</code>`], 0,
    t`$P=Fv$, so $F=P/v$: the force is large at low speed and small at high speed. (In practice a guard against $v=0$ at the start is needed.)`);
})();
