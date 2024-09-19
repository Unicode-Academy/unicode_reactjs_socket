import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:8080");
export default function App() {
  const [title, setTitle] = useState("");
  useEffect(() => {
    socket.emit("message", { type: "init" });
    socket.on("message", ({ type, data }) => {
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
    </div>
  );
}
