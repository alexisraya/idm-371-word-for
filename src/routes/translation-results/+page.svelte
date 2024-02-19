<script>
  import { formData } from "../../stores/translateStore";
  import TranslationResult from "$lib/TranslationResult.svelte";
  import Tags from "$lib/Tags.svelte";
  import arrow from '$lib/assets/lineArrow.svg'
  import gradient from '$lib/assets/gradient.svg';


  
  // Subscribe to changes in the store
  let formDataValue = {};
  formData.subscribe(value => {
    formDataValue = value;
  });

  const dataObject = formDataValue.value;
  const translationResults = JSON.parse(dataObject).translations;

</script>

<div class="page-container">
  <div class="search-overview">
    <div class="language-overview">
        <span><i>Language 1</i></span>
        <div class="arrow-container">
          <img src="{arrow}" alt="arrow">
        </div>
        <span><i>Language 2</i></span>
    </div>
    <h1>Lorem Ipsum</h1>
  </div>

  <div class="results-container">
    {#each translationResults as result}
        <TranslationResult description={result.definition} partSpeech={result.part_of_speech} phoneticSpelling={result.phonetic_spelling} word={result.translation} region={result.region} context={result.context} examples={result.examples} originalLanguage={result.original_language} translateLanguage={result.translate_language}/>
    {/each}
  </div>
</div>

<div class="gradient-bg">
  <img src="{gradient}" alt="gradient">
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
    bottom: -20rem;
    left: -5rem;
    position: fixed;
    scale: 100%;
    filter: blur(3rem);
    z-index: -1;
    animation: fadeInAnimation cubic-bezier(.39, -1.05, .58, 1.95) 1s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    transform-origin: center;
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

</style>