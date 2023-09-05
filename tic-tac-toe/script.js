const boxes = Array.from(document.querySelectorAll('.box'));
const winMsg = document.querySelector('#winMsg');
const playerOneText = document.querySelector('#playerOneWin');
const playerTwoText = document.querySelector('#playerTwoWin');
const restartBtn = document.querySelector('#restartBtn');

let contents = [];

const playerOne = 'X';
const playerTwo = 'O';

let playCounter = 0;
let currentPlayer = playerOne;
let playerOneWins = 0;
let playerTwoWins = 0;
let displayingMessage = false;

startGame();

function startGame() {
    displayingMessage = false;
    playerOneText.innerText = `Player One: ${playerOneWins}`;
    playerTwoText.innerText = `Player Two: ${playerTwoWins}`;
    playCounter = 0;
    contents = [null, null, null, null, null, null, null, null, null];
    winMsg.innerText = '';
    boxes.forEach((box, index) => {
        box.innerText = '';
        box.addEventListener('click', (e) => {
            if(!contents[e.target.id]) {
                contents[e.target.id] = currentPlayer;
                e.target.innerText = currentPlayer;
                if(currentPlayer === playerOne) {
                    currentPlayer = playerTwo;
                }
                else {
                    currentPlayer = playerOne;
                }
                playCounter++;
                checkScore();
            }
        });
    });
}

function showWinner(sign) {
    if(sign === 'X') {
        winMsg.innerText = `Player one has won!`;
        setTimeout(() => {
            playerOneWins++;
            startGame()
        }, 2000);
    }
    else if(sign === 'O'){
        winMsg.innerText = `Player two has won!`;
        setTimeout(() => {
            playerTwoWins++;
            startGame()
        }, 2000);
    }
    else {
        winMsg.innerText = `Tie!`;
        setTimeout(() => {
            startGame()
        }, 2000);
    }
    displayingMessage = true;
}

function checkScore() {
    if(!displayingMessage) {
        if(contents[0] != null && contents[0] === contents[1] && contents[1] === contents[2]) {
            showWinner(contents[0]);
        }
        else if(contents[0] != null && contents[0] === contents[4] && contents[4] === contents[8]) {
            showWinner(contents[0]);
        }
        else if(contents[0] != null && contents[0] === contents[3] && contents[3] === contents[6]) {
            showWinner(contents[0]);
        }
        else if(contents[2] != null && contents[2] === contents[4] && contents[4] === contents[6]) {
            showWinner(contents[2]);
        }
        else if(contents[2] != null && contents[2] === contents[5] && contents[5] === contents[8]) {
            showWinner(contents[2]);
        }
        else if(contents[1] != null && contents[1] === contents[4] && contents[4] === contents[7]) {
            showWinner(contents[1]);
        }
        else if(contents[3] != null && contents[3] === contents[4] && contents[4] === contents[5]) {
            showWinner(contents[3]);
        }
        else if(contents[6] != null && contents[6] === contents[7] && contents[7] === contents[8]) {
            showWinner(contents[6]);
        }
        else {
            if(playCounter === 9) {
                showWinner(-1);
            }
        }
    }  
}

restartBtn.addEventListener('click', () => {
    playerOneWins = 0;
    playerTwoWins = 0;
    startGame();
})