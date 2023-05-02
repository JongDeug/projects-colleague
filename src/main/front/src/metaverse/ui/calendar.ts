import { Room } from 'colyseus.js';
import type UserInterface from './userInterface';
import type Phaser from 'phaser';

export default class Calendar implements UserInterface {
	_scene: Phaser.Scene;
	private _group: Phaser.GameObjects.Group;

	constructor(scene) {
		this._scene = scene;
	}

	create(): void {
		this._group = this._scene.add.group();

		const calendarButton = this._scene.add
			.sprite(700, 38, 'uiButtons', 0)
			.setName('calendarButton')
			.setScale(2, 2)
			.setInteractive()
			.setDepth(1);

		this._group.add(calendarButton);

		// 메인 카메라(플레이어, 맵)과 UI 카메라 분리
		this._scene.cameras.main.ignore(this._group);
	}

	public get group(): Phaser.GameObjects.Group {
		return this._group;
	}
}
