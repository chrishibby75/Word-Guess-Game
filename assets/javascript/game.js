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