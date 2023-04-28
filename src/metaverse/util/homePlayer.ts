import Phaser from 'phaser';
import type Player from './player';
import type Connection from '../interaction/connection';
import type InputPayload from './inputPayload';

export default class HomePlayer implements Player {
    private _scene: Phaser.Scene;
    private _connection: Connection
    private _playerEntities: { [sessionId: string]: any };
    private _playerNames: { [sessionId: string]: any };
    private _currentPlayer: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private _inputPayload: InputPayload;

    constructor(scene: Phaser.Scene, connection: Connection) {
        this.scene = scene;
        this.connection = connection;
        this.playerEntities = {};
        this.playerNames = {};
        this.currentPlayer = null;
        this.inputPayload = {
            left: false,
            right: false,
            up: false,
            down: false,
        }
    }

    // 내 캐릭터 이동  (상,좌 / 하,좌는 left 애니메이션 모션) (상,우 / 하,우는 right 애니메이션 모션)
    moveCurrentPlayer() {
        // console.log(this._id);
        // console.log(this.currentPlayer.body);
        const velocity = 2;
        this.currentPlayer.body.setVelocity(0);
        if (this.inputPayload.up && this.inputPayload.left) {
            this.currentPlayer.body.setVelocityX(-velocity);
            this.currentPlayer.body.setVelocityY(-velocity);
            this.currentPlayer.anims.play('left', true);
        } else if (this.inputPayload.down && this.inputPayload.left) {
            this.currentPlayer.body.setVelocityX(-velocity);
            this.currentPlayer.body.setVelocityY(velocity);
            this.currentPlayer.anims.play('left', true);
        } else if (this.inputPayload.left) {
            this.currentPlayer.body.setVelocityX(-velocity);
            this.currentPlayer.anims.play('left', true);
        } else if (this.inputPayload.up && this.inputPayload.right) {
            this.currentPlayer.body.setVelocityX(velocity);
            this.currentPlayer.body.setVelocityY(-velocity);
            this.currentPlayer.anims.play('right', true);
        } else if (this.inputPayload.down && this.inputPayload.right) {
            this.currentPlayer.body.setVelocityX(velocity);
            this.currentPlayer.body.setVelocityY(velocity);
            this.currentPlayer.anims.play('right', true);
        } else if (this.inputPayload.right) {
            this.currentPlayer.body.setVelocityX(velocity);
            this.currentPlayer.anims.play('right', true);
        } else if (this.inputPayload.up) {
            this.currentPlayer.body.setVelocityY(-velocity);
            this.currentPlayer.anims.play('up', true);
        } else if (this.inputPayload.down) {
            this.currentPlayer.body.setVelocityY(velocity);
            this.currentPlayer.anims.play('down', true);
        }
        this.currentPlayer.body.velocity.normalize().scale(200); // velocity 가속 제거
        const position = {
            x: this.currentPlayer.body.x,
            y: this.currentPlayer.body.y
        };
        this.connection.room.send('position', position);
    }


    // 다른 플레이어 생성
    createOtherPlayer(sceneItems: any) {
        for (const sessionId in this.connection.playerState) {
            const playerState = this.connection.playerState[sessionId];

            if (sessionId === this.connection.room.sessionId && playerState == null) {
                console.log('here')
                continue;
            }

            // 접속자가 homeScene에 있고, 접속자 엔티티가 존재하지 않을 때 생성.
            if (playerState.serverCurrentScene === 'homeScene' && !this.playerEntities[sessionId]) {
                this.playerEntities[sessionId] = this.scene.physics.add
                    .sprite(playerState.serverX, playerState.serverY, 'player')
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

                // 내 플레이어 저장
                if (this.connection.room.sessionId === sessionId) {
                    this.currentPlayer = this.playerEntities[sessionId];
                }

                console.log(this.playerEntities);
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
                    this.scene.anims.remove('down')
                    this.scene.anims.remove('up')
                    this.scene.anims.remove('right')
                    this.scene.anims.remove('left')
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

    createCurrentPlayer(sceneItems) {
        // 함수로 묶을 거
        // 나를 먼저 만들기 // 브로드 캐스팅으로 위치 잡기
        const sessionId = this.connection.room.sessionId;
        const x = this.connection.playerState[sessionId].serverX;
        const y = this.connection.playerState[sessionId].serverY;
        const name = this.connection.playerState[sessionId].serverName;
        const currentScene = this.connection.playerState[sessionId].serverCurrentScene;
        if (currentScene === "waitingScene") {
            return;
        }
        this.playerEntities[sessionId] = this.scene.physics.add
            .sprite(x, y, 'player').setSize(14, 20)
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

    // 다른 플레이어 동기화
    syncOtherPlayer() {
        for (const sessionId in this.playerEntities) {
            // Optional Chaining
            if (this.playerEntities[sessionId]?.body?.x == null) {
                continue;
            }
            if (this.connection.playerState[sessionId] == null) {
                continue;
            }

            const entity = this.playerEntities[sessionId];
            const {
                serverX,
                serverY,
                serverLeft,
                serverRight,
                serverUp,
                serverDown
            } = this.connection.playerState[sessionId];

            // 이름, 내 플레이어가 없어진줄 모름.
            this.playerNames[sessionId]
                .setOrigin(0.3, 1.2)
                .setPosition(entity.body.x, entity.body.y)
                .setFontSize(10);


            // 내 캐릭터까지 동기화할 필요 없음.
            if (sessionId === this.connection.room.sessionId) {
                continue;
            }

            // 위치 동기화
            entity.body.x = Phaser.Math.Linear(entity.body.x, serverX, 0.2);
            entity.body.y = Phaser.Math.Linear(entity.body.y, serverY, 0.2);

            // 애니메이션 동기화
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


    public get scene() {
        return this._scene;
    }

    public set scene(scene) {
        this._scene = scene;
    }

    public get connection() {
        return this._connection;
    }

    public set connection(connection) {
        this._connection = connection;
    }

    public get playerEntities() {
        return this._playerEntities;
    }

    public set playerEntities(playerEntites) {
        this._playerEntities = playerEntites;
    }

    public get playerNames() {
        return this._playerNames;
    }

    public set playerNames(playerNames) {
        this._playerNames = playerNames;
    }

    public get currentPlayer() {
        return this._currentPlayer;
    }

    public set currentPlayer(currentPlayer) {
        this._currentPlayer = currentPlayer;
    }

    public get inputPayload() {
        return this._inputPayload;
    }

    public set inputPayload(inputPaylaod) {
        this._inputPayload = inputPaylaod;
    }
}

