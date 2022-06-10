<script>
 const items = [
     "Home",
     "About",
     "Planning",
     "AAII Journal",
     "Markets",
     "Model Portfolios",
     "Investing Ideas",
     "Screening",
     "Community",
     "Education",
     "A+ Investor",
 ];
</script>

<nav class="TopBar">
    {#each items as item}
        <a href="">{item}</a>
    {/each}
</nav>

<style>
 .TopBar {
     color: white;
     background: #10283d;
     display: flex;
     justify-content: center;
     font-weight: bold;
 }
 .TopBar a {
     color: white;
     text-decoration: none;
     padding: 1em .6em;
 }
</style>
