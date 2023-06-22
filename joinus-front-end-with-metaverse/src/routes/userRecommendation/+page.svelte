<script>
  import Layout from "../../component/Layout.svelte";
  import SmallHeader from "../../component/SmallHeader.svelte";
  import Avatar from "../../component/Avatar.svelte";
  import { Card } from "flowbite-svelte";
  import ConfirmBtn from "../../component/ConfirmBtn.svelte";
  import { onMount } from "svelte";
  import axios from "axios";
  import { URL } from "../../routes/env";
  import * as localStorage from "../localStorage";
  import { browser } from "$app/environment";

  let img;
  export let members = []; //  유저 객체 리스트 형식으로
  onMount(async () => {
    let userId = localStorage.getWithExpiry('loginMember');
    // 로그인 상태에서 나랑 기술스택 하나라도 겹치는 유저 모두 리스트 형식으로 받기
    let copyMembers;
    await axios.get(`${URL}/api/member/recommend`, { withCredentials: true })
      .then(response => {
        copyMembers = response.data.data;
        copyMembers = copyMembers.filter(member => member.id !== userId);
      })
      .catch(error => console.log(error));

    for(const mem of copyMembers){
      let downloadedImg;
      await axios.get(`${URL}/api/file/download`,
        {
          params: {
            type: "member",    //  회원 프로필이면 member, 팀 배경화면이면 team
            id: mem.id//  회원 프로필이면 유저 아이디, 팀 배경화면은 teamId
          },
          withCredentials: true,
          responseType: "blob"
        })
        .then(response => {
          downloadedImg = response.data;
          if (downloadedImg.size === 0)
            mem.img = null;
          else{
            if(browser){
              mem.img = window.URL.createObjectURL(downloadedImg);
            }
          }
        })
        .catch(error => console.log(error));
    }
    members = copyMembers;
    console.log(members);
  });
</script>

<SmallHeader header="User Recommendation" />
<Layout>
  <div class="grid grid-cols-4 grid-rows-2 gap-4">
    {#each members as member}
      <Card>
        <div class="flex flex-col items-center">
<!--          image-->
          <Avatar use="User Recommendation" img="{member.img}" />
          <h4 class="mb-1 mt-1 text-xl font-medium text-gray-900 dark:text-white">{member.name}</h4>
          <span class="text-sm text-gray-500 dark:text-gray-400">{member.department}</span>
          <span class="text-sm text-gray-500 dark:text-gray-400">{member.info ? member.info : "자기소개가 없어요"}</span>
          <div class="flex mt-4 space-x-3 lg:mt-6">
            <ConfirmBtn content="상세보기" color="blue" location="/profile/{member.id}" />
            <ConfirmBtn content="쪽지 보내기" color="light" txtColor="black" style="border" location="/postMsg"/>
          </div>
        </div>
      </Card>
    {/each}
  </div>
</Layout>
