<script>
	export let id;
	export let label;
	console.log(id);
</script>

<li>
	<div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
		<input
			id="filter-radio-example-{id}"
			type="radio"
			value=""
			name="filter-radio"
			class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
		/>
		<label
			for="filter-radio-example-{id}"
			class="w-full ml-2 font-medium text-gray-900 rounded dark:text-gray-300">{label}</label
		>
	</div>
</li>
