"use client";

import { useState, useEffect } from "react";

export default function IntroTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("cursus_intro_seen");
    if (!hasSeenTour) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("cursus_intro_seen", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  const steps = [
    {
      title: "Welcome to your Admissions Command Center",
      description: "Cursus is designed to build rigorous super-curricular profiles for Oxbridge, Ivy League, and global university applications.",
    },
    {
      title: "1. Choose Your Target",
      description: "Use the top header to type your degree course (e.g., Theology, Astrophysics, Law) and select your target system (UCAS, Common App, or Global).",
    },
    {
      title: "2. Read Live Exa Sources",
      description: "Weeks 1 and 2 dynamically pull primary academic texts and critical commentaries straight from the web to deepen your subject expertise.",
    },
    {
      title: "3. Draft & Defend",
      description: "Write your 500-word synthesis in Week 3, then step into the live AI Admissions Tutor interrogation room in Week 4.",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-2xl max-w-lg w-full relative shadow-2xl">
        <span className="text-[10px] uppercase tracking-widest text-amber-400 font-mono font-semibold">
          Step {step} of {steps.length}
        </span>
        <h2 className="text-2xl font-serif text-white mt-2 mb-3">{steps[step - 1].title}</h2>
        <p className="text-zinc-400 text-sm leading-relaxed mb-8">{steps[step - 1].description}</p>

        <div className="flex items-center justify-between border-t border-zinc-800/80 pt-4">
          <button
            onClick={handleClose}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Skip Tour
          </button>
          <div className="flex gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-300 hover:bg-zinc-800"
              >
                Back
              </button>
            )}
            {step < steps.length ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-2 rounded-xl bg-amber-500 text-amber-950 text-xs font-bold hover:bg-amber-400 transition-all"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleClose}
                className="px-6 py-2 rounded-xl bg-amber-500 text-amber-950 text-xs font-bold hover:bg-amber-400 transition-all"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
