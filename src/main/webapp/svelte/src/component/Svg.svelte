<script>
	export let svgName;
</script>

{#if svgName == '이름'}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="#000000"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg
	>
{:else if svgName == '이메일'}
	<svg
		aria-hidden="true"
		class="w-5 h-5 text-gray-500 dark:text-gray-400"
		fill="currentColor"
		viewBox="0 0 20 20"
		xmlns="http://www.w3.org/2000/svg"
		><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path
			d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
		/></svg
	>
{:else if svgName == '전화번호'}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="#000000"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		><path
			d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
		/></svg
	>
{:else if svgName == '소속'}
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
		><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path
			d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
		/></svg
	>
{:else if svgName == '시계'}
	<svg
		class="w-4 h-4 mr-2 text-gray-400"
		aria-hidden="true"
		fill="currentColor"
		viewBox="0 0 20 20"
		xmlns="http://www.w3.org/2000/svg"
		><path
			fill-rule="evenodd"
			d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
			clip-rule="evenodd"
		/></svg
	>
{:else if svgName == '아래 화살표'}
	<svg
		class="w-3 h-3 ml-2"
		aria-hidden="true"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		><path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M19 9l-7 7-7-7"
		/></svg
	>
{:else if svgName == '검색'}
	<svg
		class="w-5 h-5 text-gray-500 dark:text-gray-400"
		aria-hidden="true"
		fill="currentColor"
		viewBox="0 0 20 20"
		xmlns="http://www.w3.org/2000/svg"
		><path
			fill-rule="evenodd"
			d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
			clip-rule="evenodd"
		/></svg
	>
{:else if svgName == '물음표'}
	<svg
		class="w-5 h-5 mr-2 shrink-0"
		fill="currentColor"
		viewBox="0 0 20 20"
		xmlns="http://www.w3.org/2000/svg"
		><path
			fill-rule="evenodd"
			d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
			clip-rule="evenodd"
		/></svg
	>
{:else if svgName == '페이스북'}
	<svg
		class="w-4 h-4 mr-2 -ml-1"
		aria-hidden="true"
		focusable="false"
		data-prefix="fab"
		data-icon="facebook-f"
		role="img"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 320 512"
		><path
			fill="currentColor"
			d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"
		/></svg
	>
{:else if svgName == '깃허브'}<svg
		class="w-4 h-4 mr-2 -ml-1"
		aria-hidden="true"
		focusable="false"
		data-prefix="fab"
		data-icon="github"
		role="img"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 496 512"
		><path
			fill="currentColor"
			d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
		/></svg
	>
{:else if svgName == '구글'}
	<svg
		class="w-4 h-4 mr-2 -ml-1"
		aria-hidden="true"
		focusable="false"
		data-prefix="fab"
		data-icon="google"
		role="img"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 488 512"
		><path
			fill="currentColor"
			d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
		/></svg
	>
{:else if svgName == '사진'}
	<svg
		width="48"
		height="48"
		class="text-gray-200 dark:text-gray-600"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
		fill="currentColor"
		viewBox="0 0 640 512"
		><path
			d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"
		/></svg
	>
{:else if svgName == '사진2'}
	<svg
		width="12rem"
		height="48"
		class="text-gray-200 dark:text-gray-600"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
		fill="currentColor"
		viewBox="0 0 640 512"
		><path
			d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"
		/></svg
	>
{:else if svgName == '플러스'}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="50"
		height="50"
		viewBox="0 0 24 24"
		fill="none"
		stroke="#000000"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line
			x1="8"
			y1="12"
			x2="16"
			y2="12"
		/></svg
	>
{:else if svgName == '오른쪽 화살표'}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="w-5 h-5 ml-2"
		><path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
		/></svg
	>
{:else if svgName == '인용'}
	<svg
		aria-hidden="true"
		class="w-10 h-10 text-gray-400 dark:text-gray-600"
		viewBox="0 0 24 27"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		><path
			d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
			fill="currentColor"
		/></svg
	>
{:else if svgName == '작성자'}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="#000000"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="mr-1"
		><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg
	>
{:else if svgName == '날짜'}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="#000000"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="mr-1"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg
	>
{:else if svgName == '조회수'}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="#000000"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="mr-1"
		><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg
	>
{:else if svgName == '신고'}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="#000000"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="mr-1"
		><path
			d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
		/><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg
	>
{:else if svgName == '알림'}
	<svg
		class="h-6 w-6"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		aria-hidden="true"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
		/>
	</svg>
{:else if svgName == '햄버거'}
	<svg
		class="block h-6 w-6"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		aria-hidden="true"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
		/>
	</svg>
{/if}
