const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
// let currentSocketId = null;
io.on("connection", (socket) => {
  //   socket.on("message", ({ type, data }) => {
  //     if (type === "init") {
  //       socket.emit("message", {
  //         type: "init",
  //         data: "Chào mừng bạn đến với Unicode",
  //       });
  //     }
  //   });
  //   socket.on("privateMessage", ({ type, data: { userId } }, socketId) => {
  //     if (type === "sendMessage") {
  //       console.log("Client vừa gửi tin nhắn", socketId, userId);
  //       socket.emit("message", {
  //         type: "newMessage",
  //         data: "Tin nhắn 1",
  //       });
  //       io.emit("message", {
  //         type: "newMessage",
  //         data: "Tin nhắn tất cả nhận được",
  //       });
  //       if (+userId === 2) {
  //         currentSocketId = socketId;
  //       }
  //       if (+userId === 1) {
  //         socket.to(currentSocketId).emit("message", {
  //           type: "newMessage",
  //           data: "Tin nhắn 2",
  //         });
  //       }
  //     }
  //   });
  socket.on("joinRoom", (roomName) => {
    socket.join(roomName); //join room
    socket.emit("message", `User ${socket.id} đã tham gia nhóm: ${roomName}`);
    socket
      .to("unicode")
      .emit("message", `User ${socket.id} đã tham gia nhóm: ${roomName}`);
  });
  socket.on("leaveRoom", (roomName) => {
    socket.leave(roomName);
    socket.emit(
      "message",
      `User ${socket.id} đã rời khỏi nhóm nhóm: ${roomName}`
    );
  });
  socket.on("sendMessage", (message) => {
    socket.emit("message", `${message} gửi từ: ${socket.id}`);
    socket.to("unicode").emit("message", `${message} gửi từ: ${socket.id}`);
  });
});

server.listen(8080, () => {
  console.log("Server listening on port 8080");
});
