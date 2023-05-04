<script>
	import {
		Sidebar,
		SidebarGroup,
		SidebarItem,
		SidebarBrand,
		SidebarDropdownItem,
		SidebarDropdownWrapper
	} from 'flowbite-svelte';
	let spanClass = 'flex-1 ml-3 whitespace-nowrap';

	let site = {
		name: 'Join.Us',
		href: '/admin/user',
		img: '/images/JoinUs.png'
	};

</script>

<Sidebar>
	<div class="overflow-y-auto py-4 px-3 dark:bg-gray-800 border-2 rounded-lg border-indigo-200">
		<SidebarBrand {site} id="logo" />
		<SidebarGroup>
			<SidebarItem label="회원 목록" href="/admin/user">
				<svelte:fragment slot="icon">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="#000000"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle
							cx="9"
							cy="7"
							r="4"
						/><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg
					>
				</svelte:fragment>
			</SidebarItem>

			<SidebarItem label="게시글 목록" href="/admin/board">
				<svelte:fragment slot="icon">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="#000000"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path
							d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
						/><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /></svg
					>
				</svelte:fragment>
			</SidebarItem>
			<SidebarItem label="질문 및 신고" href="/admin/questionAndReport">
				<svelte:fragment slot="icon">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="#000000"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path
							d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
						/><line x1="12" y1="9" x2="12" y2="13" /><line
							x1="12"
							y1="17"
							x2="12.01"
							y2="17"
						/></svg
					>
				</svelte:fragment>
			</SidebarItem>
		</SidebarGroup>
	</div>
</Sidebar>
