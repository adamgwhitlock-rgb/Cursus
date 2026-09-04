"use client";

import { useState } from "react";
import { Pill, SectionLabel } from "./ui";

const PANELS = {
  ucas: {
    title: "UCAS personal statement tracker",
    rows: [
      ["Character count", "2,840 / 4,000"],
      ["Supercurricular evidence linked", "6 entries"],
      ["Draft stage", "Second draft"],
      ["Reference status", "Requested from tutor"],
    ],
  },
  commonapp: {
    title: "Common App activities & essays",
    rows: [
      ["Activities list", "7 / 10 entries"],
      ["Additional Info essay", "In progress"],
      ["Why-this-college supplements", "2 of 5 drafted"],
      ["Word limit per activity", "150 characters"],
    ],
  },
} as const;

export default function DualSystemSection() {
  const [sys, setSys] = useState<"ucas" | "commonapp">("ucas");
  const panel = PANELS[sys];

  return (
    <section className="px-6 md:pl-24 md:pr-12 py-16 max-w-6xl mx-auto">
      <SectionLabel>One profile, two systems</SectionLabel>
      <h2 className="font-serif text-3xl md:text-4xl mb-3 text-ivory font-medium">
        Built for UCAS and the Common App, not just one of them.
      </h2>
      <p className="mb-8 max-w-xl text-muted">
        The same sprint work gets reframed differently depending on where
        it&apos;s headed — a UK personal statement and a US activities list
        reward completely different things.
      </p>

      <div className="flex gap-2 mb-6">
        <Pill active={sys === "ucas"} onClick={() => setSys("ucas")}>
          UCAS
        </Pill>
        <Pill active={sys === "commonapp"} onClick={() => setSys("commonapp")}>
          Common App
        </Pill>
      </div>

      <div className="rounded-xl p-6 md:p-8 max-w-xl bg-panel border border-hairline">
        <div className="text-sm mb-5 text-muted2">{panel.title}</div>
        <div className="flex flex-col gap-4">
          {panel.rows.map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between text-sm pb-4 border-b border-hairline"
            >
              <span className="text-muted">{label}</span>
              <span className="text-ivory">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
