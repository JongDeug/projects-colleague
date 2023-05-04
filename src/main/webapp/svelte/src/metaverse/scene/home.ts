import Phaser from 'phaser';
import UIController from '../ui/uiController';
import Connection from '../interaction/connection';
import HomePlayer from '../util/homePlayer';

interface SceneItems {
	uiCam: Phaser.Cameras.Scene2D.Camera;
	belowLayer: Phaser.Tilemaps.TilemapLayer;
	worldLayer: Phaser.Tilemaps.TilemapLayer;
	aboveLayer: Phaser.Tilemaps.TilemapLayer;
}

export default class HomeScene extends Phaser.Scene {
	connection: Connection;
	uiController: UIController;
	homePlayer: HomePlayer;
	cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
	sceneItems: SceneItems;
	updateStatus: boolean;

	constructor() {
		super('homeScene');

		this.connection = Connection.getInstance();
		this.uiController = new UIController(this, this.connection);
		this.homePlayer = new HomePlayer(this, this.connection);
		this.cursorKeys = null;
		this.sceneItems = {
			uiCam: null,
			belowLayer: null,
			worldLayer: null,
			aboveLayer: null
		};
		this.updateStatus = false;
	}

	init(data) {
		if (data.fromTo === 'fromWaitingToHome') {
			this.connection.room.send('enterHomeScene', 'homeScene');
		}
		// 작동 안되긴한데 돌아가게 하면 좋음.
		// setTimeout(() => {
		// console.log('hi')
		// }, 3000)
	}

	preload() {
		// 키보드
		this.cursorKeys = this.input.keyboard.createCursorKeys();
		// 플레이어
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
			tileSet[0] = map.addTilesetImage('homeTiles', 'homeTiles', 16, 16, 1, 2);
			tileSet[1] = map.addTilesetImage('homeDoors', 'homeDoors', 16, 16, 1, 2);
			tileSet[2] = map.addTilesetImage('homeFurnitureState1', 'homeFurnitureState1', 16, 16, 1, 2);
			tileSet[3] = map.addTilesetImage('homeFurnitureState2', 'homeFurnitureState2', 16, 16, 1, 2);
			tileSet[4] = map.addTilesetImage('homeSmallItems', 'homeSmallItems', 16, 16, 1, 2);
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
				this.physics.world.debugGraphic
				// debugGraphics
			]);

			// 플레이어 애니메이션 생성
			this.createPlayerAnimation('down00', 0, 2, 'character00');
			this.createPlayerAnimation('up00', 9, 11, 'character00');
			this.createPlayerAnimation('left00', 3, 5, 'character00');
			this.createPlayerAnimation('right00', 6, 8, 'character00');

			this.createPlayerAnimation('down01', 0, 2, 'character01');
			this.createPlayerAnimation('up01', 9, 11, 'character01');
			this.createPlayerAnimation('left01', 3, 5, 'character01');
			this.createPlayerAnimation('right01', 6, 8, 'character01');

			this.createPlayerAnimation('down02', 0, 2, 'character02');
			this.createPlayerAnimation('up02', 9, 11, 'character02');
			this.createPlayerAnimation('left02', 3, 5, 'character02');
			this.createPlayerAnimation('right02', 6, 8, 'character02');

			this.createPlayerAnimation('down03', 0, 2, 'character03');
			this.createPlayerAnimation('up03', 9, 11, 'character03');
			this.createPlayerAnimation('left03', 3, 5, 'character03');
			this.createPlayerAnimation('right03', 6, 8, 'character03');

			this.createPlayerAnimation('down04', 0, 2, 'character04');
			this.createPlayerAnimation('up04', 9, 11, 'character04');
			this.createPlayerAnimation('left04', 3, 5, 'character04');
			this.createPlayerAnimation('right04', 6, 8, 'character04');

			this.createPlayerAnimation('down05', 0, 2, 'character05');
			this.createPlayerAnimation('up05', 9, 11, 'character05');
			this.createPlayerAnimation('left05', 3, 5, 'character05');
			this.createPlayerAnimation('right05', 6, 8, 'character05');

			this.createPlayerAnimation('down06', 0, 2, 'character06');
			this.createPlayerAnimation('up06', 9, 11, 'character06');
			this.createPlayerAnimation('left06', 3, 5, 'character06');
			this.createPlayerAnimation('right06', 6, 8, 'character06');

			this.createPlayerAnimation('down07', 0, 2, 'character07');
			this.createPlayerAnimation('up07', 9, 11, 'character07');
			this.createPlayerAnimation('left07', 3, 5, 'character07');
			this.createPlayerAnimation('right07', 6, 8, 'character07');

			this.createPlayerAnimation('down08', 0, 2, 'character08');
			this.createPlayerAnimation('up08', 9, 11, 'character08');
			this.createPlayerAnimation('left08', 3, 5, 'character08');
			this.createPlayerAnimation('right08', 6, 8, 'character08');

			this.createPlayerAnimation('down09', 0, 2, 'character09');
			this.createPlayerAnimation('up09', 9, 11, 'character09');
			this.createPlayerAnimation('left09', 3, 5, 'character09');
			this.createPlayerAnimation('right09', 6, 8, 'character09');

			// UI 생성
			this.uiController.create();

			this.uiController.event();
			console.log(this.connection.chatDB);
			if (this.connection.chatDB != null) {
				this.uiController._uiContainer.chatUI.setText(this.connection.chatDB);
			}
		} catch (error) {
			console.error('오브젝트 생성 에러', error);
		}

		// delete
		this.connection.room.onMessage('deleteWaitingPlayer', (sessionId) => {
			const entity = this.homePlayer.playerEntities[sessionId];
			const name = this.homePlayer.playerNames[sessionId];

			if (entity) {
				entity.setVisible(false);
				name.setVisible(false);
				delete this.homePlayer.playerEntities[sessionId];
				delete this.homePlayer.playerNames[sessionId];
			}
		});

		this.updateStatus = true;
	}

	async update(time: number, delta: number): Promise<void> {
		if (this.connection.room == null) {
			return;
		}

		if (this.homePlayer.currentPlayer == null) {
			this.homePlayer.createCurrentPlayer(this.sceneItems);
			return;
		}
		// 방향키 확인
		this.homePlayer.inputPayload.up = this.cursorKeys.up.isDown;
		this.homePlayer.inputPayload.down = this.cursorKeys.down.isDown;
		this.homePlayer.inputPayload.left = this.cursorKeys.left.isDown;
		this.homePlayer.inputPayload.right = this.cursorKeys.right.isDown;
		this.connection.room.send('keyboard', this.homePlayer.inputPayload);

		this.homePlayer.createOtherPlayer(this.sceneItems);
		this.homePlayer.syncOtherPlayer();
		// 순서 중요
		this.homePlayer.moveCurrentPlayer();
		await this.homePlayer.enterWaitingScene();
	}

	createPlayerAnimation(key: string, start: number, end: number, img: string) {
		this.anims.create({
			key: key,
			frameRate: 15,
			frames: this.anims.generateFrameNumbers(img, {
				start: start,
				end: end
			}),
			repeat: 0
		});
	}
}
