<script>
    import exit from '$lib/assets/exit.svg';
    import recentSearchStore, { deleteRecentStore } from "../../stores/recentSearchStore";
    import RecentSearchItem from "$lib/RecentSearchItem.svelte";

    let recentSearches = {};
    recentSearchStore.subscribe(result => {
        recentSearches = result;
    });
    console.log(recentSearches)
    let dataLength = Object.keys(recentSearches).length
    let isEmpty = dataLength<0;
    let isModalOpen = false; // this is a boolean that tracks the "are you sure" modal

    const closeModal = () => {
        isModalOpen = false;
    }

    const openModal = () => {
        isModalOpen = true;
    }

    const handleDelete = () => {
        deleteRecentStore();
        isEmpty = true;
        closeModal();
    }
</script>

<div class="header-container">
    <h1>Recent Searches</h1>
    <button class="clear-history-btn" disabled={isEmpty} on:click={openModal}>
        Clear All History
    </button>
</div>
{#if !isEmpty}
    <div class="recent-item-container">
        {#each recentSearches as recentSearch}
            <RecentSearchItem phrase={recentSearch.phrase} region={recentSearch.selectedRegions} context={recentSearch.selectedContexts} originLanguage={recentSearch.originLanguage} translateLanguage={recentSearch.translateLanguage} dayTime={recentSearch.dayTime}/>
        {/each}
    </div>
    {#if isModalOpen}
        <!-- TODO: this is janky... fix in a later build -->
        <div class="recent-search-modal-container">
            <div class="modal-header">
                <h1 class="modal-title">Would you like to clear all recent searches</h1>
                <button class="modal-close-btn" on:click={closeModal}>
                    <img src={exit} alt="exit symbol">
                </button>
            </div>
            <button on:click={handleDelete}>Yes,Clear All History</button>
            <button on:click={closeModal}>No</button>
        </div>
    {/if}
{:else}
    <p>No recent searches</p>
{/if}

<style>
    .recent-search-modal-container{
        background-color: white;
        border-radius: 24px; 
        width: 400px;
        padding: 32px 24px;
        display: flex;
        flex-direction: column;
        row-gap: 16px;
    }
    .modal-header{
        display: flex;
        align-items: flex-start;
        margin-bottom: 8px;
    }
    .modal-title{
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
        padding: 40px 0px;
    }
    .clear-history-btn{
        display: none;
    }

     @media screen and (min-width: 680px){
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
     }
</style>