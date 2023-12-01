import { Socket, Server as WSSServer } from "socket.io";
import jwt from "jsonwebtoken";

import { UnAuthorizedResponse } from "../common/reponses.js";

const SEND_MESSAGE_EVENT = "send message";
const INFORM_EVENT = "inform";

const UNAUTHORIZED_ERROR = "unauthorized";

export function initWebSocket(serverInstance) {
  const io = new WSSServer(serverInstance, {
    cors: "*",
  });
  io.use((socket, next) => {                                                                        //Middleware
    const { roomName, token } = socket.handshake.query;
    console.log(token);

    if (!token || token == "undefined") {
      next(new Error("Unauthorized"));
    }

    try {
      const data = jwt.verify(token, process.env.SECRET);
      socket.data.username = data.username;
      socket.data.id = data.id;
      socket.data.role = data.role;
    } catch (err) {
      next(new Error(UNAUTHORIZED_ERROR));
    }

    if (roomName && token && token != "undefined") {
      // console.log({ roomName })
      socket.join(roomName);
      socket.data.roomName = roomName;
      next();
    }
  })
  .on("connection", (socket) => {
    const roomName = socket.data.roomName;

    console.log(`${socket.id} connected`);

    socket.emit(SEND_MESSAGE_EVENT, "Hello someone!");

    socket.on(SEND_MESSAGE_EVENT, async (msg) => {
      const message = {
        content: msg,
        sender: {
          id: socket.data.id,
          username: socket.data.username,
        },
      };

      socket.to(roomName).emit(SEND_MESSAGE_EVENT, message);
      console.log("Message", msg);

      await message.create({
        content: msg,
      });
    });

    socket.on("disconnect", () => {
      // console.log('Someone disconnected!')
      console.log(`${socket.id} disconnected`);
    });
  });
}
