// import type UserInterface from './userInterface';
//
// export default class Dialog implements UserInterface {
// 	_scene: Phaser.Scene;
// 	private _group: Phaser.GameObjects.Group;
//
// 	constructor(scene) {
// 		this._scene = scene;
// 	}
//
// 	create() {
// 		this._group = this._scene.add.group();
//
// 		// yes
// 		const yesBg = this._scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0xead2aa).setDepth(10);
// 		const yesText = this._scene.add.text(0, 0, '네', {
// 			fontSize: '24px'
// 		}).setDepth(11);
// 		this._group.add(yesBg);
// 		this._group.add(yesText);
// 		const yes = this._scene.rexUI.add.label({
// 			background: yesBg,
// 			text: yesText,
// 			space: { left: 10, right: 10, top: 10, bottom: 10 }
// 		});
// 		this._group.add(yes);
//
// 		// no
// 		const noBg = this._scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0xead2aa).setDepth(10);
// 		const noText = this._scene.add.text(0, 0, '아니오', {
// 			fontSize: '24px'
// 		}).setDepth(11);
// 		this._group.add(noBg);
// 		this._group.add(noText);
// 		const no = this._scene.rexUI.add.label({
// 			background: noBg,
// 			text: noText,
// 			space: { left: 10, right: 10, top: 10, bottom: 10 }
// 		});
// 		this._group.add(no);
//
// 		// dialog
// 		const dialogBg = this._scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0xb18466);
// 		const dialogTitleBg = this._scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0xead2aa);
// 		const dialogTitleText = this._scene.add.text(0, 0, '회의방', { fontSize: '24px' });
// 		const dialogTitle = this._scene.rexUI.add.label({
// 			background: dialogTitleBg,
// 			text: dialogTitleText,
// 			space: { left: 15, right: 15, top: 10, bottom: 10 }
// 		});
// 		const dialogContent = this._scene.add.text(0, 0, '회의방을 입장하시겠습니까?', {
// 			fontSize: '24px'
// 		});
// 		this._group.add(dialogBg);
// 		this._group.add(dialogTitleBg);
// 		this._group.add(dialogTitleText);
// 		this._group.add(dialogTitle);
// 		this._group.add(dialogContent);
// 		const dialog = this._scene.rexUI.add
// 			.dialog({
// 				x: 400,
// 				y: 300,
// 				background: dialogBg,
// 				title: dialogTitle,
// 				content: dialogContent,
// 				actions: [yes, no],
// 				space: { title: 25, content: 25, action: 15, left: 20, right: 20, top: 20, bottom: 20 },
// 				align: { actions: 'right' }, // 'center'|'left'|'right'},
// 				expand: { content: false } // Content is a pure text object
// 			})
// 			.layout()
// 			// .drawBounds(this.add.graphics(), 0xff0000)
// 			.popUp(1000);
// 		this._group.add(dialog);
//
// 		const print = this._scene.add.text(0, 0, '');
// 		this._group.add(print);
//
// 		// event
// 		dialog
// 			.on(
// 				'button.click',
// 				(button, groupName, index) => {
// 					print.text += index + ': ' + button.text + '\n';
// 					// this._group.destroy(true);
// 					// display 없에주고
// 					// flag control => 네 o
// 				},
// 				this
// 			)
// 			.on('button.over', function (button, groupName, index) {
// 				button.getElement('background').setStrokeStyle(1, 0xffffff);
// 			})
// 			.on('button.out', function (button, groupName, index) {
// 				button.getElement('background').setStrokeStyle();
// 			});
//
// 		this._scene.cameras.main.ignore(this._group);
// 	}
//
// 	public get group(): Phaser.GameObjects.Group {
// 		return this._group;
// 	}
// }
