<script>
 export let items = [];
 export let close;
</script>

<div class="backdrop"
     on:mousedown="{close}">
    <nav>
        {#each items as item}
            <a href="">{item}</a>
        {/each}
    </nav>
</div>

<style lang="scss">
 .backdrop {
     position: fixed;
     inset: 0;
     background: #0003;
     z-index: 9;
 }
 nav {
     pointer-events: auto;
     position: relative;
     top: calc(33px + 2rem);
     max-height: calc(100vh - 33px - 2rem);
     overflow-y: scroll;
     background: white;
     display: flex;
     flex-direction: column;
     max-width: 20em;
     padding: 1em;
     & > * {
         padding: 1em;
     }
 }
</style>
