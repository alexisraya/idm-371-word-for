<script>
	import { onMount } from "svelte";
    import Nav from "../lib/Nav.svelte";
	import { updateStores } from "$lib/helpers/helperFunctions";

    onMount(async() => {
        updateStores();
    })
</script>

<Nav />
<slot />