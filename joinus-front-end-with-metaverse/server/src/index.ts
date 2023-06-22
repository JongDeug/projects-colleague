/**
 * IMPORTANT: 
 * ---------
 * Do not manually edit this file if you'd like to use Colyseus Arena
 * 
 * If you're self-hosting (without Arena), you can manually instantiate a
 * Colyseus Server as documented here: 👉 https://docs.colyseus.io/server/api/#constructor-options 
 */
import { listen } from "@colyseus/arena";

// Import arena config
import arenaConfig from "./arena.config";

// Create and listen on 2567 (or PORT environment variable.)
listen(arenaConfig);
//
// // Colyseus + Express
// import  { Server as ColyseusServer} from "@colyseus/core";
// import { Server as SocketServer } from "socket.io";
// import { createServer } from "http";
// import express from "express";
// import { monitor } from "@colyseus/monitor";
// import { Metaverse } from "./rooms/Metaverse";
// import { WebSocketTransport } from "@colyseus/ws-transport";
// import cors from 'cors';
// const port = Number(process.env.port) || 2567;
// const app = express();
//
// // middleware
// const allowedOrigins = ['http://localhost:8000', 'https://master--preeminent-douhua-939041.netlify.app'];
// // const options: cors.CorsOptions = {
// //   origin: allowedOrigins
// // };
// // app.use(cors(options));
// app.use(express.json());
//
//
// const server = createServer(app);
// const gameServer = new ColyseusServer({
//   server: server,
//   // transport: new WebSocketTransport({ server }),
// });
//
// // room
// gameServer.define('metaverse', Metaverse).filterBy(['teamId']);
//
// // routing
// app.use('/colyseus', monitor());
//
// // webrtc
// const io = new SocketServer(server, {
//   cors: {
//     origin: 'http://localhost:8000'
//   }
// });
//
// io.on('connection', (socket) => {
//   socket.on('join', (roomId) => {
//     const roomClients: any = io.sockets.adapter.rooms.get(roomId) || { length: 0 };
//     const numberOfClients = roomClients.length;
//
//     // These events are emitted only to the sender socket.
//     if (numberOfClients == 0) {
//       console.log(`Creating room ${roomId} and emitting room_created socket event`);
//       socket.join(roomId);
//       socket.emit('room_created', roomId);
//     } else if (numberOfClients == 1) {
//       console.log(`Joining room ${roomId} and emitting room_joined socket event`);
//       socket.join(roomId);
//       socket.emit('room_joined', roomId);
//     } else {
//       console.log(`Can't join room ${roomId}, emitting full_room socket event`);
//       socket.emit('full_room', roomId);
//     }
//   });
//
//   // These events are emitted to all the sockets connected to the same room except the sender.
//   socket.on('start_call', (roomId) => {
//     console.log(`Broadcasting start_call event to peers in room ${roomId}`);
//     socket.broadcast.to(roomId).emit('start_call');
//   });
//   socket.on('webrtc_offer', (event) => {
//     console.log(`Broadcasting webrtc_offer event to peers in room ${event.roomId}`);
//     socket.broadcast.to(event.roomId).emit('webrtc_offer', event.sdp);
//   });
//   socket.on('webrtc_answer', (event) => {
//     console.log(`Broadcasting webrtc_answer event to peers in room ${event.roomId}`);
//     socket.broadcast.to(event.roomId).emit('webrtc_answer', event.sdp);
//   });
//   socket.on('webrtc_ice_candidate', (event) => {
//     console.log(`Broadcasting webrtc_ice_candidate event to peers in room ${event.roomId}`);
//     socket.broadcast.to(event.roomId).emit('webrtc_ice_candidate', event);
//   });
// });
//
//
// server.listen(port, () => console.log(`Listening on port 3000`));
// gameServer.listen(port).then(() => console.log(`Listening on port ${port}`));