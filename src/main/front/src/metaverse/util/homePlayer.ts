import type Phaser from 'phaser';
import Player from './player';
import type Connection from '../interaction/connection';

export default class HomePlayer extends Player {

    constructor(scene: Phaser.Scene, connection: Connection) {
        super(scene, connection);
    }

    // 현재 플레이어 생성
    override createCurrentPlayer(sceneItems) {
        // 함수로 묶을 거
        // 나를 먼저 만들기 // 브로드 캐스팅으로 위치 잡기
        const sessionId = this.connection.room.sessionId;
        const x = this.connection.playerState[sessionId].serverX;
        const y = this.connection.playerState[sessionId].serverY;
        const img = this.connection.playerState[sessionId].serverImg;
        const name = this.connection.playerState[sessionId].serverName;
        const currentScene = this.connection.playerState[sessionId].serverCurrentScene;
        if (currentScene === "waitingScene") {
            return;
        }
        this.playerEntities[sessionId] = this.scene.physics.add
            .sprite(x, y, img).setSize(14, 20)
            .setScale(1.3, 1.3)
            .setDepth(2);
        this.playerNames[sessionId] = this.scene.add.text(-200, -200, name).setDepth(2);

        if (sessionId === this.connection.room.sessionId) {
            this.currentPlayer = this.playerEntities[sessionId];
            this.scene.cameras.main.startFollow(this.currentPlayer);
        }

        // 플레이어와 충돌 타일간 설정
        this.scene.physics.add.collider(this.playerEntities[this.connection.room.sessionId], sceneItems.worldLayer);
        this.scene.physics.add.collider(this.playerEntities[this.connection.room.sessionId], sceneItems.aboveLayer);
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
            if (playerState.serverCurrentScene === 'homeScene' && !this.playerEntities[sessionId]?.active) {
                this.playerEntities[sessionId] = this.scene.physics.add
                    .sprite(playerState.serverX, playerState.serverY, playerState.serverImg)
                    .setSize(14, 20)
                    .setScale(1.3, 1.3)
                    .setDepth(2);
                this.playerNames[sessionId] = this.scene.add.text(-200, -200, playerState.serverName).setDepth(4);

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
            if ((entity.body.x <= 718.64 && entity.body.x >= 698.4) &&
                (entity.body.y == 240)) {

                this.playerEntities[sessionId].destroy();
                this.playerNames[sessionId].destroy();
                delete this.playerEntities[sessionId];
                delete this.playerNames[sessionId];

                // 자신의 캐릭터만 이동
                if (sessionId === this.connection.room.sessionId) {
                    this.currentPlayer = null;

                    this.scene.anims.remove('down00')
                    this.scene.anims.remove('up00')
                    this.scene.anims.remove('right00')
                    this.scene.anims.remove('left00')

                    this.scene.anims.remove('down01')
                    this.scene.anims.remove('up01')
                    this.scene.anims.remove('right01')
                    this.scene.anims.remove('left01')

                    this.scene.anims.remove('down02')
                    this.scene.anims.remove('up02')
                    this.scene.anims.remove('right02')
                    this.scene.anims.remove('left02')

                    this.scene.anims.remove('down03')
                    this.scene.anims.remove('up03')
                    this.scene.anims.remove('right03')
                    this.scene.anims.remove('left03')

                    this.scene.anims.remove('down04')
                    this.scene.anims.remove('up04')
                    this.scene.anims.remove('right04')
                    this.scene.anims.remove('left04')

                    this.scene.anims.remove('down05')
                    this.scene.anims.remove('up05')
                    this.scene.anims.remove('right05')
                    this.scene.anims.remove('left05')

                    this.scene.anims.remove('down06')
                    this.scene.anims.remove('up06')
                    this.scene.anims.remove('right06')
                    this.scene.anims.remove('left06')

                    this.scene.anims.remove('down07')
                    this.scene.anims.remove('up07')
                    this.scene.anims.remove('right07')
                    this.scene.anims.remove('left07')

                    this.scene.anims.remove('down08')
                    this.scene.anims.remove('up08')
                    this.scene.anims.remove('right08')
                    this.scene.anims.remove('left08')

                    this.scene.anims.remove('down09')
                    this.scene.anims.remove('up09')
                    this.scene.anims.remove('right09')
                    this.scene.anims.remove('left09')

                    this.scene.scene.start('waitingScene', {fromTo: "fromHomeToWaiting"});
                    return;
                }
            }

            // 다른 플레이어가 봤을 때 entity.body.x 범위에 들어가지 않는 버그가 있어서 추가함.
            if (this.connection.playerState[sessionId].serverCurrentScene === "waitingScene") {
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

