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
		const allowedOrigins = [
			'http://localhost:8000',
			'https://master--preeminent-douhua-939041.netlify.app',
			'https://strong-loops-fry.loca.lt',
		];

		const server = createServer(app);

		const io = new Server(server, {
			cors: {
				origin: allowedOrigins,
				credentials: true
			}
		});

		/**
		 * Bind @colyseus/monitor
		 * It is recommended to protect this route with a password.
		 * Read more: https://docs.colyseus.io/tools/monitor/
		 */
		app.use('/colyseus', monitor());

		// webrtc
		const users: any = {};
		const socketToRoom: any = {};
		const maximum = 2;

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
				socket.broadcast.emit('getOffer', offer);
			});

			socket.on('answer', (answer) => {
				socket.broadcast.emit('getAnswer', answer);
			});

			socket.on("ice", (ice) => {
				socket.broadcast.emit("getIce", ice);
			})
		});
		server.listen(3000, () => console.log(`Listening on port 3000`));
	},

	beforeListen: () => {
		/**
		 * Before before gameServer.listen() is called.
		 */
	}
});
