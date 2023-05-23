//  회원 id 세션스토리지
import axios from "axios";
import {redirect} from "@sveltejs/kit";

let userId = sessionStorage.getItem("loginMember");

//	회원 id로 이름 받아오기
function getUser(memberId){
    let member = [];

    const res = axios.get('/api/member/search',
        {
            params:{
                memberId : memberId
            }
        })
        .then(response => {
            member = response.data.data;
        })
        .catch(error => console.log(error))
    console.log(res);
    return member;
}

// 회원 이름으로 유저들 리스트 받아오기 (이름 같은 회원 전부)
function searchUsers(userName){
    let members = [];

    const res = axios.get('/api/member/name',
        {
            params:{
                userName : userName
            }
        })
        .then(response => {
            members = response.data.data;
        })
        .catch(error => console.log(error))
    console.log(res);
    return members;
}

//	게시글 작성
function createPost(){
    const res = axios.post('/api/post/create',
        {
            title : title,
            userId : userId,
            content : content.text,
        })
        .then(response => {
            if (response.data.data == "success")
                alert("create success");
        })
        .catch(error => console.log(error))
    console.log(res);
}

// 게시글 상세정보 게시글 id 파라미터로 줘서 Post 엔티티로 받아오기
function getPost(postId){
    const res = axios.get('/api/post/detail',
        {
            params:{
                postId : postId
            }
        })
        .then(response => {
            post = response.data.data;
            title = post.title;
            content = post.content;
            createTime = post.createTime;
            hit = post.hit;
            writer = getUser(post.userId).name;
        })
        .catch(error => console.log(error))
    console.log(res);
}

// 이름 이메일 폰번호로 아이디 찾기
function findId(){
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phoneNum = document.getElementById("phoneNumber").value;

    const res = axios.post('/api/member/find/id',
        {
            name : name,
            email : email,
            phoneNum : phoneNum,
        })
        .then(response => {
            if (response.data.data == "user not exist")
                alert("member not exist")
            else
                alert(response.data.data)
        })
        .catch(error => console.log(error))
    console.log(res);
}

// 아이디 이메일로 비밀번호 가져옴
function findPw(){
    let userId = document.getElementById("userId").value;
    let email = document.getElementById("email").value;

    const res = axios.post('/api/member/find/pw',
        {
            id : userId,
            email : email,
        })
        .then(response => {
            if (response.data.data == "user not exist")
                alert("member not exist")
            else
                alert(response.data.data)
        })
        .catch(error => console.log(error))
    console.log(res);
}

//  로그인 메서드
function login(){
    let userId = document.getElementById("userId").value;
    let userPw = document.getElementById("userPw").value;


    const res = axios.post('/api/login',
        {
            loginId : userId,
            loginPw : userPw
        })
        .then(response => {
            if (response.data.data == "success")
            {
                alert("login success");
                redirect(300, response.data.redirect);
            }
            else {
                alert("login failure")
                redirect(301, response.data.redirect);
            }
        })
        .catch(error => console.log(error))
    console.log(res);
}

// 비밀번호 변경
function updatePw(){
    let curPw = document.getElementById("curPw").value;
    let newPw = document.getElementById("newPw").value;
    let newPwCheck = document.getElementById("newPwCheck").value;
    const res = axios.post('/api/member/profile/changePwd',
        {
            memberId : userId,
            curPw : curPw,
            newPw : newPw,
            newPwCheck : newPwCheck,

        })
        .then(response => {
            if (response.data == userId)
                alert("update success")
        })
        .catch(error => console.log(error))
    console.log(res);
}

// 로그인 상태에서 내가 작성한 게시글 목록 가져오기
function setPosts(){

    const res = axios.get('/api/post/myPost',
        {
        })
        .then(response => {
            posts = response.data.data;
        })
        .catch(error => console.log(error))
    console.log(res);
}

// 로그인 상태에서 내가 속한 팀 리스트 가져오기 ( 내가 리더인 팀, 내가 멤버인 팀 전부다 )
function getMyTeams(){

    const res = axios.get('/api/team/myTeam/list',
        {

        })
        .then(response => {
            teamList = response.data.data;
            console.log(teamList);
        })
        .catch(error => console.log(error))
    console.log(res);
}

//	로그인 상관없이 팀 id로 팀 엔티티 가져오기
function getDetail(teamId){
    let team = [];
    const res = axios.get('/api/team/detail',
        {
            params:{
                id : teamId
            }
        })
        .then(response => {
            team = response.data.data;
        })
        .catch(error => console.log(error))
    console.log(res);
    return team;
}

// 세션 id로 프로필 정보 가져오기
function setProfile(){

    const res = axios.get('/api/member/profile/update',
        {
        })
        .then(response => {
            userId = response.data.data.id;
            userName = response.data.data.name;
            userEmail = response.data.data.email;
            userPhoneNum = response.data.data.phoneNum;
            userDepartment = response.data.data.department;
            userInfo = response.data.data.info;
            userBlog = response.data.data.blog;
            userGit = response.data.data.gitAddress;
            techStack = response.data.data.techStack;
        })
        .catch(error => console.log(error))
    console.log(res);
}

// db에 저장되어있는 모든 기술스택 가져오기
// 가져온것들 표나 버튼으로 쭉 나열하고 거기서 클릭해서 선택하는식으로?
function getTechStackList(){
    const res = axios.get('/api/manager/tech')
        .then(response => {
            techStack = response.data;
        })
        .catch(error => console.log(error))
    console.log(res);
}

// 사용자 프로필 업데이트하기
function updateProfile(){
    userName = document.getElementById("name").value;
    userEmail = document.getElementById("email").value;
    userPhoneNum = document.getElementById("phoneNumber").value;
    userDepartment = document.getElementById("department").value;
    userInfo = document.getElementById("info").value;
    userBlog = document.getElementById("blog").value;
    userGit = document.getElementById("git").value;
    const res = axios.post('/api/member/profile/update',
        {
            id : userId,
            name : userName,
            email : userEmail,
            phoneNum : userPhoneNum,
            department : userDepartment,
            info : userInfo,
            blog : userBlog,
            gitAddress : userGit,
            profileImg:"aa"

        })
        .then(response => {
            if (response.data.data == "success")
                alert("update success")
            else alert("update failure")
        })
        .catch(error => console.log(error))
    console.log(res);
}

// 팀 만들기
function createTeam(){
    let teamName = document.getElementById("teamName").value;
    let teamInfo = document.getElementById("teamInfo").value;
    let teamPw = document.getElementById("teamPw").value;
    const res = axios.post('/api/team/create',
        {
            teamName : teamName,
            teamInfo : teamInfo,
            teamPw : teamPw,
            memberIds : teamMembers,
        })
        .then(response => {
            if (response.data.data == "success")
                alert("create success")
        })
        .catch(error => console.log(error))
    console.log(res);
}

//	팀 정보 업데이트
function updateTeam(teamId){
    const res = axios.post('/api/team/myTeam/update',
        {
            teamId : teamId,
            teamName : teamName,
            teamInfo : teamInfo,
            teamPw : teamPw,
            memberIds : teamMembers,
        })
        .then(response => {
            if (response.data.data == "success")
                alert("create success")
        })
        .catch(error => console.log(error))
    console.log(res);
}

//	회원가입 메소드
function join(){
    let userId = realId;
    let pw = document.getElementById("pw").value;
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phoneNum = document.getElementById("phoneNumber").value;
    let department = document.getElementById("department").value;

    // if (userId.empty() || pw.empty() || name.empty() || email.empty() || phoneNum.empty() || department.empty())
    // {
    // 	alert("join failed");
    // 	return;
    // }

    const res = axios.post('/api/member/join',
        {
            id : userId,
            pw : pw,
            name : name,
            email : email,
            phoneNum : phoneNum,
            department : department
        })
        .then(response => {
            if (response.data.data == "success")
                alert("join success")
            else
                alert("join failed")
        })
        .catch(error => console.log(error))
    console.log(res);
}

//	회원가입 할 때 중복아이디 체크용
function checkId() {
    let userId = document.getElementById("userId").value;
    const res = axios.post('/api/member/duplicateCheck',
        {
            id : userId
        })
        .then(response => {
            if (response.data)
                alert("duplicated id")
            else
            {
                alert("avaliable")
                realId = userId;
            }
            console.log(response.data)
        })
        .catch(error => console.log(error))
    console.log(res);
}

//	message domain 참조

// 내가 보낸 메시지 목록
function getSentMessages(){
    let sentMessages = [];	//	message list 형식

    const res = axios.get('/api/message/list/sent',
        {
        })
        .then(response => {
            sentMessages = response.data.data;
        })
        .catch(error => console.log(error))
    console.log(res);

    return sentMessages;
}
// 내가 받은 메시지 목록
function getReceivedMessages(){
    let receivedMessages = [];	//	message list 형식

    const res = axios.get('/api/message/list/received',
        {
        })
        .then(response => {
            receivedMessages = response.data.data;
        })
        .catch(error => console.log(error))
    console.log(res);

    return receivedMessages;
}

// 쪽지 id로 상세 조회
function getMessageDetail(messageId){
    let message = [];	//	message domain 참조

    const res = axios.get('/api/message/detail',
        {
            params:{
                messageId : messageId
            }
        })
        .then(response => {
            message = response.data.data;
        })
        .catch(error => console.log(error))
    console.log(res);

    return message;
}

//	쪽지 작성
function createMessage(){
    const res = axios.post('/api/message/create',
        {
            sender : teamName,
            receiver : teamInfo,
            title : teamPw,
            content : teamMembers,
        })
        .then(response => {
            if (response.data.data == "success")
                alert("create success");
        })
        .catch(error => console.log(error))
    console.log(res);
}
//	쪽지 삭제
function deleteMessage(messageId){
    const res = axios.post('/api/message/delete',
        {
            messageId : messageId
        })
        .then(response => {
            if (response.data.data == "success")
                alert("delete success");
        })
        .catch(error => console.log(error))
    console.log(res);
}