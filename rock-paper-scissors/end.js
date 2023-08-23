const endingResult = document.querySelector('#endingResult');

const result = JSON.parse(localStorage.getItem('result'));
const playingValue = JSON.parse(localStorage.getItem('playingValue'));

if(result === 0) {
    endingResult.innerHTML = `Congrats! <br> You won in the first to ${playingValue}!`;
}
else if(result === 1) {
    endingResult.innerHTML = `The computer won in the first to ${playingValue}! <br> Better luck next time!`;
}