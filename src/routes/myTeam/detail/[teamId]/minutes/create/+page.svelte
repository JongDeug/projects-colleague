<script>
  import Sidebar from "../../../../../../component/SidebarMyTeam.svelte";
  import Breadcrumb from "../../../../../../component/Breadcrumb.svelte";
  import Layout from "../../../../../../component/Layout.svelte";
  import SmallHeader from "../../../../../../component/SmallHeader.svelte";
  import { page } from "$app/stores";
  import { Button, CloseButton, Input, Label, Textarea } from "flowbite-svelte";
  import ConfrimBtn from "../../../../../../component/ConfirmBtn.svelte";
  import axios from "axios";
  import { URL } from "../../../../../env";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  let path = $page.url.pathname;
  let pathArray = path.split("/")[3];

  let _meetingName;
  let _location;
  let _agenda;
  let _content;
  let _improvements;
  let _writerDepartment;
  let _writerName;

  const createMinutes = async (teamId) => {
    await axios.post(`${URL}/api/minutes/create`,
      {
        teamId: teamId,
        meetingName: _meetingName,
        location: _location,
        agenda: _agenda,
        content: _content,
        improvements: _improvements,
        writerDepartment: _writerDepartment,
        writerName: _writerName
      }, { withCredentials: true })
      .then(response => {
        if (response.data.data == "success") {
          alert("create success");
          if (browser) {
            window.location.href = `/myTeam/detail/${pathArray}/minutes`;
          }
        }
      })
      .catch(error => console.log(error));
  };

  onMount(async () => {
    await getTeam(pathArray);
  });
  let team = [];
  const getTeam = async (teamId) => {
    await axios.get(`${URL}/api/team/detail`,
      {
        params: {
          teamId: teamId
        },
        withCredentials: true
      })
      .then(response => {
        team = response.data.data;
        console.log(team);
      })
      .catch(error => console.log(error));
  };
</script>

<SmallHeader header="{team.name}" />

<Layout style="flex justify-center">
  <Sidebar teamId="{pathArray}" />

  <div class="ml-5 block w-[70%]">
    <Breadcrumb prevContent="내 팀" middleContent="회의록" nextContent="회의록 작성" use="Minutes" teamId={pathArray} />

    <div class="rounded-lg shadow-md border p-10 mt-3 mb-3">
      <h1 class="font-bold mb-7">회의록 작성</h1>

      <div class="mb-6">
        <Label for="title" class="block mb-2">회의명</Label>
        <Input bind:value={_meetingName} id="title" name="title" required />
      </div>
      <div class="mb-6">
        <Label for="title" class="block mb-2">장소</Label>
        <Input bind:value={_location} id="title" name="title" required />
      </div>
      <div class="mb-6">
        <Label for="title" class="block mb-2">의안</Label>
        <Input bind:value={_agenda} id="title" name="title" required />
      </div>
      <div class="mb-6">
        <Label for="description" class="mb-2">토의내용</Label>
        <Textarea bind:value={_content} id="message" rows="4" name="message" />
      </div>
      <div class="mb-6">
        <Label for="description" class="mb-2">지난 발표시 지적사항 및 조치 내용</Label>
        <Textarea bind:value={_improvements} id="message" rows="4" name="message" />
      </div>
      <div class="mb-6">
        <Label for="title" class="block mb-2">작성자</Label>
        <div class="flex items-center space-x-5">
          <Input bind:value={_writerDepartment} id="title" name="title" required placeholder="소속" />
          <Input bind:value={_writerName} id="title" name="title" required placeholder="이름" />
        </div>
      </div>
    </div>
    <!--    <Button type="submit" class="w-full"> 회의록 생성</Button>-->
    <ConfrimBtn content="회의록 생성" color="blue" style="w-[100%] py-4 shadow-md" svgName="회의록 작성"
                on:click={() => createMinutes(pathArray)} />
  </div>
</Layout>
