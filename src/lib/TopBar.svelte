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
 let hoverMenu = 'hello';
</script>

<svelte:window bind:outerWidth="{width}" />

{#if breakpoint === 'lg'}
    <div class="TopBar-pre">
        <div class="container">
            <img alt="AAII"
                 src="{AAIILogo}"
                 height="90px"
            />
            <button class="join-button">Join Today for Just $2</button>
        </div>
    </div>
{/if}
<div class="TopBar">
    <nav>
        {#if breakpoint === 'lg'}
            {#each items as item}
                <a href="" on:mouseenter="{() => hoverMenu = item}">{item}</a>
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
    {#if hoverMenu && breakpoint === 'lg'}
        <div class="hoverContent">
            <heading>{hoverMenu}</heading>
            {#if hoverMenu === 'About'}
                <ul>
                    <li><a href="">Example link</a></li>
                    <li><a href="">Another link</a></li>
                </ul>
            {/if}
        </div>
    {/if}
</div>
{#if breakpoint !== 'lg' && isMobileMenuOpen}
    <MobileNav {items} close="{closeMobileMenu}" />
{/if}

<style lang="scss">
 .TopBar-pre {
     background: #204c72;
     padding: 1rem;
     display: flex;
     justify-content: center;
     .container {
         width: 1050px;
         display: flex;
         align-items: center;
         justify-content: space-between;
     }
     .join-button {
         background: #ff9100;
         color: white;
         border: none;
         border-radius: 1em;
         padding: 1rem;
         font-weight: bold;
         font-size: 1.5rem;
     }
 }
 .TopBar nav {
     position: sticky;
     top: 0;
     z-index: 5;
     color: white;
     background: #10283d;
     display: flex;
     justify-content: space-between;
     font-weight: bold;
     & > * {
         color: white;
         text-decoration: none;
         padding: 1em;
         cursor: pointer;
     }
 }
 .TopBar .hoverContent {
     display: none;
     background: white;
     position: absolute;
     z-index: 5;
     width: 100%;
     box-shadow: 0 0 20px #3338;
     flex-direction: column
 }
 .TopBar:hover .hoverContent {
     display: flex;
     heading {
         font-size: 1.3rem;
         font-weight: bold;
         padding-bottom: .5em;
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
