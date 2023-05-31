let receivedvMsg = [];
let sentMsg = [];

let userId = localStorage.getWithExpiry("loginMember");
onMount(async () => {
    await axios.get(`${URL}/api/message/list/received`,
        {
        })
        .then(response => {
            receivedvMsg = response.data.data;
        })
        .catch(error => console.log(error));
});

onMount(async () => {
    await axios.get(`${URL}/api/message/list/sent`,
        {
        })
        .then(response => {
            sentMsg = response.data.data;
        })
        .catch(error => console.log(error));
});

const sendMessage = async (title, content, receiver) => {
    await axios.post(`${URL}/api/message/create`,
        {
            sender : userId,
            receiver : receiver,
            title : title,
            content : content,
        }, { withCredentials: true })
        .then(response => {
            if (response.data.data == "success") {
                alert("create success");
                if (browser) {
                    window.location.href = `/postMsg`;
                }
            }
        })
        .catch(error => console.log(error));
};

const deleteMessage = async (messageId) => {
    await axios.post(`${URL}/api/message/delete`,
        {
            params:{
                messageId : messageId
            }
        }, { withCredentials: true })
        .then(response => {
            if (response.data.data == "success") {
                alert("delete success");
                if (browser) {
                    window.location.href = `/postMsg`;
                }
            }
        })
        .catch(error => console.log(error));
};

const getDetail = async (messageId) => {
    let message = [];
    await axios.get(`${URL}/api/message/detail`,
        {
            params:{
                messageId : messageId
            }
        }, { withCredentials: true })
        .then(response => {
            if (response.data.data == "success") {
                message = response.data.data;
            }
        })
        .catch(error => console.log(error));
};