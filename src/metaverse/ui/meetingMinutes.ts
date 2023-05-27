import { Room } from 'colyseus.js';
import type UserInterface from './userInterface';

export default class MeetingMinutes implements UserInterface {
	_scene: Phaser.Scene;
	private _group: Phaser.GameObjects.Group;

	constructor(scene) {
		this._scene = scene;
	}

	create(): void {
		this._group = this._scene.add.group();

		const meetingMinutesButton = this._scene.add
			.sprite(700, 42, 'uiButtons', 4)
			.setName('meetingMinutesButton')
			.setScale(2, 2)
			.setInteractive()
			.setDepth(1);

		// const board = this._scene.add
		// 	.sprite(400, 330, 'settingMenu', 1)
		// 	.setScale(7, 4.2)
		// 	.setName('calendarBoard')
		// 	.setOrigin(0.5, 0.5)
		// 	.setInteractive()
		// 	.setDepth(1);

		// const test = this._scene.add
		// 	.dom(400, 310)
		// 	.createFromCache('meeting')
		// 	.setOrigin(0.5, 0.5)
		// 	// .setName('calendarContent')
		// 	.setDepth(1);

		this._group.add(meetingMinutesButton);

		// 메인 카메라(플레이어, 맵)과 UI 카메라 분리
		this._scene.cameras.main.ignore(this._group);
	}

	public get group(): Phaser.GameObjects.Group {
		return this._group;
	}
}
