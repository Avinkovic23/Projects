const playGame = document.querySelector('#playGame');
const easy = document.querySelector('#easy');
const normal = document.querySelector('#normal');
const hard = document.querySelector('#hard');
const buttons = document.querySelectorAll('button');

normal.classList.add('modeOn');

localStorage.setItem('difficulty', 'normal');

playGame.addEventListener('click', () => {
    window.location.assign('game.html');
});

function clearButtons() {
    buttons.forEach(button => {
        button.classList.remove('modeOn')
    })
}

easy.addEventListener('click', () => {
    clearButtons();
    easy.classList.add('modeOn');
    localStorage.setItem('difficulty', 'easy');
});

normal.addEventListener('click', () => {
    clearButtons();
    normal.classList.add('modeOn');
    localStorage.setItem('difficulty', 'normal');
});

hard.addEventListener('click', () => {
    clearButtons();
    hard.classList.add('modeOn');
    localStorage.setItem('difficulty', 'hard');
});