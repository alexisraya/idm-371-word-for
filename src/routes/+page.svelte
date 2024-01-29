<script lang="ts">
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';
    import { LANGUAGES } from "$lib/constants/languages";
    import { CONTEXTS } from "$lib/constants/contexts";
    import { REGIONS } from "$lib/constants/regions";

    import { formData, resetFormData } from "../stores/translateStore";

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
    const TIMEOUT_MS = 30000;
    let response = '';

	const handleSubmit = async() => {
        loading = true;
        return async ({ action, result }: any) => {
                resetFormData();
                let resultObject = JSON.parse(JSON.stringify(result));

                if (action.search == "?/submit") {
                    if (resultObject.status == 200) {
                        if (resultObject.data.response) {
                            response = resultObject.data.response;
                            formData.set({ value: response });
                            goto('./translation-results');
                        }
                        loading = false;
                    } else {
                        loading = false;
                        alert("An error occurred, please try again.");
                    }
                }
            }
    }
</script>

{#if loading === false}
    <!-- <form on:submit|preventDefault={handleSubmit}> -->
    <form  action="?/submit" method="POST" enctype="multipart/form-data" use:enhance={handleSubmit}>
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

        <input bind:value={phrase} id="phrase" name="phrase" placeholder="Enter text here"/>
        <input hidden bind:value={selectedRegions} id="regions" name="regions"/>
        <input hidden bind:value={selectedContexts} id="contexts" name="contexts"/>
        <input hidden bind:value={originLanguage} id="origin" name="origin"/>
        <input hidden bind:value={translateLanguage} id="translate" name="translate"/>
        <button disabled={!phrase} type="submit">
        Translate
        </button>
    </form>
    {#if response != ""}
        <h2>Text Response</h2>
        <p>{response}</p>
    {/if}
{:else}
    <h2>Translating... please wait</h2>
{/if}
<style>
    li{
        list-style: none;
    }
</style>