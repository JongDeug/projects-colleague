import { Room, Client } from "colyseus";
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

        // HomeScene 입장 
        this.onMessage('enterHomeScene', (client, currentScene) => {
            const player = this.state.players.get(client.sessionId);
            player.x = 703;
            player.y = 242;
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
    }

    onLogin() {
        
    }

    onJoin(client: Client, options?: any, auth?: any): void | Promise<any> {
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
        this.broadcast('enterMetaverse', client.sessionId);
    }

    onLeave(client: Client, consented?: boolean): void | Promise<any> {
        console.log(client.sessionId, "left!");
        this.state.players.delete(client.sessionId);
    }

    onDispose(): void | Promise<any> { }
}

