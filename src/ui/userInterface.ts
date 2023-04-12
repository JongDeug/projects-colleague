import type Phaser from 'phaser';

export default interface UserInterface {
	_scene: Phaser.Scene;

	create(): void;
	get group(): Phaser.GameObjects.Group;
}
