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
  const [loading, setLoading] = useState(false);
  const [liveResources, setLiveResources] = useState<any[]>([]);

  const currentStep = sprints.find((s) => s.week_number === activeWeek) || sprints[0];

  const handleFetchLive = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/search?topic=${encodeURIComponent(currentStep.subject)}&week=${activeWeek}`);
      const data = await res.json();
      setLiveResources(data.resources || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
              setLiveResources([]);
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

        {liveResources.length > 0 && (
          <div className="space-y-3 mb-6">
            {liveResources.map((res, idx) => (
              <a
                key={idx}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-xl bg-black/40 border border-zinc-800 hover:border-amber-500/50 transition-all"
              >
                <h4 className="font-semibold text-amber-300 text-sm mb-1">{res.title}</h4>
                <p className="text-xs text-zinc-400 line-clamp-2">{res.snippet}</p>
              </a>
            ))}
          </div>
        )}

        <button
          onClick={handleFetchLive}
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-amber-400 text-zinc-950 font-semibold hover:bg-amber-300 transition-colors disabled:opacity-50"
        >
          {loading ? "Querying Exa Neural Index..." : "Fetch Fresh Web Resources"}
        </button>
      </div>
    </div>
  );
}
