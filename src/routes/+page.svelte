<script lang="ts">
  import Svg from "../component/Svg.svelte";
  import DropdownItem from "../component/DropdownItem.svelte";
  import ConfrimBtn from "../component/ConfirmBtn.svelte";
  import Layout from "../component/Layout.svelte";
  import SmallHeader from "../component/SmallHeader.svelte";
  import {
    Pagination,
    Table,
    TableBody,
    TableBodyCell,
    TableHead,
    TableHeadCell,
    TableBodyRow
  } from "flowbite-svelte";
  import { page } from "$app/stores";
  import ConfirmBtn from "../component/ConfirmBtn.svelte";
  import { onMount } from "svelte";
  import { URL } from "./env";
  import axios from "axios";
  import { paginate, LightPaginationNav } from "svelte-paginate";
  import { browser } from "$app/environment";

  let dropdownStatus = false;
  const handleDropdownStatus = () => {
    dropdownStatus = !dropdownStatus;
  };

  export let items = [];
  onMount(async () => {
    await axios.get(`${URL}/api/post/list`,
      { withCredentials: true })
      .then(response => {
        let posts = response.data.data;
        for (const post of posts) {
          post.createTime = post.createTime.split("T")[0];
        }
        items = posts;
      })
      .catch(error => console.log(error));
  });
  let currentPage = 1;
  let pageSize = 3;
  $: paginatedItems = paginate({ items, pageSize, currentPage });


  // 검색
  const searchPost = async (str) => {
    if(str){
      axios.get(`${URL}/api/post/search`, {
        params: {
          text: str
        },
        withCredentials: true,
      })
        .then(response => {
          // items = response.data.data;	//	검색 결과
          let posts = response.data.data;
          for (const post of posts) {
            post.createTime = post.createTime.split("T")[0];
          }
          items = posts;
        })
        .catch(error => console.log(error));
    }
  };
  let searchInput;
  $: searchPost(searchInput);

</script>

<SmallHeader header="Board" />

<Layout>
  <!-- 필터와 검색 버튼 -->
  <div class="sm:flex items-center justify-end pb-4">
    <!-- 검색 -->
    <label for="table-search" class="sr-only">검색</label>
    <div class="relative">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Svg svgName="검색" />
      </div>
      <input
        type="text"
        bind:value={searchInput}
        id="table-search"
        class="block p-2 pl-10 text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        placeholder="제목+내용 검색"
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
      <!--{#each board as item}-->
      {#each paginatedItems as item}
        {#if item.id == '공지'}
          <TableBodyRow color="custom" class="bg-gray-100 hover:bg-gray-200">
            <TableBodyCell>{item.id}</TableBodyCell>
            <TableBodyCell>{item.title}</TableBodyCell>
            <TableBodyCell>{item.userId}</TableBodyCell>
            <TableBodyCell>{item.createTime}</TableBodyCell>
            <TableBodyCell>{item.hit}</TableBodyCell>
          </TableBodyRow>
        {:else}
          <TableBodyRow on:click={() => {
            if(browser) window.location.href = `/board/detail/${item.id}`;
          }}>
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
    <ConfirmBtn content="게시글 작성" color="blue" location="/board/create" />
  </div>

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
</Layout>
