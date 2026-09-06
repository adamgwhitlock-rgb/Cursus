import sql from "@/utils/db";

export async function getSprints() {
  try {
    const sprints = await sql`SELECT * FROM sprints ORDER BY week_number ASC`;
    return sprints;
  } catch (error) {
    console.error("Failed to fetch sprints:", error);
    return [];
  }
}

export async function getResourcesForSprint(sprintId: number) {
  try {
    const resources = await sql`
      SELECT * FROM resources 
      WHERE sprint_id = ${sprintId} AND is_active = true
    `;
    return resources;
  } catch (error) {
    console.error("Failed to fetch resources:", error);
    return [];
  }
}
