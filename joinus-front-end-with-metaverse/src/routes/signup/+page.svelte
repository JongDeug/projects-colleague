<script>
	import Layout from '../../component/Layout.svelte';
	import LoginBtn from '../../component/LoginBtn.svelte';
	import Svg from '../../component/Svg.svelte';
</script>

<Layout>
	<div class="p-8 border w-[60%] m-auto shadow-lg">
		<div class="text-center font-bold mb-5">
			<h2>Join.us에 오신 것을 환영합니다.😀😀</h2>
			<p class="block mt-3">Join.us가 여러분의 팀프로젝트에 도움이 되길 바랍니다.</p>
		</div>

		<LoginBtn style="bg-[#24292F] hover:bg-[#24292F]/90 mb-3" content="구글로 시작하기" svgName="구글" />

		<div
			class="mb-5 relative text-center after:border-[1px] after:content-[''] after:block after:absolute after:top-[50%] after:w-[100%] after:rounded-sm"
		>
			<span class="relative font-thin text-slate-500 bg-white p-0 inline-block max-w-[75%] z-10">
				"Join.us에서 새로운 아이디와 비밀번호를 만드려면<br />
				<a class="underline text-blue-500" href="/signup/noAccount">이곳을 클릭해주세요.</a>"
			</span>
		</div>
	</div>
</Layout>
