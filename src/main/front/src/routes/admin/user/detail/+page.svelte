<script>
	import Layout from '../../../../component/Layout.svelte';
	import SmallHeader from '../../../../component/SmallHeader.svelte';
	import Svg from '../../../../component/Svg.svelte';
	import Avatar from '../../../../component/Avatar.svelte';
	import ConfirmBtn from '../../../../component/ConfirmBtn.svelte';
	import { Label, ButtonGroup, InputAddon, Input, Checkbox, Fileupload } from 'flowbite-svelte';

	let value;
</script>

<SmallHeader header="User Detail" />
<Layout>
	<!-- 사용자 -->
	<div class="p-10 rounded-lg shadow-md border">
		<h1 class="font-bold mb-7">사용자</h1>
		<!-- 이름 -->
		<div class="mb-6 w-[70%]">
			<Label for="website-admin" class="block mb-2">이름</Label>
			<ButtonGroup class="w-full">
				<InputAddon>
					<Svg svgName="이름" />
				</InputAddon>
				<Input id="website-admin" placeholder="elonmusk" />
			</ButtonGroup>
		</div>

		<!-- 이메일 -->
		<div class="mb-6 w-[70%]">
			<Label for="email" class="block mb-2">이메일</Label>
			<ButtonGroup class="w-full">
				<InputAddon>
					<Svg svgName="이메일" />
				</InputAddon>
				<Input id="email" type="email" placeholder="name@gmail.com" />
			</ButtonGroup>
		</div>

		<!-- 전화번호 -->
		<div class="mb-6 w-[70%]">
			<Label for="phoneNumber" class="block mb-2">전화번호</Label>
			<ButtonGroup class="w-full">
				<InputAddon>
					<Svg svgName="전화번호" />
				</InputAddon>
				<Input id="phoneNumber" type="tel" placeholder="010-####-####" />
			</ButtonGroup>
		</div>

		<!-- 소속 -->
		<div class="mb-6 w-[70%]">
			<Label for="phoneNumber" class="block mb-2">소속</Label>
			<ButtonGroup class="w-full">
				<InputAddon>
					<Svg svgName="소속" />
				</InputAddon>
				<Input id="phoneNumber" type="tel" placeholder="010-####-####" />
			</ButtonGroup>
		</div>

		<div class="w-[70%]">
			<Label class="mb-3">프로필 사진</Label>
			<div class="flex items-center">
				<Avatar use="My Page" img="d" />
				<Fileupload bind:value />
			</div>
		</div>
	</div>

	<!-- 개인 포트폴리오 -->
	<div class="mt-3 p-10 rounded-lg shadow-md border mb-3">
		<h1 class="font-bold mb-7">개인 포트폴리오</h1>
		<!-- 간단한 자기소개 -->
		<div class="mb-6 w-[70%]">
			<Label for="default-input" class="block mb-2">간단한 자기소개</Label>
			<Input id="default-input" placeholder="Default input" />
		</div>

		<!-- 웹사이트 -->
		<div class="mb-6 w-[70%]">
			<Label for="default-input" class="block mb-2">웹사이트</Label>
			<Input id="default-input" placeholder="Default input" />
		</div>

		<!-- 깃허브 주소 -->
		<div class="mb-6 w-[70%]">
			<Label for="default-input" class="block mb-2">깃허브 주소</Label>
			<Input id="default-input" placeholder="Default input" />
		</div>

		<!-- 기술스택 -->
		<div class="mb-6 w-[70%]">
			<Label for="default-input" class="block mb-2">기술스택</Label>
			<div class="grid grid-cols-2 gap-4">
				<Checkbox>Default checkbox</Checkbox>
				<Checkbox checked>Checked state</Checkbox>
				<Checkbox checked>Checked state</Checkbox>
			</div>
		</div>
	</div>
	<ConfirmBtn content="회원 탈퇴" color="red" style="w-[100%] py-4 shadow-md" />
</Layout>
