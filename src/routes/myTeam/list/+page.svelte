<script>
  import Card from "../../../component/Card.svelte";
  import CardPlaceholder from "../../../component/CardPlaceholder.svelte";
  import Layout from "../../../component/Layout.svelte";
  import SmallHeader from "../../../component/SmallHeader.svelte";
  import { onMount } from "svelte";
  import axios from "axios";
  import { URL } from "../../env";
  import { browser } from "$app/environment";


  let userId = sessionStorage.getItem("loginMember");
  export let teamList = [];
  let files = null;
  let img;

  onMount(async () => {
    // 로그인 상태에서 내가 속한 팀 리스트 가져오기 ( 내가 리더인 팀, 내가 멤버인 팀 전부다 )
    let copyTeamList;
    await axios.get(`${URL}/api/team/myTeam/list`, { withCredentials: true })
      .then(response => {
        copyTeamList = response.data.data;
        copyTeamList = copyTeamList.filter((team) => team.state === "진행 중");
      })
      .catch(error => console.log(error));

    for (const team of copyTeamList) {
      // 사진
      let downloadedImg;
      await axios.get(`${URL}/api/file/download`,
        {
          params: {
            type: "team",    //  회원 프로필이면 member, 팀 배경화면이면 team
            id: team.id//  회원 프로필이면 유저 아이디, 팀 배경화면은 teamId
          },
          withCredentials: true,
          responseType: "blob"
        })
        .then(response => {
          downloadedImg = response.data;
          if (browser) {
            team.img = window.URL.createObjectURL(downloadedImg);
          }
        })
        .catch(error => console.log(error));
    }
    teamList = copyTeamList;
  });
</script>

<SmallHeader header="My Team" />

<Layout>
  <div class="grid grid-cols-4 grid-rows-2 gap-4">
    {#each teamList as team, i}
      <Card usage="MyTeam" teamName={team.name} teamIntro={team.info} teamId={team.id} img="{teamList[i].img}" />
    {/each}

    <CardPlaceholder />
  </div>
</Layout>
