import type { RequestHandler } from './$types';
import { openai } from '$lib/server/openai';

export const POST: RequestHandler = async ({ request }) => {
  const { text, voice = "alloy" } = await request.json();

  const audio = await openai.audio.speech.create({
    model: "gpt-4o-mini-tts",
    voice,
    input: text
  });

  const buf = Buffer.from(await audio.arrayBuffer());
  return new Response(buf, { headers: { "Content-Type": "audio/mpeg" } });
};
