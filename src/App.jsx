import { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const winningCombination = winningCombinations.find(
    ([a, b, c]) =>
      board[a] &&
      board[a] === board[b] &&
      board[b] === board[c]
  );

  const winner = winningCombination
    ? board[winningCombination[0]]
    : null;

  const isDraw = !winner && board.every((cell) => cell !== null);

  const handleCellClick = (index) => {
    if (board[index] || winner || isDraw) {
      return;
    }

    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;

    setBoard(updatedBoard);

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
  };

  return (
    <div className="game-container">
      <div className="game-card">

        <h1>XO GAME</h1>
        <p className="subtitle">
          Tic-Tac-Toe Challenge
        </p>

        <div className="player-info">
          <div className={`player ${currentPlayer === "X" && !winner && !isDraw ? "active" : ""}`}>
            <span className="player-symbol x-symbol">X</span>
            <span>Player 1</span>
          </div>

          <div className={`player ${currentPlayer === "O" && !winner && !isDraw ? "active" : ""}`}>
            <span className="player-symbol o-symbol">O</span>
            <span>Player 2</span>
          </div>
        </div>

        <div className="status">
          {winner ? (
            <h2>🎉 Player {winner} Wins!</h2>
          ) : isDraw ? (
            <h2>🤝 It's a Draw!</h2>
          ) : (
            <h2>
              Player <span className={currentPlayer === "X" ? "x-text" : "o-text"}>
                {currentPlayer}
              </span>'s Turn
            </h2>
          )}
        </div>

        <div className="game-board">
          {board.map((cell, index) => (
            <button
              key={index}
              className={`cell ${
                cell === "X" ? "x-cell" : cell === "O" ? "o-cell" : ""
              }`}
              onClick={() => handleCellClick(index)}
              disabled={Boolean(cell) || Boolean(winner) || isDraw}
              aria-label={`Cell ${index + 1}${cell ? `, ${cell}` : ", empty"}`}
            >
              {cell}
            </button>
          ))}
        </div>

        <button className="restart-btn" onClick={restartGame}>
          ↻ Restart Game
        </button>

        <p className="footer-text">
          Two Players • One Winner • Endless Fun!
        </p>

      </div>
    </div>
  );
}

export default App;