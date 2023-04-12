<script>
	import ConfrimBtn from './ConfirmBtn.svelte';
	import Svg from './Svg.svelte';

	export let location = '';
	export let style = '';
	export let content;
	export let color;
</script>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
	<div class="p-4">
		<label for="table-search" class="sr-only">Search</label>
		<div class="relative mt-1 flex justify-between">
			<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
				<Svg svgName="검색" />
			</div>
			<input
				type="text"
				id="table-search"
				class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="Search by maker name"
			/>
			<ConfrimBtn {content} {color} {style} {location} />
		</div>
	</div>

	<slot />
</div>
