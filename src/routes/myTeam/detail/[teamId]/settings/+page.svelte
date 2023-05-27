<script>
	import Sidebar from '../../../../../component/SidebarMyTeam.svelte';
	import Breadcrumb from '../../../../../component/Breadcrumb.svelte';
	import ConfrimBtn from '../../../../../component/ConfirmBtn.svelte';
	import Layout from '../../../../../component/Layout.svelte';
	import SmallHeader from '../../../../../component/SmallHeader.svelte';
	import {
		Label,
		Avatar,
		Input,
		Listgroup,
		ListgroupItem,
		Search,
		CloseButton,
		Select,
		Textarea,
		Fileupload
	} from 'flowbite-svelte';
	import { onMount } from "svelte";
	import axios from "axios";
	import { URL } from "../../../../env";

	/** @type {import("./$types").PageData} */
	export let data;

	export let team = [];   //   팀 객체 (domain 참고)
	let teamLength;
	let teamMembers = [];
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
				})
				console.log(selectTeamMembers);
			})
			.catch(error => console.log(error));
	});


	//	팀 정보 업데이트
	const updateTeam = async (teamId) => {
		await axios.post(`${URL}/api/team/myTeam/update`,
			{
				teamId : teamId,
				teamName : team.name,
				teamLeader: teamLeader,
				teamInfo : team.info,
				teamPw : team.pw,
				memberIds : teamMembers
			}, {withCredentials: true})
			.then(response => {
				if (response.data.data == "success")
					alert("update success")
			})
			.catch(error => console.log(error));
	}

	let value;
	let textareaprops = {
		id: 'message',
		name: 'message',
		rows: 4,
		placeholder: '팀을 소개해주세요...'
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
<SmallHeader header="{team.name}" />
<Layout style="flex justify-center">
	<Sidebar teamId="{data.teamId}"/>
	<div class="ml-5 block w-[70%]">
		<Breadcrumb prevContent="내 팀" nextContent="설정" />

		<div class="mt-3 p-10 rounded-lg shadow-md border mb-3">
			<h1 class="font-bold mb-7">설정</h1>

			<div class="mb-6 w-[70%]">
				<Label for="default-input" class="block mb-2">팀 명</Label>
				<Input bind:value={team.name} id="default-input" placeholder="Default input" />
			</div>

			<div class="mb-6 w-[70%]">
				<Label for="message" class="block mb-2">팀 소개</Label>
				<Textarea {...textareaprops} bind:value={team.info}/>
			</div>

			<div class="mb-6 relative">
				<div class="">
					<Label for="phoneNumber" class="block mb-2">팀원 리스트</Label>
					<Search size="md" bind:value={searchInput} />
				</div>

				<div class="absolute t-0 r-0 w-full">
					<Listgroup active>
						{#each members as member}
							<ListgroupItem class="font-semibold gap-2" on:click={() => {
              let flag = teamMembers.find((person) => person === member.id);
              if(!flag){
                teamMembers = [...teamMembers, member.id];
                selectTeamMembers = [...selectTeamMembers, {value: member.id, name: member.id}];
              }
              members = [];
              searchInput = "";
            }}>
								<Avatar src="" size="xs" />
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
								<Avatar src="" size="xs" />
								{member}
								<CloseButton on:click={() => {exceptMember(member)}} />
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

			<div class="w-[70%] mb-6">
				<Label class="mb-3">팀 배경 사진</Label>
				<div class="flex items-end">
					<Fileupload bind:value />
				</div>
			</div>

			<div class="w-[70%] mb-6">
				<Label for="default-input" class="block mb-2">깃허브 주소</Label>
				<Input id="default-input" placeholder="Default input" />
			</div>

			<div class="w-[70%]">
				<Label for="default-input" class="block mb-2">회의방 비밀번호</Label>
				<Input bind:value={team.pw} id="default-input" placeholder="Default input" />
			</div>
		</div>
		<ConfrimBtn content="저장" color="blue" style="w-[100%] py-4 shadow-md" on:click={() => updateTeam(data.teamId)} />
	</div>
</Layout>
