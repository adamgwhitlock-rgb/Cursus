import Exa from "exa-js";

const exa = new Exa(process.env.EXA_API_KEY);

export async function fetchLiveLegalResources(subject: string, week: number = 1) {
  try {
    const query = week === 1 
      ? `foundational academic text or overview of ${subject}`
      : `critical perspective debate or counter argument in ${subject}`;

    const result = await exa.searchAndContents(query, {
      type: "neural",
      numResults: 2,
      text: { maxCharacters: 1000 },
    });

    return result.results || [];
  } catch (error) {
    console.error("Exa search error:", error);
    return [];
  }
}
