import Exa from "exa-js";

const exa = new Exa(process.env.EXA_API_KEY);

export async function fetchSprintResources(
  subject: string,
  system: string = "UCAS",
  university: string = "University of Oxford",
  country: string = "United Kingdom"
) {
  try {
    const week1Result = await exa.searchAndContents(
      `primary source reading list ${subject} ${university} ${country}`,
      {
        type: "neural",
        numResults: 1,
        text: { maxCharacters: 1000 },
      }
    );

    const week2Result = await exa.searchAndContents(
      `interview critique counter argument ${subject} ${university}`,
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
