"use client";

import { useState } from "react";

const sprintWeeks = [
  {
    week: 1,
    title: "Read the source",
    description: "Analyze the primary legal text, philosophical excerpt, or historical document assigned for your subject.",
    actionLabel: "Access Source Material",
    content: "Primary Text: R. v. Dudley and Stephens (1884) - The defense of necessity in criminal law.",
  },
  {
    week: 2,
    title: "Watch it argued",
    description: "Examine professional commentary, appellate arguments, or expert debates dissecting the source.",
    actionLabel: "Watch Breakdown Video",
    content: "Video Analysis: Supreme Court oral arguments and legal realism commentary.",
  },
  {
    week: 3,
    title: "Write your case note",
    description: "Draft a structured, 500-word academic synthesis arguing your position based on the evidence.",
    actionLabel: "Open Case Note Editor",
    content: "Drafting prompt: Outline the ratio decidendi and evaluate the limits of executive power.",
  },
  {
    week: 4,
    title: "Defend it live",
    description: "Enter the AI interview simulator room to field rigorous counter-arguments on your case note.",
    actionLabel: "Launch Interview Simulator",
    content: "Live Defense: Prepare to defend your thesis against real-time adversarial questioning.",
  },
];

export default function SprintViewerPage() {
  const [activeWeek, setActiveWeek] = useState(1);
  const currentStep = sprintWeeks[activeWeek - 1];

  return (
    <main className="min-h-screen p-8 md:p-16 bg-ink text-ivory">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif mb-2">Your Active Law Sprint</h1>
        <p className="text-ivory/70 mb-8 font-sans">
          Four weeks, one subject, a clear finish line.
        </p>

        {/* Week Tab Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {sprintWeeks.map((item) => (
            <button
              key={item.week}
              onClick={() => setActiveWeek(item.week)}
              className={`p-4 rounded-xl text-left border transition-all ${
                activeWeek === item.week
                  ? "bg-amber-500/10 border-amber-500 text-amber-300"
                  : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700"
              }`}
            >
              <div className="text-xs uppercase tracking-wider mb-1">Week {item.week}</div>
              <div className="font-semibold text-sm line-clamp-1">{item.title}</div>
            </button>
          ))}
        </div>

        {/* Active Week Display Card */}
        <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300">
            Milestone {activeWeek} of 4
          </span>
          <h2 className="text-2xl font-serif mt-4 mb-2">{currentStep.title}</h2>
          <p className="text-zinc-300 mb-6">{currentStep.description}</p>

          <div className="p-4 rounded-xl bg-black/40 border border-zinc-800/80 mb-8 text-sm text-zinc-300">
            {currentStep.content}
          </div>

          <button className="px-6 py-3 rounded-xl bg-amber-400 text-zinc-950 font-semibold hover:bg-amber-300 transition-colors">
            {currentStep.actionLabel}
          </button>
        </div>
      </div>
    </main>
  );
}
