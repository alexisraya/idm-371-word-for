<script lang="ts">
    import Tags from "./Tags.svelte";
    import swapLanguage from '$lib/assets/swapLanguage.svg'

    export let word: string;
    export let region: string;
    export let context: string;
    export let originalLanguage: string;
    export let translateLanguage: string;

</script>

<p>{originalLanguage}</p>
    <div class="swap-icon-container">
        <img src={swapLanguage} alt="swap-languages">
    </div>
<p>{translateLanguage}</p>
<h1>{word}</h1>
<div class="tags">
    <Tags tagName={context}/>
    <Tags tagName={region}/>
</div>

<!-- <div class="container">
    <div class="text-container">
        <div>
            <p>{originalLanguage}</p>
            <div class="swap-icon-container">
                <img src={swapLanguage} alt="swap-languages">
            </div>
            <p>{translateLanguage}</p>
        </div>
        <div class="title">
            <h1 class="result">{word}</h1>
        </div>
        <div class="tags">
            {#if region.length<=12 && region!="all regions"}
                <Tags tagName={region}/>
            {/if}
            {#if context}
                <Tags tagName={context}/>
            {/if}
        </div>
    </div>
</div>

<style>

    .container{
        padding: 24px;
        width: 342px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border: .5px;
        border-color: black;
        box-shadow: 0px 5px 15px 4px rgba(0, 0, 0, 0.10);
        border-radius: 20px;
    }

    .text-container{
        max-width: 270px;
        display: flex;
        flex-direction: column;
    }

    .title{
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .result{
        margin: 0;
    }

    .tags{
        display: flex;
        flex-direction: row;
        column-gap: 8px;
    }
</style> -->