<script lang="ts">
    import { COLORS } from "./constants/colors";
    import Tags from "./Tags.svelte";
    import Speaker from "./Speaker.svelte";
    import { goto } from '$app/navigation';
   
    import chevron from '$lib/assets/chevron.svg';
    import { resultData } from "../stores/translateStore";
	import { setLocalStorageItem, stringToArry } from "./helpers/helperFunctions";
	import { onMount } from "svelte";

    export let description: string;
    export let partSpeech: string;
    export let phoneticSpelling: string;
    export let word: string;
    export let region: string;
    export let context: string;
    export let examples: {};
    export let originalLanguage: string;
    export let translateLanguage: string;

    let contextArr: string[] = [];
    let regionArr: string[] = [];

    onMount(() =>{
        if (context.includes(",")){
            contextArr = stringToArry(context);
        }
        if (region.includes(",")){
            regionArr = stringToArry(region);
        }
    })

    const handleClick = () => {
        const resultObj = {
            result: {
                word,
                region,
                context,
                partSpeech,
                phoneticSpelling,
                description,
                examples,
                originalLanguage,
                translateLanguage
            }
        };
        resultData.set(resultObj);
        setLocalStorageItem("resultData", JSON.stringify(resultObj));
        goto('/result')
    };
</script>


    <div class="container">
        <div class="text-container">
            <div class="title-container">
                <div class="title">
                    <h2 class="result">{word}</h2>
                    <Speaker phrase={word} />
                </div>
                <div class="subtitle">
                    <i class="subtitle-text phonetic">{phoneticSpelling}</i>
                    <h3>•</h3>
                    <i class="subtitle-text">{partSpeech}</i>
                </div>
                <div class="tags">
                    {#if regionArr.length>0}
                        {#each regionArr as region}
                            {#if region.length>1 && region!="all regions"}
                                <Tags tagName={region}/>
                            {/if}
                        {/each}
                    {:else if region.length>1 && region!="all regions"}
                        <Tags tagName={region}/>
                    {/if}
                    {#if contextArr.length>0}
                        {#each contextArr as context}
                            <Tags tagName={context}/>
                        {/each}
                    {:else if context.length>0}
                        <Tags tagName={context}/>
                    {/if}
                </div>
            </div>
            <p class="definition-title">Definitions</p>
            <p class="definition">{description}</p>
        </div>
        <div class="arrow-container" on:click={handleClick} on:keydown={handleClick}>
            <img class="arrow" alt="arrow icon" src={chevron} />
        </div>
    </div>

    <div class="alternative-title">
        <p class="alternative">Alternative Translations</p>
    </div>


<style>
    .container{
        max-width: 21.375rem;
        min-width: 16rem;
        padding: 24px;
        margin-bottom: 1.5rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        background-color: white;
        border: .5px;
        border-color: black;
        box-shadow: 0px 5px 15px 4px rgba(0, 0, 0, 0.10);
        border-radius: 20px
    }

    .container:first-child {
        background: linear-gradient(white, white) padding-box, linear-gradient(135deg,#006DCA, #DD2235, #FF8200, #FFC50E, #006F3A) border-box;
        border-radius: 1.25rem;
        border: 1px solid transparent;
    }

    .container:not(:first-child) .definition-title {
        height: 0;
        width: 0;
        opacity: 0;
    }

    .container:not(:first-child) .title-container {
        margin-bottom: 0.5rem;
    }

    .alternative-title:not(:nth-child(2)){
        height: 0;
        width: 0;
        opacity: 0;
        display: none;
    }

    .alternative {
        color: var(--text-black, #141414);

        /* Uppercase Small */
        font-family: "Fira Sans";
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-transform: uppercase;
        padding-top: 0.5rem;
        margin: 0 0 0.75rem;
    }

    .arrow-container{
        cursor: pointer;
    }

    .arrow {
        transform: rotate(-90deg);
    }

    .text-container{
        display: flex;
        flex-direction: column;
    }

    .definition{
        overflow: hidden;
        -webkit-line-clamp: 2;
        color: var(--Text-Black, #141414);

        /* Body Small */
        font-family: "Fira Sans";
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 300;
        line-height: 1.125rem; /* 128.571% */
        margin: 0;
    }

    .definition::first-letter {
        text-transform: uppercase
    }

    .definition-title {
        color: var(--Primary-Black, #000);

        /* Uppercase Small */
        font-family: "Fira Sans";
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-transform: uppercase;
        margin: 0 0 0.35rem;
    }

    .title{
        display: flex;
        flex-direction: row;
        align-items: center;
        /* height: 1.75rem; */
        margin: 0 0 0.25rem;
    }

    .title h2::first-letter {
        text-transform: uppercase;
    }

    .title-container {
        margin-bottom: 1.25rem;
    }

    .result{
        margin: 0;
        color: var(--Text-Black, #141414);
        /* H2 TNR */
        font-family: "Times New Roman";
        font-size: 1.5rem;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }

    .subtitle{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: left;
        column-gap: 8px;
        margin-bottom: 0.25rem;
        height: 1.5rem;
        white-space: nowrap; /* Prevent text wrapping */
        
    }

    .subtitle h3 {
        padding: 0;
    }

    .subtitle i {
        color: var(--Text-Black, #141414);
        /* Body Italic TNR */
        font-family: "Times New Roman";
        font-size: 1rem;
        font-style: italic;
        font-weight: 400;
        line-height: normal;
    }

    .subtitle-text{
        min-height: 22px;
        max-height: max-content;
        font-style: italic;
        margin: 0;
    }

    .phonetic {
        max-width: 16rem;
        overflow: hidden; /* Hide overflowed text */
        text-overflow: ellipsis;
    }

    .tags{
        display: flex;
        flex-direction: row;
        column-gap: 8px;
    }

</style>