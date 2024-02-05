<script lang="ts">
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';
    import { LANGUAGES } from "$lib/constants/languages";
    import { CONTEXTS } from "$lib/constants/contexts";
    import { REGIONS } from "$lib/constants/regions";

    import { formData, resetFormData } from "../stores/translateStore";
    import { translatePhrase } from '$lib/helpers/translate';

    let languages = LANGUAGES;
    let contexts = CONTEXTS;
    let regions = REGIONS.spanish;
	let selectedOrigin = languages[0];
    let selectedTranslate = languages[1];
    let selectedContext = [];
    let selectedRegion = [];
    let phrase = '';

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
    li{
        list-style: none;
    }
    .dropdown-wide {
        /* Reset. */
        border: unset;

        /* Layout */
        display: flex;
        width: 21.375rem;
        padding: 0 1rem;
        min-height: 2.5rem;
        justify-content: space-between;
        align-items: center;
        
        /* Style */
        list-style-type: none;
        border-radius: 1.5rem;
        background: var(--Pure-White, #FFF);
        box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.15);
    }

    .dropdown-wide summary {
        list-style: none;
        display: flex; /* also removes the list marker */
        align-items: center;
        padding: 10px;
    }

    .dropdown-wide summary::after {
        /* Arrow */
        content: '';
        width: 32px;
        height: 32px;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M8.14189 12.1303C8.09822 12.1721 8.06322 12.2221 8.0389 12.2774C8.01457 12.3327 8.00138 12.3923 8.0001 12.4527C7.99882 12.5132 8.00947 12.5732 8.03143 12.6296C8.05339 12.6859 8.08624 12.7373 8.12809 12.7809L15.758 20.7373C15.8009 20.7821 15.8525 20.8178 15.9096 20.8422C15.9667 20.8666 16.0281 20.8792 16.0902 20.8792C16.1523 20.8792 16.2137 20.8666 16.2708 20.8422C16.3279 20.8178 16.3795 20.7821 16.4224 20.7373L24.05 12.7786C24.1345 12.6905 24.1805 12.5724 24.1779 12.4504C24.1753 12.3284 24.1243 12.2124 24.0362 12.128C23.9481 12.0436 23.8301 11.9976 23.7081 12.0002C23.5861 12.0028 23.4701 12.0537 23.3857 12.1418L16.0891 19.7556L8.79247 12.1441C8.75068 12.1004 8.70069 12.0654 8.64537 12.0411C8.59004 12.0168 8.53046 12.0036 8.47004 12.0023C8.40961 12.001 8.34953 12.0117 8.29322 12.0336C8.23691 12.0556 8.18549 12.0885 8.14189 12.1303Z" fill="black"/></svg>'), no-repeat;
        background-size: cover;
        position: absolute;
        right: 2.75em;
        transition: 0.2s;
    }

    .dropdown-wide[open] > summary::after {
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
        background: var(--Pure-White, #FFF);
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
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
    }

</style>