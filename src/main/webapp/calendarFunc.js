let eventList = []    //  일정 리스트
let event = []    //  일정 클래스 한개

// 팀 ID로 일정 리스트 가져오기
onMount(async (teamId) => {
    await axios.get(`${URL}/api/calendar/list`,
        {
            params: {
                teamId: teamId
            },
            withCredentials: true
        })
        .then(response => {
            eventList = response.data.data;
            console.log(minutesList);
        })
        .catch(error => console.log(error));
});


//  일정 생성 (서버 DB에 저장)
const createEvent = async (teamId) => {
    await axios.post(`${URL}/api/calendar/create`,
        {
            params:{
                teamId : teamId
            },
            title:"이벤트 제목",
            start:"시작일",
            end:"종료일"
        }, { withCredentials: true })
        .then(response => {
            if (response.data.data == "success") {
                alert("create success");
                if (browser) {
                    window.location.href = `/myTeam/detail/${data.teamId}/settings`;
                }
            }
        })
        .catch(error => console.log(error));
};

//  일정 삭제
const deleteEvent = async (eventId) => {
    await axios.post(`${URL}/api/calendar/delete`,
        {
            params:{
                calendarId : eventId
            }
        }, { withCredentials: true })
        .then(response => {
            if (response.data.data == "success") {
                alert("delete success");
                if (browser) {
                    window.location.href = `/myTeam/detail/${data.teamId}/settings`;
                }
            }
        })
        .catch(error => console.log(error));
};