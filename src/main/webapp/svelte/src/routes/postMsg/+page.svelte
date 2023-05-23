<script>
	import SmallHeader from '../../component/SmallHeader.svelte';
	import ConfirmBtn from '../../component/ConfirmBtn.svelte';
	import Layout from '../../component/Layout.svelte';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Checkbox,
		Pagination,
		Input,
		Modal,
		Textarea,
		Label,
		Search,
		Tabs,
		TabItem
	} from 'flowbite-svelte';
	import { page } from '$app/stores';
	import axios from "axios";

	let sendModal = false;
	let receiveCheckModal = false;
	let sendCheckModal = false;
	let color;

	let board = [
		{ title: 'test1', writer: 'kim', createTime: '2023-03-10', hit: '30' },
		{ title: 'test2', writer: 'kim', createTime: '2023-03-10', hit: '30' },
		{ title: 'test3', writer: 'kim', createTime: '2023-03-10', hit: '30' },
		{ title: 'test4', writer: 'kim', createTime: '2023-03-10', hit: '30' },
		{ title: 'test5', writer: 'kim', createTime: '2023-03-10', hit: '30' },
		{ title: 'test5', writer: 'kim', createTime: '2023-03-10', hit: '30' }
	];

	$: activeUrl = $page.url.searchParams.get('page');
	let pages = [
		{ name: '1', href: '/components/pagination?page=1' },
		{ name: '2', href: '/components/pagination?page=2' },
		{ name: '3', href: '/components/pagination?page=3' },
		{ name: '4', href: '/components/pagination?page=4' },
		{ name: '5', href: '/components/pagination?page=5' }
	];

	$: {
		pages.forEach((page) => {
			let splitUrl = page.href.split('?');
			let queryString = splitUrl.slice(1).join('?');
			const hrefParams = new URLSearchParams(queryString);
			let hrefValue = hrefParams.get('page');
			if (hrefValue === activeUrl) {
				page.active = true;
			} else {
				page.active = false;
			}
		});
		pages = pages;
	}

	const previous = () => {
		alert('Previous btn clicked. Make a call to your server to fetch data.');
	};
	const next = () => {
		alert('Next btn clicked. Make a call to your server to fetch data.');
	};

	let textareaprops = {
		id: 'message',
		name: 'message',
		label: 'Your message',
		rows: 4,
		placeholder: 'Leave a comment...'
	};

	const clickRow = () => {
		color = 'yellow';
		receiveCheckModal = true;
	};

	//	message domain 참조

	// 내가 보낸 메시지 목록
	function getSentMessages(){
		let sentMessages = [];	//	message list 형식

		const res = axios.get('/api/message/list/sent',
				{
				})
				.then(response => {
					sentMessages = response.data.data;
				})
				.catch(error => console.log(error))
		console.log(res);

		return sentMessages;
	}
	// 내가 받은 메시지 목록
	function getReceivedMessages(){
		let receivedMessages = [];	//	message list 형식

		const res = axios.get('/api/message/list/received',
				{
				})
				.then(response => {
					receivedMessages = response.data.data;
				})
				.catch(error => console.log(error))
		console.log(res);

		return receivedMessages;
	}

	// 쪽지 id로 상세 조회
	function getMessageDetail(messageId){
		let message = [];	//	message domain 참조

		const res = axios.get('/api/message/detail',
				{
					params:{
						messageId : messageId
					}
				})
				.then(response => {
					message = response.data.data;
				})
				.catch(error => console.log(error))
		console.log(res);

		return message;
	}

	//	쪽지 작성
	function createMessage(){
		const res = axios.post('/api/message/create',
				{
					sender : teamName,
					receiver : teamInfo,
					title : teamPw,
					content : teamMembers,
				})
				.then(response => {
					if (response.data.data == "success")
						alert("create success");
				})
				.catch(error => console.log(error))
		console.log(res);
	}
	//	쪽지 삭제
	function deleteMessage(messageId){
		const res = axios.post('/api/message/delete',
				{
					messageId : messageId
				})
				.then(response => {
					if (response.data.data == "success")
						alert("delete success");
				})
				.catch(error => console.log(error))
		console.log(res);
	}
</script>

<SmallHeader header="Post Message" />

<Layout>
	<div class="relative overflow-x-auto">
		<Tabs>
			<!-- 받은 쪽지 -->
			<TabItem open>
				<span slot="title">받은 쪽지</span>

				<Table class="mb-6" hoverable>
					<TableHead>
						<TableHeadCell class="!p-4">
							<Checkbox />
						</TableHeadCell>
						<TableHeadCell>보낸 사람</TableHeadCell>
						<TableHeadCell>제목</TableHeadCell>
						<TableHeadCell>날짜</TableHeadCell>
						<TableHeadCell>읽음 상태</TableHeadCell>
					</TableHead>
					<TableBody>
						{#each board as item}
							<TableBodyRow>
								<TableBodyCell class="!p-4">
									<Checkbox />
								</TableBodyCell>
								<!-- 방법1 -->
								<TableBodyCell on:click={clickRow}>{item.title}</TableBodyCell>
								<TableBodyCell on:click={clickRow}>{item.writer}</TableBodyCell>
								<TableBodyCell on:click={clickRow}>{item.createTime}</TableBodyCell>
								<TableBodyCell on:click={clickRow}>{item.hit}</TableBodyCell>
							</TableBodyRow>
						{/each}
					</TableBody>
				</Table>

				<div class="flex justify-between">
					<ConfirmBtn content="삭제" color="red" />
					<ConfirmBtn
						content="쪽지 보내기"
						color="blue"
						on:click={() => {
							color = 'yellow';
							sendModal = true;
						}}
					/>
				</div>

				<div class="flex justify-center">
					<Pagination {pages} on:previous={previous} on:next={next} />
				</div>
			</TabItem>

			<!-- 보낸 쪽지 -->
			<TabItem>
				<span slot="title">보낸 쪽지</span>
				<Table class="mb-6" hoverable>
					<TableHead>
						<TableHeadCell class="!p-4">
							<Checkbox />
						</TableHeadCell>
						<TableHeadCell>받은 사람</TableHeadCell>
						<TableHeadCell>제목</TableHeadCell>
						<TableHeadCell>날짜</TableHeadCell>
						<TableHeadCell>읽음 상태</TableHeadCell>
					</TableHead>
					<TableBody>
						{#each board as item}
							<!-- 방법2 -->
							<TableBodyRow
								on:click={(e) => {
									color = 'yellow';
									sendCheckModal = true;
								}}
							>
								<TableBodyCell class="!p-4">
									<Checkbox />
								</TableBodyCell>
								<TableBodyCell>{item.title}</TableBodyCell>
								<TableBodyCell>{item.writer}</TableBodyCell>
								<TableBodyCell>{item.createTime}</TableBodyCell>
								<TableBodyCell>{item.hit}</TableBodyCell>
							</TableBodyRow>
						{/each}
					</TableBody>
				</Table>

				<div class="flex justify-between">
					<ConfirmBtn content="삭제" color="red" />
					<ConfirmBtn
						content="쪽지 보내기"
						color="blue"
						on:click={() => {
							color = 'yellow';
							sendModal = true;
						}}
					/>
				</div>

				<div class="flex justify-center">
					<Pagination {pages} on:previous={previous} on:next={next} />
				</div>
			</TabItem>
		</Tabs>
	</div>

	<!-- 보낸 쪽지 확인 -->
	<Modal title="보낸 쪽지 확인" bind:open={sendCheckModal} {color} autoclose>
		<div class="leading-relaxed w-[600px]">
			<Label for="message" class="block mb-2">받은 사람</Label>
			<Input id="disabled-input-2" class="mb-6" disabled readonly value="Disabled readonly input" />

			<Label for="message" class="block mb-2">내용</Label>
			<Textarea {...textareaprops} disabled readonly />
		</div>
		<svelte:fragment slot="footer">
			<div class="flex justify-between w-[100%]">
				<ConfirmBtn content="취소" color="red" />
				<ConfirmBtn
					content="확인"
					color="blue"
					on:click={() => {
						alert('Handle success');
					}}
				/>
			</div>
		</svelte:fragment>
	</Modal>

	<!-- 받은 쪽지 확인 -->
	<Modal title="받은 쪽지 확인" bind:open={receiveCheckModal} {color} autoclose>
		<div class="leading-relaxed w-[600px]">
			<Label for="message" class="block mb-2">보낸 사람</Label>
			<Input id="disabled-input-2" class="mb-6" disabled readonly value="Disabled readonly input" />

			<Label for="message" class="block mb-2">내용</Label>
			<Textarea {...textareaprops} disabled readonly />
		</div>
		<svelte:fragment slot="footer">
			<div class="flex justify-between w-[100%]">
				<ConfirmBtn content="취소" color="red" />
				<ConfirmBtn
					content="답장하기"
					color="blue"
					on:click={() => {
						alert('Handle success');
					}}
				/>
			</div>
		</svelte:fragment>
	</Modal>

	<!-- 쪽지 보내기 -->
	<Modal title="쪽지 보내기" bind:open={sendModal} {color} autoclose>
		<div class=" leading-relaxed w-[600px]">
			<Label for="message" class="block mb-2">받는 사람</Label>
			<Search size="md" class="mb-4" />

			<Label for="message" class="block mb-2">내용</Label>
			<Textarea {...textareaprops} />
		</div>
		<svelte:fragment slot="footer">
			<div class="flex justify-between w-[100%]">
				<ConfirmBtn content="취소" color="red" />
				<ConfirmBtn
					content="답장하기"
					color="blue"
					on:click={() => {
						alert('Handle success');
					}}
				/>
			</div>
		</svelte:fragment>
	</Modal>
</Layout>
