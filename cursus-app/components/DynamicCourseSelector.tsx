"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function DynamicCourseSelector({
  currentSubject,
  currentSystem,
  currentUniversity,
  currentCountry,
}: {
  currentSubject: string;
  currentSystem: string;
  currentUniversity?: string;
  currentCountry?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [subject, setSubject] = useState(currentSubject || "Law");
  const [system, setSystem] = useState(currentSystem || "UCAS (UK & Oxbridge)");
  const [university, setUniversity] = useState(currentUniversity || "University of Oxford");
  const [country, setCountry] = useState(currentCountry || "United Kingdom");

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    params.set("subject", subject);
    params.set("system", system);
    params.set("university", university);
    params.set("country", country);

    router.push(`/dashboard?${params.toString()}`);
  };

  return (
    <form onSubmit={handleApply} className="flex flex-wrap items-center gap-3 bg-zinc-900/90 p-3 rounded-2xl border border-zinc-800">
      <div className="flex flex-col">
        <label className="text-[10px] font-mono text-zinc-400 uppercase px-2 mb-1">Target Country</label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="bg-black/60 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-500/50"
        >
          <option value="United Kingdom">United Kingdom</option>
          <option value="United States">United States</option>
          <option value="Canada">Canada</option>
          <option value="Europe / EU">Europe / EU</option>
          <option value="Asia / Australia">Asia / Australia</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-[10px] font-mono text-zinc-400 uppercase px-2 mb-1">Target University</label>
        <input
          type="text"
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
          placeholder="e.g. Oxford, Harvard, Sciences Po"
          className="bg-black/60 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-500/50 w-44"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-[10px] font-mono text-zinc-400 uppercase px-2 mb-1">Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="e.g. Theology, Law"
          className="bg-black/60 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-500/50 w-36"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-[10px] font-mono text-zinc-400 uppercase px-2 mb-1">Application System</label>
        <select
          value={system}
          onChange={(e) => setSystem(e.target.value)}
          className="bg-black/60 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-500/50"
        >
          <option value="UCAS (UK & Oxbridge)">UCAS (UK / Oxbridge)</option>
          <option value="Common App (US / Ivies)">Common App (US / Ivies)</option>
          <option value="Global / European System">Global / European System</option>
        </select>
      </div>

      <button
        type="submit"
        className="mt-4 self-end px-5 py-2 rounded-xl bg-amber-500 text-amber-950 text-xs font-bold hover:bg-amber-400 transition-all shadow-md"
      >
        Set Target
      </button>
    </form>
  );
}
