import type { Room } from 'colyseus.js';
import Phaser from 'phaser';
import UIController from '../ui/uiController';

export class HomeScene extends Phaser.Scene {
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
		super('homeScene');
		this.uiController = new UIController(this);
	}

	// waitingScene에서 정보받기
	init(data) {
		this.metaverse = data.metaverse;
		this.currentPlayer = data.currentPlayer;
		this.playerEntities = data.playerEntities;
		this.userNames = data.userNames;

		console.log(this.currentPlayer);
		this.metaverse.send(2, 'homeScene');
	}

	preload() {
		this.cursorKeys = this.input.keyboard.createCursorKeys();
		// 플레이어
		this.load.spritesheet('player', 'assets/player.png', {
			frameWidth: 24,
			frameHeight: 24
		});
		// 맵, 타일
		this.load.image('homeTiles', 'assets/homeTiles.png');
		this.load.image('homeDoors', 'assets/homeDoors.png');
		this.load.image('homeFurnitureState1', './assets/homeFurnitureState1.png');
		this.load.image('homeFurnitureState2', './assets/homeFurnitureState2.png');
		this.load.image('homeSmallItems', 'assets/homeSmallItems.png');
		this.load.tilemapTiledJSON('home', 'assets/home.json');

		// 채팅 다이어로그
		this.load.image('chatDialog', 'assets/dialog.png');
	}

	async create() {
		try {
			const map = this.make.tilemap({
				key: 'home'
			});
			const tileSet = [];
			tileSet[0] = map.addTilesetImage('homeTiles', 'homeTiles');
			tileSet[1] = map.addTilesetImage('homeDoors', 'homeDoors');
			tileSet[2] = map.addTilesetImage('homeFurnitureState1', 'homeFurnitureState1');
			tileSet[3] = map.addTilesetImage('homeFurnitureState2', 'homeFurnitureState2');
			tileSet[4] = map.addTilesetImage('homeSmallItems', 'homeSmallItems');
			const belowLayer = map.createLayer('BelowLayer', tileSet, 0, 0);
			const worldLayer = map.createLayer('WorldLayer', tileSet, 0, 0);
			const aboveLayer = map.createLayer('AboveLayer', tileSet, 0, 0);
			worldLayer.setCollisionByProperty({ collides: true }); // 충돌 타일 설정

			belowLayer.setDisplaySize(800, 600);
			worldLayer.setDisplaySize(800, 600);
			aboveLayer.setDisplaySize(800, 600);

			// 충돌 구역 표시
			const debugGraphics = this.add.graphics().setAlpha(0.75).setDepth(0);
			worldLayer.renderDebug(debugGraphics, {
				tileColor: null, // Color of non-colliding tiles
				collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
				faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
			});

			// 메인 카메라, UI 카메라 생성 및 설정
			this.cameras.main.setBounds(0, 0, 800, 600);
			const UICam = this.cameras.add(0, 0, 800, 600);
			this.cameras.main.setZoom(2);
			UICam.ignore([worldLayer, belowLayer, aboveLayer, this.physics.world.debugGraphic]);

			this.metaverse.state.players.onAdd = (player, sessionId) => {
				console.log('hi');
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
		} catch (error) {
			console.error('오브젝트 생성 에러', error);
		}

		try {
			// 플레이어 제거
			this.metaverse.state.players.onRemove = (player, sessionId) => {
				const entity = this.playerEntities[sessionId];
				const userName = this.userNames[sessionId];
				if (entity) {
					console.log('나간다잉');
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
		if (!this.metaverse) {
			return;
		}
		// loop를 돌기 때문에 onAdd()에서 this.currentPlayer를 초기화 하는 것 보다 빨리 접근할 수 있으므로 차단
		if (!this.currentPlayer) {
			return;
		}

		const entity = this.currentPlayer;

		// // 방향키 확인
		this.inputPayload.up = this.cursorKeys.up.isDown;
		this.inputPayload.down = this.cursorKeys.down.isDown;
		this.inputPayload.left = this.cursorKeys.left.isDown;
		this.inputPayload.right = this.cursorKeys.right.isDown;
		this.metaverse.send(0, this.inputPayload);

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
		// for (let sessionId in this.playerEntities) {
		//     const entity = this.playerEntities[sessionId];
		//     const {
		//         serverX,
		//         serverY,
		//         serverLeft,
		//         serverRight,
		//         serverUp,
		//         serverDown,
		//     } = entity.data.values;

		//     // 플레이어 이름 설정
		//     this.userNames[sessionId]
		//         .setAlign("center")
		//         .setOrigin(0.3, 1.2)
		//         .setPosition(entity.body.x, entity.body.y)
		//         .setFontSize(10);

		//     // do not interpolate the current player
		//     if (sessionId === this.metaverse.sessionId) {
		//         continue;
		//     }

		//     entity.body.x = Phaser.Math.Linear(entity.body.x, serverX, 0.2);
		//     entity.body.y = Phaser.Math.Linear(entity.body.y, serverY, 0.2);

		//     // 애니메이션 모션만 설정
		//     if (serverUp && serverLeft) {
		//         entity.anims.play("left", true);
		//     } else if (serverDown && serverLeft) {
		//         entity.anims.play("left", true);
		//     } else if (serverLeft) {
		//         entity.anims.play("left", true);
		//     } else if (serverUp && serverRight) {
		//         entity.anims.play("right", true);
		//     } else if (serverDown && serverRight) {
		//         entity.anims.play("right", true);
		//     } else if (serverRight) {
		//         entity.anims.play("right", true);
		//     } else if (serverUp) {
		//         entity.anims.play("up", true);
		//     } else if (serverDown) {
		//         entity.anims.play("down", true);
		//     }
		// }
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
