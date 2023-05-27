<script>
  import Sidebar from "../../../../component/SidebarMyTeam.svelte";
  import Breadcrumb from "../../../../component/Breadcrumb.svelte";
  import ConfrimBtn from "../../../../component/ConfirmBtn.svelte";
  import Svg from "../../../../component/Svg.svelte";
  import Layout from "../../../../component/Layout.svelte";
  import SmallHeader from "../../../../component/SmallHeader.svelte";
  import {
    Blockquote,
    Heading,
    CloseButton,
    Img,
    Label,
    Input,
    Listgroup,
    ListgroupItem,
    Avatar
  } from "flowbite-svelte";
  import { onMount } from "svelte";
  import axios from "axios";
  import { URL } from "../../../env";

  /** @type {import("./$types").PageData} */
  export let data;

  export let team = [];   //   팀 객체 (domain 참고)
  let teamLength;
  let teamMembers = [];
  onMount(async () => {
    await axios.get(`${URL}/api/team/detail`,
      {
        params: {
          teamId: data.teamId
        },
        withCredentials: true
      })
      .then(response => {
        team = response.data.data;
        console.log(team);
        teamLength = team.members.length;
        teamMembers = team.members;
      })
      .catch(error => console.log(error));
  });
</script>

<!-- 팀 명  -->
<SmallHeader header="{team.name}" />

<Layout style="flex justify-center">
  <Sidebar teamId={data.teamId} />

  <div class="ml-5 block w-[70%]">
    <Breadcrumb prevContent="내 팀" nextContent="대시보드" />
    <ConfrimBtn content="회의 시작하기" color="blue" style="w-[100%] py-4 mt-3 shadow-md" />

    <div class="flex justify-between mb-3 mt-3">
      <div class="rounded-lg shadow-md border w-[30%] p-5">
        <h3>팀장</h3>
        <p>{team.leader}</p>
      </div>
      <div class="rounded-lg shadow-md border w-[30%] p-5">
        <h3>팀원 수</h3>
        <p>{teamLength}</p>
      </div>
      <div class="rounded-lg shadow-md border w-[30%] p-5">
        <h3>팀 상태</h3>
        <p>{team.state}</p>
      </div>
    </div>

    <div class="rounded-lg shadow-md border p-10">
      <!-- <Img src="/images/image.png" size="max-w-lg" /> -->
      <div class="flex justify-center items-center mb-10 h-60 bg-gray-300 rounded dark:bg-gray-700">
        <Svg svgName="사진" />
      </div>
      <Heading tag="h1" class="mb-10">{team.name}</Heading>
      <Blockquote size="xl" class="mb-10">
        <Svg svgName="인용" />
        "{team.info}"
      </Blockquote>

      <Listgroup active class="mb-6">
        <h5 class="text-center bg-blue-500 text-white font-bold rounded-t-lg">팀원 목록</h5>
        {#each teamMembers as member}
          <ListgroupItem class="font-semibold gap-2">
            <Avatar src="" size="xs" />
            {member}
          </ListgroupItem>
        {/each}
      </Listgroup>

      <div class="w-full">
        <Label for="default-input" class="block mb-2">깃허브 주소</Label>
        <Input id="default-input" placeholder="Default input" readonly />
      </div>
    </div>
  </div>
</Layout>
