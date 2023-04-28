import { Room, Client, ServerError } from "colyseus";
import { MetaverseState, Player } from "./schema/MetaverseState";
import { IncomingMessage } from "http";


export class Metaverse extends Room<MetaverseState> {

    onCreate(options: any): void | Promise<any> {
        this.setState(new MetaverseState());

        // 방향 메시지 핸들러
        this.onMessage('keyboard', (client, input) => {
            const player = this.state.players.get(client.sessionId);
            player.left = input.left;
            player.right = input.right;
            player.up = input.up;
            player.down = input.down;
            // console.log(input);
        })

        // 좌표 메시지 핸들러
        this.onMessage('position', (client, position) => {
            const player = this.state.players.get(client.sessionId);
            player.x = position.x;
            player.y = position.y;
            // console.log(position);
        });

        // this.onMessage('enterWaitingScene', (client, currentScene) => {

        // })

        // HomeScene 입장 
        this.onMessage('enterHomeScene', (client, currentScene) => {
            const player = this.state.players.get(client.sessionId);
            player.x = 709;
            player.y = 298;
            console.log(currentScene)
            player.currentScene = currentScene;
            player.name = client.sessionId;
            player.left = false;
            player.right = false;
            player.up = false;
            player.down = false;
        });

        // WaitingScene 입장
        this.onMessage('enterWaitingScene', (client, currentScene) => {
            const player = this.state.players.get(client.sessionId);
            player.x = 580;
            player.y = 150;
            console.log(currentScene)
            player.currentScene = currentScene;
            player.name = client.sessionId;
            player.left = false;
            player.right = false;
            player.up = false;
            player.down = false;
        });

        // 채팅 핸들러
        this.onMessage("chat", (client, content) => {
            // console.log("received message from", client.sessionId, ":", message);
            const msg = {
                message: content,
                sessionId: client.sessionId
            }
            this.broadcast("chat", msg);
        });

        // 로그인 핸들러
        this.onMessage("login", (client, password) => {
            const auth = true;
            this.broadcast("login", auth);
        })

        // 플레이어 삭제 핸들러
        this.onMessage("deletePlayer", (client, sessionId) => {
            this.broadcast("deleteWaitingPlayer", sessionId);
            this.broadcast("deleteHomePlayer", sessionId);
        })
    }

    // async onAuth(client: Client, options: any, request?: IncomingMessage) {
    //     console.log(options, "auth");
    //     if (options.password === '1234') {
    //         return "ok";
    //     } else {
    //         throw new ServerError(400, "wrong password");
    //     }
    // }

    async onJoin(client: Client, options?: any, auth?: any): Promise<any> {
        // Metaverse 입장
        console.log(client.sessionId, "joined!");
        // create Player instance
        const player = new Player();
        // initialize
        player.name = client.sessionId;
        player.x = 175;
        player.y = 16;
        player.currentScene = 'waitingScene';
        player.name = client.sessionId;
        player.left = false;
        player.right = false;
        player.up = false;
        player.down = false;

        this.state.players.set(client.sessionId, player);
        this.broadcast('enterWaitingScene', client.sessionId);
    }

    onLeave(client: Client, consented?: boolean): void | Promise<any> {
        console.log(client.sessionId, "left!");
        this.state.players.delete(client.sessionId);
    }

    onDispose(): void | Promise<any> { }
}

