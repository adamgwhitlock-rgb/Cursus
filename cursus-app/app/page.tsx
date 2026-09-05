import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Nav() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-ink">
      <Link href="/" className="font-serif text-xl tracking-tight text-ivory">
        Cursus
      </Link>

      <nav className="hidden md:flex items-center gap-6 text-sm text-ivory/80">
        <Link href="/dashboard/sprint" className="hover:text-amber-400 transition-colors">
          Sprints
        </Link>
        <Link href="/dashboard" className="hover:text-amber-400 transition-colors">
          Dashboard
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <SignedOut>
          <Link href="/sign-in" className="text-sm font-medium hover:text-amber-400">
            Log in
          </Link>
          <Link
            href="/sign-up"
            className="px-4 py-2 rounded-xl bg-amber-400 text-zinc-950 font-semibold hover:bg-amber-300 transition-colors text-sm"
          >
            Start free
          </Link>
        </SignedOut>
        <SignedIn>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-amber-400 hover:underline"
          >
            My Dashboard
          </Link>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  );
}
