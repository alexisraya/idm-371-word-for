<script lang="ts">
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';
    import { LANGUAGES } from "$lib/constants/languages";
    import { CONTEXTS } from "$lib/constants/contexts";
    import { REGIONS } from "$lib/constants/regions";
    import { COLORS } from "$lib/constants/colors";
    import { onMount } from 'svelte';

    import { formData, resetFormData } from "../stores/translateStore";
    import { translatePhrase } from '$lib/helpers/translate';

    let languages = LANGUAGES;
    let contexts = CONTEXTS;
    let regions = REGIONS.spanish;
    let colors = COLORS;
	let selectedOrigin = languages[0];
    let selectedTranslate = languages[1];
    let selectedContext = [];
    let selectedRegion = [];
    let phrase = '';

    // Function to set CSS variables for colors from colors.ts
    const setCSSCustomProperties = () => {
        const css_root = document.documentElement;
        for (const [key, value] of Object.entries(colors)) {
        css_root.style.setProperty(`--${key.replace('_', '-')}`, value);
        }
    };

    // Call the function to set CSS custom properties
    onMount(() => {
        setCSSCustomProperties();
    });

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
    $: if (phrase != ''){
        phrase = sanitize(phrase);
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

</script>

{#if loading === false}
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="17" viewBox="0 0 26 17" fill="none">
                        <path d="M1.46263 6.01055H16.7505C16.9867 6.01055 17.18 5.81725 17.18 5.58099C17.18 5.34474 16.9867 5.15144 16.7505 5.15144H1.46263L5.88705 0.731317C6.05458 0.563791 6.05458 0.293171 5.88705 0.125645C5.71952 -0.0418816 5.4489 -0.0418816 5.28138 0.125645L0.126719 5.2803C0.0880587 5.31896 0.0536944 5.36621 0.0322166 5.42206C-0.0107389 5.52515 -0.0107389 5.64542 0.0322166 5.74852C0.0536944 5.80006 0.0837632 5.84732 0.126719 5.89027L5.28138 11.0449C5.36299 11.1222 5.47038 11.1652 5.58207 11.1652C5.69375 11.1652 5.80114 11.1222 5.88705 11.0406C6.05458 10.8731 6.05458 10.6025 5.88705 10.435L1.46263 6.01055Z" fill="black"/>
                        <path d="M25.7367 11.3285C25.7797 11.2254 25.7797 11.1051 25.7367 11.002C25.7152 10.9505 25.6852 10.9032 25.6422 10.8603L20.4875 5.7056C20.32 5.53807 20.0494 5.53807 19.8819 5.7056C19.7143 5.87313 19.7143 6.14375 19.8819 6.31127L24.302 10.7357H9.01842C8.78217 10.7357 8.58887 10.929 8.58887 11.1652C8.58887 11.4015 8.78217 11.5948 9.01842 11.5948H24.3063L19.8819 16.0149C19.7143 16.1824 19.7143 16.4531 19.8819 16.6206C19.9678 16.7065 20.0752 16.7495 20.1868 16.7495C20.2985 16.7495 20.4059 16.7065 20.4918 16.6249L25.6465 11.4702C25.6852 11.4316 25.7152 11.38 25.7367 11.3285Z" fill="black"/>
                    </svg>
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
                <summary>Context</summary>
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

            <details class="dropdown-wide">
                <summary>Region</summary>
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
        </div>

        <input bind:value={phrase} placeholder="Enter text here"/>
        <button disabled={!phrase} type="submit">
        Translate
        </button>
    </form>
{:else}
    <h2>Translating... please wait</h2>
{/if}
<style>

    li {
        list-style: none;
    }

    .dropdown-wide {
        /* Reset. */
        border: unset;

        /* Layout */
        display: flex;
        width: 21.375rem;
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
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32" fill="none"><path d="M8.14189 12.1303C8.09822 12.1721 8.06322 12.2221 8.0389 12.2774C8.01457 12.3327 8.00138 12.3923 8.0001 12.4527C7.99882 12.5132 8.00947 12.5732 8.03143 12.6296C8.05339 12.6859 8.08624 12.7373 8.12809 12.7809L15.758 20.7373C15.8009 20.7821 15.8525 20.8178 15.9096 20.8422C15.9667 20.8666 16.0281 20.8792 16.0902 20.8792C16.1523 20.8792 16.2137 20.8666 16.2708 20.8422C16.3279 20.8178 16.3795 20.7821 16.4224 20.7373L24.05 12.7786C24.1345 12.6905 24.1805 12.5724 24.1779 12.4504C24.1753 12.3284 24.1243 12.2124 24.0362 12.128C23.9481 12.0436 23.8301 11.9976 23.7081 12.0002C23.5861 12.0028 23.4701 12.0537 23.3857 12.1418L16.0891 19.7556L8.79247 12.1441C8.75068 12.1004 8.70069 12.0654 8.64537 12.0411C8.59004 12.0168 8.53046 12.0036 8.47004 12.0023C8.40961 12.001 8.34953 12.0117 8.29322 12.0336C8.23691 12.0556 8.18549 12.0885 8.14189 12.1303Z" fill="black"/></svg>'), no-repeat;
        background-size: 2rem auto;
        position: absolute;
        left: 21.125rem;
        transition: 0.2s;
    }

    .dropdown-wide[open] > summary::after {
        /* Arrow Animation */
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

        /* Arrow */
        appearance: none;
        background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M8.14189 12.1303C8.09822 12.1721 8.06322 12.2221 8.0389 12.2774C8.01457 12.3327 8.00138 12.3923 8.0001 12.4527C7.99882 12.5132 8.00947 12.5732 8.03143 12.6296C8.05339 12.6859 8.08624 12.7373 8.12809 12.7809L15.758 20.7373C15.8009 20.7821 15.8525 20.8178 15.9096 20.8422C15.9667 20.8666 16.0281 20.8792 16.0902 20.8792C16.1523 20.8792 16.2137 20.8666 16.2708 20.8422C16.3279 20.8178 16.3795 20.7821 16.4224 20.7373L24.05 12.7786C24.1345 12.6905 24.1805 12.5724 24.1779 12.4504C24.1753 12.3284 24.1243 12.2124 24.0362 12.128C23.9481 12.0436 23.8301 11.9976 23.7081 12.0002C23.5861 12.0028 23.4701 12.0537 23.3857 12.1418L16.0891 19.7556L8.79247 12.1441C8.75068 12.1004 8.70069 12.0654 8.64537 12.0411C8.59004 12.0168 8.53046 12.0036 8.47004 12.0023C8.40961 12.001 8.34953 12.0117 8.29322 12.0336C8.23691 12.0556 8.18549 12.0885 8.14189 12.1303Z" fill="black"/></svg>');
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

    .swap-icon-container svg {
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
        /* Hide the default checkbox */
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
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
        background-color: var(--primary-black);
        transform: scale(0);
        animation: scaleIn 0.2s ease 1ms forwards;
    }


</style>