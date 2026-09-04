import { PrimaryButton, GhostButton } from "./ui";

const PREVIEW_STEPS = [
  "Read the source",
  "Watch it argued",
  "Write your case note",
  "Defend it live",
];

function HeroPreview() {
  return (
    <div className="rounded-2xl p-6 bg-panel border border-hairline">
      <div className="text-sm mb-5 text-muted">Your Law sprint</div>
      <div className="flex flex-col">
        {PREVIEW_STEPS.map((label, i) => {
          const active = i === 1;
          return (
            <div key={label} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full flex-shrink-0 border-[1.5px] ${
                    active ? "border-gold bg-gold glow-gold" : "border-muted2"
                  }`}
                />
                {i < PREVIEW_STEPS.length - 1 && (
                  <div className="w-px flex-1 bg-hairline" style={{ minHeight: 28 }} />
                )}
              </div>
              <div className={`pb-7 text-sm ${active ? "text-ivory" : "text-muted"}`}>
                <div className="text-muted2 text-xs">Week {i + 1}</div>
                {label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <div className="px-6 md:px-12 pt-16 pb-20 hero-in">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center max-w-6xl mx-auto">
        <div className="md:col-span-3">
          <div className="text-sm mb-6 text-muted2">
            For sixth form and international students, ages 16 to 18
          </div>
          <h1 className="font-serif text-4xl md:text-6xl leading-[1.1] mb-6 text-ivory font-medium">
            A guided route through your subject, all the way to the
            interview room.
          </h1>
          <p className="text-lg mb-8 max-w-xl text-muted">
            Cursus turns super-curricular reading into a short, structured
            sprint with an AI tutor on the other end of it. Built for UCAS
            and the Common App alike.
          </p>
          <div className="flex flex-wrap gap-4">
            <PrimaryButton>See your first sprint</PrimaryButton>
            <GhostButton>Compare with the library-search model</GhostButton>
          </div>
        </div>
        <div className="md:col-span-2">
          <HeroPreview />
        </div>
      </div>
    </div>
  );
}
