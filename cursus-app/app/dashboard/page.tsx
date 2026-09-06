import { auth } from "@clerk/nextjs/server";
import { getSprintsBySubject, getCaseNote } from "@/utils/queries";
import SprintInteractiveView from "./sprint/SprintInteractiveView";
import DynamicCourseSelector from "@/components/DynamicCourseSelector";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: { subject?: string; system?: string };
}) {
  const { userId } = await auth();

  // Default to Law / UCAS if no query params are selected yet
  const activeSubject = searchParams?.subject || "Law";
  const activeSystem = searchParams?.system || "UCAS (UK & Oxbridge)";

  // Fetch sprint steps from Neon Database for the active subject
  let sprints = await getSprintsBySubject(activeSubject);

  // Fallback default sprint if subject hasn't been generated yet
  if (!sprints || sprints.length === 0) {
    sprints = [
      {
        id: 1,
        subject: activeSubject,
        title: "Week 1: Read the Source",
        week_number: 1,
        description: `Analyze foundational primary material and landmark research in ${activeSubject}. Extract key thesis points and note methodology.`,
      },
      {
        id: 2,
        subject: activeSubject,
        title: "Week 2: Watch & Cross-Examine",
        week_number: 2,
        description: `Review secondary commentary, expert panel debates, or counter-arguments challenging the primary concepts of ${activeSubject}.`,
      },
      {
        id: 3,
        subject: activeSubject,
        title: "Week 3: Synthesize & Draft Case Note",
        week_number: 3,
        description: `Formulate an academic stance in a 500-word synthesis. Address key counter-arguments and defend your primary thesis.`,
      },
      {
        id: 4,
        subject: activeSubject,
        title: "Week 4: Defend Under Pressure (AI Interview)",
        week_number: 4,
        description: `Defend your synthesis in a live interrogation with an AI Admissions Tutor trained on Oxbridge and Ivy League interview standards.`,
      },
    ];
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header & Course Generator Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-800/80 pb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-white tracking-tight">
              Admissions Command Center
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Customized super-curricular sprints and admissions tracking for global candidates.
            </p>
          </div>

          {/* Dynamic Subject & University System Selector */}
          <DynamicCourseSelector currentSubject={activeSubject} currentSystem={activeSystem} />
        </div>

        {/* Requirements Banner Tailored to Selected System */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-zinc-900 to-zinc-900 border border-amber-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 rounded-full bg-amber-400 animate-pulse" />
            <div className="text-xs text-zinc-300">
              <strong className="text-amber-400 uppercase tracking-wider mr-2">{activeSystem} Active:</strong>
              {activeSystem.includes("UCAS") || activeSystem.includes("Oxbridge") ? (
                <span>Focusing on super-curricular depth, critical analysis, and academic interview readiness.</span>
              ) : activeSystem.includes("Common App") ? (
                <span>Structuring activities for the 10-slot Activity List and university-specific supplemental essays.</span>
              ) : (
                <span>Mapping requirements for international holistic evaluation and global entrance portfolios.</span>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Sprint View (Weeks 1 to 4) */}
        <div className="mt-8">
          <SprintInteractiveView sprints={sprints} />
        </div>

      </div>
    </div>
  );
}
