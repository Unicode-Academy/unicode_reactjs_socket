import Pusher from "pusher-js";
import { useEffect } from "react";
export default function App() {
  useEffect(() => {
    const pusher = new Pusher("eecdbb5ead2816c0516d", {
      cluster: "ap1",
    });
    const channel = pusher.subscribe("my-channel");
    channel.bind("my-event", (data) => {
      console.log(data);
    });
    return () => {
      channel.unbind_all();
      pusher.unsubscribe("my-channel");
    };
  }, []);
  return <div>App</div>;
}
