<script>
	import Svg from './Svg.svelte';
	export let style;
	export let content;
	export let svgName;
</script>

<button
	class="{style} text-white w-full  focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center justify-center"
>
	<Svg {svgName} />
	{content}
</button>
