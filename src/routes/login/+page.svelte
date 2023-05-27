<script>
  import Layout from "../../component/Layout.svelte";
  import LoginBtn from "../../component/LoginBtn.svelte";
  import ConfirmBtn from "../../component/ConfirmBtn.svelte";
  import { Input, Label, Checkbox } from "flowbite-svelte";
  import axios from "axios";
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";
  import { URL } from "../env";
  import * as localStorage from "../localStorage";

  let userId;
  let userPw;

  const login = () => {
    if (!userId || !userPw) {
      alert("input id, pw");
    } else {
      const res = axios.post(`${URL}/api/login`,
        {
          loginId: userId,
          loginPw: userPw
        }, { withCredentials: true })
        .then(response => {
          if (response.data.data == "success") {
            alert("login success");
            // 30분
            localStorage.setWithExpiry("loginMember", userId, 60000*30);
            if (browser) {
              window.location.href = response.data.redirect;
            }
          } else {
            alert("login failure");
            goto(response.data.redirect);
          }
        })
        .catch(error => console.log(error));
    }
  };
</script>

<Layout>
  <div class="p-8 border w-[60%] m-auto shadow-lg">
    <div class="text-center font-bold mb-5">
      <h2>Join.us에 오신 것을 환영합니다.😀😀</h2>
      <p class="block mt-3">Join.us가 여러분의 팀프로젝트에 도움이 되길 바랍니다.</p>
    </div>

    <LoginBtn style="bg-[#24292F] hover:bg-[#24292F]/90 mb-3" content="구글로 계속하기" svgName="구글" />

    <!--  -->
    <div
      class="mb-5 relative text-center after:border-[1px] after:content-[''] after:block after:absolute after:top-[50%] after:w-[100%] after:rounded-sm"
    >
			<span class="relative font-thin text-slate-500 bg-white p-0 inline-block max-w-[75%] z-10">
				" 패스워드가 있으신가요? 이메일 주소를 입력해주세요! "
			</span>
    </div>

    <!--  -->
    <div>
      <form>
        <div class="mb-6">
          <Label for="email" class="mb-2">이메일</Label>
          <Input bind:value={userId} type="email" id="email" placeholder="john.doe@company.com" required />
        </div>
        <div class="mb-6">
          <Label for="password" class="mb-2">패스워드</Label>
          <Input bind:value={userPw} type="password" id="password" placeholder="•••••••••" required />
        </div>
        <ConfirmBtn content="계속" color="blue" style="w-[100%]" on:click={login} />

        <button on:click={login}></button>
        <!--        <a-->
        <!--          href={location}-->
        <!--          class="{style} text-center focus:ring-4 focus:outline-none inline-flex items-center justify-center px-5 py-2 text-{txtColor-->
        <!--		? txtColor-->
        <!--		: 'white'} bg-{color}-600 hover:bg-{color}-800 focus:ring-{color}-300 rounded-lg"-->
        <!--          on:click={() => {-->
        <!--		dispatcher('click');-->
        <!--	}}-->
        <div class="mt-4 text-center">
          <a href="/login/forgotPwd" class="text-blue-700 underline">비밀번호를 잊으셨나요?</a>
        </div>
      </form>
    </div>
  </div>
</Layout>
