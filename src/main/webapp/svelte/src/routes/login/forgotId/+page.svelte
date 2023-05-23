<script>
	import ConfrimBtn from '../../../component/ConfirmBtn.svelte';
	import Layout from '../../../component/Layout.svelte';
	import { Label, Input } from 'flowbite-svelte';
	import axios from "axios";


	// 이름 이메일 폰번호로 아이디 찾기
	function findId(){
		let name = document.getElementById("name").value;
		let email = document.getElementById("email").value;
		let phoneNum = document.getElementById("phoneNumber").value;

		const res = axios.post('/api/member/find/id',
				{
					name : name,
					email : email,
					phoneNum : phoneNum,
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
		<h1 class="font-bold mb-7">아이디 찾기</h1>

		<div class="mb-6">
			<Label for="success" class="block mb-2">이름</Label>
			<Input id="name" placeholder="Success input" />
		</div>
		<div class="mb-6">
			<Label for="success" class="block mb-2">이메일</Label>
			<Input id="email" placeholder="Success input" type="email" />
		</div>

		<div class="mb-10">
			<Label for="success" class="block mb-2">전화번호</Label>
			<Input id="phoneNumber" placeholder="010-1234-1234" type="tel" />
		</div>

		<ConfrimBtn content="확인" color="blue" style="w-[100%]" location="/login" on:click={findId}/>
	</div>
</Layout>
