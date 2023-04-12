<script>
	import { Label, Input } from 'flowbite-svelte';
	import ConfirmBtn from '../../../component/ConfirmBtn.svelte';
	import Layout from '../../../component/Layout.svelte';
</script>

<!-- redirect to login -->

<Layout>
	<div class="p-8 border w-[60%] m-auto shadow-lg">
		<h1 class="font-bold mb-7">비밀번호 찾기</h1>

		<div class="mb-6">
			<Label for="success" class="block mb-2">아이디</Label>
			<Input id="success" placeholder="Success input" />
		</div>
		<div class="mb-10">
			<Label for="success" class="block mb-2">이메일</Label>
			<Input id="success" placeholder="Success input" />
		</div>

		<ConfirmBtn content="확인" color="blue" style="w-[100%]" />

		<div class="mt-4 text-center">
			<a href="/login/forgotId" class="text-blue-700 underline">아이디를 잊으셨나요?</a>
		</div>
	</div>
</Layout>
