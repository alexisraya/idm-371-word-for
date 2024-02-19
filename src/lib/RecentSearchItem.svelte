<script lang="ts">
    import Tags from "./Tags.svelte";
    import translateArrow from '$lib/assets/translateArrow.svg'
    import trash from '$lib/assets/trash.svg'
    import { formData, resetFormData } from "../stores/translateStore";
    import { translatePhrase } from "./helpers/translate";
    import { goto } from "$app/navigation";
    import { deleteRecentSearchItem } from "../stores/recentSearchStore";

    export let phrase: string;
    export let region: string;
    export let context: string;
    export let originLanguage: string;
    export let translateLanguage: string;

    const handleSubmit = async() => {
        resetFormData();
        const response = await translatePhrase(phrase, originLanguage, translateLanguage, context, region);
        if (response == null){
            alert("An error occurred, please try again.");
        }
        else{
            let result = response.response;
            formData.set({ value: result });
            goto('/translation-results');
        }
    };

    const handleDelete = () => {
        let recentSearchItem = {
            phrase,
            selectedRegions: region,
            selectedContexts: context,
            originLanguage,
            translateLanguage
        }
        deleteRecentSearchItem(recentSearchItem);
    }
</script>

<div class="container" on:click={handleSubmit} on:keydown={handleSubmit}>
    <div class="text-container">
        <div class="languages-container">
            <p>{originLanguage}</p>
            <div class="arrow-icon-container">
                <img src={translateArrow} alt="translate arrow sign">
            </div>
            <p>{translateLanguage}</p>
        </div>
        <div class="title">
            <h1>{phrase}</h1>
        </div>
        <div class="tags">
            <Tags tagName={context}/>
            <Tags tagName={region}/>
        </div>
    </div>
    <button class="trash-icon-container" on:click={handleDelete}>
        <img src={trash} alt="trash">
    </button>
</div>

<style>
    p, h1{
        margin: 0;
    }
    .container{
        padding: 24px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid black;
        cursor: pointer;
    }

    .text-container{
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
    .tags{
        display: flex;
        flex-direction: row;
        column-gap: 8px;
    }

    @media screen and (min-width: 680px){
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
    }
</style>