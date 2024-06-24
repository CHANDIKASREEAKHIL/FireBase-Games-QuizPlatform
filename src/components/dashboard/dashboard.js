import React, { useState } from "react";
import styles from "./dashboard.module.css";
import Instructions from "./instruction";
import LoginHeader from "../header/LoginHeader";

function Dashboard() {
  const [instruction, setInstruction] = useState(false);
  const [instructionValue, setInstructionValue] = useState("");

  const viewInstructions = (value) => {
    setInstruction(true);
    setInstructionValue(value);
  };

  const handleGame = (value) => {
    window.location.href = `/${value}`;
  };

  return (
    <div className={styles.mainDiv}>
    <LoginHeader />
      <div className={styles.innerGrid} style={{gridTemplateColumns: !instruction ? "" : "1fr", padding:!instruction ? "" : "5vh 20vw 10vh 20vw"}}>
        {!instruction ? (
          <>
            <div className={styles.inSections}>
              <span className={styles.gameText}>Tic Tac Toe</span>
              <img
                src={require("../../images/tic-tac-toe.png")}
                alt="Tic Tac Toe"
                style={{ width: "25vw", placeSelf: "center" }}
              />
              <button
                className={styles.gameButton}
                style={{ placeSelf: "flex-start" }}
                onClick={() => viewInstructions("tic-tac-toe")}
              >
                Play Game
              </button>
            </div>
            <div className={styles.inSections} style={{ gap: "1vh" }}>
              <span className={styles.gameText}>2048 Puzzle Game</span>
              <img
                src={require("../../images/2048.png")}
                alt="2048 Puzzle Game"
                style={{ width: "30vw", placeSelf: "center" }}
              />
              <button
                className={styles.gameButton}
                style={{ placeSelf: "flex-start" }}
                onClick={() => viewInstructions("2048-game")}
              >
                Play Game
              </button>
            </div>
          </>
        ) : instruction ? (
            <div className={styles.inSections}>
                <div style={{textAlign:"start", fontSize:"3vh", fontWeight:"500"}}>
                    Instructions </div>
          <Instructions value={instructionValue} />
            <button
                className={styles.submitButton}
                style={{ placeSelf: "flex-end", alignSelf:"center" }}
                onClick={() => handleGame(instructionValue)}
              > Start Game </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Dashboard;
