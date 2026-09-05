import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();

  return (
    <main className="min-h-screen p-8 md:p-16 bg-ink text-ivory">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif mb-4">
          Welcome back, {user?.firstName || "Scholar"}
        </h1>
        <p className="text-ivory/80 font-sans mb-8">
          Here is your active super-curricular roadmap and sprint progress.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800">
            <h2 className="text-xl font-semibold mb-2">Active Sprint</h2>
            <p className="text-sm text-zinc-400">Week 2: Watch it argued</p>
          </div>
          <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800">
            <h2 className="text-xl font-semibold mb-2">Interview Simulator</h2>
            <p className="text-sm text-zinc-400">Ready for practice</p>
          </div>
        </div>
      </div>
    </main>
  );
}
