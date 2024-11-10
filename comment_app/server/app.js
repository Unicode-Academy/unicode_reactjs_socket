require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const { clerkMiddleware, requireAuth } = require("@clerk/express");
const commentController = require("./controllers/comment.controller");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
const commentNamespace = io.of("/comments");
app.use(cors());
app.use(express.json());
//Connect database
const connectDb = async () => {
  await mongoose.connect(process.env.DATABASE_URL);
};
connectDb().catch(console.error);
app.use(clerkMiddleware());
app.get("/api/comments", commentController.getComments);
app.post("/api/comments", requireAuth(), commentController.createComment);
app.delete("/api/comments/:id", requireAuth(), commentController.deleteComment);

commentNamespace.on("connection", (socket) => {
  socket.on("new-comment", (data) => {
    commentNamespace.emit("fetch-comment", data);
  });
  socket.on("disconnect", () => {
    console.log("Client đóng kết nối");
  });
});

server.listen(8080, () => {
  console.log("Server listening on port 8080");
});
