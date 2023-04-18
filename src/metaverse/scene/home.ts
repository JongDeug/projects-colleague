import Phaser from 'phaser';
import UIController from '../ui/uiController';
import Connection from '../interaction/connection';
import Player from '../util/player';

interface SceneItems {
	uiCam: Phaser.Cameras.Scene2D.Camera,
	belowLayer: Phaser.Tilemaps.TilemapLayer,
	worldLayer: Phaser.Tilemaps.TilemapLayer,
	aboveLayer: Phaser.Tilemaps.TilemapLayer,
}

export default class HomeScene extends Phaser.Scene {
	connection: Connection;
	uiController: UIController;
	player: Player
	cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
	sceneItems: SceneItems

	constructor() {
		super('homeScene');

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

	init() {
		this.connection.room.send('enterHomeScene', 'homeScene');
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
		this.load.image('homeTiles', 'assets/homeTiles.png');
		this.load.image('homeDoors', 'assets/homeDoors.png');
		this.load.image('homeFurnitureState1', './assets/homeFurnitureState1.png');
		this.load.image('homeFurnitureState2', './assets/homeFurnitureState2.png');
		this.load.image('homeSmallItems', 'assets/homeSmallItems.png');
		this.load.tilemapTiledJSON('home', 'assets/home.json');
		// UI
		this.uiController.preload();
	}

	create() {
		// 생성
		try {
			// 맵 생성
			const map = this.make.tilemap({
				key: 'home'
			});
			const tileSet = [];
			tileSet[0] = map.addTilesetImage('homeTiles', 'homeTiles');
			tileSet[1] = map.addTilesetImage('homeDoors', 'homeDoors');
			tileSet[2] = map.addTilesetImage('homeFurnitureState1', 'homeFurnitureState1');
			tileSet[3] = map.addTilesetImage('homeFurnitureState2', 'homeFurnitureState2');
			tileSet[4] = map.addTilesetImage('homeSmallItems', 'homeSmallItems');
			this.sceneItems.belowLayer = map.createLayer('BelowLayer', tileSet, 0, 0).setDepth(0);
			this.sceneItems.worldLayer = map.createLayer('WorldLayer', tileSet, 0, 0).setDepth(1);
			this.sceneItems.aboveLayer = map.createLayer('AboveLayer', tileSet, 0, 0).setDepth(3);
			this.sceneItems.worldLayer.setCollisionByProperty({ collides: true }); // 충돌 타일 설정
			this.sceneItems.aboveLayer.setCollisionByProperty({ collides: true }); // 충돌 타일 설정

			this.sceneItems.belowLayer.setDisplaySize(800, 600);
			this.sceneItems.worldLayer.setDisplaySize(800, 600);
			this.sceneItems.aboveLayer.setDisplaySize(800, 600);

			// 충돌 구역 표시
			// const debugGraphics = this.add.graphics().setAlpha(0.75).setDepth(0);
			// this.sceneItems.worldLayer.renderDebug(debugGraphics, {
			// 	tileColor: null, // Color of non-colliding tiles
			// 	collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
			// 	faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
			// });

			// 메인 카메라, UI 카메라 생성 및 설정
			this.cameras.main.setBounds(0, 0, 800, 600);
			this.sceneItems.uiCam = this.cameras.add(0, 0, 800, 600);
			this.cameras.main.fadeIn(2000);
			this.sceneItems.uiCam.fadeIn(2000);
			this.cameras.main.setZoom(2);
			this.sceneItems.uiCam.ignore([
				this.sceneItems.worldLayer,
				this.sceneItems.belowLayer,
				this.sceneItems.aboveLayer,
				this.physics.world.debugGraphic,
				// debugGraphics
			]);


			// 함수로 묶을 거
			// 나를 먼저 만들기 // 브로드 캐스팅으로 위치 잡기 
			this.player.playerEntities[this.connection.room.sessionId] = this.physics.add.sprite(this.connection.playerState[this.connection.room.sessionId].serverX, this.connection.playerState[this.connection.room.sessionId].serverY, 'player').setSize(14, 20)
				.setScale(1.3, 1.3)
				.setDepth(2);
			this.player.playerNames[this.connection.room.sessionId] = this.add.text(-200, -200, this.connection.room.sessionId).setDepth(4);
			this.player.currentPlayer = this.player.playerEntities[this.connection.room.sessionId];
			this.cameras.main.startFollow(this.player.currentPlayer);


			// 플레이어와 충돌 타일간 설정
			this.physics.add.collider(this.player.playerEntities[this.connection.room.sessionId], this.sceneItems.worldLayer);
			this.physics.add.collider(this.player.playerEntities[this.connection.room.sessionId], this.sceneItems.aboveLayer);
			// 플레이어와 게임 전체 경계 충돌
			this.player.playerEntities[this.connection.room.sessionId].body.collideWorldBounds = true;
			// UICam에서 플레이어 제거
			this.sceneItems.uiCam.ignore([this.player.playerEntities[this.connection.room.sessionId], this.player.playerNames[this.connection.room.sessionId]]);

			// UI 생성
			this.uiController.create();
			this.uiController.event();
		} catch (error) {
			console.error('오브젝트 생성 에러', error);
		}
	}

	update(time: number, delta: number): void {
		if (this.connection.room == null) {
			return;
		}
		if (this.player.currentPlayer == null) {
			return;
		}

		// 함수로 묶을 거
		// 접속자 상태로 루프 돌리기
		for (const sessionId in this.connection.playerState) {
			const playerState = this.connection.playerState[sessionId];
			if (sessionId === this.connection.room.sessionId) {
				continue;
			}
			// 접속자가 homeScene에 있고, 접속자 엔티티가 존재하지 않을 때 생성.
			if (playerState.serverCurrentScene === 'homeScene' && !this.player.playerEntities[sessionId]) {
				this.player.playerEntities[sessionId] = this.physics.add.sprite(playerState.serverX, playerState.serverY, 'player').setSize(14, 20)
					.setScale(1.3, 1.3)
					.setDepth(2);
				this.player.playerNames[sessionId] = this.add.text(-200, -200, playerState.serverName).setDepth(4);

				// 플레이어와 충돌 타일간 설정
				this.physics.add.collider(this.player.playerEntities[sessionId], this.sceneItems.worldLayer);
				this.physics.add.collider(this.player.playerEntities[sessionId], this.sceneItems.aboveLayer);
				// 플레이어와 게임 전체 경계 충돌
				this.player.playerEntities[sessionId].body.collideWorldBounds = true;
				// UICam에서 플레이어 제거
				this.sceneItems.uiCam.ignore([this.player.playerEntities[sessionId], this.player.playerNames[sessionId]]);

				// 내 플레이어 저장
				if (this.connection.room.sessionId === sessionId) {
					this.player.currentPlayer = this.player.playerEntities[sessionId];
				}
			}
		}

		// 방향키 확인
		this.player.inputPayload.up = this.cursorKeys.up.isDown;
		this.player.inputPayload.down = this.cursorKeys.down.isDown;
		this.player.inputPayload.left = this.cursorKeys.left.isDown;
		this.player.inputPayload.right = this.cursorKeys.right.isDown;
		this.connection.room.send('keyboard', this.player.inputPayload);


		this.player.moveCurrentPlayer();
		this.player.syncOtherPlayer();
	}



	// waitingScene에서 만들어서 안만들어도 되나 봄.
	// createPlayerAnimation(key: string, start: number, end: number) {
	// 	this.anims.create({
	// 		key: key,
	// 		frameRate: 15,
	// 		frames: this.anims.generateFrameNumbers('player', {
	// 			start: start,
	// 			end: end
	// 		}),
	// 		repeat: 0
	// 	});
	// }
}
