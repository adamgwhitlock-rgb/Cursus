import Exa from "exa-js";

const exa = new Exa(process.env.EXA_API_KEY);

export async function fetchSprintResources(subject: string, system: string = "UCAS") {
  try {
    // Tailor search context based on whether it's UK, US, or International
    const systemPrompt = system.includes("Common App") || system.includes("US") 
      ? "US holistic admissions faculty reading list" 
      : system.includes("Global") || system.includes("European") 
      ? "international university entrance criteria academic reading" 
      : "Oxbridge super-curricular reading list";

    const week1Result = await exa.searchAndContents(
      `foundational text ${subject} ${systemPrompt}`,
      {
        type: "neural",
        numResults: 1,
        text: { maxCharacters: 1000 },
      }
    );

    const week2Result = await exa.searchAndContents(
      `critical perspective debate or interview question for ${subject} admissions`,
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
    console.error("Exa global search error:", error);
    return null;
  }
}
