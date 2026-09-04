"use client";

import { useEffect, useRef, useState } from "react";
import { Clock, Sparkles } from "lucide-react";
import { SUBJECTS, ROADMAPS, INTERVIEW_QUESTIONS, Subject } from "@/lib/content";
import { Pill, PrimaryButton, GhostButton, SectionLabel } from "./ui";

type Phase = "idle" | "running" | "timeup" | "loading" | "feedback";

export default function InterviewSimulator() {
  const [subject, setSubject] = useState<Subject>("law");
  const [phase, setPhase] = useState<Phase>("idle");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(90);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

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
      const res = await fetch("/api/interview-feedback", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          subject: ROADMAPS[subject].label,
          question,
          answer,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.feedback) throw new Error(data.error || "empty");
      setFeedback(data.feedback);
      setPhase("feedback");
    } catch {
      setError("Couldn't reach the AI tutor just then — give it another try.");
      setPhase("timeup");
    }
  }

  return (
    <section className="px-6 md:pl-24 md:pr-12 py-16 max-w-6xl mx-auto">
      <SectionLabel>The interview simulator</SectionLabel>
      <h2 className="font-serif text-3xl md:text-4xl mb-3 text-ivory font-medium">
        A question you haven&apos;t rehearsed, and ninety seconds to answer it.
      </h2>
      <p className="mb-8 max-w-xl text-muted">
        A reflection text box tells you what you already think. This tests
        how you think under pressure, then an AI tutor tells you exactly
        where the reasoning held and where it didn&apos;t.
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

      <div className="rounded-xl p-6 md:p-8 bg-panel border border-hairline">
        {phase === "idle" && (
          <div className="flex flex-col items-start gap-4">
            <div className="text-muted">
              You&apos;ll get one {ROADMAPS[subject].label.toLowerCase()} question
              and ninety seconds on the clock.
            </div>
            <PrimaryButton onClick={start}>Start the timer</PrimaryButton>
          </div>
        )}

        {phase !== "idle" && (
          <div>
            <div className="font-serif text-lg mb-5 text-ivory">{question}</div>

            {phase === "running" && (
              <>
                <div
                  className={`flex items-center gap-2 mb-3 text-sm ${
                    timeLeft <= 15 ? "text-gold" : "text-muted"
                  }`}
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
                  className="cursus-focus w-full rounded-lg p-4 text-sm mb-4 resize-none bg-ink border border-hairline text-ivory"
                />
                <GhostButton onClick={() => setPhase("timeup")}>
                  Submit now
                </GhostButton>
              </>
            )}

            {phase === "timeup" && (
              <>
                {answer && (
                  <p className="text-sm mb-4 italic text-muted">
                    &quot;{answer}&quot;
                  </p>
                )}
                {error && <p className="text-sm mb-4 text-gold">{error}</p>}
                <PrimaryButton onClick={requestFeedback}>
                  Get feedback from the AI tutor
                </PrimaryButton>
              </>
            )}

            {phase === "loading" && (
              <div className="flex items-center gap-2 text-sm text-azure">
                <Sparkles size={15} />
                Reading your answer...
              </div>
            )}

            {phase === "feedback" && (
              <div>
                <div className="rounded-lg p-5 glow-azure mb-4 bg-panel2 border border-azure/40">
                  <div className="flex items-center gap-2 text-sm mb-3 text-azure">
                    <Sparkles size={14} />
                    AI tutor feedback
                  </div>
                  <p className="text-ivory leading-relaxed">{feedback}</p>
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
