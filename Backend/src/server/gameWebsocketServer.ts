import WebSocket, { WebSocketServer } from 'ws';
import GameManager from '../gameClass/GameMangager';

const webSocketServer = new WebSocketServer( {
    noServer: true,
});

webSocketServer.on('connection', (ws) => {
    
    console.log(`${new Date().toLocaleTimeString()} - A client connected`);
    ws.on('error', (error) => {
        console.log(`${new Date().toLocaleTimeString()} - An error occurred: ${error.message}`);
    });
    ws.on('message', (data, isBinary) => {
        const message = JSON.parse(data.toString());
        if (ws.readyState === WebSocket.OPEN) {
            if (message.type === 'start') {
                GameManager.addUser(ws);
            } else if (message.type === 'move') {
                GameManager.games.get(GameManager.users.get(ws)?.id || "")?.addMove(message.move, ws);
        }
    }
    });
    ws.on('close', (ws) => {
        console.log(`${new Date().toLocaleTimeString()} - A client disconnected`);
    });
});

export default webSocketServer;

