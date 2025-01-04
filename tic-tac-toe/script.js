let squares = document.querySelectorAll('.square');
let gameBoard = document.querySelector('.game-board');
let reset = document.querySelector('#reset');
let winner = document.querySelector('#winner');
let displayWinner = document.querySelector('.displayWinner');
let newGame = document.querySelector('#newGame');






let turnX = true;



let winCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


let count = 0;

squares.forEach((square) => {
    square.addEventListener('click', () => {
        if(turnX){
            square.innerHTML = 'X';
            square.style.color = '#DAA520';
            turnX = false;
            square.disabled = true;
            count++;
        }else{
            square.innerHTML = 'O';
            square.style.color = '#00A8E8'; 
            turnX = true;
            square.disabled = true;
            count++;
        }
        checkWin();
        if(count == 9){
            draw();
        }
    });
});

const disableSquares = () => {
    squares.forEach((square) => {
        square.disabled = true;
    });
}
const enableSquares = () => {
    squares.forEach((square) => {
        square.disabled = false;
        square.innerHTML = '';
    });
}

const win = (player) => {
    winner.innerHTML = 'Player ' + player + ' has won';
    displayWinner.style.display = 'flex';
    disableSquares();
}
const checkWin =  () => {
    for(let pattern of winCondition){
        let square1 = squares[pattern[0]].innerHTML;
        let square2 = squares[pattern[1]].innerHTML;
        let square3 = squares[pattern[2]].innerHTML;

        if(square1 != '' && square1 == square2 && square2 == square3){
            console.log('player ' + square1 + ' has won');
            win(square1);
            return true;
        }
    }
};

const draw = () => {
    disableSquares();
    console.log('Draw');    
}

reset.addEventListener('click', () => {
    enableSquares();
    count = 0;
    turnX = true;

});

newGame.addEventListener('click', () => {
    displayWinner.style.display = 'none';
    enableSquares();
    count = 0;
    turnX = true;
});