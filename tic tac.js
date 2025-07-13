const boxes = document.querySelectorAll('.box');
const resetButton = document.getElementById('reset');
const infoDisplay = document.querySelector('.info');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let soundMove = new Audio('path/to/move-sound.mp3'); // Replace with your sound file path
let soundWin = new Audio('https://chatgpt.com/c/67d6c223-cdbc-8004-bc56-1d0840a56e91#:~:text=Freesound%20%2D%20Win%20Sound'); // Replace with your sound file path
// Winning combinations (indices of the grid)
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

// Handle box click
function handleBoxClick(index) {
    if (gameState[index] !== "" || !gameActive) return;

    // Update game state and UI
    gameState[index] = currentPlayer;
    boxes[index].textContent = currentPlayer;
    boxes[index].classList.add(currentPlayer.toLowerCase());
    soundMove.play(); // Play move sound
    checkWin();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
}

// Check for win/draw
function checkWin() {
    let roundWon = false;

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        infoDisplay.textContent = `Player ${currentPlayer} wins! 🎉`;
        soundWin.play(); // Play win sound
        winImage.style.display = 'block'; // Show win image
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        infoDisplay.textContent = "Game ended in a draw! 🤝";
        gameActive = false;
    }
}

// Reset game
function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    infoDisplay.textContent = "";
    boxes.forEach(box => {
        box.textContent = "";
        box.classList.remove('x', 'o', 'winner');
    });
}

// Event listeners
boxes.forEach(box => {
    box.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        handleBoxClick(index);
    });
});

resetButton.addEventListener('click', resetGame);