// @ts-nocheck
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { messages, caseNote, subject, system } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Customize system prompt based on admissions framework
    const persona = system?.includes("US") 
      ? "You are an Ivy League Admissions Officer evaluating intellectual vitality, extracurricular leadership depth, and personal voice." 
      : system?.includes("Global") 
      ? "You are an international university admissions panelist evaluating cross-cultural academic reasoning." 
      : "You are an Oxbridge Professor conducting a rigorous subject interview.";

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: `Here is my academic synthesis on ${subject} for my ${system} application: "${caseNote}"` }],
        },
        {
          role: "model",
          parts: [{ text: `Thank you. ${persona} Let's begin the defense of your thesis.` }],
        },
      ],
    });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ role: "assistant", content: text }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Interview API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to process interview response" }), {
      status: 500,
    });
  }
}
