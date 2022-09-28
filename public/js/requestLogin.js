function requestLogin() {
    return axios({
        url: '/member/login', // http:localhost:3500/member/login
        method: 'post',
        data: {
            userId: "김종수",
            password: "1234"
        }
    });
}

const loginBtn = document.querySelector('#btn');
loginBtn.addEventListener('click', () => {
    // res.data 값들 저장 -> session에 저장하든지 알아서 
    requestLogin().then((res) => {
        const accessToken = res.data.responseData.accessToken;
        sessionStorage.setItem('accessToken', accessToken);
        console.log(res.data.responseData.redirect);
        console.log(res.data.responseData.accessToken);
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
});