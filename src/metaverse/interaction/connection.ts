import { Client, Room } from "colyseus.js";
import { WaitingScene } from "../scene/waiting";
import { HomeScene } from "../scene/home";
import UIController from "../ui/uiController";

export default class Connection {
    private static instance: Connection;
    private client: Client;
    private _waitingScene: any;
    private _homeScene: any;
    private _room: Room;
    private _playerState: { [sessionId: string]: any } = {};
    private _teamId;
    // private _playerSessionIds: any;
    // state한 것이 무엇이 있냐, 모든 플레이어를 모아놓은. 플레이어의 위치 정보, 플레이어의 키 인풋

    private constructor() {
    }

    public static getInstance(): Connection {
        if (!Connection.instance) {
            Connection.instance = new Connection();
        }
        return Connection.instance;
    }

    async connect(teamId: string) {
        try {
            this.client = new Client('ws://localhost:2567');
            console.log('Joining Room...');
            this._room = await this.client.joinOrCreate('metaverse', { teamId: teamId });
            console.log('Joined successfully!');


            // 이벤트 등록
            this.registerEvent();
        } catch (error) {
            console.log('방 접속 에러', error);
        }
    }

    public registerEvent() {
        // 여기로 옮기고.
        this._room.state.players.onAdd = (playser, sessionId) => {
            console.log(sessionId);
        }

        this._room.onMessage('message', (message) => {
            if (this._waitingScene.scene.isActive('waitingScene')) {
                this._waitingScene.uiController._uiContainer.chatUISlider.value += 1;
                this._waitingScene.uiController._uiContainer.chatUI.appendText(`${message.sessionId}: ${message.message}` + '\n');
            }
            if(this._homeScene.scene.isActive('homeScene')){
                this._homeScene.uiController._uiContainer.chatUISlider.value += 1;
                this._homeScene.uiController._uiContainer.chatUI.appendText(`${message.sessionId}: ${message.message}` + '\n');
            }
        })
    }

    public get room(): Room {
        return this._room;
    }

    public get playerState(): any {
        return this._playerState;
    }

    public set playerState(state) {
        this._playerState = state;
    }

    public set teamId(teamId: string) {
        this._teamId = teamId;
    }

    public set waitingScene(waitingScene: Phaser.Scene) {
        this._waitingScene = waitingScene;
    }

    public set homeScene(homeScene: Phaser.Scene) {
        this._homeScene = homeScene;
    }
}