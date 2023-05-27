<script>
	import Sidebar from '../../../../../component/SidebarMyTeam.svelte';
	import Breadcrumb from '../../../../../component/Breadcrumb.svelte';
	import TableSearch from '../../../../../component/TableSearch.svelte';
	import Layout from '../../../../../component/Layout.svelte';
	import SmallHeader from '../../../../../component/SmallHeader.svelte';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Checkbox,
		Pagination
	} from 'flowbite-svelte';
	import { page } from '$app/stores';

	/** @type {import("./$types").PageData} */
	export let data;

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

	const previous = () => {
		alert('Previous btn clicked. Make a call to your server to fetch data.');
	};
	const next = () => {
		alert('Next btn clicked. Make a call to your server to fetch data.');
	};
</script>

<SmallHeader header="abcd" />

<Layout style="flex justify-center">
	<Sidebar teamId="{data.teamId}"/>

	<div class="ml-5 block w-[70%]">
		<Breadcrumb prevContent="내 팀" nextContent="회의록" />

		<div class="rounded-lg shadow-md border p-10 mt-3">
			<h1 class="font-bold mb-7">회의록</h1>
			<TableSearch content="회의록 작성" color="blue">
				<Table hoverable={true}>
					<TableHead>
						<TableHeadCell class="!p-4">
							<Checkbox />
						</TableHeadCell>
						<TableHeadCell>제목</TableHeadCell>
						<TableHeadCell>글쓴이</TableHeadCell>
						<TableHeadCell>날짜</TableHeadCell>
					</TableHead>
					<TableBody>
						{#each filteredItems as item}
							<TableBodyRow>
								<TableBodyCell class="!p-4">
									<Checkbox />
								</TableBodyCell>
								<TableBodyCell>{item.id}</TableBodyCell>
								<TableBodyCell>{item.maker}</TableBodyCell>
								<TableBodyCell>{item.type}</TableBodyCell>
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
