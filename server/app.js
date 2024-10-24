const Pusher = require("pusher");
const pusher = new Pusher({
  appId: "1885080",
  key: "eecdbb5ead2816c0516d",
  secret: "7729d71c852682e0d4b5",
  cluster: "ap1",
  useTLS: false,
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world",
});
