<script lang="ts">
	import { WaitingScene } from '../../scene/waiting';
	import { HomeScene } from '../../scene/home';
	import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';

	// 게임 환경 변수
	const config: Phaser.Types.Core.GameConfig = {
		type: Phaser.AUTO,
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH,
			width: 800,
			height: 600,
			parent: 'game', // div 태그를 줘야함.
			fullscreenTarget: 'game'
		},
		pixelArt: true,
		scene: [WaitingScene, HomeScene],
		physics: {
			default: 'arcade',
			arcade: {
				debug: true
			}
		},
		dom: {
			createContainer: true
		},
		plugins: {
			scene: [
				{
					key: 'rexUI',
					plugin: RexUIPlugin,
					mapping: 'rexUI'
				}
			]
		}
	};

	const game = new Phaser.Game(config);
</script>

<svelte:head>
	<style>
		html,
		body {
			height: 100%;
		}
		body {
			margin: 0;
			padding: 0;
			background: #222;
			color: #eee;
			font: caption;
		}
	</style>
</svelte:head>
