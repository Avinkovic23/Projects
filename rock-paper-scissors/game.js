const playerStats = document.querySelector('#playerStats');
const comStats = document.querySelector('#comStats');
const rockMove = document.querySelector('#rockMove');
const paperMove = document.querySelector('#paperMove');
const scissorsMove = document.querySelector('#scissorsMove');
const resultMessage = document.querySelector('#resultMessage');

const playingValue = JSON.parse(localStorage.getItem('playingValue'));

let computerMove, message;
let playerW = 0, playerT = 0, playerL = 0;
let comW = 0, comT = 0, comL = 0;

function updateScore() {
    playerStats.innerText = `W: ${playerW} T: ${playerT} L: ${playerL}`;
    comStats.innerText = `W: ${comW} T: ${comT} L: ${comL}`;
}

updateScore();

function checkScore() {
    if(playerW >= playingValue || comW >= playingValue) {
        if(playerW >= playingValue) {
            localStorage.setItem('result', 0);
        }
        else if(comW >= playingValue) {
            localStorage.setItem('result', 1);
        }
        window.location.href = 'end.html';
    }
}

function generateComputerMove() {
    let randomNum = Math.floor(Math.random() * 3);
    if(randomNum === 0) {
        computerMove = 'rock';
    }
    else if(randomNum === 1) {
        computerMove = 'paper';
    }
    else if(randomNum === 2) {
        computerMove = 'scissors';
    }
}

function playMove(move) {
    generateComputerMove();

    if(move === 'rock' && computerMove === 'paper') {
        message = 'Lose!';
        playerL++;
        comW++;
    }
    else if(move === 'rock' && computerMove === 'scissors') {
        message = 'Win!';
        playerW++;
        comL++;
    }
    else if(move === 'paper' && computerMove === 'scissors') {
        message = 'Lose!';
        playerL++;
        comW++;
    }
    else if(move === 'paper' && computerMove === 'rock') {
        message = 'Win!';
        playerW++;
        comL++;
    }
    else if(move === 'scissors' && computerMove === 'rock') {
        message = 'Lose!';
        playerL++;
        comW++;
    }
    else if(move === 'scissors' && computerMove === 'paper') {
        message = 'Win!';
        playerW++;
        comL++;
    }
    else if(move === computerMove) {
        message = 'Tie!';
        playerT++;
        comT++;
    }

    resultMessage.innerHTML = `${message}<br> The computer picked ${computerMove}.`;
    updateScore();
    checkScore();
}

rockMove.addEventListener('click', () => {
    playMove('rock');
});
paperMove.addEventListener('click', () => {
    playMove('paper');
});
scissorsMove.addEventListener('click', () => {
    playMove('scissors');
});


