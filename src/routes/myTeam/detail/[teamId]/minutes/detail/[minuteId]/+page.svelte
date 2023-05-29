<script>
  import Sidebar from "../../../../../../../component/SidebarMyTeam.svelte";
  import Breadcrumb from "../../../../../../../component/Breadcrumb.svelte";
  import Layout from "../../../../../../../component/Layout.svelte";
  import SmallHeader from "../../../../../../../component/SmallHeader.svelte";
  import { page } from "$app/stores";
  import { Button, CloseButton, Input, Label, Textarea } from "flowbite-svelte";
  import ConfrimBtn from "../../../../../../../component/ConfirmBtn.svelte";
  import axios from "axios";
  import { URL } from "../../../../../../env";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  let path = $page.url.pathname;
  let pathArray = path.split("/")[3];
  // console.log(pathArray);

  /** @type {import("./$types").PageData} */
  export let data;


  let _meetingName;
  let _location;
  let _agenda;
  let _content;
  let _improvements;
  let _writerDepartment;
  let _writerName;

  let minute = [];
  onMount(async () => {
    await axios.get(`${URL}/api/minutes/detail`,
      {
        params: {
          minutesId: data.minuteId
        },
        withCredentials: true
      })
      .then(response => {
        minute = response.data.data;
        console.log(minute);
      })
      .catch(error => console.log(error));
  });


  const deleteMinutes = async (minuteId) => {
    await axios.post(`${URL}/api/minutes/delete`,  { withCredentials: true },
      {
        params:{
          minutesId : minuteId
        }
      })
      .then(response => {
        if (response.data.data == "success") {
          alert("update success");
          if (browser) {
            window.location.href = `/myTeam/detail/${pathArray}/minutes`;
          }
        }
      })
      .catch(error => console.log(error));
  };
</script>

<SmallHeader header="abcd" />

<Layout style="flex justify-center">
  <Sidebar teamId="{pathArray}" />

  <div class="ml-5 block w-[70%]">
    <Breadcrumb prevContent="내 팀" middleContent="회의록" nextContent="회의록 상세" use="Minutes" teamId={pathArray} />

    <div class="rounded-lg shadow-md border p-10 mt-3 mb-3">
      <div class="flex items-center mb-7 justify-between">
        <h1 class="font-bold">회의록 상세</h1>
        <div>
          <ConfrimBtn color="blue" content="수정" location="/myTeam/detail/{pathArray}/minutes/update/{data.minuteId}"/>
          <ConfrimBtn color="red" content="삭제" on:click={() => {deleteMinutes(data.minuteId)}}/>
        </div>
      </div>

      <div class="mb-6">
        <Label for="title" class="block mb-2">회의명</Label>
        <Input bind:value={minute.meetingName} readonly id="title" name="title" required placeholder="Apple Keynote" />
      </div>
      <div class="mb-6">
        <Label for="title" class="block mb-2">장소</Label>
        <Input bind:value={minute.location} readonly id="title" name="title" required placeholder="Apple Keynote" />
      </div>
      <div class="mb-6">
        <Label for="title" class="block mb-2">의안</Label>
        <Input bind:value={minute.agenda} readonly id="title" name="title" required placeholder="Apple Keynote" />
      </div>
      <div class="mb-6">
        <Label for="description" class="mb-2">토의내용</Label>
        <Textarea bind:value={minute.content} readonly id="message" placeholder="Write event description..." rows="4" name="message" />
      </div>
      <div class="mb-6">
        <Label for="description" class="mb-2">지난 발표시 지적사항 및 조치 내용</Label>
        <Textarea bind:value={minute.improvements} readonly id="message" placeholder="Write event description..." rows="4" name="message" />
      </div>
      <div class="mb-6">
        <Label for="title" class="block mb-2">작성자</Label>
        <div class="flex items-center space-x-5">
          <Input bind:value={minute.writerDepartment} readonly id="title" name="title" required placeholder="소속" />
          <Input bind:value={minute.writerName} readonly id="title" name="title" required placeholder="이름" />
        </div>
      </div>
    </div>
  </div>
</Layout>
