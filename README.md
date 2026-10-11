# prepforuni

**Delft AE Drill** is an Anki-style trainer for the maths and physics sections of the TU Delft BSc Aerospace Engineering selection exam (next sitting: 11 March 2027). Each section is 30 minutes for about 20 multiple-choice questions, and only the computer calculator is allowed.

## What it does

- **Problem bank:** 323 original multiple-choice problems (177 maths, 146 physics) covering every item of the official *Syllabus Selection Exam – Mathematics & Physics* (v2024).
- **Calibration:** problems are pitched at the level of TU Delft's Pre-University Calculus and Pre-University Physics MOOCs, Dutch VWO central exams (Wiskunde B, Natuurkunde), Cambridge ENGAA/ESAT, and (for the hardest mechanics items) the style of Krotov's *Aptitude Test Problems in Physics*. Each card names the source it is modelled on. No real exam questions are included.
- **Study:** answer, then read a worked solution, then rate Again / Hard / Good / Easy. Scheduling is SM-2 with learning steps, and a timer shows the 90-second exam pace.
- **Exam simulation:** 20 questions in 30 minutes, with a full review at the end. Missed cards go back into the review queue.
- **Stats:** accuracy and average time per topic, a 14-day review forecast, and your weakest syllabus items.
- **Storage:** progress is saved in your browser (`localStorage`). Use Settings → Export/Import to back it up or move it to another device.

### 3D dorm (`room.html`, beta)

A low-poly dorm room in the style of late-90s shooters: chunky geometry, crunchy 64-pixel textures drawn in code, hard-edged lighting and an amber HUD. The whiteboard runs the same study session as the 2D app. Walk around in first person:
- **Desktop:** WASD or the arrow keys to move, Shift to walk slowly, Space to jump. Click to capture the mouse for mouse-look (or drag to look), and E to use whatever the crosshair points at. You can also click objects directly.
- **Phones:** drag to look, use the on-screen pad to walk, and tap objects.

At the whiteboard, answer with A–D, rate with 1–4, and press Esc to step back. The calendar shows the days left until the exam.

- **Bed: breaks.** Choose 5–30 minutes or a custom length. You lie down, a countdown runs, and an alarm wakes you. **Summon nightmares** ends the break early. A break that is running survives a page reload.
- **Clock: Pomodoro.** Set the focus minutes and the break minutes (press P as a shortcut). Focus time only counts while you're working a card at the whiteboard, and it shows at the top of the HUD. When it runs out, the character rage-quits: the board gets scribbled on, the chair gets knocked over, and you go to bed for the break. An answered card is never lost; it gets your suggested rating first.
- **Rage-quit:** when the Pomodoro runs out, the whiteboard boils red, your head shakes while you shout, you dive across the room onto the bed, and you're knocked out cold (stars, ringing ears, eyelids closing) into the break.
- **The poster:** use it and the plane on it folds into a 3D paper dart, peels off the poster, loops around the room twice (banking into turns, casting a shadow), then glides back and settles onto the poster again.
- **The window:** it looks down from the second floor onto a sandy desert courtyard with bomb site A: sandstone walls with arched windows, a raised paved site with olive crates, a cobbled ramp, and mountains behind. Every second there's a 1-in-10,000 chance that two T's run out, plant a bomb on the site, and leave. 40 seconds of faster and faster beeping later, it explodes. Add `#bomb` to the URL (`room.html#bomb`) to trigger it straight away.
- **The door: defend site A.** Once today's due reviews and new cards are finished, the door unlocks for one round a day. You step out into the courtyard as a lone CT with a USP and a knife, and buy the rest.
  - **Buy menu (B):** open for the first 28 s near your spawn. You start with $800 plus $150 for every card you answered correctly today (up to $16,000). It sells a Desert Eagle, MP5, M4 and AWP (right click zooms the scope), kevlar and helmet, a defuse kit, and HE, flash and smoke grenades.
  - **Grenades:** HE grenades do damage with falloff and are blocked by walls. Flashbangs white out your screen (less if you look away) and blind bots for a few seconds. Smoke blocks line of sight for 15 s. Grenades bounce off walls and the ground; left click throws, right click lobs.
  - **Bots throw grenades too:** a flash as they come into the yard, an HE where they last saw you once you break line of sight, and a smoke to cover the planter.
  - **A different round each day,** picked from the date:
    - Scenarios: *Defend A* (four T's, one with the bomb), *Retake A* (the bomb is already planted, three guards, and you get a kit and $1000 extra), or *Eco rush* (five pistol T's rushing from both doors).
    - Cover layouts: classic crates, a crate yard, or a sandbag line with a pillar.
    - Weather: midday, dusk (orange sky and light), or a sandstorm that cuts visibility for you and the bots.
  - **Win:** kill them all before they plant, let the 1:45 timer run out, or hold E on a planted bomb to defuse it (5 s with a kit, 10 s without).
  - **Lose:** you die, or the bomb goes off.
  - **Controls:** WASD to move, mouse to aim, left click (or hold F) to fire, slash or throw, right click to stab, lob or scope. Use 1 for primary, 2 for pistol, 3 for knife and 4 for grenades; Q or the mouse wheel also switches. R reloads, Space jumps, Ctrl or C crouches, B buys.
  - **Movement:** a jump clears the 1 m site platform. Crouching mid-jump (crouch-jump) gets you onto the crates. Crouching slows you to a third of normal speed but halves your spread, cuts recoil, and makes you harder to hit. From the courtyard you can see into your dorm room through its window.
  - **Knife:** a slash does 40 (25 for quick follow-ups), a stab does 65, and from behind a slash does 90 and a stab 180.
  - **HUD:** health, armor, ammo, money, a radar, and a kill feed with headshots. A summary of kills, headshots and accuracy follows the round.
  - **Testing:** `room.html#round` unlocks the door straight away, with $16,000 and a random layout and weather. `#round=defend`, `#round=retake` or `#round=eco` forces a scenario.
- **Sound:** short synth sounds for the alarm, the rage-quit and nightmares. Toggle them with **Sound** in the top bar. The laptop opens the 2D app. Progress is shared with the 2D app, because both use `core.js` and the same browser storage. **Retro pixels** switches between the low-resolution look and full resolution.

It is a static site with no build step and no dependencies to install. MathJax, Three.js and Google Fonts load from CDNs.

## Files

| File | Purpose |
|---|---|
| `index.html` | The 2D app (decks, study, exam simulation, stats, settings) |
| `room.html` | The 3D dorm room (Three.js r128 from a CDN) |
| `core.js` | Shared logic: progress storage, scheduler, study queues |
| `problems-math.js`, `problems-math-2.js` | Maths problem banks (topics M1–M7) |
| `problems-physics.js`, `problems-physics-2.js` | Physics problem banks (topics P1–P5) |
| `tools/validate.mjs` | Checks the bank: schema, syllabus coverage, and recomputes numeric answers |

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Add or edit problems

Each problem is one `q(...)` call: id (`<topic>-<syllabus item>-<nn>`), difficulty (1–3), source model, calculator flag, stem, choices, index of the correct choice, and worked solution. TeX goes between `$…$`. For numeric answers, add `vals` (the numeric value of each choice) and a `check()` function that recomputes the answer, so the validator can catch mistakes:

```bash
node tools/validate.mjs .
```

The validator checks every `problems-*.js` file in the folder. The app only loads the bank files that have a `<script>` tag in `index.html`, so add a tag for any new bank file.

Not affiliated with TU Delft.
