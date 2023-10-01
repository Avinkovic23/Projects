import flagsData from './JSON/flagsData.json' assert {type: 'json'};

const options = Array.from(document.querySelectorAll('.flag-container'));
const countryTitle = document.querySelector('#countryTitle');
const questionCounter = document.querySelector('#questionCounter');
const scoreBoard = document.querySelector('#scoreBoard');
const resultModal = document.querySelector('#resultModal');

const correctAnswerSound = new Audio('sounds/correct.mp3');
const wrongAnswerSound = new Audio('sounds/wrong.mp3');

let questionsCounter;
let scorePoints;
let countries;
let availableCountries;
let acceptingAnswers = true;
let flagName;
let classToRemove;

let gameMode = localStorage.getItem('difficulty');

function updateScoreLine() {
    questionCounter.innerText = `Question ${questionsCounter} of 10`;
    scoreBoard.innerText = `SCORE: ${scorePoints}`;
}

function getFlags() {
    questionsCounter++;
    if(questionsCounter > 10) {
        localStorage.setItem('finalScore', JSON.stringify(scorePoints));
        window.location.assign('result.html');
    }
    options.map(option => {
        option.innerHTML = '';
    })
    updateScoreLine();
    countries = [...flagsData[`${gameMode}`]];
    let randomIndex = Math.floor(Math.random() * availableCountries.length);
    let questionFlag = availableCountries[randomIndex];
    countryTitle.innerText = `${questionFlag.name}`;
    flagName = questionFlag.name;
    let randomOption = Math.floor(Math.random() * 3);
    options[randomOption].innerHTML = `<img src="${questionFlag.flag}" class="flag-img">`;
    options[randomOption].setAttribute('name', `${questionFlag.name}`);
    countries.splice(countries.indexOf(questionFlag), 1);
    options.map(option => {
        if(!option.innerHTML) {
            let randomFlag = Math.floor(Math.random() * countries.length);
            option.innerHTML = `<img src="${countries[randomFlag].flag}" class="flag-img">`;
            option.setAttribute('name', `${countries[randomFlag].name}`);
            countries.splice(randomFlag, 1);
        }
    })
    availableCountries.splice(randomIndex, 1);
}

function startGame() {
    questionsCounter = 0;
    scorePoints = 0;
    availableCountries = [...flagsData[`${gameMode}`]];
    getFlags();
}

startGame();

function checkAnswer(choice) {
    if(!acceptingAnswers) {
        return;
    }
    acceptingAnswers = false;
    if(choice.parentElement.getAttribute('name') === flagName) {
        choice.parentElement.classList.add('correct');
        classToRemove = 'correct';
        scorePoints++;
        correctAnswerSound.play();
    }
    else {
        choice.parentElement.classList.add('incorrect');
        classToRemove = 'incorrect';
        wrongAnswerSound.play();
    }
    setTimeout(() => {
        choice.parentElement.classList.remove(classToRemove);
        acceptingAnswers = true;
        getFlags();
    }, 1000);
}

options.forEach(option => {
    option.addEventListener('click', e => {
        checkAnswer(e.target);
    });
});
