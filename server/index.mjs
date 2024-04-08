import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({
  port: 8400,
});
console.info("connected");
const users = [];

wss.on("connection", function connection(user_connection) {
  users.push(user_connection);
  console.info("New connection");

  user_connection.on("message", function message(data) {
    console.info("Broadcasting message to ${users.length} users");
    users.forEach((user) => {
      user.send(`${data}`);
    });
  });
});
