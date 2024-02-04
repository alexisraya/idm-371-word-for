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
        <select bind:value={selectedOrigin}>
            {#each languages as language}
                <option value={language}>
                    {language.text}
                </option>
            {/each}
        </select>

        <select bind:value={selectedTranslate}>
            {#each languages.reverse() as language}
                <option value={language}>
                    {language.text}
                </option>
            {/each}
        </select>

        <details>
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

        <details>
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
</style>