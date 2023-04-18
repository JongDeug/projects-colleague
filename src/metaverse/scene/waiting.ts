import Phaser from 'phaser';
import UIController from '../ui/uiController';
import Connection from '../interaction/connection';
import type { Room } from 'colyseus.js';
import Player from '../util/player';

interface SceneItems {
	uiCam: Phaser.Cameras.Scene2D.Camera,
	belowLayer: Phaser.Tilemaps.TilemapLayer,
	worldLayer: Phaser.Tilemaps.TilemapLayer,
	aboveLayer: Phaser.Tilemaps.TilemapLayer,
}

export default class WaitingScene extends Phaser.Scene {
	connection: Connection;
	uiController: UIController;
	player: Player;
	cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
	sceneItems: SceneItems

	constructor() {
		super('waitingScene');

		this.connection = Connection.getInstance();
		this.uiController = new UIController(this, this.connection);
		this.player = new Player(this, this.connection);
		this.cursorKeys = null;
		this.sceneItems = {
			uiCam: null,
			belowLayer: null,
			worldLayer: null,
			aboveLayer: null,
		}
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
			this.sceneItems.belowLayer = map.createLayer('BelowLayer', tileSet, 0, 0).setDepth(0);
			this.sceneItems.worldLayer = map.createLayer('WorldLayer', tileSet, 0, 0).setDepth(1);
			this.sceneItems.aboveLayer = map.createLayer('AboveLayer', tileSet, 0, 0).setDepth(3);
			this.sceneItems.worldLayer.setCollisionByProperty({ collides: true }); // 충돌 타일 설정

			// 충돌 구역 표시
			const debugGraphics = this.add.graphics().setAlpha(0.75).setDepth(0);
			this.sceneItems.worldLayer.renderDebug(debugGraphics, {
				tileColor: null, // Color of non-colliding tiles
				collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
				faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
			});

			// 메인 카메라, UI 카메라 생성 및 설정
			this.cameras.main.setBounds(0, 0, 800, 600);
			this.sceneItems.uiCam = this.cameras.add(0, 0, 800, 600);
			this.cameras.main.setZoom(2);
			this.sceneItems.uiCam.ignore([
				this.sceneItems.worldLayer,
				this.sceneItems.belowLayer,
				this.sceneItems.aboveLayer,
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

		this.inAdapter();
		this.outAdapter();

	}

	// game loop
	async update(time: number, delta: number): Promise<void> {
		// update가 무한 루프기 때문에 컨트롤 필요.
		if (this.connection.room == null) {
			return;
		}
		if (this.player.currentPlayer == null) {
			return;
		}
		if (!this.scene.isActive('waitingScene')) {
			return;
		}

		this.player.inputPayload.up = this.cursorKeys.up.isDown;
		this.player.inputPayload.down = this.cursorKeys.down.isDown;
		this.player.inputPayload.left = this.cursorKeys.left.isDown;
		this.player.inputPayload.right = this.cursorKeys.right.isDown;
		this.connection.room.send('keyboard', this.player.inputPayload); // server에게 전송


		this.player.moveCurrentPlayer();
		this.player.syncOtherPlayer();
		await this.player.enterWaitingSceneToHomeScene();





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

	inAdapter() {
		try {
			this.connection.room.state.players.onAdd = (player, sessionId) => {
				// body
				this.player.playerEntities[sessionId] = this.physics.add
					.sprite(player.x, player.y, 'player', 0)
					.setSize(14, 20)
					.setScale(0.8, 0.75)
					.setDepth(2);
				// name
				this.player.playerNames[sessionId] = this.add.text(-200, -200, player.name).setDepth(4);

				// current player
				if (sessionId === this.connection.room.sessionId) {
					this.player.currentPlayer = this.player.playerEntities[sessionId];
					this.cameras.main.startFollow(this.player.currentPlayer);
				}

				// 서버로부터 player 상태 receive
				player.onChange = () => {
					this.connection.playerState[sessionId] = {
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

				// 플레이어와 충돌 타일간 설정
				this.physics.add.collider(this.player.playerEntities[sessionId], this.sceneItems.worldLayer);
				// 플레이어와 게임 전체 경계 충돌
				this.player.playerEntities[sessionId].body.collideWorldBounds = true;
				// UICam에서 플레이어 제거
				this.sceneItems.uiCam.ignore([this.player.playerEntities[sessionId], this.player.playerNames[sessionId]]);
			};
		} catch (error) {
			console.log('onAdd 에러', error);
		}

	}

	outAdapter() {
		try {
			this.connection.room.state.players.onRemove = (player, sessionId) => {
				const entity = this.player.playerEntities[sessionId];
				const playerNames = this.player.playerNames[sessionId];
				if (entity) {
					// destroy entity
					entity.destroy();
					playerNames.destroy();
					// clear local reference
					delete this.connection.playerState[sessionId]; // 플레이어 상태 제거
					delete this.player.playerEntities[sessionId];
					delete this.player.playerNames[sessionId];
				}
			};
		} catch (error) {
			console.error('onRemove 에러: ', error);
		}
	}
}
