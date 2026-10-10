# prepforuni

**Delft AE Drill** is an Anki-style trainer for the maths and physics sections of the TU Delft BSc Aerospace Engineering selection exam (next sitting: 11 March 2027). Each section is 30 minutes for about 20 multiple-choice questions, and only the computer calculator is allowed.

## What it does

- **Problem bank:** 169 original multiple-choice problems (98 maths, 71 physics) covering every item of the official *Syllabus Selection Exam – Mathematics & Physics* (v2024).
- **Calibration:** problems are pitched at the level of TU Delft's Pre-University Calculus and Pre-University Physics MOOCs, Dutch VWO central exams (Wiskunde B, Natuurkunde) and Cambridge ENGAA/ESAT. Each card names the source it is modelled on. No real exam questions are included.
- **Study:** answer, then read a worked solution, then rate Again / Hard / Good / Easy. Scheduling is SM-2 with learning steps, and a timer shows the 90-second exam pace.
- **Exam simulation:** 20 questions in 30 minutes, with a full review at the end. Missed cards go back into the review queue.
- **Stats:** accuracy and average time per topic, a 14-day review forecast, and your weakest syllabus items.
- **Storage:** progress is saved in your browser (`localStorage`). Use Settings → Export/Import to back it up or move it to another device.

It is a static site with no build step and no dependencies to install. MathJax and Google Fonts load from CDNs.

## Files

| File | Purpose |
|---|---|
| `index.html` | The app (UI, scheduler, storage) |
| `problems-math.js` | Maths problem bank (topics M1–M7) |
| `problems-physics.js` | Physics problem bank (topics P1–P5) |
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

Not affiliated with TU Delft.
