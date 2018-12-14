// create wordbank
var wordBank = ["wordo", "secondo", "thirdi"];
var word = "";
var misses = 0;
var usedGuess = "";
var blankWord = "";

gameStart();
// funtion to return a word from wordBank
function gameStart() {
  word = getWord();
  misses = 0;
  usedGuess = "";
  blankWord = "";

  alert(word);
  for (var i = 0; i < word.length; i++) {
    blankWord += "_";
  }
  document.getElementById("word").innerHTML = blankWord;
  document.getElementById("used-keys").innerHTML = usedGuess;

}

// Get word from word bank
function getWord() {
  return wordBank[Math.floor(Math.random() * wordBank.length)]
}
// Replaces character at index with another character
function setCharAt(str, index, chr) {
  var tempString = str.substr(0, index) + chr + str.substr(index + 1);
  return tempString;
}
// check to see if user input is repeated
function checkReused(check) {
  if (usedGuess.length > 0) {
    if(!usedGuess.includes(check))
      return true;
    else
      return false;
  } 
  else
    return true;
}

// Lose game
function gameLost(){
  gameStart();
}

// Game Win
function gameWon(){
  gameStart();
}

//Key inputs
document.onkeyup = function (event) {
  var guess = event.key.toLowerCase();
  // Check to see if key reused
  if(checkReused(event.key.toLowerCase())){
    usedGuess+=guess + ",";
    document.getElementById("used-keys").innerHTML = usedGuess;
    // Check to see if valid key is placed  
    if (guess.length === 1 && isNaN(guess)) {
      for (var i = 0; i < word.length; i++) {

        //Incorrect Guess
        if (!word.includes(guess)) {
          misses++;
          if(misses === 5)
            gameLost();
          break;
        } 
        //Correct Guess
        else if (guess === word.charAt(i)) {
          blankWord = setCharAt(blankWord, i, guess);
          document.getElementById("word").innerHTML = blankWord;
          if(blankWord === word){
            gameWon();
          }
        }
      }

    } 
    else {
      alert("Invalid Key");
    }
  }
  else{
    alert("Reused Key")
  }
}