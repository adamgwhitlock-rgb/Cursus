// @ts-nocheck
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages, caseNote, subject, system } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY || "";

    const persona = system?.includes("US") 
      ? "You are an Ivy League Admissions Officer evaluating intellectual vitality, extracurricular leadership depth, and personal voice." 
      : system?.includes("Global") 
      ? "You are an international university admissions panelist evaluating cross-cultural academic reasoning." 
      : "You are an Oxbridge Professor conducting a rigorous subject interview.";

    const systemInstruction = `You are an expert university admissions tutor conducting an interview simulation for a candidate applying for ${subject || "their chosen subject"} under the ${system || "UCAS"} system. ${persona} Keep responses focused, challenging, concise, and academic. Ask one sharp follow-up question at a time. Candidate's initial synthesis: "${caseNote || "None provided"}"`;

    const formattedMessages = (messages || []).map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }]
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemInstruction }]
          },
          contents: formattedMessages.length > 0 ? formattedMessages : [{ role: "user", parts: [{ text: "Hello" }] }]
        })
      }
    );

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Thank you. Could you elaborate further on your core argument?";

    return new Response(replyText, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("Interview API Error:", error);
    return new Response("Could you defend the central thesis of your synthesis under further scrutiny?", {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
