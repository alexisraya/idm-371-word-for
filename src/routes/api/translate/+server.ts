import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { openai } from '$lib/server/openai';
import { translationSchema, type TranslationResult } from '$lib/translationSchema';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { phrase, origin, translateLang, contexts = "", regions = "" } = await request.json();

    const ctx = contexts?.trim() || "casual";
    const regionText = /^all regions$/i.test(regions?.trim() || "")
      ? "any commonly used regions"
      : (regions || "any region");

    const system =
      "Return ONLY JSON matching the provided schema. No extra text.";
    const user = 
      `Return up to 3 ${ctx} translations of "${phrase}" from ${origin} to ${translateLang} used in ${regionText}. Each item must include: translation, part_of_speech, definition, region="${regionText}", context="${ctx}", original_language="${origin}", translate_language="${translateLang}", phonetic_spelling, and examples with source(${origin}) and target(${translateLang}).`;

    const r = await openai.chat.completions.create({
      model: process.env.GPT_MODEL ?? "gpt-4.1-mini",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "translation_results",
          strict: true,
          schema: translationSchema
        }
      },
    });

    const choice = r.choices?.[0];
    const content = choice?.message?.content ?? "";

    // If the model returned nothing, surface diagnostics instead of crashing JSON.parse
    if (!content.trim()) {
      return json(
        {
          error: "Empty content from model",
          finish_reason: choice?.finish_reason ?? null,
          usage: r.usage ?? null
        },
        { status: 502 }
      );
    }

    // If you see "length" a lot, reduce items to 2 or raise the token cap slightly
    if (choice?.finish_reason === "length") {
      console.warn("Model stopped due to token limit.", r.usage);
    }

    const parsed = JSON.parse(content) as TranslationResult;
    return json(parsed);
  } catch (err: any) {
    return json({ error: err?.message ?? "Translation failed" }, { status: 500 });
  }
};
