import Pusher from "pusher-js";
import { useEffect, useState } from "react";
export default function App() {
  const [data, setData] = useState("");
  useEffect(() => {
    const pusher = new Pusher("eecdbb5ead2816c0516d", {
      cluster: "ap1",
    });
    const channel = pusher.subscribe("my-channel");
    channel.bind("my-event", (data) => {
      setData(data.message);
    });
    return () => {
      channel.unbind_all();
      pusher.unsubscribe("my-channel");
    };
  }, []);
  const handleClick = async () => {
    const response = await fetch("http://localhost:8080/messages");
    console.log(response.ok);
  };
  return (
    <div>
      <h1>Hello</h1>
      <h2>{data}</h2>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
