const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
app.use(cors());
app.get("/api/comments", (req, res) => {
  const comments = [
    {
      id: 1,
      name: "Hoàng An",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      created_at: "2024-11-05T00:00:00.000Z",
    },
    {
      id: 2,
      name: "Hoàng An Unicode",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      created_at: "2023-04-01T00:00:00.000Z",
    },
  ];
  res.json(comments);
});
server.listen(8080, () => {
  console.log("Server listening on port 8080");
});
