<script lang="ts">
    import BookmarkedItem from "$lib/BookmarkedItem.svelte";
    import bookmarkStore, { updateBookmarkStore } from "../../stores/bookmarkStore";
    import Tags from "$lib/Tags.svelte"
    import filters from "$lib/assets/filters.svg";
    import exit from '$lib/assets/exit.svg';
    import { CONTEXTS } from "$lib/constants/contexts";
    import { REGIONS } from "$lib/constants/regions";

    import { fade } from 'svelte/transition';
	import { slide } from 'svelte/transition';
	import { afterUpdate, beforeUpdate, onMount } from "svelte";

    let contexts = CONTEXTS;
    let regions = REGIONS.spanish;
    /**
   * @type {any[]}
   */
    let selectedContext = [];
    /**
   * @type {any[]}
   */
    let selectedRegion = [];

    /**
   * @type {Iterable<any> | null | undefined}
   */
    let selectedTags = [];

    let selectedLanguage = "";

    // Compute selected tags
    $: {
        selectedTags = selectedRegion.map(region => region.text);
        selectedTags = [...new Set(selectedTags)]; // Filter out duplicates
    }

    // Event handler for checkbox change
    function handleCheckboxChange(event, region) {
        if (event.target.checked) {
        selectedRegion = [...selectedRegion, region];
        } else {
        selectedRegion = selectedRegion.filter(selected => selected !== region);
        }
    }

    /**
     * @type {any[]}
     */
    let selectedTagsContext = []; // Define selectedTagsContext array

    // Compute selected tags for Context
    $: {
        selectedTagsContext = selectedContext.map(context => context.text);
        selectedTagsContext = [...new Set(selectedTagsContext)]; // Filter out duplicates
    }

    let bookmarkItems: any[] = [];
    let filteredBookmarkItems: any[] = [];
    let englishBookmarkItems: any[] = [];
    let spanishBookmarkItems: any[] = [];
    let isEmpty = false;
    onMount(() => {
        updateBookmarkStore();
        bookmarkStore.subscribe(result => {
            bookmarkItems = result;
        });
        filteredBookmarkItems = bookmarkItems
        englishBookmarkItems = filteredBookmarkItems.filter(item => item.translateLanguage === "English");
        spanishBookmarkItems = filteredBookmarkItems.filter(item => item.translateLanguage === "Spanish");
        const dataLength = Object.keys(bookmarkItems).length
        isEmpty = dataLength<0;
    })

    // Event handler for checkbox change for Context
    function handleCheckboxChangeContext(event, context) {
        if (event.target.checked) {
            selectedContext = [...selectedContext, context];
        } else {
            selectedContext = selectedContext.filter(selected => selected !== context);
        }
    }

    let isModalOpen = false; // filters modal

    const closeModal = () => {
        isModalOpen = false;
    }

    const openModal = () => {
        isModalOpen = true;
    }

    const applyFilter = () => {
        filteredBookmarkItems = bookmarkItems;
        if (selectedTagsContext.length > 0){
            selectedTagsContext.forEach(context => {
                filteredBookmarkItems = filteredBookmarkItems.filter(item => item.context === context);
            });
        }
        if(selectedRegion.length > 0){
            selectedRegion.forEach(region => {
                filteredBookmarkItems = filteredBookmarkItems.filter(item => item.region === region.text);
            });
        }
        if(selectedLanguage){
            filteredBookmarkItems = filteredBookmarkItems.filter(item => item.translateLanguage === selectedLanguage);
        }
        englishBookmarkItems = filteredBookmarkItems.filter(item => item.translateLanguage === "English");
        spanishBookmarkItems = filteredBookmarkItems.filter(item => item.translateLanguage === "Spanish");
        closeModal();
    }
</script>

<div class="page-container">
    <div class="center-container">
        <div class="header-container">
            <h1>Bookmarks</h1>
            <button disabled={isEmpty} on:click={openModal}>
                <img src="{filters}" alt="filters">
            </button>
        </div>
{#if !isEmpty}
    {#if englishBookmarkItems.length > 0}
        <div class="language-container">
            <p>English</p>
        </div>
        <div class="bookmarks-container">
            {#each englishBookmarkItems as bookmarkItem}
                <BookmarkedItem phrase={bookmarkItem.phrase} originLanguage={bookmarkItem.originLanguage} translateLanguage={bookmarkItem.translateLanguage} region={bookmarkItem.region} context={bookmarkItem.context} partSpeech={bookmarkItem.partSpeech} phoneticSpelling={bookmarkItem.phoneticSpelling} examples={bookmarkItem.examples} description={bookmarkItem.description}/>
            {/each}
        </div>
    {/if}
    {#if spanishBookmarkItems.length > 0}
        <div class="language-container">
            <p>Spanish</p>
        </div>
        <div class="bookmarks-container">
            {#each spanishBookmarkItems as bookmarkItem}
                <BookmarkedItem phrase={bookmarkItem.phrase} originLanguage={bookmarkItem.originLanguage} translateLanguage={bookmarkItem.translateLanguage} region={bookmarkItem.region} context={bookmarkItem.context} partSpeech={bookmarkItem.partSpeech} phoneticSpelling={bookmarkItem.phoneticSpelling} examples={bookmarkItem.examples} description={bookmarkItem.description}/>
            {/each}
        </div>
    {/if}
{:else}
    <p>No Bookmarks</p>
{/if}
    </div>
</div>





{#if isModalOpen}
<!-- TODO: this is janky... fix in a later build -->
<div class="modal-container" transition:slide={{ delay: 200, duration: 300 }}>

    <div class="modal-header">
        <h1 class="modal-title">Filters</h1>
        <button class="modal-close-btn" on:click={closeModal}>
            <img src={exit} alt="exit symbol">
        </button>
    </div>
    <form action="">
    <div class="spacer">
    <div class="language-filters">
        <span class="language-text">
            Please select a language first
        </span>
        <fieldset class="flex">
            <div class="language-filter-tag">
                <input type="radio" name="language" value="English" id="english" bind:group={selectedLanguage}>
                <label for="english">English</label>
            </div>
            <div class="language-filter-tag">
                <input type="radio" name="language" value="Spanish" id="spanish" bind:group={selectedLanguage}>
                <label for="spanish">Spanish</label>
            </div>
        </fieldset>
    </div>
    <hr>

    <details class="dropdown-wide">
        <summary>
            <div class="dropdown-title">Region</div>
            <div class="tags">
                {#each selectedTags as tag}
                    <Tags tagName={tag}/> 
                {/each}
            </div>
        </summary>
        <fieldset>
            <ul>
                {#each regions as region}
                    <li>
                        <input type="checkbox" id={region.text} name={region.text} value={region} bind:group={selectedRegion}

                        checked={selectedRegion.includes(region.text)}

                        on:change={(e) => handleCheckboxChange(e, region)}/>
                        
                        <label for={region.text}>{region.text}</label>
                    </li>
                {/each}
            </ul>
        </fieldset>
    </details>
<hr>
    <details class="dropdown-wide">
        <summary>
            <div class="dropdown-title">Context</div>
            <div class="tags">
                {#each selectedTagsContext as tag}
                    <Tags tagName={tag}/> 
                {/each}
            </div>
        </summary>
        <fieldset>
            <ul>
                {#each contexts as context}
                    <li>
                        <input type="checkbox" id={context.text} name={context.text} value={context} bind:group={selectedContext}
                        
                        checked={selectedContext.includes(context)}

                        on:change={(e) => handleCheckboxChangeContext(e, context)}/>

                        <label for={context.text}>{context.text}</label>
                    </li>
                {/each}
            </ul>
        </fieldset>
    </details>
</div>

    <button class="dark-btn" on:click={applyFilter}>Apply</button>
    </form>
</div>
<div class="bg-dark" transition:fade={{ delay: 200, duration: 300 }}></div>
{/if}





<style>
    @import url('https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400;1,500&display=swap');

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


    .modal-header{
        display: grid;
        width: 100%;
        grid-template-columns: 1fr 44px;
        margin-bottom: 8px;
        padding: 1.75rem 1.25rem 0 1.75rem;
        box-sizing: border-box;

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

    .dark-btn {
        display: flex;
        bottom: 2rem;
        width: calc(100vw - 3.5rem);
        margin: auto;
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
        height: 90vh;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: left;
        position: fixed;
        bottom: 0;
        background-color: white;
        z-index: 12;
        /* padding: 1.75rem; */
        box-sizing: border-box;
        border-radius: 3.5rem 3.5rem 0rem 0rem;
         /* Include padding within the width and height */    }

    .bg-dark {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.75); /* Adjust opacity as needed */
        z-index: 11;
    }

    .flex {
        display: flex;
        gap: 0.75rem;
    }

    .language-filter-tag :not(input:checked) ~label {
        display: flex;
        height: 2rem;
        padding: 0rem 1.5rem;
        align-items: center;
        gap: 0.44388rem;

        border-radius: 1.64388rem;
        background: var(--Cloud-Grey, #F0F0F0);

        color: var(--Text-Black, #141414);

        /* Body */
        font-family: "Fira Sans";
        font-size: 1rem;
        font-style: normal;
        font-weight: 300;
        line-height: 1.25rem; /* 125% */
        transition: ease-in-out 0.225s;
    }

    .language-filter-tag input { 
        display:none; 
    }

    .language-filter-tag input:checked ~ label {
        display: flex;
        height: 2rem;
        padding: 0rem 1.5rem;
        align-items: center;
        gap: 0.44388rem;  
        
        border-radius: 1.64388rem;
        background: var(--Pure-White, #FFF);
        box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.15);

        color: var(--Text-Black, #141414);

        /* Body Alt */
        font-family: "Fira Sans";
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    .language-text {
        color: var(--Stone-Grey, #979797);
        font-family: "Fira Sans";
        font-size: 1rem;
        font-style: normal;
        font-weight: 300;
        line-height: normal;
    }

    .language-filters {
        display: flex;
        padding: 0 1.75rem 1.5rem;
        flex-direction: column;
        gap: 0.75rem;
    }

    .language-filter-tag {
        width: 6.5rem;
        display: flex;
    }


/* dropdown styles */

.dropdown-wide {
        /* Reset. */
        border: unset;
        position: relative;
        box-sizing: border-box;

        /* Layout */
        display: flex;
        width: 100%;
        /* max-width: 19.5rem; */
        /* max-width: calc(100vw - 1rem); */
        padding: 0 1.75rem;
        min-height: 2.75rem;
        justify-content: space-between;
        align-items: center;
        
        /* Style */
        list-style-type: none;
        background: var(--white);
        color: var(--text-black);


        /* Font */
        font-family: "Fira Sans";
        font-size: 1rem;
        font-style: normal;
        font-weight: 300;
        line-height: 1.25rem;
    }

    .dropdown-wide summary {
        /* Layout */
        display: flex; /* also removes the list marker */
        align-items: top;
        padding: 0.75rem 0;

        /* Style */
        list-style: none;
        color: var(--Text-Black, #141414);

        /* Uppercase */
        font-family: "Fira Sans";
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-transform: uppercase;
    }

    .dropdown-wide .dropdown-title {
        height: 1.4rem;
        line-height: 1.325rem;
    }

    .dropdown-wide summary::after {
        /* Arrow */
        content: '';
        width: 32px;
        height: 32px;
        padding: 0;
        margin-top: -0.25rem;
        /* margin-left: 17.825rem; */
        margin-left: calc(100vw - 5rem);
        background: url('$lib/assets/chevron.svg'), no-repeat;
        background-size: 2rem auto;
        position: absolute;
        transition: 0.2s;
    }

    .dropdown-wide summary::-webkit-details-marker {
        /* Remove default arrow on safari */
        display: none;
    }

    .dropdown-wide[open] > summary::after {
        /* Arrow Animation */
        transform-origin: center;
        transform: rotate(180deg);
    }

    fieldset {
        /* Reset */
        margin-inline-start: 0;
        margin-inline-end: 0;
        padding-block-start: 0;
        padding-block-end: 0;
        padding-inline-start: 0;
        padding-inline-end: 0;
        border: none;
        min-inline-size: min-content;
    }

    fieldset ul {
        /* Reset */
        padding: 0;
        list-style-type: none;

        /* Layout */
        margin: 0.25rem 0 0.5rem;
        height: 300px; /* Adjust height as needed */
        overflow-y: auto;
    }

    fieldset ul li{
        /* Layout */
        padding: 0.5rem 0;
    }

    input[type="checkbox"] {
        /* Reset*/
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;

        /* Layout */
        width: 12px; /* Width of the checkbox */
        height: 12px; /* Height of the checkbox */
        position: relative;  
        margin-right: 0.5rem;
    }

    input[type="checkbox"]::before, input[type="checkbox"]::after {
        /* Style the custom checkbox */
        content: '';
        position: absolute;
        top: 0.125rem;
        left: 0;
        width: 12px; /* Width of the checkbox */
        height: 12px; /* Height of the checkbox */
        border: 1px solid var(--primary-black, #000);
        border-radius: 3.55px;
        background-color: transparent;
        transition: transform 0.2s ease;
    }

    input[type="checkbox"]::before {
        /* Style the inner part of the checkbox */
        background-color: transparent;
        transform-origin: center;
        }

    input[type="checkbox"]::after {
        /* Remove border from after */
        border: none;
    }

    @keyframes scaleIn {
        from {
            transform: scale(0);
        }
        to {
            transform: scale(1);
        }
    }

    input[type="checkbox"]:checked::before {
        /* Style + Animation */
        background-color: var(--primary-black, #000);
        transform: scale(0);
        animation: scaleIn 0.2s ease 1ms forwards;
    }

    .tags {
        display: inline-flex;
        flex-wrap: wrap;
        max-width: 14.4rem;
        padding-left: 0.5rem;
        gap: 0.5rem;
    }

    .spacer {
        height: calc(90vh - 9rem);
        overflow-y: auto;
    }

    hr {
        border-top: 1px solid #F0F0F0;

    }
</style>