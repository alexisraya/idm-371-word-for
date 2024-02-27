<script lang="ts">
  import Tags from "./Tags.svelte";
  import { textToSpeech } from "./helpers/translate";
  import { goto } from '$app/navigation';
  import { resultData } from "../stores/translateStore";
  import speaker from '$lib/assets/speaker.png';

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
        resultData.set({
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
        })
        goto('/result')
    };
</script>

<div class="container">
    <div class="text-container">
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
            <h3 class="subtitle-text phonetic">{phoneticSpelling}</h3>
            <h2>•</h2>
            <h3 class="subtitle-text">{partSpeech}</h3>
        </div>
        <div class="tags">
            <Tags tagName={region}/>
            <Tags tagName={context}/>
        </div>
        <p class="definition">{description}</p>
    </div>
    <button class="learn-more-btn" on:click={handleClick}>Learn More</button>
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
        flex-direction: column;
        align-items: flex-start;
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

    .learn-more-btn{
        align-self: center;
    }
</style>