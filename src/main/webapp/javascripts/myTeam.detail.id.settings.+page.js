<script>
    import Sidebar from "../../../../component/SidebarMyTeam.svelte";
    import Breadcrumb from "../../../../component/Breadcrumb.svelte";
    import ConfrimBtn from "../../../../component/ConfirmBtn.svelte";
    import Layout from "../../../../component/Layout.svelte";
    import SmallHeader from "../../../../component/SmallHeader.svelte";

    import {
    Avatar,
    CloseButton,
    Input,
    Label,
    Listgroup,
    ListgroupItem,
    Search,
    Select,
    Textarea,
    Toggle
} from "flowbite-svelte";
    import {onMount} from "svelte";
    import axios from "axios";
    import {URL} from "../../../env";
    import {browser} from "$app/environment";

    /** @type {import("./$types").PageData} */
    export let data;

    export let team = []; // 팀 객체 (domain 참고)
    let teamLength;
    let teamMembers = [];

    let files;
    let img;

    let toggle;
    let toggleText;
    $: if (toggle) {
    toggleText = "완료";
} else {
    toggleText = "진행 중";
}
    onMount(async () => {
    let downloadedImg
    await axios.get(`${URL}/api/file/download`,
{
    params: {
    type : "team",    //  회원 프로필이면 member, 팀 배경화면이면 team
    id : data.teamId//  회원 프로필이면 유저 아이디, 팀 배경화면은 teamId
},
    withCredentials: true,
    responseType: 'blob'
})
    .then(response => {
    downloadedImg = response.data;
    // console.log(response.data);
    img = window.URL.createObjectURL(downloadedImg);
})
    .catch(error => console.log(error));
});
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
            teamLeader = team.leader;
            teamLength = team.members.length;
            teamMembers = team.members;
            teamMembers.forEach((member) => {
                selectTeamMembers = [...selectTeamMembers, {value: member, name: member}];
            });
            // console.log(selectTeamMembers);
            if (team.state === "진행 중") {
                toggle = false;
            } else {
                toggle = true;
            }
        })
        .catch(error => console.log(error));
});


    // 팀 정보 업데이트
    const updateTeam = async (teamId) => {
    let fileName = null;
    if (files != null)
    fileName = files[0].name;
    await axios.post(`${URL}/api/team/myTeam/update`,
{
    id: teamId,
    name: team.name,
    leader: teamLeader,
    info: team.info,
    pw: team.pw,
    state: toggleText,
    teamGit: team.teamGit,
    teamPic: fileName,
    members: teamMembers
}, {withCredentials: true})
    .then(response => {
    if (response.data.data == "success") {
    alert("update success");
    if (browser) {
    window.location.href = `/myTeam/detail/${data.teamId}/settings`;
}
}
})
    .catch(error => console.log(error));
};

    let value;
    let textareaprops = {
    id: "message",
    name: "message",
    rows: 4,
    placeholder: "팀을 소개해주세요..."
};


    export let selectTeamMembers = [];
    $: console.log(selectTeamMembers);

    let searchInput;
    $: searchUsers(searchInput);

    let teamLeader;
    $: console.log(teamLeader);

    const exceptMember = (id) => {
    teamMembers = teamMembers.filter((member) => member !== id);
    selectTeamMembers = selectTeamMembers.filter((member) => member.name !== id);
};

    let members;
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
})
    .catch(error => console.log(error));
} else {
    members = [];
}
};


</script>

<!-- 팀 명  -->
<SmallHeader header="{team.name}"/>
<Layout style="flex justify-center">
    <Sidebar teamId="{data.teamId}"/>
    <div className="ml-5 block w-[70%]">
        <Breadcrumb prevContent="내 팀" nextContent="설정"/>

        <div className="mt-3 p-10 rounded-lg shadow-md border mb-3">
            <div className="flex items-center mb-7 space-x-5">
                <h1 className="font-bold">설정</h1>
                <Toggle bind:checked={toggle}>{toggleText}</Toggle>
            </div>

            <div className="mb-6 ">
                <Label for="default-input" class="block mb-2">팀 명</Label>
                <Input bind:value={team.name}/>
            </div>
            <div className="mb-6 ">
                <Label for="message" class="block mb-2">팀 소개</Label>
                <Textarea {...textareaprops} bind:value={team.info}/>
            </div>

            <div className="mb-6 relative ">
                <div className="">
                    <Label for="phoneNumber" class="block mb-2">팀원 리스트</Label>
                    <Search size="md" bind:value={searchInput}/>
                </div>

                <div className="absolute t-0 r-0 w-full">
                    <Listgroup active>
                        {#each members as member}
                        <ListgroupItem class="font-semibold gap-2" on:click={() => {
                            let flag = teamMembers.find((person) => person === member.id);
                            if (!flag) {
                                teamMembers = [...teamMembers, member.id];
                                selectTeamMembers = [...selectTeamMembers, {value: member.id, name: member.id}];
                            }
                            members = [];
                            searchInput = "";
                        }}>
                            <Avatar src="" size="xs"/>
                            {member.id}
                        </ListgroupItem>
                        {/each}
                            </Listgroup>
                            </div>

                            <div class="mt-6">
                            <Listgroup active>
                            <h5 class="text-center bg-blue-500 text-white font-bold rounded-t-lg">팀원 목록</h5>
                        {#each teamMembers as member}
                        <ListgroupItem class="font-semibold gap-2">
                            <Avatar src="" size="xs"/>
                            {member}
                            <CloseButton on:click={() => {
                                exceptMember(member)
                            }}/>
                        </ListgroupItem>
                        {/each}
                            </Listgroup>
                            </div>
                            </div>

                            <div class="mb-6 ">
                            <Label
                            > 팀 리더 설정
                            <Select class="mt-2" items={selectTeamMembers} bind:value={teamLeader}/>
                </Label>
            </div>

            <div className=" mb-6">
                <Label class="mb-3">팀 배경 사진</Label>
                <div className="flex items-end">
                    <form action="{URL}/api/file/upload/test" method="post" id="fileForm" encType="multipart/form-data"
                          target="blankifr">
                        <input bind:files type="file" name="multipartFile">
                            <input style="display:none" type="text" name="type" value="team">
                                <input style="display:none" type="text" name="id" value={data.teamId}>
                                    <button type="submit">사진 저장</button>
                                    <iframe name='blankifr' style='display:none;'></iframe>
                    </form>
                </div>
                <img src="{img}">
            </div>

            <div className=" mb-6">
                <Label for="default-input" class="block mb-2">깃허브 주소</Label>
                <Input bind:value={team.teamGit}/>
            </div>

            <div className="">
                <Label for="default-input" class="block mb-2">회의방 비밀번호</Label>
                <Input bind:value={team.pw} type="password"/>
            </div>
        </div>
        <ConfrimBtn content="저장" color="blue" style="w-[100%] py-4 shadow-md" on:click={() => updateTeam(data.teamId)}/>
    </div>
</Layout>
