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

	let userId = "qwe" //세션 유지 id

	function getList(){

		const res = axios.get('/api/team/myTeam/list',
				{
					params:{
						id : userId
					}
				})
				.then(response => {
					//	리스트 형태로 받는법
				})
				.catch(error => console.log(error))
		console.log(res);
	}
	function getDetail(){
		let teamId;
		let teamPw;
		let teamName;
		let teamInfo;
		let teamLeader;
		let teamPeople;
		const res = axios.get('/api/team/myTeam/list',
				{
					params:{
						id : teamId
					}
				})
				.then(response => {
					teamPw = response.data.pw;
					teamName = response.data.name;
					teamInfo = response.data.info;
					teamLeader = response.data.leader;
					teamPeople = response.data.people;
				})
				.catch(error => console.log(error))
		console.log(res);
	}

	const previous = () => {
		alert('Previous btn clicked. Make a call to your server to fetch data.');
	};
	const next = () => {
		alert('Next btn clicked. Make a call to your server to fetch data.');
	};

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
						<TableHeadCell>팀원 수</TableHeadCell>
						<TableHeadCell>생성일자</TableHeadCell>
					</TableHead>
					<TableBody>
						{#each filteredItems as item}
							<TableBodyRow>
								<TableBodyCell>{item.id}</TableBodyCell>
								<TableBodyCell>{item.maker}</TableBodyCell>
								<TableBodyCell>{item.type}</TableBodyCell>
								<TableBodyCell>{item.make}</TableBodyCell>
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
