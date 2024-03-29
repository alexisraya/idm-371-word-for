<script lang="ts">
  import Tags from "./Tags.svelte";
  import { textToSpeech } from "./helpers/translate";
  import { goto } from '$app/navigation';
  import { resultData } from "../stores/translateStore";
  import speaker from '$lib/assets/speaker.png';
  import chevronBold from '$lib/assets/chevronBold.svg';
	import { setLocalStorageItem } from "./helpers/helperFunctions";

    export let originLanguage: string;
    export let translateLanguage: string;
    export let phrase: string;
    export let region: string;
    export let context: string;
    export let partSpeech: string;
    export let phoneticSpelling: string;
    export let examples: any[];
    export let description: string;

    let speechOutput = '';

    const handleSpeak = async() => {
        if (speechOutput !==''){
            let audio = new Audio(speechOutput);
            audio.play();
        }
        else{
            try {
                speechOutput = await textToSpeech(phrase);
            } catch (error) {
                console.error('Error:', error);
                speechOutput = 'Error occurred during text-to-speech conversion.';
            }
        }
    }

    const handleClick = () => {
        const resultObj = {
            result: {
                word: phrase,
                region,
                context,
                partSpeech,
                phoneticSpelling,
                description,
                examples,
                originalLanguage: originLanguage,
                translateLanguage
            }
        }
        resultData.set(resultObj);
        setLocalStorageItem("resultData", JSON.stringify(resultObj));
        goto('/result')
    };
</script>
<div class="bookmark-container">
    <details class="dropdown-wide">
        <summary class="text-container">
            <div class="title">
                <h1 class="result">{phrase}</h1>
                <button on:click={handleSpeak}>
                    <img class="speaker" alt="speacker icon" src={speaker} />
                </button>
                {#if speechOutput!== ''}
                    <audio autoplay><source type="audio/mpeg" src={speechOutput}></audio>
                {/if}
            </div>
            <div class="subtitle">
                <i class="subtitle-text phonetic">{phoneticSpelling}</i>
                <h3>•</h3>
                <i class="subtitle-text">{partSpeech}</i>
            </div>
            <div class="tags">
                <Tags tagName={region}/>
                {#if context}
                <Tags tagName={context}/>
                {/if}
            </div>
        </summary>
        <p class="definition-title">Definitions</p>
        <p class="definition">{description}</p>
        <button class="learn-more-btn" on:click={handleClick}>
            Learn More
            <img class="side-arrow" src="{chevronBold}" alt="chevron">
        </button>
    </details>
</div>
<style>
    button{
        border: 0;
        padding: 0;
        margin: 0;
        background-color: transparent;
    }

    button:hover{
        cursor: pointer;
    }

    /* .container{
        padding: 24px;
        width: 342px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        border: .5px;
        border-color: black;
        box-shadow: 0px 5px 15px 4px rgba(0, 0, 0, 0.10);
        border-radius: 20px;
    } */

    .text-container{
        max-width: 270px;
        display: flex;
        flex-direction: column;
    }

    .definition{
        overflow: hidden;
        -webkit-line-clamp: 2;
        color: var(--Text-Black, #141414);
        margin: 0.25rem 0 1.5rem;

        /* Body Small */
        font-family: "Fira Sans";
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 300;
        line-height: 1.125rem; /* 128.571% */
    }

    .definition::first-letter {
        text-transform: uppercase;
    }

    .title{
        display: flex;
        flex-direction: row;
        align-items: center;
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

    .result::first-letter {
        text-transform: uppercase;
    }

    .speaker{
        height: 30px;
        padding: 7px 7px 0;
    }

    .subtitle{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: left;
        column-gap: 8px;
        height: 1.5rem;
        margin-bottom: 0.5rem;
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
        font-style: italic;
        height: 22px;
        margin: 0;
    }

    .subtitle-text{
        font-style: italic;
        height: 22px;
        margin: 0;
    }

    .phonetic {
        max-width: 15rem;
        overflow: hidden; /* Hide overflowed text */
        text-overflow: ellipsis;
    }

    .tags{
        display: flex;
        flex-direction: row;
        column-gap: 8px;
    }



    .text-container{
        max-width: 270px;
        display: flex;
        flex-direction: column;
    }


    .dropdown-wide {
        /* Reset. */
        border: unset;

        /* Layout */
        display: flex;
        position: relative;

        padding: 24px;
        min-height: 2.75rem;
        justify-content: space-between;
        align-items: center;
        
        /* Style */
        list-style-type: none;
        border-radius: 1.5rem;
        background: var(--white);
        color: var(--text-black);
        box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.15);
    }

    .dropdown-wide summary {
        /* Layout */
        display: flex; /* also removes the list marker */
        align-items: top;

        /* Style */
        list-style: none;
        
    }

    h3 {
        margin: 0;
    }

    .dropdown-wide summary::after {
        /* Arrow */
        content: '';
        width: 32px;
        height: 32px;
        padding: 0;
        margin-top: -0.25rem;
        /* margin-left: 19.5rem; */
        margin-left: calc(100% - 4.5rem);
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

    .definition-title {
        color: var(--Primary-Black, #000);

        /* Uppercase Small */
        font-family: "Fira Sans";
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-transform: uppercase;
        margin: 2rem 0 0.35rem;
    }

    .learn-more-btn{
        display: flex;
        width: 100%;
        align-self: center;
        align-items: center;
        justify-content: center;
        color: var(--Text-Black, #141414);

        /* Uppercase Heavy */
        font-family: "Fira Sans";
        font-size: 1rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }

    .side-arrow {
        transform: rotate(-90deg);
        fill: var(--Primary-Black, #000);
        width: 1.5rem;
        flex-shrink: 0;
    }

    .bookmark-container {
        box-sizing: border-box;
        width: 100%;
        max-width: 342px;
        margin-bottom: 1.5rem;
    }
    
</style>