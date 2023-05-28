<script>
  import Sidebar from '../../../../../../component/SidebarMyTeam.svelte';
  import Breadcrumb from '../../../../../../component/Breadcrumb.svelte';
  import Layout from '../../../../../../component/Layout.svelte';
  import SmallHeader from '../../../../../../component/SmallHeader.svelte';
  import {page} from "$app/stores";
  import { Button, CloseButton, Input, Label, Textarea } from "flowbite-svelte";
  import ConfrimBtn from "../../../../../../component/ConfirmBtn.svelte";

  let path = $page.url.pathname;
  let pathArray = path.split("/")[3];
  // console.log(pathArray);

</script>

<SmallHeader header="abcd" />

<Layout style="flex justify-center">
  <Sidebar teamId="{pathArray}"/>

  <div class="ml-5 block w-[70%]">
    <Breadcrumb prevContent="내 팀" middleContent="회의록" nextContent="회의록 작성" use="Minutes" teamId={pathArray} />

    <div class="rounded-lg shadow-md border p-10 mt-3 mb-3">
      <h1 class="font-bold mb-7">회의록 작성</h1>

      <form action="#" class="mb-6">
        <div class="mb-6">
          <Label for='title' class='block mb-2'>회의명</Label>
          <Input id='title' name='title' required placeholder="Apple Keynote" />
        </div>
        <div class="mb-6">
          <Label for='title' class='block mb-2'>장소</Label>
          <Input id='title' name='title' required placeholder="Apple Keynote" />
        </div>
        <div class="mb-6">
          <Label for='title' class='block mb-2'>의안</Label>
          <Input id='title' name='title' required placeholder="Apple Keynote" />
        </div>
        <div class="mb-6">
          <Label for="description" class="mb-2">토의내용</Label>
          <Textarea id="message" placeholder="Write event description..." rows="4" name="message"/>
        </div>
        <div class="mb-6">
          <Label for="description" class="mb-2">지난 발표시 지적사항 및 조치 내용</Label>
          <Textarea id="message" placeholder="Write event description..." rows="4" name="message"/>
        </div>
        <div class="mb-6">
          <Label for='title' class='block mb-2'>작성자</Label>
          <div class="flex items-center space-x-5">
            <Input id='title' name='title' required placeholder="소속" />
            <Input id='title' name='title' required placeholder="이름" />
          </div>
        </div>
      </form>
    </div>
<!--    <Button type="submit" class="w-full"> 회의록 생성</Button>-->
    <ConfrimBtn content="회의록 생성" color="blue" style="w-[100%] py-4 shadow-md" svgName="회의록 작성"/>
  </div>
</Layout>
