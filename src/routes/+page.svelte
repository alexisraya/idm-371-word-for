<script lang="ts">
    import { goto } from '$app/navigation';
    import { LANGUAGES } from "$lib/constants/languages";
    import { CONTEXTS } from "$lib/constants/contexts";
    import { REGIONS } from "$lib/constants/regions";
    import { COLORS } from "$lib/constants/colors";
    import { onMount } from 'svelte';
    import swapLanguage from '$lib/assets/swapLanguage.svg'
    import microphone from '$lib/assets/microphone.svg'
    import microphoneActive from '$lib/assets/microphoneActive.svg'

    import { formData, resetFormData } from "../stores/translateStore";
    import { speechToText, translatePhrase } from '$lib/helpers/translate';

    let languages = LANGUAGES;
    let contexts = CONTEXTS;
    let regions = REGIONS.spanish;
    let colors = COLORS;
	let selectedOrigin = languages[0];
    let selectedTranslate = languages[1];
    let selectedContext = [];
    let selectedRegion = [];
    let phrase = '';

    let media = [];
    let audioRecorder: null;
    let isRecording = false;

    // Function to set CSS variables for colors from colors.ts
    const setCSSCustomProperties = () => {
        const css_root = document.documentElement;
        for (const [key, value] of Object.entries(colors)) {
        css_root.style.setProperty(`--${key.replace('_', '-')}`, value);
        }
    };

    // Call the function to set CSS custom properties
    onMount(async () => {
        setCSSCustomProperties();
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioRecorder = new MediaRecorder(stream);
        audioRecorder.ondataavailable = (e) => media.push(e.data)
        audioRecorder.onstop = function(){
            handleTranscription();
        };
    });

    const startRecording = () => {
        isRecording = true;
        audioRecorder.start();
    }
    const stopRecording = () => {
        isRecording = false;
        audioRecorder.stop();
    }

    function sanitize(str: String) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            "/": '&#x2F;',
        };
        const reg = /[&<>"'/]/ig;
        return str.replace(reg, (match)=>(map[match]));
    }

    let selectedRegions = "";

    $: if (selectedRegion.length >0){
        let regionStr = "";
        selectedRegion.forEach(region => {
            let str = `, ` + region.text;
            regionStr += str;
        });

        selectedRegions = regionStr.substring(2);
    }
    else{
        selectedRegions = "all regions"
    }

    let selectedContexts = "";
    $: if (selectedContext.length >0){
        let contextStr = "";
        selectedContext.forEach(context => {
            if (!selectedContexts.includes(context)){
                let str = `, ` + context.text;
                contextStr += str;
            }
        });
        selectedContexts = contextStr.substring(2);
    }

    $: originLanguage = selectedOrigin.text;
    $: translateLanguage = selectedTranslate.text;

    let loading = false;

    const handleSubmit = async() => {
        loading = true;
        phrase = sanitize(phrase);
        resetFormData();
        const response = await translatePhrase(phrase, originLanguage, translateLanguage, selectedContexts, selectedRegions);
        if (response == null){
            loading = false;
            alert("An error occurred, please try again.");
        }
        else{
            let result = response.response;
            formData.set({ value: result });
            goto('./translation-results');
        }
    };

    const handleTranscription = async() => {
        if (media.length<=0){
            return;
        }
        const blob = new Blob(media, {'type' : 'audio/ogg; codecs=opus'});
        media = [];
        let src = window.URL.createObjectURL(blob);
        phrase = await speechToText(blob);
    }

    const handleAudio = () => {
        if(!isRecording){
            startRecording();
        }
        else{
            stopRecording();
        }
    }

</script>

{#if loading === false}
    <div class="home-form-container">
        <form on:submit|preventDefault={handleSubmit}>
            <div class="dropdown-container">
                <div class="dropdown-language-container">
                    <select class="dropdown-thin" bind:value={selectedOrigin}>
                        {#each languages as language}
                            <option value={language}>
                                {language.text}
                            </option>
                        {/each}
                    </select>
                    <div class="swap-icon-container">
                        <img src={swapLanguage} alt="swap-languages">
                    </div>
                    <select class="dropdown-thin" bind:value={selectedTranslate}>
                        {#each languages.reverse() as language}
                            <option value={language}>
                                {language.text}
                            </option>
                        {/each}
                    </select>
                </div>

                <details class="dropdown-wide">
                    <summary><div>Region</div></summary>
                    <fieldset>
                        <ul>
                            {#each regions as region}
                                <li>
                                    <input type="checkbox" id={region.text} name={region.text} value={region} bind:group={selectedRegion}/>
                                    <label for={region.text}>{region.text}</label>
                                </li>
                            {/each}
                        </ul>
                    </fieldset>
                </details>

                <details class="dropdown-wide">
                    <summary><div>Context</div></summary>
                    <fieldset>
                        <ul>
                            {#each contexts as context}
                                <li>
                                    <input type="checkbox" id={context.text} name={context.text} value={context} bind:group={selectedContext}/>
                                    <label for={context.text}>{context.text}</label>
                                </li>
                            {/each}
                        </ul>
                    </fieldset>
                </details>
            </div>

        <div class="translate-text-field-container">
            <input class="translate-text-field" bind:value={phrase} placeholder="Enter text here" id="translateText"/>
            <div class="or-separator-container">
                <hr>
                <p class="or-separator">OR</p>
                <hr>
            </div>
            <button class="record-button" type="button" on:click={handleAudio}>
                {#if isRecording}
                <img class="record-icon-active" src={microphoneActive} alt="record-icon">
                {:else}
                <img class="record-icon-inactive" src={microphone} alt="record-icon">
                {/if}
            </button>
        </div>

            <div class="translate-button-container">
                <button class="translate-button" disabled={!phrase} type="submit">
                Translate
                </button>
            </div>
        </form>
    </div>
{:else}
    <h2>Translating... please wait</h2>
{/if}

<style>
    @import url('https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400;1,500&display=swap');

    li {
        list-style: none;
    }

    .dropdown-wide {
        /* Reset. */
        border: unset;

        /* Layout */
        display: flex;
        width: 100%;
        max-width: 19.5rem;
        /* max-width: calc(100vw - 1rem); */
        padding: 0 1rem;
        min-height: 2.75rem;
        justify-content: space-between;
        align-items: center;
        
        /* Style */
        list-style-type: none;
        border-radius: 1.5rem;
        background: var(--white);
        color: var(--text-black);
        box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.15);

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
        align-items: center;
        padding: 0.75rem 0;

        /* Style */
        list-style: none;
    }

    .dropdown-wide summary::after {
        /* Arrow */
        content: '';
        width: 32px;
        height: 32px;
        padding: 0;
        margin-left: 17.825rem;
        /* margin-left: calc(100vw - 3rem); */
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

    .dropdown-thin {
        /* Reset. */
        border: unset;

        /* Layout */
        box-sizing: border-box;
        display: flex;
        height: 2.75rem;
        width: 8.875rem;
        padding: 0 1rem;
        justify-content: space-between;
        align-items: center;

        /* Style */
        border-radius: 1.5rem;
        background: var(--white);
        color: var(--text-black);
        box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.15);
        font-family: "Fira Sans";
        font-size: 1rem;
        font-style: normal;
        font-weight: 300;
        line-height: 1.25rem;

        /* Arrow */
        appearance: none;
        background-image: url('$lib/assets/chevron.svg');
        background-repeat: no-repeat;
        background-position: right 0.7rem top 50%;
        background-size: 2rem auto;

    }

    .dropdown-container {
        /* Layout */
        
        display: inline-flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }

    .dropdown-language-container {
        /* Layout */
        width: 100%;
        max-width: 21.5rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .swap-icon-container {
        /* Layout */
        display: flex;
        width: 2rem;
        height: 2rem;
        padding: 0.5rem 0.2rem 0;
        margin: 0 0.81rem;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
    }

    .swap-icon-container img {
        /* Layout */
        flex-shrink: 0;
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
        border: 1px solid var(--primary-black);
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
        background-color: var(--primary-black);
        transform: scale(0);
        animation: scaleIn 0.2s ease 1ms forwards;
    }


    /* Styles for text input field */

    .translate-text-field {
        /* Layout */
        width: 100%;
        max-width: 21rem;
        height: 12.375rem;
        flex-shrink: 0;
        padding: 0;
        margin-bottom: 1rem;

        /* Style */
        border-radius: 1rem;
        border-color: transparent;
        text-align: center;
        background: var(--white, #FFF);
        color: var(--text-black);

        /* H1 Fira */
        font-family: "Fira Sans";
        font-size: 2.5rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    .translate-text-field::placeholder {
        color: var(--stone-grey, #979797);
    }

    .translate-text-field:focus {
        /* Dropshadow on select */
        filter: drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.15));
    }

    .translate-text-field-container {
        margin-top: 2rem;
        max-width: 21.5rem;
        width: 100%;
    }

    /* OR separator */

    .or-separator {
        /* Layout */
        margin: 0;
        padding: 0 0.5rem;
        /* Font Styles */
        color: var(--dust-grey, #CDCDCD);
        font-family: "Fira Sans";
        font-size: 1.25rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    .or-separator-container hr {
        /* Layout */
        margin: 0;
        width: 2.0625rem;
        height: 0.0625rem;
        display: flex;
        align-self: center;

        /* Style */
        background-color: var(--dust-grey, #CDCDCD);
        border: var(--dust-grey, #CDCDCD);
    }

    .or-separator-container {
        /* Layout */
        width: 6.75rem;
        display: flex;
        justify-content: center;
        margin: auto;
    }

    /* Translate Button Styles (copy for component in future)*/
    .translate-button {
        /* Layout */
        width: 100%;
        max-width: 21.5rem;
        height: 2.75rem;
        padding: 0.75rem 8.5rem;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;

        /* Styles */
        border-radius: 1.5rem;
        border: 0.66px solid var(--primary-black, #000);
        color: var(--white, #FFF);
        background: var(--primary-black, #000);

        /* Font Styles */
        font-family: "Fira Sans";
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

        /* Animation */
        transition: .2s ease;
    }

    .translate-button:disabled {
        border: 1px solid var(--stone-grey, #979797);
        background: var(--white, #FFF);
        color: var(--stone-grey);
    }

    .translate-button-container {
        max-width: 22.875rem;
        margin: 6rem auto 2rem;
        bottom: 2.125rem;
        z-index: -1;
    }

    .home-form-container {
        width: fit-content;
        padding: 1rem;
        margin: auto;
    }

    /* Record button */

    .record-button {
        /* Clear Styles */
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;

        /* Layout */
        width: 8.8rem;
        height: 8.8rem;
        align-items: center;
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        margin: 3rem auto 0;

        /* Animation */
        transition: 0.2s;

    }

    @keyframes scaleImage {
        0% {
            transform: scale(0.7);
            opacity: 0.8;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }

    .record-icon-active, .record-icon-inactive {
        animation: 0.225s cubic-bezier(.51,.92,.24,1.15) 0s 1 scaleImage;
    }


</style>