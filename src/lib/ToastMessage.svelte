<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import RemixIcon from "./RemixIcon.svelte";

  export let message: string;
  let visible = true;

  onMount(async () => {
    setTimeout(() => {
      visible = false;
    }, 3000);
  });
</script>

{#if visible}
  <article class="toast-container" role="alert" transition:fade>
    <RemixIcon name="checkbox-circle-line" color="#FFFFFF" />
    <p>{message}</p>
  </article>
{/if}

<style>
  .toast-container {
    bottom: 4rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-green);
    height: 44px;
    width: calc(100vw - 3rem);
    max-width: 30rem;
    padding: 0 13px;
    column-gap: 8px;
    border-radius: 8px;
    margin: auto;
  }

  .toast-container p {
    color: var(--color-pure-white);
  }

  .checkmark {
    height: 18px;
  }
</style>
