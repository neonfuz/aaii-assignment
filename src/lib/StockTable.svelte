<script>
 import {onMount} from 'svelte';
 import {getStocks} from '$lib/api.js';
 import {formatMoney, filterNull} from '$lib/format.js';
 import IconSort from 'svelte-icons/fa/FaSort.svelte';
 import IconSortUp from 'svelte-icons/fa/FaSortUp.svelte';
 import IconSortDown from 'svelte-icons/fa/FaSortDown.svelte';
 let stocks = [];
 onMount(async () => {
     stocks = await getStocks();
 });
 const columns = [
     {
         name: "ticker",
         label: "Ticker"
     },
     {
         name: "company",
         label: "Company"
     },
     {
         name: "sector",
         label: "Sector"
     },
     {
         name: "industry",
         label: "Industry"
     },
     {
         name: "price",
         label: "Price",
         format: formatMoney(2)
     },
     {
         name: "volumeAvg",
         label: "Volume-Avg\nDaily (K)",
         format: filterNull
     },
     {
         name: "mktcap",
         label: "Market Cap\n(Mil)",
         format: formatMoney(1)
     },
     {
         name: "dividend",
         label: "Dividend",
         format: formatMoney(3)
     },
     {
         name: "exchange",
         label: "Exchange"
     },
     {
         name: "adr",
         label: "ADR"
     }
 ];
 let lastSortColumn = '';
 let sortReverse = false;
 function columnSort(column) {
     return (a, b) => {
         if (a[column] < b[column]) return -1;
         if (a[column] > b[column]) return 1;
         return 0;
     };
 }
 function sortBy(column) {
     const sort = columnSort(column);
     if (lastSortColumn === column && !sortReverse) {
         stocks = stocks.sort((a, b) => -1 * sort(a, b));
         sortReverse = true;
     } else {
         stocks = stocks.sort(sort);
         sortReverse = false;
     }
     lastSortColumn = column;
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
                        {#if column.name === lastSortColumn}
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
                    <td>{column.format ? column.format(stock[column.name]) : stock[column.name]}</td>
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
