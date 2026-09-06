import Exa from "exa-js";

const exa = new Exa(process.env.EXA_API_KEY);

export async function fetchSprintResources(subject: string) {
  try {
    const week1Result = await exa.searchAndContents(
      `primary legal text seminal academic paper source ${subject}`,
      {
        type: "neural",
        numResults: 1,
        text: true,
      }
    );

    const week2Result = await exa.searchAndContents(
      `academic commentary critique counter-argument ${subject}`,
      {
        type: "neural",
        numResults: 1,
        text: true,
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
