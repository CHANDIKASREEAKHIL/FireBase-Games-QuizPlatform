import React, { useState, useEffect, useCallback } from "react";
import "./2048game.css"; 

const Game2048 = () => {
  const [board, setBoard] = useState(
    Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => 0))
  );
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const generateRandomTile = useCallback(() => {
    let emptyTiles = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 0) {
          emptyTiles.push({ x: i, y: j });
        }
      }
    }
    if (emptyTiles.length === 0) {
      setGameOver(true);
      return;
    }
    const randomIndex = Math.floor(Math.random() * emptyTiles.length);
    const newValue = Math.random() < 0.9 ? 2 : 4; 
    const { x, y } = emptyTiles[randomIndex];
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[x][y] = newValue;
      return newBoard;
    });
    setGameOver(checkGameOver());
  }, [board]);

  const checkGameOver = useCallback(() => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 0) {
          return false;
        }
      }
    }
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (
          (i < board.length - 1 && board[i][j] === board[i + 1][j]) ||
          (j < board[i].length - 1 && board[i][j] === board[i][j + 1])
        ) {
          return false;
        }
      }
    }
    return true;
  }, [board]);

  const handleKeyDown = useCallback(
    (e) => {
      if (!gameOver) {
        e.preventDefault();
        let moved = false;
        const newBoard = [...board];

        switch (e.key) {
          case "ArrowUp":
            for (let j = 0; j < newBoard.length; j++) {
              for (let i = 1; i < newBoard.length; i++) {
                if (newBoard[i][j] !== 0) {
                  let k = i - 1;
                  while (k >= 0 && newBoard[k][j] === 0) {
                    k--;
                  }
                  if (k >= 0 && newBoard[k][j] === newBoard[i][j]) {
                    newBoard[k][j] *= 2;
                    setScore((prevScore) => prevScore + newBoard[k][j]);
                    newBoard[i][j] = 0;
                    moved = true;
                  } else if (k + 1 !== i) {
                    newBoard[k + 1][j] = newBoard[i][j];
                    newBoard[i][j] = 0;
                    moved = true;
                  }
                }
              }
            }
            break;
          case "ArrowDown":
            for (let j = 0; j < newBoard.length; j++) {
              for (let i = newBoard.length - 2; i >= 0; i--) {
                if (newBoard[i][j] !== 0) {
                  let k = i + 1;
                  while (k < newBoard.length && newBoard[k][j] === 0) {
                    k++;
                  }
                  if (
                    k < newBoard.length &&
                    newBoard[k][j] === newBoard[i][j]
                  ) {
                    newBoard[k][j] *= 2;
                    setScore((prevScore) => prevScore + newBoard[k][j]);
                    newBoard[i][j] = 0;
                    moved = true;
                  } else if (k - 1 !== i) {
                    newBoard[k - 1][j] = newBoard[i][j];
                    newBoard[i][j] = 0;
                    moved = true;
                  }
                }
              }
            }
            break;
          case "ArrowLeft":
            for (let i = 0; i < newBoard.length; i++) {
              for (let j = 1; j < newBoard[i].length; j++) {
                if (newBoard[i][j] !== 0) {
                  let k = j - 1;
                  while (k >= 0 && newBoard[i][k] === 0) {
                    k--;
                  }
                  if (k >= 0 && newBoard[i][k] === newBoard[i][j]) {
                    newBoard[i][k] *= 2;
                    setScore((prevScore) => prevScore + newBoard[i][k]);
                    newBoard[i][j] = 0;
                    moved = true;
                  } else if (k + 1 !== j) {
                    newBoard[i][k + 1] = newBoard[i][j];
                    newBoard[i][j] = 0;
                    moved = true;
                  }
                }
              }
            }
            break;
          case "ArrowRight":
            for (let i = 0; i < newBoard.length; i++) {
              for (let j = newBoard[i].length - 2; j >= 0; j--) {
                if (newBoard[i][j] !== 0) {
                  let k = j + 1;
                  while (k < newBoard[i].length && newBoard[i][k] === 0) {
                    k++;
                  }
                  if (
                    k < newBoard[i].length &&
                    newBoard[i][k] === newBoard[i][j]
                  ) {
                    newBoard[i][k] *= 2;
                    setScore((prevScore) => prevScore + newBoard[i][k]);
                    newBoard[i][j] = 0;
                    moved = true;
                  } else if (k - 1 !== j) {
                    newBoard[i][k - 1] = newBoard[i][j];
                    newBoard[i][j] = 0;
                    moved = true;
                  }
                }
              }
            }
            break;
          default:
            return;
        }

        if (moved) {
          setBoard(newBoard);
          generateRandomTile();
          setGameOver(checkGameOver());
        }
      }
    },
    [board, checkGameOver, gameOver, generateRandomTile]
  );

  useEffect(() => {
    generateRandomTile();
    generateRandomTile();
  }, []);

  useEffect(() => {
    if (gameOver) {
      alert(`Game Over! Final Score: ${score}`);
    }
  }, [gameOver, score]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="game-container">
      <div className="game-header">
        <h1>2048 Game</h1>
        <div className="score">Score: {score}</div>
      </div>
      <div className="game-board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`board-cell value-${cell !== 0 ? cell : "empty"}`}
              >
                {cell !== 0 ? cell : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game2048;
