<script>
	import Breadcrumb from '../../../component/Breadcrumb.svelte';
	import Layout from '../../../component/Layout.svelte';
	import SmallHeader from '../../../component/SmallHeader.svelte';
	import Sidebar from '../../../component/SidebarAdmin.svelte';
	import {
		TableSearch,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Pagination
	} from 'flowbite-svelte';

	import { page } from '$app/stores';

	let searchTerm = '';
	let items = [
		{
			id: 1,
			maker: 'hi',
			type: 'dsfsfd',
			make: 2017
		},
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

<SmallHeader header="Admin" />
<Layout style="flex justify-center">
	<Sidebar />
	<div class="ml-5 block w-[70%]">
		<Breadcrumb use="Admin" prevContent="질문 및 신고" />
		<div class="mt-3 p-10 rounded-lg shadow-md border">
			<h1 class="font-bold mb-7">질문 및 신고</h1>

			<!-- <TableSearch
                color="default"
                placeholder="Search by maker name"
                hoverable={true}
                bind:inputValue={searchTerm}
            > -->
			<TableSearch bind:inputValue={searchTerm} hoverable={true}>
				<TableHead>
					<TableHeadCell>보낸 사람</TableHeadCell>
					<TableHeadCell>날짜</TableHeadCell>
					<TableHeadCell>종류</TableHeadCell>
					<TableHeadCell>읽음 상태</TableHeadCell>
				</TableHead>
				<TableBody>
					{#each filteredItems as item}
						<TableBodyRow
							on:click={() => {
								location.assign('http://localhost:5173/admin/questionAndReport/detail');
							}}
						>
							<TableBodyCell>{item.id}</TableBodyCell>
							<TableBodyCell>{item.maker}</TableBodyCell>
							<TableBodyCell>{item.make}</TableBodyCell>
							<TableBodyCell>{item.make}</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</TableSearch>

			<div class="flex mt-5 justify-end">
				<Pagination {pages} on:previous={previous} on:next={next} />
			</div>
		</div>
	</div>
</Layout>
