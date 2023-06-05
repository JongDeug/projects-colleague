<script>
    import Sidebar from "../../../component/SidebarMyPage.svelte";
    import Svg from "../../../component/Svg.svelte";
    import Avatar from "../../../component/Avatar.svelte";
    import ConfirmBtn from "../../../component/ConfirmBtn.svelte";
    import Breadcrumb from "../../../component/Breadcrumb.svelte";
    import Layout from "../../../component/Layout.svelte";
    import SmallHeader from "../../../component/SmallHeader.svelte";
    import {ButtonGroup, Input, InputAddon, Label} from "flowbite-svelte";
    import {afterUpdate, onMount} from "svelte";
    import axios from "axios";
    import {URL} from "../../env";
    import {browser} from "$app/environment";
    import * as localStorage from "../../localStorage";

    let value;

    let userId = localStorage.getWithExpiry("loginMember");

    let userInfo = [];
    let techStack = [];
    let userTechStack;


    onMount(async () => {
    await axios.get(`${URL}/api/member/profile/update`,
        {withCredentials: true})
        .then(response => {
            userInfo = response.data.data;
            console.log(userInfo);
        })
        .catch(error => console.log(error));

    // await axios.get(`${URL}/api/manager/setStack`, {withCredentials:true})
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(error => console.log(error));

    // 기술스택
    await axios.get(`${URL}/api/manager/tech`, {withCredentials: true})
    .then(response => {
    techStack = response.data;
})
    .catch(error => console.log(error));
});


    afterUpdate(async () => {
    if (userInfo.techStack && techStack) {
    techStack.forEach((tech) => {
    userInfo.techStack.forEach((item) => {
    if (item === tech.techStack) {
    const checkbox = document.getElementById(`${tech.id}`);
    if (checkbox) {
    checkbox.checked = true;
}
}
});
});
}
});


    const updateProfile = async () => {
    // let copy = new Set();
    let copy = [];
    let uploadedImg;
    // await axios.post(`${URL}/api/file/upload`,
    //   {
    //     params: {
    //       uploadFile: files,
    //       // uploadFile: formData,
    //       type: "member",
    //       id: userId
    //     },
    //
    //     headers: {
    //       // 'enctype' : "multipart/form-data",
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   },
    //   {
    //     withCredentials: true,
    //     // enctype: "multipart/form-data",
    //   })
    //   .then(response => {
    //     console.log(response.data)
    //     uploadedImg = response.data;
    //   })
    //   .catch(error => console.log(error));


    techStack.forEach((tech) => {
    const checkbox = document.getElementById(`${tech.id}`);
    if (checkbox.checked) {
    console.log(checkbox.value);
    console.log(tech.id);
    // const item = {
    //   id: tech.id,
    //   techStack: checkbox.value,
    // }
    // copy.add(checkbox.value);
    copy.push(checkbox.value);
}
});
    console.log(copy);



    await axios.post(`${URL}/api/member/profile/update`,
{
    id: userInfo.id,
    name: userInfo.name,
    pw: userInfo.pw,
    email: userInfo.email,
    phoneNum: userInfo.phoneNum,
    department: userInfo.department,
    info: userInfo.info,
    blog: userInfo.blog,
    gitAddress: userInfo.gitAddress,
    techStack: copy,
    profileImg: files[0].name //  이미지 사진 원본 이름
},
{withCredentials: true})
    .then(response => {
    if (response.data.data == "success") {
    alert("update success");
    if (browser) {
    window.location.href = `/myPage/updateProfile`;
}
} else alert(response.data.data);
})
    .catch(error => console.log(error));
};

    let files;
    let Img;

    const uploadImg = async () => {
    let fileForm = document.getElementById('fileForm');
    const formData1 = new FormData(fileForm);



    const formData = new FormData();
    // formData.append("multipartFile", files[0]);


    // formData.append("type", "member");
    // formData.append("id", userId);

    // console.log(files[0]);
    // console.log(formData);


    await axios.post(`${URL}/api/file/upload/2`,
{
    // multipartFile:formData,
    // type:"member",
    // id:userId,
    formData1,
    // params:{
    //   multipartFile:formData1,
    // type:"member",
    // id:userId,
    // }
},
{
    withCredentials: true,
    // enctype: "multipart/form-data",
    // header:{
    //   "Content-Type": "multipart/form-data",
    // },
    processData: false,
    contentType: false,
})
    // await axios(
    //   {
    //     url : `${URL}/api/file/upload/1`,
    //     method : "POST",
    //     data : {
    //       multipartFile:formData,
    //           type:"member",
    //           id:userId,
    //     },
    //     withCredentials: true,
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   }
    // )
    .then(response => {
    console.log(response.data)
})
    .catch(error => console.log(error));

};


    onMount(async () => {
    let downloadedImg
    await axios.get(`${URL}/api/file/download`,
{
    params: {
    type : "member",    //  회원 프로필이면 member, 팀 배경화면이면 team
    id : userId     //  회원 프로필이면 유저 아이디, 팀 배경화면은 teamId
},
    withCredentials: true,
    responseType: 'blob'
})
    .then(response => {
    downloadedImg = response.data;
    // console.log(response.data);
    Img = window.URL.createObjectURL(downloadedImg);
})
    .catch(error => console.log(error));
});

    let submit = false

    const handleSubmit = () => {
    submit = true
}


</script>

<SmallHeader header="My Page"/>

<Layout style="flex justify-center">
    <Sidebar/>

    <div class="ml-5 block w-[70%]">
        <Breadcrumb prevContent="설정" nextContent="회원정보 수정"/>

        <!-- 사용자 -->
        <div class="mt-3 p-10 rounded-lg shadow-md border">
            <h1 class="font-bold mb-7">사용자</h1>
            <!-- 이름 -->
            <div class="mb-6 ">
                <Label for="website-admin" class="block mb-2">이름</Label>
                <ButtonGroup class="w-full">
                    <InputAddon>
                        <Svg svgName="이름"/>
                    </InputAddon>
                    <Input bind:value={userInfo.name} id="website-admin"/>
                </ButtonGroup>
            </div>

            <!-- 이메일 -->
            <div class="mb-6 ">
                <Label for="email" class="block mb-2">이메일</Label>
                <ButtonGroup class="w-full">
                    <InputAddon>
                        <Svg svgName="이메일"/>
                    </InputAddon>
                    <Input bind:value={userInfo.email} id="email" type="email"/>
                </ButtonGroup>
            </div>

            <!-- 전화번호 -->
            <div class="mb-6 ">
                <Label for="phoneNumber" class="block mb-2">전화번호</Label>
                <ButtonGroup class="w-full">
                    <InputAddon>
                        <Svg svgName="전화번호"/>
                    </InputAddon>
                    <Input bind:value={userInfo.phoneNum} id="phoneNumber" type="tel"/>
                </ButtonGroup>
            </div>

            <!-- 소속 -->
            <div class="mb-6 ">
                <Label for="department" class="block mb-2">소속</Label>
                <ButtonGroup class="w-full">
                    <InputAddon>
                        <Svg svgName="소속"/>
                    </InputAddon>
                    <Input bind:value={userInfo.department} id="department" type="tel"/>
                </ButtonGroup>
            </div>

            <div class="">
                <Label class="mb-3">프로필 사진</Label>
                <div class="flex items-center">
                    <Avatar use="My Page" img={Img}/>
                    <!--          <Fileupload bind:value={files} />-->
                    <form action="{URL}/api/file/upload/test" method="post" id="fileForm" encType="multipart/form-data"
                          target="blankifr">
                        <input bind:files type="file" name="multipartFile">
                            <input style="display:none" type="text" name="type" value="member">
                                <input style="display:none" type="text" name="id" value={userId}>
                                    <button type="submit">사진 저장</button>
                                    <iframe name='blankifr' style='display:none;'></iframe>
                    </form>
                    <!--          <input bind:files type="file" id="files" name="files"/>-->
                </div>
            </div>
            <!--      <ConfirmBtn on:click={uploadImg} content="axios로 업로드 근데 안됨" color="blue" style="w-[100%] py-4 shadow-md" />-->
            <!--      <img src="{Img}">-->

        </div>

        <!-- 개인 포트폴리오 -->
        <div class="mt-3 p-10 rounded-lg shadow-md border mb-3">
            <h1 class="font-bold mb-7">개인 포트폴리오</h1>
            <!-- 간단한 자기소개 -->
            <div class="mb-6 ">
                <Label for="default-input" class="block mb-2">간단한 자기소개</Label>
                <Input bind:value={userInfo.info} id="default-input"/>
            </div>

            <!-- 웹사이트 -->
            <div class="mb-6 ">
                <Label for="default-input" class="block mb-2">웹사이트</Label>
                <Input bind:value={userInfo.blog} id="default-input"/>
            </div>

            <!-- 깃허브 주소 -->
            <div class="mb-6 ">
                <Label for="default-input" class="block mb-2">깃허브 주소</Label>
                <Input bind:value={userInfo.gitAddress} id="default-input"/>
            </div>

            <!-- 기술스택 -->
            <div class="mb-6">
                <Label for="default-input" class="block mb-2">기술스택</Label>
                <div class="grid grid-cols-4 gap-2">
                    {#each techStack as tech, i}
                    <label class="text-sm font-medium block text-gray-900 dark:text-gray-300 flex items-center">
                        <input
                            type="checkbox" id={tech.id} value={tech.techStack}
                            class="w-4 h-4 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 mr-2 dark:bg-gray-700 dark:border-gray-600 rounded text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600">
                            {tech.techStack}
                    </label>
                    {/each}
                        </div>
                        </div>
                        </div>


                        <ConfirmBtn on:click={updateProfile} content="회원정보 수정 확인" color="blue"
                     style="w-[100%] py-4 shadow-md"/>

                <!--    <button type="submit" form="fileForm">사진 저장</button>-->
            </div>
</Layout>
