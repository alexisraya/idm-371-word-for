<script>
    import { resultData } from "../../stores/translateStore";
    import Tags from "$lib/Tags.svelte";
    import Speaker from "$lib/Speaker.svelte";

    import emptyBookmark from '$lib/assets/emptyBookmark.svg';
    import gradient from '$lib/assets/gradient.svg';
    import filledBookmark from '$lib/assets/filledBookmark.svg';
    import { isBookmarked, updatebookmark } from "../../stores/bookmarkStore";
  import ToastMessage from "$lib/ToastMessage.svelte";

    let resultObj = {};
    resultData.subscribe(result => {
        resultObj = result;
    });
    
    resultObj = resultObj.result;

    const word = resultObj.word;
    const region = resultObj.region;
    const context = resultObj.context;
    const partSpeech = resultObj.partSpeech;
    const phoneticSpelling = resultObj.phoneticSpelling;
    const description = resultObj.description;
    const examples = Object.values(resultObj.examples);
    const originalLanguage = resultObj.originalLanguage;
    const translateLanguage = resultObj.translateLanguage;

    let bookmarkItem = {
            originLanguage: originalLanguage,
            translateLanguage,
            phrase: word,
            region,
            context,
            partSpeech,
            phoneticSpelling,
            examples,
            description
    }

    let isInBookmarks = isBookmarked(bookmarkItem);

    let bookmarkIcon = emptyBookmark;

    let toastMessage = ""
    let isToastShowing = false;

    $:{
        if(isInBookmarks){
            bookmarkIcon = filledBookmark
            toastMessage = "Bookmarked!"
        }
        else{
            bookmarkIcon = emptyBookmark;
            toastMessage = "Bookmark Removed!"
        }
    }

    const displayToast = () => {
        isToastShowing = true;
        setTimeout(()=>{isToastShowing=false}, 4500);
    }

    const handleBookmark = () => {
        updatebookmark(bookmarkItem);
        isInBookmarks = !isInBookmarks;
        displayToast();
    }

    const handleAccurate = () => {
        const accurateBtn = document.getElementById("accurate-btn");
        const inaccurateBtn = document.getElementById("inaccurate-btn");
        if (accurateBtn && inaccurateBtn){
            const currentBackgroundColor = accurateBtn.style.backgroundColor;
            if (currentBackgroundColor !== "black"){
                accurateBtn.style.backgroundColor = "black"; 
                accurateBtn.style.color = "white";  
                inaccurateBtn.style.backgroundColor = "transparent"; 
                inaccurateBtn.style.color = "black";

                toastMessage= "Submission Recieved!";
                displayToast();
            }
            else{
                accurateBtn.style.backgroundColor = "transparent"; 
                accurateBtn.style.color = "black";
            }
        }
    }

    const handleInaccurate = () => {
        const accurateBtn = document.getElementById("accurate-btn");
        const inaccurateBtn = document.getElementById("inaccurate-btn");
        if (accurateBtn && inaccurateBtn){
            const currentBackgroundColor = inaccurateBtn.style.backgroundColor;
            if (currentBackgroundColor !== "black"){
                inaccurateBtn.style.backgroundColor = "black"; 
                inaccurateBtn.style.color = "white";  
                accurateBtn.style.backgroundColor = "transparent"; 
                accurateBtn.style.color = "black";

                toastMessage= "Submission Recieved!";
                displayToast();
            }
            else{
                inaccurateBtn.style.backgroundColor = "transparent"; 
                inaccurateBtn.style.color = "black";
            }
        }
    }
</script>

<div class="container">
    <div class="text-container">
        <div class="title">
            <h1 class="result">{word}</h1>
            <Speaker phrase={word} />
            <button on:click={handleBookmark}>
                <img class="bookmark icon" alt="bookmark icon" src={bookmarkIcon} />
            </button>
        </div>
        <div class="subtitle">
            <h3 class="subtitle-text phonetic">{phoneticSpelling}</h3>
            <h2>•</h2>
            <h3 class="subtitle-text">{partSpeech}</h3>
        </div>
        <div class={`tags ${(region.length===0 && context.length===0) ? 'no-tags' : ''}`}>
            {#if region.length<=12 && region!="all regions"}
                <Tags tagName={region}/>
            {/if}
            {#if context}
                <Tags tagName={context}/>
            {/if}
        </div>
        <div class="definition">
            <h3>DEFINITIONS</h3>
            <p class="definition-description">{description}</p>
        </div>
        <div class="definition">
            <h3>EXAMPLES</h3>
            <h4>{originalLanguage}</h4>
            <div class="example-container">
                <p class="examples">{examples[0]}</p>
                <Speaker phrase={examples[0]} />
            </div>
            <h4>{translateLanguage}</h4>
            <div class="example-container">
                <p class="examples">{examples[1]}</p>
                <Speaker phrase={examples[1]} />
            </div>
        </div>
    </div>
</div>

{#if isToastShowing}
<div class="toast">
    <ToastMessage message={toastMessage} />
</div>
{/if}

<div class="accuracy">
    <button class="accurate" id="accurate-btn" on:click={handleAccurate}>
        Accurate
    </button>
    <button class="inaccurate" id="inaccurate-btn" on:click={handleInaccurate}>
        Inaccurate
    </button>
</div>

<div class="gradient-bg">
    <img src="{gradient}" alt="gradient">
</div>

<style>
    h1 {
        color: var(--text-black, #141414);

        /* H1 TNR */
        font-family: "Times New Roman";
        font-size: 2.5rem;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }

    h1::first-letter {
        text-transform: uppercase;
    }

    h2, h3{
        margin: 0;
    }

    button{
        border: 0;
        padding: 0;
        margin: 0;
        background-color: transparent;
    }

    button:hover{
        cursor: pointer;
    }

    .container{
        padding: 24px;
        max-width: 100vw;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        min-height: calc( 100vh - 12rem);
    }

    .text-container{
        display: flex;
        flex-direction: column;
    }

    .definition{
        margin-top: 2rem;
        overflow: hidden;
        -webkit-line-clamp: 2;
    }

    .definition h3 {
        color: var(--Primary-Black, #000);

        /* Uppercase */
        font-family: "Fira Sans";
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-transform: uppercase;
        margin-bottom: 0.5rem;
    }

    .definition p {
        color: var(--Text-Black, #141414);

        /* Body */
        font-family: "Fira Sans";
        font-size: 1rem;
        font-weight: 300;
        line-height: 1.25rem; /* 125% */
        margin: 0;
    }

    .definition p::first-letter {
        text-transform: uppercase;
    }

    .definition h4 {
        color: var(--Stone-Grey, #979797);

        /* Body */
        font-family: "Fira Sans";
        font-size: 1rem;
        font-style: normal;
        font-weight: 300;
        line-height: 1.25rem; /* 125% */
        margin: 0.75rem 0;
    }

    .examples {
        font-style: italic;
    }

    .result{
        margin: 0;
    }

    .icon{
        height: 30px;
    }

    .subtitle{
        display: inline-flex;
        align-items: center;
        gap: 1rem;
    }

    .subtitle-text{
        color: var(--text-black, #141414);

        /* Body Large Italic */
        font-family: "Times New Roman";
        font-size: 1.25rem;
        font-style: italic;
        font-weight: 400;
        margin: 0;
    }

    .tags {
        display: flex;
        flex-direction: row;
        column-gap: 8px;
        margin-top: 0.75rem;
    }

    .no-tags {
        margin-top: 0;
        height: 0;
    }

    .gradient-bg img {
        bottom: -20rem;
        left: -5rem;
        position: fixed;
        scale: 100%;
        filter: blur(3rem);
        z-index: -1;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        transform-origin: center;
    }

    .accuracy {
        width: calc(100vw - 3rem);
        max-width: 30rem;
        margin: auto;
        height: 2.75rem;
        flex-shrink: 0;

        /* Style */
        border-radius: 12.5rem;
        border: 1px solid var(--Primary-Black, #000);
        background: rgba(255, 255, 255, 0.40);
        display: flex;
    }

    .accuracy button {
        color: var(--Primary-Black, #000);

        /* Body Alt */
        font-family: "Fira Sans";
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        cursor: pointer;
        width: 50%;
    }

    .accurate {
        border-radius: 12.5rem 0 0 12.5rem;
        border-right: 0.66px solid var(--Primary-Black, #000);
    }

    .inaccurate {
        border-radius: 0 12.5rem 12.5rem 0;
        border-left: 0.66px solid var(--Primary-Black, #000);
    }

    .title {
        display: grid;
        grid-template-columns: 1fr 2.75rem 2rem;
        flex-direction: row;
        align-items: center;
    }


    .bookmark {
        height: 1.5rem;
        margin: auto;
    }

    .example-container {
        display: flex;
    }

    .toast {
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        bottom: 6rem;
    }
</style>