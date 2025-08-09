// variables

let playingField = document.querySelector('.playing-field');
let foodDirection = generateFoodDirection();
let score=document.querySelector('#score-num');
let scoreValue=0;
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
            alert("game over");
            gameOver();
        }
    }
    if (snakeDirection[0].x === foodDirection.x && snakeDirection[0].y === foodDirection.y) {
        console.log("hit");
        scoreValue++;
        setScore();
        foodDirection = generateFoodDirection();
        if(snakeSpeed>200){
            snakeSpeed-=10;
            clearInterval(gameInterval);
            setIntervalOfStart(snakeSpeed);
        }else if(snakeSpeed>100){
            snakeSpeed-=5;
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
}
// move the snake 
 function setIntervalOfStart(snakeSpeed){
    gameInterval=setInterval(() => {
    gameStart();
    draw();
    console.log(snakeSpeed);
}, snakeSpeed)
 }

//  setIntervalOfStart(snakeSpeed);

// This section for the score board

function setScore(){
        score.innerHTML= scoreValue;
}