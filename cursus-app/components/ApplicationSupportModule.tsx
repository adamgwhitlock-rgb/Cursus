"use client";

import { useState } from "react";

export default function ApplicationSupportModule({
  system,
  university,
  subject,
}: {
  system: string;
  university: string;
  subject: string;
}) {
  const isCommonApp = system.includes("Common App");
  const isUCAS = system.includes("UCAS");

  const [statement, setStatement] = useState("");
  const [referenceStatus, setReferenceStatus] = useState("Requested");

  return (
    <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-semibold">
            System Milestone Tracker
          </span>
          <h3 className="text-2xl font-serif text-white mt-1">
            Application Support — {system}
          </h3>
        </div>
        <span className="text-xs text-zinc-400 font-mono">Target: {university}</span>
      </div>

      {/* Dynamic System Requirements Checklist */}
      {isUCAS ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-[10px] uppercase font-mono text-zinc-500">Academic Focus</span>
              <div className="text-lg font-serif text-amber-300 mt-1">80% Super-Curricular</div>
              <p className="text-xs text-zinc-400 mt-1">Deep analysis of primary texts for {subject}.</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-[10px] uppercase font-mono text-zinc-500">Character Limit</span>
              <div className="text-lg font-serif text-amber-300 mt-1">4,000 Characters</div>
              <p className="text-xs text-zinc-400 mt-1">Includes spaces and line breaks (47 lines max).</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-[10px] uppercase font-mono text-zinc-500">Academic Reference</span>
              <div className="text-lg font-serif text-amber-300 mt-1">{referenceStatus}</div>
              <p className="text-xs text-zinc-400 mt-1">Subject tutor recommendation for {university}.</p>
            </div>
          </div>

          {/* UCAS Personal Statement Draft Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                UCAS Personal Statement Draft
              </label>
              <span className={`text-xs font-mono ${statement.length > 4000 ? "text-red-400" : "text-amber-400"}`}>
                {statement.length} / 4,000 characters
              </span>
            </div>
            <textarea
              rows={6}
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              placeholder={`Draft your UCAS personal statement here. Focus on the core academic problems in ${subject} you analyzed during your 4-week sprint.`}
              className="w-full p-4 rounded-xl bg-black/60 border border-zinc-800 text-zinc-200 text-sm focus:outline-none focus:border-amber-500/50 font-serif leading-relaxed"
            />
          </div>
        </div>
      ) : isCommonApp ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-[10px] uppercase font-mono text-zinc-500">Personal Essay</span>
              <div className="text-lg font-serif text-amber-300 mt-1">650 Words Max</div>
              <p className="text-xs text-zinc-400 mt-1">Holistic personal narrative & intellectual growth.</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-[10px] uppercase font-mono text-zinc-500">Activities List</span>
              <div className="text-lg font-serif text-amber-300 mt-1">10 Activities</div>
              <p className="text-xs text-zinc-400 mt-1">150-character descriptions highlighting leadership.</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-[10px] uppercase font-mono text-zinc-500">Supplements</span>
              <div className="text-lg font-serif text-amber-300 mt-1">{university} Prompts</div>
              <p className="text-xs text-zinc-400 mt-1">"Why This College" & subject-specific prompts.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/60 border border-zinc-800 space-y-3">
            <h4 className="text-sm font-medium text-amber-300">Super-Curricular Evidence to Common App Activities</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Convert your Week 3 synthesis note into a high-impact 150-character Common App Activity entry:
            </p>
            <div className="p-3 rounded-lg bg-zinc-900 text-xs font-mono text-zinc-300 border border-zinc-800">
              "Independent Research: Drafted 500-word synthesis on {subject} primary texts. Defended thesis in live faculty-style interview simulation."
            </div>
          </div>
        </div>
      ) : (
        /* Global / European System */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-[10px] uppercase font-mono text-zinc-500">Motivation Letter</span>
              <div className="text-lg font-serif text-amber-300 mt-1">1-2 Pages</div>
              <p className="text-xs text-zinc-400 mt-1">Aligning academic background with {university}.</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-[10px] uppercase font-mono text-zinc-500">Academic Portfolio</span>
              <div className="text-lg font-serif text-amber-300 mt-1">Sprint Outputs</div>
              <p className="text-xs text-zinc-400 mt-1">Synthesised case notes as writing samples.</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-[10px] uppercase font-mono text-zinc-500">Language / Eligibility</span>
              <div className="text-lg font-serif text-amber-300 mt-1">Verified</div>
              <p className="text-xs text-zinc-400 mt-1">Transcripts & proficiency documentation.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
