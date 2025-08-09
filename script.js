let playingField=document.querySelector('.playing-field');
let foodDirection=generateFoodDirection();
let snakeDirection=[{
    x:15,
    y:10
}];
let direction='right';

// Draw the snake

function draw(){
    playingField.innerHTML='';  
    drawSnake();
    makeFood() ;  
}


function drawSnake(){
    snakeDirection.forEach((position)=>{
        const snake=createGameElement('div','snake');
        setPosition(snake,position);
        playingField.appendChild(snake)
    })
}


//  making the food for the snake and  set to the random position
function makeFood(){
    const food =createGameElement('div','food');
    console.log(foodDirection)
    console.log(food)
    setPosition(food,foodDirection)
    playingField.appendChild(food)
}

function generateFoodDirection(){
             let x=(Math.floor(Math.random()*30))+1;
            let y=(Math.floor(Math.random()*20))+1;
            return {x,y};
}


function setPosition(snake,position){
    snake.style.gridColumn=position.x;
    snake.style.gridRow=position.y;
}

function createGameElement(tag,idName){
    const element=document.createElement(tag);
    element.id=idName;
    return element;
}

        function gameStart(){
            const head={...snakeDirection[0]};
                if(direction==='right'){
                    head.x++
                   
                }else if(direction==='left'){
                    head.x--;
                }else if(direction==='up'){
                    head.y--;
                }else if(direction=='down'){
                    head.y++;
                }
                snakeDirection.unshift(head)
                
                if(snakeDirection[0].x===foodDirection.x && snakeDirection[0].y===foodDirection.y){
                    console.log("hit");
                }else{
                    snakeDirection.pop();
                }

        }


setInterval(()=>{
    // gameStart();
    // draw();
},300)

