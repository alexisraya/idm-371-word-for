<script>
    import exit from '$lib/assets/exit.svg';
    import dots from '$lib/assets/dots.svg';
    import recentSearchStore, { deleteRecentStore, updateRecentSearchStore } from "../../stores/recentSearchStore";
    import RecentSearchItem from "$lib/RecentSearchItem.svelte";
    import Skeleton from '$lib/Skeleton.svelte';
    import { fade , slide } from 'svelte/transition';
	import { onDestroy, onMount } from 'svelte';
	import { setPreviousPage } from '../../stores/pageStore';
    import { isLoading, updateLoading } from '../../stores/loadingStore';
	import { isEditing, updateEditing } from '../../stores/editingStore';
 

    let recentSearches = {};
    recentSearchStore.subscribe(result => {
        recentSearches = result;
    });
    let isEmpty = false;
    let isModalOpen = false; // this is a boolean that tracks the "are you sure" modal
    let isEditModalOpen = false; // this is a boolean that tracks the "are you sure" modal

    onMount(() => {
        updateRecentSearchStore();
        recentSearchStore.subscribe(result => {
            recentSearches = result;
        });
        const dataLength = Object.keys(recentSearches).length
        isEmpty = dataLength<0;
    })

    const closeModal = () => {
        isModalOpen = false;
        isEditModalOpen = false;
    }

    const openModal = () => {
        isModalOpen = true;
        isEditModalOpen = false;
    }

    const closeEditModal = () => {
        isEditModalOpen = false;
        isModalOpen = false;
    }

    const openEditModal = () => {
        isEditModalOpen = true;
        isModalOpen = false;
    }

    const editSearches = () => {
        closeEditModal();
        updateEditing(true);
    }

    const finishEditing = () => {
        updateEditing(false);
    }

    const handleDelete = () => {
        deleteRecentStore();
        isEmpty = true;
        closeModal();
    }

    onDestroy(() => {
        setPreviousPage("recents");
    })
</script>

{#if $isLoading}
<Skeleton />
{:else}
<div class="header-container">
    <h1>Recent Searches</h1>
    <button disabled={isEmpty} on:click={openEditModal}>
        <img class="dots" src="{dots}" alt="edit-searches">
    </button>
</div>
{#if !isEmpty}
    <div class="recent-item-container">
        {#each recentSearches as recentSearch}
            <RecentSearchItem phrase={recentSearch.phrase} region={recentSearch.selectedRegions} context={recentSearch.selectedContexts} originLanguage={recentSearch.originLanguage} translateLanguage={recentSearch.translateLanguage} dayTime={recentSearch.dayTime}/>
        {/each}
    </div>
    {#if $isEditing}
        <button transition:fade={{ delay: 100, duration: 200 }} class="dark-btn btn-spacing" on:click={finishEditing}>
            Done
        </button>
    {/if}
    {#if isEditModalOpen}
        <!-- TODO: this is janky... fix in a later build -->
        <div class="modal-container" transition:slide={{ delay: 200, duration: 300 }}>
            <div class="modal-header">
                <h1 class="modal-title">Manage recent searches</h1>
                <button class="modal-close-btn" on:click={closeEditModal}>
                    <img src={exit} alt="exit symbol">
                </button>
            </div>
            <button class="empty-btn" disabled={isEmpty} on:click={openModal} >
                <span>Clear all history</span>
            </button>
            <button class="dark-btn" on:click={editSearches}>Edit</button>
        </div>
        <div class="bg-dark" transition:fade={{ delay: 200, duration: 300 }}></div>
    {/if}
    {#if isModalOpen}
    <!-- TODO: this is janky... fix in a later build -->
    <div class="modal-container" transition:slide={{ delay: 200, duration: 300 }}>
        <div class="modal-header">
            <h1 class="modal-title">Would you like to clear all recent searches?</h1>
            <button class="modal-close-btn" on:click={closeModal}>
                <img src={exit} alt="exit symbol">
            </button>
        </div>
        <button class="empty-btn" on:click={handleDelete}>Yes, Clear all History</button>
        <button class="dark-btn" on:click={closeModal}>No</button>
    </div>
    <div class="bg-dark" transition:fade={{ delay: 200, duration: 300 }}></div>
{/if}

{:else}
    <p class="empty-state">No recent searches</p>
{/if}
{/if}


<style>
    @import url('https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400;1,500&display=swap');

    h1 {
        color: var(--Text-Black, #141414);

        /* H1 TNR */
        font-family: "Times New Roman";
        font-size: 2.5rem;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        margin: 0;
    }

    button {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
    }

    .dots {
        padding: 0.44rem 1.25rem;
    }

    .modal-header{
        display: grid;
        width: 100%;
        grid-template-columns: 1fr 44px;
        margin-bottom: 8px;
    }
    .modal-title{
        color: var(--Text-Black, #141414);

        /* H2 Fira */
        font-family: "Fira Sans";
        font-size: 1.5rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin: 0;
    }
    .modal-close-btn{
        background-color: transparent;
        border: none;
        padding: 0;
    }
    .header-container{
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
        border: 1px solid var(--Primary-Black, #000);

        color: var(--Primary-Black, #000);
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
        background: var(--Primary-Black, #000);
        color: var(--Pure-White, #FFF);

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
         /* Include padding within the width and height */    }

    .empty-state {
        display: grid;
        height: 50vh;
        width: 100%;
        place-items: center;

        color: var(--Slate-Grey, #595959);

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
</style>