import type Phaser from 'phaser';
import Player from './player';
import type Connection from '../interaction/connection';

export default class HomePlayer extends Player {
	constructor(scene: Phaser.Scene, connection: Connection) {
		super(scene, connection);
	}

	// 현재 플레이어 생성
	override createCurrentPlayer(sceneItems) {
		const sessionId = this.connection.room.sessionId;
		const x = this.connection.playerState[sessionId].serverX;
		const y = this.connection.playerState[sessionId].serverY;
		const img = this.connection.playerState[sessionId].serverImg;
		const name = this.connection.playerState[sessionId].serverName;
		const currentScene = this.connection.playerState[sessionId].serverCurrentScene;
		if (currentScene === 'waitingScene') {
			return;
		}
		this.playerEntities[sessionId] = this.scene.physics.add
			.sprite(x, y, img)
			.setSize(14, 20)
			.setScale(1.3, 1.3)
			.setDepth(2);
		this.playerNames[sessionId] = this.scene.add.text(-200, -200, name).setDepth(2);

		if (sessionId === this.connection.room.sessionId) {
			this.currentPlayer = this.playerEntities[sessionId];
			this.scene.cameras.main.startFollow(this.currentPlayer);
		}

		// 플레이어와 충돌 타일간 설정
		this.scene.physics.add.collider(
			this.playerEntities[this.connection.room.sessionId],
			sceneItems.worldLayer
		);
		this.scene.physics.add.collider(
			this.playerEntities[this.connection.room.sessionId],
			sceneItems.aboveLayer
		);
		// 플레이어와 게임 전체 경계 충돌
		this.playerEntities[sessionId].body.collideWorldBounds = true;
		// UICam에서 플레이어 제거
		sceneItems.uiCam.ignore([this.playerEntities[sessionId], this.playerNames[sessionId]]);
	}

	// 다른 플레이어 생성
	override createOtherPlayer(sceneItems) {
		for (const sessionId in this.connection.playerState) {
			const playerState = this.connection.playerState[sessionId];

			if (sessionId === this.connection.room.sessionId && playerState == null) {
				continue;
			}
			// 접속자가 homeScene에 있고, 접속자 엔티티가 존재하지 않을 때 생성.
			if (
				playerState.serverCurrentScene === 'homeScene' &&
				!this.playerEntities[sessionId]?.active
			) {
				this.playerEntities[sessionId] = this.scene.physics.add
					.sprite(playerState.serverX, playerState.serverY, playerState.serverImg)
					.setSize(14, 20)
					.setScale(1.3, 1.3)
					.setDepth(2);
				this.playerNames[sessionId] = this.scene.add
					.text(-200, -200, playerState.serverName)
					.setDepth(4);

				// 플레이어와 충돌 타일간 설정
				this.scene.physics.add.collider(this.playerEntities[sessionId], sceneItems.worldLayer);
				this.scene.physics.add.collider(this.playerEntities[sessionId], sceneItems.aboveLayer);
				// 플레이어와 게임 전체 경계 충돌
				this.playerEntities[sessionId].body.collideWorldBounds = true;
				// UICam에서 플레이어 제거
				sceneItems.uiCam.ignore([this.playerEntities[sessionId], this.playerNames[sessionId]]);
			}
		}
	}

	async enterWaitingScene() {
		for (const sessionId in this.playerEntities) {
			if (this.playerEntities[sessionId]?.body?.x == null) {
				continue;
			}
			const entity = this.playerEntities[sessionId];

			// HomeScene으로 이동
			if (entity.body.x <= 718.64 && entity.body.x >= 698.4 && entity.body.y == 240) {
				this.playerEntities[sessionId].destroy();
				this.playerNames[sessionId].destroy();
				delete this.playerEntities[sessionId];
				delete this.playerNames[sessionId];

				// 자신의 캐릭터만 이동
				if (sessionId === this.connection.room.sessionId) {
					this.currentPlayer = null;

					// Remove animation
					const numberStr = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'];
					numberStr.forEach((item) => {
						this.removeAnims(item);
					});

					this.scene.scene.start('waitingScene', { fromTo: 'fromHomeToWaiting' });
					return;
				}
			}

			// 다른 플레이어가 봤을 때 entity.body.x 범위에 들어가지 않는 버그가 있어서 추가함.
			if (this.connection.playerState[sessionId].serverCurrentScene === 'waitingScene') {
				if (this.playerEntities[sessionId]) {
					this.playerEntities[sessionId].destroy();
					this.playerNames[sessionId].destroy();
					delete this.playerEntities[sessionId];
					delete this.playerNames[sessionId];
				}
			}
		}
	}

	async enterMeetingScene() {
		for (const sessionId in this.playerEntities) {
			if (this.playerEntities[sessionId]?.body?.x == null) {
				continue;
			}
			const entity = this.playerEntities[sessionId];

			// MeetingScene 이동
			if (entity.body.x <= 190 && entity.body.x >= 44.95 && entity.body.y >= 430 && entity.body.y <= 528) {
				this.playerEntities[sessionId].destroy();
				this.playerNames[sessionId].destroy();
				delete this.playerEntities[sessionId];
				delete this.playerNames[sessionId];

				// 자신의 캐릭터만 이동
				if (sessionId === this.connection.room.sessionId) {
					this.currentPlayer = null;

					// Remove animation
					const numberStr = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'];
					numberStr.forEach((item) => {
						this.removeAnims(item);
					});

					this.scene.scene.start('meetingScene', { fromTo: 'fromHomeToMeeting' });
					return;
				}
			}

			// 다른 플레이어가 봤을 때 entity.body.x 범위에 들어가지 않는 버그가 있어서 추가함.
			if (this.connection.playerState[sessionId].serverCurrentScene === 'meetingScene') {
				if (this.playerEntities[sessionId]) {
					this.playerEntities[sessionId].destroy();
					this.playerNames[sessionId].destroy();
					delete this.playerEntities[sessionId];
					delete this.playerNames[sessionId];
				}
			}
		}
	}
}
