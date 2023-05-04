<script>
	import Layout from '../../../component/Layout.svelte';
	import LoginBtn from '../../../component/LoginBtn.svelte';
	import ConfirmBtn from '../../../component/ConfirmBtn.svelte';
	import { Input, Label, Checkbox } from 'flowbite-svelte';
</script>

<Layout>
	<div class="p-8 border w-[60%] m-auto shadow-lg">
		<div class="text-center font-bold mb-5">
			<h2>
				😀관리자 로그인😀
			</h2>
		</div>

		<!--  -->
		<div>
			<form>
				<div class="mb-6">
					<Label for="email" class="mb-2">이메일</Label>
					<Input type="email" id="email" placeholder="john.doe@company.com" required />
				</div>
				<div class="mb-6">
					<Label for="password" class="mb-2">패스워드</Label>
					<Input type="password" id="password" placeholder="•••••••••" required />
				</div>
				<div class="mb-6">
					<Checkbox>아이디 기억하기</Checkbox>
				</div>
				<ConfirmBtn content="계속" color="blue" style="w-[100%]" />
			</form>
		</div>
	</div>
</Layout>
