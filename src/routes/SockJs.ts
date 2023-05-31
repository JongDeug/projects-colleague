import * as SockJs from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";
import { WebSocket } from "ws";
import { URL } from "./env";
import { postMsgCount } from "./postCountStore";
import * as localStorage from "../routes/localStorage";

export const client = new Client({
  brokerURL: "",
  debug: function(str) {
    // console.log(str);
  },
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000
});

// Fallback code
if (typeof WebSocket !== "function") {
  client.webSocketFactory = function() {
    return new SockJs(`${URL}/webSocket`);
  };
}

client.onConnect = function(frame) {
  client.subscribe("/topic/roomId", (data) => {
    const msg = JSON.parse(data.body);
    const userId = localStorage.getWithExpiry('loginMember');
    if(userId === msg.receiver){
      postMsgCount.update(postMsgCount => postMsgCount += 1);
    }
  });
};

client.onStompError = function(frame) {
  console.log("Broker reported error: " + frame.headers["message"]);
  console.log("Additional details: " + frame.body);
};

export function connect() {
  client.activate();
}