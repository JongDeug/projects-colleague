<script>
	import Sidebar from '../../../component/SidebarMyPage.svelte';
	import ConfrimBtn from '../../../component/ConfirmBtn.svelte';
	import Breadcrumb from '../../../component/Breadcrumb.svelte';
	import Layout from '../../../component/Layout.svelte';
	import SmallHeader from '../../../component/SmallHeader.svelte';
	import { Label, Input, Helper } from 'flowbite-svelte';
	import axios from "axios";



	let userId = "qwe"	//	로그인 세션 유지 아이디
	function updateProfile(){
		let curPw = document.getElementById("curPw").value;
		let newPw = document.getElementById("newPw").value;
		let newPwCheck = document.getElementById("newPwCheck").value;
		const res = axios.post('/api/member/profile/changePwd',
				{
					memberId : userId,
					curPw : curPw,
					newPw : newPw,
					newPwCheck : newPwCheck,

				})
				.then(response => {
					if (response.data == userId)
						alert("update success")
				})
				.catch(error => console.log(error))
		console.log(res);
	}
</script>

<SmallHeader header="My Page" />

<Layout style="flex justify-center">
	<Sidebar />

	<!-- 비밀번호 변경 -->
	<div class="ml-5 block w-[70%]">
		<Breadcrumb prevContent="설정" nextContent="비밀번호 변경" />

		<div class="mt-3 p-10 rounded-lg shadow-md border mb-3">
			<h1 class="font-bold mb-7">비밀번호 변경</h1>
			<div class="mb-6 w-[70%]">
				<Label for="default-input" class="block mb-2">현재 비밀번호</Label>
				<Input id="curPw" placeholder="Default input" />
			</div>
			<div class="mb-6 w-[70%]">
				<Label for="error" color="red" class="block mb-2">비밀번호 변경</Label>
				<Input id="newPw" color="red" placeholder="Success input" />
				<Helper class="mt-2" color="red"
					><span class="font-medium">Well done!</span> Some success messsage.</Helper
				>
			</div>
			<div class="w-[70%]">
				<Label for="error" color="red" class="block mb-2">비밀번호 변경 확인</Label>
				<Input id="newPwCheck" color="red" placeholder="Success input" />
				<Helper class="mt-2" color="red"
					><span class="font-medium">Well done!</span> Some success messsage.</Helper
				>
			</div>
		</div>

		<ConfrimBtn content="비밀번호 변경 확인" color="blue" style="w-[100%] py-4 shadow-md" on:click={updateProfile}/>
	</div>
</Layout>
