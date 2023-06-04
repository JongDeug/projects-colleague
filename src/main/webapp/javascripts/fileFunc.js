
let files;
let userImg;
let img;


//  파일 업로드 함수 (작동x, 멀티파트 폼 데이터로 안 바뀌어짐) 맨밑에 폼 전송 임시로 사용 중
const uploadImg = async () => {
    const formData = new FormData();
    formData.append("uploadFile", files);

    console.log(typeof formData);

    await axios.post(`${URL}/api/file/upload`,
        {
            params: {
                uploadFile: formData,
                type: "member", //  회원 프로필이면 member, 팀 배경화면이면 team
                id: userId  //  회원 프로필이면 유저 아이디, 팀 배경화면은 teamId
            },
            withCredentials: true,
            enctype: "multipart/form-data",
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log(response.data)
        })
        .catch(error => console.log(error));
};


//  서버에서 이미지 가져오는 함수
const downloadImg = async () => {
    await axios.get(`${URL}/api/file/download/test`,
        {
            params: {
                type : "member",    //  회원 프로필이면 member, 팀 배경화면이면 team
                id : "qwe"      //  회원 프로필이면 유저 아이디, 팀 배경화면은 teamId
            },
            withCredentials: true,
            responseType: 'blob'
        })
        .then(response => {
            img = response.data;
            console.log(response.data);
            const imgurl = window.URL.createObjectURL(img);
            userImg = imgurl;
        })
        .catch(error => console.log(error));
};
downloadImg();

//  임시로 폼 형식 전송 사용 중
<Avatar use="My Page" img = {userImg}/>
<form action="{URL}/api/file/upload/test" method="post" enctype="multipart/form-data">
    <input type="file" name="uploadFile">
        <input style="display:none" type="text" name="type" value="member">
            <input style="display:none" type="text" name="id" value={userId}>
                <button>Submit</button>
</form>