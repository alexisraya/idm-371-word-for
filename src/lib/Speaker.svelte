<script lang="ts">
    import { textToSpeech } from "./helpers/translate";
    import speaker from '$lib/assets/speaker.png';
    import speakerFill from '$lib/assets/speakerFill.png';

    export let phrase: string;
    let isAudioPlaying = false;
    let speechOutput = '';

    const handleSpeak = async() => {
        isAudioPlaying = true;
        if (speechOutput !==''){
            let audio = new Audio(speechOutput);
            await audio.play();
        }
        else{
            try {
                speechOutput = await textToSpeech(phrase);
            } catch (error) {
                console.error('Error:', error);
                speechOutput = 'Error occurred during text-to-speech conversion.';
            }
        }

        setTimeout(() => {isAudioPlaying = false}, 1000)
    }
</script>

<button on:click={handleSpeak}>
    <div class="speaker-container">
        {#if isAudioPlaying}
        <img class="speaker" alt="speaker icon" src={speakerFill} />
        {:else}
        <img class="speaker" alt="speaker icon" src={speaker} />
        {/if}
    </div>
</button>
{#if speechOutput!== ''}
    <audio autoplay><source type="audio/mpeg" src={speechOutput}></audio>
{/if}


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

    .speaker{
        height: 30px;
        padding: 7px;
    }

    .speaker-container {
        max-height: 1.5rem;
        display: flex;
        align-items: center;
    }
</style>