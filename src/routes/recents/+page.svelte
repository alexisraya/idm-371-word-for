<script>
    import recentSearchStore, { deleteRecentStore } from "../../stores/recentSearchStore";
    import RecentSearchItem from "$lib/RecentSearchItem.svelte";

    let recentSearches = {};
    recentSearchStore.subscribe(result => {
        recentSearches = result;
    });
    console.log(recentSearches)
    let dataLength = Object.keys(recentSearches).length
    let isEmpty = dataLength<0;

    const handleDelete = () => {
        deleteRecentStore();
        isEmpty = true;
    }
</script>

<div class="header-container">
    <h1>Recent Searches</h1>
    <button class="clear-history-btn" disabled={isEmpty} on:click={handleDelete}>
        Clear All History
    </button>
</div>
{#if !isEmpty}
    <div class="recent-item-container">
        {#each recentSearches as recentSearch}
            <RecentSearchItem phrase={recentSearch.phrase} region={recentSearch.selectedRegions} context={recentSearch.selectedContexts} originLanguage={recentSearch.originLanguage} translateLanguage={recentSearch.translateLanguage} dayTime={recentSearch.dayTime}/>
        {/each}
    </div>
{:else}
    <p>No recent searches</p>
{/if}

<style>
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