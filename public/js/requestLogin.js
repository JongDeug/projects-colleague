function requestLogin() {
    return axios({
        url: '/member/login', // http:localhost:3500/member/login
        method: 'post',
        data: {
            username: "환환",
            password: "1234"
        }
    });
}

let accessToken;

const loginBtn = document.querySelector('#btn');
loginBtn.addEventListener('click', () => {
    requestLogin().then((res) => {
        console.log(res.data);
        console.log(res.data.accessToken);
        console.log(res.data.redirect);
        // res.data 값들 저장
        accessToken = res.data.accessToken;
        return res.data.redirect;
    }).then((res)=> {
        window.location = `${res}`;
    }).catch((err) => {
        if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.header);
        }
    });
})


//         headers: {
//             Authorization: `Bearer ${token}`
//         }
