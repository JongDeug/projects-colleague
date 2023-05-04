import { Room } from 'colyseus.js';
import type UserInterface from './userInterface';

export default class FullScreen implements UserInterface {
	_scene: Phaser.Scene;
	private _group: Phaser.GameObjects.Group;

	constructor(scene) {
		this._scene = scene;
	}

	create(): void {
		this._group = this._scene.add.group();

		const fullscreenButton = this._scene.add
			.sprite(40, 44, 'uiButtons', 6)
			.setName('fullscreenButton')
			.setInteractive()
			.setScale(2, 2)
			.setDepth(1);
		this._group.add(fullscreenButton);

		// 메인 카메라(플레이어, 맵)과 UI 카메라 분리
		this._scene.cameras.main.ignore(this._group);
	}

	public get group(): Phaser.GameObjects.Group {
		return this._group;
	}
}
