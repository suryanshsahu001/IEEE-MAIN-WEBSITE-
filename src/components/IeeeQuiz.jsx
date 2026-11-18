import { useState, useEffect, useRef } from "react";
import "./IeeeQuiz.css";

// Change this to your own "join" page
const JOIN_URL = "https://www.ieee.org/membership/students.html";

const QUESTIONS = [
  {
    q: "What do you become when you join IEEE as a university student?",
    o: ["Associate Engineer", "Student Member", "Junior Fellow", "Guest Reader"],
    a: 1,
    e: "Students join as IEEE Student Members and can then be part of a Student Branch like ours.",
  },
  {
    q: "What does an IEEE Student Branch mainly do?",
    o: [
      "Only sells textbooks",
      "Runs workshops, talks, hackathons and projects",
      "Only handles exam results",
      "Manages campus hostels",
    ],
    a: 1,
    e: "Student Branches are run by students and host hands-on events, talks and projects across technology topics.",
  },
  {
    q: "Which IEEE region does India belong to?",
    o: ["Region 1", "Region 8", "Region 10 (Asia-Pacific)", "Region 5"],
    a: 2,
    e: "India is part of IEEE Region 10, which covers Asia and the Pacific.",
  },
  {
    q: "Which of these is a real way IEEE helps students grow?",
    o: [
      "Networking with professionals and peers",
      "Guaranteed exam marks",
      "Free laptops for everyone",
      "Skipping lectures",
    ],
    a: 0,
    e: "IEEE connects students with peers and professionals, and offers conferences, competitions and learning resources.",
  },
  {
    q: "What is the best first step to connect with IEEE at ADYPU?",
    o: [
      "Wait until graduation",
      "Join the Student Branch and attend an event",
      "Only read papers alone",
      "Ignore all notices",
    ],
    a: 1,
    e: "Start by joining the Student Branch and showing up to an event. That is where the connections begin.",
  },
];

export default function IeeeQuiz() {
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(false);
  const [result, setResult] = useState(null);
  const [done, setDone] = useState(false);

  const fabRef = useRef(null);
  const closeRef = useRef(null);
  const actionRef = useRef(null);

  const flipped = picked || done;
  const q = QUESTIONS[i];

  const reset = () => {
    setI(0);
    setScore(0);
    setPicked(false);
    setDone(false);
  };

  const openQuiz = () => {
    reset();
    setOpen(true);
  };

  const closeQuiz = () => {
    setOpen(false);
    fabRef.current?.focus();
  };

  const pick = (k) => {
    const ok = k === q.a;
    if (ok) setScore((s) => s + 1);
    setResult({ ok, answer: q.o[q.a], why: q.e });
    setPicked(true);
  };

  const next = () => {
    if (i < QUESTIONS.length - 1) {
      setI(i + 1);
      setPicked(false);
    } else {
      setDone(true);
    }
  };

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && closeQuiz();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Focus management
  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);
  useEffect(() => {
    if (flipped) actionRef.current?.focus({ preventScroll: true });
  }, [flipped]);

  const msg =
    score >= 4
      ? "You are ready to connect with IEEE!"
      : score >= 2
      ? "Nice start. Come to an event and learn more."
      : "No worries. Join us and learn together.";

  return (
    <div className="ieeq-root">
      <button
        ref={fabRef}
        className="ieeq-fab"
        onClick={openQuiz}
        aria-haspopup="dialog"
      >
        &#9889; Quick quiz
      </button>

      {open && (
        <div
          className="ieeq-ov"
          role="dialog"
          aria-modal="true"
          aria-label="IEEE quick quiz"
          onClick={(e) => e.target === e.currentTarget && closeQuiz()}
        >
          <div className="ieeq-wrap">
            <button
              ref={closeRef}
              className="ieeq-x"
              onClick={closeQuiz}
              aria-label="Close quiz"
            >
              &times;
            </button>

            <div className="ieeq-bar">
              <i
                style={{
                  width: `${((done ? QUESTIONS.length : i) / QUESTIONS.length) * 100}%`,
                }}
              />
            </div>

            <div className="ieeq-scene">
              <div className={`ieeq-card ${flipped ? "flip" : ""}`}>
                {/* FRONT: question */}
                <div className="ieeq-face ieeq-front">
                  <div className="ieeq-count">
                    Question {i + 1} of {QUESTIONS.length}
                  </div>
                  <p className="ieeq-q">{q.q}</p>
                  <div className="ieeq-opts">
                    {q.o.map((t, k) => (
                      <button
                        key={k}
                        className="ieeq-opt"
                        onClick={() => pick(k)}
                        disabled={flipped}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* BACK: result or final score */}
                <div
                  className={`ieeq-face ieeq-back ${
                    done || result?.ok ? "good" : "bad"
                  }`}
                  aria-hidden={!flipped}
                >
                  {done ? (
                    <>
                      <div className="ieeq-badge">&#127942;</div>
                      <div className="ieeq-score">
                        {score} / {QUESTIONS.length}
                      </div>
                      <p className="ieeq-why">{msg}</p>
                      <div>
                        <a
                          className="ieeq-join"
                          href={JOIN_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Join IEEE
                        </a>
                        <button
                          ref={actionRef}
                          className="ieeq-again"
                          onClick={reset}
                        >
                          Play again
                        </button>
                      </div>
                    </>
                  ) : (
                    result && (
                      <>
                        <div className="ieeq-badge">
                          {result.ok ? "\u2705" : "\u274C"}
                        </div>
                        <div className="ieeq-verdict">
                          {result.ok ? "Correct!" : "Not quite"}
                        </div>
                        <p className="ieeq-why">
                          {result.ok ? "" : `Answer: ${result.answer}. `}
                          {result.why}
                        </p>
                        <button
                          ref={actionRef}
                          className="ieeq-next"
                          onClick={next}
                        >
                          {i < QUESTIONS.length - 1
                            ? "Next question"
                            : "See my score"}
                        </button>
                      </>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
