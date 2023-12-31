import { Room, Client, ServerError } from 'colyseus';
import { MetaverseState, Player } from './schema/MetaverseState';
import { IncomingMessage } from 'http';
import axios from 'axios';
import { URL } from '../../../src/routes/env';

export class Metaverse extends Room<MetaverseState> {
	private users: any = {};
	private socketToRoom: any = {};
	private maximum = 4;

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
		});

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
		this.onMessage('chat', (client, content) => {
			const player = this.state.players.get(client.sessionId);
			const msg = {
				message: content,
				username: player.name,
				sessionId: client.sessionId
			};
			this.broadcast('chat', msg);
		});

		// 로그인 핸들러
		this.onMessage('login', (client, password) => {
			const auth = true;
			this.broadcast('login', auth);
		});

		// 플레이어 삭제 핸들러
		this.onMessage('deletePlayer', (client, sessionId) => {
			this.broadcast('deleteWaitingPlayer', sessionId);
			this.broadcast('deleteHomePlayer', sessionId);
		});
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
		const userExist = this.clients.find((client) => {
			const player = this.state.players.get(client.sessionId);
			if (player) {
				if (player.userId === options.userId) {
					return true;
				} else {
					return false;
				}
			}
		});
		// console.log(flag);
		let passwordCheck;
		await axios
			.get(`${URL}/api/team/detail`, {
				params: {
					teamId: options.teamId
				},
				withCredentials: true
			})
			.then((response) => {
				const team = response.data.data;
				if (team.pw === options.password) {
					passwordCheck = true;
				} else {
					passwordCheck = false;
				}
			})
			.catch((error) => console.log(error));

		// 이미 존재하면 접속 X
		if (userExist) {
			throw new Error('Already Exist');
		}
		// 비번 체킹
		else if (!passwordCheck) {
			throw new Error("Password doesn't match");
		}
		// 입장
		else {
			// Metaverse 입장
			console.log(client.sessionId, 'joined!');
			// create Player instance
			const player = new Player();
			// initialize
			player.name = options.username;
			player.userId = options.userId;
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
			};
			this.broadcast('enterWaitingScene', payload);
		}
	}

	onLeave(client: Client, consented?: boolean): void | Promise<any> {
		console.log(client.sessionId, 'left!');
		this.state.players.delete(client.sessionId);
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onDispose(): void | Promise<any> {}
}
