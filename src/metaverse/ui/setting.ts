import { Room } from 'colyseus.js';
import type UserInterface from './userInterface';

export default class Setting implements UserInterface {
	_scene: Phaser.Scene;
	private _group: Phaser.GameObjects.Group;

	constructor(scene) {
		this._scene = scene;
	}

	create(): void {
		this._group = this._scene.add.group();

		const setting = {
			button: this._scene.add
				.sprite(760, 40, 'uiButtons', 2)
				.setName('settingButton')
				.setScale(2, 2)
				.setInteractive()
				.setDepth(1),
			menu: this._scene.add
				.sprite(400, 300, 'settingMenu', 0)
				.setScale(2.5, 2.5)
				.setName('settingMenu')
				.setOrigin(0.5, 0.5)
				.setInteractive()
				.setDepth(1),
			menuItemVoice: this._scene.add
				.sprite(400, 270, 'settingMenuItems', 0)
				.setName('settingMenuItemVoice')
				.setOrigin(0.5, 0.5)
				.setInteractive()
				.setDepth(1),
			menuItemCam: this._scene.add
				.sprite(400, 340, 'settingMenuItems', 1)
				.setName('settingMenuItemCam')
				.setOrigin(0.5, 0.5)
				.setInteractive()
				.setDepth(1)
		};
		const settingContainer = this._scene.add
			.container(0, 0)
			.setName('settingContainer')
			.setDepth(1);
		settingContainer.add(setting.menu);
		settingContainer.add(setting.menuItemVoice);
		settingContainer.add(setting.menuItemCam);

		this._group.add(setting.button);
		this._group.add(settingContainer);

		// 메인 카메라(플레이어, 맵)과 UI 카메라 분리
		this._scene.cameras.main.ignore(this._group);
	}

	public get group(): Phaser.GameObjects.Group {
		return this._group;
	}
}
