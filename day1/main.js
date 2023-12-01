var fs = require('fs');

// Part One
let data = fs.readFileSync('data.txt')

let dataArray = data.toString('utf-8').split('\n');

let number = []
dataArray.forEach(line => {
    let lineNumbers = []
    for(let i = 0; i < line.length; i++){
        let castToNumber = parseInt(line[i])
        if(castToNumber){
            lineNumbers.push(castToNumber.toString());
        }
    }

    let lineNumber = lineNumbers[0] + lineNumbers[lineNumbers.length-1];
    number.push(parseInt(lineNumber));
})

let sum = 0;
number.forEach(num => {
    sum += num;
})

console.log('PART ONE')
console.log(`Result: ${sum}`)
console.log('#############')

// Part Two
data = fs.readFileSync('data2.txt')

dataArray = data.toString('utf-8').split('\n');

number = [];

const numberStrings = {
    'one':'1',
    'two':'2',
    'three':'3',
    'four':'4',
    'five':'5',
    'six':'6',
    'seven':'7',
    'eight':'8',
    'nine':'9'
}

function getAllIndexOfString(str,resultList,searchStr){
    let i = -1;
    while((i = str.indexOf(searchStr,i+1)) >= 0) resultList.push({ index:i , value:searchStr });
}

dataArray.forEach(line => {
    let lineNumbers = [];
    for(let i = 0; i < line.length; i++){
        let castToNumber = parseInt(line[i])
        if(castToNumber){
            let indexedNum = {
                index:i,
                value:castToNumber.toString()
            }
            lineNumbers.push(indexedNum)
        }
    }

    if(line.includes('one')) lineNumbers.push(getAllIndexOfString(line,lineNumbers,'one'));
    if(line.includes('two')) lineNumbers.push(getAllIndexOfString(line,lineNumbers,'two'));
    if(line.includes('three')) lineNumbers.push(getAllIndexOfString(line,lineNumbers,'three'));
    if(line.includes('four')) lineNumbers.push(getAllIndexOfString(line,lineNumbers,'four'));
    if(line.includes('five')) lineNumbers.push(getAllIndexOfString(line,lineNumbers,'five'));
    if(line.includes('six')) lineNumbers.push(getAllIndexOfString(line,lineNumbers,'six'));
    if(line.includes('seven')) lineNumbers.push(getAllIndexOfString(line,lineNumbers,'seven'));
    if(line.includes('eight')) lineNumbers.push(getAllIndexOfString(line,lineNumbers,'eight'));
    if(line.includes('nine')) lineNumbers.push(getAllIndexOfString(line,lineNumbers,'nine'));

    const sortedLineNumbers = lineNumbers.sort((a,b) => a.index - b.index);
    const cleanLineNumbers = sortedLineNumbers.filter(element => element !== undefined)

    const firstItem = cleanLineNumbers[0];
    const lastItem = cleanLineNumbers[cleanLineNumbers.length-1];

    let lineNumber = '';

    if(parseInt(firstItem.value)) lineNumber += firstItem.value;
    else lineNumber += numberStrings[firstItem.value];

    if(parseInt(lastItem.value)) lineNumber += lastItem.value;
    else lineNumber += numberStrings[lastItem.value];
    
    number.push(parseInt(lineNumber));
})

sum = 0;
number.forEach(num => sum += num);

console.log('PART TWO')
console.log(`Result: ${sum}`)
