/* FRCS MCQ Prep — single-page app logic. State persisted in localStorage. */
(() => {
  "use strict";

  const LS_PROGRESS = "frcs.progress";   // { questionId: { correct: bool, attempts: n } }
  const LS_BOOKMARKS = "frcs.bookmarks"; // [questionId]
  const LS_BEST = "frcs.best";           // { mock: bestScorePct, practice: bestScorePct }

  // ---------- state ----------
  const store = {
    get(k, fallback) {
      try { return JSON.parse(localStorage.getItem(k)) ?? fallback; }
      catch { return fallback; }
    },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
  };

  let progress = store.get(LS_PROGRESS, {});
  let bookmarks = new Set(store.get(LS_BOOKMARKS, []));
  let best = store.get(LS_BEST, {});

  let quiz = null; // { mode, items:[q], index, answers:{id:idx}, timerId, secondsLeft, totalSeconds }

  const $ = (id) => document.getElementById(id);
  const screens = {
    home: $("screen-home"),
    quiz: $("screen-quiz"),
    results: $("screen-results"),
    bookmarks: $("screen-bookmarks"),
  };

  function show(name) {
    Object.entries(screens).forEach(([k, el]) => el.classList.toggle("hidden", k !== name));
  }

  // ---------- helpers ----------
  const topicCounts = () => {
    const map = {};
    QUESTION_BANK.forEach((q) => { map[q.topic] = (map[q.topic] || 0) + 1; });
    return map;
  };

  function pickQuestions(mode, filter) {
    let pool = QUESTION_BANK;
    if (filter) pool = pool.filter((q) => q.topic === filter);
    if (mode === "bookmarks") pool = pool.filter((q) => bookmarks.has(q.id));
    pool = [...pool].sort(() => Math.random() - 0.5);
    const size = mode === "mock" ? Math.min(20, pool.length)
               : mode === "bookmarks" ? pool.length
               : Math.min(10, pool.length);
    return pool.slice(0, size);
  }

  function recordResult(qId, correct) {
    const p = progress[qId] || { correct: 0, attempts: 0 };
    p.attempts += 1;
    if (correct) p.correct += 1;
    progress[qId] = p;
    store.set(LS_PROGRESS, progress);
  }

  function setBookmark(id, on) {
    if (on) bookmarks.add(id); else bookmarks.delete(id);
    store.set(LS_BOOKMARKS, [...bookmarks]);
    updateBookmarkCount();
    renderFlagButton();
  }
  function updateBookmarkCount() { $("bm-count").textContent = bookmarks.size; }
  function renderFlagButton() {
    if (!quiz) return;
    const q = quiz.items[quiz.index];
    $("btn-flag").classList.toggle("active", bookmarks.has(q.id));
  }

  const fmtTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  // ---------- home ----------
  function renderHome() {
    const ids = Object.keys(progress);
    const attempted = ids.length;
    const total = QUESTION_BANK.length;
    const correctCount = ids.reduce((n, id) => n + (progress[id].correct > 0 ? 1 : 0), 0);
    const avg = attempted ? Math.round((correctCount / attempted) * 100) : 0;

    $("home-summary").textContent = attempted
      ? `You've attempted ${attempted} of ${total} questions. Keep going!`
      : `You haven't attempted any questions yet.`;

    $("home-stats").innerHTML = `
      <div class="stat-pill"><b>${attempted}/${total}</b><small>Attempted</small></div>
      <div class="stat-pill"><b>${avg}%</b><small>First-try accuracy</small></div>
      <div class="stat-pill"><b>${bookmarks.size}</b><small>Bookmarks</small></div>
      <div class="stat-pill"><b>${best.mock ?? "—"}%</b><small>Best mock</small></div>`;

    const counts = topicCounts();
    $("topic-list").innerHTML = Object.entries(counts).map(([topic, n]) => {
      const t = QUESTION_BANK.filter((q) => q.topic === topic);
      const done = t.filter((q) => progress[q.id]).length;
      const pct = Math.round((done / t.length) * 100);
      return `<button class="topic-row" data-topic="${topic}">
        <div class="t-head"><strong>${topic}</strong><span>${done}/${t.length} correct · ${n} questions</span></div>
        <div class="bar"><div style="width:${pct}%"></div></div>
      </button>`;
    }).join("");

    document.querySelectorAll(".topic-row").forEach((b) =>
      b.addEventListener("click", () => startQuiz("practice", b.dataset.topic)));
  }

  // ---------- quiz ----------
  function startQuiz(mode, topic = null) {
    const items = pickQuestions(mode, topic);
    if (!items.length) {
      alert("No questions available for this selection yet.");
      return;
    }
    quiz = {
      mode, topic, items, index: 0,
      answers: {},
      totalSeconds: mode === "mock" ? 25 * 60 : null,
      secondsLeft: mode === "mock" ? 25 * 60 : null,
      timerId: null,
    };
    if (mode === "mock") {
      $("timer-wrap").classList.remove("hidden");
      tickTimer();
      quiz.timerId = setInterval(tickTimer, 1000);
    } else {
      $("timer-wrap").classList.add("hidden");
    }
    $("quiz-mode-label").textContent = mode === "mock" ? "Timed mock" : "Practice";
    $("btn-next").textContent = "Next question →";
    renderQuestion();
    show("quiz");
  }

  function tickTimer() {
    if (!quiz || quiz.secondsLeft == null) return;
    quiz.secondsLeft = Math.max(0, quiz.secondsLeft - 1);
    const pct = (quiz.secondsLeft / quiz.totalSeconds) * 100;
    $("timer-bar").style.width = pct + "%";
    $("timer-bar").classList.toggle("low", quiz.secondsLeft <= 60);
    $("timer-clock").textContent = fmtTime(quiz.secondsLeft);
    if (quiz.secondsLeft <= 0) finishQuiz(true);
  }

  function renderQuestion() {
    const q = quiz.items[quiz.index];
    $("q-difficulty").textContent = `${q.difficulty} · ${q.topic}`;
    $("q-stem").textContent = q.stem;
    $("quiz-progress").textContent = `${quiz.index + 1} / ${quiz.items.length}`;
    $("quiz-topic").textContent = q.topic;
    $("explanation").classList.add("hidden");
    $("btn-next").classList.add("hidden");
    renderFlagButton();

    $("options").innerHTML = q.options.map((opt, i) =>
      `<button class="option" data-i="${i}"><span class="opt-key">${"ABCD"[i]}</span><span>${opt}</span></button>`
    ).join("");

    document.querySelectorAll(".option").forEach((btn) =>
      btn.addEventListener("click", () => answerQuestion(Number(btn.dataset.i))));
  }

  function answerQuestion(i) {
    const q = quiz.items[quiz.index];
    if (quiz.mode === "mock") quiz.answers[q.id] = i; // no immediate feedback in mock
    else {
      const correct = i === q.answer;
      quiz.answers[q.id] = i;
      recordResult(q.id, correct);
      revealAnswer(i, correct);
      if (quiz.index === quiz.items.length - 1) $("btn-next").textContent = "Finish quiz ✓";
      $("btn-next").classList.remove("hidden");
    }
    if (quiz.mode === "mock" && quiz.index === quiz.items.length - 1) {
      $("btn-next").textContent = "Finish exam ✓";
    }
    if (quiz.mode === "mock") $("btn-next").classList.remove("hidden");
    document.querySelectorAll(".option").forEach((b) => { b.disabled = true; });
  }

  function revealAnswer(chosen, correct) {
    const q = quiz.items[quiz.index];
    document.querySelectorAll(".option").forEach((btn, idx) => {
      if (idx === q.answer) btn.classList.add("correct");
      if (idx === chosen && !correct) btn.classList.add("wrong");
    });
    $("explanation-text").textContent = q.explanation;
    $("explanation").classList.remove("hidden");
  }

  function nextQuestion() {
    if (quiz.index < quiz.items.length - 1) {
      quiz.index += 1;
      renderQuestion();
    } else {
      finishQuiz(false);
    }
  }

  function finishQuiz(timedOut) {
    if (!quiz) return;
    clearInterval(quiz.timerId);
    captureResults();
    const mode = quiz.mode;

    // In mock mode, grade everything at the end.
    if (mode === "mock") {
      quiz.items.forEach((q) => {
        const chosen = quiz.answers[q.id];
        if (chosen === undefined) return; // unanswered counts as wrong
        recordResult(q.id, chosen === q.answer);
      });
    }

    const answered = quiz.items.filter((q) => quiz.answers[q.id] !== undefined);
    const correct = answered.filter((q) => quiz.answers[q.id] === q.answer).length;
    const pct = quiz.items.length ? Math.round((correct / quiz.items.length) * 100) : 0;

    if (mode === "mock" && !best.mock) best.mock = 0;
    if (mode === "mock") {
      best.mock = Math.max(best.mock || 0, pct);
      store.set(LS_BEST, best);
    }
    renderResults(mode, correct, pct, timedOut);
    quiz = null;
    show("results");
  }

  // ---------- results ----------
  function renderResults(mode, correct, pct, timedOut) {
    const resultsTotal = lastQuizItems.length;
    const ring = $("score-ring");
    ring.style.setProperty("--pct", pct);
    ring.style.setProperty("--ring", pct >= 70 ? "var(--correct)" : pct >= 40 ? "var(--warn)" : "var(--wrong)");
    ring.innerHTML = `<div>${pct}%</div>`;
    $("result-title").textContent = timedOut ? "Time's up!" : (pct >= 70 ? "Great work 🎉" : pct >= 40 ? "Quiz complete" : "Keep practising 💪");
    $("result-detail").textContent =
      `${correct} / ${resultsTotal} correct` +
      (mode === "mock" ? ` · Best mock score: ${best.mock ?? pct}%` : "") +
      (timedOut ? " (time expired)" : "");

    // Per-topic breakdown from just-completed answers is unavailable once quiz=null,
    // so we keep the review list from the last graded items captured before nulling.
    $("result-stats").innerHTML = lastQuizTopics
      .map(([t, c, n]) => `<div class="stat-pill"><b>${c}/${n}</b><small>${t}</small></div>`)
      .join("");

    $("review-list").innerHTML = lastQuizItems.map((q) => {
      const chosen = lastQuizAnswers[q.id];
      const ok = chosen === q.answer;
      const verdictText = chosen === undefined ? "Unanswered" : ok ? "✓ Correct" : "✗ Incorrect";
      return `<div class="review-row">
        <div class="r-head">
          <span class="verdict ${ok ? "ok" : "bad"}">${verdictText}</span>
          <span>${q.stem}</span>
          <span class="r-topic">${q.topic}</span>
        </div>
        <div class="r-why">${q.explanation}</div>
      </div>`;
    }).join("");
    lastQuizItems = null;
  }

  let lastQuizItems = [];
  let lastQuizAnswers = {};
  let lastQuizTopics = [];

  // Capture state at finish time (called from finishQuiz before quiz=null).
  function captureResults() {
    lastQuizItems = quiz.items;
    lastQuizAnswers = quiz.answers;
    const tmap = {};
    quiz.items.forEach((q) => {
      const t = tmap[q.topic] || { c: 0, n: 0 };
      t.n += 1;
      if (quiz.answers[q.id] === q.answer) t.c += 1;
      tmap[q.topic] = t;
    });
    lastQuizTopics = Object.entries(tmap);
  }

  // ---------- bookmarks ----------
  function renderBookmarks() {
    const list = [...bookmarks]
      .map((id) => QUESTION_BANK.find((q) => q.id === id))
      .filter(Boolean);
    $("bookmark-list").innerHTML = list.length
      ? list.map((q) => `<button class="topic-row" data-id="${q.id}">
          <div class="t-head"><strong>${q.topic}</strong><span>${q.difficulty}</span></div>
          <div class="r-why" style="margin-top:6px">${q.stem}</div>
        </button>`).join("")
      : `<p class="muted">No bookmarks yet. Flag questions during a quiz to review them later.</p>`;
    document.querySelectorAll("#bookmark-list .topic-row").forEach((b) =>
      b.addEventListener("click", () => {
        const q = QUESTION_BANK.find((x) => x.id === b.dataset.id);
        showQuestionOnly(q);
      }));
  }

  function showQuestionOnly(q) {
    // Lightweight single-question review with answer + explanation revealed.
    quiz = { mode: "review", items: [q], index: 0, answers: { [q.id]: q.answer }, timerId: null, secondsLeft: null };
    $("quiz-mode-label").textContent = "Review";
    renderQuestion();
    const chosen = q.answer;
    revealAnswer(chosen, true);
    document.querySelectorAll(".option").forEach((b) => { b.disabled = true; });
    $("btn-next").textContent = "Back to bookmarks";
    $("btn-next").classList.remove("hidden");
    show("quiz");
  }

  // ---------- wiring ----------
  $("btn-practice").addEventListener("click", () => startQuiz("practice"));
  $("btn-mock").addEventListener("click", () => startQuiz("mock"));
  $("btn-revision").addEventListener("click", () => { renderBookmarks(); show("bookmarks"); });
  $("btn-bookmarks").addEventListener("click", () => { renderBookmarks(); show("bookmarks"); });
  $("btn-bm-home").addEventListener("click", () => { renderHome(); show("home"); });
  $("btn-home").addEventListener("click", () => { renderHome(); show("home"); });
  $("btn-retake").addEventListener("click", () => startQuiz("practice"));

  $("btn-next").addEventListener("click", () => {
    if (quiz && quiz.mode === "review") { renderBookmarks(); show("bookmarks"); quiz = null; return; }
    nextQuestion();
  });

  $("btn-flag").addEventListener("click", () => {
    if (!quiz) return;
    const id = quiz.items[quiz.index].id;
    setBookmark(id, !bookmarks.has(id));
  });

  $("btn-quit").addEventListener("click", () => {
    if (quiz && confirm("End this quiz? Your answers so far will be graded.")) finishQuiz(false);
    else if (quiz) { /* keep going */ }
  });

  // ---------- boot ----------
  updateBookmarkCount();
  renderHome();
  show("home");
})();
