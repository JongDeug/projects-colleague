<script>
	import Svg from '../../../component/Svg.svelte';
	import ConfirmBtn from '../../../component/ConfirmBtn.svelte';
	import Layout from '../../../component/Layout.svelte';
	import { InputAddon, ButtonGroup, Label, Input, Helper } from 'flowbite-svelte';
	import axios from "axios";
	import {error} from "@sveltejs/kit";
	let realId;
	function checkId() {
		let userId = document.getElementById("userId").value;
		const res = axios.post('/api/member/duplicateCheck',
				{
					id : userId
				})
				.then(response => {
					if (response.data)
						alert("duplicated id")
					else
					{
						alert("avaliable")
						realId = userId;
					}
					console.log(response.data)
				})
				.catch(error => console.log(error))
		console.log(res);
	}
	function join(){
		let userId = realId;
		let pw = document.getElementById("pw").value;
		let name = document.getElementById("name").value;
		let email = document.getElementById("email").value;
		let phoneNum = document.getElementById("phoneNumber").value;
		let department = document.getElementById("department").value;

		if (userId.empty() || pw.empty() || name.empty() || email.empty() || phoneNum.empty() || department.empty())
		{
			alert("join failed");
			return;
		}

		const res = axios.post('/api/member/join',
				{
					id : userId,
					pw : pw,
					name : name,
					email : email,
					phoneNum : phoneNum,
					department : department
				})
				.then(response => {
					if (userId == response.data)
						alert("join success")
					else
						alert("join failed")
				})
				.catch(error => console.log(error))
		console.log(res);
	}
</script>

<Layout>
	<div class="p-8 border w-[60%] m-auto shadow-lg">
		<h1 class="font-bold mb-7">회원가입</h1>

		<div class="mb-6">
			<Label for="success" color="green" class="block mb-2">아이디</Label>

			<div class="flex items-center">
				<Input id="userId" color="green" placeholder="Success input" class="mr-3" />
				<ConfirmBtn content="중복확인" color="black" style="w-[15%]" txtColor="black" on:click={checkId}/>
			</div>

			<Helper class="mt-2" color="green"
				><span class="font-medium">Well done!</span> Some success messsage.</Helper
			>
		</div>

		<div class="mb-6">
			<Label for="success" color="green" class="block mb-2">비밀번호</Label>
			<Input id="pw" color="green" placeholder="Success input" />
			<Helper class="mt-2" color="green"
				><span class="font-medium">Well done!</span> Some success messsage.</Helper
			>
		</div>
		<div class="mb-6">
			<Label for="success" color="green" class="block mb-2">비밀번호 확인</Label>
			<Input id="pw" color="green" placeholder="Success input" />
			<Helper class="mt-2" color="green"
				><span class="font-medium">Well done!</span> Some success messsage.</Helper
			>
		</div>

		<!-- 이름 -->
		<div class="mb-6">
			<Label for="website-admin" class="block mb-2">이름</Label>
			<ButtonGroup class="w-full">
				<InputAddon>
					<Svg svgName="이름" />
				</InputAddon>
				<Input id="name" placeholder="elonmusk" />
			</ButtonGroup>
		</div>

		<!-- 이메일 -->
		<div class="mb-6">
			<Label for="email" class="block mb-2">이메일</Label>
			<ButtonGroup class="w-full">
				<InputAddon>
					<Svg svgName="이메일" />
				</InputAddon>
				<Input id="email" type="email" placeholder="name@gmail.com" />
			</ButtonGroup>
		</div>

		<!-- 전화번호 -->
		<div class="mb-6">
			<Label for="phoneNumber" class="block mb-2">전화번호</Label>
			<ButtonGroup class="w-full">
				<InputAddon>
					<Svg svgName="전화번호" />
				</InputAddon>
				<Input id="phoneNumber" type="tel" placeholder="010-####-####" />
			</ButtonGroup>
		</div>

		<!-- 소속 -->
		<div class="mb-10">
			<Label for="phoneNumber" class="block mb-2">소속</Label>
			<ButtonGroup class="w-full">
				<InputAddon>
					<Svg svgName="소속" />
				</InputAddon>
				<Input id="department" type="tel" placeholder="010-####-####" />
			</ButtonGroup>
		</div>

		<ConfirmBtn content="다음" color="blue" style="w-[100%]" location="/login" on:click={join}/>
	</div>
</Layout>
