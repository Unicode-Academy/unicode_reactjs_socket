require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const commentController = require("./controllers/comment.controller");
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());
//Connect database
const connectDb = async () => {
  await mongoose.connect(process.env.DATABASE_URL);
};
connectDb().catch(console.error);

app.get("/api/comments", commentController.getComments);
app.post("/api/comments", commentController.createComment);

server.listen(8080, () => {
  console.log("Server listening on port 8080");
});
