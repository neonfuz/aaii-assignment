<script>
 import {onMount} from 'svelte';
 import {getStocks} from '$lib/api.js';
 import IconSort from 'svelte-icons/fa/FaSort.svelte';
 import IconSortUp from 'svelte-icons/fa/FaSortUp.svelte';
 import IconSortDown from 'svelte-icons/fa/FaSortDown.svelte';
 let stocks = [];
 onMount(async () => {
     stocks = await getStocks();
 });
 const columns = [
     { name: "ticker", label: "Ticker" },
     { name: "company", label: "Company" },
     { name: "sector", label: "Sector" },
     { name: "industry", label: "Industry" },
     { name: "price", label: "Price" },
     { name: "volumeAvg", label: "Volume-Avg\nDaily (K)" },
     { name: "mktcap", label: "Market Cap\n(Mil)" },
     { name: "dividend", label: "Dividend" },
     { name: "exchange", label: "Exchange" },
     { name: "adr", label: "ADR" }
 ];
 let lastSort = '';
 let sortReverse = false;
 function sortBy(column) {
     if (lastSort === column) {
         stocks = stocks.reverse();
         sortReverse = !sortReverse;
     } else {
         stocks = stocks.sort((a, b) => {
             if (a[column] < b[column]) return -1;
             if (a[column] > b[column]) return 1;
             return 0;
         });
         sortReverse = false;
     }
     lastSort = column;
 }
 function onClickHeader(event) {
     sortBy(event.target.getAttribute('name'));
 }
</script>

<table>
    <thead>
        <tr>
            {#each columns as column}
                <th name="{column.name}" on:click="{onClickHeader}">
                    {column.label}
                    <span class="icon">
                        {#if column.name === lastSort}
                            {#if !sortReverse}
                                <IconSortDown />
                            {:else}
                                <IconSortUp />
                            {/if}
                        {:else}
                            <IconSort />
                        {/if}
                    </span>
                </th>
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each stocks as stock}
            <tr>
                {#each columns as column}
                    <td>{stock[column.name]}</td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>

<style>
 table {
     max-height: 80vh;
     overflow-y: auto;
 }
 table, th, td {
     border: solid #f0f0f0 1px;
     border-collapse: collapse;
     padding: 1em;
     text-align: left;
 }
 th {
     background: #fafafa;
     font-weight: normal;
     text-decoration: underline;
     cursor: pointer;
     position: relative;
 }
 .icon {
     height: 1em;
     color: #555;
     padding-left: .5em;
     position: absolute;
     right: 0;
 }
</style>
