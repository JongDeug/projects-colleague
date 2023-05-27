<script>
	import Sidebar from '../../../../component/SidebarMyTeam.svelte';
	import Breadcrumb from '../../../../component/Breadcrumb.svelte';
	import ConfrimBtn from '../../../../component/ConfirmBtn.svelte';
	import Layout from '../../../../component/Layout.svelte';
	import SmallHeader from '../../../../component/SmallHeader.svelte';
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

	let textareaprops = {
		id: 'message',
		name: 'message',
		rows: 4,
		placeholder: '팀을 소개해주세요...'
	};

	let selected;

	let countries = [
		{ value: 'us', name: 'United States' },
		{ value: 'ca', name: 'Canada' },
		{ value: 'fr', name: 'France' }
	];
	let value;
</script>

<!-- 팀 명  -->
<SmallHeader header="abcd" />
<Layout style="flex justify-center">
	<Sidebar />
	<div class="ml-5 block w-[70%]">
		<Breadcrumb prevContent="내 팀" nextContent="설정" />

		<div class="mt-3 p-10 rounded-lg shadow-md border mb-3">
			<h1 class="font-bold mb-7">설정</h1>

			<div class="mb-6 w-[70%]">
				<Label for="default-input" class="block mb-2">팀 명</Label>
				<Input id="default-input" placeholder="Default input" />
			</div>

			<div class="mb-6 w-[70%]">
				<Label for="message" class="block mb-2">팀 소개</Label>
				<Textarea {...textareaprops} />
			</div>

			<div class="mb-6 w-[70%]">
				<div class="mb-6">
					<Label for="phoneNumber" class="block mb-2">팀원 리스트</Label>
					<Search size="md" />
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

			<div class="w-[70%] mb-6">
				<Label
					>팀장
					<Select class="mt-2" items={countries} bind:value={selected} />
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
				<Input id="default-input" placeholder="Default input" />
			</div>
		</div>
		<ConfrimBtn content="저장" color="blue" style="w-[100%] py-4 shadow-md" />
	</div>
</Layout>
