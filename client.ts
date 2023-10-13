import { WebSocket } from "ws";

const ws = new WebSocket("ws://localhost:3000");

ws.on("open", () => {
  console.log("Hello");
  ws.send(
    JSON.stringify({
      json: "Test",
    })
  );
});
ws.on("message", (data) => {
  const message = data.toString("utf-8");
  console.log(message);
});
