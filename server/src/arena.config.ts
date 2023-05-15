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
		// 나중에 전체 게임에서 metaverse 여러개 생성해야함. example lobby
	},

	initializeExpress: (app) => {
		const allowedOrigins = [
			'http://localhost:8000',
			'https://master--preeminent-douhua-939041.netlify.app'
		];

		const server = createServer(app);
		// const io = new Server(server, {
		// 	cors: {
		// 		origin: allowedOrigins, //specific origin you want to give access to,
		// 	}
		// });

		const io = new Server(server, {
			cors: {
				origin: allowedOrigins,
				credentials: true,
			},
		});

		/**
		 * Bind @colyseus/monitor
		 * It is recommended to protect this route with a password.
		 * Read more: https://docs.colyseus.io/tools/monitor/
		 */
		app.use('/colyseus', monitor());

		// webrtc
		io.on('connection', (socket) => {
			socket.on('join', (roomId) => {
				const roomClients: any = io.sockets.adapter.rooms.get(roomId) || { length: 0 };
				const numberOfClients = roomClients.length;

				// These events are emitted only to the sender socket.
				if (numberOfClients == 0) {
					console.log(`Creating room ${roomId} and emitting room_created socket event`);
					socket.join(roomId);
					socket.emit('room_created', roomId);
				} else if (numberOfClients == 1) {
					console.log(`Joining room ${roomId} and emitting room_joined socket event`);
					socket.join(roomId);
					socket.emit('room_joined', roomId);
				} else {
					console.log(`Can't join room ${roomId}, emitting full_room socket event`);
					socket.emit('full_room', roomId);
				}
			});

			// These events are emitted to all the sockets connected to the same room except the sender.
			socket.on('start_call', (roomId) => {
				console.log(`Broadcasting start_call event to peers in room ${roomId}`);
				socket.broadcast.to(roomId).emit('start_call');
			});
			socket.on('webrtc_offer', (event) => {
				console.log(`Broadcasting webrtc_offer event to peers in room ${event.roomId}`);
				socket.broadcast.to(event.roomId).emit('webrtc_offer', event.sdp);
			});
			socket.on('webrtc_answer', (event) => {
				console.log(`Broadcasting webrtc_answer event to peers in room ${event.roomId}`);
				socket.broadcast.to(event.roomId).emit('webrtc_answer', event.sdp);
			});
			socket.on('webrtc_ice_candidate', (event) => {
				console.log(`Broadcasting webrtc_ice_candidate event to peers in room ${event.roomId}`);
				socket.broadcast.to(event.roomId).emit('webrtc_ice_candidate', event);
			});
		});

		// port 는 index.ts 에서 설정
		server.listen(3000, () => console.log(`Listening on port 3000`));
	},

	beforeListen: () => {
		/**
		 * Before before gameServer.listen() is called.
		 */
	}
});
