const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });
wss.on("connection", (ws) => {
  ws.send(
    JSON.stringify({ type: "init", data: "Chào mừng bạn đến với Unicode" })
  );
  ws.on("message", (message) => {
    const { type, data } = JSON.parse(message);
    if (type === "sendMessage") {
      ws.send(JSON.stringify({ type: "newMessage", data }));
    }
  });
  ws.on("close", () => {
    console.log("Socket close");
  });
});
