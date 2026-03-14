// ===== ARRAY OF WORDS =====
const words = ["delulu","happy","inlove","stress","broken","peaceful","naghihintay","embarrassed","cold","motivated"];

let secretWord;
let maxAttempts = 5;
let attemptsLeft;
let gameOver = false;

const guessInput = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitBtn");
const restartBtn = document.getElementById("restartBtn");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const hint = document.getElementById("hint");

function startGame() {
    // Random word selection
    secretWord = words[Math.floor(Math.random() * words.length)];

    // For testing (Check Console)
    console.log("Secret Word:", secretWord);

    attemptsLeft = maxAttempts;
    gameOver = false;

    document.body.style.backgroundColor = "white";
    message.textContent = "";
    attemptsDisplay.textContent = "Attempts left: " + attemptsLeft;
    hint.textContent = "Hint: The word starts with '" + secretWord.charAt(0).toUpperCase() + "'";
    guessInput.value = "";
}


function checkGuess() {

    if (gameOver) return;

    // String methods: trim + lowercase
    let userGuess = guessInput.value.trim().toLowerCase();

    // Loop example (validating characters)
    for (let i = 0; i < userGuess.length; i++) {
        if (!/[a-z]/.test(userGuess[i])) {
            message.textContent = "Please enter letters only.";
            return;
        }
    }

    // If empty input
    if (userGuess === "") {
        attemptsLeft--;
        message.textContent = "Incorrect guess. You have " + attemptsLeft + " attempts left. Try again!";
    }
    // Correct guess
    else if (userGuess === secretWord) {
        message.textContent = "Congratulations! You guessed his/her feelings!";
        document.body.style.backgroundColor = "lightgreen";

    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
    });

        gameOver = true;
        return;
    }
    // Incorrect guess
    else {
        attemptsLeft--;
        if (attemptsLeft > 0) {
            message.textContent = "Incorrect guess. You have " + attemptsLeft + " attempts left. Try again!";
        } else {
            message.textContent = "Game over! The secret word was '" + secretWord + "'.";
            document.body.style.backgroundColor = "salmon";
            gameOver = true;
        }
    }

    attemptsDisplay.textContent = "Attempts left: " + attemptsLeft;
    guessInput.value = "";
}


submitBtn.addEventListener("click", checkGuess);

// Allow Enter key to submit
guessInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});

// Restart button
restartBtn.addEventListener("click", startGame);

// Start game when page loads
startGame();
