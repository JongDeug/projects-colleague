<script>
	import ConfirmBtn from '../../../../component/ConfirmBtn.svelte';
	import Layout from '../../../../component/Layout.svelte';
	import SmallHeader from '../../../../component/SmallHeader.svelte';
	import Svg from '../../../../component/Svg.svelte';
</script>

<SmallHeader header="Post Detail" />
<Layout>
	<h1 class="">제목</h1>
	<div class="relative flex space-x-5 mb-2">
		<!-- 이미지 넣기 -->
		<p class="flex items-center">
			<Svg svgName="작성자" />
			작성자 : 김종환
		</p>
		<p class="flex items-center">
			<Svg svgName="날짜" />
			날짜 : 2023-10-13
		</p>
		<p class="flex items-center">
			<Svg svgName="조회수" />
			조회수 : 1000
		</p>
	</div>
	<hr class="border-2 mb-3" />

	<p>sldkfjsdflkj</p>

	<div class="flex justify-end">
		<ConfirmBtn content="삭제" color="red" style="py-4 shadow-md" />
	</div>
</Layout>
