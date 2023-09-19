const initialWord = document.getElementById('initialWord');
const removingWord = document.getElementById('removingWord');
const firstBox = document.getElementById('firstBox');
const secondBox = document.getElementById('secondBox');

function changeWords() {
    let firstWord = initialWord.value;
    let secondWord = removingWord.value;
    let text = firstBox.value;
    let myRegex = new RegExp(firstWord, 'gi');
    secondBox.innerText = text.replace(myRegex, secondWord);
}

firstBox.addEventListener('keyup', changeWords);
firstBox.addEventListener('change', changeWords);
initialWord.addEventListener('change', changeWords);
removingWord.addEventListener('change', changeWords);
initialWord.addEventListener('keyup', changeWords);
removingWord.addEventListener('keyup', changeWords);