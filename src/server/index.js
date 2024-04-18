// server.js
import { marked } from "marked";
import { WebSocketServer } from "ws";
import { WebSocket } from "ws";
import http from "http";

const server = http.createServer();

const wss = new WebSocketServer({ server });

wss.on("connection", function connection(ws) {
  console.log("a user connected");
  ws.on("message", function incoming(message) {
    // Ensure message is a string
    const markdownContent = Buffer.from(message).toString("utf8");

    // console.log(`${message}`);

    // Convert Markdown to HTML
    const html = marked(markdownContent);

    console.log(html);

    // Broadcast HTML to all clients
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(html);
      }
    });
  });
});

server.listen(3001, () => {
  console.log("Server started on port 3001");
});
