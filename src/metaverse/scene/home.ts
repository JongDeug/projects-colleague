import Phaser from 'phaser';
import UIController from '../ui/uiController';
import Connection from '../interaction/connection';

interface InputPayload {
	up: boolean,
	down: boolean,
	left: boolean,
	right: boolean,
}

export class HomeScene extends Phaser.Scene {
	connection: Connection;
	uiController: UIController;
	currentPlayer: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
	cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
	inputPayload: InputPayload;
	playerEntities: { [sessionId: string]: any };
	playerNames: { [sessionId: string]: any };

	private UICam;
	private worldLayer;
	private aboveLayer;

	constructor() {
		super('homeScene');

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

	init(data) {
		this.connection.room.send('enterHomeScene', 'homeScene');
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
		// UI
		this.uiController.preload();
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
			const belowLayer = map.createLayer('BelowLayer', tileSet, 0, 0).setDepth(0);
			this.worldLayer = map.createLayer('WorldLayer', tileSet, 0, 0).setDepth(1);
			this.aboveLayer = map.createLayer('AboveLayer', tileSet, 0, 0).setDepth(3);
			this.worldLayer.setCollisionByProperty({ collides: true }); // 충돌 타일 설정
			this.aboveLayer.setCollisionByProperty({ collides: true }); // 충돌 타일 설정

			belowLayer.setDisplaySize(800, 600);
			this.worldLayer.setDisplaySize(800, 600);
			this.aboveLayer.setDisplaySize(800, 600);

			// 충돌 구역 표시
			const debugGraphics = this.add.graphics().setAlpha(0.75).setDepth(0);
			this.worldLayer.renderDebug(debugGraphics, {
				tileColor: null, // Color of non-colliding tiles
				collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
				faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
			});


			// 메인 카메라, UI 카메라 생성 및 설정
			this.cameras.main.setBounds(0, 0, 800, 600);
			this.UICam = this.cameras.add(0, 0, 800, 600);
			this.cameras.main.setZoom(2);
			this.UICam.ignore([
				this.worldLayer,
				belowLayer,
				this.aboveLayer,
				this.physics.world.debugGraphic,
				debugGraphics
			]);


			// 나를 먼저 만들기 // 브로드 캐스팅으로 위치 잡기
			this.playerEntities[this.connection.room.sessionId] = this.physics.add.sprite(300, 300, 'player').setSize(14, 20)
				.setScale(1.5, 1.5)
				.setDepth(2);
			this.playerNames[this.connection.room.sessionId] = this.add.text(-200, -200, this.connection.room.sessionId).setDepth(4);
			this.currentPlayer = this.playerEntities[this.connection.room.sessionId];

			
			this.cameras.main.startFollow(this.currentPlayer);
			// 플레이어와 충돌 타일간 설정
			this.physics.add.collider(this.playerEntities[this.connection.room.sessionId], this.worldLayer);
			this.physics.add.collider(this.playerEntities[this.connection.room.sessionId], this.aboveLayer);
			// 플레이어와 게임 전체 경계 충돌
			this.playerEntities[this.connection.room.sessionId].body.collideWorldBounds = true;
			// UICam에서 플레이어 제거
			this.UICam.ignore([this.playerEntities[this.connection.room.sessionId], this.playerNames[this.connection.room.sessionId]]);



			// UI 생성
			this.uiController.create();
			this.uiController.event();
		} catch (error) {
			console.error('오브젝트 생성 에러', error);
		}
	}

	update(time: number, delta: number): void {
		if (!this.connection.room) {
			return;
		}
		
		// 접속자 상태로 루프 돌리기
		for (const sessionId in this.connection.playerState) {
			const playerState = this.connection.playerState[sessionId];
			if (sessionId === this.connection.room.sessionId) {
				continue;
			}
			// 접속자가 homeScene에 있고, 접속자 엔티티가 존재하지 않을 때 생성.
			if (playerState.serverCurrentScene === 'homeScene' && !this.playerEntities[sessionId]) {
				this.playerEntities[sessionId] = this.physics.add.sprite(playerState.serverX, playerState.serverY, 'player').setSize(14, 20)
					.setScale(1.5, 1.5)
					.setDepth(2);
				this.playerNames[sessionId] = this.add.text(-200, -200, playerState.serverName).setDepth(4);

				// 플레이어와 충돌 타일간 설정
				this.physics.add.collider(this.playerEntities[sessionId], this.worldLayer);
				this.physics.add.collider(this.playerEntities[sessionId], this.aboveLayer);
				// 플레이어와 게임 전체 경계 충돌
				this.playerEntities[sessionId].body.collideWorldBounds = true;
				// UICam에서 플레이어 제거
				console.log(this.UICam);
				this.UICam.ignore([this.playerEntities[sessionId], this.playerNames[sessionId]]);

				// 내 플레이어 저장
				if (this.connection.room.sessionId === sessionId) {
					this.currentPlayer = this.playerEntities[sessionId];
				}
			}
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
		this.connection.room.send('keyboard', this.inputPayload);

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
		this.connection.room.send('position', position);

		// 이름 설정 및 다른 플레이어 위치 동기화
		for (let sessionId in this.playerEntities) {
			const entity = this.playerEntities[sessionId];
			const { serverX, serverY, serverLeft, serverRight, serverUp, serverDown } = this.connection.playerState[sessionId];

			// 플레이어 이름 설정
			this.playerNames[sessionId]
				.setAlign("center")
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
				entity.anims.play("left", true);
			} else if (serverDown && serverLeft) {
				entity.anims.play("left", true);
			} else if (serverLeft) {
				entity.anims.play("left", true);
			} else if (serverUp && serverRight) {
				entity.anims.play("right", true);
			} else if (serverDown && serverRight) {
				entity.anims.play("right", true);
			} else if (serverRight) {
				entity.anims.play("right", true);
			} else if (serverUp) {
				entity.anims.play("up", true);
			} else if (serverDown) {
				entity.anims.play("down", true);
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
