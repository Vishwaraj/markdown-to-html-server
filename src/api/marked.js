// import { marked } from "marked";

// export const markdownToHtmlFunc = (mkd) => {
//   const html = marked.parse(mkd);
//   return html;
// };

import WebSocket from "ws";

// Replace with your Markdown processing library (e.g., marked)
import { Marked } from "marked";

function createWebSocketServer(server) {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    ws.on("message", (message) => {
      const markdownText = message.toString();
      const convertedHtml = marked(markdownText);

      // Send the converted HTML back to the client
      ws.send(convertedHtml);
    });
  });

  return wss;
}

export default createWebSocketServer;
