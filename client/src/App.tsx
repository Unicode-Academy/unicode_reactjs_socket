import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:8080");
export default function App() {
  const [title, setTitle] = useState("");
  const handleClick = () => {
    socket.emit(
      "privateMessage",
      {
        type: "sendMessage",
        data: {
          userId: localStorage.getItem("user"),
        },
      },
      socket.id
    );
  };
  useEffect(() => {
    socket.emit("message", { type: "init" });
    socket.on("message", ({ type, data }) => {
      console.log(type, data);

      if (type === "init") {
        setTitle(data);
      }
    });
    return () => {
      socket.off();
    };
  }, []);
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
