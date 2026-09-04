import { SectionLabel } from "./ui";

const ROWS: [string, string, string][] = [
  ["Format", "A searchable library of 5,000+ links", "A four-week guided sprint per subject"],
  ["Feedback", "A reflection text box you fill in alone", "An AI tutor that responds to what you wrote"],
  ["Interview prep", "Not included", "A timed simulator with live feedback"],
  ["Application systems", "UCAS personal statement", "UCAS and the US Common App"],
];

export default function CompareSection() {
  return (
    <section className="px-6 md:pl-24 md:pr-12 py-16 max-w-6xl mx-auto">
      <SectionLabel>How it&apos;s different</SectionLabel>
      <h2 className="font-serif text-3xl md:text-4xl mb-10 text-ivory font-medium">
        Less searching. More doing.
      </h2>
      <div className="border border-hairline rounded-xl overflow-hidden">
        <div className="grid grid-cols-3 text-sm px-6 py-4 bg-panel2 text-muted2">
          <div />
          <div>Library search engine</div>
          <div className="text-gold">Cursus</div>
        </div>
        {ROWS.map(([label, a, b], i) => (
          <div
            key={label}
            className={`grid grid-cols-3 text-sm px-6 py-5 border-t border-hairline ${
              i % 2 ? "" : "bg-panel"
            }`}
          >
            <div className="text-ivory">{label}</div>
            <div className="text-muted">{a}</div>
            <div className="text-ivory">{b}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
