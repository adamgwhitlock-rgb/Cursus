import { NextRequest, NextResponse } from "next/server";

// This route keeps the Anthropic API key server-side. Set ANTHROPIC_API_KEY
// in your Vercel project's Environment Variables (Settings > Environment Variables).
// Check https://docs.claude.com for the current model name before shipping —
// model identifiers are updated over time.

export async function POST(req: NextRequest) {
  const { subject, question, answer } = await req.json();

  if (!subject || !question) {
    return NextResponse.json(
      { error: "Missing subject or question." },
      { status: 400 }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not set on the server." },
      { status: 500 }
    );
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 400,
        system: `You are a warm but rigorous ${subject} admissions interviewer at a top university, giving feedback to a 17-year-old applicant who had 90 seconds to answer a quick-thinking question. In under 90 words of plain prose, no headers or bullet points: name one specific thing they did well, one gap in the reasoning, and one sharper follow-up question they should be ready for next time.`,
        messages: [
          {
            role: "user",
            content: `Question: ${question}\n\nStudent's answer: ${
              (answer ?? "").trim() || "(no answer given, ran out of time)"
            }`,
          },
        ],
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      return NextResponse.json(
        { error: "Anthropic API error", detail },
        { status: res.status }
      );
    }

    const data = await res.json();
    const text = (data.content ?? [])
      .filter((b: { type: string }) => b.type === "text")
      .map((b: { text: string }) => b.text)
      .join("\n")
      .trim();

    return NextResponse.json({ feedback: text || "No feedback returned." });
  } catch {
    return NextResponse.json(
      { error: "Failed to reach the Anthropic API." },
      { status: 502 }
    );
  }
}
