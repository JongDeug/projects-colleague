<script>
  import ConfrimBtn from "../../../component/ConfirmBtn.svelte";
  import Layout from "../../../component/Layout.svelte";
  import {
    Label,
    Input,
    Textarea,
    Search,
    Listgroup,
    ListgroupItem,
    CloseButton,
    Avatar,
    Fileupload, Select
  } from "flowbite-svelte";
  import axios from "axios";
  import { URL } from "../../env";
  import * as localStorage from "../../localStorage";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  let teamLeader;
  let files = null;
  let img = null;



  export let selectTeamMembers = [];
  $: console.log(selectTeamMembers);

  // 팀에 소속될 회원 id 저장될 리스트
  export let teamMembers = [];
  $: console.log(teamMembers);

  onMount(async () => {
    // 자신을 자동 추가
    await axios.get(`${URL}/api/member/search`,
      {
        params: {
          memberId: userId
        },
        withCredentials: true
      })
      .then(response => {
        console.log(response.data.data);
        teamMembers = response.data.data;
        selectTeamMembers = [{ value: userId, name: userId }];
      })
      .catch(error => console.log(error));
  });

  let userId = localStorage.getWithExpiry("loginMember");
  let members;

  let searchInput;

  let textareaprops = {
    id: "message",
    name: "message",
    rows: 4,
    placeholder: "팀을 소개해주세요..."
  };

  // 팀 만들기
  let teamName;
  let teamInfo;
  let teamPw;
  let teamBg;

  const createTeam = async () => {
    if (!teamName || !teamInfo || !teamPw || !teamLeader || !teamMembers) {
      alert("입력값이 빠졌습니다");
    } else {

      let memberIds = [];
      teamMembers.forEach((member) => {
        memberIds.push(member.id);
      })

      await axios.post(`${URL}/api/team/create`,
        {
          name: teamName,
          info: teamInfo,
          pw: teamPw,
          leader: teamLeader,
          members: memberIds,
          teamGit: "주소를 입력하지 않았습니다.",
          teamPic: null,
        }, { withCredentials: true })
        .then(response => {
          if (response.data.data == "success"){
            alert("create success");
            if(browser){
              window.location.href = "/myTeam/list";
            }
          }
        })
        .catch(error => console.log(error));
    }
  };

  const searchUsers = async (memberId) => {
    if (memberId) {
      await axios.get(`${URL}/api/member/search`,
        {
          params: {
            memberId: memberId
          },
          withCredentials: true
        })
        .then(response => {
          members = response.data.data;
          console.log(members)
        })
        .catch(error => console.log(error));

      for(const mem of members){
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
      members = members;
    } else {
      members = [];
    }
  };

  const exceptMember = (id) => {
    teamMembers = teamMembers.filter((member) => member.id !== id);
    selectTeamMembers = selectTeamMembers.filter((member) => member.name !== id);
  };

  $: searchUsers(searchInput);
</script>

<Layout>
  <div class="p-8 border w-[60%] m-auto shadow-lg">
    <h1 class="font-bold mb-7">팀 생성</h1>

    <div class="mb-6">
      <Label for="default-input" class="block mb-2">팀 명</Label>
      <Input bind:value={teamName} id="default-input" placeholder="Default input" />
    </div>

    <div class="mb-6">
      <Label for="message" class="block mb-2">팀 소개</Label>
      <Textarea {...textareaprops} bind:value={teamInfo} />
    </div>

    <div class="mb-6 relative">
      <div class="">
        <Label for="phoneNumber" class="block mb-2">팀원 리스트</Label>
        <Search size="md" bind:value={searchInput} />
      </div>

      <div class="absolute t-0 r-0 w-full relative">
        <Listgroup active>
          {#each members as member}
            <ListgroupItem class="font-semibold gap-2 z-50" on:click={() => {
              let flag = teamMembers.find((person) => person.id === member.id);
              if(!flag){
                teamMembers = [...teamMembers, member];
                selectTeamMembers = [...selectTeamMembers, {value: member.id, name: member.id}];
              }
              members = [];
              searchInput = "";
            }}>
              <Avatar src="{member.img}" size="xs" />
              {member.id}
            </ListgroupItem>
          {/each}
        </Listgroup>
      </div>

      <div class="mt-6">
        <Listgroup active>
          <h5 class="text-center bg-blue-500 text-white font-bold rounded-t-lg">팀원 목록</h5>
          {#each teamMembers as member}
            <ListgroupItem class="font-semibold gap-2 z-0">
              <Avatar src="{member.img}" size="xs" />
              {member.id}
              <CloseButton on:click={() => {exceptMember(member.id)}} />
            </ListgroupItem>
          {/each}
        </Listgroup>
      </div>
    </div>

    <div class="mb-6">
      <Label
      > 팀 리더 설정
        <Select class="mt-2" items={selectTeamMembers} bind:value={teamLeader} />
      </Label>
    </div>

<!--    <div class="mb-6">-->
<!--      <Label class="mb-3">팀 배경 사진</Label>-->
<!--      <div class="flex items-center">-->
<!--        <Fileupload bind:value={teamBg} />-->
<!--      </div>-->
<!--      <form action="{URL}/api/file/upload/test" method="post" id="fileForm" encType="multipart/form-data"-->
<!--            target="blankifr">-->
<!--        <input bind:files type="file" name="multipartFile">-->
<!--        <input style="display:none" type="text" name="type" value="team">-->
<!--        <input style="display:none" type="text" name="id" value={data.teamId}>-->
<!--        <button type="submit">사진 저장</button>-->
<!--        <iframe name='blankifr' style='display:none;'></iframe>-->
<!--      </form>-->
<!--    </div>-->

    <div class="mb-10">
      <Label for="default-input" class="block mb-2">회의방 비밀번호</Label>
      <Input bind:value={teamPw} id="default-input" placeholder="Default input" />
    </div>

    <ConfrimBtn content="저장" color="blue" style="w-[100%]" on:click={createTeam} />
  </div>
</Layout>
