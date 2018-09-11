var selectableWords = [
    "brisket",
    "ribeye",
    "turkey",
    "smoker",
    "hickory",
    "mesquite",
    "sauce",
    "marinade"
];

const maxTries = 10;            // Maximum number of tries player has

var guessedLetters = [];        // Stores the letters the user guessed
var currentWordIndex;           // Index of the current word in the array
var guessingWord = [];          // This will be the word we actually build to match the current word
var remainingGuesses = 0;       // How many tries the player has left
var gameStarted = false;        // Flag to tell if the game has started
var hasFinished = false;        // Flag for 'press any key to try again'     
var wins = 0;

function resetGame() {
    remainingGuesses = maxTries;
    gameStarted = false;
    currentWordIndex = Math.floor(Math.random() * (selectableWords.length));
    guessedLetters = [];
    guessingWord = [];
    for(var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }
    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("game-over-image").style.cssText= "display: none";
    document.getElementById("you-win-image").style.cssText="display: none";
    updateDisplay();
};

function updateDisplay() {
    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentWord").innerText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord[i];
    }
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
    if(remainingGuesses <= 0) {
        document.getElementById("game-over-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        hasFinished = true;
    }
};
document.onkeyup(event) {
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};
function makeGuess (letter) {
    if(remainingGuesses > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }
        if(guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    updateDisplay();
    checkWin();
};
function evaluateGuess(letter) {
    var positions = [];
    for(i = 0; i < selectableWords[currentWordIndex].length; i++) {
        if(selectableWords[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }
    if(positions.length <= 0) {
        remainingGuesses--;        
    } else {
        for(var i=0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
    function checkWin() {
        if (guessingWord.indexOf("_") === -1) {
            document.getElementById("you-win-image").style.cssText = "display:block";
            document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
            wins++;
            hasFinished = true;
        }
    }
};
