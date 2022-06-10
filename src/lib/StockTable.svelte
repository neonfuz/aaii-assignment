<script>
 import {onMount} from 'svelte';
 import {getStocks} from '$lib/api.js';
 let stocks = [];
 onMount(async () => {
     stocks = await getStocks();
 });
 const columnNames = {
     "id": "id",
     "companyId": "companyId",
     "siproId": "siproId",
     "ticker": "Ticker",
     "company": "Company",
     "sector": "Sector",
     "industry": "Industry",
     "price": "Price",
     "volumeAvg": "Volume-Avg\nDaily (K)",
     "mktcap": "Market Cap\n(Mil)",
     "dividend": "Dividend",
     "exchange": "Exchange",
     "adr": "ADR"
 };
 const columns = [
     "ticker",
     "company",
     "sector",
     "industry",
     "price",
     "volumeAvg",
     "mktcap",
     "dividend",
     "exchange",
     "adr"
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
                <th name="{column}" on:click="{onClickHeader}">
                    {columnNames[column]}
                </th>
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each stocks as stock}
            <tr>
                {#each columns as column}
                    <td>{stock[column]}</td>
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
