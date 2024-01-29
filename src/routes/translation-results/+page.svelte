<script>
  import { formData } from "../../stores/translateStore";
  import TranslationResult from "$lib/TranslationResult.svelte";
  // Subscribe to changes in the store

  let formDataValue = {};
  formData.subscribe(value => {
    formDataValue = value;
  });

  let dataObject = formDataValue.value;
  console.log(dataObject);
  // Translation results{ description: "formal greeting used in the afternoon", part_of_speech: "phrase", phonetic_spelling: "bweh-nas tar-des", word: "buenas tardes"
  let translationResults = JSON.parse(dataObject).translations;

</script>

<h1>Translation Results</h1>
{#each translationResults as result}
    <TranslationResult description={result.description} partSpeech={result.part_of_speech} phoneticSpelling={result.phonetic_spelling} word={result.translation}/>
{/each}
<p>test</p>
