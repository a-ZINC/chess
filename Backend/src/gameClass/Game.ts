import { Chess } from "chess.js";
import { uuid } from "uuidv4";
import { WebSocket } from "ws";

class Game {
    id: string;
    public user1: WebSocket;
    public user2: WebSocket;
    private gameBoard: Chess = new Chess();
    private moves: Array<{ from: string, to: string }> = [];
    public gameState: GameState = GameState.PLAYING;

    constructor(user1: WebSocket, user2: WebSocket) {
        console.log(`${new Date().toLocaleTimeString()} - A new game is created`);
        this.id = uuid();
        this.user1 = user1;
        this.user2 = user2;

        this.user1.send(JSON.stringify({
            type: "start",
            id: this.id,
            color: "white",
        }));
        this.user2.send(JSON.stringify({
            type: "start",
            id: this.id,
            color: "black",
        }));
    }

    public addMove(move : { from: string, to: string }, ws: WebSocket) {
        console.log(`${new Date().toLocaleTimeString()} - ${move.from} to ${move.to}`, move);
        if (this.gameBoard.moves().length % 2 === 0 && ws !== this.user1) {
            return;
        }
        if (this.gameBoard.moves().length % 2 === 1 && ws !== this.user2) {
            return;
        }
        try {
            this.gameBoard.move(move);
        } catch (error) {
            console.log(`${new Date().toLocaleTimeString()} - ${error}`);
        }

        if (this.gameBoard.isGameOver()) {
            this.gameState = GameState.ENDED;
            this.user1.send(JSON.stringify({
                type: "end",
                winner: this.gameBoard.turn() === "w" ? "white" : "black",
            }))
        }

        if (this.gameBoard.moves().length % 2 === 0) {
            this.user1.send(JSON.stringify({
                type: "move",
                move: move
            }))
        }
        if (this.gameBoard.moves().length % 2 === 1) {
            this.user2.send(JSON.stringify({
                type: "move",
                move: move
            }))
        }
    }

}

enum GameState {
    PLAYING,
    ENDED
}
export default Game;