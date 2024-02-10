<script lang="ts">
    import { COLORS } from "./constants/colors";
    import Tags from "./Tags.svelte";
    import { goto } from '$app/navigation';
    import { textToSpeech } from "./helpers/translate";

    import speaker from '$lib/assets/speaker.png';
    import cheveron from '$lib/assets/chevron.png';
    import { resultData } from "../stores/translateStore";

    export let description: string;
    export let partSpeech: string;
    export let phoneticSpelling: string;
    export let word: string;
    export let region: string;
    export let context: string;
    export let examples: {};
    export let originalLanguage: string;
    export let translateLanguage: string;

    let speechOutput = '';

    const handleSpeak = async() => {
        if (speechOutput !==''){
            let audio = new Audio(speechOutput);
            audio.play();
        }
        else{
            try {
                speechOutput = await textToSpeech(word);
            } catch (error) {
                console.error('Error:', error);
                speechOutput = 'Error occurred during text-to-speech conversion.';
            }
        }
    }

    const handleClick = () => {
        resultData.set({
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
        })
        goto('/result')
    };
</script>

<div class="container">
    <div class="text-container">
        <div class="title">
            <h1 class="result">{word}</h1>
            <button on:click={handleSpeak}>
                <img class="speaker" alt="speacker icon" src={speaker} />
            </button>
            {#if speechOutput!== ''}
                <audio autoplay><source type="audio/mpeg" src={speechOutput}></audio>
            {/if}
        </div>
        <div class="subtitle">
            <h3 class="subtitle-text phonetic">{phoneticSpelling}</h3>
            <h2>•</h2>
            <h3 class="subtitle-text">{partSpeech}</h3>
        </div>
        <div class="tags">
            {#if region.length<=12 && region!="all regions"}
                <Tags tagName={region}/>
            {/if}
            {#if context}
                <Tags tagName={context}/>
            {/if}
        </div>
        <p class="definition">{description}</p>
    </div>
    <div class="arrow-container" on:click={handleClick} on:keydown={handleClick}>
        <img class="arrow" alt="arrow icon" src={cheveron} />
    </div>
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

    .arrow-container{
        cursor: pointer;
    }

    .text-container{
        max-width: 270px;
        display: flex;
        flex-direction: column;
    }

    .definition{
        overflow: hidden;
        -webkit-line-clamp: 2;
    }

    .title{
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .result{
        margin: 0;
    }

    .speaker{
        height: 30px;
        padding: 7px;
    }

    .subtitle{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: left;
        column-gap: 8px;
    }

    .subtitle-text{
        font-style: italic;
        height: 22px;
        margin: 0;
    }

    .tags{
        display: flex;
        flex-direction: row;
        column-gap: 8px;
    }
</style>