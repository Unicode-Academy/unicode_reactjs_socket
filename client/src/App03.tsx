import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:8080/chat");
const notificationSocket = io("http://localhost:8080/notifications");
export default function App() {
  const [room, setRoom] = useState("");
  const handleJoin = () => {
    setRoom(room ? "" : "unicode");
    if (room) {
      socket.emit("leaveRoom", "unicode");
    } else {
      socket.emit("joinRoom", "unicode");
    }
  };
  const handleSendMessage = () => {
    socket.emit("sendMessage", `Tin nhắn từ: ${socket.id}`);
  };
  useEffect(() => {
    socket.on("message", (data) => {
      console.log(data);
    });
    notificationSocket.on("message", (data) => {
      console.log(data);
    });
    return () => {
      socket.off("message");
      notificationSocket.off("message");
    };
  });
  return (
    <div>
      <div>
        <button onClick={handleJoin}>
          {room ? "Rời khỏi nhóm" : "Tham gia nhóm"}
        </button>
      </div>
      <hr />
      <div>
        <button onClick={handleSendMessage}>Gửi tin nhắn tới Room</button>
        <button
          onClick={() => {
            notificationSocket.emit("message", "Gửi thông báo");
          }}
        >
          Gửi thông báo
        </button>
      </div>
    </div>
  );
}
