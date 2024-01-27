<script>
	let languages = [
		{ id: 1, text: `English` },
		{ id: 2, text: `Spanish` }
	];

    let contexts = [
		{ id: 1, text: `Casual` },
		{ id: 2, text: `Formal` },
        { id: 3, text: `Honorific` },
        { id: 4, text: `Romantic` },
        { id: 5, text: `Friendly` },
        { id: 6, text: `Professional` },
	];

    let regions = [
		{ id: 1, text: `Argentina` },
		{ id: 2, text: `Bolivia` },
        { id: 3, text: `Chile` },
        { id: 4, text: `Colombia` },
        { id: 5, text: `Costa Rica` },
        { id: 6, text: `Cuba` },
        { id: 7, text: `Dominican Republic` },
        { id: 8, text: `Ecuador` },
        { id: 9, text: `El Salvador` },
        { id: 10, text: `Equatorial Guinea` },
        { id: 11, text: `Guatemala` },
        { id: 12, text: `Honduras` },
        { id: 13, text: `Mexico` },
        { id: 14, text: `Nicaragua` },
        { id: 15, text: `Panama` },
        { id: 16, text: `Paraguay` },
        { id: 17, text: `Peru` },
        { id: 18, text: `Puerto Rico` },
        { id: 19, text: `Spain` },
        { id: 20, text: `Uruguay` },
        { id: 21, text: `Venezuela` }
	];

	let selectedOrigin = {};
    let selectedTranslate = {};
    let selectedContext = [];
    let selectedRegion = [];
    let phrase = '';

    function joinContext(selectedContext) {
		if (selectedContext.length === 1) return selectedContext[0];
		return `${selectedContext.slice(0, -1).join(', ')} and ${selectedContext[selectedContext.length - 1]}`;
	}

    function joinRegion(selectedRegion) {
		if (selectedRegion.length === 1) return selectedRegion[0];
		return `${selectedRegion.slice(0, -1).join(', ')} and ${selectedRegion[selectedRegion.length - 1]}`;
	}

	function handleSubmit() {
        let originLanguage = selectedOrigin.text;
        let translateLanguage = selectedTranslate.text;

        let contexts = (selectedContext.length < 1) ? `any` : '';
        if (contexts !== `any`){
            selectedContext.forEach(context => {
                let str = `, ` + context.text;
                contexts += str;
            });
            contexts = contexts.substring(2);
        }

        let regions = (selectedRegion.length < 1) ? `any` : '';
        if (regions !== `any`){
            selectedRegion.forEach(region => {
                let str = `, ` + region.text;
                regions += str;
            });
            regions = regions.substring(2);
        }

        console.log(originLanguage);
        console.log(translateLanguage);
        console.log(contexts);
        console.log(regions);
        console.log(phrase);
	}
</script>

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

    <!-- <select multiple bind:value={selectedContext} on:change={() => (phrase = '')}>
		{#each contexts as context}
			<option value={context}>
				{context.text}
			</option>
		{/each}
	</select>

    <select multiple bind:value={selectedRegion} on:change={() => (phrase = '')}>
		{#each regions as region}
			<option value={region}>
				{region.text}
			</option>
		{/each}
	</select> -->

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

<style>
    li{
        list-style: none;
    }
</style>