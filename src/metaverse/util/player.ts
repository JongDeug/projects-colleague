import Phaser from 'phaser';
import type Connection from '../interaction/connection';

interface InputPayload {
    up: boolean,
    down: boolean,
    left: boolean,
    right: boolean,
}
export default class Player {
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
        let position = {
            x: this.currentPlayer.body.x,
            y: this.currentPlayer.body.y
        };
        this.connection.room.send('position', position);
    }

    // waiting -> home 이동
    async enterWaitingSceneToHomeScene() {
        for (let sessionId in this.playerEntities) {
            if (this.playerEntities[sessionId] == null) {
                continue;
            }
            const entity = this.playerEntities[sessionId];

            // HomeScene으로 이동
            if ((entity.body.x <= 590 && entity.body.x >= 574) &&
                (entity.body.y <= 123 && entity.body.y >= 120)) {
                // WaitingScene에서 플레이어 제거
                await this.playerEntities[sessionId].destroy();
                await this.playerNames[sessionId].destroy();
                delete this.playerEntities[sessionId];
                delete this.playerNames[sessionId];

                // 자신의 캐릭터만 이동
                if (sessionId === this.connection.room.sessionId) {
                    this.scene.scene.start('homeScene');
                    this.scene.scene.setActive(false, 'waitingScene');
                    return;
                }
            }
        }
    }

    // 다른 플레이어 동기화
    syncOtherPlayer() {
        for (let sessionId in this.playerEntities) {
            if (this.playerEntities[sessionId] == null) {
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
                .setAlign('center')
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
