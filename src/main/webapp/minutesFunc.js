let members = []; //  유저 객체 리스트 형식으로




let minutesList = []    //  이거는 리스트 형식의 회의록 클래스 ( 클래스 필드는 서버 도메인 참조 )
let minutes = []    //  회의록 클래스 한개

// 팀 ID 매개변수로 해당 팀에서 작성한 모든 회의록 리스트로 불러오기
// teamId에 팀 아이디(long) 넣으면됨
onMount(async (teamId) => {
    await axios.get(`${URL}/api/minutes/list`,
        {
        params: {
            teamId: teamId
        },
        withCredentials: true
    })
        .then(response => {
            minutesList = response.data.data;
            console.log(minutesList);
        })
        .catch(error => console.log(error));
});


// 회의록 아이디로 회의록 내용(디테일) 가져옴
// minutesId는 회의록 id
onMount(async (minutesId) => {
    await axios.get(`${URL}/api/minutes/detail`,
        {
            params: {
                minutesId: minutesId
            },
            withCredentials: true
        })
        .then(response => {
            minutes = response.data.data;
            console.log(minutes);
        })
        .catch(error => console.log(error));
});




//  회의록 생성
const createMinutes = async (teamId) => {
    await axios.post(`${URL}/api/minutes/create`,
        {
            meetingName: "여기에 회의록 이름 입력",
            location: "여기에 회의 장소 입력",
            agenda: "여기에 회의 의제 입력",
            content: "여기에 회의 내용 입력",
            improvements: "여기에 지적사항 및 조치내용 입력",
            writerDepartment: "여기에 작성자 소속 입력",
            writerName: "여기에 작성자 이름 입력",
        }, { withCredentials: true })
        .then(response => {
            if (response.data.data == "success") {
                alert("update success");
                if (browser) {
                    window.location.href = `/myTeam/detail/${data.teamId}/settings`;
                }
            }
        })
        .catch(error => console.log(error));
};




//  회의록 업데이트    (회의록 id 필요) (팀 id랑 createtime은 필요 x)
const updateMinutes = async (minutesId) => {
    await axios.post(`${URL}/api/minutes/update`,
        {
            id: minutesId,
            meetingName: "여기에 수정할 회의록 이름 입력",
            location: "여기에 수정할 회의 장소 입력",
            agenda: "여기에 수정할 회의 의제 입력",
            content: "여기에 수정할 회의 내용 입력",
            improvements: "여기에 수정할 지적사항 및 조치내용 입력",
            writerDepartment: "여기에 수정할 작성자 소속 입력",
            writerName: "여기에 수정할 작성자 이름 입력",
        }, { withCredentials: true })
        .then(response => {
            if (response.data.data == "success") {
                alert("update success");
                if (browser) {
                    window.location.href = `/myTeam/detail/${data.teamId}/settings`;
                }
            }
        })
        .catch(error => console.log(error));
};




//  회의록 삭제하기
//  post형식이고 회의록 id는 파라미터로 전달
const deleteMinutes = async (minutesId) => {
    await axios.post(`${URL}/api/minutes/delete`,
        {
            params:{
                minutesId : minutesId
            }
        }, { withCredentials: true })
        .then(response => {
            if (response.data.data == "success") {
                alert("update success");
                if (browser) {
                    window.location.href = `/myTeam/detail/${data.teamId}/settings`;
                }
            }
        })
        .catch(error => console.log(error));
};