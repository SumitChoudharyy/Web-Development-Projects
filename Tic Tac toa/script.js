const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

]

// funtion which intialize the game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        boxes[index].classList.remove("win");
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "0";
    }else{
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer = "";

    winningPositions.forEach((position) => {
        // All3 Boxes Should be non empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !=="" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]) )
        {
            // Check if winner is X
            if(gameGrid[position[0]] === "X")
                answer = "X";
            else 
                answer = "0";

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            // Now We know X/0 is a Winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
    })

    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // When there is no Winner

    let fillcount = 0;
    gameGrid.forEach((box) =>{
        if(box !== ""){
            fillcount++;
        }
    });
    
    // Board is Filled, Game is tie
    if(fillcount === 9){
        gameInfo.innerText = "Game Tie !";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // Swap the Players
        swapTurn();
        // Checking if Any Player wins or not 
        checkGameOver();
    }
}

boxes.forEach((box,index) =>{
    box.addEventListener("click",() =>{
        handleClick(index);
    })
})


newGameBtn.addEventListener("click",initGame);