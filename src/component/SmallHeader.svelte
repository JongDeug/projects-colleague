<script>
	export let header;
	export let style = '';
</script>

<header class="bg-white shadow">
	<div
		class="{style} mx-auto max-w-7xl py-6 px-4 sm:px-6 {header == 'Board' ||
		header == 'My Team' ||
		header == 'User Recommendation' ||
		header == 'FAQ' ||
		header == 'Post Message' ||
		header == 'Create Post' ||
		header == 'User Detail' ||
		header == 'Post Detail' ||
		header == 'Question And Report Detail'
			? 'lg:px-8'
			: 'lg:px-20'}"
	>
		<h1 id="smallHeader" class="text-3xl font-bold tracking-tight text-gray-900">
			{header}
		</h1>
	</div>
</header>
