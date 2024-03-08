<script>
    import BookmarkedItem from "$lib/BookmarkedItem.svelte";
    import BookmarkItem from "$lib/BookmarkedItem.svelte";
    import bookmarkStore from "../../stores/bookmarkStore";
    import filters from "$lib/assets/filters.svg";

    let bookmarkItems = {};
    bookmarkStore.subscribe(result => {
        bookmarkItems = result;
    });
    console.log(bookmarkItems)
    let dataLength = Object.keys(bookmarkItems).length
    let isEmpty = dataLength<0;
</script>

<div class="page-container">
    <div class="center-container">
    <div class="header-container">
        <h1>Bookmarks</h1>
        <button><img src="{filters}" alt="filters"></button>
    </div>
{#if !isEmpty}
    <div class="language-container">
        <p>Language 1</p>
    </div>
    <div class="bookmarks-container">
        {#each bookmarkItems as bookmarkItem}
            <BookmarkedItem phrase={bookmarkItem.phrase} originLanguage={bookmarkItem.originLanguage} translateLanguage={bookmarkItem.translateLanguage} region={bookmarkItem.region} context={bookmarkItem.context} partSpeech={bookmarkItem.partSpeech} phoneticSpelling={bookmarkItem.phoneticSpelling} examples={bookmarkItem.examples} description={bookmarkItem.description}/>
        {/each}
    </div>
{:else}
    <p>No Bookmarks</p>
{/if}
    </div>
</div>

<style>
    .page-container {
        margin: 0 1.5rem;
        box-sizing: border-box;
    }

    .page-container * {
        box-sizing: border-box;
    }

    .language-container {
        color: var(--Stone-Grey, #979797);

        /* Body */
        font-family: "Fira Sans";
        font-size: 1rem;
        font-style: normal;
        font-weight: 300;
        line-height: 1.25rem; /* 125% */
    }

    .language-container p {
        margin: 0 0 1rem;
    }

    .bookmarks-container {
        width: 100%;
    }

    h1 {
        margin: 1rem 0 1.5rem;
    }

    .center-container {
        max-width: 342px;
        margin: auto;
    }
    
    .header-container {
        display: grid;
        grid-template-columns: 1fr 32px;
        align-items: center;
    }

    .header-container h1 {
        color: var(--Text-Black, #141414);

        font-family: "Times New Roman";
        font-size: 2.5rem;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }

    .header-container img{
        padding-bottom: 0.5rem;
    }

    button {
        background-color: transparent;
        border: none;
        margin: 0;
        padding: 0;
        text-align: inherit;
        font: inherit;
        border-radius: 0;
        appearance: none;
        cursor: pointer;
    }

</style>