var fs = require('fs');

// Part One

let data = fs.readFileSync('data.txt');

let dataArray = data.toString('utf-8').split('\n');

let gameResults = [];

dataArray.forEach(card => {
    let winnerNumbers = [];
    let cardResult = card.split(':')[1];

    let winningNumbers = cardResult.split('|')[0].split(' ').filter(element => element !== '');
    let cardNumbers = cardResult.split('|')[1].split(' ').filter(element => element !== '');

    cardNumbers.forEach(cardNum => {
        if(winningNumbers.includes(cardNum)) winnerNumbers.push(cardNum);
    })

    gameResults.push(winnerNumbers);
})

let sum = 0;

gameResults.forEach(result => {
    if(result.length > 0) sum += Math.pow(2,result.length-1);
})

console.log('PART ONE')
console.log(`Result: ${sum}`)
console.log('################')

// Part Two

data = fs.readFileSync('data2.txt');

dataArray = data.toString('utf-8').split('\n');

gameResults = [];

for(let i = 0; i < dataArray.length; i++){
    gameResults[i] = 1;
}

dataArray.forEach((card,index) => {
    let cardsWon = 0;
    let cardResult = card.split(':')[1];

    let winningNumbers = cardResult.split('|')[0].split(' ').filter(element => element !== '');
    let cardNumbers = cardResult.split('|')[1].split(' ').filter(element => element !== '');

    cardNumbers.forEach(cardNum => {
        if(winningNumbers.includes(cardNum)) cardsWon += 1;
    })

    let maxCardWon = (index + cardsWon)+1;
    let numberOfIteration = gameResults[index];
    let firstCardWon = index + 1;

    for(let j = 0; j < numberOfIteration; j++){
        for(let i = firstCardWon; i < maxCardWon; i++){
            gameResults[i] += 1;
        }
    }
})
sum = 0;
gameResults.forEach(r => { sum += r });

console.log('PART TWO')
console.log(`Result: ${sum}`)
console.log('#################')

