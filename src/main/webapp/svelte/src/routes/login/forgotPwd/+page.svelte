<script>
	import { Label, Input } from 'flowbite-svelte';
	import ConfirmBtn from '../../../component/ConfirmBtn.svelte';
	import Layout from '../../../component/Layout.svelte';
	import axios from "axios";
	import ConfrimBtn from "../../../component/ConfirmBtn.svelte";

	// 아이디 이메일로 비밀번호 가져옴
	function findPw(){
		let userId = document.getElementById("userId").value;
		let email = document.getElementById("email").value;

		const res = axios.post('/api/member/find/pw',
				{
					id : userId,
					email : email,
				})
				.then(response => {
					if (response.data.data == "user not exist")
						alert("member not exist")
					else
						alert(response.data.data)
				})
				.catch(error => console.log(error))
		console.log(res);
	}
</script>

<!-- redirect to login -->

<Layout>
	<div class="p-8 border w-[60%] m-auto shadow-lg">
		<h1 class="font-bold mb-7">비밀번호 찾기</h1>

		<div class="mb-6">
			<Label for="success" class="block mb-2">아이디</Label>
			<Input id="userId" placeholder="Success input" />
		</div>
		<div class="mb-10">
			<Label for="success" class="block mb-2">이메일</Label>
			<Input id="email" placeholder="Success input" />
		</div>

		<ConfirmBtn content="확인" color="blue" style="w-[100%]" location="/login" on:click={findPw}/>

		<div class="mt-4 text-center">
			<a href="/login/forgotId" class="text-blue-700 underline">아이디를 잊으셨나요?</a>
		</div>
	</div>
</Layout>
