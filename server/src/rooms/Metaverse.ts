import {Room, Client, ServerError} from "colyseus";
import {MetaverseState, Player} from "./schema/MetaverseState";
import {IncomingMessage} from "http";


export class Metaverse extends Room<MetaverseState> {

    private users: any = {};
    private socketToRoom: any = {};
    private maximum = 4;



    onCreate(options: any): void | Promise<any> {
        this.setState(new MetaverseState());

        // WebRTC
        this.onMessage('join_room', (client, data) => {
            if ((this.users)[data.room]) {
                const length = (this.users)[data.room].length;
                // 인원 제한
                if (length === this.maximum) {
                    client.send('room_full');
                    return;
                }
                this.users[data.room].push({ id: client.id, email: data.email });
            } else {
                // room no exist
                this.users[data.room] = [{ id: client.id, email: data.email }];
            }

            // this.socketToRoom[socket.id] = data.room;
            // socket.join(data.room);
            // console.log(users);

            // 본인을 제외한 같은 room의 user array
            const usersInThisRoom = this.users[data.room].filter((user: any) => user.id !== client.id);
            console.log(usersInThisRoom);

            // 본인에게 해당 user array를 전송
            // 새로 접속하는 user가 이미 방에 있는 user들에게 offer(signal)를 보내기 위해
            // io.sockets.to(socket.id).emit('all_users', usersInThisRoom);
            // this.broadcast('all_users', usersInThisRoom, {except: client});
            this.clients.forEach((client) => {
                client.send('all_users', usersInThisRoom);
            })
            // this.broadcast('all_users', usersInThisRoom);
        });

        this.onMessage('offer', (client, offer) => {
            const findClient = this.clients.find((client) => client.id === offer.offerReceiveId);
            findClient.send('getOffer', {
                    offer: offer.offer,
                    offerSendId: offer.offerSendId,
                    offerSendEmail: offer.offerSendEmail
            })
        });

        this.onMessage('answer', (client, answer) => {
            const findClient = this.clients.find(client => client.id === answer.answerReceiveId);
            findClient.send('getAnswer', {
                    answer: answer.answer,
                    answerSendId: answer.answerSendId
            });
        });

        this.onMessage('ice', (client, ice) => {
            const findClient = this.clients.find(client => client.id === ice.iceReceiveId);
            findClient.send('getIce', {
                    ice: ice.ice,
                    iceSendId: ice.iceSendId
            });
            // socket.to(ice.iceReceiveId).emit('getIce', {
            //     ice: ice.ice,
            //     iceSendId: ice.iceSendId
            // });
        });


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
            player.x = 709;
            player.y = 298;
            player.currentScene = currentScene;
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
            player.currentScene = currentScene;
            player.left = false;
            player.right = false;
            player.up = false;
            player.down = false;
        });

        // 채팅 핸들러
        this.onMessage("chat", (client, content) => {
            const player = this.state.players.get(client.sessionId);
            const msg = {
                message: content,
                username: player.name,
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

    // 인증!
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
        player.name = options.username;
        player.img = options.playerImg;
        player.x = 175;
        player.y = 16;
        player.currentScene = 'waitingScene';
        player.left = false;
        player.right = false;
        player.up = false;
        player.down = false;

        this.state.players.set(client.sessionId, player);
        // 채팅 입장
        const payload = {
            sessionId: client.sessionId,
            username: player.name,
            serverImg: player.img
        }

        this.broadcast('enterWaitingScene', payload);
    }

    onLeave(client: Client, consented?: boolean): void | Promise<any> {
        console.log(client.sessionId, "left!");
        this.state.players.delete(client.sessionId);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onDispose(): void | Promise<any> {
    }
}

