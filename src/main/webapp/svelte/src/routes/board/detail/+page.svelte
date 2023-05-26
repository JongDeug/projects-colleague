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

	// 회원 이름으로 유저들 리스트 받아오기
	function searchUsers(userName){
		let members = [];

		const res = axios.get('/api/member/name',
				{
					params:{
						userName : userName
					}
				})
				.then(response => {
					members = response.data.data;
				})
				.catch(error => console.log(error))
		console.log(res);
		return members;
	}

	//	회원 id로 이름 받아오기
	function getUser(memberId){
		let member = [];

		const res = axios.get('/api/member/search',
				{
					params:{
						memberId : memberId
					}
				})
				.then(response => {
					member = response.data.data;
				})
				.catch(error => console.log(error))
		console.log(res);
		return member;
	}

	// 게시글 상세정보 게시글 id 파라미터로 줘서 Post 엔티티로 받아오기
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
					writer = getUser(post.userId).name;
				})
				.catch(error => console.log(error))
		console.log(res);
	}
	function getPostWithNoHit(){
		const res = axios.get('/api/post/detail/edit',
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
					writer = getUser(post.userId).name;
				})
	}
	function updatePost(){
		const res = axios.post('/api/post/detail',
				{
					id : postId,
					userId : userId,
					title : title,
					content : content.text,
					hit : hit
				})
				.then(response => {
					alert(response.data.data)
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
