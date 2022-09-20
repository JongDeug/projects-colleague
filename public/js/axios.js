axios({
    url: '/auth',
    method: 'post',
    data: {
        username : "kim",
        password : "1234"
    }
}).then((response) => {
    console.log(response.data);
});