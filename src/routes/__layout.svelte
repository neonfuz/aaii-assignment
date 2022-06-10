<script>
 import TopBar from '$lib/TopBar.svelte';
</script>

<TopBar />

<slot></slot>

<style>
 :global(body) {
     margin: 0;
     font-family: arial;
 }
</style>
