const colors = [
    'red', 'blue', 'green', 'yellow', 'purple', 'orange', 
    'pink', 'brown', 'cyan', 'magenta', 'lime', 'maroon', 
    'navy', 'olive', 'teal', 'aqua', 'fuchsia', 'silver', 
    'gray', 'black', 'white'
];
let sequence = [];
let playerSequence = [];
let currentStep = 0;

const startButton = document.getElementById('startButton');
const checkButton = document.getElementById('checkButton');
const gameGrid = document.getElementById('gameGrid');

startButton.addEventListener('click', startGame);
checkButton.addEventListener('click', checkSequence);

function startGame() {
    sequence = generateSequence(4);
    playerSequence = [];
    currentStep = 0;
    displaySequence();
    checkButton.disabled = true;
    startButton.textContent = 'Restart Game';
}

function generateSequence(length) {
    const seq = [];
    for (let i = 0; i < length; i++) {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        seq.push(randomColor);
    }
    return seq;
}

function displaySequence() {
    gameGrid.innerHTML = '';
    sequence.forEach(color => {
        const div = document.createElement('div');
        div.classList.add('grid-item');
        div.style.backgroundColor = color;
        gameGrid.appendChild(div);
    });

    setTimeout(() => {
        shuffleGrid();
        enableGridClicks();
    }, 2000);
}

function shuffleGrid() {
    const items = Array.from(gameGrid.children);
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        gameGrid.appendChild(items[j]);
    }
}

function enableGridClicks() {
    const items = Array.from(gameGrid.children);
    items.forEach(div => {
        const color = div.style.backgroundColor;
        div.addEventListener('click', () => handlePlayerClick(color, div));
    });
}

function handlePlayerClick(color, element) {
    if (element.classList.contains('selected')) {
        element.classList.remove('selected');
        playerSequence = playerSequence.filter(c => c !== color);
    } else {
        element.classList.add('selected');
        playerSequence.push(color);
    }

    if (playerSequence.length === sequence.length) {
        checkButton.disabled = false;
    } else {
        checkButton.disabled = true;
    }
}

function checkSequence() {
    console.log("Player", playerSequence);
    console.log("System", sequence);
    if (JSON.stringify(playerSequence) === JSON.stringify(sequence)) {
        alert('Correct sequence!');
        startButton.textContent = 'Continue';
    } else {
        alert('Incorrect sequence. Try again!');
        playerSequence = [];
        const items = Array.from(gameGrid.children);
        items.forEach(div => div.classList.remove('selected'));
    }
    checkButton.disabled = true;
}

document.addEventListener('DOMContentLoaded', function () {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#000000', '#FF5733', '#FF8C00', '#FFD700', '#ADFF2F', '#00FF7F', '#00CED1', '#1E90FF', '#9370DB', '#FF1493', '#000000'];
    let colorIndex = 0;

    setInterval(() => {
        document.body.style.backgroundColor = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }, 5000);
});