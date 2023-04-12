import { Client, Room } from 'colyseus.js';
import Phaser from 'phaser';
import UIController from '../ui/uiController';

export class WaitingScene extends Phaser.Scene {
	private client = new Client('ws://localhost:2567');
	private metaverse: Room;
	private uiController;
	public playerEntities: { [sessionId: string]: any } = {};
	private currentPlayer: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
	private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
	private userNames: { [sessionId: string]: any } = {};
	private inputPayload = {
		left: false,
		right: false,
		up: false,
		down: false
	};

	constructor() {
		super('waitingScene');
		this.uiController = new UIController(this);
	}

	preload() {
		this.cursorKeys = this.input.keyboard.createCursorKeys();
		// 플레이어
		this.load.spritesheet('player', 'assets/player.png', {
			frameWidth: 24,
			frameHeight: 24
		});
		// 맵, 타일
		this.load.image('waitingTiles', 'assets/waitingTiles.png');
		this.load.tilemapTiledJSON('map', 'assets/waiting.json');

		// 채팅 다이어로그
		this.load.image('chatDialog', 'assets/dialog.png');
		// UI
		this.uiController.preload();
	}

	async create() {
		// 채팅 다이어로그
		// const chatDialog = this.add.image(150, 100, 'chatDialog').setScale(0.9, 0.9);
		// const chatMessage =
		// 방 접속 전 teamId get!
		try {
			console.log('Joining my_room...');
			this.metaverse = await this.client.joinOrCreate('metaverse', { teamId: '1234' });
			this.uiController.room = this.metaverse;
			console.log('Joined successfully!');
		} catch (e) {
			console.error('대기방 접속 에러 : ', e);
		}

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
			// const debugGraphics = this.add.graphics().setAlpha(0.75).setDepth(0);
			// worldLayer.renderDebug(debugGraphics, {
			//     tileColor: null, // Color of non-colliding tiles
			//     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
			//     faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
			// });

			// 메인 카메라, UI 카메라 생성 및 설정
			this.cameras.main.setBounds(0, 0, 800, 600);
			const UICam = this.cameras.add(0, 0, 800, 600);
			this.cameras.main.setZoom(2);
			UICam.ignore([
				worldLayer,
				belowLayer,
				aboveLayer,
				this.physics.world.debugGraphic
				// debugGraphics
			]);

			// 플레이어 생성, 이거를 asycn로 해야될 것 같은디.
			this.metaverse.state.players.onAdd = (player, sessionId) => {
				const entity = this.physics.add
					.sprite(player.x, player.y, 'player', 0)
					.setSize(14, 20)
					.setScale(0.8, 0.75)
					.setDepth(2);
				entity.setData('name', player.name);

				this.playerEntities[sessionId] = entity;

				// 이름 생성
				this.userNames[sessionId] = this.add.text(-200, -200, player.name).setDepth(4);

				// 룸 세션과 동일한 세션이 현재 플레이어임.
				if (sessionId === this.metaverse.sessionId) {
					this.currentPlayer = entity;
					// 카메라 관리
					this.cameras.main.startFollow(this.currentPlayer);
				}
				// 다른 플레이어가 움직였을 때 내 화면에 표시해야하므로
				else {
					player.onChange = () => {
						entity.setData('serverX', player.x);
						entity.setData('serverY', player.y);
						entity.setData('serverLeft', player.left);
						entity.setData('serverRight', player.right);
						entity.setData('serverUp', player.up);
						entity.setData('serverDown', player.down);
					};
				}

				// 플레이어와 충돌 타일간 설정
				this.physics.add.collider(entity, worldLayer);
				// 플레이어와 게임 전체 경계 충돌
				entity.body.collideWorldBounds = true;
				// UICam에서 플레이어 제거
				UICam.ignore([this.playerEntities[sessionId], this.userNames[sessionId]]);
			};

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
			// 플레이어 제거
			this.metaverse.state.players.onRemove = (player, sessionId) => {
				const entity = this.playerEntities[sessionId];
				const userName = this.userNames[sessionId];
				if (entity) {
					// destroy entity
					entity.destroy();
					userName.destroy();
					// clear local reference
					delete this.playerEntities[sessionId];
					delete this.userNames[sessionId];
				}
			};
		} catch (e) {
			console.error('오브젝트 제거 에러 : ', e);
		}
	}

	update(time: number, delta: number): void {
		// game loop

		if (!this.metaverse) {
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
		this.metaverse.send(0, this.inputPayload);

		// 씬 이동
		if ((entity.body.x <= 590 && entity.body.x >= 574) || entity.body.y === 120) {
			this.scene.start('homeScene', {
				metaverse: this.metaverse,
				currentPlayer: this.currentPlayer,
				playerEntities: this.playerEntities,
				userNames: this.userNames
			});
		}

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
		this.metaverse.send(1, position);

		// 이름 설정 및 다른 플레이어 위치 동기화
		for (let sessionId in this.playerEntities) {
			const entity = this.playerEntities[sessionId];
			const { serverX, serverY, serverLeft, serverRight, serverUp, serverDown } =
				entity.data.values;

			// 플레이어 이름 설정
			this.userNames[sessionId]
				.setAlign('center')
				.setOrigin(0.3, 1.2)
				.setPosition(entity.body.x, entity.body.y)
				.setFontSize(10);

			// do not interpolate the current player
			if (sessionId === this.metaverse.sessionId) {
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
