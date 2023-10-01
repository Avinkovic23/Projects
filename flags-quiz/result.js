const playAgain = document.querySelector('#playAgain');
const backToMenu = document.querySelector('#backToMenu');
const finalScore = document.querySelector('#finalScore');
const finalMsg = document.querySelector('#finalMsg');

const scorePoints = JSON.parse(localStorage.getItem('finalScore'));

finalScore.innerText = `Score: ${scorePoints}`;

function displayMessage() {
    if(scorePoints < 5) {
        finalMsg.innerText = "Needs more practice!";
    }
    else if(scorePoints === 5) {
        finalMsg.innerText = "Halfway there!";
    }
    else if(scorePoints === 6) {
        finalMsg.innerText = "Average...";
    }
    else if(scorePoints === 7) {
        finalMsg.innerText = "Solid!";
    }
    else if(scorePoints === 8) {
        finalMsg.innerText = "Almost there!";
    }
    else if(scorePoints === 9) {
        finalMsg.innerText = "All you had to do was to get 10/10, CJ!";
    }
    else if(scorePoints === 10) {
        finalMsg.innerText = "Perfection!";
    }
}

displayMessage();

playAgain.addEventListener('click', () => {
    window.location.assign('game.html');
});

backToMenu.addEventListener('click', () => {
    window.location.assign('main.html');
});