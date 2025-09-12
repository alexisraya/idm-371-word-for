import type { RequestHandler } from './$types';
import { openai } from '$lib/server/openai';

export const POST: RequestHandler = async ({ request }) => {
  const form = await request.formData();
  const file = form.get("audio") as File; // audio/* Blob

  const t = await openai.audio.transcriptions.create({
    model: "gpt-4o-mini-transcribe",
    file
  });

  return new Response(t.text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
