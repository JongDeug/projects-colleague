<script>
	import Layout from '../../../component/Layout.svelte';
	import SmallHeader from '../../../component/SmallHeader.svelte';
	import Svg from '../../../component/Svg.svelte';
	import ConfirmBtn from '../../../component/ConfirmBtn.svelte';
	import axios from "axios";

	let userId = sessionStorage.getItem("loginMember");

	let title;
	let content;
	let writer;
	let createTime;
	let hit;
	let postId;

	let post = [];

	function getUserName(memberId){
		let userName;

		const res = axios.get('/api/member/name',
				{
					params:{
						memberId : memberId
					}
				})
				.then(response => {
					userName = response.data;
				})
				.catch(error => console.log(error))
		console.log(res);
		return userName;
	}

	function getPost(postId){
		const res = axios.get('/api/post/detail',
				{
					params:{
						postId : postId
					}
				})
				.then(response => {
					post = response.data.data;
					title = post.title;
					content = post.content;
					createTime = post.createTime;
					hit = post.hit;
					writer = getUserName(post.userId);
				})
				.catch(error => console.log(error))
		console.log(res);
	}

	getPost(postId);

</script>

<SmallHeader header="Board" />

<Layout>
	<h1 class="">{title}</h1>
	<div class="relative flex mb-2 justify-between">
		<div class="flex space-x-5">
			<p class="flex items-center">
				<Svg svgName="작성자" />
				작성자 : {writer}
			</p>
			<p class="flex items-center">
				<Svg svgName="날짜" />
				날짜 : {createTime}
			</p>
			<p class="flex items-center">
				<Svg svgName="조회수" />
				조회수 : {hit}
			</p>
		</div>
		<ConfirmBtn content="신고하기" svgName="신고" color="red" txtColor="black" />
	</div>
	<hr class="border-2 mb-3" />

	<p>{content}</p>
</Layout>
