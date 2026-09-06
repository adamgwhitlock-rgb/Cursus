"use client";

import { useState } from "react";
import { saveCaseNote } from "@/utils/actions";

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
  const [savedMessage, setSavedMessage] = useState("");
  
  // AI Defense simulator state
  const [chatMessages, setChatMessages] = useState([
    { role: "ai", text: "Counsel, I have reviewed your case note. On what doctrinal basis do you justify bypassing standard statutory interpretation in favor of judicial necessity?" }
  ]);
  const [userInput, setUserInput] = useState("");

  const currentStep = sprints.find((s) => s.week_number === activeWeek) || sprints[0];

  const handleSaveNote = async () => {
    setSaving(true);
    setSavedMessage("");
    const res = await saveCaseNote(currentStep.id, 3, caseNote);
    setSaving(false);
    if (res.success) {
      setSavedMessage("Case note saved securely to your progress profile.");
    } else {
      setSavedMessage("Error saving note. Please try again.");
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newMessages = [...chatMessages, { role: "user", text: userInput }];
    setChatMessages(newMessages);
    setUserInput("");

    // Simulate rigorous AI counter-examination panel response
    setTimeout(() => {
      setChatMessages([
        ...newMessages,
        { 
          role: "ai", 
          text: "That argument collapses under close scrutiny of precedent. How do you reconcile that stance with conflicting appellate rulings?" 
        }
      ]);
    }, 1000);
  };

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

        {/* WEEK 1: Single Primary Source View */}
        {activeWeek === 1 && (
          <div className="p-6 rounded-xl bg-black/40 border border-zinc-800 space-y-4">
            <h3 className="text-lg font-serif text-amber-300">Primary Curated Reading</h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              <strong>R v Dudley and Stephens (1884) 14 QBD 273:</strong> The benchmark English criminal case establishing that necessity is not a defense to a charge of murder. 
            </p>
            <a 
              href="https://www.bailii.org/ew/cases/EWHC/QB/1884/2.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block text-xs font-semibold text-amber-400 hover:underline"
            >
              Read full judgment text on BAILII &rarr;
            </a>
          </div>
        )}

        {/* WEEK 2: Cross-Examination Analysis */}
        {activeWeek === 2 && (
          <div className="p-6 rounded-xl bg-black/40 border border-zinc-800 space-y-4">
            <h3 className="text-lg font-serif text-amber-300">Critical Cross-Examination</h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Examine how legal scholars cross-examine the necessity ruling in <em>Dudley & Stephens</em>, exploring whether moral dilemmas undermine strict legal positivism.
            </p>
            <div className="p-4 rounded-lg bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-400">
              <strong>Expert Commentary Analysis:</strong> Academic critique highlights the tension between utilitarian survival ethics and the inviolability of human life in Victorian maritime law.
            </div>
          </div>
        )}

        {/* WEEK 3: 500-Word Case Note Editor */}
        {activeWeek === 3 && (
          <div className="space-y-4">
            <textarea
              rows={8}
              value={caseNote}
              onChange={(e) => setCaseNote(e.target.value)}
              placeholder="Draft your structured, 500-word academic synthesis arguing your position based on the evidence..."
              className="w-full p-4 rounded-xl bg-black/50 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-amber-500 text-sm font-sans"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-500">
                Word count: {caseNote.trim() ? caseNote.trim().split(/\s+/).length : 0} / 500 words
              </span>
              <button
                onClick={handleSaveNote}
                disabled={saving}
                className="px-6 py-3 rounded-xl bg-amber-400 text-zinc-950 font-semibold hover:bg-amber-300 transition-colors disabled:opacity-50 text-sm"
              >
                {saving ? "Saving to Neon..." : "Save Case Note"}
              </button>
            </div>
            {savedMessage && <p className="text-xs text-amber-300">{savedMessage}</p>}
          </div>
        )}

        {/* WEEK 4: AI Interview Simulator Room */}
        {activeWeek === 4 && (
          <div className="space-y-4">
            <div className="h-64 overflow-y-auto p-4 rounded-xl bg-black/60 border border-zinc-800 space-y-3">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-xl text-sm max-w-[85%] ${
                    msg.role === "ai"
                      ? "bg-zinc-800 text-zinc-200 mr-auto border border-zinc-700"
                      : "bg-amber-500/20 text-amber-200 ml-auto border border-amber-500/30"
                  }`}
                >
                  <div className="text-[10px] uppercase font-semibold tracking-wider mb-1 text-zinc-400">
                    {msg.role === "ai" ? "Adversarial Panel" : "Your Defense"}
                  </div>
                  {msg.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your verbal defense..."
                className="flex-1 px-4 py-3 rounded-xl bg-black/50 border border-zinc-800 text-zinc-200 text-sm focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-amber-400 text-zinc-950 font-semibold hover:bg-amber-300 transition-colors text-sm"
              >
                Defend
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
