"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DynamicCourseSelector({
  currentSubject,
  currentSystem,
}: {
  currentSubject: string;
  currentSystem: string;
}) {
  const router = useRouter();
  const [subject, setSubject] = useState(currentSubject);
  const [system, setSystem] = useState(currentSystem);
  const [loading, setLoading] = useState(false);

  const handleApply = () => {
    setLoading(true);
    router.push(`/dashboard?subject=${encodeURIComponent(subject)}&system=${encodeURIComponent(system)}`);
    setLoading(false);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 bg-zinc-900 p-2 rounded-xl border border-zinc-800">
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Degree Course (e.g. Astrophysics)"
        className="px-3 py-2 bg-black/60 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:border-amber-500/50 w-44 font-sans"
      />

      <select
        value={system}
        onChange={(e) => setSystem(e.target.value)}
        className="px-3 py-2 bg-black/60 border border-zinc-800 rounded-lg text-xs text-zinc-300 focus:outline-none focus:border-amber-500/50 font-sans"
      >
        <option value="UCAS (UK & Oxbridge)">UCAS (UK / Oxbridge)</option>
        <option value="Common App (US Ivies)">Common App (US / Ivies)</option>
        <option value="Global / European">Global / European System</option>
      </select>

      <button
        onClick={handleApply}
        disabled={loading}
        className="px-4 py-2 bg-amber-500 text-amber-950 font-bold rounded-lg text-xs hover:bg-amber-400 transition-all disabled:opacity-50"
      >
        {loading ? "Updating..." : "Set Target"}
      </button>
    </div>
  );
}
