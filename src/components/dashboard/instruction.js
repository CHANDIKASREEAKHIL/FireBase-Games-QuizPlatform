import React from 'react';

const Instructions = ({ value }) => {
    const textToShowtictactoe = (
        <div style={{display:"grid", gap:"4vh"}}>
          <div><strong>1. In 3x3 grid, there are 9 squares in total.</strong></div>
          <div><strong>2. Choose Your Symbols.</strong> One player is 'X' and the other is 'O'. Decide who goes first.</div>
          <div><strong>3. Players alternate turns,</strong> placing their symbol (X or O) in an empty square on the grid.</div>
          <div><strong>4. The winner will be the one who gets the first three of same symbol</strong> in a row, either horizontally, vertically, or diagonally.</div>
          <div><strong>5. If all squares are filled</strong> without a player getting three in a row, the game ends in a draw.</div>
        </div>
      );

      const textToShow2048 = (
        <div style={{display:"grid", gap:"4vh"}}>
          <div><strong>1. In this game, the player must combine tiles containing the same numbers</strong> until they reach the number 2048.</div>
          <div><strong>2. The tiles can contain only integer values starting from 2,</strong> and that are a power of two, like 2, 4, 8, 16, 32, and so on.</div>
          <div><strong>3. Ideally, the player should reach the 2048 tile within the smallest number of steps.</strong></div>
          <div><strong>4. The board has dimension of 4 x 4 tiles,</strong> so that it can fit up to 16 tiles. If the board is full, and there is no possible move to make like merging tiles together - the game is over.</div>
        </div>
      );

  return (
    <div style={{textAlign:"start"}}>
      {textToShowtictactoe}
      {textToShow2048}
    </div>
  );
};

export default Instructions;
