import { useEffect, useState } from "react";

export default function App() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messageList, setMessageList] = useState<string[]>([]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (socket) {
      socket.send(
        JSON.stringify({
          type: "sendMessage",
          data: message,
        })
      );
      setMessage("");
    }
  };
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);
    ws.addEventListener("open", () => {
      console.log("Kết nối thành công");
    });
    ws.addEventListener("message", (event) => {
      const { type, data } = JSON.parse(event.data);
      if (type === "init") {
        setTitle(data);
      }
      if (type === "newMessage") {
        setMessageList((messageList) => [...messageList, data]);
      }
    });
    return () => {
      ws.close();
    };
  }, []);
  return (
    <div>
      <h2>{title}</h2>
      {messageList.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button>Gửi</button>
      </form>
    </div>
  );
}
