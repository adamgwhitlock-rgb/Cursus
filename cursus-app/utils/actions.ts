'use server';

import sql from "@/utils/db";
import { auth } from "@clerk/nextjs/server";

export async function saveCaseNote(sprintId: number, weekNumber: number, noteText: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    await sql`
      INSERT INTO user_progress (user_id, sprint_id, week_number, status, case_note, updated_at)
      VALUES (${userId}, ${sprintId}, ${weekNumber}, 'completed', ${noteText}, CURRENT_TIMESTAMP)
      ON CONFLICT (user_id, sprint_id, week_number) 
      DO UPDATE SET case_note = ${noteText}, status = 'completed', updated_at = CURRENT_TIMESTAMP;
    `;
    return { success: true };
  } catch (error) {
    console.error("Failed to save case note:", error);
    return { success: false, error: "Database save failed" };
  }
}
