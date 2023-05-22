<script>
	import Card from '../../../component/Card.svelte';
	import CardPlaceholder from '../../../component/CardPlaceholder.svelte';
	import Layout from '../../../component/Layout.svelte';
	import SmallHeader from '../../../component/SmallHeader.svelte';
	import axios from "axios";

	let userId = sessionStorage.getItem("loginMember");
	let teamList = [];

	function setList(){

		const res = axios.get('/api/team/myTeam/list',
				{
					params:{
						id : userId
					}
				})
				.then(response => {
					teamList = response.data.data;
				})
				.catch(error => console.log(error))
		console.log(res);
	}
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
