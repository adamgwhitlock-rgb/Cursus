import Exa from "exa-js";

const exa = new Exa(process.env.EXA_API_KEY);

export async function fetchLiveLegalResources(subject: string) {
  try {
    const result = await exa.searchAndContents(
      `foundational academic text or overview of ${subject}`,
      {
        type: "neural",
        numResults: 2,
        text: { maxCharacters: 1000 },
      }
    );

    return result.results || [];
  } catch (error) {
    console.error("Exa search error:", error);
    return [];
  }
}
