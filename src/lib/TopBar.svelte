<script>
 import IconBars from 'svelte-icons/fa/FaBars.svelte';
 import IconSearch from 'svelte-icons/fa/FaSearch.svelte';
 import AAIILogo from './AAII_Logo.svg';
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
 let width;
</script>

<svelte:window bind:innerWidth="{width}" />

<nav class="TopBar">
    {#if width < 1150}
        <a class="icon">
            <IconBars />
        </a>
        <img alt="AAII"
             src="{AAIILogo}"
             height="33px"
        />
        <a class="icon">
            <IconSearch />
        </a>
    {:else}
    {#each items as item}
        <a href="">{item}</a>
    {/each}
    {/if}
</nav>

<style lang="scss">
 .TopBar {
     color: white;
     background: #10283d;
     display: flex;
     justify-content: space-between;
     align-items: center;
     font-weight: bold;
     & > * {
         color: white;
         text-decoration: none;
         padding: 1em;
     }
 }
 @media (min-width: 1150px) {
     .TopBar {
         justify-content: center;
         & > * {
             padding: 1em .6em;
         }
     }
 }
 .icon {
     width: 1.2rem;
     hight: 1rem;
 }
</style>
