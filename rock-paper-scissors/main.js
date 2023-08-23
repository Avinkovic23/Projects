const playBtn = document.querySelector('#playBtn');
const valueShow = document.querySelector('#valueShow');
const valueRange = document.querySelector('#playingValue');
const gameMode = document.querySelector('#gameMode');
const gameModeContainer = document.querySelector('.game-mode');

playBtn.addEventListener('click', () => {
    window.location.href = 'game.html';
});

gameMode.addEventListener('click', () => {
    gameModeContainer.classList.toggle('hidden');
});

valueRange.addEventListener('input', () => {
    valueShow.innerText = `The first to ${valueRange.value}`;
    let playingValue = valueRange.value;
    localStorage.setItem('playingValue', playingValue); 
});