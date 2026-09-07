import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/" className="text-xl font-serif text-white tracking-tight hover:text-amber-400 transition-colors">
          Cursus
        </Link>
        <div className="flex items-center gap-4 text-xs font-sans">
          <Link href="/" className="text-zinc-400 hover:text-zinc-100 transition-colors">
            Landing Page
          </Link>
          <Link href="/dashboard" className="text-zinc-400 hover:text-zinc-100 transition-colors">
            Command Center
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
}
