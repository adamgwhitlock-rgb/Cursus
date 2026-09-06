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
  const [loadingLive, setLoadingLive] = useState(false);
  const [liveResource, setLiveResource] = useState<string | null>(null);

  const currentStep = sprints.find((s) => s.week_number === activeWeek) || sprints[0];

  const handleFetchLiveContent = async () => {
    setLoadingLive(true);
    // Simulate or call your live backend curation action
    setTimeout(() => {
      setLiveResource(
        `Live verified open web reference for ${currentStep.subject}: Recent appellate brief and analysis updated for Week ${activeWeek}.`
      );
      setLoadingLive(false);
    }, 600);
  };

  return (
    <div>
      {/* Week Tab Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {sprints.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveWeek(item.week_number);
              setLiveResource(null);
            }}
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

        {liveResource && (
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 mb-6 text-sm text-amber-200">
            {liveResource}
          </div>
        )}

        <button
          onClick={handleFetchLiveContent}
          disabled={loadingLive}
          className="px-6 py-3 rounded-xl bg-amber-400 text-zinc-950 font-semibold hover:bg-amber-300 transition-colors disabled:opacity-50"
        >
          {loadingLive ? "Scanning Live Sources..." : "Fetch Fresh Web Resources"}
        </button>
      </div>
    </div>
  );
}
