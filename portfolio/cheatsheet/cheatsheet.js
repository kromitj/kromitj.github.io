var score = 0;

function Question(question, choiceA, choiceB, choiceC, choiceD, answer ) {
  this.question = question;
  this.choiceA = choiceA;
  this.choiceB = choiceB;  
  this.choiceC = choiceC;
  this.choiceD = choiceD;
  this.answer = answer; 
  this.highlightAnswer = function() {
    document.getElementById(this.answer).style.color = 'red';
  }
  this.dehighlightAnswer = function() {
    document.getElementById(this.answer).style.color = 'black';
  }
  this.correctGuess = function(guess) {
    if (this.answer == guess) {      
      document.getElementById("feedback").innerHTML = '<p class="choice">' + 'Goodjob! You got the right answer!' + '</p>';
      this.highlightAnswer();
      return true;
    } else {
      document.getElementById("feedback").innerHTML = '<p class="choice">' + 'Wrong answer! The correct answer is: ' + this.answer + '</p>';
      this.highlightAnswer();
      return false;
    }
  }  
}
function Questions(initialQuestions) {
  this.questions = initialQuestions;
  this.questionNum = 0;
  this.nextQuestion = function() {
    if (this.questionNum == this.questions.length - 1) {
      this.questionNum = 0;
    } else {
      this.questionNum += 1; 
    }       
    return questions[this.questionNum];
  }
}
var questions = [
  new Question("What does padding refer to in the CSS box model?", 
    "It's the immediate neighbor of the content and gives the content room to breath",
    "A property of the box model that wraps the raw element boundry, before any padding or margins are added; It's like your house",
    "A property of the box model that allows you to display the outside borders of your element, which includes the content and the padding.",
    "This is like your force-field, it's not part of the element but it protects the element from it's neighbors; stay off my lawn!",
    "A"),
  new Question("What Does the Static position attribute do?", 
    "Makes the HTML element invisible",
    "Makes the HTML element boring looking",
    "Positions the element in it's default spot",
    "Positions the element in a user specified place",
    "C"),
  new Question("How do you create a conctructor function?", 
    "var Bear = function(height, name) { self.name; self.height};",
    "function Bear = function(height, name) { this.name; this.height};",
    "function Bear(height, name) { this.name; this.height};",
    "Bear function(height, name) { self.name; self.height};",
    "C"),
  new Question("Which of the folling isn't a primative data-type?", 
    "Integer",
    "Float",
    "Array",
    "Char",
    "C"),
  new Question("What is the result of 100/30 in Ruby if both are Ints?", 
    "4",
    "3",
    "3.33333",
    "3.5",
    "B"),
];

function Game(questions) {
  this.questions = questions;
  this.score = 0;
  this.currentQuestion = this.questions.questions[this.score];
  console.log(this.currentQuestion);
  this.displayScore = function() {
    document.getElementById("score").innerHTML = 'Score: ' + this.score;
  };
  this.askQuestion = function() {
    document.getElementById("question").innerHTML = '<h2 class="question">' + this.currentQuestion.question + '</h2>';
  };
  this.showChoices = function() {
    document.getElementById("A").innerHTML = '<p class="choice">' + "A: " + this.currentQuestion.choiceA + '</p>';
    document.getElementById("B").innerHTML = '<p class="choice">' + "B: " + this.currentQuestion.choiceB + '</p>';
    document.getElementById("C").innerHTML = '<p class="choice">' + "C: " + this.currentQuestion.choiceC + '</p>';
    document.getElementById("D").innerHTML = '<p class="choice">' + "D: " + this.currentQuestion.choiceD + '</p>';
  }
  this.handleInput = function(userInput) {
    correctAnswer = this.currentQuestion.correctGuess(userInput);
    console.log("correctAnswer:" + correctAnswer);
    if (correctAnswer == true) {
      this.score += 1;
    }
    this.displayScore();
  }
  this.clearFeedback = function() {
    document.getElementById("feedback").innerHTML = '';
  }
  
  this.nextQuestion = function() {
    this.currentQuestion.dehighlightAnswer();
    this.clearFeedback();
    this.currentQuestion = this.questions.nextQuestion();
    console.log("current question: " + this.currentQuestion);
    this.askQuestion();
    this.showChoices();
  }
}

exampleGame = new Game(new Questions(questions));
exampleGame.displayScore();
exampleGame.askQuestion();
exampleGame.showChoices();


  
  
