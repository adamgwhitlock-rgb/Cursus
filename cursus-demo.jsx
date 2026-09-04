import { useState, useEffect, useRef } from "react";
import {
  BookOpen,
  PlayCircle,
  PenSquare,
  MessagesSquare,
  Check,
  Clock,
  Sparkles,
} from "lucide-react";

/* ---------------------------------------------------------------- */
/* Tokens                                                            */
/* ---------------------------------------------------------------- */

const C = {
  ink: "#0A0D14",
  panel: "#12151F",
  panel2: "#171B27",
  hairline: "#242A3D",
  ivory: "#EDEEF3",
  muted: "#9198AE",
  muted2: "#5C6178",
  gold: "#D8B45C",
  goldDim: "#8A7333",
  azure: "#5FD0E8",
};

const SERIF = '"Fraunces", Georgia, serif';
const SANS = '"Space Grotesk", "Helvetica Neue", Arial, sans-serif';

/* ---------------------------------------------------------------- */
/* Content                                                           */
/* ---------------------------------------------------------------- */

const SUBJECTS = ["law", "medicine", "economics"];

const ROADMAPS = {
  law: {
    label: "Law",
    weeks: [
      {
        type: "read",
        title: "Read a live policy debate",
        body: "Read the Law Commission's current consultation on a reform you haven't studied in class. Note two arguments against reform that you don't find convincing, and why.",
      },
      {
        type: "watch",
        title: "Watch a case argued, not summarised",
        body: "Watch a full Supreme Court hearing on a case in your area of interest. Track the moment each barrister's argument gets tested hardest.",
      },
      {
        type: "analyse",
        title: "Write a 300-word case note",
        body: "Facts, reasoning, and why the case still matters today. This becomes evidence in your personal statement, not just a reading log entry.",
      },
      {
        type: "discuss",
        title: "Defend it under pressure",
        body: "Take your case note into the Interview Simulator below and hold your reasoning up against a follow-up question you didn't prepare for.",
      },
    ],
  },
  medicine: {
    label: "Medicine",
    weeks: [
      {
        type: "read",
        title: "Read the evidence, not the headline",
        body: "Read a NICE guideline summary for a condition that interests you. List one thing about the underlying evidence base that surprised you.",
      },
      {
        type: "watch",
        title: "Watch real clinical reasoning",
        body: "Watch a published grand round or case discussion and track how the differential diagnosis narrows step by step.",
      },
      {
        type: "analyse",
        title: "Write a 300-word ethics reflection",
        body: "Connect one treatment decision to the four pillars of medical ethics. Where do they actually conflict, not just in theory?",
      },
      {
        type: "discuss",
        title: "Talk it through live",
        body: "Bring your reflection into the Interview Simulator and respond to a scenario question that pushes on the conflict you identified.",
      },
    ],
  },
  economics: {
    label: "Economics",
    weeks: [
      {
        type: "read",
        title: "Read a real forecast",
        body: "Read the latest Bank of England Monetary Policy Report summary. Identify one assumption underneath it you'd challenge.",
      },
      {
        type: "watch",
        title: "Watch a forecast get questioned",
        body: "Watch a central bank press conference and track how journalists' questions probe the weakest point in the forecast.",
      },
      {
        type: "analyse",
        title: "Write a 300-word applied note",
        body: "Apply one economic model to a real news story from this week. Where does the model stop being useful?",
      },
      {
        type: "discuss",
        title: "Defend your model",
        body: "Take your note into the Interview Simulator and defend your choice of model against a plausible counter-argument.",
      },
    ],
  },
};

const INTERVIEW_QUESTIONS = {
  law: [
    "A new bylaw bans dogs from public parks to cut accidents. Who might challenge it in court, and on what grounds?",
    "Should judges be elected rather than appointed? Give the strongest argument against your own position.",
  ],
  medicine: [
    "A treatment is highly effective but carries a 1-in-500 chance of a severe side effect. How do you explain that risk to a frightened patient?",
    "Two patients need the same organ and resources are limited. What is actually being weighed up, beyond 'who is sicker'?",
  ],
  economics: [
    "Interest rates just rose sharply. Name one group that benefits and one that loses, and explain the mechanism, not just the outcome.",
    "A city bans a company from raising prices during a heatwave. What happens next that the ban doesn't account for?",
  ],
};

const TYPE_META = {
  read: { icon: BookOpen, label: "Read" },
  watch: { icon: PlayCircle, label: "Watch" },
  analyse: { icon: PenSquare, label: "Write" },
  discuss: { icon: MessagesSquare, label: "Discuss" },
};

/* ---------------------------------------------------------------- */
/* Global style                                                      */
/* ---------------------------------------------------------------- */

function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Space+Grotesk:wght@400;500;700&display=swap');
      @keyframes heroIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
      .hero-in { animation: heroIn 0.8s ease-out both; }
      .cursus-focus:focus-visible { outline: 2px solid ${C.gold}; outline-offset: 2px; }
      .glow-gold { box-shadow: 0 0 0 1px ${C.gold}66, 0 0 28px ${C.gold}2e; }
      .glow-azure { box-shadow: 0 0 0 1px ${C.azure}66, 0 0 28px ${C.azure}2e; }
      ::selection { background: ${C.gold}55; }
      .thread-dot { box-shadow: 0 0 10px 2px ${C.gold}77; }
    `}</style>
  );
}

/* ---------------------------------------------------------------- */
/* Small primitives                                                  */
/* ---------------------------------------------------------------- */

function Pill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="cursus-focus px-4 py-2 rounded-full text-sm transition-colors"
      style={{
        fontFamily: SANS,
        border: `1px solid ${active ? C.gold : C.hairline}`,
        color: active ? C.gold : C.muted,
        background: active ? `${C.gold}14` : "transparent",
      }}
    >
      {children}
    </button>
  );
}

function PrimaryButton({ children, onClick, style }) {
  return (
    <button
      onClick={onClick}
      className="cursus-focus px-5 py-3 rounded-lg text-sm font-medium transition-transform hover:-translate-y-0.5"
      style={{
        fontFamily: SANS,
        background: C.gold,
        color: "#181203",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function GhostButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="cursus-focus px-5 py-3 rounded-lg text-sm font-medium transition-colors"
      style={{
        fontFamily: SANS,
        border: `1px solid ${C.hairline}`,
        color: C.ivory,
        background: "transparent",
      }}
    >
      {children}
    </button>
  );
}

function SectionLabel({ children }) {
  return (
    <div
      className="text-sm mb-3"
      style={{ fontFamily: SANS, color: C.muted2 }}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Nav                                                                */
/* ---------------------------------------------------------------- */

function Nav() {
  return (
    <div
      className="flex items-center justify-between px-6 md:px-12 py-5"
      style={{ borderBottom: `1px solid ${C.hairline}` }}
    >
      <div style={{ fontFamily: SERIF, fontSize: 22, color: C.ivory }}>
        Cursus
      </div>
      <div
        className="hidden md:flex items-center gap-8 text-sm"
        style={{ fontFamily: SANS, color: C.muted }}
      >
        <span>Sprints</span>
        <span>Interview simulator</span>
        <span>Pricing</span>
      </div>
      <div className="flex items-center gap-3">
        <span
          className="hidden sm:inline text-sm cursus-focus"
          style={{ fontFamily: SANS, color: C.muted }}
        >
          Log in
        </span>
        <PrimaryButton>Start free</PrimaryButton>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Hero                                                               */
/* ---------------------------------------------------------------- */

function HeroPreview() {
  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: C.panel, border: `1px solid ${C.hairline}` }}
    >
      <div
        className="text-sm mb-5"
        style={{ fontFamily: SANS, color: C.muted }}
      >
        Your Law sprint
      </div>
      <div className="flex flex-col gap-0">
        {["Read the source", "Watch it argued", "Write your case note", "Defend it live"].map(
          (label, i) => {
            const active = i === 1;
            return (
              <div key={label} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{
                      background: active ? C.gold : "transparent",
                      border: `1.5px solid ${active ? C.gold : C.muted2}`,
                      boxShadow: active ? `0 0 12px 2px ${C.gold}88` : "none",
                    }}
                  />
                  {i < 3 && (
                    <div
                      className="w-px flex-1"
                      style={{ background: C.hairline, minHeight: 28 }}
                    />
                  )}
                </div>
                <div
                  className="pb-7 text-sm"
                  style={{
                    fontFamily: SANS,
                    color: active ? C.ivory : C.muted,
                  }}
                >
                  <div style={{ color: C.muted2, fontSize: 12 }}>
                    Week {i + 1}
                  </div>
                  {label}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="px-6 md:px-12 pt-16 pb-20 hero-in">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center max-w-6xl mx-auto">
        <div className="md:col-span-3">
          <div
            className="text-sm mb-6"
            style={{ fontFamily: SANS, color: C.muted2 }}
          >
            For sixth form and international students, ages 16 to 18
          </div>
          <h1
            className="text-4xl md:text-6xl leading-[1.1] mb-6"
            style={{ fontFamily: SERIF, color: C.ivory, fontWeight: 500 }}
          >
            A guided route through your subject, all the way to the
            interview room.
          </h1>
          <p
            className="text-lg mb-8 max-w-xl"
            style={{ fontFamily: SANS, color: C.muted }}
          >
            Cursus turns super-curricular reading into a short, structured
            sprint with an AI tutor on the other end of it. Built for UCAS
            and the Common App alike.
          </p>
          <div className="flex flex-wrap gap-4">
            <PrimaryButton>See your first sprint</PrimaryButton>
            <GhostButton>Compare with the library-search model</GhostButton>
          </div>
        </div>
        <div className="md:col-span-2">
          <HeroPreview />
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Thread line (decorative)                                          */
/* ---------------------------------------------------------------- */

function ThreadLine() {
  const dots = [6, 27, 48, 69, 90];
  return (
    <div
      className="hidden md:block absolute top-0 bottom-0 w-px"
      style={{
        left: "2.75rem",
        background: `linear-gradient(to bottom, transparent, ${C.gold}66 10%, ${C.gold}66 90%, transparent)`,
      }}
    >
      {dots.map((top) => (
        <div
          key={top}
          className="thread-dot absolute w-1.5 h-1.5 rounded-full"
          style={{ top: `${top}%`, left: -2.5, background: C.gold }}
        />
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Roadmap section                                                   */
/* ---------------------------------------------------------------- */

function RoadmapSection() {
  const [subject, setSubject] = useState("law");
  const [expanded, setExpanded] = useState(0);
  const [done, setDone] = useState({});
  const data = ROADMAPS[subject];
  const doneCount = data.weeks.filter((_, i) => done[`${subject}-${i}`]).length;
  const pct = Math.round((doneCount / data.weeks.length) * 100);

  return (
    <section className="px-6 md:pl-24 md:pr-12 py-16 max-w-6xl mx-auto">
      <SectionLabel>The sprint</SectionLabel>
      <h2
        className="text-3xl md:text-4xl mb-3"
        style={{ fontFamily: SERIF, color: C.ivory, fontWeight: 500 }}
      >
        Four weeks, one subject, a clear finish line.
      </h2>
      <p
        className="mb-8 max-w-xl"
        style={{ fontFamily: SANS, color: C.muted }}
      >
        Not a library of five thousand links. One curated path, chosen for
        the subject you actually applied to study.
      </p>

      <div className="flex flex-wrap gap-3 mb-8">
        {SUBJECTS.map((s) => (
          <Pill key={s} active={s === subject} onClick={() => { setSubject(s); setExpanded(0); }}>
            {ROADMAPS[s].label}
          </Pill>
        ))}
      </div>

      {/* progress bar */}
      <div className="mb-8">
        <div
          className="flex justify-between text-sm mb-2"
          style={{ fontFamily: SANS, color: C.muted }}
        >
          <span>Sprint progress</span>
          <span style={{ color: C.gold }}>{pct}%</span>
        </div>
        <div
          className="w-full rounded-full h-1.5 overflow-hidden"
          style={{ background: C.panel2 }}
        >
          <div
            className="h-full rounded-full glow-gold transition-all duration-500"
            style={{ width: `${pct}%`, background: C.gold }}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-0 md:gap-2 mb-6">
        {data.weeks.map((week, i) => {
          const meta = TYPE_META[week.type];
          const Icon = meta.icon;
          const isDone = !!done[`${subject}-${i}`];
          const isExpanded = expanded === i;
          return (
            <div key={i} className="flex md:flex-1 items-stretch">
              <div className="flex md:flex-col items-center md:items-stretch gap-3 md:gap-0">
                <button
                  onClick={() => setExpanded(i)}
                  className="cursus-focus flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    background: isDone ? C.gold : isExpanded ? `${C.gold}22` : C.panel2,
                    border: `1px solid ${isDone || isExpanded ? C.gold : C.hairline}`,
                    boxShadow: isDone ? `0 0 14px 2px ${C.gold}88` : "none",
                  }}
                >
                  {isDone ? (
                    <Check size={16} color="#181203" />
                  ) : (
                    <Icon size={16} color={isExpanded ? C.gold : C.muted} />
                  )}
                </button>
                <div
                  className="w-px flex-1 md:hidden"
                  style={{ background: C.hairline, minHeight: 12 }}
                />
                {i < data.weeks.length - 1 && (
                  <div
                    className="hidden md:block h-px flex-1 mt-5"
                    style={{ background: C.hairline }}
                  />
                )}
              </div>
              <button
                onClick={() => setExpanded(i)}
                className="cursus-focus text-left flex-1 pb-6 md:pb-0 md:pt-3 md:px-3"
              >
                <div style={{ fontFamily: SANS, fontSize: 12, color: C.muted2 }}>
                  Week {i + 1} · {meta.label}
                </div>
                <div
                  style={{
                    fontFamily: SANS,
                    fontSize: 14,
                    color: isExpanded ? C.ivory : C.muted,
                  }}
                >
                  {week.title}
                </div>
              </button>
            </div>
          );
        })}
      </div>

      <div
        className="rounded-xl p-6"
        style={{ background: C.panel, border: `1px solid ${C.hairline}` }}
      >
        <div
          className="text-sm mb-2"
          style={{ fontFamily: SANS, color: C.muted2 }}
        >
          Week {expanded + 1} · {TYPE_META[data.weeks[expanded].type].label}
        </div>
        <div
          className="text-lg mb-3"
          style={{ fontFamily: SERIF, color: C.ivory }}
        >
          {data.weeks[expanded].title}
        </div>
        <p
          className="mb-5 max-w-2xl"
          style={{ fontFamily: SANS, color: C.muted }}
        >
          {data.weeks[expanded].body}
        </p>
        <button
          onClick={() =>
            setDone((d) => ({
              ...d,
              [`${subject}-${expanded}`]: !d[`${subject}-${expanded}`],
            }))
          }
          className="cursus-focus text-sm px-4 py-2 rounded-lg"
          style={{
            fontFamily: SANS,
            border: `1px solid ${done[`${subject}-${expanded}`] ? C.gold : C.hairline}`,
            color: done[`${subject}-${expanded}`] ? C.gold : C.ivory,
            background: done[`${subject}-${expanded}`] ? `${C.gold}14` : "transparent",
          }}
        >
          {done[`${subject}-${expanded}`] ? "Marked complete" : "Mark this week complete"}
        </button>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Interview simulator                                               */
/* ---------------------------------------------------------------- */

function InterviewSimulator() {
  const [subject, setSubject] = useState("law");
  const [phase, setPhase] = useState("idle");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(90);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const timerRef = useRef(null);

  useEffect(() => {
    if (phase !== "running") return undefined;
    if (timeLeft <= 0) {
      setPhase("timeup");
      return undefined;
    }
    timerRef.current = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [phase, timeLeft]);

  function start() {
    const bank = INTERVIEW_QUESTIONS[subject];
    setQuestion(bank[Math.floor(Math.random() * bank.length)]);
    setAnswer("");
    setFeedback("");
    setError("");
    setTimeLeft(90);
    setPhase("running");
  }

  async function requestFeedback() {
    setPhase("loading");
    setError("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: `You are a warm but rigorous ${ROADMAPS[subject].label} admissions interviewer at a top university, giving feedback to a 17-year-old applicant who had 90 seconds to answer a quick-thinking question. In under 90 words of plain prose, no headers or bullet points: name one specific thing they did well, one gap in the reasoning, and one sharper follow-up question they should be ready for next time.`,
          messages: [
            {
              role: "user",
              content: `Question: ${question}\n\nStudent's answer: ${
                answer.trim() || "(no answer given, ran out of time)"
              }`,
            },
          ],
        }),
      });
      const data = await res.json();
      const text = (data.content || [])
        .filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("\n")
        .trim();
      if (!text) throw new Error("empty");
      setFeedback(text);
      setPhase("feedback");
    } catch (e) {
      setError("Couldn't reach the AI tutor just then — give it another try.");
      setPhase("timeup");
    }
  }

  return (
    <section className="px-6 md:pl-24 md:pr-12 py-16 max-w-6xl mx-auto">
      <SectionLabel>The interview simulator</SectionLabel>
      <h2
        className="text-3xl md:text-4xl mb-3"
        style={{ fontFamily: SERIF, color: C.ivory, fontWeight: 500 }}
      >
        A question you haven't rehearsed, and ninety seconds to answer it.
      </h2>
      <p
        className="mb-8 max-w-xl"
        style={{ fontFamily: SANS, color: C.muted }}
      >
        A reflection text box tells you what you already think. This tests
        how you think under pressure, then an AI tutor tells you exactly
        where the reasoning held and where it didn't.
      </p>

      <div className="flex flex-wrap gap-3 mb-8">
        {SUBJECTS.map((s) => (
          <Pill
            key={s}
            active={s === subject}
            onClick={() => {
              setSubject(s);
              setPhase("idle");
            }}
          >
            {ROADMAPS[s].label}
          </Pill>
        ))}
      </div>

      <div
        className="rounded-xl p-6 md:p-8"
        style={{ background: C.panel, border: `1px solid ${C.hairline}` }}
      >
        {phase === "idle" && (
          <div className="flex flex-col items-start gap-4">
            <div style={{ fontFamily: SANS, color: C.muted }}>
              You'll get one {ROADMAPS[subject].label.toLowerCase()} question
              and ninety seconds on the clock.
            </div>
            <PrimaryButton onClick={start}>Start the timer</PrimaryButton>
          </div>
        )}

        {(phase === "running" || phase === "timeup" || phase === "loading" || phase === "feedback") && (
          <div>
            <div
              className="text-lg mb-5"
              style={{ fontFamily: SERIF, color: C.ivory }}
            >
              {question}
            </div>

            {phase === "running" && (
              <>
                <div
                  className="flex items-center gap-2 mb-3 text-sm"
                  style={{
                    fontFamily: SANS,
                    color: timeLeft <= 15 ? C.gold : C.muted,
                  }}
                >
                  <Clock size={15} />
                  {timeLeft}s remaining
                </div>
                <textarea
                  autoFocus
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Start typing your answer..."
                  rows={4}
                  className="cursus-focus w-full rounded-lg p-4 text-sm mb-4 resize-none"
                  style={{
                    fontFamily: SANS,
                    background: C.ink,
                    border: `1px solid ${C.hairline}`,
                    color: C.ivory,
                  }}
                />
                <GhostButton onClick={() => setPhase("timeup")}>
                  Submit now
                </GhostButton>
              </>
            )}

            {phase === "timeup" && (
              <>
                {answer && (
                  <p
                    className="text-sm mb-4 italic"
                    style={{ fontFamily: SANS, color: C.muted }}
                  >
                    "{answer}"
                  </p>
                )}
                {error && (
                  <p
                    className="text-sm mb-4"
                    style={{ fontFamily: SANS, color: C.gold }}
                  >
                    {error}
                  </p>
                )}
                <PrimaryButton onClick={requestFeedback}>
                  Get feedback from the AI tutor
                </PrimaryButton>
              </>
            )}

            {phase === "loading" && (
              <div
                className="flex items-center gap-2 text-sm"
                style={{ fontFamily: SANS, color: C.azure }}
              >
                <Sparkles size={15} />
                Reading your answer...
              </div>
            )}

            {phase === "feedback" && (
              <div>
                <div
                  className="rounded-lg p-5 glow-azure mb-4"
                  style={{ background: C.panel2, border: `1px solid ${C.azure}55` }}
                >
                  <div
                    className="flex items-center gap-2 text-sm mb-3"
                    style={{ fontFamily: SANS, color: C.azure }}
                  >
                    <Sparkles size={14} />
                    AI tutor feedback
                  </div>
                  <p style={{ fontFamily: SANS, color: C.ivory, lineHeight: 1.6 }}>
                    {feedback}
                  </p>
                </div>
                <GhostButton onClick={start}>Try another question</GhostButton>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Dual system                                                       */
/* ---------------------------------------------------------------- */

function DualSystemSection() {
  const [sys, setSys] = useState("ucas");

  const panels = {
    ucas: {
      title: "UCAS personal statement tracker",
      rows: [
        ["Character count", "2,840 / 4,000"],
        ["Supercurricular evidence linked", "6 entries"],
        ["Draft stage", "Second draft"],
        ["Reference status", "Requested from tutor"],
      ],
    },
    commonapp: {
      title: "Common App activities & essays",
      rows: [
        ["Activities list", "7 / 10 entries"],
        ["Additional Info essay", "In progress"],
        ["Why-this-college supplements", "2 of 5 drafted"],
        ["Word limit per activity", "150 characters"],
      ],
    },
  };
  const panel = panels[sys];

  return (
    <section className="px-6 md:pl-24 md:pr-12 py-16 max-w-6xl mx-auto">
      <SectionLabel>One profile, two systems</SectionLabel>
      <h2
        className="text-3xl md:text-4xl mb-3"
        style={{ fontFamily: SERIF, color: C.ivory, fontWeight: 500 }}
      >
        Built for UCAS and the Common App, not just one of them.
      </h2>
      <p
        className="mb-8 max-w-xl"
        style={{ fontFamily: SANS, color: C.muted }}
      >
        The same sprint work gets reframed differently depending on where
        it's headed — a UK personal statement and a US activities list
        reward completely different things.
      </p>

      <div className="flex gap-2 mb-6">
        <Pill active={sys === "ucas"} onClick={() => setSys("ucas")}>
          UCAS
        </Pill>
        <Pill active={sys === "commonapp"} onClick={() => setSys("commonapp")}>
          Common App
        </Pill>
      </div>

      <div
        className="rounded-xl p-6 md:p-8 max-w-xl"
        style={{ background: C.panel, border: `1px solid ${C.hairline}` }}
      >
        <div
          className="text-sm mb-5"
          style={{ fontFamily: SANS, color: C.muted2 }}
        >
          {panel.title}
        </div>
        <div className="flex flex-col gap-4">
          {panel.rows.map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between text-sm pb-4"
              style={{ borderBottom: `1px solid ${C.hairline}` }}
            >
              <span style={{ fontFamily: SANS, color: C.muted }}>{label}</span>
              <span style={{ fontFamily: SANS, color: C.ivory }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Compare                                                            */
/* ---------------------------------------------------------------- */

function CompareSection() {
  const rows = [
    ["Format", "A searchable library of 5,000+ links", "A four-week guided sprint per subject"],
    ["Feedback", "A reflection text box you fill in alone", "An AI tutor that responds to what you wrote"],
    ["Interview prep", "Not included", "A timed simulator with live feedback"],
    ["Application systems", "UCAS personal statement", "UCAS and the US Common App"],
  ];
  return (
    <section className="px-6 md:pl-24 md:pr-12 py-16 max-w-6xl mx-auto">
      <SectionLabel>How it's different</SectionLabel>
      <h2
        className="text-3xl md:text-4xl mb-10"
        style={{ fontFamily: SERIF, color: C.ivory, fontWeight: 500 }}
      >
        Less searching. More doing.
      </h2>
      <div style={{ border: `1px solid ${C.hairline}`, borderRadius: 12, overflow: "hidden" }}>
        <div
          className="grid grid-cols-3 text-sm px-6 py-4"
          style={{ background: C.panel2, fontFamily: SANS, color: C.muted2 }}
        >
          <div />
          <div>Library search engine</div>
          <div style={{ color: C.gold }}>Cursus</div>
        </div>
        {rows.map(([label, a, b], i) => (
          <div
            key={label}
            className="grid grid-cols-3 text-sm px-6 py-5"
            style={{
              background: i % 2 ? "transparent" : C.panel,
              borderTop: `1px solid ${C.hairline}`,
              fontFamily: SANS,
            }}
          >
            <div style={{ color: C.ivory }}>{label}</div>
            <div style={{ color: C.muted }}>{a}</div>
            <div style={{ color: C.ivory }}>{b}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Pricing                                                            */
/* ---------------------------------------------------------------- */

function PricingCard({ name, price, period, blurb, features, highlighted }) {
  return (
    <div
      className="rounded-2xl p-8 flex-1"
      style={{
        background: highlighted ? C.panel : C.panel,
        border: `1px solid ${highlighted ? C.gold : C.hairline}`,
        boxShadow: highlighted ? `0 0 32px ${C.gold}22` : "none",
      }}
    >
      {highlighted && (
        <div
          className="text-xs mb-4 inline-block px-2.5 py-1 rounded-full"
          style={{ fontFamily: SANS, color: C.gold, border: `1px solid ${C.gold}55` }}
        >
          Most chosen
        </div>
      )}
      <div style={{ fontFamily: SERIF, fontSize: 22, color: C.ivory }}>{name}</div>
      <div className="flex items-baseline gap-2 my-4">
        <span style={{ fontFamily: SERIF, fontSize: 40, color: C.ivory }}>{price}</span>
        <span style={{ fontFamily: SANS, color: C.muted, fontSize: 14 }}>{period}</span>
      </div>
      <p className="mb-6 text-sm" style={{ fontFamily: SANS, color: C.muted }}>
        {blurb}
      </p>
      <div className="flex flex-col gap-3 mb-8">
        {features.map((f) => (
          <div key={f} className="flex items-start gap-2 text-sm">
            <Check size={15} color={highlighted ? C.gold : C.muted} className="mt-0.5 flex-shrink-0" />
            <span style={{ fontFamily: SANS, color: C.ivory }}>{f}</span>
          </div>
        ))}
      </div>
      {highlighted ? (
        <PrimaryButton style={{ width: "100%" }}>Start this plan</PrimaryButton>
      ) : (
        <GhostButton>Start this plan</GhostButton>
      )}
    </div>
  );
}

function PricingSection() {
  return (
    <section className="px-6 md:pl-24 md:pr-12 py-16 max-w-6xl mx-auto">
      <SectionLabel>Pricing</SectionLabel>
      <h2
        className="text-3xl md:text-4xl mb-10"
        style={{ fontFamily: SERIF, color: C.ivory, fontWeight: 500 }}
      >
        Illustrative pricing — set your own before launch.
      </h2>
      <div className="flex flex-col md:flex-row gap-6">
        <PricingCard
          name="Roadmap"
          price="£8"
          period="/ month"
          blurb="Full sprint library and dual-system tracking, for students working independently."
          features={[
            "Every subject sprint",
            "UCAS and Common App tracking",
            "3 interview simulator sessions / month",
            "Progress tracker",
          ]}
        />
        <PricingCard
          name="Roadmap + Mentor"
          price="£16"
          period="/ month"
          blurb="Everything in Roadmap, with unlimited interview practice and priority sprint customisation."
          features={[
            "Everything in Roadmap",
            "Unlimited interview simulator sessions",
            "Custom sprint requests",
            "One 1:1 strategy call per term",
          ]}
          highlighted
        />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Footer                                                             */
/* ---------------------------------------------------------------- */

function Footer() {
  return (
    <div
      className="px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between gap-3 text-sm"
      style={{ borderTop: `1px solid ${C.hairline}`, fontFamily: SANS, color: C.muted2 }}
    >
      <div>Cursus</div>
      <div>Built for students applying worldwide.</div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* App                                                                */
/* ---------------------------------------------------------------- */

export default function CursusPlatform() {
  return (
    <div style={{ background: C.ink, minHeight: "100vh" }}>
      <GlobalStyle />
      <Nav />
      <Hero />
      <div className="relative">
        <ThreadLine />
        <RoadmapSection />
        <InterviewSimulator />
        <DualSystemSection />
        <CompareSection />
        <PricingSection />
      </div>
      <Footer />
    </div>
  );
}
