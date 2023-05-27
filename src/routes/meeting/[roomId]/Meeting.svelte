<script>
  import { onMount } from "svelte";
  import { io } from "socket.io-client";

  export let roomId;

  onMount(() => {
    let _roomId;
    $: _roomId = roomId;
    let _email = "test";

    initCall(_roomId, _email);

    const shareScreen = document.getElementById("shareScreen");
    const muteBtn = document.getElementById("mute");
    const cameraBtn = document.getElementById("camera");
    const shareScreenBtn = document.getElementById("screen");
    const camerasSelect = document.getElementById("cameras");
    const syncBtn = document.getElementById("sync");
    const sendBtn = document.getElementById("sendBtn");
    const textInput = document.getElementById("textInput");
    const textArea = document.querySelector("textarea");

    let myStream;
    let streams = [];
    let muted = false;
    let cameraOff = false;
    let myPeerConnection;
    let peerConnections;

    const URL = "http://localhost:3000/";
    // const URL = "https://c5f9-222-103-180-169.ngrok-free.app/";
    const socket = io(URL, {
      withCredentials: true
    });

    // MyCamera === === === === === === === === === === === === === === === === === === === === === ==
    async function getCameras() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(device => device.kind === "videoinput");
        const currentCamera = myStream.getVideoTracks()[0];
        cameras.forEach(camera => {
          const option = document.createElement("option");
          option.value = camera.deviceId;
          option.innerText = camera.label;
          if (currentCamera.label == camera.label) {
            option.selected = true;
          }
          camerasSelect.appendChild(option);
        });

        const option = document.createElement("option");
        option.value = "hi";
        option.innerText = "hi";
        camerasSelect.appendChild(option);

      } catch (e) {
        console.log(e);
      }
    };

    async function getMedia(deviceId, sort) {
      const myFace = document.getElementById("myFace");


      const initialConstrains = {
        audio: true,
        video: { facingMode: "user" }
      };
      const cameraConstrains = {
        audio: true,
        video: { deviceId: { exact: deviceId } }
      };
      try {
        if (sort === "display") {
          // navigator.mediaDevices.getUserMedia({
          //   audio: true
          // }).then(async (audioStream) => {
          //   myStream = await navigator.mediaDevices.getDisplayMedia({
          //     audio: true,
          //     video: true
          //   });
          //   myStream.addTrack(audioStream.getAudioTracks()[0]);
          // });

          myStream = await navigator.mediaDevices.getDisplayMedia({
            audio: false,
            video: true
          });
          myFace.srcObject = myStream;
        } else if (sort === "user" || sort === undefined || sort === null) {
          myStream = await navigator.mediaDevices.getUserMedia(
            deviceId ? cameraConstrains : initialConstrains
          );
          myFace.srcObject = myStream;
          if (!deviceId) {
            await getCameras();
          }

          myFace.addEventListener("click", () => {
            shareScreen.srcObject = myStream;
          });
        }
      } catch (e) {
        console.log(e);
      }
    }


    // Connection ================================================================
    async function initCall(roomId, email) {
      // welcome.hidden = true;
      await getMedia();
      socket.emit("join_room", { room: roomId, email: email });
      makeConnection(socket.id, email, socket, myStream);
    }

    function makeConnection(socketId, email, socket, myStream) {
      myPeerConnection = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:stun1.l.google.com:19302",
              "stun:stun2.l.google.com:19302",
              "stun:stun3.l.google.com:19302",
              "stun:stun4.l.google.com:19302"
            ]
          }
        ]
      });

      peerConnections = { ...peerConnections, [socketId]: myPeerConnection };

      myPeerConnection.addEventListener("icecandidate", (data) => {
        console.log("sent the candidate");
        socket.emit("ice", {
          ice: data.candidate,
          iceSendId: socket.id,
          iceReceiveId: socketId
        });
      });

      myPeerConnection.addEventListener("addstream", (data) => {
        console.log("got an event from my peer");
        streams[socketId] = data.stream;
        renderStream(socketId);
      });

      // ontrack
      myStream.getTracks().forEach(track => myPeerConnection.addTrack(track, myStream));
    }

    function renderStream(socketId) {
      const videoContainer = document.getElementById("videoContainer");
      videoContainer.innerHTML += `<video id="${socketId}" class="w-full h-full object-fill" autoplay playsinline width="200"></video>`;

      for (const key in peerConnections) {
        const peerFace = document.getElementById(`${key}`);
        if (peerFace) {
          peerFace.srcObject = streams[key];

          peerFace.addEventListener("click", () => {
            if (streams[socketId]) shareScreen.srcObject = streams[socketId];
          });
        }
      }

      const myFace = document.getElementById("myFace");
      myFace.srcObject = myStream;
      myFace.addEventListener("click", () => {
        if (myStream) shareScreen.srcObject = myStream;
      });
    }

    // HTML control ==============================================================
    function handleMuteClick() {
      myStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });

      if (!muted) {
        muteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
   <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z" />
 </svg
 `;
        muted = true;
      } else {
        muteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
   <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
 </svg>
 `;
        muted = false;
      }
    }

    function handleCameraClick() {
      myStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      if (cameraOff) {
        cameraBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
   <path stroke-linecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
 </svg>
 `;
        cameraOff = false;
      } else {
        cameraBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
   <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 01-2.25-2.25V9m12.841 9.091L16.5 19.5m-1.409-1.409c.407-.407.659-.97.659-1.591v-9a2.25 2.25 0 00-2.25-2.25h-9c-.621 0-1.184.252-1.591.659m12.182 12.182L2.909 5.909M1.5 4.5l1.409 1.409" />
 </svg>
 `;
        cameraOff = true;
      }
    }

    async function handleCameraChange() {
      await getMedia(camerasSelect.value);
      const videoTrack = myStream.getVideoTracks()[0];
      // test
      for (const key in peerConnections) {
        const videoSender = peerConnections[key].getSenders().find((sender) => sender.track.kind === "video");
        await videoSender.replaceTrack(videoTrack);
      }
    }

    async function handleShareScreenClick() {
      await getMedia(undefined, "display");
      const shareScreenTrack = myStream.getVideoTracks()[0];
      console.log(shareScreenTrack);
      for (const key in peerConnections) {
        const videoSender = peerConnections[key].getSenders().find((sender) => sender.track.kind === "video");
        await videoSender.replaceTrack(shareScreenTrack);
      }
      shareScreen.srcObject = myStream;
    }

    async function handleSyncClick() {
      await getMedia(camerasSelect.value);
      const videoTrack = myStream.getVideoTracks()[0];
      // test
      for (const key in peerConnections) {
        const videoSender = peerConnections[key].getSenders().find((sender) => sender.track.kind === "video");
        await videoSender.replaceTrack(videoTrack);
      }
    }

    syncBtn.addEventListener("click", handleSyncClick);
    muteBtn.addEventListener("click", handleMuteClick);
    cameraBtn.addEventListener("click", handleCameraClick);
    shareScreenBtn.addEventListener("click", handleShareScreenClick);
    camerasSelect.addEventListener("input", handleCameraChange);


    // Chat ====================================================================
    let textInputValue;
    textInput.addEventListener("input", (e) => {
      textInputValue = textInput.value;
    });

    textInput.addEventListener("keypress", (event) => {
      // If the user presses the "Enter" key on the keyboard
      if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        sendBtn.click();
      }
    });

    sendBtn.addEventListener("click", () => {
      if (textInputValue) {
        socket.emit("chat", textInputValue);
        textInput.value = "";
      }
    });

    socket.on("getChat", (receive) => {
      textArea.value += `${receive.sendUser.id} : ${receive.content}\r\n`;
      textArea.scrollTop = textArea.scrollHeight;
    });

    // WebRTC Interaction ========================================================

    socket.on("already", () => {
      window.alert("already exist");
    })

    socket.on("room_full", () => {
      window.alert("full room");
    });

    socket.on("user_exit", (data) => {
      peerConnections[data.id].close();
      delete peerConnections[data.id];
      const peerFace = document.getElementById(`${data.id}`);
      peerFace.remove();
      delete streams[data.id];
    });

    // First Come
    socket.on("all_users", async (allUsers) => {
      let length = allUsers.length;
      for (let i = 0; i < length; i++) {
        makeConnection(allUsers[i].id, allUsers[i].email, socket, myStream);
        let peerConnection = peerConnections[allUsers[i].id];
        if (peerConnection) {
          const offer = await peerConnection.createOffer();
          await peerConnection.setLocalDescription(offer);
          console.log(`sent the offer`);
          socket.emit("offer", {
            offer: offer,
            offerSendId: socket.id,
            offerSendEmail: _email,
            offerReceiveId: allUsers[i].id
          });
        }
      }
    });

    // Last Come
    socket.on("getOffer", async (offer) => {
      console.log("received the offer");
      makeConnection(offer.offerSendId, offer.offerSendEmail, socket, myStream);
      let peerConnection = peerConnections[offer.offerSendId];
      if (peerConnection) {
        await peerConnection.setRemoteDescription(offer.offer);
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        console.log(`sent the answer`);
        socket.emit("answer", {
          answer: answer,
          answerSendId: socket.id,
          answerReceiveId: offer.offerSendId
        });
      }
    });

    // First Come
    socket.on("getAnswer", async (answer) => {
      console.log("received the answer");
      let peerConnection = peerConnections[answer.answerSendId];
      if (peerConnection) {
        await peerConnection.setRemoteDescription(answer.answer);
      }
    });

    socket.on("getIce", (ice) => {
      let myPeerConnection = peerConnections[ice.iceSendId];
      if (myPeerConnection) {
        myPeerConnection.addIceCandidate(ice.ice).then(() => console.log("received the candidate"));
      }
    });


  });
</script>


<main class="bg-black h-screen relative">
  <div id="call"
       style="background-image: url('/assets/meetingBackground.png'); background-repeat: no-repeat; background-size: cover;"
       class="w-[80%] p-5 m-auto h-full flex space-x-3">
    <!--    shareScreen-->
    <div class="relative h-full w-[70%]">
      <video id="shareScreen" autoplay playsinline
             class="border-2 rounded-xl absolute l-0 t-0 w-full h-full object-fill">
      </video>
    </div>

    <div class="w-[30%] h-full">
      <div class="mb-3">
        <select id="cameras"
                class="w-full block p-2 mb-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"></select>

        <div class="flex space-x-2 justify-between">
          <button id="mute"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
          </button>
          <button id="camera"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round"
                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </button>
          <button id="sync"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </button>
          <button id="screen"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
          </button>
        </div>
      </div>

      <div class="mb-3">
        <span>원하시는 비디오를 클릭해주세요.</span>
      </div>

      <div id="videoContainer" class="mb-3 w-full grid grid-cols-2 gap-2 border-2">
        <!--    myFace-->
        <video id="myFace" class="w-full h-full object-fill" autoplay playsinline></video>
        <!--    peerFace-->
      </div>

      <div class="border-2 rounded h-[36%] bg-white">
        <div class="rounded-xl w-full h-[80%] p-0.5">
          <textarea readonly style="resize:none;" class="w-full h-full rounded"></textarea>
        </div>
        <div
          class="flex flex-row items-center rounded-xl bg-white w-full justify-between"
        >
          <div class="w-[70%]">
            <input
              type="text"
              id="textInput" class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
            />
          </div>
          <div>
            <button
              id="sendBtn"
              class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-2 flex-shrink-0"
            >
              <span>보내기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

