<script lang="ts">
    import Tags from "./Tags.svelte";
    import translateArrow from '$lib/assets/translateArrow.svg'
    import trash from '$lib/assets/trash.svg'
    import { formData, resetFormData } from "../stores/translateStore";
    import { translatePhrase } from "./helpers/translate";
    import { goto } from "$app/navigation";
    import { deleteRecentSearchItem } from "../stores/recentSearchStore";
	import { setLocalStorageItem } from "./helpers/helperFunctions";
    import { updateInputs } from "../stores/inputStore";
    import { onMount } from "svelte";
    import { updateLoading } from "../stores/loadingStore";
	import { isEditing } from "../stores/editingStore";
    import { fade , fly } from 'svelte/transition';


    export let phrase: string;
    export let region: string;
    export let context: string;
    export let originLanguage: string;
    export let translateLanguage: string;
    export let dayTime: string;

    const handleSubmit = async() => {
        updateLoading(true);
        resetFormData();
        let selectedRegions = [{text: region}];
        let selectedContexts = [{text: context}];
        console.log(selectedRegions)
        console.log(selectedContexts)
        updateInputs(originLanguage, translateLanguage, selectedRegions, selectedContexts, phrase);
        const response = await translatePhrase(phrase, originLanguage, translateLanguage, context, region);
        if (response == null){
            alert("An error occurred, please try again.");
        }
        else{
            let result = response.response;
            const resultObj = {value: result};
            formData.set(resultObj);
            setLocalStorageItem("formData", JSON.stringify(resultObj));
            goto('/translation-results');
        }
    };

    const handleDelete = () => {
        let recentSearchItem = {
            phrase,
            selectedRegions: region,
            selectedContexts: context,
            originLanguage,
            translateLanguage,
            dayTime
        }
        deleteRecentSearchItem(recentSearchItem);
    }
</script>

<div class="container" transition:fly={{delay: 100, duration: 200 }}>
    <div class="text-container" on:click={handleSubmit} on:keydown={handleSubmit}>
        <div class="align-container">
            <div class="languages-container">
                <p>{originLanguage}</p>
                <div class="arrow-icon-container">
                    <img src={translateArrow} alt="translate arrow sign">
                </div>
                <p>{translateLanguage}</p>
            </div>
            <div class="dayTime">
                <p>{dayTime}</p>
            </div>
        </div>
        <div class="title">
            <h1>{phrase}</h1>
        </div>
        <div class="tags">
            <Tags tagName={region}/>
            {#if context.length>0}
                <Tags tagName={context}/>
            {/if}
        </div>
    </div>
    {#if $isEditing}
    <button class="trash-icon-container" transition:fade={{ delay: 100, duration: 200 }} on:click={handleDelete}>
        <img src={trash} alt="trash">
    </button>
    {/if}
</div>

<style>
    p, h1{
        margin: 0;
    }

    .trash-icon-container{
        position: absolute;
        right: 1.5rem;
        bottom: 1.25rem;
    }

    .container{
        position: relative;
        padding: 24px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-bottom: 0.5px solid var(--Stone-Grey, #979797);
        cursor: pointer;
    }

    .text-container{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        row-gap: 12px;
    }
    .languages-container{
        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 8px;
    }
    .languages-container p {
        color: var(--Text-Black, #141414);

        /* Body Italic TNR */
        font-family: "Times New Roman";
        font-size: 1rem;
        font-style: italic;
        font-weight: 400;
        line-height: normal;
    }

    .arrow-icon-container{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .title{
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .title h1 {
        color: var(--Text-Black, #141414);

        /* H2 Fira */
        font-family: "Fira Sans";
        font-size: 1.5rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    .title h1::first-letter {
        text-transform: capitalize;
    }
    .tags{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        row-gap: 8px;
        column-gap: 8px;
        max-width: calc(100% - 2.5rem);
    }

    .dayTime p {
        color: var(--Stone-Grey, #979797);

        /* Body XSmall */
        font-family: "Fira Sans";
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 300;
        line-height: 1.125rem; /* 150% */
    }

    button {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
    }

    .align-container {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    /* @media screen and (min-width: 680px){
        .container{
            padding: 24px 40px;
            width: 80%;
            max-width: 1040px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            border: .5px;
            border-color: black;
            box-shadow: 0px 5px 15px 4px rgba(0, 0, 0, 0.10);
            border-radius: 20px;
        }

        .text-container{
            width: 100%;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
    } */
</style>