import { ReactNode } from "react";
import { Check } from "lucide-react";
import { PrimaryButton, GhostButton, SectionLabel } from "./ui";

function PricingCard({
  name,
  price,
  period,
  blurb,
  features,
  highlighted,
}: {
  name: string;
  price: string;
  period: string;
  blurb: string;
  features: string[];
  highlighted?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-8 flex-1 bg-panel border ${
        highlighted ? "border-gold" : "border-hairline"
      }`}
      style={highlighted ? { boxShadow: "0 0 32px rgba(216,180,92,0.13)" } : undefined}
    >
      {highlighted && (
        <div className="text-xs mb-4 inline-block px-2.5 py-1 rounded-full text-gold border border-gold/40">
          Most chosen
        </div>
      )}
      <div className="font-serif text-xl text-ivory">{name}</div>
      <div className="flex items-baseline gap-2 my-4">
        <span className="font-serif text-4xl text-ivory">{price}</span>
        <span className="text-sm text-muted">{period}</span>
      </div>
      <p className="mb-6 text-sm text-muted">{blurb}</p>
      <div className="flex flex-col gap-3 mb-8">
        {features.map((f) => (
          <div key={f} className="flex items-start gap-2 text-sm">
            <Check
              size={15}
              className={`mt-0.5 flex-shrink-0 ${highlighted ? "text-gold" : "text-muted"}`}
            />
            <span className="text-ivory">{f}</span>
          </div>
        ))}
      </div>
      {highlighted ? (
        <PrimaryButton className="w-full">Start this plan</PrimaryButton>
      ) : (
        <GhostButton className="w-full">Start this plan</GhostButton>
      )}
    </div>
  );
}

export default function PricingSection() {
  return (
    <section className="px-6 md:pl-24 md:pr-12 py-16 max-w-6xl mx-auto">
      <SectionLabel>Pricing</SectionLabel>
      <h2 className="font-serif text-3xl md:text-4xl mb-10 text-ivory font-medium">
        Illustrative pricing — set your own before launch.
      </h2>
      <div className="flex flex-col md:flex-row gap-6">
        <PricingCard
          name="Roadmap"
          price="£8"
          period="/ month"
          blurb="Full sprint library and dual-system tracking, for students working independently."
          features={[
            "Every subject sprint",
            "UCAS and Common App tracking",
            "3 interview simulator sessions / month",
            "Progress tracker",
          ]}
        />
        <PricingCard
          name="Roadmap + Mentor"
          price="£16"
          period="/ month"
          blurb="Everything in Roadmap, with unlimited interview practice and priority sprint customisation."
          features={[
            "Everything in Roadmap",
            "Unlimited interview simulator sessions",
            "Custom sprint requests",
            "One 1:1 strategy call per term",
          ]}
          highlighted
        />
      </div>
    </section>
  );
}
