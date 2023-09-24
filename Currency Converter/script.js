const amountInput = document.querySelector('#amountInput');
const selectFrom = document.querySelector('#selectFrom');
const selectTo = document.querySelector('#selectTo');
const swapBtn = document.querySelector('#swapBtn');
const convertBtn = document.querySelector('#convertBtn');
const container = document.querySelector('.exchange-container');
const initialAmount = document.querySelector('#initialAmount');
const endAmount = document.querySelector('#endAmount');
const exchangeOne = document.querySelector('#exchangeOne');
const exchangeTwo = document.querySelector('#exchangeTwo');

const url = 'https://v6.exchangerate-api.com/v6/34c4fac49849a7448d8867a9/latest/USD';
let data = [];

async function getData() {
    const response = await fetch(url);
    const fetchedData = await response.json();
    data = fetchedData.conversion_rates;
}

function convert() {
    const fromValue = selectFrom.value;
    const toValue = selectTo.value;
    const amount = amountInput.value || 1.00;
    if(amount >= 0) {
        const result = (amount / data[fromValue]) * data[toValue];
        if(!container.classList.contains('full-scale')) {
            container.classList.add('full-scale');
            amountInput.addEventListener('keyup', convert);
            selectFrom.addEventListener('change', convert);
            selectTo.addEventListener('change', convert);
            swapBtn.addEventListener('click', convert);
            setTimeout(() => {
                initialAmount.innerText = `${amount} ${fromValue} =`;
                endAmount.innerText = `${result.toFixed(5)} ${toValue}`;
                exchangeOne.innerText = `1 ${fromValue} = ${((1 / data[fromValue]) * data[toValue]).toFixed(5)} ${toValue}`;
                exchangeTwo.innerText = `1 ${toValue} = ${((1 / data[toValue]) * data[fromValue]).toFixed(5)} ${fromValue}`;
            }, 350);
            
        }
        else {
            initialAmount.innerText = `${amount} ${fromValue} =`;
            endAmount.innerText = `${result.toFixed(5)} ${toValue}`;
            exchangeOne.innerText = `1 ${fromValue} = ${((1 / data[fromValue]) * data[toValue]).toFixed(5)} ${toValue}`;
            exchangeTwo.innerText = `1 ${toValue} = ${((1 / data[toValue]) * data[fromValue]).toFixed(5)} ${fromValue}`;
        }
    }
    else {
        alert('Input Error!');
    }
}

function swapCurrencies() {
    const holder = selectFrom.value;
    selectFrom.value = selectTo.value;
    selectTo.value = holder;
}

getData();

convertBtn.addEventListener('click', convert);
swapBtn.addEventListener('click', swapCurrencies);