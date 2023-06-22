<script>
  import Svg from "../../../component/Svg.svelte";
  import ConfirmBtn from "../../../component/ConfirmBtn.svelte";
  import Layout from "../../../component/Layout.svelte";
  import { InputAddon, ButtonGroup, Label, Input, Helper, Button } from "flowbite-svelte";
  import axios from "axios";
  import { goto } from "$app/navigation";
  import { URL } from "../../env";

  let checkIdColor;
  let checkIdFlag = false;
  let checkIdText;
  let checkColor;
  let checkText = "";
  let checkPw;
  $: {
    // true
    if (checkIdFlag) {
      checkIdColor = "green";
      checkIdText = "중복확인 완료!";
    } else {
      checkIdColor = "red";
      checkIdText = "중복확인이 필요합니다!";
    }
  }
  $: {
    if (pw || checkPw) {
      if (pw === checkPw) {
        checkColor = "green";
        checkText = "비밀번호가 일치합니다.";
      } else {
        checkColor = "red";
        checkText = "비밀번호가 일치하지 않습니다.";
      }
    }
  }
  let realId;
  let userId;
  const checkId = () => {
    const res = axios.post(`${URL}/api/member/duplicateCheck`,
      {
        id: userId
      })
      .then(response => {
        if (response.data) {
          alert("duplicated id");
          checkIdFlag = false;
        } else {
          alert("avaliable");
          checkIdFlag = true;
          realId = userId;
        }
        console.log(response.data);
      })
      .catch(error => console.log(error));
    console.log(res);
  };

  let pw;
  let name;
  let email;
  let phoneNum;
  let department;
  const join = async () => {
    console.log(pw);
    if (pw === "" && !pw && !name && !email && !phoneNum && !department) {
      alert("입력값이 빠졌습니다.");
    } else if (checkColor === "red") {
      alert("비밀번호를 확인해주세요.");
    } else if (checkIdColor === "red"){
      alert("아이디를 확인해주세요.");
    } else {
      await axios.post(`${URL}/api/member/join`,
        {
          id: realId,
          pw: pw,
          name: name,
          email: email,
          phoneNum: phoneNum,
          department: department
        })
        .then(response => {
          if (response.data.data == "success") {
            alert("join success");
            goto("/login");
          } else
            alert("join failed");
        }).catch(error => console.log(error));
    }
  };

</script>

<Layout>
  <div class="p-8 border w-[60%] m-auto shadow-lg">
    <h1 class="font-bold mb-7">회원가입</h1>

    <div class="mb-6">
      <Label for="success" color="{checkIdColor}" class="block mb-2">아이디</Label>
      <div class="flex items-center space-x-2">
        <Input bind:value={userId} id="success" color="{checkIdColor}" />
        <div class="flex basis-1/4">
          <Button on:click={checkId} color="dark">중복확인</Button>
        </div>
      </div>
      <Helper class="mt-2" color="{checkIdColor}"
      ><span class="font-medium">{checkIdText}</span>
      </Helper
      >
    </div>

    <div class="mb-6">
      <Label for="success" color="{checkColor}" class="block mb-2">비밀번호</Label>
      <Input bind:value={pw} id="success" color="{checkColor}" type="password" class="" />
    </div>
    <div class="mb-6">
      <Label for="success" color="{checkColor}" class="block mb-2">비밀번호 확인</Label>
      <Input bind:value={checkPw} id="success" color="{checkColor}" type="password" class="" />
      <Helper class="mt-2" color="{checkColor}">
        <span class="font-medium">{checkText}</span>
      </Helper>
    </div>

    <!-- 이름 -->
    <div class="mb-6">
      <Label for="website-admin" class="block mb-2">이름</Label>
      <ButtonGroup class="w-full">
        <InputAddon>
          <Svg svgName="이름" />
        </InputAddon>
        <Input bind:value={name} id="website-admin" />
      </ButtonGroup>
    </div>

    <!-- 이메일 -->
    <div class="mb-6">
      <Label for="email" class="block mb-2">이메일</Label>
      <ButtonGroup class="w-full">
        <InputAddon>
          <Svg svgName="이메일" />
        </InputAddon>
        <Input bind:value={email} id="email" type="email" placeholder="abcd@gmail.com" />
      </ButtonGroup>
    </div>

    <!-- 전화번호 -->
    <div class="mb-6">
      <Label for="phoneNumber" class="block mb-2">전화번호</Label>
      <ButtonGroup class="w-full">
        <InputAddon>
          <Svg svgName="전화번호" />
        </InputAddon>
        <Input bind:value={phoneNum} id="phoneNumber" type="tel" placeholder="01012345678" />
      </ButtonGroup>
    </div>

    <!-- 소속 -->
    <div class="mb-10">
      <Label for="department" class="block mb-2">소속</Label>
      <ButtonGroup class="w-full">
        <InputAddon>
          <Svg svgName="소속" />
        </InputAddon>
        <Input bind:value={department} id="department" type="tel" placeholder="금오공과대학교" />
      </ButtonGroup>
    </div>

    <ConfirmBtn content="다음" color="blue" style="w-[100%]" on:click={join} />
  </div>
</Layout>
