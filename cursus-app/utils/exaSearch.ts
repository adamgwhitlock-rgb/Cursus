import Exa from "exa-js";

const exa = new Exa(process.env.EXA_API_KEY);

export async function fetchSprintResources(subject: string) {
  try {
    // Broaden the search query so Exa easily matches academic articles or introductory texts
    const week1Result = await exa.searchAndContents(
      `foundational text or core overview of ${subject} academic discipline`,
      {
        type: "neural",
        numResults: 1,
        text: { maxCharacters: 1000 },
      }
    );

    const week2Result = await exa.searchAndContents(
      `critical perspective debate or counter argument in ${subject}`,
      {
        type: "neural",
        numResults: 1,
        text: { maxCharacters: 1000 },
      }
    );

    return {
      week1Source: week1Result.results[0] || null,
      week2Critique: week2Result.results[0] || null,
    };
  } catch (error) {
    console.error("Exa search error:", error);
    return null;
  }
}
