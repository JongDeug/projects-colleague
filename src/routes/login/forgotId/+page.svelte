<script>
  import ConfrimBtn from "../../../component/ConfirmBtn.svelte";
  import Layout from "../../../component/Layout.svelte";
  import { Label, Input } from "flowbite-svelte";
  import axios from "axios";
  import * as localStorage from "../../localStorage";
  import { URL } from "../../env";

  let name;
  let email;
  let phoneNum;
  const findId = async () => {
    await axios.post(`${URL}/api/member/find/id`,
      {
        name: name,
        email: email,
        phoneNum: phoneNum
      }, { withCredentials: true })
      .then(response => {
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
    <h1 class="font-bold mb-7">아이디 찾기</h1>

    <div class="mb-6">
      <Label for="success" class="block mb-2">이름</Label>
      <Input bind:value={name} id="success" placeholder="Success input" />
    </div>
    <div class="mb-6">
      <Label for="success" class="block mb-2">이메일</Label>
      <Input bind:value={email} id="success" placeholder="Success input" type="email" />
    </div>

    <div class="mb-10">
      <Label for="success" class="block mb-2">전화번호</Label>
      <Input bind:value={phoneNum} id="success" placeholder="010-1234-1234" type="tel" />
    </div>

    <ConfrimBtn on:click={findId} content="확인" color="blue" style="w-[100%]" />
  </div>
</Layout>
