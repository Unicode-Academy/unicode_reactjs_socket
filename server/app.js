const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const cors = require("cors");
const userController = require("./controllers/user.controller");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://hoanganweb:Va5vMzY3O2kZm7Nx@cluster0.apzbg.mongodb.net/unicode-react-db?retryWrites=true&w=majority&appName=Cluster0"
  );
}

app.get("/users", userController.getUsers);
app.get("/users/:id", userController.findUser);
app.post("/users", userController.createUser);
app.patch("/users/:id", userController.updateUser);
app.delete("/users/:id", userController.deleteUser);

server.listen(8080, () => {
  console.log("Server listening on port 8080");
});
