<script>
	import { onMount } from 'svelte';
	export let content;
	export let value;

	export let toolbarOptions = [
		[{ header: 1 }, { header: 2 }, "blockquote", "link", "image", "video"],
		["bold", "italic", "underline", "strike"],
		[{ list: "ordered" }, { list: "ordered" }],
		[{ align: [] }],
		["clean"]
	];

	// quill editor settings
	let editor;
	onMount(async () => {
		const { default: Quill } = await import("quill");
		let quill = new Quill(editor, {
			modules: {
				toolbar: toolbarOptions
			},
			theme: "snow",
			placeholder: "Write your story..."
		});
		quill.on('text-change', () => {
			// quill 내용을 text형태와 html 형태로 가져와야함.
			value.html = quill.root.innerHTML;
			value.text = quill.getText();
		});

		// quill에 html 넣기
		quill.root.innerHTML = content.html;
	});
</script>

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
</style>

<div bind:this={editor} style="height: 450px;" />
