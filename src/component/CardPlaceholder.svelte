<script>
	import { Button } from 'flowbite-svelte';
	import Svg from './Svg.svelte';
	import { browser } from "$app/environment";
</script>

<div class="bg-slate-50 border-2 h-96 rounded-md border-dashed flex justify-center items-center">
	<Button color="alternative" on:click={() => {
		if(browser){
			window.location.href = "/myTeam/create"
		}
	}}>
		<Svg svgName="플러스" />
	</Button>
</div>
