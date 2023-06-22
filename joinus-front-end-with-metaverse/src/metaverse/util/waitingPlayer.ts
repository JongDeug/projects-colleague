import type Phaser from 'phaser';
import Player from './player';
import type Connection from '../interaction/connection';

export default class WaitingPlayer extends Player {
	constructor(scene: Phaser.Scene, connection: Connection) {
		super(scene, connection);
	}

	// 현재 플레이어 생성
	createCurrentPlayer(sceneItems) {
		// player 생성
		const sessionId = this.connection.room.sessionId;
		const x = this.connection.playerState[sessionId].serverX;
		const y = this.connection.playerState[sessionId].serverY;
		const img = this.connection.playerState[sessionId].serverImg;
		const name = this.connection.playerState[sessionId].serverName;
		const currentScene = this.connection.playerState[sessionId].serverCurrentScene;
		if (currentScene === 'homeScene') {
			return;
		}
		this.playerEntities[sessionId] = this.scene.physics.add
			.sprite(x, y, img, 0)
			.setSize(14, 20)
			.setScale(0.8, 0.75)
			.setDepth(2);
		// name
		this.playerNames[sessionId] = this.scene.add.text(-200, -200, name).setDepth(2);

		// current player
		if (sessionId === this.connection.room.sessionId) {
			this.currentPlayer = this.playerEntities[sessionId];
			this.scene.cameras.main.startFollow(this.currentPlayer);
		}

		// 플레이어와 충돌 타일간 설정
		this.scene.physics.add.collider(this.playerEntities[sessionId], sceneItems.worldLayer);
		// 플레이어와 게임 전체 경계 충돌
		this.playerEntities[sessionId].body.collideWorldBounds = true;
		// UICam에서 플레이어 제거
		sceneItems.uiCam.ignore([this.playerEntities[sessionId], this.playerNames[sessionId]]);
	}

	// 다른 플레이어 생성
	createOtherPlayer(sceneItems) {
		for (const sessionId in this.connection.playerState) {
			const playerState = this.connection.playerState[sessionId];

			// 나는 생성하지 않음.
			if (sessionId === this.connection.room.sessionId && playerState == null) {
				continue;
			}

			if (
				playerState.serverCurrentScene === 'waitingScene' &&
				!this.playerEntities[sessionId]?.active
			) {
				this.playerEntities[sessionId] = this.scene.physics.add
					.sprite(playerState.serverX, playerState.serverY, playerState.serverImg)
					.setSize(14, 20)
					.setScale(0.8, 0.75)
					.setDepth(2);
				this.playerNames[sessionId] = this.scene.add
					.text(-200, -200, playerState.serverName)
					.setDepth(2);

				// 플레이어와 충돌 타일간 설정
				this.scene.physics.add.collider(this.playerEntities[sessionId], sceneItems.worldLayer);
				// 플레이어와 게임 전체 경계 충돌
				this.playerEntities[sessionId].body.collideWorldBounds = true;
				// UICam에서 플레이어 제거
				sceneItems.uiCam.ignore([this.playerEntities[sessionId], this.playerNames[sessionId]]);
			}
		}
	}

	// waiting -> home 이동
	async enterHomeScene() {
		for (const sessionId in this.playerEntities) {
			if (this.playerEntities[sessionId]?.body?.x == null) {
				continue;
			}

			const entity = this.playerEntities[sessionId];

			// HomeScene으로 이동
			if (
				entity.body.x <= 590 &&
				entity.body.x >= 574 &&
				entity.body.y <= 123 &&
				entity.body.y >= 120
			) {
				// WaitingScene에서 플레이어 제거
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

					this.scene.scene.start('homeScene', { fromTo: 'fromWaitingToHome' });
					return;
				}
			}

			// 다른 플레이어가 봤을 때 entity.body.x 범위에 들어가지 않는 버그가 있어서 추가함.
			if (this.connection.playerState[sessionId].serverCurrentScene === 'homeScene') {
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
