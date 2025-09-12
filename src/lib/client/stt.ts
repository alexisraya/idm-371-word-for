export async function speechToText(audioBlob: Blob) {
  const fd = new FormData();
  fd.append(
    "audio",
    new File([audioBlob], "audio.webm", {
      type: audioBlob.type || "audio/webm",
    })
  );
  const res = await fetch("/api/stt", { method: "POST", body: fd });
  if (!res.ok) throw new Error(await res.text());
  return res.text();
}
