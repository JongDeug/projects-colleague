<script>
  import Sidebar from "../../../component/SidebarMyPage.svelte";
  import Breadcrumb from "../../../component/Breadcrumb.svelte";
  import TableSearch from "../../../component/TableSearch.svelte";
  import Layout from "../../../component/Layout.svelte";
  import SmallHeader from "../../../component/SmallHeader.svelte";
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Checkbox,
    Pagination
  } from "flowbite-svelte";

  import { page } from "$app/stores";

  let searchTerm = "";

  import { paginate, LightPaginationNav } from "svelte-paginate";
  import { onMount } from "svelte";
  import axios from "axios";
  import { URL } from "../../env";
  import { browser } from "$app/environment";

  export let items = [];
  onMount(async () => {
    await axios.get(`${URL}/api/post/myPost`,
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

  const getSearchInput = (event) => {
    const str = event.detail.message;
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
</script>

<SmallHeader header="My Page" />

<Layout style="flex justify-center">
  <Sidebar />

  <div class="ml-5 block w-[70%]">
    <Breadcrumb prevContent="설정" nextContent="내가 작성한 게시글" />

    <div class="mt-3 p-10 rounded-lg shadow-md border">
      <h1 class="font-bold mb-7">내가 작성한 게시글</h1>

      <TableSearch content="게시글 작성" color="blue" on:changeSearchInput={getSearchInput}>
        <Table hoverable={true}>
          <TableHead>
            <TableHeadCell>제목</TableHeadCell>
            <TableHeadCell>글쓴이</TableHeadCell>
            <TableHeadCell>날짜</TableHeadCell>
            <TableHeadCell>조회수</TableHeadCell>
          </TableHead>
          <TableBody>
            {#each paginatedItems as item}
              <TableBodyRow on:click={() => {
                if(browser) window.location.href = `/board/detail/${item.id}`;
              }}>
                <TableBodyCell>{item.title}</TableBodyCell>
                <TableBodyCell>{item.userId}</TableBodyCell>
                <TableBodyCell>{item.createTime}</TableBodyCell>
                <TableBodyCell>{item.hit}</TableBodyCell>
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
