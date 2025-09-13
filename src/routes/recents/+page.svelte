<script>
  import recentSearchStore, {
    deleteRecentStore,
    updateRecentSearchStore,
  } from "../../stores/recentSearchStore";
  import RecentSearchItem from "$lib/RecentSearchItem.svelte";
  import Skeleton from "$lib/Skeleton.svelte";
  import { fade, slide } from "svelte/transition";
  import { onDestroy, onMount } from "svelte";
  import { setPreviousPage } from "../../stores/pageStore";
  import { isLoading, updateLoading } from "../../stores/loadingStore";
  import { isEditing, updateEditing } from "../../stores/editingStore";
  import RemixIcon from "$lib/RemixIcon.svelte";

  let recentSearches = {};
  recentSearchStore.subscribe((result) => {
    recentSearches = result;
  });
  let isEmpty = false;
  let isModalOpen = false; // this is a boolean that tracks the "are you sure" modal
  let isEditModalOpen = false; // this is a boolean that tracks the "are you sure" modal

  onMount(() => {
    updateRecentSearchStore();
    recentSearchStore.subscribe((result) => {
      recentSearches = result;
    });
    const dataLength = Object.keys(recentSearches).length;
    isEmpty = dataLength < 0;
  });

  const closeModal = () => {
    isModalOpen = false;
    isEditModalOpen = false;
  };

  const openModal = () => {
    isModalOpen = true;
    isEditModalOpen = false;
  };

  const closeEditModal = () => {
    isEditModalOpen = false;
    isModalOpen = false;
  };

  const openEditModal = () => {
    isEditModalOpen = true;
    isModalOpen = false;
  };

  const editSearches = () => {
    closeEditModal();
    updateEditing(true);
  };

  const finishEditing = () => {
    updateEditing(false);
  };

  const handleDelete = () => {
    deleteRecentStore();
    isEmpty = true;
    closeModal();
  };

  onDestroy(() => {
    setPreviousPage("recents");
  });
</script>

{#if $isLoading}
  <Skeleton />
{:else}
  <div class="header-container">
    <h1>Recent Searches</h1>
    <button disabled={isEmpty} on:click={openEditModal}>
      <RemixIcon name="more-2-line" size="43px" />
    </button>
  </div>
  {#if !isEmpty}
    <div class="recent-item-container">
      {#each recentSearches as recentSearch}
        <RecentSearchItem
          phrase={recentSearch.phrase}
          region={recentSearch.selectedRegions}
          context={recentSearch.selectedContexts}
          originLanguage={recentSearch.originLanguage}
          translateLanguage={recentSearch.translateLanguage}
          dayTime={recentSearch.dayTime}
        />
      {/each}
      {#if $isEditing}
        <div class="bumper" />
      {/if}
    </div>
    {#if $isEditing}
      <div class="done-container">
        <button
          transition:fade={{ delay: 100, duration: 200 }}
          class="dark-btn btn-spacing"
          on:click={finishEditing}
        >
          Done
        </button>
      </div>
    {/if}
    {#if isEditModalOpen}
      <!-- TODO: this is janky... fix in a later build -->
      <div
        class="modal-container"
        transition:slide={{ delay: 200, duration: 300 }}
      >
        <div class="modal-header">
          <h2 class="modal-title">Manage recent searches</h2>
          <button class="modal-close-btn" on:click={closeEditModal}>
            <RemixIcon name="close-large-line" />
          </button>
        </div>
        <button class="empty-btn" disabled={isEmpty} on:click={openModal}>
          <span>Clear all history</span>
        </button>
        <button class="dark-btn" on:click={editSearches}>Edit</button>
      </div>
      <div class="bg-dark" transition:fade={{ delay: 200, duration: 300 }} />
    {/if}
    {#if isModalOpen}
      <!-- TODO: this is janky... fix in a later build -->
      <div
        class="modal-container"
        transition:slide={{ delay: 200, duration: 300 }}
      >
        <div class="modal-header">
          <h2 class="modal-title">
            Would you like to clear all recent searches?
          </h2>
          <button class="modal-close-btn" on:click={closeModal}>
            <RemixIcon name="close-large-line" />
          </button>
        </div>
        <button class="empty-btn" on:click={handleDelete}
          >Yes, Clear all History</button
        >
        <button class="dark-btn" on:click={closeModal}>No</button>
      </div>
      <div class="bg-dark" transition:fade={{ delay: 200, duration: 300 }} />
    {/if}
  {:else}
    <p class="empty-state">No recent searches</p>
  {/if}
{/if}

<style>
  button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }

  .modal-header {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 44px;
    margin-bottom: 8px;
  }
  .modal-title {
    font-family: "Fira Sans";
  }
  .modal-close-btn {
    background-color: transparent;
    border: none;
    padding: 0;
  }
  .header-container {
    display: flex;
    justify-content: space-between;
    padding: 2rem 1.5rem 0.38rem;
  }

  .empty-btn {
    display: flex;
    width: 100%;
    /* max-width: 20.375rem; */
    height: 2.75rem;
    padding: 0.75rem;
    justify-content: center;
    align-items: center;

    border-radius: 1.5rem;
    border: 1px solid var(--color-primary-black);

    color: var(--color-primary-black);
    /* Body Alt */
    font-family: "Fira Sans";
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .dark-btn {
    display: flex;
    width: 100%;
    /* width: 20.375rem; */
    height: 2.75rem;
    padding: 0.75rem;
    justify-content: center;
    align-items: center;

    border-radius: 1.5rem;
    background: var(--color-primary-black);
    color: var(--color-pure-white);

    /* Body Alt */
    font-family: "Fira Sans";
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .modal-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    position: fixed;
    bottom: 0;
    background-color: white;
    z-index: 12;
    padding: 1.75rem;
    box-sizing: border-box;
    border-radius: 3.5rem 3.5rem 0rem 0rem;
    /* Include padding within the width and height */
  }

  .empty-state {
    display: grid;
    height: 50vh;
    width: 100%;
    place-items: center;

    color: var(--color-slate-grey);

    /* Body Small Alt Italic */
    font-family: "Fira Sans";
    font-size: 0.875rem;
    font-style: italic;
    font-weight: 400;
    line-height: normal;
  }

  .bg-dark {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75); /* Adjust opacity as needed */
    z-index: 11;
  }

  .bumper {
    height: 80px;
  }

  /* @media screen and (min-width: 680px){
        .recent-item-container{
            display: flex;
            flex-direction: column-reverse;
            align-items: center;
            justify-content: center;
            row-gap: 24px;
        }

        .clear-history-btn{
            display: block;
        }
     } */

  .btn-spacing {
    box-sizing: border-box;
    max-width: calc(100vw - 3rem);
    margin: 1rem auto;
  }

  .done-container {
    position: fixed;
    width: 100%;
    bottom: 0;
    background: linear-gradient(
      to top,
      rgb(255, 255, 255) 75%,
      rgba(255, 255, 255, 0) 100%
    );
  }
</style>
