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


  //  회의록 업데이트    (회의록 id 필요) (팀 id랑 createtime은 필요 x)
  const updateMinutes = async (minuteId) => {
    await axios.post(`${URL}/api/minutes/update`,
      {
        id: minuteId,
        meetingName: minute.meetingName,
        location: minute.location,
        agenda: minute.agenda,
        content: minute.content,
        improvements: minute.improvements,
        writerDepartment: minute.writerDepartment,
        writerName: minute.writerName,
      }, { withCredentials: true })
      .then(response => {
        if (response.data.data == "success") {
          alert("update success");
          if (browser) {
            window.location.href = `/myTeam/detail/${pathArray}/minutes/detail/${minuteId}`;
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
    <Breadcrumb prevContent="내 팀" middleContent="회의록" nextContent="회의록 수정" use="Minutes" teamId={pathArray} />

    <div class="rounded-lg shadow-md border p-10 mt-3 mb-3">
      <h1 class="font-bold mb-7">회의록 수정</h1>

      <div class="mb-6">
        <Label for="title" class="block mb-2">회의명</Label>
        <Input bind:value={minute.meetingName} id="title" name="title" required placeholder="Apple Keynote" />
      </div>
      <div class="mb-6">
        <Label for="title" class="block mb-2">장소</Label>
        <Input bind:value={minute.location} id="title" name="title" required placeholder="Apple Keynote" />
      </div>
      <div class="mb-6">
        <Label for="title" class="block mb-2">의안</Label>
        <Input bind:value={minute.agenda} id="title" name="title" required placeholder="Apple Keynote" />
      </div>
      <div class="mb-6">
        <Label for="description" class="mb-2">토의내용</Label>
        <Textarea bind:value={minute.content} id="message" placeholder="Write event description..." rows="4"
                  name="message" />
      </div>
      <div class="mb-6">
        <Label for="description" class="mb-2">지난 발표시 지적사항 및 조치 내용</Label>
        <Textarea bind:value={minute.improvements} id="message" placeholder="Write event description..."
                  rows="4" name="message" />
      </div>
      <div class="mb-6">
        <Label for="title" class="block mb-2">작성자</Label>
        <div class="flex items-center space-x-5">
          <Input bind:value={minute.writerDepartment} id="title" name="title" required placeholder="소속" />
          <Input bind:value={minute.writerName} id="title" name="title" required placeholder="이름" />
        </div>
      </div>
    </div>
    <ConfrimBtn content="회의록 수정" color="blue" style="w-[100%] py-4 shadow-md" svgName="회의록 작성"
                on:click={() => updateMinutes(data.minuteId)} />
  </div>
</Layout>
