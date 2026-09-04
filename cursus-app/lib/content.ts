export const SUBJECTS = ["law", "medicine", "economics"] as const;
export type Subject = (typeof SUBJECTS)[number];

export type WeekType = "read" | "watch" | "analyse" | "discuss";

export interface Week {
  type: WeekType;
  title: string;
  body: string;
}

export interface Roadmap {
  label: string;
  weeks: Week[];
}

export const ROADMAPS: Record<Subject, Roadmap> = {
  law: {
    label: "Law",
    weeks: [
      {
        type: "read",
        title: "Read a live policy debate",
        body: "Read the Law Commission's current consultation on a reform you haven't studied in class. Note two arguments against reform that you don't find convincing, and why.",
      },
      {
        type: "watch",
        title: "Watch a case argued, not summarised",
        body: "Watch a full Supreme Court hearing on a case in your area of interest. Track the moment each barrister's argument gets tested hardest.",
      },
      {
        type: "analyse",
        title: "Write a 300-word case note",
        body: "Facts, reasoning, and why the case still matters today. This becomes evidence in your personal statement, not just a reading log entry.",
      },
      {
        type: "discuss",
        title: "Defend it under pressure",
        body: "Take your case note into the Interview Simulator and hold your reasoning up against a follow-up question you didn't prepare for.",
      },
    ],
  },
  medicine: {
    label: "Medicine",
    weeks: [
      {
        type: "read",
        title: "Read the evidence, not the headline",
        body: "Read a NICE guideline summary for a condition that interests you. List one thing about the underlying evidence base that surprised you.",
      },
      {
        type: "watch",
        title: "Watch real clinical reasoning",
        body: "Watch a published grand round or case discussion and track how the differential diagnosis narrows step by step.",
      },
      {
        type: "analyse",
        title: "Write a 300-word ethics reflection",
        body: "Connect one treatment decision to the four pillars of medical ethics. Where do they actually conflict, not just in theory?",
      },
      {
        type: "discuss",
        title: "Talk it through live",
        body: "Bring your reflection into the Interview Simulator and respond to a scenario question that pushes on the conflict you identified.",
      },
    ],
  },
  economics: {
    label: "Economics",
    weeks: [
      {
        type: "read",
        title: "Read a real forecast",
        body: "Read the latest Bank of England Monetary Policy Report summary. Identify one assumption underneath it you'd challenge.",
      },
      {
        type: "watch",
        title: "Watch a forecast get questioned",
        body: "Watch a central bank press conference and track how journalists' questions probe the weakest point in the forecast.",
      },
      {
        type: "analyse",
        title: "Write a 300-word applied note",
        body: "Apply one economic model to a real news story from this week. Where does the model stop being useful?",
      },
      {
        type: "discuss",
        title: "Defend your model",
        body: "Take your note into the Interview Simulator and defend your choice of model against a plausible counter-argument.",
      },
    ],
  },
};

export const INTERVIEW_QUESTIONS: Record<Subject, string[]> = {
  law: [
    "A new bylaw bans dogs from public parks to cut accidents. Who might challenge it in court, and on what grounds?",
    "Should judges be elected rather than appointed? Give the strongest argument against your own position.",
  ],
  medicine: [
    "A treatment is highly effective but carries a 1-in-500 chance of a severe side effect. How do you explain that risk to a frightened patient?",
    "Two patients need the same organ and resources are limited. What is actually being weighed up, beyond 'who is sicker'?",
  ],
  economics: [
    "Interest rates just rose sharply. Name one group that benefits and one that loses, and explain the mechanism, not just the outcome.",
    "A city bans a company from raising prices during a heatwave. What happens next that the ban doesn't account for?",
  ],
};
