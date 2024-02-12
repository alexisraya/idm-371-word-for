<script>
  import { formData } from "../../stores/translateStore";
  import TranslationResult from "$lib/TranslationResult.svelte";
  
  // Subscribe to changes in the store
  let formDataValue = {};
  formData.subscribe(value => {
    formDataValue = value;
  });

  const dataObject = formDataValue.value;
  const translationResults = JSON.parse(dataObject).translations;

</script>

<h1>Translation Results</h1>
{#each translationResults as result}
    <TranslationResult description={result.definition} partSpeech={result.part_of_speech} phoneticSpelling={result.phonetic_spelling} word={result.translation} region={result.region} context={result.context} examples={result.examples} originalLanguage={result.original_language} translateLanguage={result.translate_language}/>
{/each}