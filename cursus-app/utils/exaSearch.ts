import Exa from "exa-js";

const exa = new Exa(process.env.EXA_API_KEY || "");

export async function fetchLiveLegalResources(topic: string, weekNumber: number) {
  const query = weekNumber === 1
    ? `landmark judicial judgment legal ruling primary text ${topic}`
    : `appellate court oral argument legal analysis commentary ${topic}`;

  try {
    const result = await exa.search(query, {
      type: "auto",
      numResults: 3,
      contents: {
        highlights: true,
      },
    });

    return result.results.map((r: any) => ({
      title: r.title,
      url: r.url,
      snippet: r.highlights?.[0] || "Verified live legal reference document.",
    }));
  } catch (error) {
    console.error("Exa search error:", error);
    return [];
  }
}
