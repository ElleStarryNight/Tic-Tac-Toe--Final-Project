const statusDisplay = document.querySelector('.game-stats');

let gameActive = true;

let currentPlayer = "X";

let gameState = ["", "", "", "", "", "", "", "", ""];


const winningMessage = () => `Player ${currentPlayer} wins!`;

const drawMessage = () => `It's a draw!`;

const currentPlayerTurn = () => `It's ${currentPlayer}'s turn!`;

statusDisplay.innerHTML = currentPlayerTurn();

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));

document.querySelector('.restartGame').addEventListener('click', handleRestartGame);


function handleCellClick(clickedCellEvent){
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index')
    );

    if(gameState[clickedCellIndex] !== "" || !gameActive || currentPlayer === "O"){
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);

    handleResultValidation();

    if (gameActive && currentPlayer === "O"){
        setTimeout(() => AIMove(), 500);
    }
}


function handleCellPlayed(clickedCell, clickedCellIndex){
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


function handleResultValidation(){
    let roundWin = false;
    for (let i = 0; i <= 7; i++){
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === ''){
            continue;
        }

        if (a === b && b === c){
            roundWin = true;
            break;
        }
    }

    if (roundWin){
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    
    
    let roundDraw = !gameState.includes('');
    
    if (roundDraw){
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    

    handlePlayerchange();

}


function handlePlayerchange(){
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}


function AIMove() {
    const availableCells = gameState.map((cell, index) => cell === "" ? index : -1).filter(index => index !== -1);

    if (availableCells.length === 0){
        return;
    }

    const aiMove = availableCells[Math.floor(Math.random() * availableCells.length)];
    
    gameState[aiMove] = "O";

    document.querySelector(`[data-cell-index="${aiMove}"]`).innerHTML = "O";

    handleResultValidation();
}



function handleRestartGame(){
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}