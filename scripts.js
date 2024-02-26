document.addEventListener('DOMContentLoaded', function () {
    const words = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    let currentWord;
    let score = 0;
    let timerInterval;
    let seconds = 0;

    const timerValue = document.getElementById('timer-value');
    const restartBtn = document.getElementById('restart-btn');
    const historyList = document.getElementById('history-list');
    const startBtn = document.getElementById('start-btn');
    const wordDisplay = document.getElementById('word-display');
    const correctValue = document.getElementById('correct-value');
    const wrongValue = document.getElementById('wrong-value');
    restartBtn.style.visibility = "hidden";
    function startGame() {
        score = 0;
        wrong = 0;
        seconds = 0;
        updateScore();
        updateTimer();
        showRandomWord();
        document.addEventListener('keydown', checkKey);
        timerInterval = setInterval(updateTimer, 1000);
        restartBtn.addEventListener('click', restartGame);
        startBtn.disabled = true; // Disable the start button once the game is started
        restartBtn.disabled = false; // Enable the restart button
        restartBtn.style.visibility = "visible";
        startBtn.style.visibility = "hidden";
    }

    function updateTimer() {
        timerValue.textContent = seconds++;
    }

    function restartGame() {
        clearInterval(timerInterval);
        addToHistory(score, wrong, seconds);
        restartBtn.removeEventListener('click', restartGame);
        startBtn.disabled = false; // Enable the start button
        restartBtn.disabled = true; // Disable the restart button until the game is started again
        startGame();
    }

    function addToHistory(correct, wrong, time) {
        const listItem = document.createElement('li');
        listItem.textContent = `Correct: ${correct}, Wrong: ${wrong}, Time: ${time}s`;
        historyList.appendChild(listItem);
    }

    function showRandomWord() {
        currentWord = words[Math.floor(Math.random() * words.length)];
        wordDisplay.textContent = currentWord.toUpperCase();
    }

    function checkKey(event) {
        const pressedKey = event.key.toLowerCase();
        //alert(pressedKey);
        if (pressedKey === currentWord[0]) {
            score++;
        } else {
            wrong++;
        }

        updateScore();
        showRandomWord();
    }

    function updateScore() {
        correctValue.textContent = score;
        wrongValue.textContent = wrong;
    }

    startBtn.addEventListener('click', startGame);
});
