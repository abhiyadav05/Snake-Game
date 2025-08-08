console.log("helooo")

let snake=document.querySelector("#snake")
let food=document.querySelector("#food")

var snakePosition={
    x : 15,
    y : 10,
}
function setPositionOfSnake(){
        snake.style.gridColumn=snakePosition.x;
        snake.style.gridRow=snakePosition.y;
}
// This is all the function of moving the snake

function upPressed(){
       snakePosition.y--;
        setPositionOfSnake();

}
function leftPressed(){

}
function rightPressed(){

}
function downPressed(){

}

// This is the function of reading the key
function startFunctionOfKey(){
    document.addEventListener("keydown",(event) =>{
        if(event.key==="ArrowUp"){
           upPressed();
        }
         if(event.key==="ArrowDown"){
            downPressed();
        }
         if(event.key==="ArrowLeft"){
            leftPressed();
        }
        if(event.key==="ArrowRigh"){
            rightPressed();
        }
    })
}

// This is the function of start the game

function gameStart(){
    for(let i=snakePosition.x;i<30;i++){
       setTimeout(()=>{
         snake.style.gridColumn=i;
       },(i - snakePosition.x) * 500)
    }
    startFunctionOfKey();
}
setPositionOfSnake();
gameStart()