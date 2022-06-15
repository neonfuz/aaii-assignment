<script>
 import {onMount} from 'svelte';
 import {writable} from 'svelte/store';
 import {Circle} from 'svelte-loading-spinners';
 import {getStocks} from '$lib/api.js';
 import {formatMoney, filterNull} from '$lib/format.js';
 import {getBreakpoint} from '$lib/breakpoints.js';
 import hover from './hover.js';
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
         label: "Company",
         breakpoints: {
             sm: { colspan: 2 },
             md: { colspan: 2 }
         }
     },
     {
         name: "sector",
         label: "Sector"
     },
     {
         name: "industry",
         label: "Industry",
         breakpoints: {
             sm: { style: 'display:none' },
             md: { colspan: 2 }
         }
     },
     {
         name: "price",
         label: "Price",
         format: formatMoney(2)
     },
     {
         name: "volumeAvg",
         label: "Volume-Avg Daily (K)",
         format: filterNull
     },
     {
         name: "mktcap",
         label: "Market Cap (Mil)",
         format: formatMoney(1)
     },
     {
         name: "dividend",
         label: "Dividend",
         format: formatMoney(3)
     },
     {
         name: "exchange",
         label: "Exchange",
         breakpoints: {
             sm: { style: 'display:none' },
             md: {}
         }
     },
     {
         name: "adr",
         label: "ADR",
         breakpoints: {
             sm: { style: 'display:none' },
             md: {}
         }
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
 function sortByColumn(column) {
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
     sortByColumn(event.target.getAttribute('name'));
 }
 let width = 0;
 $: breakpoint = getBreakpoint(width);
 $: columnRows = breakpoint !== 'lg' ? [
     columns.slice(0, 4),
     columns.slice(4),
 ] : [
     columns
 ];
 function getBreakpointProps(column) {
     return column.breakpoints
          ? column.breakpoints[breakpoint]
          : {};
 }
 const activeTicker = writable('');
</script>

<svelte:window bind:outerWidth="{width}" />

{#if stocks.length === 0}
    <div class="spinner">
        <Circle color="#10283d" />
    </div>
{:else}
    <table>
        <thead>
            {#each columnRows as cr}
                <tr>
                    {#each cr as column}
                        <th name="{column.name}"
                            on:click="{onClickHeader}"
                            {...getBreakpointProps(column)}>
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
            {/each}
        </thead>
        <tbody>
            {#each stocks as stock}
                {#each columnRows as cr}
                    <tr use:hover="{[stock.ticker, activeTicker]}"
                        class:active="{stock.ticker === $activeTicker}">
                        {#each cr as column}
                            <td {...getBreakpointProps(column)}>
                                {column.format ? column.format(stock[column.name]) : stock[column.name]}
                            </td>
                        {/each}
                    </tr>
                {/each}
            {/each}
        </tbody>
    </table>
{/if}

<style>
 .spinner {
     display: flex;
     justify-content: center;
 }
 table {
     max-width: 1800px;
     margin-left: auto;
     margin-right: auto;
 }
 table, th, td {
     border-collapse: collapse;
     padding: .5em;
     text-align: left;
 }
 tr.active {
     background: #f4f4f4;
 }
 th {
     background: #eee;
     font-weight: normal;
     text-decoration: underline;
     cursor: pointer;
     position: relative;
 }
 tr {
     border-bottom: solid #eee 1px;
 }
 @media (max-width: 1149px) {
     tr:nth-child(odd) {
         border-bottom: none;
     }
 }
 @media (max-width: 500px) {
     table {
         font-size: 3.2vw;
     }
 }
 .icon {
     height: 1em;
     color: #555;
     padding-left: .5em;
     position: absolute;
     right: 0;
 }
</style>
