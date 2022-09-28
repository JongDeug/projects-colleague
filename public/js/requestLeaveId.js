
function requestLeaveId() {
    const token = sessionStorage.getItem('accessToken');
    console.log(token);
    return axios({
        url: '/member/leaveId', // url로 직접이동하는게 아님
        method: 'delete',
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            password: "1234",
        }
    });
}

const leaveIdBtn = document.querySelector('#btn');
leaveIdBtn.addEventListener('click', () => {
    requestLeaveId().then((res) => {
        console.log(res.data.responseData.redirect);
        console.log(res.data.responseData.message);
        return res.data.responseData.redirect;
    }).then((res) => {
        window.location = `${res}`;
    }).catch((err) => {
        if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.header);
        }
    });
})