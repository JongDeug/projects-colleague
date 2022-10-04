function requestCheckPwd(token, password) {
    return axios({
        url: '/member/changeInfo',
        method: 'put',
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            password: password
        }
    });
}

const btn = document.querySelector('#btn');

btn.addEventListener('click', () => {
    const token = sessionStorage.getItem('accessToken');
    const password = document.querySelector('#password').value;

    requestCheckPwd(token, password).then((res) => {
        return res.data.responseData.redirect;
    }).then((res)=>{
        window.location = `${res}`;
    }).catch((err) => {
        if (err) {
            console.log(err);
        }
    });
})