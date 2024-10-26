const express = require("express");
const http = require("http");
const cors = require("cors");
const Pusher = require("pusher");
const pusher = new Pusher({
  appId: "1885080",
  key: "eecdbb5ead2816c0516d",
  secret: "7729d71c852682e0d4b5",
  cluster: "ap1",
  useTLS: false,
});
const app = express();
const server = http.createServer(app);
app.use(cors());
app.get("/messages", (req, res) => {
  pusher.trigger("my-channel", "my-event", {
    message: "hello world",
  });
  return res.json({ success: true });
});

server.listen(8080, () => {
  console.log("Server listening on port 8080");
});
