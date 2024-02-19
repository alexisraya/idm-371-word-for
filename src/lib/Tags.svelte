<script lang="ts">
    export let tagName: String;
</script>

<div class="tag-container">
    <p class="tag-name">{tagName}</p>
</div>

<style>
    .tag-container{
        display: flex;
        height: 1.3125rem;
        padding: 0rem 0.58rem;
        align-items: center;
        gap: 0.44388rem;

        border-radius: 1.64388rem;
        border: .75px solid var(--Text-Black, #141414);
    }

    .tag-name{
        color: var(--Text-Black, #141414);
        margin: 0;
        /* Uppercase XSmall */
        font-family: "Fira Sans";
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-transform: uppercase;
    }
</style>