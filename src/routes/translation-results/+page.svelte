<script lang="ts">
  import { formData, updateFormData } from "../../stores/translateStore";
  import { inputData, updateInputData } from "../../stores/inputStore"
  import TranslationResult from "$lib/TranslationResult.svelte";
  import Tags from "$lib/Tags.svelte";
  import arrow from '$lib/assets/lineArrow.svg'
  import { GRADIENTS } from "$lib/constants/gradients";
  import { getGradient } from "$lib/helpers/helperFunctions";
	import { onDestroy, onMount } from "svelte";
	import { setPreviousPage } from "../../stores/pageStore";


  
  // Subscribe to changes in the store
  let formDataValue = {};
  let inputDataValue = {};
  let region = "all regions";
  let source = GRADIENTS.default.source;
  let regions: any[] = [];
  let contexts: any[] = [];
  let dataObject: any = null;
  let translationResults: any[] = [];

  onMount(() => {
    updateInputData();
    inputData.subscribe(value => {
      inputDataValue = value;
    })
    updateFormData();
    formData.subscribe(value => {
      formDataValue = value;
    });
    regions = inputDataValue.regions;
    contexts = inputDataValue.contexts;
    if (regions.length !== 0){
      region = regions[0].text.slice(0,-5);
      source = getGradient(region);
    }
    dataObject = formDataValue.value;
    translationResults = JSON.parse(dataObject).translations;
  })

  onDestroy(() => {
    setPreviousPage("translationResults");
  })

</script>

<div class="page-container">
  <div class="search-overview">
    <div class="language-overview">
        <span><i>{inputDataValue.lang1}</i></span>
        <div class="arrow-container">
          <img src="{arrow}" alt="arrow">
        </div>
        <span><i>{inputDataValue.lang2}</i></span>
    </div>
    <h1>{inputDataValue.phrase}</h1>
    <!-- Tags -->
    <div class={`tags ${(!regions.length && !contexts.length) ? 'no-tags' : ''}`}>
      {#each regions as region}
        <Tags tagName={region.text} />
      {/each}
      
      {#each contexts as context}
        <Tags tagName={context.text} />
      {/each}
    </div>
  </div>

  <div class="results-container">
    {#each translationResults as result}
        <TranslationResult description={result.definition} partSpeech={result.part_of_speech} phoneticSpelling={result.phonetic_spelling} word={result.translation} region={result.region} context={result.context} examples={result.examples} originalLanguage={result.original_language} translateLanguage={result.translate_language}/>
    {/each}
  </div>
</div>

<div class="gradient-bg">
  <img src="{source}" alt="gradient">
</div>

<style>

  .language-overview {
    display: inline-flex;
    height: 1.4375rem;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  .language-overview span {
    color: var(--Text-Black, #141414);

    /* Body Italic TNR */
    font-family: "Times New Roman";
    font-size: 1rem;
    font-style: italic;
    font-weight: 400;
    line-height: normal;
  }

  .arrow-container {
    display: flex;
    width: 2rem;
    height: 2rem;
    padding: 0.625rem 0.48875rem 0.67688rem 0.4375rem;
    justify-content: center;
    align-items: center;
  }

  .search-overview h1 {
    color: var(--Text-Black, #141414);

    /* H1 Fira */
    margin: 0.5rem 0 0;
    font-family: "Fira Sans";
    font-size: 2.5rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: capitalize;
  }

  .search-overview {
    margin: 1.5rem 0 2rem ;
  }

  .results-container:nth-child(-n + 1) {
    background-color: #141414;
  }

  .page-container {
    padding: 0 1.5rem;
    width: fit-content;
    margin: auto;
  }

  .gradient-bg img {
    bottom: -15rem;
    left: -5rem;
    position: fixed;
    scale: 100%;
    rotate: -40deg;
    filter: blur(56px);
    z-index: -1;
    animation: fadeInAnimation cubic-bezier(.39, -1.05, .58, 1.95) 1s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    transform-origin: center;
  }

  @media screen and (width > 900px) {
    .gradient-bg img {
    bottom: -45rem;
    left: 10%;
    position: fixed;
    scale: 200%;
    rotate: -10deg;
    filter: blur(60px);
    z-index: -1;
    animation: fadeInAnimation cubic-bezier(.39, -1.05, .58, 1.95) 1s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    transform-origin: center;
  }
  }

  @keyframes fadeInAnimation {
    0% {
      opacity: 0;
      transform: scale3d(.75,.75,1);
    }
    100% {
      opacity: 1;
      transform: scale3d(1,1,1);
    }
}

.tags {
        display: flex;
        flex-direction: row;
        column-gap: 8px;
        margin-top: 0.5rem;
    }

    .no-tags {
      display: flex;
      flex-direction: row;
      column-gap: 8px;
      margin-top: 0;
    }

</style>