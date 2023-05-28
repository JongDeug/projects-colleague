<script>
  import Avatar from "../../../component/Avatar.svelte";
  import ConfirmBtn from "../../../component/ConfirmBtn.svelte";
  import Card from "../../../component/Card.svelte";
  import Layout from "../../../component/Layout.svelte";
  import { Input, Label } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { URL } from "../../env";
  import axios from "axios";
  import Svg from "../../../component/Svg.svelte";

  /** @type {import("./$types").PageData} */
  export let data;

  export let userInfo = [];
  let techStack = [];
  export let teamList = [];
  onMount(async () => {
    // get, post 두 개 있는데 get은 요청만.
    // axios.get(`${URL}/api/member/profile/update`,
    //   { withCredentials: true })
    //   .then(response => {
    //     userInfo = response.data.data;
    //     let copyStack = [];
    //     userInfo.techStack.forEach((tech) => {
    //       copyStack.push({ name: tech, color: `#${Math.floor(Math.random() * 16777215).toString(16)}` });
    //     });
    //     techStack = copyStack;
    //   })
    //   .catch(error => console.log(error));
    // 유저 정보 get
    await axios.get(`${URL}/api/member/search`,
      {
        params: {
          memberId: data.userId
        },
        withCredentials: true
      })
      .then(response => {
        let members = response.data.data;
        userInfo = members[0];
        let copyStack = [];
        userInfo.techStack.forEach((tech) => {
          copyStack.push({ name: tech, color: `#${Math.floor(Math.random() * 16777215).toString(16)}` });
        });
        techStack = copyStack;
        console.log(userInfo);
      })
      .catch(error => console.log(error));

    // 로그인 상태에서 내가 속한 팀 리스트 가져오기 ( 내가 리더인 팀, 내가 멤버인 팀 전부다 )
    await axios.get(`${URL}/api/team/list`, {
      params: {
        userId: data.userId
      },
      withCredentials: true
    })
      .then(response => {
        teamList = response.data.data;
        // console.log(teamList);
      })
      .catch(error => console.log(error));
  });


</script>

<Layout use="Profile">
  <div class="relative">
    <div class="h-48 bg-black" />
    <div
      class="w-[80%] h-80 rounded-xl bg-white absolute top-[70%] left-1/2 transform -translate-x-1/2 shadow-md border"
    >
      <Avatar use="Profile" img="d" />

      <div class="flex justify-end space-x-2 p-10">
        <ConfirmBtn content="프로필 수정하기" color="blue" location="/myPage/updateProfile" />
      </div>

      <div class="text-center">
        <div>
          <h1 class="font-bold">{userInfo.name}</h1>
          <p class="mt-3">
            {userInfo.info ? userInfo.info : "자기소개를 작성해주세요"}
          </p>
          <span class="inline-block mt-3">{userInfo.department ? userInfo.department : "부서를 기입해주세요"}</span>
        </div>
      </div>
    </div>
  </div>

  <div class="w-[80%] p-10 mb-3 mt-72 bg-white m-auto shadow-lg border rounded-xl">
    <h1 class="font-bold mb-7">개인 포트폴리오</h1>
    <!-- 웹사이트 -->
    <div class="mb-6 w-[70%]">
      <Label for="default-input" class="block mb-2">웹사이트 주소</Label>
      <Input bind:value={userInfo.blog} id="default-input" placeholder="Default input" readonly />
    </div>

    <!-- 깃허브 주소 -->
    <div class="mb-6 w-[70%]">
      <Label for="default-input" class="block mb-2">깃허브 주소</Label>
      <Input bind:value={userInfo.gitAddress} id="default-input" placeholder="Default input" readonly />
    </div>

    <!-- 기술스택 -->
    <div class="mb-6 w-[70%]">
      <Label for="default-input" class="block mb-2">기술스택</Label>
      <div class="grid grid-cols-3 gap-4">
        <!--				<ConfirmBtn content="기술스택1" color="yellow" on:click={(e) => e.preventDefault();} />-->
        {#each techStack as tech }
          <!--				<ConfirmBtn content="기술스택2" color="blue" />-->
          <!--				<ConfirmBtn content="기술스택3" color="red" />-->
          <a
            style="background-color: {tech.color}"
            class="text-center rounded-xl focus:ring-4 focus:outline-none inline-flex items-center justify-center px-5 py-2"
          >
            {tech.name}
          </a>
        {/each}
      </div>
    </div>
  </div>
  <div class=" w-[80%] p-10 mb-3 bg-white m-auto shadow-lg border rounded-xl">


    <h1 class="font-bold mb-7">과거 팀 이력</h1>
    <!-- 웹사이트 -->
    <div class="grid grid-cols-2 gap-4">
      {#each teamList as team}
        <Card usage="Profile" teamName={team.name} teamIntro={team.info} teamId={team.id}>
          <h5 class="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
            {team.name}
          </h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
            {team.info}
          </p>
        </Card>
      {/each}
    </div>
  </div>
</Layout>
