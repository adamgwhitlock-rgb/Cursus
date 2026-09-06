import sql from "./db";

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
    
    return sprints;
  } catch (error) {
    console.error("Database Error: Failed to fetch sprints", error);
    // Returning null triggers the default fallback sprints we built into the dashboard
    return null; 
  }
}
