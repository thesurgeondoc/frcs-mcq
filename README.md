# FRCS MCQ Prep

A self-contained single-page web app for FRCS-style surgical MCQ revision, inspired by exam-prep mobile apps (timed mocks, instant feedback, explanations, bookmarks, progress tracking). No build step, no dependencies.

## Run

```bash
cd frcs-mcq
python3 -m http.server 8000
# open http://localhost:8000
```

(Any static server works; opening `index.html` directly also works in most browsers since no modules/fetch are used.)

## Features

- **Practice set** — 10 questions with instant feedback + explanation after each answer.
- **Timed mock** — 20 questions, 25-minute countdown, graded at the end.
- **Bookmarks** — flag questions mid-quiz (🔖) and review them later with full explanations.
- **Topics** — per-topic progress bars on the home screen.
- **Persistence** — attempts/accuracy, bookmarks and best mock score stored in `localStorage`.

## Question bank schema

Edit `questions.js` (or replace with a fetch of your own JSON) using:

```js
{
  id: "gs-1",            // unique
  topic: "General Surgery",
  difficulty: "Core",    // shown in the card header
  stem: "Question text…",
  options: ["A", "B", "C", "D"],   // exactly 4
  answer: 0,             // index of the correct option
  explanation: "Why the answer is correct…"
}
```

## License

MIT — the question bank contains original questions written for this project; verify any clinical content before teaching use.
