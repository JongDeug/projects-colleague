<script>
  import Svg from "../../../component/Svg.svelte";
  import ConfirmBtn from "../../../component/ConfirmBtn.svelte";
  import Layout from "../../../component/Layout.svelte";
  import { InputAddon, ButtonGroup, Label, Input, Helper, Button } from "flowbite-svelte";
  import axios from "axios";
  import { goto } from "$app/navigation";
  import {URL} from "../../env";

  let realId;
  let userId;

  const url = "http://localhost:8080";
  const checkId = () => {
    const res = axios.post(`${URL}/api/member/duplicateCheck`,
      {
        id: userId
      })
      .then(response => {
        if (response.data)
          alert("duplicated id");
        else {
          alert("avaliable");
          realId = userId;
        }
        console.log(response.data);
      })
      .catch(error => console.log(error));
    console.log(res);
  }

  let pw;
  let name;
  let email;
  let phoneNum;
  let department;
  const join = () => {

    if(!pw && !name && !email && !phoneNum && !department){
      alert("입력값이 빠졌습니다.");
    }else{
      const res = axios.post(`${URL}/api/member/join`,
        {
          id: realId,
          pw: pw,
          name: name,
          email: email,
          phoneNum: phoneNum,
          department: department
        })
        .then(response => {
          if (response.data.data == "success"){
            alert("join success");
            goto('/login');
          }
          else
            alert("join failed");
        })
        // .catch(error => console.log(error));
      console.log(res);
    }
  }

</script>

<Layout>
  <div class="p-8 border w-[60%] m-auto shadow-lg">
    <h1 class="font-bold mb-7">회원가입</h1>

    <div class="mb-6">
      <Label for="success" color="green" class="block mb-2">아이디</Label>

      <div class="flex items-center space-x-2">
        <Input bind:value={userId} id="success" color="green" placeholder="Success input" />
        <div class="flex basis-1/4">
          <Button on:click={checkId} color="dark">중복확인</Button>
        </div>
      </div>

      <Helper class="mt-2" color="green"
      ><span class="font-medium">Well done!</span> Some success messsage.
      </Helper
      >
    </div>

    <div class="mb-6">
      <Label for="success" color="green" class="block mb-2">비밀번호</Label>
      <Input bind:value={pw} id="success" color="green" placeholder="Success input" class="" />
      <Helper class="mt-2" color="green"
      ><span class="font-medium">Well done!</span> Some success messsage.
      </Helper
      >
    </div>
    <div class="mb-6">
      <Label for="success" color="green" class="block mb-2">비밀번호 확인</Label>
      <Input id="success" color="green" placeholder="Success input" class="" />
      <Helper class="mt-2" color="green"
      ><span class="font-medium">Well done!</span> Some success messsage.
      </Helper
      >
    </div>

    <!-- 이름 -->
    <div class="mb-6">
      <Label for="website-admin" class="block mb-2">이름</Label>
      <ButtonGroup class="w-full">
        <InputAddon>
          <Svg svgName="이름" />
        </InputAddon>
        <Input bind:value={name} id="website-admin" placeholder="elonmusk" />
      </ButtonGroup>
    </div>

    <!-- 이메일 -->
    <div class="mb-6">
      <Label for="email" class="block mb-2">이메일</Label>
      <ButtonGroup class="w-full">
        <InputAddon>
          <Svg svgName="이메일" />
        </InputAddon>
        <Input bind:value={email} id="email" type="email" placeholder="name@gmail.com" />
      </ButtonGroup>
    </div>

    <!-- 전화번호 -->
    <div class="mb-6">
      <Label for="phoneNumber" class="block mb-2">전화번호</Label>
      <ButtonGroup class="w-full">
        <InputAddon>
          <Svg svgName="전화번호" />
        </InputAddon>
        <Input bind:value={phoneNum} id="phoneNumber" type="tel" placeholder="010-####-####" />
      </ButtonGroup>
    </div>

    <!-- 소속 -->
    <div class="mb-10">
      <Label for="department" class="block mb-2">소속</Label>
      <ButtonGroup class="w-full">
        <InputAddon>
          <Svg svgName="소속" />
        </InputAddon>
        <Input bind:value={department} id="department" type="tel" placeholder="010-####-####" />
      </ButtonGroup>
    </div>

    <ConfirmBtn content="다음" color="blue" style="w-[100%]" on:click={join}/>
  </div>
</Layout>
