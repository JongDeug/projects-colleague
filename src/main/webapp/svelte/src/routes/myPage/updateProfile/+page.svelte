<script>
	import Sidebar from '../../../component/SidebarMyPage.svelte';
	import Svg from '../../../component/Svg.svelte';
	import Avatar from '../../../component/Avatar.svelte';
	import ConfirmBtn from '../../../component/ConfirmBtn.svelte';
	import Breadcrumb from '../../../component/Breadcrumb.svelte';
	import Layout from '../../../component/Layout.svelte';
	import SmallHeader from '../../../component/SmallHeader.svelte';
	import { Label, Input, InputAddon, ButtonGroup, Checkbox, Fileupload } from 'flowbite-svelte';
	import axios from "axios";

	let value;	//	 프사?
	let userId = sessionStorage.getItem("loginMember");
	let userName="";
	let userEmail="";
	let userPhoneNum="";
	let userDepartment="";
	let userInfo="";
	let userBlog="";
	let userGit="";
	function setProfile(){

		const res = axios.get('/api/member/profile/update',
				{
				})
				.then(response => {
					userId = response.data.data.id;
					userName = response.data.data.name;
					userEmail = response.data.data.email;
					userPhoneNum = response.data.data.phoneNum;
					userDepartment = response.data.data.department;
					userInfo = response.data.data.info;
					userBlog = response.data.data.blog;
					userGit = response.data.data.gitAddress;
				})
				.catch(error => console.log(error))
		console.log(res);
	}
	function updateProfile(){
		userName = document.getElementById("name").value;
		userEmail = document.getElementById("email").value;
		userPhoneNum = document.getElementById("phoneNumber").value;
		userDepartment = document.getElementById("department").value;
		userInfo = document.getElementById("info").value;
		userBlog = document.getElementById("blog").value;
		userGit = document.getElementById("git").value;
		const res = axios.post('/api/member/profile/update',
				{
					id : userId,
					name : userName,
					email : userEmail,
					phoneNum : userPhoneNum,
					department : userDepartment,
					info : userInfo,
					blog : userBlog,
					gitAddress : userGit,
					profileImg:"aa"

				})
				.then(response => {
					if (response.data == "success")
						alert("update success")
					else alert("update failure")
				})
				.catch(error => console.log(error))
		console.log(res);
	}
	setProfile();
</script>

<SmallHeader header="My Page" />

<Layout style="flex justify-center">
	<Sidebar />

	<div class="ml-5 block w-[70%]">
		<Breadcrumb prevContent="설정" nextContent="회원정보 수정" />

		<!-- 사용자 -->
		<div class="mt-3 p-10 rounded-lg shadow-md border">
			<h1 class="font-bold mb-7">사용자</h1>
			<!-- 이름 -->
			<div class="mb-6 w-[70%]">
				<Label for="website-admin" class="block mb-2">이름</Label>
				<ButtonGroup class="w-full">
					<InputAddon>
						<Svg svgName="이름" />
					</InputAddon>
					<Input id="name" placeholder="elonmusk" value={userName}/>
				</ButtonGroup>
			</div>

			<!-- 이메일 -->
			<div class="mb-6 w-[70%]">
				<Label for="email" class="block mb-2">이메일</Label>
				<ButtonGroup class="w-full">
					<InputAddon>
						<Svg svgName="이메일" />
					</InputAddon>
					<Input id="email" type="email" placeholder="name@gmail.com" value={userEmail}/>
				</ButtonGroup>
			</div>

			<!-- 전화번호 -->
			<div class="mb-6 w-[70%]">
				<Label for="phoneNumber" class="block mb-2">전화번호</Label>
				<ButtonGroup class="w-full">
					<InputAddon>
						<Svg svgName="전화번호" />
					</InputAddon>
					<Input id="phoneNumber" type="tel" placeholder="010-####-####" value={userPhoneNum}/>
				</ButtonGroup>
			</div>

			<!-- 소속 -->
			<div class="mb-6 w-[70%]">
				<Label for="phoneNumber" class="block mb-2">소속</Label>
				<ButtonGroup class="w-full">
					<InputAddon>
						<Svg svgName="소속" />
					</InputAddon>
					<Input id="department" type="tel" placeholder="010-####-####" value={userDepartment}/>
				</ButtonGroup>
			</div>

			<div class="w-[70%]">
				<Label class="mb-3">프로필 사진</Label>
				<div class="flex items-center">
					<Avatar use="My Page" />
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
				<Input id="info" placeholder="Default input" value={userInfo}/>
			</div>

			<!-- 웹사이트 -->
			<div class="mb-6 w-[70%]">
				<Label for="default-input" class="block mb-2">웹사이트</Label>
				<Input id="blog" placeholder="Default input" value={userBlog}/>
			</div>

			<!-- 깃허브 주소 -->
			<div class="mb-6 w-[70%]">
				<Label for="default-input" class="block mb-2">깃허브 주소</Label>
				<Input id="git" placeholder="Default input" value={userGit}/>
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

		<ConfirmBtn content="회원정보 수정 확인" color="blue" style="w-[100%] py-4 shadow-md" on:click={updateProfile} />
	</div>
</Layout>
