import { Client, Room } from 'colyseus.js';

export default class Connection {
	private static instance: Connection;
	private client: Client;
	private _loginScene: any;
	private _waitingScene: any;
	private _homeScene: any;
	private _meetingScene: any;
	public teamId: any;
	private _room: Room;
	private _playerState: { [sessionId: string]: any } = {};
	chatDB: string;
	// private _playerSessionIds: any;
	// state한 것이 무엇이 있냐, 모든 플레이어를 모아놓은. 플레이어의 위치 정보, 플레이어의 키 인풋

	public static getInstance(): Connection {
		if (!Connection.instance) {
			Connection.instance = new Connection();
		}
		return Connection.instance;
	}

	async connect(
		teamId: string,
		username: string,
		password: string,
		playerImg: string
	): Promise<boolean> {
		try {
			this.client = new Client('ws://localhost:2567');
			// this.client = new Client('wss://nasty-carpets-tie.loca.lt/ws');

			console.log('Joining Room...');

			this.teamId = teamId;

			this.room = await this.client.joinOrCreate('metaverse', {
				teamId: teamId,
				username: username,
				password: password,
				playerImg: playerImg
			});
			console.log('Joined successfully!');

			// 이벤트 등록
			this.registerEvent();

			const connected = true;
			return connected;
		} catch (error) {
			console.log('방 접속 에러 코드', error.code);
			console.log('방 접속 에러 메시지', error.message);
			const connected = false;
			return connected;
		}
	}

	// async auth(){
	// 	try {
	// 		await this.client.auth.login();
	// 	} catch (error) {
	// 		console.log('방 로그인 에러', error);
	// 	}
	// }

	public registerEvent() {
		// 채팅
		this.room.onMessage('chat', (payload) => {
			const color = this.setColor(this.playerState[payload.sessionId].serverImg);

			if (this.chatDB == null) {
				this.chatDB = `[color=${color}]${payload.username}: ${payload.message}[/color]`;
			} else {
				this.chatDB = this.chatDB.concat(
					'\n',
					`[color=${color}]${payload.username}: ${payload.message}[/color]`
				);
			}

			if (this._waitingScene.scene.isActive('waitingScene')) {
				this._waitingScene.uiController._uiContainer.chatUI.setText(this.chatDB);
				this._waitingScene.uiController._uiContainer.chatUISlider.value += 1;
			}
			if (this._homeScene.scene.isActive('homeScene')) {
				this._homeScene.uiController._uiContainer.chatUI.setText(this.chatDB);
				this._homeScene.uiController._uiContainer.chatUISlider.value += 1;
			}
			if (this._meetingScene.scene.isActive('meetingScene')) {
				this._meetingScene.uiController._uiContainer.chatUI.setText(this.chatDB);
				this._meetingScene.uiController._uiContainer.chatUISlider.value += 1;
			}
		});

		// 채팅 입장 표시
		this.room.onMessage('enterWaitingScene', (payload) => {
			const color = this.setColor(payload.serverImg);
			// 본인 제외
			if (this.room.sessionId !== payload.sessionId) {
				if (this.chatDB == null) {
					this.chatDB = `[color=${color}]${payload.username}님 입장! [/color]`;
				} else {
					this.chatDB = this.chatDB.concat(
						'\n',
						`[color=${color}]${payload.username}님 입장! [/color]`
					);
				}

				if (this._waitingScene.scene.isActive('waitingScene')) {
					console.log(color);
					this._waitingScene.uiController._uiContainer.chatUI.setText(this.chatDB);
					this._waitingScene.uiController._uiContainer.chatUISlider.value += 1;
				}
				if (this._homeScene.scene.isActive('homeScene')) {
					this._homeScene.uiController._uiContainer.chatUI.setText(this.chatDB);
					this._homeScene.uiController._uiContainer.chatUISlider.value += 1;
				}
				if (this._meetingScene.scene.isActive('meetingScene')) {
					this._meetingScene.uiController._uiContainer.chatUI.setText(this.chatDB);
					this._meetingScene.uiController._uiContainer.chatUISlider.value += 1;
				}
			}
		});
	}

	public setColor(payload) {
		switch (payload) {
			case 'character00':
				return 'black';
			case 'character01':
				return 'red';
			case 'character02':
				return 'green';
			case 'character03':
				return 'blue';
			case 'character04':
				return 'yellow';
			case 'character05':
				return 'salmon';
			case 'character06':
				return 'violet';
			case 'character07':
				return 'pink';
			case 'character08':
				return 'gray';
			case 'character09':
				return 'lime';
		}
	}

	public get room(): Room {
		return this._room;
	}

	public set room(room: Room) {
		this._room = room;
	}

	public get playerState(): any {
		return this._playerState;
	}

	public set playerState(state) {
		this._playerState = state;
	}


	public set loginScene(loginScene: Phaser.Scene) {
		this._loginScene = loginScene;
	}

	public set waitingScene(waitingScene: Phaser.Scene) {
		this._waitingScene = waitingScene;
	}

	public set homeScene(homeScene: Phaser.Scene) {
		this._homeScene = homeScene;
	}

	public set meetingScene(meetingScene: Phaser.Scene) {
		this._meetingScene = meetingScene;
	}
}
