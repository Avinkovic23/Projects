const wordInput = document.querySelector('#wordInput');
const wordContainer = document.querySelector('.word-container');
const letterContainer = document.querySelector('.letter-container');
const livesNumber = document.querySelector('#livesNumber');
const modal = document.querySelector('.modal');
const finalMsg = document.querySelector('#finalMsg');
const playAgain = document.querySelector('#playAgain');
const mainMenu = document.querySelector('#mainMenu');

let words = [
    'PHONE', 'SKY', 'TREE', 'HORSE',
    'MINT', 'FROG', 'CAKE', 'JUMP',
    'LAKE', 'BIRD', 'FISH', 'BALL',
    'RAIN', 'LEAF', 'KITE', 'STAR',
    'BOOK', 'ROAD', 'FIRE', 'DUST',
    'MICE', 'BEAR', 'ROSE', 'SUN',
    'MOON', 'WIND', 'GOLD', 'LION',
    'KING', 'QUICK', 'QUIET', 'SMILE',
    'DREAM', 'HONEY', 'SMALL', 'ROUND',
    'GREEN', 'BLACK', 'WHITE', 'BLUE',
    'SING', 'DANCE', 'JAZZ', 'ROCK',
    'SNOW', 'WATER', 'CLOUD', 'WAVE',
    'HUG', 'KISS', 'LOVE', 'SWEET',
    'CUTE', 'TALL', 'FAST', 'LOUD',
    'SOFT', 'HARD', 'DEEP', 'HIGH',
    'LOW', 'LONG', 'WIDE', 'THIN',
    'FAST', 'SLOW', 'RICH', 'POOR',
    'WARM', 'COLD', 'OLD', 'YOUNG',
    'CLEAR', 'LOUD', 'PROUD', 'BOLD',
    'HAPPY', 'FUNNY', 'ANGRY', 'SAD',
    'CALM', 'BRAVE', 'SHARP', 'BLUNT'
];

let usedLetters = [];

const wordRegex = /^[A-Za-z]+$/gi;
let numberOfLives = 3;
livesNumber.innerText = numberOfLives;

const fail = new Audio('sounds/fail.mp3');
const win = new Audio('sounds/win.mp3');
const loss = new Audio('sounds/loss.mp3');

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

const myWord = getRandomWord();

setWord();

function setWord() {
    for(let i = 0; i < myWord.length; i++) {
        let letterElement = document.createElement('div');
        wordContainer.append(letterElement);
        letterElement.classList.add('letter');
        letterElement.setAttribute('letter', myWord[i]);
    }
}

function deductLives() {
    numberOfLives--;
    if(numberOfLives === 0) {
        showLosingMessage();
    }
    else {
        fail.play();
    }
    livesNumber.innerText = numberOfLives;
}

function showWinningMessage() {
    win.play();
    finalMsg.innerHTML = `You won! <br> The word was ${myWord}.`;
    modal.style.display = 'flex';
}

function showLosingMessage() {
    loss.play();
    finalMsg.innerHTML = `You lost! <br> The word was ${myWord}. <br> Better luck next time!`;
    modal.style.display = 'flex';
}

function checkLetters(input) {
    const letters = document.querySelectorAll('.letter');
    let counter = 0;

    Array.from(letters).map(item => {
        if(item.getAttribute('letter') === input) {
            item.innerText = input;
            counter++;
        }
    })

    if(Array.from(letters).every(letter => letter.innerText)) {
        showWinningMessage();
    }

    if(counter === 0) {
        if(usedLetters.indexOf(input) === -1) {
            let usedLetter = document.createElement('div');
            usedLetter.classList.add('used-letter');
            usedLetter.innerText = input;
            letterContainer.append(usedLetter);
            usedLetters.push(input);
        }
        deductLives();
    }
}

function checkInput(input) {
    if(input.length > 1) {
        if(input === myWord) {
            showWinningMessage();
        }
        else {
            deductLives();
        }
    }
    else {
        checkLetters(input);
    }
}

wordInput.addEventListener('keydown', e => {
    if(e.key === 'Enter' && wordInput.value.match(wordRegex)) {
        checkInput(wordInput.value.toUpperCase());
        wordInput.value = '';
    }
})

playAgain.addEventListener('click', () => {
    window.location.assign('game.html');
});

mainMenu.addEventListener('click', () => {
    window.location.assign('main.html');
});