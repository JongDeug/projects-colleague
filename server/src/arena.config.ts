import Arena from '@colyseus/arena';
import { monitor } from '@colyseus/monitor';
import { WebSocketTransport } from '@colyseus/ws-transport';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';

/**
 * Import your Room files
 */
import { Metaverse } from './rooms/Metaverse';

export default Arena({
	getId: () => 'Your Colyseus App',

	initializeGameServer: (gameServer) => {
		/**
		 * Define your room handlers:
		 */
		gameServer.define('metaverse', Metaverse).filterBy(['teamId']);
	},

	initializeExpress: (app) => {
		// colyseus monitor
		app.use('/colyseus', monitor());

		const allowedOrigins = [
			'http://localhost:8000',
			'https://master--preeminent-douhua-939041.netlify.app',
			'https://7699-112-217-167-202.ngrok-free.app'
		];
		const server = createServer(app);
		const io = new Server(server, {
			cors: {
				origin: allowedOrigins,
				credentials: true
			}
		});

		// WebRTC
		const users: any = {};
		const socketToRoom: any = {};
		const maximum = 4;

		io.on('connection', (socket) => {
			socket.on('join_room', (data) => {
				// room exist
				if (users[data.room]) {
					const length = users[data.room].length;
					// 인원 제한
					if (length === maximum) {
						socket.to(socket.id).emit('room_full');
						return;
					}
					users[data.room].push({ id: socket.id, email: data.email });
				} else {
					// room no exist
					users[data.room] = [{ id: socket.id, email: data.email }];
				}

				socketToRoom[socket.id] = data.room;
				socket.join(data.room);
				console.log(`[${socketToRoom[socket.id]}]: ${socket.id} enter`);

				console.log(users);

				// 본인을 제외한 같은 room의 user array
				const usersInThisRoom = users[data.room].filter((user: any) => user.id !== socket.id);

				console.log(usersInThisRoom);

				// 본인에게 해당 user array를 전송
				// 새로 접속하는 user가 이미 방에 있는 user들에게 offer(signal)를 보내기 위해
				io.sockets.to(socket.id).emit('all_users', usersInThisRoom);
			});

			socket.on('offer', (offer) => {
				// socket.broadcast.emit('getOffer', offer);
				socket.to(offer.offerReceiveId).emit('getOffer', {
					offer: offer.offer,
					offerSendId: offer.offerSendId,
					offerSendEmail: offer.offerSendEmail
				});
			});

			socket.on('answer', (answer) => {
				// socket.broadcast.emit('getAnswer', answer);
				socket.to(answer.answerReceiveId).emit('getAnswer', {
					answer: answer.answer,
					answerSendId: answer.answerSendId
				});
			});

			socket.on('ice', (ice) => {
				// socket.broadcast.emit("getIce", ice);
				socket.to(ice.iceReceiveId).emit('getIce', {
					ice: ice.ice,
					iceSendId: ice.iceSendId
				});
			});
		});

		server.listen(3000, () => console.log(`Listening on port 3000`));
	},

	beforeListen: () => {
		/**
		 * Before before gameServer.listen() is called.
		 */
	}
});
