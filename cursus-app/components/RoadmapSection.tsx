"use client";

import { useState } from "react";
import { BookOpen, PlayCircle, PenSquare, MessagesSquare, Check } from "lucide-react";
import { SUBJECTS, ROADMAPS, Subject, WeekType } from "@/lib/content";
import { Pill, SectionLabel } from "./ui";

const TYPE_META: Record<WeekType, { icon: typeof BookOpen; label: string }> = {
  read: { icon: BookOpen, label: "Read" },
  watch: { icon: PlayCircle, label: "Watch" },
  analyse: { icon: PenSquare, label: "Write" },
  discuss: { icon: MessagesSquare, label: "Discuss" },
};

export default function RoadmapSection() {
  const [subject, setSubject] = useState<Subject>("law");
  const [expanded, setExpanded] = useState(0);
  const [done, setDone] = useState<Record<string, boolean>>({});

  const data = ROADMAPS[subject];
  const doneCount = data.weeks.filter((_, i) => done[`${subject}-${i}`]).length;
  const pct = Math.round((doneCount / data.weeks.length) * 100);
  const activeWeek = data.weeks[expanded];
  const activeKey = `${subject}-${expanded}`;

  return (
    <section className="px-6 md:pl-24 md:pr-12 py-16 max-w-6xl mx-auto">
      <SectionLabel>The sprint</SectionLabel>
      <h2 className="font-serif text-3xl md:text-4xl mb-3 text-ivory font-medium">
        Four weeks, one subject, a clear finish line.
      </h2>
      <p className="mb-8 max-w-xl text-muted">
        Not a library of five thousand links. One curated path, chosen for
        the subject you actually applied to study.
      </p>

      <div className="flex flex-wrap gap-3 mb-8">
        {SUBJECTS.map((s) => (
          <Pill
            key={s}
            active={s === subject}
            onClick={() => {
              setSubject(s);
              setExpanded(0);
            }}
          >
            {ROADMAPS[s].label}
          </Pill>
        ))}
      </div>

      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2 text-muted">
          <span>Sprint progress</span>
          <span className="text-gold">{pct}%</span>
        </div>
        <div className="w-full rounded-full h-1.5 overflow-hidden bg-panel2">
          <div
            className="h-full rounded-full glow-gold bg-gold transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-0 md:gap-2 mb-6">
        {data.weeks.map((week, i) => {
          const meta = TYPE_META[week.type];
          const Icon = meta.icon;
          const isDone = !!done[`${subject}-${i}`];
          const isExpanded = expanded === i;
          return (
            <div key={i} className="flex md:flex-1 items-stretch">
              <div className="flex md:flex-col items-center md:items-stretch gap-3 md:gap-0">
                <button
                  onClick={() => setExpanded(i)}
                  className={`cursus-focus flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center border transition-colors ${
                    isDone
                      ? "bg-gold border-gold glow-gold"
                      : isExpanded
                      ? "bg-gold/10 border-gold"
                      : "bg-panel2 border-hairline"
                  }`}
                >
                  {isDone ? (
                    <Check size={16} className="text-[#181203]" />
                  ) : (
                    <Icon size={16} className={isExpanded ? "text-gold" : "text-muted"} />
                  )}
                </button>
                <div className="w-px flex-1 md:hidden bg-hairline" style={{ minHeight: 12 }} />
                {i < data.weeks.length - 1 && (
                  <div className="hidden md:block h-px flex-1 mt-5 bg-hairline" />
                )}
              </div>
              <button
                onClick={() => setExpanded(i)}
                className="cursus-focus text-left flex-1 pb-6 md:pb-0 md:pt-3 md:px-3"
              >
                <div className="text-xs text-muted2">
                  Week {i + 1} · {meta.label}
                </div>
                <div className={`text-sm ${isExpanded ? "text-ivory" : "text-muted"}`}>
                  {week.title}
                </div>
              </button>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl p-6 bg-panel border border-hairline">
        <div className="text-sm mb-2 text-muted2">
          Week {expanded + 1} · {TYPE_META[activeWeek.type].label}
        </div>
        <div className="font-serif text-lg mb-3 text-ivory">{activeWeek.title}</div>
        <p className="mb-5 max-w-2xl text-muted">{activeWeek.body}</p>
        <button
          onClick={() => setDone((d) => ({ ...d, [activeKey]: !d[activeKey] }))}
          className={`cursus-focus text-sm px-4 py-2 rounded-lg border transition-colors ${
            done[activeKey]
              ? "border-gold text-gold bg-gold/10"
              : "border-hairline text-ivory"
          }`}
        >
          {done[activeKey] ? "Marked complete" : "Mark this week complete"}
        </button>
      </div>
    </section>
  );
}
