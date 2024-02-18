<script>
    import recentSearchStore from "../../stores/recentSearchStore";
    import RecentSearchItem from "$lib/RecentSearchItem.svelte";

    let recentSearches = {};
    recentSearchStore.subscribe(result => {
        recentSearches = result;
    });
    console.log(recentSearches)
    let dataLength = Object.keys(recentSearches).length
</script>

<h1>Recent Searches</h1>
{#if dataLength>0}
    {#each recentSearches as recentSearch}
        <RecentSearchItem word={recentSearch.phrase} region={recentSearch.selectedRegions} context={recentSearch.selectedContexts} originalLanguage={recentSearch.originLanguage} translateLanguage={recentSearch.translateLanguage}/>
    {/each}
{:else}
    <p>No recent searches</p>
{/if}