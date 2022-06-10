<script>
 import {onMount} from 'svelte';
 import {getStocks} from '$lib/api.js';
 import {formatMoney, filterNull} from '$lib/format.js';
 import {getBreakpoint} from '$lib/breakpoints.js';
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
 let width;
 $: breakpoint = getBreakpoint(width);
 $: columnRows = breakpoint !== 'lg' ? [
     columns.slice(0, 4),
     columns.slice(4),
 ] : [
     columns
 ];
 function getBreakpointProps(column) {
     if (column.breakpoints)
         return column.breakpoints[breakpoint];
     else
         return {};
 }
 let activeTicker = '';
 function rowHover(ticker) {
     activeTicker = ticker;
 }
 function rowUnHover(ticker) {
     if (activeTicker === ticker)
         activeTicker = '';
 }
</script>

<svelte:window bind:outerWidth="{width}" />

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
                <tr on:mouseover="{() => rowHover(stock.ticker)}"
                    on:mouseleave="{() => rowUnHover(stock.ticker)}"
                    class:active="{stock.ticker === activeTicker}">
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

<style>
 table {
     max-height: 80vh;
     overflow-y: auto;
 }
 table, th, td {
     border-left: solid #eee 1px;
     border-right: solid #eee 1px;
     border-collapse: collapse;
     padding: .5em;
     text-align: left;
 }
 tr {
     border-bottom: solid #ddd 1px;
 }
 tr.active {
     background: #f4f4f4;
 }
 th {
     background: #fafafa;
     font-weight: normal;
     text-decoration: underline;
     cursor: pointer;
     position: relative;
 }
 @media (max-width: 1149px) {
     thead {
         border-bottom: solid #ccc 1px;
     }
     tr:nth-child(even) {
         border-bottom: solid #ccc 1px;
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
