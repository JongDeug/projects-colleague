<svelte:head>
	<link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
	<script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
</svelte:head>

<script>
	import { onMount } from 'svelte';
	export let content;
	export let value = { html: '', text: '' };

	// quill editor settings
	let editor;
	onMount(async () => {
		// @ts-ignore
		let quill = new Quill(editor, {
			modules: {
				toolbar: [
					[{ header: [1, 2, 3, false] }],
					['bold', 'italic', 'underline', 'strike', 'image'],
					['link', 'code-block']
				]
			},
			// placeholder: "hi...",
			theme: 'snow'
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


<div bind:this={editor} style="height: 450px;" />
