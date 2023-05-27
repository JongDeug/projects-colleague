import type UserInterface from './userInterface';

export default class Dialog implements UserInterface {
	_scene: Phaser.Scene;
	private _group: Phaser.GameObjects.Group;

	constructor(scene) {
		this._scene = scene;
	}

	create() {
		this._group = this._scene.add.group();

		const yes = this._scene.rexUI.add.label({
			// width: 40,
			// height: 40,
			background: this._scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0xead2aa),
			text: this._scene.add.text(0, 0, '', {
				fontSize: '24px'
			}),
			space: { left: 10, right: 10, top: 10, bottom: 10 }
		});
		const no = this._scene.rexUI.add.label({
			// width: 40,
			// height: 40,
			background: this._scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0xead2aa),
			text: this._scene.add.text(0, 0, '', {
				fontSize: '24px'
			}),
			space: { left: 10, right: 10, top: 10, bottom: 10 }
		});

		const dialog = this._scene.rexUI.add
			.dialog({
				x: 400,
				y: 300,
				background: this._scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0xb18466),
				title: this._scene.rexUI.add.label({
					background: this._scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0xead2aa),
					text: this._scene.add.text(0, 0, '회의방', { fontSize: '24px' }),
					space: { left: 15, right: 15, top: 10, bottom: 10 }
				}),
				content: this._scene.add.text(0, 0, '회의방을 입장하시겠습니까?', {
					fontSize: '24px'
				}),
				actions: [yes, no],
				space: { title: 25, content: 25, action: 15, left: 20, right: 20, top: 20, bottom: 20 },
				align: { actions: 'right' }, // 'center'|'left'|'right'},
				expand: { content: false } // Content is a pure text object
			})
			.layout()
			// .drawBounds(this.add.graphics(), 0xff0000)
			.popUp(1000);

		const print = this._scene.add.text(0, 0, '');

		// event
		// dialog
		// 	.on(
		// 		'button.click',
		// 		function (button, groupName, index) {
		// 			print.text += index + ': ' + button.text + '\n';
		// 		},
		// 		this
		// 	)
		// 	.on('button.over', function (button, groupName, index) {
		// 		button.getElement('background').setStrokeStyle(1, 0xffffff);
		// 	})
		// 	.on('button.out', function (button, groupName, index) {
		// 		button.getElement('background').setStrokeStyle();
		// 	});

		this._group.add(yes);
		this._group.add(no);
		this._group.add(dialog);
		this._group.add(print);

		this._scene.cameras.main.ignore(this._group);
	}

	public get group(): Phaser.GameObjects.Group {
		return this._group;
	}
}
