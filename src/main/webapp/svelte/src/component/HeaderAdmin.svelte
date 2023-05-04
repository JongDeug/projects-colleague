<script>
	import { fade, fly } from 'svelte/transition';
	import Svg from './Svg.svelte';

	let profileStatus = false;

	let mobileMenu = false;
	const handleMobileStauts = () => {
		mobileMenu = !mobileMenu;
	};
</script>

<nav id="nav" class="bg-[#95E0C8]">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<div class="flex items-center">
				<div class="flex-shrink-0">
					<a href="/admin/user" class="flex navLogo items-center" id="logo">
						<img src="/images/JoinUs.png" alt="" class="w-11 h-11 mr-3" />
						Join.Us
					</a>
				</div>
			</div>

			<div class="hidden md:block">
				<div class="ml-4 flex items-center space-x-3 md:ml-6">
					<a
						href="/admin/login"
						class="bg-gray-900 text-white px-3 py-1 rounded-md font-medium focus:ring-4 focus:outline-none"
						>로그인</a
					>
					<!-- svelte-ignore a11y-invalid-attribute -->
					<a
						href="#"
						class="bg-gray-900 text-white px-3 py-1 rounded-md font-medium focus:ring-4 focus:outline-none"
						>로그아웃</a
					>
				</div>
			</div>

			<!-- mobile -->
			<div class="-mr-2 flex md:hidden">
				<button
					type="button"
					class="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
					aria-controls="mobile-menu"
					aria-expanded="false"
					on:click={handleMobileStauts}
				>
					<Svg svgName="햄버거" />
				</button>
			</div>
		</div>
	</div>

	{#if mobileMenu}
		<div class="md:hidden" id="mobile-menu" transition:fly={{ y: -10, duration: 400 }}>
			<div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
				<a
					href="/admin/login"
					class="block rounded-md px-3 py-2 font-medium hover:bg-gray-700 hover:text-white"
					>로그인</a
				>
				<!-- svelte-ignore a11y-invalid-attribute -->
				<a
					href="#"
					class="block rounded-md px-3 py-2 font-medium hover:bg-gray-700 hover:text-white"
					>로그아웃</a
				>
			</div>
		</div>
	{/if}
</nav>
