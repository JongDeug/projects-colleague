<script>
	import Svg from '../../../component/Svg.svelte';
	import SmallHeader from '../../../component/SmallHeader.svelte';
	import Layout from '../../../component/Layout.svelte';
	import {
		Blockquote,
		Heading,
		CloseButton,
		Img,
		Label,
		Input,
		Listgroup,
		ListgroupItem,
		Avatar
	} from 'flowbite-svelte';
</script>

<SmallHeader header="Team Introduction" style="lg:px-52" />
<Layout style="flex justify-center">
	<div class="w-[71%]">
		<div class="flex justify-between mb-6">
			<div class="rounded-lg shadow-md border w-[30%] p-5">
				<h3>팀장</h3>
				<p>asd</p>
			</div>
			<div class="rounded-lg shadow-md border w-[30%] p-5">
				<h3>팀원 수</h3>
				<p>3</p>
			</div>
			<div class="rounded-lg shadow-md border w-[30%] p-5">
				<h3>팀 상태</h3>
				<p>in progress</p>
			</div>
		</div>

		<div class="rounded-lg shadow-md border p-10">
			<!-- <Img src="/images/image.png" size="max-w-lg" /> -->
			<div class="flex justify-center items-center mb-10 h-60 bg-gray-300 rounded dark:bg-gray-700">
				<Svg svgName="사진" />
			</div>
			<Heading tag="h1" class="mb-10">JoinUs</Heading>
			<Blockquote size="xl" class="mb-10">
				<Svg svgName="인용" />
				"Flowbite is just awesome. It contains tons of predesigned components and pages starting from
				login screen to complex dashboard. Perfect choice for your next SaaS application."
			</Blockquote>

			<Listgroup active class="mb-6">
				<h5 class="text-center bg-blue-500 text-white font-bold rounded-t-lg">팀원 목록</h5>
				<ListgroupItem class=" font-semibold gap-2">
					<Avatar src="" size="xs" />Jese Leos
					<CloseButton />
				</ListgroupItem>
				<ListgroupItem class=" font-semibold gap-2">
					<Avatar src="" size="xs" />Robert Gouth
					<CloseButton />
				</ListgroupItem>
			</Listgroup>

			<div>
				<Label for="default-input" class="block mb-2">깃허브 주소</Label>
				<Input id="default-input" placeholder="Default input" readonly />
			</div>
		</div>
	</div>
</Layout>