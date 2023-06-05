let files;  //  업로드 한 사진 정보
//  유저 정보 업데이트할때 files 사용
//  profileImg: files[0].name 이렇게 (원본 사진의 파일 이름)
let img;    //   서버에서 가져온 사진 정보

    //  이미지 서버에서 가져오기
    onMount(async () => {

        let downloadedImg
    await axios.get(`${URL}/api/file/download`,
        {
            params: {
                type: "member",    //  회원 프로필이면 member, 팀 배경화면이면 team
                id: userId     //  회원 프로필이면 유저 아이디, 팀 배경화면은 teamId
            },
            withCredentials: true,
            responseType: 'blob'
        })
        .then(response => {
            downloadedImg = response.data;
            // console.log(response.data);
            img = window.URL.createObjectURL(downloadedImg);
        })
        .catch(error => console.log(error));
});

    // 유저 프로필 업데이트 (조금 수정)
const updateProfile = async () => {
    // document.getElementById('fileForm').submit();
    // let copy = new Set();
    let copy = [];
    let fileName = null;
    if (files != null)
        fileName = files[0].name;

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
            profileImg: fileName //  이미지 사진 원본 이름
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



    //  사진 업로드
                    <form action="{URL}/api/file/upload/test" method="post" id="fileForm" encType="multipart/form-data"
                          target="blankifr">
                        <input bind:files type="file" name="multipartFile">
                            <input style="display:none" type="text" name="type" value="member">
                                <input style="display:none" type="text" name="id" value={userId}>
                                    <button type="submit">사진 저장</button>
                                    <iframe name='blankifr' style='display:none;'></iframe>
                    </form>