export async function textToSpeech(text: string) {
    const res = await fetch('/api/tts', { method: 'POST', body: JSON.stringify({ text }) });
    if (!res.ok) throw new Error(await res.text());
    const blob = await res.blob();
    return URL.createObjectURL(blob);
}
  