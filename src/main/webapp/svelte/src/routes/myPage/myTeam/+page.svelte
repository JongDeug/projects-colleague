<script>
	import Breadcrumb from '../../../component/Breadcrumb.svelte';
	import Sidebar from '../../../component/SidebarMyPage.svelte';
	import TableSearch from '../../../component/TableSearch.svelte';
	import Layout from '../../../component/Layout.svelte';
	import SmallHeader from '../../../component/SmallHeader.svelte';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Pagination
	} from 'flowbite-svelte';
	import { page } from '$app/stores';
	import axios from "axios";

	let searchTerm = '';
	let items = [
		{ id: 1, maker: 'Toyota', type: 'ABC', make: 2017 },
		{ id: 2, maker: 'Ford', type: 'CDE', make: 2018 },
		{ id: 3, maker: 'Volvo', type: 'FGH', make: 2019 },
		{ id: 4, maker: 'Saab', type: 'IJK', make: 2020 }
	];
	$: filteredItems = items.filter(
		(item) => item.maker.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	);

	$: activeUrl = $page.url.searchParams.get('page');
	let pages = [
		{ name: '1', href: '/components/pagination?page=1' },
		{ name: '2', href: '/components/pagination?page=2' },
		{ name: '3', href: '/components/pagination?page=3' },
		{ name: '4', href: '/components/pagination?page=4' },
		{ name: '5', href: '/components/pagination?page=5' }
	];

	$: {
		pages.forEach((page) => {
			let splitUrl = page.href.split('?');
			let queryString = splitUrl.slice(1).join('?');
			const hrefParams = new URLSearchParams(queryString);
			let hrefValue = hrefParams.get('page');
			if (hrefValue === activeUrl) {
				page.active = true;
			} else {
				page.active = false;
			}
		});
		pages = pages;
	}

	let userId = sessionStorage.getItem("loginMember");
	let teamList = [];
	$: filteredList = teamList.filter(
			(t) => t.leader.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	);

	let size = 5;
	let idx = 0;
	let total = 0;
	let showData = [];
	let totalPage = Math.ceil(total / size);


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

	//	로그인 상관없이 팀 id로 팀 엔티티 가져오기
	function getDetail(teamId){
		let team = [];
		const res = axios.get('/api/team/detail',
				{
					params:{
						teamId : teamId
					}
				})
				.then(response => {
					team = response.data.data;
				})
				.catch(error => console.log(error))
		console.log(res);
		return team;
	}

	const previous = () => {
		alert('Previous btn clicked. Make a call to your server to fetch data.');
	};
	const next = () => {
		alert('Next btn clicked. Make a call to your server to fetch data.');
	};

	getMyTeams();

</script>

<SmallHeader header="My Page" />

<Layout style="flex justify-center">
	<Sidebar />
	<div class="ml-5 block w-[70%]">
		<Breadcrumb prevContent="설정" nextContent="내 팀" />

		<div class="mt-3 p-10 rounded-lg border shadow-md">
			<h1 class="font-bold mb-7">내 팀 목록</h1>

			<TableSearch content="팀 생성" color="blue"location="/myTeam/create" >
				<Table hoverable={true}>
					<TableHead>
						<TableHeadCell>ID</TableHeadCell>
						<TableHeadCell>팀 명</TableHeadCell>
						<TableHeadCell>리더</TableHeadCell>
						<TableHeadCell>상태</TableHeadCell>
					</TableHead>
					<TableBody>
						{#each filteredList as item}
							<TableBodyRow on:click={getDetail}>
								<TableBodyCell>{item.id}</TableBodyCell>
								<TableBodyCell>{item.name}</TableBodyCell>
								<TableBodyCell>{item.leader}</TableBodyCell>
								<TableBodyCell>{item.state}</TableBodyCell>
							</TableBodyRow>
						{/each}
					</TableBody>
				</Table>
			</TableSearch>

			<div class="flex mt-5 justify-end">
				<Pagination {pages} on:previous={previous} on:next={next} />
			</div>
		</div>
	</div>
</Layout>
