<script>
    import BookmarkedItem from "$lib/BookmarkedItem.svelte";
import BookmarkItem from "$lib/BookmarkedItem.svelte";
import bookmarkStore from "../../stores/bookmarkStore";

    let bookmarkItems = {};
    bookmarkStore.subscribe(result => {
        bookmarkItems = result;
    });
    console.log(bookmarkItems)
    let dataLength = Object.keys(bookmarkItems).length
    let isEmpty = dataLength<0;
</script>

<div class="header-container">
    <h1>Bookmarks</h1>
</div>
{#if !isEmpty}
    <div class="bookmark-container">
        {#each bookmarkItems as bookmarkItem}
            <BookmarkedItem phrase={bookmarkItem.phrase} originLanguage={bookmarkItem.originLanguage} translateLanguage={bookmarkItem.translateLanguage} region={bookmarkItem.region} context={bookmarkItem.context} partSpeech={bookmarkItem.partSpeech} phoneticSpelling={bookmarkItem.phoneticSpelling} examples={bookmarkItem.examples} description={bookmarkItem.description}/>
        {/each}
    </div>
{:else}
    <p>No Bookmarks</p>
{/if}
