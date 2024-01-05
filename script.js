
// PORJECT NAME: connect four
// FILE: script.js
// DATE: 
// MOD DATE: 
// MOD CHANGES: 
// MOD LINE: 
// VERSION: 0.2.0
// PROGRAMER: Charles Matthew Milam Jr


class ConnectFour {
  constructor(rows, cols, currentPlayer) {
    this.rows = rows;
    this.cols = cols;
    this.board = this.createEmptyBoard();
    this.currentPlayer = 'red';
    this.isGameOver = false;
  }


  createEmptyBoard() {
    return Array.from({ length: this.rows }, () => Array(this.cols).fill(null));
  }

  dropPiece(col) {
    if (this.isGameOver) return;

    const row = this.findAvailableRow(col);

    if (row !== -1) {
      this.board[row][col] = this.currentPlayer;
      this.checkForWin(row, col);
      this.switchPlayer();
      this.checkForTie();
      if (!this.isGameOver && this.currentPlayer === 'yellow') {
        this.makeAIMove();
      }
    }
  }

  findAvailableRow(col) {
    for (let row = this.rows - 1; row >= 0; row--) {
      if (!this.board[row][col]) {
        return row;
      }
    }
    return -1; // Column is full
  }

  switchPlayer() {
    this.currentPlayer = this.currentPlayer === 'red' ? 'yellow' : 'red';
  }
// check for four in a row
  checkForWin(row, col) {
    if (
      this.checkDirection(row, col, 0, 1) ||   // Horizontal
      this.checkDirection(row, col, 1, 0) ||   // Vertical
      this.checkDirection(row, col, 1, 1) ||   // Diagonal /
      this.checkDirection(row, col, 1, -1)     // Diagonal \
    ) {
      this.isGameOver = true;
      alert(`${this.currentPlayer.toUpperCase()} wins!`);
    }
  }
//if both player do not win
  checkForTie() {
    if (this.board.every(row => row.every(cell => cell !== null))) {
      this.isGameOver = true;
      alert('It\'s a tie!');
    }
  }
// checks for witch direction the player is going
  checkDirection(row, col, rowDir, colDir) {
    const count = this.countConnected(row, col, rowDir, colDir) +
                  this.countConnected(row, col, -rowDir, -colDir) + 1;
    return count >= 4;
  }

  countConnected(row, col, rowDir, colDir) {
    let count = 0;
    let r = row + rowDir;
    let c = col + colDir;

    while (r >= 0 && r < this.rows && c >= 0 && c < this.cols && this.board[r][c] === this.currentPlayer) {
      count++;
      r += rowDir;
      c += colDir;
    }

    return count;
  }
//computer player creates a move 
  makeAIMove() {
    const availableCols = [];

    for (let col = 0; col < this.cols; col++) {
      if (!this.board[0][col]) {
        availableCols.push(col);
      }
    }

    const randomCol = availableCols[Math.floor(Math.random() * availableCols.length)];
    setTimeout(() => {
      this.dropPiece(randomCol);
      updateBoard();
    }, 1000);
  }
}

const game = new ConnectFour(7, 7);
const gameBoardElement = document.getElementById('gameBoard');
const resetButtonElement = document.getElementById('resetButton');

//checks if cell is available and updates selected cell
function updateBoard() {
  gameBoardElement.innerHTML = '';
  for (let row = 0; row < game.rows; row++) {
    for (let col = 0; col < game.cols; col++) {
      const cellElement = document.createElement('div');
      cellElement.className = 'cell';
      cellElement.style.backgroundColor = game.board[row][col] || 'rgb(76, 125, 174)';
      if (row === 0 && game.currentPlayer === 'red') {
        cellElement.addEventListener('click', () => handleCellClick(col));
        cellElement.style.cursor = 'pointer';
      } else {
        cellElement.style.cursor = 'not-allowed';
      }

      gameBoardElement.appendChild(cellElement);
    }
  }
}

function handleCellClick(col) {
  game.dropPiece(col);
  updateBoard();
}
//reset for game
function resetGame() {
  game.isGameOver = false;
  game.currentPlayer = 'red';
  game.board = game.createEmptyBoard();
  updateBoard();
}

resetButtonElement.addEventListener('click', resetGame);
//updates board after reset
updateBoard();
