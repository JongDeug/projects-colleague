<script>
	import ConfirmBtn from '../../../../component/ConfirmBtn.svelte';
	import Layout from '../../../../component/Layout.svelte';
	import SmallHeader from '../../../../component/SmallHeader.svelte';
	import Svg from '../../../../component/Svg.svelte';
</script>

<SmallHeader header="Question And Report Detail" />
<Layout>
	<h1 class="">종류</h1>
	<div class="relative flex space-x-5 mb-2">
		<p class="flex items-center">
			<Svg svgName="작성자" />
			보낸 사람 : 김종환
		</p>
		<p class="flex items-center">
			<Svg svgName="날짜" />
			날짜 : 2023-10-13
		</p>
	</div>
	<hr class="border-2 mb-3" />

	<p>sldkfjsdflkj</p>

	<div class="flex justify-end">
		<ConfirmBtn content="삭제" color="red" style="py-4 shadow-md" />
	</div>
</Layout>
