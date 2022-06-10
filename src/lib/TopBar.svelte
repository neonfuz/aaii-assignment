<script>
 import {getBreakpoint} from '$lib/breakpoints.js';
 import MobileNav from '$lib/MobileNav.svelte';
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
 let width = 0;
 $: breakpoint = getBreakpoint(width);
 let isMobileMenuOpen = false;
 function openMobileMenu() {
     isMobileMenuOpen = true;
 }
 function closeMobileMenu() {
     isMobileMenuOpen = false;
 }
</script>

<svelte:window bind:outerWidth="{width}" />

<nav class="TopBar">
    {#if breakpoint === 'lg'}
        {#each items as item}
            <a href="">{item}</a>
        {/each}
    {:else}
        <a class="icon"
           on:click="{openMobileMenu}">
            <IconBars />
        </a>
        <img alt="AAII"
             src="{AAIILogo}"
             height="33px"
        />
        <a class="icon">
            <IconSearch />
        </a>
    {/if}
</nav>
{#if breakpoint !== 'lg' && isMobileMenuOpen}
    <MobileNav {items} close="{closeMobileMenu}" />
{/if}

<style lang="scss">
 .TopBar {
     position: sticky;
     top: 0;
     z-index: 5;
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
         cursor: pointer;
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
