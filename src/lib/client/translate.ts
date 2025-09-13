import type { TranslationResult } from "$lib/translationSchema";

export async function translatePhraseClient(payload: {
  phrase: string;
  origin: string;
  translateLang: string;
  contexts: string;
  regions: string;
}): Promise<TranslationResult> {
  const res = await fetch("/api/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
