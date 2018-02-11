function Letter(letter){
    // this.userGuess = userinput
    this.letter = letter;
    this.guessedRight = false;
    this.space;

    this.characterDisplay = function (){
        if (this.guessedRight === true) {
            this.space = this.letter;
        }
        else {
            this.space = "_"
        }
    };

    this.check = function(userInput) {
        if (userInput === letter) {
            this.guessedRight = true;
        }
        else {
            this.guessedRight = false;
        }
    }
};

module.exports = Letter;

