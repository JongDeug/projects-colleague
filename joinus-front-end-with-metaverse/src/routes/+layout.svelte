<script>
  import "../app.css";
  import Header from "../component/Header.svelte";
  import Footer from "../component/Footer.svelte";
  import { page } from "$app/stores";
  import HeaderAdmin from "../component/HeaderAdmin.svelte";

  let path = $page.url.pathname;
  let pathArray = path.split("/");

  const bubble = (event) => {
    console.log(event.detail.message);
  }
</script>

{#if pathArray[1] === 'admin'}
  <div class="min-h-full">
    <HeaderAdmin />
    <main class="min-h-[700px] w-full">
      <slot />
    </main>
  </div>
  <Footer />
{:else if pathArray[1] === 'metaverse'}
  <slot />
{:else if pathArray[1] === 'meeting'}
  <slot />
{:else}
  <div class="min-h-full">
    <Header />
    <main class="min-h-[700px] w-full" >
      <slot />
    </main>
    <Footer />
  </div>
{/if}
