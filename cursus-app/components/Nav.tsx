import { PrimaryButton } from "./ui";

export default function Nav() {
  return (
    <div className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-hairline">
      <div className="flex items-center gap-3">
        <div className="font-serif text-xl text-ivory">Cursus</div>
        <span className="hidden lg:inline-block text-xs text-muted2 border-l border-hairline pl-3">
          AI Super-Curricular Roadmap
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm text-muted">
        <span>Sprints</span>
        <span>Interview simulator</span>
        <span>Pricing</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline text-sm text-muted cursus-focus">
          Log in
        </span>
        <PrimaryButton>Start free</PrimaryButton>
      </div>
    </div>
  );
}
