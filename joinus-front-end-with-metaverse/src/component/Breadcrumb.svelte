<script>
  import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";

  export let prevContent = "";
  export let nextContent = "";
  export let middleContent = "";
  export let teamId="";
  export let use = "";
</script>

{#if use === 'Admin'}
  <Breadcrumb
    aria-label="Solid background breadcrumb example"
    class="flex px-5 py-3 text-gray-700 border-2 rounded-lg  border-indigo-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <BreadcrumbItem href="/" home>관리자</BreadcrumbItem>
    <BreadcrumbItem href="/">{prevContent}</BreadcrumbItem>
  </Breadcrumb>
{:else if use === 'Minutes'}
  <Breadcrumb
    aria-label="Solid background breadcrumb example"
    class="flex px-5 py-3 text-gray-700 border-2 rounded-lg  border-indigo-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <BreadcrumbItem href="/" home>홈</BreadcrumbItem>
    <BreadcrumbItem href="/myTeam/list">{prevContent}</BreadcrumbItem>
    <BreadcrumbItem href="/myTeam/detail/{teamId}/minutes">{middleContent}</BreadcrumbItem>
    <BreadcrumbItem>{nextContent}</BreadcrumbItem>
  </Breadcrumb>

{:else}
  <Breadcrumb
    aria-label="Solid background breadcrumb example"
    class="flex px-5 py-3 text-gray-700 border-2 rounded-lg  border-indigo-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <BreadcrumbItem href="/" home>홈</BreadcrumbItem>
    <BreadcrumbItem href="/myTeam/list">{prevContent}</BreadcrumbItem>
    <BreadcrumbItem>{nextContent}</BreadcrumbItem>
  </Breadcrumb>
{/if}
