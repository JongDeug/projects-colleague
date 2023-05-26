<script lang="ts">
	import Svg from '../../../component/Svg.svelte';
	import DropdownItem from '../../../component/DropdownItem.svelte';
	import ConfrimBtn from '../../../component/ConfirmBtn.svelte';
	import Layout from '../../../component/Layout.svelte';
	import SmallHeader from '../../../component/SmallHeader.svelte';
	import {
		Pagination,
		Table,
		TableBody,
		TableBodyCell,
		TableHead,
		TableHeadCell,
		TableBodyRow
	} from 'flowbite-svelte';
	import { page } from '$app/stores';
	import ConfirmBtn from '../../../component/ConfirmBtn.svelte';
	import axios from "axios";

	let userId = sessionStorage.getItem("loginMember");

	let dropdownStatus = false;
	const handleDropdownStatus = () => {
		dropdownStatus = !dropdownStatus;
	};

	$: activeUrl = $page.url.searchParams.get('page');
	let pages = [
		{ name: '1', href: '/components/pagination?page=1' },
		{ name: '2', href: '/components/pagination?page=2' },
		{ name: '3', href: '/components/pagination?page=3' },
		{ name: '4', href: '/components/pagination?page=4' },
		{ name: '5', href: '/components/pagination?page=5' }
	];

	$: {
		pages.forEach((page: any) => {
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

	let posts = [];

	// 게시글 리스트 list<post>로 받아옴
	function getPosts(){;
		const res = axios.get('/api/post/list',
				{
				})
				.then(response => {
					posts = response.data.data;
				})
				.catch(error => console.log(error))
		console.log(res);
	}

	//	str 문자열이 포함된 제목이나 내용의 게시글 모두 검색
	function searchPost(str){
		const res = axios.get('/api/post/search',
				{
					params:{
						text : str
					}
				})
				.then(response => {
					posts = response.data.data;	//	검색 결과
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
	getPosts();
</script>

<SmallHeader header="Board" />

<Layout>
	<!-- 필터와 검색 버튼 -->
	<div class="sm:flex items-center justify-between pb-4">
		<!-- 필터 -->
		<button
			class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-gray-200 font-medium rounded-lg px-3 py-1.5"
			type="button"
			on:click={handleDropdownStatus}
		>
			<Svg svgName="시계" />
			지난 30일
			<Svg svgName="아래 화살표" />
		</button>

		{#if dropdownStatus}
			<div
				class="absolute top-56 z-10 w-48 bg-white border-2 divide-y divide-gray-100 rounded-lg shadow"
			>
				<ul class="p-3 space-y-1 text-gray-700">
					<DropdownItem id="1" label="어제" />
					<DropdownItem id="2" label="지난 일주일" />
					<DropdownItem id="3" label="지난 30일" />
					<DropdownItem id="4" label="저번 달" />
					<DropdownItem id="5" label="작년" />
				</ul>
			</div>
		{/if}

		<!-- 검색 -->
		<label for="table-search" class="sr-only">Search</label>
		<div class="relative">
			<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
				<Svg svgName="검색" />
			</div>
			<input
				type="text"
				id="table-search"
				class="block p-2 pl-10 text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
				placeholder="검색"
			/>
		</div>
	</div>

	<!-- 게시판 리스트 -->
	<Table hoverable={true} class="border">
		<TableHead>
			<TableHeadCell>번호</TableHeadCell>
			<TableHeadCell class="pr-80">제목</TableHeadCell>
			<TableHeadCell>글쓴이</TableHeadCell>
			<TableHeadCell>날짜</TableHeadCell>
			<TableHeadCell>조회수</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each posts as item}
				{#if item.type == true}
					<TableBodyRow color="custom" class="bg-gray-100 hover:bg-gray-200" >
						<TableBodyCell>{"공지"}</TableBodyCell>
						<TableBodyCell>{item.title}</TableBodyCell>
						<TableBodyCell>{item.userId}</TableBodyCell>
						<TableBodyCell>{item.createTime}</TableBodyCell>
						<TableBodyCell>{item.hit}</TableBodyCell>
					</TableBodyRow>
				{:else}
					<TableBodyRow>
						<TableBodyCell>{item.id}</TableBodyCell>
						<TableBodyCell>{item.title}</TableBodyCell>
						<TableBodyCell>{item.userId}</TableBodyCell>
						<TableBodyCell>{item.createTime}</TableBodyCell>
						<TableBodyCell>{item.hit}</TableBodyCell>
					</TableBodyRow>
				{/if}
			{/each}
		</TableBody>
	</Table>

	<!-- 게시글 작성 버튼과 Pagination -->
	<div class="flex mt-5 items-center justify-end">
		<ConfirmBtn content="게시글 작성" color="blue" location="/board/create"/>
	</div>

	<div class="flex justify-center">
		<Pagination {pages} on:previous={previous} on:next={next} />
	</div>
</Layout>
