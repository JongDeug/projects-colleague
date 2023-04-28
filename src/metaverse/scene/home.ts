import Phaser from 'phaser';
import UIController from '../ui/uiController';
import Connection from '../interaction/connection';
import HomePlayer from '../util/homePlayer';

interface SceneItems {
    uiCam: Phaser.Cameras.Scene2D.Camera,
    belowLayer: Phaser.Tilemaps.TilemapLayer,
    worldLayer: Phaser.Tilemaps.TilemapLayer,
    aboveLayer: Phaser.Tilemaps.TilemapLayer,
}

export default class HomeScene extends Phaser.Scene {
    connection: Connection;
    uiController: UIController;
    homePlayer: HomePlayer;
    cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
    sceneItems: SceneItems
    updateStatus: boolean

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
            aboveLayer: null,
        }
        this.updateStatus = false;
    }

    init(data) {
        if (data.fromTo === "fromWaitingToHome") {
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
            this.sceneItems.worldLayer.setCollisionByProperty({collides: true}); // 충돌 타일 설정
            this.sceneItems.aboveLayer.setCollisionByProperty({collides: true}); // 충돌 타일 설정

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

            // 플레이어 애니메이션 생성
            this.createPlayerAnimation('down', 0, 2);
            this.createPlayerAnimation('up', 9, 11);
            this.createPlayerAnimation('left', 3, 5);
            this.createPlayerAnimation('right', 6, 8);

            // UI 생성
            this.uiController.create();
            this.uiController.event();
        } catch (error) {
            console.error('오브젝트 생성 에러', error);
        }


        // delete
        this.connection.room.onMessage("deleteWaitingPlayer", (sessionId) => {
            const entity = this.homePlayer.playerEntities[sessionId]
            const name = this.homePlayer.playerNames[sessionId];

            if (entity) {
                entity.setVisible(false);
                name.setVisible(false);
                delete this.homePlayer.playerEntities[sessionId];
                delete this.homePlayer.playerNames[sessionId];
            }
        })

        this.updateStatus = true
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
