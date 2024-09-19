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
io.on("connection", (socket) => {
  socket.on("message", ({ type, data }) => {
    if (type === "init") {
      socket.emit("message", {
        type: "init",
        data: "Chào mừng bạn đến với Unicode",
      });
    }
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(8080, () => {
  console.log("Server listening on port 8080");
});
