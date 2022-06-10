<script>
 import {onMount} from 'svelte';
 import {getStocks} from '$lib/api.js';
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
 function sortBy(column) {
     stocks = stocks.sort((a, b) => {
         if (a[column] < b[column]) return -1;
         if (a[column] > b[column]) return 1;
         return 0;
     });
 }
 function onClickHeader(event) {
     const name = event.target.getAttribute('name');
     sortBy(name);
 }
</script>

<table>
    <thead>
        <tr>
            {#each columns as column}
                <th name="{column.name}" on:click="{onClickHeader}">
                    {column.label}
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
 }
</style>
