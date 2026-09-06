import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, caseNote, subject } = await req.json();

    const systemPrompt = `
You are an elite, rigorous admissions tutor at Oxford University interviewing a candidate for ${subject || 'Law'}.
The candidate has submitted the following 500-word case note/synthesis:

"${caseNote || 'No case note submitted.'}"

Your directive:
1. Cross-examine the specific arguments, flaws, or assumptions made in their case note.
2. NEVER ask generic questions (e.g., "Why do you want to study this?").
3. Push back hard on their logic. If they make a claim, ask them to defend it against a specific counter-example.
4. Keep your responses concise (2-3 sentences max) to simulate rapid-fire interview pressure.
5. Maintain a cold, academic, intellectually demanding tone.
    `;

    const result = streamText({
      model: openai('gpt-4o'),
      system: systemPrompt,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Interview API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate response" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
