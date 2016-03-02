function Person(firstName, lastName, picture) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.picture = picture;
}


function People(people) {
  this.index = 0;
  this.people = people;
  this.nextPerson = function() {
    this.index++;
    console.log(this.people[this.index]);    
    return this.people[this.index];  
  }
}

function Game(people) {
  this.score = 0;
  this.cohort = people;
  this.currentPerson = this.cohort.people[0];
  this.displayPerson = function() {
     document.getElementById("pic").innerHTML = '';
     document.getElementById("pic").innerHTML = '<img src="' + this.currentPerson.picture + '">';
     document.getElementById("score").innerHTML = '<p>' + "Score: " +this.score + '</p>';
  };
 
  this.nextPerson = function() {
    console.log("called next person");
    this.currentPerson = this.cohort.nextPerson();
    this.displayPerson();
  }
  this.handleInput = function(firstName, lastName) {
    console.log("called handle input");
    console.log("currentPerson firstName: " + this.currentPerson.firstName);
    if (this.currentPerson.firstName == firstName) {
      this.score++;
      if (this.currentPerson.lastName == lastName) {
        this.score++;
        console.log("You got both!");
      } else { console.log("You got the first name right");}
    } else if (this.currentPerson.lastName == lastName) {
      console.log("You got the last name right");
    } else {
      console.log("Boo!!!");
    }
    console.log(this.currentPerson);
    this.nextPerson();
  }
}

// Driver Code
var people = [
  new Person('Austin', 'Dorff', 'imgs/a-dorff.jpeg'),
  new Person('Ben', 'Giamarino', 'imgs/ben-giamarino.jpeg'),
  new Person('Byron', 'Gage', 'imgs/byron-gage.jpeg'),
  new Person('Connor', 'Reaumond', 'imgs/connor_reaumond.jpeg'),
  new Person('Dana', 'Breen', 'imgs/dana-breen.jpeg'),
  new Person('Liz', 'Roche', 'imgs/liz-roche.png'),
  new Person('Mitch', 'Kroska', 'imgs/me-pic.JPG'),



]

var peoples = new People(people);

var currentGame = new Game(peoples);
currentGame.displayPerson();