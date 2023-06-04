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



    //  사진 업로드
                    <form action="{URL}/api/file/upload/test" method="post" id="fileForm" encType="multipart/form-data"
                          target="blankifr">
                        <input bind:files type="file" name="multipartFile">
                            <input style="display:none" type="text" name="type" value="member">
                                <input style="display:none" type="text" name="id" value={userId}>
                                    <button type="submit">사진 저장</button>
                                    <iframe name='blankifr' style='display:none;'></iframe>
                    </form>