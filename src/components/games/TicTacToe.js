import React from "react";
import styles from "./games.module.css";
import LoginHeader from "../header/LoginHeader";

import xImage from "../../images/x.png";
import oImage from "../../images/o.png";

const initialBoardState = Array(9).fill(null);

export default function TicTacToe() {
  const [board, setBoard] = React.useState(initialBoardState);
  const [isXNext, setIsXNext] = React.useState(true);
  const [winner, setWinner] = React.useState(null);
  const [xWins, setXWins] = React.useState(0);
  const [oWins, setOWins] = React.useState(0);
  const [ties, setTies] = React.useState(0);
  const [movesHistory, setMovesHistory] = React.useState([]);
  const [isDisabled, setIsDisabled] = React.useState(false);

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const calculateWinner = (squares) => {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b]
         && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const minimax = (newBoard, player) => {
    const availSpots = newBoard.reduce((acc, cur, idx) => (cur === null ? acc.concat(idx) : acc), []);

    if (calculateWinner(newBoard) === "X") {
      return { score: -10 };
    } else if (calculateWinner(newBoard) === "O") {
      return { score: 10 };
    } else if (availSpots.length === 0) {
      return { score: 0 };
    }

    const moves = [];
    for (let i = 0; i < availSpots.length; i++) {
      const move = {};
      move.index = availSpots[i];
      newBoard[move.index] = player;

      if (player === "O") {
        const result = minimax(newBoard, "X");
        move.score = result.score;
      } else {
        const result = minimax(newBoard, "O");
        move.score = result.score;
      }

      newBoard[move.index] = null;
      moves.push(move);
    }

    let bestMove;
    if (player === "O") {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    return moves[bestMove];
  };

  const handleClick = (i) => {
    if (isDisabled) return;

    const newBoard = [...board];
    if (winner || newBoard[i]) return;

    newBoard[i] = "X";
    setBoard(newBoard);
    setIsXNext(false);
    setIsDisabled(true);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      if (gameWinner === "X") {
        setXWins(xWins + 1);
      } else {
        setOWins(oWins + 1);
      }
      setIsDisabled(false);
      return;
    }

    setMovesHistory((prevHistory) => [...prevHistory, newBoard]);

    if (!newBoard.includes(null)) {
      setTies(ties + 1);
      setIsDisabled(false);
    } else {
      setTimeout(() => {
        handleAIMove(newBoard);
      }, 2000);
    }
  };

  const handleAIMove = (currentBoard) => {
    const newBoard = [...currentBoard];
    const bestMove = minimax(newBoard, "O").index;
    newBoard[bestMove] = "O";
    setBoard(newBoard);
    setIsXNext(true);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      if (gameWinner === "X") {
        setXWins(xWins + 1);
      } else {
        setOWins(oWins + 1);
      }
    } else if (!newBoard.includes(null)) {
      setTies(ties + 1);
    }

    setIsDisabled(false);
    setMovesHistory((prevHistory) => [...prevHistory, newBoard]);
  };

  const handleRestart = () => {
    setBoard(initialBoardState);
    setIsXNext(true);
    setWinner(null);
    setMovesHistory([]);
    setIsDisabled(false);
  };

    const handleUndo = () => {
      if (movesHistory.length > 0) {
        const lastMove = movesHistory[movesHistory.length - 1] || initialBoardState;
        setBoard(lastMove);
        setIsXNext((prev) => !prev);
        setMovesHistory((prevHistory) => prevHistory.slice(0, -1));
        setIsDisabled(false);
      }
    };

  
  const renderSquare = (i) => {
    let symbol = board[i];
    let symbolImage = null;

    if (symbol === "X") {
      symbolImage = <img src={xImage} alt="X" className={styles.symbol} />;
    } else if (symbol === "O") {
      symbolImage = <img src={oImage} alt="O" className={styles.symbol} />;
    }

    return (
      <div
        className={styles.square}
        onClick={() => (isDisabled ? null : handleClick(i))}
        style={isDisabled ? { pointerEvents: "none", opacity: 0.5 } : {}}
      >
        {symbolImage}
      </div>
    );
  };

  return (
    <div className={styles.mainDiv}>
      <LoginHeader />
      <div className={styles.innerGrid}>
        <div>
          <div className={styles.board}>
            {board.map((_, i) => renderSquare(i))}
          </div>
          <div style={{ display: "flex", gap: "10vw", alignItems: "center", justifyContent: "center", marginTop: "3vh" }}>
            <div className={styles.status}>
              <div style={{ display: "flex", gap: "4vw" }}>
                <div>Player(X)  <div>{xWins}</div></div>
                <div>Ties <div>{ties}</div></div>
                <div>Computer(O)  <div>{oWins}</div></div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "1vw" }}>
              <button className={styles.gameButton} onClick={handleRestart}>
                Restart
              </button>
              <button className={styles.gameButton} onClick={handleUndo}>
                Undo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
