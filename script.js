const boxes = document.querySelectorAll(".boxes");
const newGamebtn = document.querySelector(".btn");
const playersName = document.querySelector(".player");

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
];

//let's create a function to initialize the game.
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","","",""];
    // also update UI for each boxes
    boxes.forEach((box, index) =>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // initialize default css property to all boxes.
        box.classList = `boxes box${index+1}`
    });
        
    
    newGamebtn.classList.remove("btn-active")
    playersName.innerText = `Current Player -${currentPlayer}`; 
}

initGame ();

function swapTurn (){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    } else currentPlayer = "X"
    // UI update--
    playersName.innerText = `Current Player -${currentPlayer}`; 
}

function checkGameOver (){
    let answer ="";

    winningPositions.forEach((position)=>{
        //all 3 boxes should be empty and same in value.
        if(( gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="") && gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]]){
            // check if winner is X
            if (gameGrid[position[0]] === "X")
                answer = "X";
             else 
                answer = "O";

            // disable pointer events.
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });
            // now we know X/O is winner.
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    // here we have winner.
    if (answer !== ""){
        playersName.innerText = `Winner is ${answer}`;
        newGamebtn.classList.add('btn-active');
        return;
        }

    // let's check whether there is tie.
    let fillCount = 0;
    gameGrid.forEach((box) =>{
        fillCount++;
    });

    // board is filled game is tied.
    if (fillCount === 9){
        playersName.innerText = "Game Tied";
        newGamebtn.classList.add('btn-active');
    }
}

function handleClick(index){
    if(gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        //remove cursor pointer after click --
        boxes[index].style.pointerEvents = "none";
        //swap b/w players
        swapTurn();
        // check if anyone won or not
        checkGameOver(); 
    }
}

boxes.forEach((box, index) =>{
    box.addEventListener('click', () =>{
        handleClick(index);
    })
});

newGamebtn.addEventListener("click",initGame);