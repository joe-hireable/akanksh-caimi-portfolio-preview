const MEASUREMENTS = {
  "title": "Measured accuracy–coverage trade-off",
  "source": {
    "url": "https://drive.google.com/file/d/1xgzpWqgXYkl8LL7R4cABLccvLZbabgPa/view?usp=share_link",
    "document": "Hallucination Mitigation in LLMs Through Threshold-Conditioned Abstention Tuning",
    "author": "Akanksh Caimi",
    "pdfPage": 38,
    "printedPage": 27,
    "table": "4.4",
    "evidenceLevel": "Values reported in submitted MSc dissertation; not independently rerun"
  },
  "conditions": {
    "benchmark": "TriviaQA",
    "questions": 500,
    "partition": "Held out by question text; shuffle seed 17",
    "system": "Tuned model at each threshold, not before/after tuning",
    "decoding": "Greedy",
    "grader": "Qwen-2.5-32B",
    "training": "2,000 unique training questions; 8 samples/question; one rank-16 LoRA adapter per model; 2 epochs; seed 0",
    "thresholdsShown": [
      0,
      0.25,
      0.5,
      0.9
    ],
    "thresholdWarning": "These are four reported operating points. Do not interpolate unmeasured numerical values. Thresholds are prompt inputs, not measured probabilities or safety guarantees.",
    "limitations": [
      "Single held-out split and training seed; no multi-seed replication reported for this thesis.",
      "Conditional accuracy excludes abstentions; error rate includes all 500 questions.",
      "Llama and Gemma tested on TriviaQA only; Mistral also tested on SimpleQA, where behaviour largely collapsed into abstention.",
      "Model-graded results; grader agreement was checked against another model rather than human ground truth."
    ]
  },
  "definitions": {
    "abstentionPct": "100 × unanswered / all questions",
    "coveragePct": "100 − abstentionPct",
    "answeredAccuracyPct": "100 × correct / answered questions",
    "errorPct": "100 × incorrect / all questions",
    "counts": "Derived exactly from reported one-decimal rates and n=500, not extracted raw response records"
  },
  "points": [
    {
      "model": "Mistral-7B-Instruct-v0.3",
      "threshold": 0,
      "abstentionPct": 2.2,
      "coveragePct": 97.8,
      "answeredAccuracyPct": 70.1,
      "errorPct": 29.2,
      "derivedCounts": {
        "total": 500,
        "abstained": 11,
        "incorrect": 146,
        "correct": 343
      }
    },
    {
      "model": "Mistral-7B-Instruct-v0.3",
      "threshold": 0.25,
      "abstentionPct": 23.8,
      "coveragePct": 76.2,
      "answeredAccuracyPct": 82.9,
      "errorPct": 13,
      "derivedCounts": {
        "total": 500,
        "abstained": 119,
        "incorrect": 65,
        "correct": 316
      }
    },
    {
      "model": "Mistral-7B-Instruct-v0.3",
      "threshold": 0.5,
      "abstentionPct": 30.8,
      "coveragePct": 69.2,
      "answeredAccuracyPct": 85,
      "errorPct": 10.4,
      "derivedCounts": {
        "total": 500,
        "abstained": 154,
        "incorrect": 52,
        "correct": 294
      }
    },
    {
      "model": "Mistral-7B-Instruct-v0.3",
      "threshold": 0.9,
      "abstentionPct": 57.4,
      "coveragePct": 42.6,
      "answeredAccuracyPct": 93,
      "errorPct": 3,
      "derivedCounts": {
        "total": 500,
        "abstained": 287,
        "incorrect": 15,
        "correct": 198
      }
    },
    {
      "model": "Llama-3.1-8B-Instruct",
      "threshold": 0,
      "abstentionPct": 3,
      "coveragePct": 97,
      "answeredAccuracyPct": 75.7,
      "errorPct": 23.6,
      "derivedCounts": {
        "total": 500,
        "abstained": 15,
        "incorrect": 118,
        "correct": 367
      }
    },
    {
      "model": "Llama-3.1-8B-Instruct",
      "threshold": 0.25,
      "abstentionPct": 20.8,
      "coveragePct": 79.2,
      "answeredAccuracyPct": 85.6,
      "errorPct": 11.4,
      "derivedCounts": {
        "total": 500,
        "abstained": 104,
        "incorrect": 57,
        "correct": 339
      }
    },
    {
      "model": "Llama-3.1-8B-Instruct",
      "threshold": 0.5,
      "abstentionPct": 32.2,
      "coveragePct": 67.8,
      "answeredAccuracyPct": 91.2,
      "errorPct": 6,
      "derivedCounts": {
        "total": 500,
        "abstained": 161,
        "incorrect": 30,
        "correct": 309
      }
    },
    {
      "model": "Llama-3.1-8B-Instruct",
      "threshold": 0.9,
      "abstentionPct": 62.4,
      "coveragePct": 37.6,
      "answeredAccuracyPct": 95.7,
      "errorPct": 1.6,
      "derivedCounts": {
        "total": 500,
        "abstained": 312,
        "incorrect": 8,
        "correct": 180
      }
    },
    {
      "model": "Gemma-2-9B-it",
      "threshold": 0,
      "abstentionPct": 1.8,
      "coveragePct": 98.2,
      "answeredAccuracyPct": 72.1,
      "errorPct": 27.4,
      "derivedCounts": {
        "total": 500,
        "abstained": 9,
        "incorrect": 137,
        "correct": 354
      }
    },
    {
      "model": "Gemma-2-9B-it",
      "threshold": 0.25,
      "abstentionPct": 19.6,
      "coveragePct": 80.4,
      "answeredAccuracyPct": 81.3,
      "errorPct": 15,
      "derivedCounts": {
        "total": 500,
        "abstained": 98,
        "incorrect": 75,
        "correct": 327
      }
    },
    {
      "model": "Gemma-2-9B-it",
      "threshold": 0.5,
      "abstentionPct": 23.8,
      "coveragePct": 76.2,
      "answeredAccuracyPct": 83.7,
      "errorPct": 12.4,
      "derivedCounts": {
        "total": 500,
        "abstained": 119,
        "incorrect": 62,
        "correct": 319
      }
    },
    {
      "model": "Gemma-2-9B-it",
      "threshold": 0.9,
      "abstentionPct": 46.2,
      "coveragePct": 53.8,
      "answeredAccuracyPct": 91.4,
      "errorPct": 4.6,
      "derivedCounts": {
        "total": 500,
        "abstained": 231,
        "incorrect": 23,
        "correct": 246
      }
    }
  ],
  "boundaryCase": {
    "title": "When abstention becomes a switch",
    "benchmark": "SimpleQA",
    "model": "Mistral-7B-Instruct-v0.3",
    "questions": 500,
    "source": {
      "pdfPage": 43,
      "printedPage": 32,
      "table": "4.8"
    },
    "note": "Reported boundary test, not a second success story. At higher thresholds the tuned model answers almost nothing. Source prints0.0% answered accuracy when there are no answers; display not applicable rather than0% or100%.",
    "points": [
      {
        "arm": "Tuned",
        "threshold": 0,
        "errorPct": 81,
        "abstentionPct": 14,
        "coveragePct": 86,
        "answeredAccuracyPct": 5.8
      },
      {
        "arm": "Tuned",
        "threshold": 0.5,
        "errorPct": 0.4,
        "abstentionPct": 99.6,
        "coveragePct": 0.4,
        "answeredAccuracyPct": 0
      },
      {
        "arm": "Tuned",
        "threshold": 0.75,
        "errorPct": 0,
        "abstentionPct": 100,
        "coveragePct": 0,
        "answeredAccuracyPct": null
      },
      {
        "arm": "Tuned",
        "threshold": 0.9,
        "errorPct": 0,
        "abstentionPct": 100,
        "coveragePct": 0,
        "answeredAccuracyPct": null
      },
      {
        "arm": "Baseline",
        "threshold": 0,
        "errorPct": 78.4,
        "abstentionPct": 16.2,
        "coveragePct": 83.8,
        "answeredAccuracyPct": 6.4
      },
      {
        "arm": "Baseline",
        "threshold": 0.5,
        "errorPct": 50.2,
        "abstentionPct": 45.8,
        "coveragePct": 54.2,
        "answeredAccuracyPct": 7.4
      },
      {
        "arm": "Baseline",
        "threshold": 0.75,
        "errorPct": 46.2,
        "abstentionPct": 50.2,
        "coveragePct": 49.8,
        "answeredAccuracyPct": 7.2
      },
      {
        "arm": "Baseline",
        "threshold": 0.9,
        "errorPct": 43.2,
        "abstentionPct": 53,
        "coveragePct": 47,
        "answeredAccuracyPct": 8.1
      }
    ]
  }
};

// The introduction is independent of the explorer and cannot keep the page blocked.
(() => {
  const intro = document.getElementById('intro');
  const skip = document.getElementById('skip-intro');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const key = 'akanksh-threshold-intro-v1';
  let seen = false;
  try { seen = sessionStorage.getItem(key) === 'seen'; } catch {}
  if (!intro || seen || reducedMotion.matches) return;
  let done = false;
  const dismiss = () => {
    if (done) return;
    done = true;
    const skipFocused = document.activeElement === skip;
    intro.hidden = true;
    if (skipFocused) document.getElementById('hero-title').focus({ preventScroll: true });
    document.removeEventListener('focusin', focusOutside);
    document.removeEventListener('keydown', escapeIntro);
  };
  const focusOutside = event => { if (!intro.contains(event.target)) dismiss(); };
  const escapeIntro = event => { if (event.key === 'Escape') dismiss(); };
  // Set the independent hard stop before making the overlay visible.
  setTimeout(dismiss, 1000);
  skip.addEventListener('click', dismiss, { once: true });
  intro.addEventListener('animationend', event => {
    if (event.target === intro && event.animationName === 'intro-exit') dismiss();
  });
  reducedMotion.addEventListener('change', event => { if (event.matches) dismiss(); }, { once: true });
  document.addEventListener('focusin', focusOutside);
  document.addEventListener('keydown', escapeIntro);
  try { sessionStorage.setItem(key, 'seen'); } catch {}
  intro.hidden = false;
})();

(() => {
  const models = [...new Set(MEASUREMENTS.points.map(point => point.model))];
  const shortModels = ['Mistral 7B', 'Llama 8B', 'Gemma 9B'];
  const tabs = [...document.querySelectorAll('[data-model-index]')];
  const thresholdInputs = [...document.querySelectorAll('input[name="threshold"]')];
  let modelIndex = 0;
  let threshold = 0.5;

  function marks(counts) {
    return Array.from({ length: 500 }, (_, index) => {
      const x = 5 + (index % 50) * 10;
      const y = 8 + Math.floor(index / 50) * 15;
      const outcome = index < counts.correct ? 'correct' : index < counts.correct + counts.incorrect ? 'incorrect' : 'abstained';
      const shape = outcome === 'incorrect'
        ? `<path d="M${x - 2.2} ${y - 2.2}l4.4 4.4m0-4.4l-4.4 4.4" class="point-incorrect"/>`
        : `<circle cx="${x}" cy="${y}" r="2.5" class="point-${outcome}"/>`;
      return `<g class="point" data-outcome="${outcome}">${shape}</g>`;
    }).join('');
  }

  function render() {
    const selected = MEASUREMENTS.points.find(point => point.model === models[modelIndex] && point.threshold === threshold);
    const counts = selected.derivedCounts;
    const answerCount = counts.correct + counts.incorrect;
    tabs.forEach((tab, index) => {
      tab.setAttribute('aria-selected', String(index === modelIndex));
      tab.tabIndex = index === modelIndex ? 0 : -1;
    });
    document.getElementById('outcomes-panel').setAttribute('aria-labelledby', tabs[modelIndex].id);
    document.getElementById('point-marks').innerHTML = marks(counts);
    document.getElementById('correct-count').textContent = counts.correct;
    document.getElementById('incorrect-count').textContent = counts.incorrect;
    document.getElementById('abstained-count').textContent = counts.abstained;
    document.getElementById('coverage').textContent = selected.coveragePct.toFixed(1);
    document.getElementById('accuracy').textContent = selected.answeredAccuracyPct.toFixed(1);
    document.getElementById('error').textContent = selected.errorPct.toFixed(1);
    document.getElementById('threshold-output').textContent = threshold.toFixed(2);
    const summary = `${shortModels[modelIndex]}, threshold ${threshold.toFixed(2)}. ${answerCount} of 500 questions answered: ${counts.correct} correct, ${counts.incorrect} incorrect; ${counts.abstained} abstained. Coverage ${selected.coveragePct.toFixed(1)} percent. Accuracy among answered ${selected.answeredAccuracyPct.toFixed(1)} percent. Error across all 500 ${selected.errorPct.toFixed(1)} percent.`;
    document.getElementById('field-description').textContent = `${summary} Marks are aggregate counts, not individual response records.`;
    document.getElementById('result-announcement').textContent = summary;
    document.querySelectorAll('tbody tr').forEach(row => {
      row.dataset.current = String(row.dataset.model === selected.model && Number(row.dataset.threshold) === threshold);
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => { modelIndex = index; render(); });
    tab.addEventListener('keydown', event => {
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      modelIndex = next;
      render();
      tabs[next].focus();
    });
  });
  thresholdInputs.forEach(input => input.addEventListener('change', () => {
    threshold = Number(input.value);
    render();
  }));

  document.querySelector('a[href="#measurement-notes"]').addEventListener('click', () => {
    document.getElementById('measurement-notes').open = true;
  });

  const projects = Object.fromEntries(window.PORTFOLIO_DATA.projects.map(p => [p.id, {
    category: p.category + ' / ' + p.status, title: p.title, lead: p.question,
    stack: p.subtitle + ' · ' + p.stack.join(' · '),
    sections: [['Contribution',p.contribution],['Implementation',p.implementation],['Evidence',p.evidence],['Limits',p.limits]],
    links: p.links.map(l => [l.label,l.url])
  }]));

  const dialog = document.getElementById('case-dialog');
  const dialogContent = document.getElementById('case-content');
  let returnFocus = null;
  const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  document.querySelectorAll('[data-case]').forEach(button => {
    button.addEventListener('click', () => {
      const project = projects[button.dataset.case];
      returnFocus = button;
      document.getElementById('case-category').textContent = project.category;
      dialogContent.innerHTML = `<h2 id="case-title">${escapeHTML(project.title)}</h2><p class="dialog-lead">${escapeHTML(project.lead)}</p><p class="dialog-meta">${escapeHTML(project.stack)}</p>${project.sections.map(([title, body]) => `<section class="case-section"><h3>${escapeHTML(title)}</h3><div>${Array.isArray(body) ? `<ul>${body.map(line => `<li>${escapeHTML(line)}</li>`).join('')}</ul>` : `<p>${escapeHTML(body)}</p>`}</div></section>`).join('')}<div class="dialog-links">${project.links.map(([label, url]) => `<a class="text-link" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(label)} <span aria-hidden="true">↗</span></a>`).join('')}</div>`;
      dialog.showModal();
      dialog.scrollTop = 0;
      dialog.querySelector('.close-dialog').focus();
    });
  });
  dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => { if (returnFocus) returnFocus.focus({ preventScroll: true }); });
})();
