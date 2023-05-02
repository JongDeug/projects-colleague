<script>
	import Layout from '../../component/Layout.svelte';
	import SmallHeader from '../../component/SmallHeader.svelte';
	import Avatar from '../../component/Avatar.svelte';
	import { Card } from 'flowbite-svelte';
	import ConfirmBtn from '../../component/ConfirmBtn.svelte';
</script>

<SmallHeader header="User Recommendation" />
<Layout>
	<div class="grid grid-cols-4 grid-rows-2 gap-4">
		<Card>
			<div class="flex flex-col items-center">
				<Avatar use="User Recommendation" img="d" />
				<h4 class="mb-1 mt-1 text-xl font-medium text-gray-900 dark:text-white">김종환</h4>
				<span class="text-sm text-gray-500 dark:text-gray-400">소속</span>
				<span class="text-sm text-gray-500 dark:text-gray-400">간단한 소개 안녕 안녕</span>
				<div class="flex mt-4 space-x-3 lg:mt-6">
					<ConfirmBtn content="상세보기" color="blue" />
					<ConfirmBtn content="쪽지 보내기" color="light" txtColor="black" style="border"/>
				</div>
			</div>
		</Card>
		<Card>
			<div class="flex flex-col items-center">
				<Avatar use="User Recommendation" img="d" />
				<h4 class="mb-1 mt-1 text-xl font-medium text-gray-900 dark:text-white">김종환</h4>
				<span class="text-sm text-gray-500 dark:text-gray-400">소속</span>
				<span class="text-sm text-gray-500 dark:text-gray-400">간단한 소개 안녕 안녕</span>
				<div class="flex mt-4 space-x-3 lg:mt-6">
					<ConfirmBtn content="상세보기" color="blue" />
					<ConfirmBtn content="쪽지 보내기" color="light" txtColor="black" style="border"/>
				</div>
			</div>
		</Card>
		<Card>
			<div class="flex flex-col items-center">
				<Avatar use="User Recommendation" img="d" />
				<h4 class="mb-1 mt-1 text-xl font-medium text-gray-900 dark:text-white">김종환</h4>
				<span class="text-sm text-gray-500 dark:text-gray-400">소속</span>
				<span class="text-sm text-gray-500 dark:text-gray-400">간단한 소개 안녕 안녕</span>
				<div class="flex mt-4 space-x-3 lg:mt-6">
					<ConfirmBtn content="상세보기" color="blue" />
					<ConfirmBtn content="쪽지 보내기" color="light" txtColor="black" style="border"/>
				</div>
			</div>
		</Card>
		<Card>
			<div class="flex flex-col items-center">
				<Avatar use="User Recommendation" img="d" />
				<h4 class="mb-1 mt-1 text-xl font-medium text-gray-900 dark:text-white">김종환</h4>
				<span class="text-sm text-gray-500 dark:text-gray-400">소속</span>
				<span class="text-sm text-gray-500 dark:text-gray-400">간단한 소개 안녕 안녕</span>
				<div class="flex mt-4 space-x-3 lg:mt-6">
					<ConfirmBtn content="상세보기" color="blue" />
					<ConfirmBtn content="쪽지 보내기" color="light" txtColor="black" style="border"/>
				</div>
			</div>
		</Card>
	</div>
</Layout>
