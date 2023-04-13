import Phaser from 'phaser';
import UIController from '../ui/uiController';
import Connection from '../interaction/connection';
import type { Room } from 'colyseus.js';

interface InputPayload {
	up: boolean,
	down: boolean,
	left: boolean,
	right: boolean,
}

export class WaitingScene extends Phaser.Scene {
	connection: Connection;
	uiController: UIController;
	currentPlayer: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
	cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
	inputPayload: InputPayload;
	playerEntities: { [sessionId: string]: any };
	playerNames: { [sessionId: string]: any };

	constructor() {
		super('waitingScene');

		this.connection = Connection.getInstance();
		this.uiController = new UIController(this, this.connection);
		this.currentPlayer = null;
		this.cursorKeys = null;
		this.inputPayload = {
			left: false,
			right: false,
			up: false,
			down: false,
		}
		this.playerEntities = {};
		this.playerNames = {};
	}

	preload() {
		// 키보드 
		this.cursorKeys = this.input.keyboard.createCursorKeys();
		// 플레이어
		this.load.spritesheet('player', 'assets/player.png', {
			frameWidth: 24,
			frameHeight: 24
		});
		// 맵, 타일
		this.load.image('waitingTiles', 'assets/waitingTiles.png');
		this.load.tilemapTiledJSON('map', 'assets/waiting.json');
		// UI
		this.uiController.preload();
	}

	async create() {
		await this.connection.connect(this.connection.teamId);
		// 생성
		try {
			// 맵 생성
			const map = this.make.tilemap({
				key: 'map'
			});
			const tileSet = map.addTilesetImage('waitingTiles', 'waitingTiles');
			const belowLayer = map.createLayer('BelowLayer', tileSet, 0, 0).setDepth(0);
			const worldLayer = map.createLayer('WorldLayer', tileSet, 0, 0).setDepth(1);
			const aboveLayer = map.createLayer('AboveLayer', tileSet, 0, 0).setDepth(3);
			worldLayer.setCollisionByProperty({ collides: true }); // 충돌 타일 설정

			// 충돌 구역 표시
			const debugGraphics = this.add.graphics().setAlpha(0.75).setDepth(0);
			worldLayer.renderDebug(debugGraphics, {
				tileColor: null, // Color of non-colliding tiles
				collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
				faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
			});

			// 메인 카메라, UI 카메라 생성 및 설정
			this.cameras.main.setBounds(0, 0, 800, 600);
			const UICam = this.cameras.add(0, 0, 800, 600);
			this.cameras.main.setZoom(2);
			UICam.ignore([
				worldLayer,
				belowLayer,
				aboveLayer,
				this.physics.world.debugGraphic,
				debugGraphics
			]);

			// 플레이어 애니메이션 생성
			this.createPlayerAnimation('down', 0, 2);
			this.createPlayerAnimation('up', 9, 11);
			this.createPlayerAnimation('left', 3, 5);
			this.createPlayerAnimation('right', 6, 8);

			// UI 생성
			this.uiController.create();
			this.uiController.event();
		} catch (e) {
			console.error('오브젝트 생성 에러 : ', e);
		}

		try {
			// Remove Adapter
			this.connection.room.state.players.onRemove = (player, sessionId) => {
				const entity = this.playerEntities[sessionId];
				const playerNames = this.playerNames[sessionId];
				if (entity) {
					// destroy entity
					entity.destroy();
					playerNames.destroy();
					// clear local reference
					delete this.connection.playerState[sessionId];
					delete this.playerEntities[sessionId];
					delete this.playerNames[sessionId];
				}
			};
		} catch (e) {
			console.error('오브젝트 제거 에러 : ', e);
		}
	}

	async update(time: number, delta: number): Promise<void> {
		// game loop
		if (!this.connection.room) {
			return;
		}
		// loop를 돌기 때문에 onAdd()에서 this.currentPlayer를 초기화 하는 것 보다 빨리 접근할 수 있으므로 차단
		if (!this.currentPlayer) {
			return;
		}

		const entity = this.currentPlayer;

		// 방향키 확인
		this.inputPayload.up = this.cursorKeys.up.isDown;
		this.inputPayload.down = this.cursorKeys.down.isDown;
		this.inputPayload.left = this.cursorKeys.left.isDown;
		this.inputPayload.right = this.cursorKeys.right.isDown;
		this.connection.room.send(0, this.inputPayload);

		// 속도
		const velocity = 2;
		entity.body.setVelocity(0);

		// 플레이어 이동, (상,좌 / 하,좌는 left 애니메이션 모션) (상,우 / 하,우는 right 애니메이션 모션)
		if (this.inputPayload.up && this.inputPayload.left) {
			entity.body.setVelocityX(-velocity);
			entity.body.setVelocityY(-velocity);
			entity.anims.play('left', true);
		} else if (this.inputPayload.down && this.inputPayload.left) {
			entity.body.setVelocityX(-velocity);
			entity.body.setVelocityY(velocity);
			entity.anims.play('left', true);
		} else if (this.inputPayload.left) {
			entity.body.setVelocityX(-velocity);
			entity.anims.play('left', true);
		} else if (this.inputPayload.up && this.inputPayload.right) {
			entity.body.setVelocityX(velocity);
			entity.body.setVelocityY(-velocity);
			entity.anims.play('right', true);
		} else if (this.inputPayload.down && this.inputPayload.right) {
			entity.body.setVelocityX(velocity);
			entity.body.setVelocityY(velocity);
			entity.anims.play('right', true);
		} else if (this.inputPayload.right) {
			entity.body.setVelocityX(velocity);
			entity.anims.play('right', true);
		} else if (this.inputPayload.up) {
			entity.body.setVelocityY(-velocity);
			entity.anims.play('up', true);
		} else if (this.inputPayload.down) {
			entity.body.setVelocityY(velocity);
			entity.anims.play('down', true);
		}
		// velocity 가속 제거
		entity.body.velocity.normalize().scale(200);

		// 플레이어 위치 동기화, 서버에게 전달
		let position = {
			x: entity.body.x,
			y: entity.body.y
		};
		this.connection.room.send(1, position);

		// 이름 설정 및 다른 플레이어 위치 동기화
		for (let sessionId in this.playerEntities) {
			const entity = this.playerEntities[sessionId];
			// console.log(this.connection.playerState[sessionId]);
			const { serverX, serverY, serverLeft, serverRight, serverUp, serverDown } = this.connection.playerState[sessionId];


			// 플레이어 이름 설정
			this.playerNames[sessionId]
				.setAlign('center')
				.setOrigin(0.3, 1.2)
				.setPosition(entity.body.x, entity.body.y)
				.setFontSize(10);

			// do not interpolate the current player
			if (sessionId === this.connection.room.sessionId) {
				continue;
			}

			entity.body.x = Phaser.Math.Linear(entity.body.x, serverX, 0.2);
			entity.body.y = Phaser.Math.Linear(entity.body.y, serverY, 0.2);

			// 애니메이션 모션만 설정
			if (serverUp && serverLeft) {
				entity.anims.play('left', true);
			} else if (serverDown && serverLeft) {
				entity.anims.play('left', true);
			} else if (serverLeft) {
				entity.anims.play('left', true);
			} else if (serverUp && serverRight) {
				entity.anims.play('right', true);
			} else if (serverDown && serverRight) {
				entity.anims.play('right', true);
			} else if (serverRight) {
				entity.anims.play('right', true);
			} else if (serverUp) {
				entity.anims.play('up', true);
			} else if (serverDown) {
				entity.anims.play('down', true);
			}
		}

		// 씬이동(모든 플레이어 대상)
		for (const sessionId in this.connection.playerState) {
			// 지워졌는지 확인하지 않으면 루프를 돌아서 에러 발생시킴
			if (!!this.playerEntities[sessionId] === false) {
				continue;
			}

			if (this.connection.playerState[sessionId].serverX <= 590 && this.connection.playerState[sessionId].serverX >= 574 &&
				this.connection.playerState[sessionId].serverY === 120) {
				// 씬안의 플레이어 제거
				await this.playerEntities[sessionId].destroy();
				await this.playerNames[sessionId].destroy();
				delete this.playerEntities[sessionId];
				// 만약 sessionId가 같다면! 씬이동
				if (sessionId === this.connection.room.sessionId) {
					this.scene.start('homeScene', {
					})
				}
			}
		}

	}

	createPlayerAnimation(key: string, start: number, end: number) {
		this.anims.create({
			key: key,
			frameRate: 15,
			frames: this.anims.generateFrameNumbers('player', {
				start: start,
				end: end
			}),
			repeat: 0
		});
	}
}
