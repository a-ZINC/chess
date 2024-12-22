import { WebSocket } from "ws";
import Game from "./Game";

class GameManager {
    public games: Map<string, Game> = new Map();
    public users: Map<WebSocket, null | Game> = new Map();
    private pendingUser: WebSocket | null = null;
    private static gameManager: GameManager;

    private GameManager() {
    }

    public static getInstance() {
        if(!GameManager.gameManager) {
            GameManager.gameManager = new GameManager();
        }
        return GameManager.gameManager;
    }
    public addUser(ws: WebSocket) {
        this.users.set(ws, null);
        this.addHandler(ws);
    }

    public removeUser(ws: WebSocket) {
        this.users.delete(ws);
    }

    public addHandler(ws: WebSocket) {
        if(this.pendingUser) {
            const game: Game = new Game(this.pendingUser, ws);
            this.users.set(ws, game);
            this.users.set(this.pendingUser, game);
            this.games.set(game.id, game);
            this.pendingUser = null;
        } else {
            this.pendingUser = ws;
        }
        console.log(`${new Date().toLocaleTimeString()} -  is added to the game`, this.games.get(this.users.get(ws)?.id || "")?.gameState);
    }
}

export default GameManager.getInstance();
