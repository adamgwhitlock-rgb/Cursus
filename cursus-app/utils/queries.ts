import sql from "@/utils/db";

export interface Sprint {
  id: number;
  subject: string;
  title: string;
  week_number: number;
  description: string;
}

export async function getSprints(): Promise<Sprint[]> {
  try {
    const sprints = await sql<Sprint[]>`SELECT * FROM sprints ORDER BY week_number ASC`;
    return sprints;
  } catch (error) {
    console.error("Failed to fetch sprints:", error);
    return [];
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
