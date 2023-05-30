let receivedvMsg = [];
let sentMsg = [];
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

const sendMessage = async (teamId) => {
    await axios.post(`${URL}/api/message/create`,
        {
            teamId: teamId,
        }, { withCredentials: true })
        .then(response => {
            if (response.data.data == "success") {
                alert("create success");
                if (browser) {
                    window.location.href = `/myTeam/detail/${pathArray}/minutes`;
                }
            }
        })
        .catch(error => console.log(error));
};