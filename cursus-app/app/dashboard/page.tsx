// @ts-nocheck
import { auth } from "@clerk/nextjs/server";
import { fetchSprintResources } from "@/utils/exa";
import SprintInteractiveView from "./sprint/SprintInteractiveView";
import DynamicCourseSelector from "@/components/DynamicCourseSelector";
import InterviewPrepModule from "@/components/InterviewPrepModule";
import ApplicationSupportModule from "@/components/ApplicationSupportModule";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: { subject?: string; system?: string; university?: string; country?: string };
}) {
  const { userId } = await auth();

  const activeSubject = searchParams?.subject || "Law";
  const activeSystem = searchParams?.system || "UCAS (UK & Oxbridge)";
  const activeUniversity = searchParams?.university || "University of Oxford";
  const activeCountry = searchParams?.country || "United Kingdom";

  const exaData = await fetchSprintResources(activeSubject, activeSystem, activeUniversity, activeCountry);

  const sanitizeText = (rawText: string, fallback: string) => {
    if (!rawText) return fallback;
    const cleaned = rawText.replace(/([#*_[\]]|Copyright ©.*|Contents.*)/g, "").trim();
    return cleaned.length > 250 ? cleaned.substring(0, 250) + "..." : cleaned;
  };

  const sprints = [
    {
      id: 1,
      subject: activeSubject,
      title: `Week 1: Primary Source (${activeUniversity})`,
      week_number: 1,
      description: sanitizeText(exaData?.week1Source?.text || exaData?.week1Source?.snippet, `Analyze foundational primary material for ${activeSubject} at ${activeUniversity}.`),
      sourceUrl: exaData?.week1Source?.url || null,
      sourceTitle: exaData?.week1Source?.title || `${activeUniversity} Source Material`,
    },
    {
      id: 2,
      subject: activeSubject,
      title: "Week 2: Faculty Counter-Arguments",
      week_number: 2,
      description: sanitizeText(exaData?.week2Critique?.text || exaData?.week2Critique?.snippet, `Review commentary and critical debates for ${activeSubject}.`),
      sourceUrl: exaData?.week2Critique?.url || null,
      sourceTitle: exaData?.week2Critique?.title || "Academic Critique",
    },
    {
      id: 3,
      subject: activeSubject,
      title: "Week 3: Synthesize & Draft Case Note",
      week_number: 3,
      description: `Formulate a 500-word academic synthesis tailored to ${activeUniversity}'s entry standards.`,
    },
    {
      id: 4,
      subject: activeSubject,
      title: `Week 4: Live ${activeUniversity} Interview Simulation`,
      week_number: 4,
      description: `Defend your synthesis in a live interrogation with an AI Admissions Tutor trained on ${activeUniversity} and ${activeCountry} standards.`,
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 font-sans space-y-12">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header & Course Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-800/80 pb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-white tracking-tight">
              Admissions Command Center
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Customized super-curricular sprints, interview prep, and application tracking for global candidates.
            </p>
          </div>

          <DynamicCourseSelector
            currentSubject={activeSubject}
            currentSystem={activeSystem}
            currentUniversity={activeUniversity}
            currentCountry={activeCountry}
          />
        </div>

        {/* Target Banner */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-zinc-900 to-zinc-900 border border-amber-500/20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 rounded-full bg-amber-400 animate-pulse" />
            <div className="text-xs text-zinc-300">
              <strong className="text-amber-400 uppercase tracking-wider mr-2">{activeUniversity} ({activeCountry}):</strong>
              <span>Targeting super-curricular depth for {activeSubject} under {activeSystem}.</span>
            </div>
          </div>
        </div>

        {/* Section 1: Super-Curricular 4-Week Sprint */}
        <section className="space-y-4">
          <div className="border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-serif text-white">1. Super-Curricular Sprint</h2>
          </div>
          <SprintInteractiveView sprints={sprints} />
        </section>

        {/* Section 2: Institution-Specific Interview Prep */}
        <section className="space-y-4">
          <div className="border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-serif text-white">2. Interview Preparation & Strategy</h2>
          </div>
          <InterviewPrepModule
            university={activeUniversity}
            country={activeCountry}
            subject={activeSubject}
            system={activeSystem}
          />
        </section>

        {/* Section 3: Application System Tracker */}
        <section className="space-y-4">
          <div className="border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-serif text-white">3. Application System Support</h2>
          </div>
          <ApplicationSupportModule
            system={activeSystem}
            university={activeUniversity}
            subject={activeSubject}
          />
        </section>

      </div>
    </div>
  );
}
