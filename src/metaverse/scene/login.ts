import Phaser from "phaser";
import Connection from "../interaction/connection";
import WebFontLoader from 'phaser3-rex-plugins/plugins/webfontloader.js';
import {PerspectiveCarousel} from 'phaser3-rex-plugins/plugins/perspectiveimage.js';
import {PerspectiveCard} from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import {Client} from "colyseus.js";


export default class LoginScene extends Phaser.Scene {
    connection: Connection;
    cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
    playerImg: any;

    constructor() {
        super('loginScene');

        this.connection = Connection.getInstance();
        this.cursorKeys = null;
        this.playerImg = 'character00';
    }

    preload() {
        // 키보드
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.load.image('user', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/person.png');
        this.load.image('password', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/key.png');

        this.load.spritesheet('character00', '/assets/Character_000.png', {
            frameWidth: 24,
            frameHeight: 24
        });
        this.load.spritesheet('character01', '/assets/Character_001.png', {
            frameWidth: 24,
            frameHeight: 24
        });
        this.load.spritesheet('character02', '/assets/Character_002.png', {
            frameWidth: 24,
            frameHeight: 24
        });
        this.load.spritesheet('character03', '/assets/Character_003.png', {
            frameWidth: 24,
            frameHeight: 24
        });
        this.load.spritesheet('character04', '/assets/Character_004.png', {
            frameWidth: 24,
            frameHeight: 24
        });
        this.load.spritesheet('character05', '/assets/Character_005.png', {
            frameWidth: 24,
            frameHeight: 24
        });
        this.load.spritesheet('character06', '/assets/Character_006.png', {
            frameWidth: 24,
            frameHeight: 24
        });
        this.load.spritesheet('character07', '/assets/Character_007.png', {
            frameWidth: 24,
            frameHeight: 24
        });
        this.load.spritesheet('character08', '/assets/Character_008.png', {
            frameWidth: 24,
            frameHeight: 24
        });
        this.load.spritesheet('character09', '/assets/Character_009.png', {
            frameWidth: 24,
            frameHeight: 24
        });
        WebFontLoader.call(this.load, {
            google: {
                families: ['Pacifico']
            }
        });

        this.load.image('backgroundImage', '/assets/background.png');
    }

    async create() {

        const COLOR_PRIMARY = 0xb18466;
        const COLOR_LIGHT = 0xead2aa;
        const COLOR_DARK = 0x260e04;

        this.add.image(400, 300, 'backgroundImage').setOrigin(0.5, 0.5).setScale(2.5, 2.5);
        this.add.text(400, 90, 'JoinUs', {
            fontFamily: 'Pacifico',
            fontSize: '80px',
        }).setOrigin(0.5, 0.5).setTint(COLOR_DARK);
        // const print = this.add.text(0, 0, '');
        // this.add.tween(main.to( { y: 245 }, 2400, Phaser.Easing.Bounce.Out, true);

        const x = 400;
        const y = 450;
        const title = 'Create User';
        let username = '이름';
        let password = '1234';

        const markPassword = (password) => {
            return new Array(password.length + 1).join('•');
        };

        const background = this.rexUI.add.roundRectangle(0, 0, 10, 10, 10, COLOR_DARK);
        const titleField = this.add.text(0, 0, title).setTint(COLOR_LIGHT);
        const userNameField = this.rexUI.add.label({
            orientation: 'x',
            background: this.rexUI.add.roundRectangle(0, 0, 10, 10, 10).setStrokeStyle(2, COLOR_PRIMARY),
            icon: this.add.image(0, 0, 'user').setTint(COLOR_LIGHT),
            text: this.rexUI.add.BBCodeText(0, 0, username, {
                fixedWidth: 150,
                fixedHeight: 36,
                valign: 'center'
            }).setTint(COLOR_LIGHT),
            space: {top: 5, bottom: 5, left: 5, right: 5, icon: 10,}
        }).setInteractive();

        const passwordField = this.rexUI.add.label({
            orientation: 'x',
            background: this.rexUI.add.roundRectangle(0, 0, 10, 10, 10).setStrokeStyle(2, COLOR_PRIMARY),
            icon: this.add.image(0, 0, 'password').setTint(COLOR_LIGHT),
            text: this.rexUI.add.BBCodeText(0, 0, markPassword(password), {
                fixedWidth: 150,
                fixedHeight: 36,
                valign: 'center'
            }).setTint(COLOR_LIGHT),
            space: {top: 5, bottom: 5, left: 5, right: 5, icon: 10,}
        }).setInteractive();

        const loginButton = this.rexUI.add.label({
            orientation: 'x',
            background: this.rexUI.add.roundRectangle(0, 0, 10, 10, 10, COLOR_PRIMARY),
            text: this.add.text(0, 0, 'Login').setTint(COLOR_LIGHT),
            space: {top: 8, bottom: 8, left: 8, right: 8}
        })
            .setInteractive()
            .on('pointerdown', async () => {
                loginDialog.emit('login', username, password, this.playerImg);
            });

        const loginDialog = this.rexUI.add.sizer({
            orientation: 'y',
            x: x,
            y: y,
            width: 300,
            height: undefined,
        })
            .addBackground(background)
            .add(titleField, 0, 'center', {top: 10, bottom: 10, left: 10, right: 10}, false)
            .add(userNameField, 0, 'left', {bottom: 10, left: 10, right: 10}, true)
            .add(passwordField, 0, 'left', {bottom: 10, left: 10, right: 10}, true)
            .add(loginButton, 0, 'center', {bottom: 10, left: 10, right: 10}, false)
            .layout();


        // carousel
        const CreateFrontFace = (scene, key) => {
            return scene.rexUI.add.label({
                orientation: 1,
                background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_PRIMARY).setStrokeStyle(2, COLOR_LIGHT),
                icon: this.add.sprite(0, 0, key, 0).setScale(4, 4),
                space: {left: 20, right: 20, top: 10, bottom: 30,}
            })
        }

        const CreateBackFace = (scene) => {
            return scene.rexUI.add.label({
                orientation: 1,
                background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_DARK).setStrokeStyle(2, COLOR_PRIMARY),
                space: {left: 20, right: 20, top: 10, bottom: 30,}
            })
        }

        const CreatePerspectiveCard = (scene, key) => {
            return new PerspectiveCard(this, {
                front: CreateFrontFace(scene, key),
                back: CreateBackFace(scene),
                face: 'back',
                snapshotPadding: 3,

                flip: {
                    frontToBack: 'right',
                    backToFront: 'left',
                    duration: 1000,
                    ease: 'Cubic'
                }
            }).layout();
        }

        const faces = [];
        faces.push(CreatePerspectiveCard(this, 'character00'));
        faces.push(CreatePerspectiveCard(this, 'character01'));
        faces.push(CreatePerspectiveCard(this, 'character02'));
        faces.push(CreatePerspectiveCard(this, 'character03'));
        faces.push(CreatePerspectiveCard(this, 'character04'));
        faces.push(CreatePerspectiveCard(this, 'character05'));
        faces.push(CreatePerspectiveCard(this, 'character06'));
        faces.push(CreatePerspectiveCard(this, 'character07'));
        faces.push(CreatePerspectiveCard(this, 'character08'));
        faces.push(CreatePerspectiveCard(this, 'character09'));

        const carousel = new PerspectiveCarousel(this, {
            x: 400, y: 230,
            faces: faces,
            faceSpace: 80, // face간 간격
            width: 600
        })
        // this.add.existing(carousel);

        // this.add.graphics({
        //     lineStyle: {
        //         width: 3,
        //         color: 0xff0000,
        //         alpha: 1
        //     }
        // })
        //     .strokeRect(
        //         400 - (carousel.width / 2),
        //         230 - (carousel.height / 2),
        //         carousel.width,
        //         carousel.height
        //     )
        //     .setDepth(1)


        // // event
        loginDialog.on('login', async (username, password, playerImg) => {
            const connected = await this.connection.connect(this.connection.teamId, username, password, playerImg);

            if (connected) {
                // OnAdd
                this.connection.room.state.players.onAdd = (player, sessionId) => {
                    player.onChange = () => {
                        this.connection.playerState[sessionId] = {
                            serverX: player.x,
                            serverY: player.y,
                            serverLeft: player.left,
                            serverRight: player.right,
                            serverUp: player.up,
                            serverDown: player.down,
                            serverCurrentScene: player.currentScene,
                            serverName: player.name,
                            serverImg: player.img
                        }
                    };
                }
                // onRemove
                this.connection.room.state.players.onRemove = (player, sessionId) => {
                    delete this.connection.playerState[sessionId]; // 플레이어 상태 제거
                    this.connection.room.send('deletePlayer', sessionId);
                };

                this.scene.start("waitingScene");
            }
        })
            // .drawBounds(this.add.graphics(), 0xff0000)
            .popUp(500);


        userNameField.on('pointerdown', () => {
            this.rexUI.edit(userNameField.getElement('text'), {
                onTextChanged(textObject, text) {
                    console.log(username);
                    username = text;
                    textObject.text = text;
                }
            });
        })

        passwordField.on('pointerdown', () => {
            this.rexUI.edit(passwordField.getElement('text'), {
                type: 'password',
                text: 'password',
                onTextChanged(textObject, text) {
                    password = text;
                    textObject.text = markPassword(password);
                }
            });
        })


        // carousel
        carousel.setInteractive()
            .on('pointerdown', (pointer, localX, localY, event) => {
                if (localX <= (carousel.width / 2)) {
                    carousel.roll.toLeft();
                } else {
                    carousel.roll.toRight();
                }

                switch (carousel.face) {
                    case 0 :
                        this.playerImg = 'character00';
                        break;
                    case 1 :
                        this.playerImg = 'character01';
                        break;
                    case 2 :
                        this.playerImg = 'character02';
                        break;
                    case 3 :
                        this.playerImg = 'character03';
                        break;
                    case 4 :
                        this.playerImg = 'character04';
                        break;
                    case 5 :
                        this.playerImg = 'character05';
                        break;
                    case 6 :
                        this.playerImg = 'character06';
                        break;
                    case 7 :
                        this.playerImg = 'character07';
                        break;
                    case 8 :
                        this.playerImg = 'character08';
                        break;
                    case 9 :
                        this.playerImg = 'character09';
                        break;
                }
                // face 정하기
            });
    }

    update(time: number, delta: number): void {
        // this.debug.clear();
        // this.debug.lineStyle(1, 0x00ff00);
    }
}