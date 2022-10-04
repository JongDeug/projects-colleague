function getInfo(token) {
    return axios({
        url: '/api/getInfo',
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
}

async function arrangeData() {
    const token = sessionStorage.getItem('accessToken');
    let input_userId = document.querySelector('#userId');
    let input_dateOfBirth = document.querySelector('#dateOfBirth');
    let input_email = document.querySelector('#email');
    let input_interestKeywords = document.querySelector('#interestKeywords');

    await getInfo(token).then((res) => {
        console.log(res.data.responseData.userId);
        console.log(res.data.responseData.dateOfBirth);
        console.log(res.data.responseData.email);
        console.log(res.data.responseData.interestKeywords);

        input_userId.value = res.data.responseData.userId;
        input_dateOfBirth.value = res.data.responseData.dateOfBirth;
        input_email.value = res.data.responseData.email;
        input_interestKeywords.value = res.data.responseData.interestKeywords;
    }).catch((err) => {
        if (err) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.header);
        }
    });
}

function requestChangeInfo(token, dateOfBirth, email, interestKeywords) {
    return axios({
        url: '/member/changeInfo',
        method: 'put',
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            dateOfBirth: dateOfBirth,
            email: email,
            interestKeywords: interestKeywords
        }
    });
}

arrangeData();

const btn = document.querySelector('#btn');

btn.addEventListener('click', () => {
    const token = sessionStorage.getItem('accessToken');
    const dateOfBirth = document.querySelector('#dateOfBirth').value;
    const email = document.querySelector('#email').value;
    const interestKeywords = document.querySelector('#interestKeywords').value;

    requestChangeInfo(token, dateOfBirth, email, interestKeywords).then((res) => {

        return res.data.responseData.redirect;
    }).then((res) => {
        window.location = `${res}`;
    }).catch((err) => {
        if (err) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.header);
        }
    })
});

