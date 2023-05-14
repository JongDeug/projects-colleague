<script>
	import Card from '../../../component/Card.svelte';
	import CardPlaceholder from '../../../component/CardPlaceholder.svelte';
	import Layout from '../../../component/Layout.svelte';
	import SmallHeader from '../../../component/SmallHeader.svelte';
	import axios from "axios";

	function setList(){

		const res = axios.get('/api/team/myTeam/list',
				{
					params:{
						id : userId
					}
				})
				.then(response => {
					userName = response.data.name;
					userEmail = response.data.email;
					userPhoneNum = response.data.phoneNum;
					userDepartment = response.data.department;
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
