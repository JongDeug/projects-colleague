<script>
	import Svg from './Svg.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatcher = createEventDispatcher();

	export let content;
	export let style = '';
	export let location = '';
	export let color;
	export let txtColor = null;
	export let svgName = '';
</script>

<a
	href={location}
	class="{style} text-center focus:ring-4 focus:outline-none inline-flex items-center justify-center px-5 py-2 text-{txtColor
		? txtColor
		: 'white'} bg-{color}-600 hover:bg-{color}-800 focus:ring-{color}-300 rounded-lg"
	on:click={() => {
		dispatcher('click');
	}}
>
	<Svg {svgName} />
	{content}
</a>
