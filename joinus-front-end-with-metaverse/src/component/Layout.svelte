<script>
	export let style = '';
	export let use = '';
</script>

{#if use == 'Profile'}
	<div id="layout" class="max-h-full pb-6">
		<slot />
	</div>
{:else}
	<div id="layout" class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 max-h-full {style}">
		<slot />
	</div>
{/if}
