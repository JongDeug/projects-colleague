
function login() {
    return axios({
        url: '/member/login', // http:localhost:3500/member/login
        method: 'post',
        data: {
            username: "b",
            password: "1234"
        }
    });

// .then((response) => {
//         console.log(response.data);
//         // console.log("response " + response.data);
//     }).catch((error) => {
//         if (error.response) {
//             console.log(error.response.data);
//             console.log(error.response.status);
//             console.log(error.response.headers);
//         }
//     }
//     )
}


// function redirect(token) {
//     axios({
//         url: '/member/login/complete',
//         method: 'get',
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     });
// }


login().then((response) => {
    console.log(response.data.redirect);
    window.location = `${response.data.redirect}`;
});
//     redirect(response.data.accessToken);
// })
