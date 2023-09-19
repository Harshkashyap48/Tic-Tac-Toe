const boxes = document.querySelectorAll(".box");
const  gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;
const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],[1,4,7],[2,5,8] , // horizontal check
    [0,4,8],[2,4,6]          // vertical check
];

//initialise game
function initialiseGame (){
      currentPlayer="X";
      gameGrid = ["","","","","","","","",""];
      // for UI empty
       boxes.forEach((box, index) =>{
         box.innerText = "";
         boxes[index].style.pointerEvents = "all";

        box.classList = `box box${index+1}`;
      });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `currentPlayer - ${currentPlayer}`;
    
}
 initialiseGame(); 

function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }
    else {
        currentPlayer ="X";
    }
    //UI update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;//
}
    
function checkGameOver(){
  let winner ="";

   winningPositions.forEach((position) => {
     if ((gameGrid[position[0]] !=="" || gameGrid[position[1]] !=="" || gameGrid[position[2]] !=="")
     
        && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] ===gameGrid[position[2]])){
            if(gameGrid[position[0]] ==="X")
                winner = "x" ;
            else
                 winner = "0";
            
                boxes.forEach((box) =>{
                    box.style.pointerEvents = "none";
                 });


            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }

    });
           if (winner !==""){
                gameInfo.innerText = `Winner Player - ${winner}`;
                newGameBtn.classList.add("active");
                return;
            }
            let fillCount = 0;
               gameGrid.forEach((box) =>{
                  if(box!=="")
                    fillCount++;
                });
            
               if (fillCount===9){
                   gameInfo.innerText = "Game Tied";
                   newGameBtn.classList.add("active");
                 }
}

 function handleClick(index){
    if (gameGrid[index] === "" ) {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
       boxes[index].style.pointerEvents = "none";
        //swapping
        swapTurn();
        checkGameOver();
       
    }
 }

boxes.forEach((box, index) => {
     box.addEventListener("click", () => {
         handleClick(index);
     })
 });
 newGameBtn.addEventListener("click",initialiseGame);
