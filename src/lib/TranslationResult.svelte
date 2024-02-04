<script lang="ts">
    import { COLORS } from "./constants/colors";
    export let description: string;
    export let partSpeech: string;
    export let phoneticSpelling: string;
    export let word: string;
</script>

<div class="container">
    <h1>{word}</h1>
    <div>
        <h3>{phoneticSpelling}</h3>
        <h3>{partSpeech}</h3>
    </div>
    <p>{description}</p>
</div>

<style>
    .container{
        padding: 24px;
        width: 340px;
        display: flex;
        flex-direction: column;
        border: .5px;
        border-color: black;
        box-shadow: 0px 5px 15px 4px rgba(0, 0, 0, 0.10);
        border-radius: 20px;
    }
</style>