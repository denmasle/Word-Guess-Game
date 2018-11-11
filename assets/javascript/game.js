var wordsArray = [
    "America", "Italy", "Germany", "Japan", "France", "Sweden", "Norway", "England", "China", "Russia", "Australia", 
    "Turkey", "Mexico", "Canada", "Denmark", "Argentina", "Colombia", "Brazil", "Costa Rica", "Cuba", "Egypt", "Israel",
    "Syria", "Iran", "Iraq", "India", "South Africa", "Vietnam", "Thailand", "Chile", "Panama", "Croatia", "Poland"
];

var winCountElem = document.getElementById("win-count");
var currentWordElem = document.getElementById("current-word");
var guessCountElem = document.getElementById("guess-count");
var lettersGuessedElem = document.getElementById("wrong-guesses");

var randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)].toLowerCase();
var allLettersGuessed = [];
var maxAttempts = 7;
var guessCount = 0;
var guessesRemaining = maxAttempts - guessCount;
var wordComplete = false;
var winCount = 0;

function renderWord() {
	var html = "";
	for(var i = 0; i < randomWord.length; i++) {
        if(allLettersGuessed.indexOf(randomWord[i]) !== -1 || randomWord[i] === " ") {
			html += randomWord[i].toUpperCase();
        } 
        else {
			html += "_";
		}
	}
	currentWordElem.innerHTML = html;
}

function clearWordAndGuesses() {
	guessCountElem.innerHTML = maxAttempts;
	guessCount = 0;
	guessesRemaining = maxAttempts - guessCount;
	allLettersGuessed = [];
    lettersGuessedElem.innerHTML = "";
}

renderWord();
winCountElem.innerHTML = winCount;
guessCountElem.innerHTML = guessesRemaining;

document.onkeydown = function(e) {
	var theKey = e.key.toLowerCase();
	var theKeyCode = e.keyCode;

	if(theKeyCode >= 65 && theKeyCode <= 90 && allLettersGuessed.indexOf(theKey) === -1){
		allLettersGuessed.push(theKey);

		if(randomWord.indexOf(theKey) === -1) {
			guessCount++;
		}

		guessesRemaining = maxAttempts - guessCount;

		if(guessesRemaining === 0) {
			clearWordAndGuesses();
			randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)].toLowerCase();
        } 
        
        else {
			guessCountElem.innerHTML = guessesRemaining;
		}

        var html = "";
        for(var i = 0; i < allLettersGuessed.length; i++) {
			if(randomWord.indexOf(allLettersGuessed[i]) === -1) {
				html += allLettersGuessed[i].toUpperCase();
			}
        }
        
        lettersGuessedElem.innerHTML = html;
        renderWord();

		var renderedWord = document.getElementById("current-word").innerHTML;
		if(renderedWord.indexOf("_") === -1) {
			wordComplete = true;
		}
	}

	if(wordComplete) {
		wordComplete = false;
		winCount++;
		winCountElem.innerHTML = winCount;
		clearWordAndGuesses();
		randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)].toLowerCase();
        renderWord();
    }
}