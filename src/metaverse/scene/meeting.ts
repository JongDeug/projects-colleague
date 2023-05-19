import Phaser from 'phaser';
import UIController from '../ui/uiController';
import Connection from '../interaction/connection';
import { io } from 'socket.io-client';

interface SceneItems {
	uiCam: Phaser.Cameras.Scene2D.Camera;
	layer: Phaser.Tilemaps.TilemapLayer;
}

interface WebRTCItems {
	connection: {
		socket: any;
		url: any;
		myStream: any;
		streams: any;
		myPeerConnection: any;
		peerConnections: any;
	};
	ui: {
		camerasSelect: any;
		muteBtn: any;
		cameraBtn: any;
		muted: boolean;
		cameraOff: boolean;
		peerFace1: any;
		peerFace2: any;
		peerFace3: any;
		phaserPeerFace1: any;
		phaserPeerFace2: any;
		phaserPeerFace3: any;
	};
}

export default class MeetingScene extends Phaser.Scene {
	connection: Connection;
	uiController: UIController;
	cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
	sceneItems: SceneItems;
	updateStatus: boolean;
	webRTCItems: WebRTCItems;

	constructor() {
		super('meetingScene');

		this.connection = Connection.getInstance();
		this.uiController = new UIController(this, this.connection);
		this.cursorKeys = null;
		this.sceneItems = {
			uiCam: null,
			layer: null
		};
		this.webRTCItems = {
			connection: {
				socket: null,
				url: null,
				myStream: null,
				streams: null,
				myPeerConnection: null,
				peerConnections: null
			},
			ui: {
				camerasSelect: null,
				muteBtn: null,
				cameraBtn: null,
				muted: false,
				cameraOff: false,
				peerFace1: null,
				peerFace2: null,
				peerFace3: null,
				phaserPeerFace1: null,
				phaserPeerFace2: null,
				phaserPeerFace3: null
			}
		};
		this.updateStatus = false;
	}

	init(data) {
		if (data.fromTo === 'fromHomeToMeeting') {
			this.connection.room.send('enterMeetingScene', 'meetingScene');
		}
	}

	preload() {
		// webrtc
		this.load.html('meeting', 'html/meeting.html');
		// map
		this.load.image('meetingTiles', 'assets/meetingTiles.png');
		this.load.tilemapTiledJSON('meeting', 'assets/meeting.json');
		// UI
		this.uiController.preload();
	}

	async getCameras() {
		try {
			const devices = await navigator.mediaDevices.enumerateDevices();
			const cameras = devices.filter((device) => device.kind === 'videoinput');
			const currentCamera = this.webRTCItems.connection.myStream.getVideoTracks()[0];
			cameras.forEach((camera) => {
				const option = document.createElement('option');
				option.value = camera.deviceId;
				option.innerText = camera.label;
				if (currentCamera.label == camera.label) {
					option.selected = true;
				}
				this.webRTCItems.ui.camerasSelect.appendChild(option);
			});
		} catch (e) {
			console.log(e);
		}
	}

	async getMedia(deviceId) {
		const initialConstrains = {
			audio: true,
			video: { facingMode: 'user' }
		};
		const cameraConstrains = {
			audio: true,
			video: { deviceId: { exact: deviceId } }
		};
		// try {
		this.webRTCItems.connection.myStream = await navigator.mediaDevices.getUserMedia(
			deviceId ? cameraConstrains : initialConstrains
		);
		if (!deviceId) {
			await this.getCameras();
		}

		const video = document.createElement('video');
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		video.playsinline = true;
		video.srcObject = this.webRTCItems.connection.myStream;
		video.autoplay = true;

		const phaserVideo = new Phaser.GameObjects.Video(this, 400, 500);
		phaserVideo.video = video;
		phaserVideo.setOrigin(0.5, 0.5);
		phaserVideo.setScale(0.35, 0.35);
		this.add.existing(phaserVideo);
		// important
		phaserVideo.play();
	}

	async initCall() {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		await this.getMedia();
		const roomName = '1234';
		const testEmail = 'testEmail@naver.com';
		this.webRTCItems.connection.socket.emit('join_room', { room: roomName, email: testEmail });
		this.makeConnection(
			this.webRTCItems.connection.socket.id,
			testEmail,
			this.webRTCItems.connection.socket,
			this.webRTCItems.connection.myStream
		);
	}

	makeConnection(socketId, email, socket, myStream) {
		this.webRTCItems.connection.myPeerConnection = new RTCPeerConnection({
			iceServers: [
				{
					urls: [
						'stun:stun.l.google.com:19302',
						'stun:stun1.l.google.com:19302',
						'stun:stun2.l.google.com:19302',
						'stun:stun3.l.google.com:19302',
						'stun:stun4.l.google.com:19302'
					]
				}
			]
		});

		this.webRTCItems.connection.peerConnections = {
			...this.webRTCItems.connection.peerConnections,
			[socketId]: this.webRTCItems.connection.myPeerConnection
		};

		this.webRTCItems.connection.myPeerConnection.addEventListener('icecandidate', (data) => {
			console.log('sent the candidate');
			socket.emit('ice', {
				ice: data.candidate,
				iceSendId: socket.id,
				iceReceiveId: socketId
			});
		});

		this.webRTCItems.connection.myPeerConnection.addEventListener('addstream', (data) => {
			console.log('got an event from my peer');
			this.webRTCItems.connection.streams.push(data.stream);
			this.renderStream();
		});

		// ontrack
		myStream
			.getTracks()
			.forEach((track) => this.webRTCItems.connection.myPeerConnection.addTrack(track, myStream));
	}

	renderStream() {
		this.webRTCItems.ui.peerFace1.srcObject = this.webRTCItems.connection.streams[0];
		this.webRTCItems.ui.peerFace2.srcObject = this.webRTCItems.connection.streams[1];
		this.webRTCItems.ui.peerFace3.srcObject = this.webRTCItems.connection.streams[2];
		this.webRTCItems.ui.phaserPeerFace1.video = this.webRTCItems.ui.peerFace1;
		this.webRTCItems.ui.phaserPeerFace2.video = this.webRTCItems.ui.peerFace2;
		this.webRTCItems.ui.phaserPeerFace3.video = this.webRTCItems.ui.peerFace3;

		this.webRTCItems.ui.phaserPeerFace1.play();
		this.webRTCItems.ui.phaserPeerFace2.play();
		this.webRTCItems.ui.phaserPeerFace3.play();
	}

	handleMuteClick() {
		this.webRTCItems.connection.myStream.getAudioTracks().forEach((track) => {
			track.enabled = !track.enabled;
		});

		if (!this.webRTCItems.ui.muted) {
			this.webRTCItems.ui.muteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z" />
</svg
`;
			this.webRTCItems.ui.muted = true;
		} else {
			this.webRTCItems.ui.muteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
</svg>
`;
			this.webRTCItems.ui.muted = false;
		}
	}

	handleCameraClick() {
		this.webRTCItems.connection.myStream.getVideoTracks().forEach((track) => {
			track.enabled = !track.enabled;
		});
		if (this.webRTCItems.ui.cameraOff) {
			this.webRTCItems.ui.cameraBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
</svg>
`;
			this.webRTCItems.ui.cameraOff = false;
		} else {
			this.webRTCItems.ui.cameraBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 01-2.25-2.25V9m12.841 9.091L16.5 19.5m-1.409-1.409c.407-.407.659-.97.659-1.591v-9a2.25 2.25 0 00-2.25-2.25h-9c-.621 0-1.184.252-1.591.659m12.182 12.182L2.909 5.909M1.5 4.5l1.409 1.409" />
</svg>
`;
			this.webRTCItems.ui.cameraOff = true;
		}
	}

	async handleCameraChange() {
		await this.getMedia(this.webRTCItems.ui.camerasSelect.value);
		const videoTrack = this.webRTCItems.connection.myStream.getVideoTracks()[0];
		// test
		for (const key in this.webRTCItems.connection.peerConnections) {
			const videoSender = this.webRTCItems.connection.peerConnections[key]
				.getSenders()
				.find((sender) => sender.track.kind === 'video');
			await videoSender.replaceTrack(videoTrack);
		}
	}

	async create() {
		// try {
		// 	const map = this.make.tilemap({ key: 'meeting' });
		// 	const tileSet = map.addTilesetImage('meetingTiles', 'meetingTiles', 32, 32);
		// 	this.sceneItems.layer = map.createLayer('Tile Layer 1', tileSet, 0, 0).setDepth(0);
		// } catch (e) {
		// 	console.error('맵 생성 에러', e);
		// }
		//
		// ui setting
		this.add.dom(500, 500).createFromCache('meeting').setOrigin(0.5, 0.5).setScale(0.35, 0.35);
		this.webRTCItems.ui.camerasSelect = document.getElementById('cameras');
		this.webRTCItems.ui.muteBtn = document.getElementById('mute');
		this.webRTCItems.ui.cameraBtn = document.getElementById('camera');

		this.webRTCItems.ui.muteBtn.addEventListener('click', this.handleMuteClick);
		this.webRTCItems.ui.cameraBtn.addEventListener('click', this.handleCameraClick);
		this.webRTCItems.ui.camerasSelect.addEventListener('input', this.handleCameraChange);

		// 1
		this.webRTCItems.ui.peerFace1 = document.createElement('video');
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		this.webRTCItems.ui.peerFace1.playsinline = true;
		// this.webRTCItems.ui.peerFace1.srcObject = this.webRTCItems.connection.myStream;
		this.webRTCItems.ui.peerFace1.autoplay = true;

		this.webRTCItems.ui.phaserPeerFace1 = new Phaser.GameObjects.Video(this, 400, 500);
		// this.webRTCItems.ui.phaserPeerFace1.video = this.webRTCItems.ui.peerFace1;
		this.webRTCItems.ui.phaserPeerFace1.setOrigin(0.5, 0.5);
		this.webRTCItems.ui.phaserPeerFace1.setScale(0.35, 0.35);
		this.add.existing(this.webRTCItems.ui.phaserPeerFace1);
		// this.webRTCItems.ui.phaserPeerFace1.play();

		// 2
		this.webRTCItems.ui.peerFace2 = document.createElement('video');
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		this.webRTCItems.ui.peerFace2.playsinline = true;
		// this.webRTCItems.ui.peerFace1.srcObject = this.webRTCItems.connection.myStream;
		this.webRTCItems.ui.peerFace2.autoplay = true;

		this.webRTCItems.ui.phaserPeerFace2 = new Phaser.GameObjects.Video(this, 400, 500);
		// this.webRTCItems.ui.phaserPeerFace2.video = this.webRTCItems.ui.peerFace2;
		this.webRTCItems.ui.phaserPeerFace2.setOrigin(0.5, 0.5);
		this.webRTCItems.ui.phaserPeerFace2.setScale(0.35, 0.35);
		this.add.existing(this.webRTCItems.ui.phaserPeerFace2);
		// this.webRTCItems.ui.phaserPeerFace2.play();

		// 3
		this.webRTCItems.ui.peerFace3 = document.createElement('video');
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		this.webRTCItems.ui.peerFace3.playsinline = true;
		// this.webRTCItems.ui.peerFace1.srcObject = this.webRTCItems.connection.myStream;
		this.webRTCItems.ui.peerFace3.autoplay = true;

		this.webRTCItems.ui.phaserPeerFace3 = new Phaser.GameObjects.Video(this, 400, 500);
		// this.webRTCItems.ui.phaserPeerFace3.video = this.webRTCItems.ui.peerFace3;
		this.webRTCItems.ui.phaserPeerFace3.setOrigin(0.5, 0.5);
		this.webRTCItems.ui.phaserPeerFace3.setScale(0.35, 0.35);
		this.add.existing(this.webRTCItems.ui.phaserPeerFace3);
		// this.webRTCItems.ui.phaserPeerFace3.play();

		// start webrtc test
		// this.webRTCItems.connection.url = 'http://localhost:3000/';
		// // const URL = "https://c733-112-217-167-202.ngrok-free.app/";
		// this.webRTCItems.connection.socket = io(this.webRTCItems.connection.url, {
		// 	withCredentials: true
		// });
		this.webRTCItems.connection.socket = this.connection.socket;


		this.webRTCItems.connection.streams = [];
		await this.initCall();

		// UI 생성
		// this.uiController.create();
		// this.uiController.event();
		// if (this.connection.chatDB != null) {
		// 	this.uiController._uiContainer.chatUI.setText(this.connection.chatDB);
		// }


		const canvas = document.querySelector("canvas");
		const gl = this.game.canvas.getContext('webgl');

		canvas.addEventListener(
			"webglcontextrestored",
			(e) => {
				console.log(e);
			},
			false
		);

		gl.getExtension("WEBGL_lose_context").restoreContext();

		// WebRTC ==================================================================

		// My Camera =================================================================

		// Connection ================================================================

		// HTML control ==============================================================

		// WebRTC Interaction ========================================================

		// First Come
		this.webRTCItems.connection.socket.on('all_users', async (allUsers) => {
			const length = allUsers.length;
			for (let i = 0; i < length; i++) {
				this.makeConnection(
					allUsers[i].id,
					allUsers[i].email,
					this.webRTCItems.connection.socket,
					this.webRTCItems.connection.myStream
				);
				const peerConnection = this.webRTCItems.connection.peerConnections[allUsers[i].id];
				if (peerConnection) {
					const offer = await peerConnection.createOffer();
					await peerConnection.setLocalDescription(offer);
					console.log(`sent the offer`);
					this.webRTCItems.connection.socket.emit('offer', {
						offer: offer,
						offerSendId: this.webRTCItems.connection.socket.id,
						//
						//
						//
						// 고쳐야함.
						offerSendEmail: "testEmail",
						offerReceiveId: allUsers[i].id
					});
				}
			}
		});

		// Last Come
		this.webRTCItems.connection.socket.on('getOffer', async (offer) => {
			console.log('received the offer');
			this.makeConnection(
				offer.offerSendId,
				offer.offerSendEmail,
				this.webRTCItems.connection.socket,
				this.webRTCItems.connection.myStream
			);
			const peerConnection = this.webRTCItems.connection.peerConnections[offer.offerSendId];
			if (peerConnection) {
				await peerConnection.setRemoteDescription(offer.offer);
				const answer = await peerConnection.createAnswer();
				await peerConnection.setLocalDescription(answer);
				console.log(`sent the answer`);
				this.webRTCItems.connection.socket.emit('answer', {
					answer: answer,
					answerSendId: this.webRTCItems.connection.socket.id,
					answerReceiveId: offer.offerSendId
				});
			}
		});

		// First Come
		this.webRTCItems.connection.socket.on('getAnswer', async (answer) => {
			console.log('received the answer');
			const peerConnection = this.webRTCItems.connection.peerConnections[answer.answerSendId];
			if (peerConnection) {
				await peerConnection.setRemoteDescription(answer.answer);
			}
		});

		this.webRTCItems.connection.socket.on('getIce', (ice) => {
			const myPeerConnection = this.webRTCItems.connection.peerConnections[ice.iceSendId];
			if (myPeerConnection) {
				myPeerConnection.addIceCandidate(ice.ice).then(() => console.log('received the candidate'));
			}
		});
	}

	update() {
		// console.log('test');
	}
}
