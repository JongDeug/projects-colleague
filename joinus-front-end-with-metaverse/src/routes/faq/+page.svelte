<script>
	import Svg from '../../component/Svg.svelte';
	import Layout from '../../component/Layout.svelte';
	import SmallHeader from '../../component/SmallHeader.svelte';
	import { AccordionItem, Accordion } from 'flowbite-svelte';
</script>

<SmallHeader header="FAQ" />

<Layout>
	<Accordion>
		<AccordionItem>
			<span slot="header" class="flex gap-2 items-center">
				<Svg svgName="물음표" />
				<span>What is Flowbite?</span>
			</span>
			<p class="mb-2 text-gray-500">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint
				explicabo...
			</p>
			<p class="text-gray-500">
				Check out this guide to learn how to <a
					href="/"
					target="_blank"
					rel="noreferrer"
					class="text-blue-600 hover:underline">get started</a
				> and start websites even faster with components on top of Tailwind CSS.
			</p>
		</AccordionItem>
		<AccordionItem>
			<span slot="header" class="flex gap-2 items-center">
				<Svg svgName="물음표" />
				<span> My Header 2</span>
			</span>
			<p class="mb-2 text-gray-500">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus
				sintexplicabo...
			</p>
		</AccordionItem>
	</Accordion>
</Layout>
