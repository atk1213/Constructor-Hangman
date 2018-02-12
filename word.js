var Letter = require("./letter.js");

var Word = function (word) {
    this.actual = word;
    this.splitWord = word.split("");
    this.letters = [];
    this.shown = [];

    this.returnDisplay = function () {
        for (var i = 0; i < this.splitWord.length; i++) {
            var newLetter = new Letter(this.splitWord[i]);
            this.letters.push(newLetter);
        };
        this.gameDisplay();
    };

    this.letterCheck = function (userInput) {
        var returnValue = false;
        for (var k = 0; k < this.letters.length; k++) {
            this.letters[k].check(userInput)
        };
        this.gameDisplay();
    }

    this.gameDisplay = function () {
        this.shown = [];
        for (var j = 0; j < this.letters.length; j++) {
            this.letters[j].characterDisplay();
            this.shown.push(this.letters[j].space);
            // this.shown.splice([j], 1, this.letters[j].space);
        }
        console.log("*********************************\n")
        console.log(this.shown.join(" "));
    }
};

module.exports = Word;