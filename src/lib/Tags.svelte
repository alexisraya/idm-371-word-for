<script lang="ts">
    export let tagName: String;
</script>

<div class="tag-container">
    <p class="tag-name">{tagName}</p>
</div>

<style>
    .tag-container{
        display: inline-flex;
        height: 21px; 
        align-items: center;
        padding: 0px 9px;
        border:1px solid black;
        border-radius: 26px;
    }

    .tag-name{
        margin: 3px 0 0 0;
        text-transform: uppercase;
    }
</style>