<script>
	import ConfrimBtn from '../../../component/ConfirmBtn.svelte';
	import Layout from '../../../component/Layout.svelte';
	import {
		Label,
		Input,
		Textarea,
		Search,
		Listgroup,
		ListgroupItem,
		CloseButton,
		Avatar,
		Fileupload
	} from 'flowbite-svelte';
	import axios from "axios";

	let userId = sessionStorage.getItem("loginMember");
	let members = [];

	let textareaprops = {
		id: 'message',
		name: 'message',
		rows: 4,
		placeholder: '팀을 소개해주세요...'
	};

	let value;

	function createTeam(){
		let teamName = document.getElementById("teamName").value;
		let teamInfo = document.getElementById("teamInfo").value;
		let teamPw = document.getElementById("teamPw").value;
		const res = axios.post('/api/team/create',
				{
					teamName : teamName,
					teamInfo : teamInfo,
					teamPw : teamPw,
				})
				.then(response => {
					if (response.data.data == "success")
						alert("create success")
				})
				.catch(error => console.log(error))
		console.log(res);
	}
	function searchUser(){

	}
</script>

<Layout>
	<div class="p-8 border w-[60%] m-auto shadow-lg">
		<h1 class="font-bold mb-7">팀 생성</h1>

		<div class="mb-6">
			<Label for="default-input" class="block mb-2">팀 명</Label>
			<Input id="teamName" placeholder="팀 이름" />
		</div>

		<div class="mb-6">
			<Label for="message" class="block mb-2">팀 소개</Label>
			<Input id="teamInfo" placeholder="팀을 소개해주세요..." />
		</div>

		<div class="mb-6">
			<div class="mb-6">
				<Label for="phoneNumber" class="block mb-2">팀원 리스트</Label>
				<Search size="md" />
				<ConfrimBtn content="찾기" color="blue" style="w-[100%]" on:click={createTeam} location="/myPage/myTeam"/>
			</div>
			<Listgroup active>
				<h5 class="text-center bg-blue-500 text-white font-bold rounded-t-lg">팀원 목록</h5>
				<ListgroupItem class="font-semibold gap-2">
					<Avatar src="" size="xs" />Jese Leos
					<CloseButton />
				</ListgroupItem>
				<ListgroupItem class="font-semibold gap-2">
					<Avatar src="" size="xs" />Robert Gouth
					<CloseButton />
				</ListgroupItem>
			</Listgroup>
		</div>

		<div class="mb-6">
			<Label class="mb-3">팀 배경 사진</Label>
			<div class="flex items-center">
				<Fileupload bind:value />
			</div>
		</div>

		<div class="mb-10">
			<Label for="default-input" class="block mb-2">회의방 비밀번호</Label>
			<Input id="teamPw" placeholder="Default input" />
		</div>

		<ConfrimBtn content="저장" color="blue" style="w-[100%]" on:click={createTeam} location="/myPage/myTeam"/>
	</div>
</Layout>
