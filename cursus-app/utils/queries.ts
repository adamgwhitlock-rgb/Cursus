import sql from "./db";
import { fetchSprintResources } from "./exa";

export async function getCaseNote(userId: string, subject: string) {
  try {
    const notes = await sql`
      SELECT * FROM case_notes
      WHERE user_id = ${userId} AND subject = ${subject}
      ORDER BY created_at DESC
      LIMIT 1;
    `;
    return notes[0] || null;
  } catch (error) {
    console.error("Failed to fetch case note:", error);
    return null;
  }
}

export async function getSprintsBySubject(subject: string) {
  try {
    const sprints = await sql`
      SELECT * FROM sprints 
      WHERE subject = ${subject} 
      ORDER BY week_number ASC;
    `;
    
    // If database has records for this subject, return them
    if (sprints && sprints.length > 0) {
      return sprints;
    }

    // Otherwise, dynamically generate the 4-week sprint using live Exa web search!
    const exaData = await fetchSprintResources(subject);

    return [
      {
        id: 1,
        subject: subject,
        title: "Week 1: Read the Source",
        week_number: 1,
        description: exaData?.week1Source?.snippet || `Analyze foundational primary material and landmark research in ${subject}.`,
        sourceUrl: exaData?.week1Source?.url || null,
        sourceTitle: exaData?.week1Source?.title || "Primary Academic Source",
      },
      {
        id: 2,
        subject: subject,
        title: "Week 2: Watch & Cross-Examine",
        week_number: 2,
        description: exaData?.week2Critique?.snippet || `Review secondary commentary and counter-arguments challenging core concepts in ${subject}.`,
        sourceUrl: exaData?.week2Critique?.url || null,
        sourceTitle: exaData?.week2Critique?.title || "Expert Commentary & Critique",
      },
      {
        id: 3,
        subject: subject,
        title: "Week 3: Synthesize & Draft Case Note",
        week_number: 3,
        description: `Formulate an academic stance in a 500-word synthesis. Address key counter-arguments and defend your thesis.`,
      },
      {
        id: 4,
        subject: subject,
        title: "Week 4: Defend Under Pressure (AI Interview)",
        week_number: 4,
        description: `Defend your synthesis in a live interrogation with an AI Admissions Tutor trained on Oxbridge/Ivy League standards.`,
      },
    ];
  } catch (error) {
    console.error("Database Error: Failed to fetch sprints", error);
    return []; 
  }
}
