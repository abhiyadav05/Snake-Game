// variables from the HTML --->>>

let playingField = document.querySelector('.playing-field');
let foodDirection = generateFoodDirection();
let score=document.querySelector('#score-num');
let highScoreElement=document.querySelector('#high-score-num');
let startBtn=document.querySelector('.start-btn')
let mainGameContainer=document.querySelector('.container');
let start=document.querySelector('.start');
let highScoreOnBoard=document.querySelector('#highScore');
let scoreOnBoard=document.querySelector("#score");
let gameOverBoard=document.querySelector(".game-overlay");
let reStartBtn=document.querySelector(".restart-btn");
let exitBtn=document.querySelector(".exit-btn")

// variable for the track of the values -->>>
let scoreValue=0;
let highScore=0;
let gameStarted=false;
let snakeDirection = [{
    x: 15,
    y: 10
}];
let direction = 'right';
let gameInterval;
let snakeSpeed=300;


// Draw the snake

function draw() {
    playingField.innerHTML = '';
    drawSnake();
    setInterval(() => {
        makeFood();
    }, 150)
}
function drawSnake() {
    snakeDirection.forEach((position) => {
        const snake = createGameElement('div', 'snake');
        setPosition(snake, position);
        playingField.appendChild(snake)
    })
}


//  making the food for the snake and  set to the random position
function makeFood() {
    const food = createGameElement('div', 'food');
    setPosition(food, foodDirection)
    playingField.appendChild(food)
}

function generateFoodDirection() {
    let x = (Math.floor(Math.random() * 30)) + 1;
    let y = (Math.floor(Math.random() * 20)) + 1;
    return { x, y };
}

// set the postion of the food or snake
function setPosition(snake, position) {
    snake.style.gridColumn = position.x;
    snake.style.gridRow = position.y;
}

// create the element by dom method
function createGameElement(tag, idName) {
    const element = document.createElement(tag);
    element.id = idName;
    return element;
}


// start the game and update the value of the direction when click
function gameStart() {
    gameStarted=true;
    const head = { ...snakeDirection[0] };
    if (direction === 'right') {
        head.x++

    } else if (direction === 'left') {
        head.x--;
    } else if (direction === 'up') {
        head.y--;
    } else if (direction == 'down') {
        head.y++;
    }
    // this logic when the snake out of the box then come
    // out the from the another side
    if(head.x>30){
        head.x=1;
    }
    if(head.y>20){
        head.y=1;
    }
    if(head.x<1){
        head.x=30;
    }
    if(head.y<1){
        head.y=20;
    }
    snakeDirection.unshift(head)
    for(let i=1;i<snakeDirection.length;i++){
        if(snakeDirection[0].x==snakeDirection[i].x && snakeDirection[0].y==snakeDirection[i].y){
            gameOver();
        }
    }
    if (snakeDirection[0].x === foodDirection.x && snakeDirection[0].y === foodDirection.y) {
        // console.log("hit");
        scoreValue++;
        setScore();
        foodDirection = generateFoodDirection();
        if(snakeSpeed>200){
            snakeSpeed-=4;
            clearInterval(gameInterval);
            setIntervalOfStart(snakeSpeed);
        }else if(snakeSpeed>100){
            snakeSpeed-=2;
             clearInterval(gameInterval);
            setIntervalOfStart(snakeSpeed);
        }
       
    } else {
        snakeDirection.pop();
    }


}

// Reading the key and update the direction

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp" && direction !== 'down') {
        direction = "up";
    } else if (event.key === "ArrowLeft" && direction !== 'right') {
        direction = "left";
    } else if (event.key === "ArrowRight" && direction !== 'left') {
        direction = "right";
    } else if (event.key === "ArrowDown" && direction !== 'up') {
        direction = "down";
    }
});


//  Game over

function gameOver(){  
        clearInterval(gameInterval);
        mainGameContainer.style.display="none";
        gameOverBoard.style.display="inline-block";
        scoreOnBoard.textContent=scoreValue.toString().padStart(3,'0');
        console.log(scoreOnBoard);
        highScoreOnBoard.textContent=highScore.toString().padStart(3,'0');
        console.log(highScoreOnBoard);
         reStartBtn.onclick= function(){
            reStartGame();
       }
       exitBtn.onclick=function(){
        exitGame();
       }
   
}


// move the snake 
 function setIntervalOfStart(snakeSpeed){
    gameInterval=setInterval(() => {
    gameStart();
    draw();
    console.log(snakeSpeed);
}, snakeSpeed)
 }



// This section for the score board

function setScore(){
        score.textContent= scoreValue.toString().padStart(3,'0');
        if(scoreValue>highScore){
            highScore=scoreValue;
            setHighScore();
        }
}

function setHighScore(){
    highScoreElement.textContent=highScore.toString().padStart(3,'0');
}

//  start the game on click the button of start

    startBtn.onclick= function(){
   mainGameContainer.style.display="inline-block";
    start.style.display="none";
 
    gameOverBoard.style.display="none"
    console.log("working")
    resetVariable();
    setIntervalOfStart(snakeSpeed);
    
}


// Restart the game 

function reStartGame(){
    scoreOnBoard.textContent=scoreValue;
    highScoreOnBoard.textContent=highScore;
    resetVariable();
    clearInterval(gameInterval);
    setIntervalOfStart(snakeSpeed);
    gameOverBoard.style.display="none";
    mainGameContainer.style.display="inline-block";
}

function exitGame(){
    localStorage.clear();
    sessionStorage.clear();
    clearInterval(gameInterval);
       
    mainGameContainer.style.display="none"
    gameOverBoard.style.display="none"
    start.style.display="flex"
}

    function resetVariable(){
         scoreValue=0;
         gameStarted=false;
         snakeDirection = [{
            x: 15,
            y: 10
        }];
         direction = 'right';
         gameInterval;
         snakeSpeed=300;
    }


reStartBtn.onclick= function(){
            reStartGame();
       }
 exitBtn.onclick=function(){
        exitGame();
       }

window.onload = function() {
  
    localStorage.clear();
    sessionStorage.clear();
    clearInterval(gameInterval);   
    mainGameContainer.style.display="none"
    gameOverBoard.style.display="none"
    start.style.display="flex"
     
}
