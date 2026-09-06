import Exa from "exa-js";

const exa = new Exa(process.env.EXA_API_KEY || "");

export async function fetchLiveLegalResources(topic: string, weekNumber: number) {
  // Target digestible case summaries, blog breakdowns, and expert commentary
  const query = weekNumber === 1
    ? `accessible case summary legal analysis explanation ${topic}`
    : `appellate court commentary expert legal blog analysis ${topic}`;

  try {
    const result = await exa.search(query, {
      type: "auto",
      numResults: 3,
      // Restrict results strictly to free, high-quality, open-access educational sources
      includeDomains: [
        "law.ox.ac.uk",       // Oxford Law Faculty Blog (peer commentary)
        "theconversation.com", // Rigorous academic journalism accessible to post-16 students
        "supremecourt.uk",    // Official case summaries (concise, non-book length)
        "parliament.uk",      // UK Parliament research briefings
      ],
      contents: {
        highlights: true,
      },
    } as any);

    return (result.results || []).map((r: any) => ({
      title: r.title,
      url: r.url,
      snippet: r.highlights?.[0] || r.text?.substring(0, 200) || "Verified open-access legal commentary.",
    }));
  } catch (error) {
    console.error("Exa search error:", error);
    return [];
  }
}
