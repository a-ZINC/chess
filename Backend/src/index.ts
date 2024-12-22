import httpServer from './server/httpServer';
import webSocketServer from './server/gameWebsocketServer';
httpServer.on("upgrade", (req, socket, head) => {
    webSocketServer.handleUpgrade(req, socket, head, (ws) => {
        webSocketServer.emit("connection", ws, req);
    })
});
