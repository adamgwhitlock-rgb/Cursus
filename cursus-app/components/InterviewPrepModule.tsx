"use client";

import { useState } from "react";

export default function InterviewPrepModule({
  university,
  country,
  subject,
  system,
}: {
  university: string;
  country: string;
  subject: string;
  system: string;
}) {
  const isUS = system.includes("Common App") || country === "United States";
  const isUK = system.includes("UCAS") || country === "United Kingdom";

  const questionBank = isUK
    ? [
        `"Here is an unseen passage regarding a core conflict in ${subject}. How would you challenge the primary assumption made in paragraph two?"`,
        `"Can you construct a counter-argument to your own statement regarding ${subject} without abandoning your core principle?"`,
        `"How does modern research in ${subject} handle ethical boundary cases that traditional theories ignore?"`,
      ]
    : isUS
    ? [
        `"Tell me about a time an academic concept in ${subject} completely shifted your perspective outside the classroom."`,
        `"If you were granted unlimited budget to research one problem in ${subject} at ${university}, what would you build?"`,
        `"How do your extracurricular achievements connect to your intellectual interest in ${subject}?"`,
      ]
    : [
        `"Why is ${university} the ideal international environment for your study of ${subject}?"`,
        `"Analyze a recent global debate in ${subject} from both an economic and social standpoint."`,
        `"How do regional regulation policies affect international practices in ${subject}?"`,
      ];

  const [activeQuestion, setActiveQuestion] = useState(0);

  return (
    <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-semibold">
            Tailored Interview Strategy
          </span>
          <h3 className="text-2xl font-serif text-white mt-1">
            {university} Interview Prep
          </h3>
        </div>
        <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-xs text-zinc-300 font-mono">
          {isUK ? "Oxbridge Tutorial Style" : isUS ? "Holistic / Vitality Check" : "Global Oral Board"}
        </span>
      </div>

      {/* Format Expectations Banner */}
      <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300 leading-relaxed">
        <strong className="text-amber-400 block mb-1">Interviewer Expectations at {university}:</strong>
        {isUK
          ? `Admissions tutors at ${university} assess your academic agility and ability to analyze new, unfamiliar material in real time. They want to see how you think under pressure, not memorized answers.`
          : isUS
          ? `Interviewers at ${university} evaluate intellectual vitality, community engagement, and authentic passion for ${subject}. Focus on linking academic curiosities with real-world impact.`
          : `${university} panel members expect structured academic debate, cross-cultural awareness, and clear articulation of your motivation for studying in ${country}.`}
      </div>

      {/* Target Question Bank */}
      <div className="space-y-3">
        <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
          Target Questions for {subject}
        </label>
        <div className="p-5 rounded-xl bg-black/60 border border-zinc-800 space-y-4">
          <p className="text-base font-serif text-amber-200 italic">
            {questionBank[activeQuestion]}
          </p>
          <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60">
            <span className="text-xs text-zinc-500 font-mono">
              Prompt {activeQuestion + 1} of {questionBank.length}
            </span>
            <button
              onClick={() => setActiveQuestion((prev) => (prev + 1) % questionBank.length)}
              className="text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              Next Question →
            </button>
          </div>
        </div>
      </div>

      {/* 3-Step Answer Framework */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
          <div className="text-amber-400 font-mono text-xs font-bold mb-1">01. State Premise</div>
          <p className="text-xs text-zinc-400">Define key terms clearly and state your primary thesis without rambling.</p>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
          <div className="text-amber-400 font-mono text-xs font-bold mb-1">02. Stress Test</div>
          <p className="text-xs text-zinc-400">Acknowledge edge cases, flaws, or counter-evidence directly before being prompted.</p>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
          <div className="text-amber-400 font-mono text-xs font-bold mb-1">03. Synthesize</div>
          <p className="text-xs text-zinc-400">Reframe your original argument incorporating the counter-point to demonstrate nuance.</p>
        </div>
      </div>
    </div>
  );
}
