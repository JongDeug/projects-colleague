<script>
	import Card from '../../../component/Card.svelte';
	import CardPlaceholder from '../../../component/CardPlaceholder.svelte';
	import Layout from '../../../component/Layout.svelte';
	import SmallHeader from '../../../component/SmallHeader.svelte';
</script>

<SmallHeader header="My Team" />

<Layout>
	<div class="grid grid-cols-4 grid-rows-2 gap-4">
		<Card usage="MyTeam" />
		<Card usage="MyTeam" img="/images/image.png" />

		<CardPlaceholder />
		<CardPlaceholder />
		<CardPlaceholder />
		<CardPlaceholder />
		<CardPlaceholder />
		<CardPlaceholder />
	</div>
</Layout>
