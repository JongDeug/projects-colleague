<script>
  import Sidebar from "../../../../../component/SidebarMyTeam.svelte";
  import Breadcrumb from "../../../../../component/Breadcrumb.svelte";
  import TableSearch from "../../../../../component/TableSearch.svelte";
  import Layout from "../../../../../component/Layout.svelte";
  import SmallHeader from "../../../../../component/SmallHeader.svelte";
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
  import { onMount } from "svelte";
  import axios from "axios";
  import { URL } from "../../../../env";
  import { LightPaginationNav, paginate } from "svelte-paginate";
  import { browser } from "$app/environment";

  /** @type {import("./$types").PageData} */
  export let data;


  let items = [];
  onMount(async () => {
    await axios.get(`${URL}/api/minutes/list`,
      {
        params: {
          teamId: data.teamId
        },
        withCredentials: true
      })
      .then(response => {
        let minutes = response.data.data;
        for (const minute of minutes) {
          minute.createTime = minute.createTime.split("T")[0];
        }
        items = minutes;
      })
      .catch(error => console.log(error));
  });

  let currentPage = 1;
  let pageSize = 3;
  $: paginatedItems = paginate({ items, pageSize, currentPage });

  // 회의록 검색
  const getSearchInput = async (event) => {
    const str = event.detail.message;
    if(str){
      await axios.get(`${URL}/api/minutes/search`,
        {
          params: {
            text: str
          },
          withCredentials: true
        })
        .then(response => {
          let minutes = response.data.data;
          for (const minute of minutes) {
            minute.createTime = minute.createTime.split("T")[0];
          }
          items = minutes;
        })
        .catch(error => console.log(error));
    }
  }
</script>

<SmallHeader header="abcd" />

<Layout style="flex justify-center">
  <Sidebar teamId="{data.teamId}" />

  <div class="ml-5 block w-[70%]">
    <Breadcrumb prevContent="내 팀" nextContent="회의록" />

    <div class="rounded-lg shadow-md border p-10 mt-3">
      <h1 class="font-bold mb-7">회의록</h1>
      <TableSearch on:changeSearchInput={getSearchInput} content="회의록 작성" color="blue" location="/myTeam/detail/{data.teamId}/minutes/create">
        <Table hoverable={true}>
          <TableHead>
            <TableHeadCell>제목</TableHeadCell>
            <TableHeadCell>의안</TableHeadCell>
            <TableHeadCell>작성자</TableHeadCell>
            <TableHeadCell>날짜</TableHeadCell>
          </TableHead>
          <TableBody>
            {#each paginatedItems as minute}
              <TableBodyRow on:click={ () => {
                if(browser){
                  window.location.href = `/myTeam/detail/${data.teamId}/minutes/detail/${minute.id}`;
                }
              }}>
                <TableBodyCell>{minute.meetingName}</TableBodyCell>
                <TableBodyCell>{minute.agenda}</TableBodyCell>
                <TableBodyCell>{minute.writerName}</TableBodyCell>
                <TableBodyCell>{minute.createTime}</TableBodyCell>
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
