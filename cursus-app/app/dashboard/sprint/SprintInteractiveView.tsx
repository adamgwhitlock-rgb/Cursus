"use client";

import { useState } from "react";

interface Sprint {
  id: number;
  subject: string;
  title: string;
  week_number: number;
  description: string;
}

export default function SprintInteractiveView({ sprints }: { sprints: Sprint[] }) {
  const [activeWeek, setActiveWeek] = useState(1);

  if (!sprints || sprints.length === 0) {
    return (
      <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-400">
        No active sprints found in the database. Please check your Neon connection or run the seed script.
      </div>
    );
  }

  const currentStep = sprints.find((s) => s.week_number === activeWeek) || sprints[0];

  return (
    <div>
      {/* Week Tab Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {sprints.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveWeek(item.week_number)}
            className={`p-4 rounded-xl text-left border transition-all ${
              activeWeek === item.week_number
                ? "bg-amber-500/10 border-amber-500 text-amber-300"
                : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700"
            }`}
          >
            <div className="text-xs uppercase tracking-wider mb-1">Week {item.week_number}</div>
            <div className="font-semibold text-sm line-clamp-1">{item.title}</div>
          </button>
        ))}
      </div>

      {/* Active Week Display Card */}
      <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300">
          Milestone {currentStep.week_number} of 4 ({currentStep.subject})
        </span>
        <h2 className="text-2xl font-serif mt-4 mb-2">{currentStep.title}</h2>
        <p className="text-zinc-300 mb-6">{currentStep.description}</p>

        <button className="px-6 py-3 rounded-xl bg-amber-400 text-zinc-950 font-semibold hover:bg-amber-300 transition-colors">
          Access Milestone Materials
        </button>
      </div>
    </div>
  );
}
