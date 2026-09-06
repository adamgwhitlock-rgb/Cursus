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
}
