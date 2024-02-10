<script>
    import { resultData } from "../../stores/translateStore";
    import { textToSpeech } from "$lib/helpers/translate";
    import Tags from "$lib/Tags.svelte";

    import speaker from '$lib/assets/speaker.png';
    import emptyBookmark from '$lib/assets/emptyBookmark.png';

    let resultObj = {};
    resultData.subscribe(result => {
        resultObj = result;
    });
    
    resultObj = resultObj.result;

    const word = resultObj.word;
    const region = resultObj.region;
    const context = resultObj.context;
    const partSpeech = resultObj.partSpeech;
    const phoneticSpelling = resultObj.phoneticSpelling;
    const description = resultObj.description;
    const examples = Object.values(resultObj.examples);
    const originalLanguage = resultObj.originalLanguage
    const translateLanguage = resultObj.translateLanguage

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
            <img class="bookmark icon" alt="bookmark icon" src={emptyBookmark} />
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
        <div class="definition">
            <h3>DEFINITIONS</h3>
            <p class="definition">{description}</p>
        </div>
        <div class="definition">
            <h3>EXAMPLES</h3>
            <h4>{originalLanguage}</h4>
            <p>{examples[0]}</p>
            <h4>{translateLanguage}</h4>
            <p>{examples[1]}</p>
        </div>
    </div>
</div>

<style>
    h2{
        margin: 0;
    }

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
        max-width: 100vw;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
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

    .icon{
        height: 30px;
    }

    .subtitle{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: left;
        column-gap: 8px;
        padding: 8px 0 12px 0;
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