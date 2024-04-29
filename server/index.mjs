import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({
  port: 8400,
}); 
console.info("connected");
const users = [];
let id = 0; 
wss.on("connection", function connection(user_connection) {
  users.push({user_connection, id});
  console.info("New connection");
  const userId = id;
  id++;

  user_connection.on("message", function message(data) {
    console.info("Broadcasting message to ${users.length} users");
    users.forEach((user) => {
      user.user_connection.send(`${data}, ${userId}`);
    });
  });
});
