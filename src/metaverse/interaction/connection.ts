import { Client, Room } from 'colyseus.js';
import { WaitingScene } from '../scene/waiting';
import { HomeScene } from '../scene/home';
import UIController from '../ui/uiController';

export default class Connection {
	private static instance: Connection;
	private client: Client;
	private _waitingScene: any;
	private _homeScene: any;
	private _room: Room;
	private _playerState: { [sessionId: string]: any } = {};
	private _teamId;
	// private _playerSessionIds: any;
	// state한 것이 무엇이 있냐, 모든 플레이어를 모아놓은. 플레이어의 위치 정보, 플레이어의 키 인풋

	private constructor() {}

	public static getInstance(): Connection {
		if (!Connection.instance) {
			Connection.instance = new Connection();
		}
		return Connection.instance;
	}

	async connect(teamId: string) {
		try {
			this.client = new Client('ws://localhost:2567');
			console.log('Joining Room...');
			this.room = await this.client.joinOrCreate('metaverse', { teamId: teamId });
			console.log('Joined successfully!');

			// 이벤트 등록
			this.registerEvent();
            
			this.room.state.players.onAdd = (player, sessionId) => {
				// 게임으로 들어오는 플레이어 sessionID
				console.log('이거 3번?');
				this.room.send('enterMetaverse', sessionId);
				// 생성
				// this.playerEntities[sessionId] = this.physics.add
				// 	.sprite(player.x, player.y, 'player', 0)
				// 	.setSize(14, 20)
				// 	.setScale(0.8, 0.75)
				// 	.setDepth(2);
				// this.playerNames[sessionId] = this.add.text(-200, -200, player.name).setDepth(4);

				// 상태 변화
				player.onChange = () => {
					this.playerState[sessionId] = {
						serverX: player.x,
						serverY: player.y,
						serverLeft: player.left,
						serverRight: player.right,
						serverUp: player.up,
						serverDown: player.down,
						serverCurrentScene: player.currentScene,
						serverName: player.name
					};
				};

				// // 룸 세션과 동일한 세션이 현재 플레이어임.
				// if (sessionId === this.connection.room.sessionId) {
				// 	this.currentPlayer = this.playerEntities[sessionId];
				// 	// 카메라 관리
				// 	this.cameras.main.startFollow(this.currentPlayer);
				// }

				// // 플레이어와 충돌 타일간 설정
				// this.physics.add.collider(this.playerEntities[sessionId], worldLayer);
				// // 플레이어와 게임 전체 경계 충돌
				// this.playerEntities[sessionId].body.collideWorldBounds = true;
				// // UICam에서 플레이어 제거
				// UICam.ignore([this.playerEntities[sessionId], this.playerNames[sessionId]]);
			};
		} catch (error) {
			console.log('방 접속 에러', error);
		}
	}

	public registerEvent() {
		// 메타버스 입장

		this.room.onMessage('hihi', (payload) => {
			console.log(payload);
		});

		// 채팅
		this.room.onMessage('chat', (payload) => {
			if (this._waitingScene.scene.isActive('waitingScene')) {
				this._waitingScene.uiController._uiContainer.chatUISlider.value += 1;
				this._waitingScene.uiController._uiContainer.chatUI.appendText(
					`${payload.sessionId}: ${payload.message}` + '\n'
				);
			}
			if (this._homeScene.scene.isActive('homeScene')) {
				this._homeScene.uiController._uiContainer.chatUISlider.value += 1;
				this._homeScene.uiController._uiContainer.chatUI.appendText(
					`${payload.sessionId}: ${payload.message}` + '\n'
				);
			}
		});

		// 채팅 입장 표시
		this.room.onMessage('enterChat', (payload) => {
			// 본인 제외
			if (this.room.sessionId !== payload) {
				if (this._waitingScene.scene.isActive('waitingScene')) {
					this._waitingScene.uiController._uiContainer.chatUISlider.value += 1;
					this._waitingScene.uiController._uiContainer.chatUI.appendText(
						`[color=green]${payload} 입장![/color]` + '\n'
					);
				}
				if (this._homeScene.scene.isActive('homeScene')) {
					this._homeScene.uiController._uiContainer.chatUISlider.value += 1;
					this._homeScene.uiController._uiContainer.chatUI.appendText(
						`[color=green]${payload} 입장![/color]` + '\n'
					);
				}
			}
		});
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

	public set teamId(teamId: string) {
		this._teamId = teamId;
	}

	public set waitingScene(waitingScene: Phaser.Scene) {
		this._waitingScene = waitingScene;
	}

	public set homeScene(homeScene: Phaser.Scene) {
		this._homeScene = homeScene;
	}
}
