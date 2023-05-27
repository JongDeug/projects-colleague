import WaitingScene from '../../../metaverse/scene/waiting';
import HomeScene from '../../../metaverse/scene/home';
import LoginScene from '../../../metaverse/scene/login';
import MeetingScene from '../../../metaverse/scene/meeting';
import Connection from '../../../metaverse/interaction/connection';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';


export const start = (teamId) => {
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
        // pixelArt: true,
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
            ],
        }
    };

    const game = new Phaser.Game(config);

    const loginScene = new LoginScene();
    const waitingScene = new WaitingScene();
    const homeScene = new HomeScene();
    const meetingScene= new MeetingScene();
    game.scene.add('loginScene', loginScene, false);
    game.scene.add('waitingScene', waitingScene, false);
    game.scene.add('homeScene', homeScene, false);
    game.scene.add('meetingScene', meetingScene, false);

    const connection = Connection.getInstance();
    // teamId 주입
    connection.teamId = teamId;
    connection.loginScene = loginScene;
    connection.waitingScene = waitingScene;
    connection.homeScene = homeScene;
    connection.meetingScene = meetingScene;

    game.scene.start('loginScene');
}


