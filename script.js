const PLAYER_X = 'X';
const PLAYER_O = 'O';
let currentPlayer = PLAYER_X;
let nextBoard = -1; // -1 means ANY board is valid
let gameOver = false;

// 9 boards, each has 9 cells
let boards = Array(9).fill(null).map(() => Array(9).fill(null));

// Status of the 9 big boards (null, 'X', 'O', or 'Tie')
let macroBoard = Array(9).fill(null);

const superBoardEl = document.getElementById('superBoard');
const statusEl = document.getElementById('status');

// --- INITIALIZATION ---
function init() {
    superBoardEl.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        // Create Small Board DOM
        const boardEl = document.createElement('div');
        boardEl.classList.add('small-board');
        boardEl.id = `board-${i}`;
        
        // Create 9 Cells per board
        for (let j = 0; j < 9; j++) {
            const cellEl = document.createElement('div');
            cellEl.classList.add('cell');
            cellEl.dataset.board = i;
            cellEl.dataset.cell = j;
            // Bind click event
            cellEl.onclick = () => handleMove(i, j);
            boardEl.appendChild(cellEl);
        }
        superBoardEl.appendChild(boardEl);
    }
    updateVisuals();
}

// --- CORE LOGIC ---
function handleMove(boardIndex, cellIndex) {
    if (gameOver) return;
    
    // 1. Validate Move
    // Must be in the active board (or any if nextBoard is -1)
    if (nextBoard !== -1 && boardIndex !== nextBoard) return;
    // Cell must be empty
    if (boards[boardIndex][cellIndex] !== null) return;
    // Board must not be already won
    if (macroBoard[boardIndex] !== null) return;

    // 2. Execute Move (for whoever is currently playing)
    play(boardIndex, cellIndex, currentPlayer);
}

function play(boardIndex, cellIndex, player) {
    // Update Internal State
    boards[boardIndex][cellIndex] = player;
    
    // Check if this small board is won
    const win = checkWin(boards[boardIndex]);
    if (win) {
        macroBoard[boardIndex] = win; 
    } else if (boards[boardIndex].every(c => c !== null)) {
        macroBoard[boardIndex] = 'Tie';
    }

    // Check Global Win
    const globalWin = checkWin(macroBoard);
    if (globalWin) {
        gameOver = true;
        statusEl.innerText = `${globalWin} WINS THE GAME!`;
        updateVisuals();
        return;
    }

    // Set Next Active Board (The Twist!)
    if (macroBoard[cellIndex] !== null) {
        nextBoard = -1; // Target board is full/won -> Play Anywhere
    } else {
        nextBoard = cellIndex;
    }

    // Switch Turn (X -> O -> X)
    currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
    statusEl.innerText = `Player ${currentPlayer}'s Turn`;
    
    updateVisuals();
}

// --- HELPERS ---
function checkWin(boardArray) {
    const wins = [
        [0,1,2], [3,4,5], [6,7,8], // Rows
        [0,3,6], [1,4,7], [2,5,8], // Cols
        [0,4,8], [2,4,6]           // Diagonals
    ];
    for (let combo of wins) {
        const [a, b, c] = combo;
        if (boardArray[a] && boardArray[a] === boardArray[b] && boardArray[a] === boardArray[c] && boardArray[a] !== 'Tie') {
            return boardArray[a];
        }
    }
    return null;
}

function updateVisuals() {
    // 1. Update Cells
    for (let i = 0; i < 9; i++) {
        const boardEl = document.getElementById(`board-${i}`);
        
        // Update marks inside
        const cells = boardEl.children;
        for (let j = 0; j < 9; j++) {
            if (boards[i][j]) {
                cells[j].innerText = boards[i][j];
                cells[j].classList.add(boards[i][j].toLowerCase());
            } else {
                cells[j].innerText = '';
                cells[j].classList.remove('x', 'o');
            }
        }

        // 2. Manage Big Board Overlays (Big X or O)
        const existingOverlay = boardEl.querySelector('.overlay');
        if (existingOverlay) existingOverlay.remove();

        if (macroBoard[i]) {
            const overlay = document.createElement('div');
            overlay.classList.add('overlay');
            if (macroBoard[i] !== 'Tie') {
                overlay.innerText = macroBoard[i];
                overlay.classList.add(`winner-${macroBoard[i]}`);
            }
            boardEl.appendChild(overlay);
        }

        // 3. Highlight Valid Boards
        boardEl.classList.remove('active');
        if (!gameOver && macroBoard[i] === null) {
            if (nextBoard === -1 || nextBoard === i) {
                boardEl.classList.add('active');
            }
        }
    }
}

function resetGame() {
    boards = Array(9).fill(null).map(() => Array(9).fill(null));
    macroBoard = Array(9).fill(null);
    currentPlayer = PLAYER_X;
    nextBoard = -1;
    gameOver = false;
    statusEl.innerText = "Player X's Turn";
    init();
}
function startGame() {
    const overlay = document.getElementById('instruction-overlay');
    overlay.classList.add('hidden');
}

init();