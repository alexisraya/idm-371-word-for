<script lang="ts">
    import check from '$lib/assets/check.svg'
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition'; 

    export let message: string;
    let visible = true;

    onMount(async () => {
        setTimeout(()=>{
            visible = false;
        }, 3000);
    });
</script>

{#if visible}
    <article class="toast-container" role="alert" transition:fade>
        <img class="checkmark" src={check} alt="checkmark" />
        <p>{message}</p>
    </article>
{/if}

<style>
    .toast-container{
        bottom: 4rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #006F3A;
        height: 44px;
        width: calc(100vw - 3rem);
        max-width: 30rem;
        padding: 0 13px;
        column-gap: 8px;
        border-radius: 8px;
        margin: auto;
        color: var(--Pure-White, #FFF);

        /* Body Alt */
        font-family: "Fira Sans";
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    .checkmark{
        height: 18px;
    }
</style>