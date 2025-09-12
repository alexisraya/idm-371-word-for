<script lang="ts">
  import { onDestroy, createEventDispatcher } from "svelte";
  import RemixIcon from "./RemixIcon.svelte";

  export let phrase = "";
  export let voice = "alloy";
  export let color = "#141414";

  const dispatch = createEventDispatcher();

  let isAudioPlaying = false;
  let isLoading = false;
  let objectUrl: string | null = null;
  let audio: HTMLAudioElement | null = null;

  async function textToSpeechClient(
    text: string,
    voice = "alloy"
  ): Promise<string> {
    const res = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, voice }),
    });
    if (!res.ok) throw new Error(await res.text());
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  }

  async function handleSpeak() {
    if (!phrase.trim() || isAudioPlaying || isLoading) return;

    try {
      isLoading = true;

      if (!objectUrl) {
        objectUrl = await textToSpeechClient(phrase, voice);
        // optional: let parent know we have an audio URL
        dispatch("ready", { url: objectUrl, phrase, voice });
      }

      if (audio) {
        audio.pause();
        audio = null;
      }

      audio = new Audio(objectUrl);
      audio.onended = () => (isAudioPlaying = false);
      audio.onerror = () => (isAudioPlaying = false);
      isAudioPlaying = true;
      await audio.play();
    } catch (e) {
      console.error("TTS error", e);
    } finally {
      isLoading = false;
    }
  }

  // reset audio if phrase or voice changes
  let lastKey = "";
  $: {
    const key = `${phrase}::${voice}`;
    if (key !== lastKey) {
      if (audio) {
        audio.pause();
        audio = null;
      }
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
        objectUrl = null;
      }
      isAudioPlaying = false;
      lastKey = key;
    }
  }

  onDestroy(() => {
    if (audio) {
      audio.pause();
      audio = null;
    }
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      objectUrl = null;
    }
  });
</script>

<button
  aria-label="Play pronunciation"
  on:click={handleSpeak}
  disabled={!phrase.trim() || isAudioPlaying || isLoading}
>
  {#if isLoading}
    <RemixIcon name="volume-up-line" color="#595959" />
  {:else if isAudioPlaying}
    <RemixIcon name="volume-up-fill" />
  {:else}
    <RemixIcon name="volume-up-line" {color} />
  {/if}
</button>

<style>
  button {
    border: 0;
    padding: 0;
    margin: 0;
    background-color: transparent;
  }

  button:hover {
    cursor: pointer;
  }
</style>
