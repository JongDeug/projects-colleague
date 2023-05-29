<script>
  import { Label, Input } from "flowbite-svelte";
  import ConfirmBtn from "../../../component/ConfirmBtn.svelte";
  import Layout from "../../../component/Layout.svelte";
  import axios from "axios";
  import * as localStorage from "../../localStorage";
  import { URL } from "../../env";

  let userId;
  let email;
  const findPw = async () => {
    await axios.post(`${URL}/api/member/find/pw`,
      {
        id: userId,
        email: email
      }, { withCredentials: true })
      .then(response => {
        console.log(response);
        if (response.data.data == "empty")
          alert("member not exist");
        else
          alert(response.data.data);
      })
      .catch(error => console.log(error));
  };
</script>

<!-- redirect to login -->

<Layout>
  <div class="p-8 border w-[60%] m-auto shadow-lg">
    <h1 class="font-bold mb-7">비밀번호 찾기</h1>

    <div class="mb-6">
      <Label for="success" class="block mb-2">아이디</Label>
      <Input bind:value={userId} id="success" />
    </div>
    <div class="mb-10">
      <Label for="success" class="block mb-2">이메일</Label>
      <Input bind:value={email} id="success" placeholder="abcd@gmail.com" />
    </div>

    <ConfirmBtn on:click={findPw}  content="확인" color="blue" style="w-[100%]" />

    <div class="mt-4 text-center">
      <a href="/login/forgotId" class="text-blue-700 underline">아이디를 잊으셨나요?</a>
    </div>
  </div>
</Layout>
