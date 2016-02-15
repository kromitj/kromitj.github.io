// Design Basic Game Solo Challenge

// This is a solo challenge

// Your mission description:
// Overall mission:
// Goals: Avoid moving blocks 
// Characters: one moveable player in a 2d world
// Objects: One Player to many Blocks
// Functions:
    // movePlayer
    // moveWall
    // drawPlayer
    // drawWall
// Pseudocode
//  DECLARE a Player constructor function that initiates with the start of it's x and y axis along with itts size
//      DECLARE an instance function named movePlayer that will see if a directional key was pressed
//      and if so it will modify the x or y location accordingly.
//      
//      DECLARE am instance function named drawPlayer that will use the instance variables of xLoc and yLoc to 
//      place it self on the screen.
//

//   DECLARE a Wall class that initates with it's starting xLoc, yLoc, size as arguments
//          DECARE a instance function that moves the x and y locations a certain amount

//          DECLARE an instance function that draws the wall using its x and y location instance variables

// Initial Code






// Refactored Code


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
moveLeft = false;
moveRight = false;
moveUp = false;
moveDown = false;
// global variables for use in movement logic, I couldn't figure out how to 
// encapsulate them inside the Player constructor function, where I wanted to put them

window.addEventListener('keydown',this.keydown,false);
window.addEventListener('keyup',this.keyup,false);
// Adds event listener for keys being pressed down and keys being unpressed back up

function keydown(e) {
    switch(e.keyCode) {
    case 37:
        moveLeft = true;
        break;
    case 38:
        moveUp = true;
        break;
    case 39:
        moveRight = true;
        break;
    case 40:
        moveDown = true
        break;
    default:
        break;
    };
};
// this function takes in the returned value of a keypress and switches through the 
// control options of up/down/left/right: 37:up 38:left 39:down 40:right

function keyup(e) {
    moveLeft = false;
    moveDown = false;
    moveUp = false;
    moveRight = false;
};
// When a key is unpressed all movement global variables are reset to false, this is to keep
// the player from infinitly going off in the direction of the last keypress

function Player(xstart, yStart, width, height) {
    this.xLoc = xstart;
    this.yLoc = yStart;
    this.width = width;
    this.height = height;
    this.drawPlayer = function() {
        ctx.beginPath();
        ctx.arc(this.xLoc, this.yLoc, this.width, 0, Math.PI*2);
        ctx.fillStyle = "FF0000";
        ctx.fill();
        ctx.closePath();
    };
    // drawPlayer, creates a circle, specifies its location and colors and fills it 
    this.movePlayer = function() {
        if (moveLeft == true) {
            console.log("left");
            if (this.xLoc < 0) {
                this.xLoc = (canvas.width+15)
            } else {
                this.xLoc -= 8;
            };            
        } else if (moveRight == true) {
            console.log("right");
            if (this.xLoc > 480) {
                this.xLoc = 0;
            } else {
                this.xLoc += 8;
            };  
        } else if (moveUp == true) {
            console.log("up");
            if (this.yLoc < 0) {
                this.yLoc = 320;
            } else {
                this.yLoc -= 8;
            };            
        } else if (moveDown == true) {
            console.log("down");
            if (this.yLoc > 320) {
                this.yLoc = 0;
            } else {
                this.yLoc += 8;
            };   
        };
    };
    // movePlayer lookes at the states of the movement global vars and if/elses throught possible options and determines which direction
    // to go, and subtracts or adds to the player objects xLoc or yLoc properties
    this.playerDrift = function(xdrift, ydrift) {
        this.xLoc -= xdrift;
        this.yLoc += ydrift;
    }
};
// this is a contructor function that is used to create a template of a player in the game
// it takes in 4 attributes which get assigned to properties of the player object and 
// they specify how big the player is and where the players location starts off in the game

function Wall(xstart, ystart, width, height, color, xSpeed, ySpeed) {
    this.xLoc = xstart;
    this.yLoc = ystart;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speedX = xSpeed;
    this.speedY = ySpeed;
    this.moveX = function() {
       if (this.xLoc > canvas.height + 15) {
            this.xLoc = 0;
            this.yLoc = canvas.width;
        } else {
        this.xLoc += this.speedX;
        };
    };
    this.moveY = function() {
       if (this.yLoc < -480) {
            this.yLoc = 480;
        } else {
            this.yLoc -= this.speedY;
        };
    };
    this.moveXY = function() {
        this.moveX();
        this.moveY();
    };
    this.drawWall = function() {
        ctx.beginPath();
        ctx.rect(this.yLoc, this.xLoc, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    };
};

Walls = function(walls) {
    this.walls = walls;
    this.drawWalls = function(walls) {
        for (var wall in this.walls) {
            this.walls[wall].drawWall();
        };
    };
    this.moveWalls = function(walls) {
        for (var wall in this.walls) {
         this.walls[wall].moveXY();
        };
    };
}; 

var playerOne = new Player(x, y, 10, 10);
// this creates an instance of the Player constructor function,

var allWalls = [
    new Wall(0, canvas.width, 300, 15, "#FFFFFF",0.75, 7.6),
    new Wall(-80, canvas.width, 15, 250, "#FFFFFF",0.75, 5.063),
    new Wall(-160, canvas.width, 200, 15, "#FFFFFF",0.75, 3.372),
    new Wall(-240, canvas.width, 15, 100, "#FFFFFF",0.75, 2.25),
    new Wall(-320, canvas.width, 100, 15, "#FFFFFF",0.5, 1.5),
    new Wall(-400, canvas.width, 15, 100, "#FFFFFF",0.2, 1),
];

walls = new Walls(allWalls);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);    
    playerOne.drawPlayer();
    playerOne.playerDrift(1, 1);
    playerOne.movePlayer();
    walls.drawWalls(walls);
    walls.moveWalls(walls);
    // console.log(moveUp);
};

setInterval(draw, 20);

// What was the most difficult part of this challenge?
//     Getting the walls to reset themselfs when they went of the screen and adding movement functionality to the player object

// What did you learn about creating objects and functions that interact with one another?
//     I did add collision dection between the walls and the player, but it was really glitchy and bad so I remoed it, but the collision method
//     was inside the wall constructor function and it checked its occupancy space and compared it against the players and if the player was inside the space that
//     the wall occupied it would trigger a collision.

// Did you learn about any new built-in methods you could use in your refactored solution? If so, what were they and how do they work?
//     for (var wall in this.walls) was a functionality that I used a couple times in the program, I used it becuase it allows you to iterate through a collection of items
//     with out having to write the verbose for (var i; while i < 10; i++) loop.

// How can you access and manipulate properties of objects?
//     Object.property = "new value"
