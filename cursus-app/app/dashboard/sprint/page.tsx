// @ts-nocheck
import { getSprintsBySubject } from "@/utils/queries";
import SprintInteractiveView from "./SprintInteractiveView";

export const dynamic = "force-dynamic";

export default async function SprintPage() {
  // Call the new function name and pass "Law" to it
  const sprints = await getSprintsBySubject("Law");

  return (
    <main className="min-h-screen p-8 md:p-16 bg-ink text-ivory">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif mb-2">Your Active Law Sprint</h1>
        <p className="text-ivory/70 mb-8 font-sans">
          Four weeks, one subject, a clear finish line—loaded live from your database.
        </p>

        <SprintInteractiveView sprints={sprints} />
      </div>
    </main>
  );
}
