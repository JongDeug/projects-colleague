import type Phaser from 'phaser';
import type { Room } from 'colyseus.js';
import Calendar from './calendar';
import FullScreen from './fullscreen';
import MeetingMinutes from './meetingMinutes';
import Setting from './setting';
import Chat from './chat';

export default class UIController {
	_scene: Phaser.Scene;
	_room: Room;
	_group: Phaser.GameObjects.Group;
	_status: any;
	_calendar: Calendar;
	_fullscreen: FullScreen;
	_meetingMinutes: MeetingMinutes;
	_setting: Setting;
	_chat: Chat;
	_uiContainer = {
		settingButton: null,
		settingContainer: null,
		settingMenu: null,
		settingMenuItemCam: null,
		settingMenuItemVoice: null,
		fullscreenButton: null,
		calendarButton: null,
		meetingMinutesButton: null,
		chatUI: null,
		chatUISlider: null,
		chatUIInputText: null
	};

	constructor(scene: Phaser.Scene) {
		this._scene = scene;
		this._status = {
			settingButton: false,
			calendarButton: false,
			meetingMinutesButton: false
		};
		this._calendar = new Calendar(this._scene);
		this._fullscreen = new FullScreen(this._scene);
		this._meetingMinutes = new MeetingMinutes(this._scene);
		this._setting = new Setting(this._scene);
		this._chat = new Chat(this._scene);
	}

	preload(): void {
		this._scene.load.spritesheet('uiButtons', 'assets/UIButtons.png', {
			frameWidth: 31,
			frameHeight: 31
		});
		this._scene.load.spritesheet('settingMenu', 'assets/SettingMenu.png', {
			frameWidth: 128,
			frameHeight: 144
		});
		this._scene.load.spritesheet('settingMenuItems', 'assets/SettingMenuItems.png', {
			frameWidth: 180,
			frameHeight: 60
		});
	}

	create(): void {
		this._calendar.create();
		this._chat.create();
		this._fullscreen.create();
		this._meetingMinutes.create();
		this._setting.create();
	}

	event(): void {
		this.initialize(this._calendar.group);
		this.initialize(this._chat.group);
		this.initialize(this._fullscreen.group);
		this.initialize(this._setting.group);
		this.initialize(this._meetingMinutes.group);

		this._uiContainer.settingButton.on(
			'pointerup',
			() => {
				if (!!this._status.settingButton == true) {
					this._status.settingButton = false;
					this._uiContainer.settingButton.setFrame(2);
					this._uiContainer.settingContainer.setVisible(false);
					this._scene.cameras.main.setAlpha(1);
				} else {
					this._status.settingButton = true;
					this._status.calendarButton = false;
					this._status.meetingMinutesButton = false;
					this._uiContainer.settingButton.setFrame(3);
					this._uiContainer.calendarButton.setFrame(0);
					this._uiContainer.meetingMinutesButton.setFrame(4);
					this._uiContainer.settingContainer.setVisible(true);
					this._scene.cameras.main.setAlpha(0.5);
				}
			},
			this
		);

		this._uiContainer.settingMenuItemVoice.on(
			'pointerup',
			() => {
				console.log('hi');
			},
			this
		);

		// full
		this._uiContainer.fullscreenButton.on(
			'pointerup',
			() => {
				if (!!this._scene.scale.isFullscreen === true) {
					this._uiContainer.fullscreenButton.setFrame(6);
					this._scene.scale.stopFullscreen();
				} else {
					this._uiContainer.fullscreenButton.setFrame(7);
					this._scene.scale.startFullscreen({
						fullscreenTarget: 'game'
					});
				}
			},
			this
		);

		// cal
		this._uiContainer.calendarButton.on(
			'pointerup',
			() => {
				if (!!this._status.calendarButton == true) {
					this._status.calendarButton = false;
					this._uiContainer.calendarButton.setFrame(0);

					this._scene.cameras.main.setAlpha(1);
				} else {
					this._status.calendarButton = true;
					this._status.settingButton = false;
					this._status.meetingMinutesButton = false;
					this._uiContainer.calendarButton.setFrame(1);
					this._uiContainer.settingButton.setFrame(2);
					this._uiContainer.meetingMinutesButton.setFrame(4);
					this._uiContainer.settingContainer.setVisible(false);
					this._scene.cameras.main.setAlpha(0.5);
				}
			},
			this
		);

		this._uiContainer.meetingMinutesButton.on(
			'pointerup',
			() => {
				if (this._status.meetingMinutesButton) {
					this._status.meetingMinutesButton = false;
					this._uiContainer.meetingMinutesButton.setFrame(4);
					this._scene.cameras.main.setAlpha(1);
				} else {
					this._status.meetingMinutesButton = true;
					this._status.settingButton = false;
					this._status.calendarButton = false;
					this._uiContainer.settingButton.setFrame(2);
					this._uiContainer.calendarButton.setFrame(0);
					this._uiContainer.meetingMinutesButton.setFrame(5);
					this._uiContainer.settingContainer.setVisible(false);
					this._scene.cameras.main.setAlpha(0.5);
				}
			},
			this
		);

		this._scene.input.keyboard.on(
			'keydown-ESC',
			() => {
				// 버튼이 눌려져 있을 때만
				if (
					!!this._status.settingButton ||
					!!this._status.calendarButton ||
					!!this._status.meetingMinutesButton
				) {
					this._status.settingButton = false;
					this._uiContainer.settingButton.setFrame(2);
					this._uiContainer.calendarButton.setFrame(0);
					this._uiContainer.meetingMinutesButton.setFrame(4);
					this._uiContainer.settingContainer.setVisible(false);
					this._scene.cameras.main.setAlpha(1);
				}
			},
			this
		);

		let editInput;
		this._uiContainer.chatUIInputText.on(
			'pointerdown',
			() => {
				editInput = this._scene.rexUI.edit(this._uiContainer.chatUIInputText, {
					enterClose: false,
					onClose(textObject) {
						textObject.text = '';
					}
				});
			},
			this
		);

		this._scene.input.keyboard.on('keydown-ENTER', () => {
			// ?. 에러 검사하는 문법 찾기.
			if (editInput.inputText.text !== '' && !!editInput.inputText.text) {
				this._room.send('message', editInput.inputText.text);
				editInput.inputText.text = '';
			}
		});

		this._scene.input.keyboard.on('keydown-SPACE', () => {
			if (editInput.inputText.text !== '' && !!editInput.inputText.text) {
				editInput.inputText.text += ' ';
			}
		});

		// 서버에서 채팅 메시지 착신
		this.room.onMessage('message', (message) => {
			this._uiContainer.chatUISlider.value += 1;
			this._uiContainer.chatUI.appendText(`${message.sessionId}: ${message.message}` + '\n');
		});

		// 서버에서 입장 메시지 착신
		this.room.onMessage('enterRoom', (sessionId) => {
			if (this.room.sessionId !== sessionId) {
				this._uiContainer.chatUI.appendText(`[color=green]${sessionId} 입장![/color]` + '\n');
			}
		});
	}

	initialize(group: Phaser.GameObjects.Group) {
		group.getChildren().forEach((object: any) => {
			if (object.name === 'settingContainer') {
				this._uiContainer.settingContainer = object;
				this._uiContainer.settingContainer.setVisible(false);

				object.list.forEach((itemObject: any) => {
					if (itemObject.name === 'settingMenu') this._uiContainer.settingMenu = itemObject;
					else if (itemObject.name === 'settingMenuItemCam')
						this._uiContainer.settingMenuItemCam = itemObject;
					else if (itemObject.name === 'settingMenuItemVoice')
						this._uiContainer.settingMenuItemVoice = itemObject;
				});
			} else if (object.name === 'settingButton') {
				this._uiContainer.settingButton = object;
			}

			if (object.name === 'fullscreenButton') this._uiContainer.fullscreenButton = object;

			if (object.name === 'calendarButton') this._uiContainer.calendarButton = object;

			if (object.name === 'meetingMinutesButton') this._uiContainer.meetingMinutesButton = object;

			if (object.name === 'chatUI') {
				this._uiContainer.chatUI = object;
				object.displayList.list.forEach((itemObject) => {
					if (itemObject.name === 'chatSlider') this._uiContainer.chatUISlider = itemObject;
					if (itemObject.name === 'chatFooterInputText')
						this._uiContainer.chatUIInputText = itemObject;
				});
			}
		});
	}

	public get room(): Room<any> {
		return this._room;
	}

	public set room(room: Room<any>) {
		this._room = room;
	}
}
