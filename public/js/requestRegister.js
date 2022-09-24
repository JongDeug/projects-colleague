function requestRegister() {
    return axios({
        url: '/member/register',
        method: 'post',
        data: {
            username: "종종환dfsdhks",
            password: "1234",
            dateOfBirth: "2019-12-03",
            email: "dfsdf",
            pet: "dog",
            interestKeywords: "sdfsdf"
        }
    });
}

const registerBtn = document.querySelector('#btn');
registerBtn.addEventListener('click', () => {
    requestRegister().then((res) => {
        console.log(res.data);
        console.log(res.data.redirect);
        return res.data.redirect;
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