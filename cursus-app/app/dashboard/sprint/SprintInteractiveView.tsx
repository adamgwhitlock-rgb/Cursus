"use client";

import { useState } from "react";
import { saveCaseNote } from "@/utils/actions";
import { useChat } from "ai/react";

interface Sprint {
  id: number;
  subject: string;
  title: string;
  week_number: number;
  description: string;
}

export default function SprintInteractiveView({ sprints }: { sprints: Sprint[] }) {
  const [activeWeek, setActiveWeek] = useState(1);
  const [caseNote, setCaseNote] = useState("");
  const [saving, setSaving] = useState(false);
  
  const currentStep = sprints.find((s) => s.week_number === activeWeek) || sprints[0];

  // Vercel AI hook for the interview simulator
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/interview',
    body: {
      caseNote: caseNote,
      subject: currentStep.subject,
    },
    initialMessages: [
      { id: '1', role: 'assistant', content: 'I have reviewed your synthesis. Please justify your primary conclusion.' }
    ]
  });

  const handleSaveNote = async () => {
    setSaving(true);
    await saveCaseNote(currentStep.id, 3, caseNote);
    setSaving(false);
  };

  return (
    <div>
      {/* Week Tab Navigation - Premium Dark Mode */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {sprints.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveWeek(item.week_number)}
            className={`p-4 rounded-xl text-left border transition-all duration-300 ${
              activeWeek === item.week_number
                ? "bg-zinc-900 border-amber-500/50 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                : "bg-black/40 border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
            }`}
          >
            <div className="text-xs uppercase tracking-widest mb-1 font-semibold">Week {item.week_number}</div>
            <div className="font-medium text-sm line-clamp-1">{item.title}</div>
          </button>
        ))}
      </div>

      {/* Active Week Display Card */}
      <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl relative overflow-hidden">
        {/* Subtle glow effect in the background */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none"></div>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 uppercase tracking-wider">
          Milestone {currentStep.week_number} of 4 
        </span>
        <h2 className="text-3xl font-serif mt-5 mb-3 text-zinc-100">{currentStep.title}</h2>
        <p className="text-zinc-400 mb-8 text-sm leading-relaxed max-w-2xl">{currentStep.description}</p>

        {/* WEEK 3: 500-Word Case Note Editor */}
        {activeWeek === 3 && (
          <div className="space-y-4">
            <textarea
              rows={10}
              value={caseNote}
              onChange={(e) => setCaseNote(e.target.value)}
              placeholder="Draft your structured, 500-word academic synthesis here. Be rigorous; you will defend this text in Week 4."
              className="w-full p-5 rounded-xl bg-black/60 border border-zinc-800 text-zinc-300 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 text-sm font-serif leading-relaxed resize-none transition-all"
            />
            <div className="flex items-center justify-between border-t border-zinc-800/50 pt-4">
              <span className="text-xs font-mono text-zinc-500">
                {caseNote.trim() ? caseNote.trim().split(/\s+/).length : 0} / 500 WORDS
              </span>
              <button
                onClick={handleSaveNote}
                disabled={saving}
                className="px-8 py-3 rounded-xl bg-zinc-100 text-zinc-950 font-bold hover:bg-white transition-all disabled:opacity-50 text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
              >
                {saving ? "Encrypting..." : "Commit Synthesis"}
              </button>
            </div>
          </div>
        )}

        {/* WEEK 4: AI Interview Simulator Room */}
        {activeWeek === 4 && (
          <div className="space-y-4 flex flex-col h-[400px]">
            <div className="flex-1 overflow-y-auto p-5 rounded-xl bg-black/60 border border-zinc-800 space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1 font-semibold">
                    {msg.role === 'user' ? 'Candidate' : 'Admissions Tutor'}
                  </span>
                  <div className={`p-4 rounded-xl text-sm max-w-[85%] leading-relaxed ${
                    msg.role === 'assistant'
                      ? 'bg-zinc-900 border border-zinc-800 text-zinc-300'
                      : 'bg-amber-500/10 border border-amber-500/20 text-amber-100'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && <div className="text-xs text-amber-500/70 animate-pulse font-mono">Tutor is assessing...</div>}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-3 pt-2">
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Defend your position under pressure..."
                className="flex-1 px-5 py-4 rounded-xl bg-black/60 border border-zinc-800 text-zinc-200 text-sm focus:outline-none focus:border-amber-500/50 transition-all font-sans"
              />
              <button
                type="submit"
                disabled={isLoading || !input}
                className="px-8 py-4 rounded-xl bg-amber-500 text-amber-950 font-bold hover:bg-amber-400 transition-all disabled:opacity-50 text-sm"
              >
                Respond
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
