var fs = require("fs");
var inquirer = require("inquirer");
var Letter = require("./letter.js");
var Word = require("./word.js");

var chances = 15;
var words = [];
var theWord;
// var alreadyGuessed = [];
// need to fix validation to recognize repeated guesses

fs.readFile('wordlist.txt', 'utf8', function (error, data) {
    if (error) {
        console.log("Error: " + error);
    }
    else {
        var eachWord = data.split(", ");
        for (var i = 0; i < eachWord.length; i++) {
            words.push(eachWord[i]);
        }
    }
});

function randomWord() {
    var chosenWordIndex = Math.floor(Math.random() * words.length);
    theWord = new Word(words[chosenWordIndex]);
    theWord.returnDisplay();
    chances = 15;
    playHangman();
};


function playHangman() {
    if (chances > 0 && theWord.shown.includes("_")) {
        inquirer.prompt([
            {
                type: "input",
                message: "Guess a letter!",
                name: "guess",
                validate: function (input) {
                    if (input.match(/^[a-zA-Z]{1,1}$/)) {
                        return true;
                    }
                    else {
                        console.log("Error, please don't enter anything other than a single letter.");
                        return false;
                    }
                }
            }
        ])
            .then(function (response) {
                var userInput = response.guess.toLowerCase();
                theWord.letterCheck(userInput);
                chances--;
                // need to fix chances counter to reflect bad guesses
                playHangman()
            })
    }
    if (chances > 0 && !theWord.shown.includes("_")) {
        console.log("You got it! It was " + theWord.actual)
        inquirer.prompt([
            {
                type: "confirm",
                message: "Play Again?",
                default: true,
                name: "confirm",
            },
        ])
            .then(function (response) {
                if (response.confirm) {
                    randomWord();
                }
                else {
                    console.log("Come play again!")
                    return;
                }
            })
    }
    if (chances === 0) {
        console.log("You Lose!");
        inquirer.prompt([
            {
                type: "confirm",
                message: "Play Again?",
                default: true,
                name: "confirm",
            },
        ])
            .then(function (response) {
                if (response.confirm) {
                    randomWord();
                }
                else {
                    console.log("Come play again!")
                    return;
                }

            })
    }
};

function loadGame() {
    console.log("Welcome to CLI Hangman! The words in this game are all titles of tv shows and films about tech and code.")
    inquirer.prompt([
        {
            type: "confirm",
            message: "Start Game?",
            default: true,
            name: "confirm",
        },
    ])
        .then(function (response) {
            if (response.confirm) {
                randomWord();
            }
            else {
                console.log("Come play again!")
                return;
            }

        })
};
loadGame()