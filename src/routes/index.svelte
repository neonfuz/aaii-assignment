<script>
 import TopBar from '$lib/TopBar.svelte';
 import StockTable from '$lib/StockTable.svelte';
</script>

<TopBar />

<section>
    <StockTable />
</section>

<style>
 section {
     padding-top: 3rem;
     padding-bottom: 3rem;
     max-width: 1200px;
     margin: auto;
 }
</style>
