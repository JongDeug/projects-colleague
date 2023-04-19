import Arena from "@colyseus/arena";
import { monitor } from "@colyseus/monitor";
import { WebSocketTransport } from "@colyseus/ws-transport"

/**
 * Import your Room files
 */
import { Metaverse } from "./rooms/Metaverse"

// const transport = 

export default Arena({
    getId: () => "Your Colyseus App",

    initializeGameServer: (gameServer) => {
        /**
         * Define your room handlers:
         */
        gameServer.define('metaverse', Metaverse).filterBy(['teamId'])
        // 나중에 전체 게임에서 metaverse 여러개 생성해야함. example lobby
    },

    initializeExpress: (app) => {
        /**
         * Bind your custom express routes here:
         */
        // 여긴 websocket이 아니라 일반 http이고,,,,
        // 우리가 연결해야할 곳은 websocket인데 방을 어떻게 나누지?
        app.get("/", (req, res) => {
            console.log('welcome!!!!!!!!!!!!!!');
            res.send("welcome");
        });

        /**
         * Bind @colyseus/monitor
         * It is recommended to protect this route with a password.
         * Read more: https://docs.colyseus.io/tools/monitor/
         */
        app.use("/colyseus", monitor());
    },


    beforeListen: () => {
        /**
         * Before before gameServer.listen() is called.
         */
    },

    // initializeTransport: () => {
// 
    // },
});