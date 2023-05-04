import Phaser from "phaser";
import type Connection from "../interaction/connection";
import type InputPayload from "./inputPayload";

export default class Player {
    protected _scene: Phaser.Scene;
    protected _connection: Connection
    protected _playerEntities: { [sessionId: string]: any };
    protected _playerNames: { [sessionId: string]: any };
    protected _currentPlayer: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    protected _inputPayload: InputPayload;

    protected constructor(scene: Phaser.Scene, connection: Connection) {
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
        const img = this.connection.playerState[this.connection.room.sessionId].serverImg;
        const playerNum = img.slice(9);

        if (this.inputPayload.up && this.inputPayload.left) {
            this.currentPlayer.body.setVelocityX(-velocity);
            this.currentPlayer.body.setVelocityY(-velocity);
            this.currentPlayer.anims.play('left' + playerNum, true);
        } else if (this.inputPayload.down && this.inputPayload.left) {
            this.currentPlayer.body.setVelocityX(-velocity);
            this.currentPlayer.body.setVelocityY(velocity);
            this.currentPlayer.anims.play('left' + playerNum, true);
        } else if (this.inputPayload.left) {
            this.currentPlayer.body.setVelocityX(-velocity);
            this.currentPlayer.anims.play('left' + playerNum, true);
        } else if (this.inputPayload.up && this.inputPayload.right) {
            this.currentPlayer.body.setVelocityX(velocity);
            this.currentPlayer.body.setVelocityY(-velocity);
            this.currentPlayer.anims.play('right' + playerNum, true);
        } else if (this.inputPayload.down && this.inputPayload.right) {
            this.currentPlayer.body.setVelocityX(velocity);
            this.currentPlayer.body.setVelocityY(velocity);
            this.currentPlayer.anims.play('right' + playerNum, true);
        } else if (this.inputPayload.right) {
            this.currentPlayer.body.setVelocityX(velocity);
            this.currentPlayer.anims.play('right' + playerNum, true);
        } else if (this.inputPayload.up) {
            // this.currentPlayer.setVelocityX(-velocity)
            this.currentPlayer.body.setVelocityY(-velocity);
            this.currentPlayer.anims.play('up' + playerNum, true);
        } else if (this.inputPayload.down) {
            this.currentPlayer.body.setVelocityY(velocity);
            this.currentPlayer.anims.play('down' + playerNum, true);
        }
        this.currentPlayer.body.velocity.normalize().scale(200); // velocity 가속 제거
        const position = {
            x: this.currentPlayer.body.x,
            y: this.currentPlayer.body.y
        };
        this.connection.room.send('position', position);
    }

    // 현재 플레이어 생성
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    createCurrentPlayer(sceneItems) {

    }

    // 다른 플레이어 생성
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    createOtherPlayer(sceneItems) {

    }

    // 다른 플레이어 동기화
    syncOtherPlayer() {
        for (const sessionId in this.playerEntities) {
            if (this.playerEntities[sessionId]?.body?.x == null) {
                // console.log(this.playerEntities)
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
                serverDown,
                serverImg,
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

            const playerNum = serverImg.slice(9);
            // 애니메이션 동기화
            if (serverUp && serverLeft) {
                entity.anims.play('left' + playerNum, true);
            } else if (serverDown && serverLeft) {
                entity.anims.play('left' + playerNum, true);
            } else if (serverLeft) {
                entity.anims.play('left' + playerNum, true);
            } else if (serverUp && serverRight) {
                entity.anims.play('right' + playerNum, true);
            } else if (serverDown && serverRight) {
                entity.anims.play('right' + playerNum, true);
            } else if (serverRight) {
                entity.anims.play('right' + playerNum, true);
            } else if (serverUp) {
                entity.anims.play('up' + playerNum, true);
            } else if (serverDown) {
                entity.anims.play('down' + playerNum, true);
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