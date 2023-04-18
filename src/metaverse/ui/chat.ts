import type UserInterface from './userInterface';

export default class Chat implements UserInterface {
	_scene: Phaser.Scene;
	private _group: Phaser.GameObjects.Group;

	constructor(scene) {
		this._scene = scene;
	}

	create(): void {
		this._group = this._scene.add.group();
		// var toggleSwitch0 = this._scene.rexUI.add.rexToggleSwitch({
		//     x: 200,
		//     y: 300,
		//     width: 100,
		//     height: 100,
		//     color: 0x039be5,
		//     trackFillAlpha: 1,
		//     falseValueTrackColor: undefined,
		//     falseValueTrackFillAlpha: 1,

		//     thumbColor: 0xffffff,
		//     thumbAlpha: 1,

		//     trackWidth: 0.9,
		//     trackHeight: 0.5,
		//     trackCornerRadius: (0.5 * 0.5),

		//     thumbHeight: (0.5 * 0.9),
		//     thumbWidth: (0.5),
		//     thumbCornerRadius: (0.5 * 0.5),

		//     thumbLeft: 0.3,
		//     thumbRight: (1 - 0.3),
		//     rtl: false,

		//     animationDuration: 150,

		//     value: false,

		//     click: undefined,
		//     // click: {
		//     //     mode: 1,            // 0|'press'|1|'release'
		//     //     clickInterval: 100  // ms
		//     //     threshold: undefined
		//     // },
		//     readOnly: false,
		// });

		const chatUI = this._scene.rexUI.add
			.textArea({
				x: 150,
				y: 600 - 100,
				width: 280,
				height: 180,
				background: this._scene.rexUI.add
					.roundRectangle(0, 0, 0, 0, 0, 0xead2aa, 0.5)
					.setName('chatBackground'),
				text: this._scene.rexUI.add.BBCodeText().setName('chatTextArea'),
				slider: {
					name: 'chatSlider',
					track: this._scene.rexUI.add
						.roundRectangle(0, 0, 30, 40, 10, 0xead2aa, 0.7)
						.setName('chatSliderTrack'),
					thumb: this._scene.rexUI.add
						.roundRectangle(0, 0, 30, 30, 10, 0xb18466, 0.7)
						.setName('chatSliderThumb')
				},
				space: {
					left: 0,
					right: 0,
					top: 0,
					bottom: 0,
					header: 10,
					footer: 14.5,
					text: {
						left: 10,
						right: 10
					}
				},
				mouseWheelScroller: {
					focus: false,
					speed: 0.2
				},
				// draggable: true,
				header: this._scene.rexUI.add
					.label({
						height: 30,
						align: 'center',
						orientation: 0,
						background: this._scene.rexUI.add
							.roundRectangle(0, 0, 20, 20, 0, 0xb18466, 0.7)
							.setName('chatHeaderBackground'),
						text: this._scene.add.text(0, 0, 'Chat Room').setName('chatHeaderText')
					})
					.setName('chatHeader'),

				footer: this._scene.rexUI.add
					.label({
						height: 30,
						orientation: 0,
						background: this._scene.rexUI.add
							.roundRectangle(0, 0, 10, 20, 0, 0xb18466, 0.7)
							.setName('chatFooterBackground'),
						text: this._scene.rexUI.add
							.BBCodeText(0, 0, '', {
								fixedWidth: 240,
								fixedHeight: 30
							})
							.setName('chatFooterInputText')
							.setInteractive()
					})
					.setName('chatFooter')
			})
			.setName('chatUI')
			.layout();
		// .drawBounds(this.scene.add.graphics(), 0xff0000);

		this._group.add(chatUI);

		// 메인 카메라(플레이어, 맵)과 UI 카메라 분리
		chatUI.displayList.list.forEach((list: any) => {
			if (
				list.name === 'chatBackground' ||
				list.name === 'chatTextArea' ||
				list.name === 'chatSliderThumb' ||
				list.name === 'chatSliderTrack' ||
				list.name === 'chatHeaderBackground' ||
				list.name === 'chatHeaderText' ||
				list.name === 'chatHeader' ||
				list.name === 'chatFooterBackground' ||
				list.name === 'chatFooterInputText' ||
				list.name === 'chatFooter'
			) {
				this._scene.cameras.main.ignore(list);
			}
		});
	}

	public get group(): Phaser.GameObjects.Group {
		return this._group;
	}
}
