import Phaser from 'phaser';
import type Player from './player';
import type Connection from '../interaction/connection';
import type InputPayload from './inputPayload';

export default class WaitingPlayer implements Player {
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

    createCurrentPlayer(sceneItems) {
        // player 생성
        const sessionId = this.connection.room.sessionId;
        const x = this.connection.playerState[sessionId].serverX;
        const y = this.connection.playerState[sessionId].serverY;
        const name = this.connection.playerState[sessionId].serverName;
        const currentScene = this.connection.playerState[sessionId].serverCurrentScene;
        if (currentScene === "homeScene") {
            return;
        }
        this.playerEntities[sessionId] = this.scene.physics.add
            .sprite(x, y, 'player', 0)
            .setSize(14, 20)
            .setScale(0.8, 0.75)
            .setDepth(2);
        // name
        this.playerNames[sessionId] = this.scene.add.text(-200, -200, name).setDepth(2);

        // current player
        if (sessionId === this.connection.room.sessionId) {
            this.currentPlayer = this.playerEntities[sessionId];
            this.scene.cameras.main.startFollow(this.currentPlayer);
        }

        // 플레이어와 충돌 타일간 설정
        this.scene.physics.add.collider(this.playerEntities[sessionId], sceneItems.worldLayer);
        // 플레이어와 게임 전체 경계 충돌
        this.playerEntities[sessionId].body.collideWorldBounds = true;
        // UICam에서 플레이어 제거
        sceneItems.uiCam.ignore([this.playerEntities[sessionId], this.playerNames[sessionId]]);
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
            // this.currentPlayer.setVelocityX(-velocity)
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

    // waiting -> home 이동
    async enterHomeScene() {
        for (const sessionId in this.playerEntities) {
            if (this.playerEntities[sessionId]?.body?.x == null) {
                continue;
            }

            const entity = this.playerEntities[sessionId];

            // HomeScene으로 이동
            if ((entity.body.x <= 590 && entity.body.x >= 574) &&
                (entity.body.y <= 123 && entity.body.y >= 120)) {
                console.log('bye');
                // WaitingScene에서 플레이어 제거
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
                    this.scene.scene.start('homeScene', {fromTo: 'fromWaitingToHome'});
                    return;
                }
            }

            // 다른 플레이어가 봤을 때 entity.body.x 범위에 들어가지 않는 버그가 있어서 추가함.
            if (this.connection.playerState[sessionId].serverCurrentScene === "homeScene") {
                if (this.playerEntities[sessionId]) {
                    this.playerEntities[sessionId].destroy();
                    this.playerNames[sessionId].destroy();
                    delete this.playerEntities[sessionId];
                    delete this.playerNames[sessionId];
                }
            }
        }
    }

    // 다른 플레이어 생성
    createOtherPlayer(sceneItems: any) {
        for (const sessionId in this.connection.playerState) {
            const playerState = this.connection.playerState[sessionId];

            // 나는 생성하지 않음.
            if (sessionId === this.connection.room.sessionId && playerState == null) {
                continue;
            }

            if (playerState.serverCurrentScene === 'waitingScene' && !this.playerEntities[sessionId]) {
                this.playerEntities[sessionId] = this.scene.physics.add
                    .sprite(playerState.serverX, playerState.serverY, 'player')
                    .setSize(14, 20)
                    .setScale(0.8, 0.75)
                    .setDepth(2);
                this.playerNames[sessionId] = this.scene.add.text(-200, -200, playerState.serverName).setDepth(2);

                // 플레이어와 충돌 타일간 설정
                this.scene.physics.add.collider(this.playerEntities[sessionId], sceneItems.worldLayer);
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

    // 다른 플레이어 동기화
    syncOtherPlayer() {
        for (const sessionId in this.playerEntities) {
            if (this.playerEntities[sessionId]?.body?.x == null) {
                console.log(this.playerEntities)
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

            // 이름
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
