<script>
  import Card from "../../../component/Card.svelte";
  import CardPlaceholder from "../../../component/CardPlaceholder.svelte";
  import Layout from "../../../component/Layout.svelte";
  import SmallHeader from "../../../component/SmallHeader.svelte";
  import { onMount } from "svelte";
  import axios from "axios";
  import { URL } from "../../env";


  let userId = sessionStorage.getItem("loginMember");
  export let teamList = [];

  onMount(async () => {
    // 로그인 상태에서 내가 속한 팀 리스트 가져오기 ( 내가 리더인 팀, 내가 멤버인 팀 전부다 )
    await axios.get(`${URL}/api/team/myTeam/list`, { withCredentials: true })
      .then(response => {
        let copyTeamList = response.data.data;
        teamList = copyTeamList.filter((team) => team.state === "진행 중");
        console.log(teamList);
      })
      .catch(error => console.log(error));
  });


</script>

<SmallHeader header="My Team" />

<Layout>
  <div class="grid grid-cols-4 grid-rows-2 gap-4">
    {#each teamList as team}
      <Card usage="MyTeam" teamName={team.name} teamIntro={team.info} teamId={team.id} />
    {/each}

    <CardPlaceholder />
  </div>
</Layout>
