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
	import { LightPaginationNav, paginate } from "svelte-paginate";
	import { onMount } from "svelte";
	import axios from "axios";
	import { URL } from "../../env";
	import { browser } from "$app/environment";

	export let items = [];
	onMount(async () => {
		await axios.get(`${URL}/api/team/myTeam/list`, { withCredentials: true })
			.then(response => {
				items = response.data.data;
				console.log(items);
				items.forEach((item) => {
					item.createTime = item.createTime.split("T")[0];
				})
			})
			.catch(error => console.log(error));
	});


	let currentPage = 1;
	let pageSize = 3;
	$: paginatedItems = paginate({ items, pageSize, currentPage });
</script>

<SmallHeader header="My Page" />

<Layout style="flex justify-center">
	<Sidebar />
	<div class="ml-5 block w-[70%]">
		<Breadcrumb prevContent="설정" nextContent="내 팀" />

		<div class="mt-3 p-10 rounded-lg border shadow-md">
			<h1 class="font-bold mb-7">내 팀 목록</h1>

			<TableSearch content="팀 생성" color="blue" location="/myTeam/create">
				<Table hoverable={true}>
					<TableHead>
						<TableHeadCell>팀 명</TableHeadCell>
						<TableHeadCell>팀원 수</TableHeadCell>
						<TableHeadCell>팀 상태</TableHeadCell>
						<TableHeadCell>생성일자</TableHeadCell>
					</TableHead>
					<TableBody>
						{#each paginatedItems as item}
							<TableBodyRow on:click={() => {
								if(browser)	{
									window.location.href = `/myTeam/detail/${item.id}`;
								}
							}}>
								<TableBodyCell>{item.name}</TableBodyCell>
								<TableBodyCell>{item.members.length}</TableBodyCell>
								<TableBodyCell>{item.state}</TableBodyCell>
								<TableBodyCell>{item.createTime}</TableBodyCell>
							</TableBodyRow>
						{/each}
					</TableBody>
				</Table>
			</TableSearch>

			<div class="flex justify-center mt-3">
				<LightPaginationNav
					totalItems="{items.length}"
					pageSize="{pageSize}"
					currentPage="{currentPage}"
					limit="{1}"
					showStepOptions="{true}"
					on:setPage="{(e) => {
            currentPage = e.detail.page
          }}"
				/>
			</div>
		</div>
	</div>
</Layout>
