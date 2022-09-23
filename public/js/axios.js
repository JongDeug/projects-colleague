axios({
    url: '/auth', // http:localhost:3500/auth
    method: 'post',
    data: {
        username : "123",
        password : "1234"
    }
}).then((response) => {
    console.log(response.data);
}).catch((error) => {
    if(error.response){
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    }
})