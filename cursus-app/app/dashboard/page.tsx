// @ts-nocheck
import { auth } from "@clerk/nextjs/server";
import { fetchSprintResources } from "@/utils/exa";
import SprintInteractiveView from "./sprint/SprintInteractiveView";
import DynamicCourseSelector from "@/components/DynamicCourseSelector";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: { subject?: string; system?: string };
}) {
  const { userId } = await auth();

  const activeSubject = searchParams?.subject || "Law";
  const activeSystem = searchParams?.system || "UCAS (UK & Oxbridge)";

  const exaData = await fetchSprintResources(activeSubject);

  const sprints = [
    {
      id: 1,
      subject: activeSubject,
      title: "Week 1: Read the Source",
      week_number: 1,
      description: exaData?.week1Source?.text || exaData?.week1Source?.snippet || `Analyze foundational primary material in ${activeSubject}.`,
      sourceUrl: exaData?.week1Source?.url || null,
      sourceTitle: exaData?.week1Source?.title || "Primary Academic Source",
    },
    {
      id: 2,
      subject: activeSubject,
      title: "Week 2: Watch & Cross-Examine",
      week_number: 2,
      description: exaData?.week2Critique?.text || exaData?.week2Critique?.snippet || `Review secondary commentary and counter-arguments in ${activeSubject}.`,
      sourceUrl: exaData?.week2Critique?.url || null,
      sourceTitle: exaData?.week2Critique?.title || "Expert Commentary & Critique",
    },
    {
      id: 3,
      subject: activeSubject,
      title: "Week 3: Synthesize & Draft Case Note",
      week_number: 3,
      description: `Formulate an academic stance in a 500-word synthesis. Address counter-arguments and defend your thesis.`,
    },
    {
      id: 4,
      subject: activeSubject,
      title: "Week 4: Defend Under Pressure (AI Interview)",
      week_number: 4,
      description: `Defend your synthesis in a live interrogation with an AI Admissions Tutor.`,
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-800/80 pb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-white tracking-tight">
              Admissions Command Center
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Customized super-curricular sprints and admissions tracking for global candidates.
            </p>
          </div>

          <DynamicCourseSelector currentSubject={activeSubject} currentSystem={activeSystem} />
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-zinc-900 to-zinc-900 border border-amber-500/20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 rounded-full bg-amber-400 animate-pulse" />
            <div className="text-xs text-zinc-300">
              <strong className="text-amber-400 uppercase tracking-wider mr-2">{activeSystem} Active:</strong>
              <span>Targeting super-curricular depth and live Exa resources for {activeSubject}.</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <SprintInteractiveView sprints={sprints} />
        </div>

      </div>
    </div>
  );
}
