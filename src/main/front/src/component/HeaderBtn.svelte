<script>
	import { createEventDispatcher } from 'svelte';
	const dispatcher = createEventDispatcher();

	export let href;
	export let current;
    export let content;
    export let name;
</script>

<a
	{href}
	class="{current === name
		? 'bg-gray-900 text-white'
		: ''} hover:bg-gray-700 hover:text-white px-3 py-1 rounded-md font-medium focus:ring-4 focus:outline-none"
	on:click={() => {
		dispatcher('click');
	}}>{content}</a
>
