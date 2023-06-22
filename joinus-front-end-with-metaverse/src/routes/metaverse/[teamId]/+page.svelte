<script>
	import { start } from './config';
	/** @type {import("./$types").PageData} */
	export let data;

	start(data.teamId);
</script>

<svelte:head>
	<style>
		html,
		body {
			height: 100%;
		}
		body {
			margin: 0;
			padding: 0;
			background: #222;
			color: #eee;
			font: caption;
		}
	</style>
</svelte:head>
