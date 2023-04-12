<script>
	import Layout from '../../../component/Layout.svelte';
	import SmallHeader from '../../../component/SmallHeader.svelte';
	import Svg from '../../../component/Svg.svelte';
	import ConfirmBtn from '../../../component/ConfirmBtn.svelte';
</script>

<SmallHeader header="Board" />

<Layout>
	<h1 class="">제목</h1>
	<div class="relative flex mb-2 justify-between">
		<div class="flex space-x-5">
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
		<ConfirmBtn content="신고하기" svgName="신고" color="red" txtColor="black" />
	</div>
	<hr class="border-2 mb-3" />

	<p>내용</p>
</Layout>
