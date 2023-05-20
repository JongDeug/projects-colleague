<script>
  import { onMount } from "svelte";
  import { io } from "socket.io-client";

  export let roomId;

  onMount(() => {
    let _roomId;
    $: _roomId = roomId;
    let _email = "test";

    initCall(_roomId, _email);

    const myFace = document.getElementById("myFace");
    const muteBtn = document.getElementById("mute");
    const cameraBtn = document.getElementById("camera");
    const camerasSelect = document.getElementById("cameras");

    let myStream;
    let streams = [];
    let muted = false;
    let cameraOff = false;
    let myPeerConnection;
    let peerConnections;

    const URL = "http://localhost:3000/";
    // const URL = "https://c733-112-217-167-202.ngrok-free.app/";
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
      } catch (e) {
        console.log(e);
      }
    };

    async function getMedia(deviceId) {
      const initialConstrains = {
        audio: true,
        video: { facingMode: "user" }
      };
      const cameraConstrains = {
        audio: true,
        video: { deviceId: { exact: deviceId } }
      };
      try {
        myStream = await navigator.mediaDevices.getUserMedia(
          deviceId ? cameraConstrains : initialConstrains
        );
        myFace.srcObject = myStream;
        // console.log(myFace.);
        if (!deviceId) {
          await getCameras();
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
        streams.push(data.stream);
        renderStream();
        console.log(peerConnections);
      });

      // ontrack
      myStream.getTracks().forEach(track => myPeerConnection.addTrack(track, myStream));
    }

    function renderStream() {
      const peerFace1 = document.getElementById("peerFace1");
      const peerFace2 = document.getElementById("peerFace2");
      const peerFace3 = document.getElementById("peerFace3");
      peerFace1.srcObject = streams[0];
      peerFace2.srcObject = streams[1];
      peerFace3.srcObject = streams[2];
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

    muteBtn.addEventListener("click", handleMuteClick);
    cameraBtn.addEventListener("click", handleCameraClick);
    camerasSelect.addEventListener("input", handleCameraChange);

    // WebRTC Interaction ========================================================

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

<main class=" h-screen">
  <div id="call" class="w-[1011.2px] p-5 bg-amber-100 h-full grid grid-cols-3 gap-4 content-around m-auto">
    <video id="peerFace1" autoplay playsinline width="300" height="300"
           class="border-4 border-indigo-600"></video>
    <video id="peerFace2" autoplay playsinline width="300" height="300"
           class="border-4 border-indigo-600"></video>
    <video id="peerFace3" autoplay playsinline width="300" height="300"
           class="border-4 border-indigo-600"></video>

    <div class="col-start-2 flex space-x-2 items-start">
      <video id="myFace" autoplay playsinline width="300" height="300"
             class="border-4 border-indigo-600"></video>

      <div class="w-[200px] h-[200px] border-4 border-indigo-600">
        <select id="cameras"
                class="block p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></select>

        <div class="flex space-x-2">
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
        </div>
      </div>
    </div>
  </div>
</main>

