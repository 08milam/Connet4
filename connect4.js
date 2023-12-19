



let playerOne = document.querySelector('#playerOne').value;
let playerTwo = 'y';
console.log(playerOne)

// let currentPlayer = playerOne;

let gameOver = false;

const ROWS = 6;
  const COLS = 7;


window.onload = function(){
  startGame();
}
  let currentPlayer = playerOne;
  let board = createBoard();

  function createBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  }

  function renderBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';

    for (let row = 0; row < ROWS; row++) {
      for (let column = 0; column < COLS; column++) {
        const box = document.createElement('div');
        box.dataset.column = column;
        box.dataset.row = row;
        box.classList.add('box');
        box.addEventListener('click', () => handleMove(column));
        box.textContent = board[row][column] || '';
        boardElement.appendChild(box);
      }
    }
  }

  function checkPlayer(row, column) {
    return (
      Direction(row, column, 0, 1) || // Horizontal
      Direction(row, column, 1, 0) || // Vertical
      Direction(row, column, 1, 1) || // Diagonal 
      Direction(row, column, -1, 1)   // Diagonal 
    );
  }

  function Direction(row, column, rowDir, columnDir) {
    const count = (r, c) => (board[r] && board[r][c] === currentPlayer ? 1 + count(r + rowDir, c + columnDir) : 0);
    return count(row, column) + count(row - rowDir, column - columnDir) >= 4;
  }

  function handleMove(column) {
    const row = getEmptyRow(column);
    if (row !== null) {
      board[row][column] = currentPlayer;
      renderBoard();

      if (checkPlayer(row, column)) {
        alert(`Player ${currentPlayer} wins!`);
        resetGame();
      } else if (BoardIsFull()) {
        alert("It's a draw!");
        resetGame();
      } else {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
      }
    }
  }

  function getEmptyRow(column) {
    for (let row = ROWS - 1; row >= 0; row--) {
      if (board[row][column] === null) {
        return row;
      }
    }
    return null;
  }

  function BoardIsFull() {
    return board.every(row => row.every(cell => cell !== null));
  }

  function resetGame() {
    board = createBoard();
    currentPlayer = playerOne;
    renderBoard();  }
    renderBoard();



    