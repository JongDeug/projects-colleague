<script>
  import { Button } from "flowbite-svelte";
  import Svg from "./Svg.svelte";
  import { browser } from "$app/environment";

  export let usage;
  export let teamName;
  export let teamIntro;
  export let teamId;
  export let img = null;
</script>

{#if usage == 'MyTeam'}
  <div>
    <div
      class="bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md flex max-w-sm flex-col p-4 sm:p-6 h-full"
    >
      {#if !!img}
        <img
          class="flex justify-center items-center mb-4 h-48 rounded"
          src="/images/image.png"
          alt=""
        />
      {:else}
        <div
          class="flex justify-center items-center mb-4 h-48 bg-gray-300 rounded dark:bg-gray-700"
        >
          <Svg svgName="사진" />
        </div>
      {/if}

      <h3 class="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">{teamName}</h3>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
        {teamIntro}
      </p>
      <Button on:click={() => {
        if(browser) window.location.href=`/myTeam/detail/${teamId}`;
      }}>
        상세보기
        <Svg svgName="오른쪽 화살표" />
      </Button>
    </div>
  </div>
{:else if usage == 'Profile'}
  <!-- svelte-ignore a11y-invalid-attribute -->
  <a
    href="/myTeam/introduce/{teamId}"
    class="bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md flex max-w-sm flex-col md:flex-row md:max-w-xl hover:bg-gray-100 dark:hover:bg-gray-700"
  >
    {#if !!img}
      <img
        class="rounded-t-lg object-fill w-full h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        src={img}
        alt=""
      />
    {:else}
      <div
        class="rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg bg-gray-300 dark:bg-gray-700 flex justify-center items-center"
      >
        <Svg svgName="사진2" />
      </div>
    {/if}

    <div class="p-4 sm:p-6">
      <slot />
    </div>
  </a
  >
{/if}
