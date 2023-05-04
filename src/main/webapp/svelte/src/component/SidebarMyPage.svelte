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
		href: '/board/list',
		img: '/images/JoinUs.png'
	};
</script>

<Sidebar>
	<div class="overflow-y-auto py-4 px-3 dark:bg-gray-800 border-2 rounded-lg border-indigo-200">
		<SidebarGroup>
			<SidebarBrand {site} id="logo" />

			<SidebarDropdownWrapper label="회원정보">
				<svelte:fragment slot="icon">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
						/></svg
					>
				</svelte:fragment>
				<SidebarDropdownItem label="회원정보 수정" href="/myPage/updateProfile" />
				<SidebarDropdownItem label="비밀번호 변경" href="/myPage/changePwd" />
				<SidebarDropdownItem label="회원 탈퇴" />
			</SidebarDropdownWrapper>

			<SidebarItem label="내 팀" href="/myPage/myTeam">
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
			<SidebarItem label="내가 작성한 게시글" href="/myPage/myPost">
				<svelte:fragment slot="icon">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
						<rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
					</svg>
				</svelte:fragment>
			</SidebarItem>
			<SidebarItem label="Log out">
				<svelte:fragment slot="icon">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9" />
					</svg>
				</svelte:fragment>
			</SidebarItem>
			<!-- <hr class="h-px my-8 bg-gray-200 border-2 dark:bg-gray-700" /> -->
		</SidebarGroup>
	</div>
</Sidebar>
