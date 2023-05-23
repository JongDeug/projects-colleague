<script>
	import Card from '../../../component/Card.svelte';
	import CardPlaceholder from '../../../component/CardPlaceholder.svelte';
	import Layout from '../../../component/Layout.svelte';
	import SmallHeader from '../../../component/SmallHeader.svelte';
	import axios from "axios";

	let userId = sessionStorage.getItem("loginMember");
	let teamList = [];

	// 로그인 상태에서 내가 속한 팀 리스트 가져오기 ( 내가 리더인 팀, 내가 멤버인 팀 전부다 )
	function getMyTeams(){

		const res = axios.get('/api/team/myTeam/list',
				{

				})
				.then(response => {
					teamList = response.data.data;
					console.log(teamList);
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
