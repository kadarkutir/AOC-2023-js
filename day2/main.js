var fs = require('fs');

// Part One
let data = fs.readFileSync('data.txt');

let dataArray = data.toString('utf-8').split('\n');

let goodGameIds = [];

dataArray.forEach(line => {
    let splitLine = line.split(':');
    let gameId = parseInt(splitLine[0].split(' ')[1]);

    let pulls = splitLine[1].split(';');

    let gameResult = [];
    pulls.forEach(pull => {
        let splitPull = pull.split(',');

        splitPull.forEach(color => {
            let splitColor = color.split(' ');
            let colorName = splitColor[2].replace('\r','');
            let colorNumber = parseInt(splitColor[1]);

            if(colorName === 'green'){
                if(colorNumber <= 13){
                    gameResult.push('OK')
                }else{
                    gameResult.push('NOK')
                }
            }else if(colorName === 'blue'){
                if(colorNumber <= 14){
                    gameResult.push('OK')
                }else{
                    gameResult.push('NOK')
                }
            }else if(colorName === 'red'){
                if(colorNumber <= 12){
                    gameResult.push('OK')
                }else{
                    gameResult.push('NOK')
                }
            }
        })
    })

    if(!gameResult.includes('NOK')) goodGameIds.push(gameId)
})

let sum = 0;
goodGameIds.forEach(id => sum += id);

console.log('PART ONE')
console.log(`Result: ${sum}`)
console.log('###################')

// Part Two
data = fs.readFileSync('data.txt');

dataArray = data.toString('utf-8').split('\n');

prodResults = [];

dataArray.forEach(line => {
    let splitLine = line.split(':');
    let pulls = splitLine[1].split(';');

    let maxGreen = 0;
    let maxBlue = 0;
    let maxRed = 0;
    pulls.forEach(pull => {
        let splitPull = pull.split(',');


        splitPull.forEach(color => {
            let splitColor = color.split(' ');
            let colorName = splitColor[2].replace('\r','');
            let colorNumber = parseInt(splitColor[1]);

            if(colorName === 'green'){
                if(colorNumber > maxGreen) maxGreen = colorNumber;
            }else if(colorName === 'blue'){
                if(colorNumber > maxBlue) maxBlue = colorNumber;
            }else if(colorName === 'red'){
                if(colorNumber > maxRed) maxRed = colorNumber;
            }
        })
    })

    let gameResult = maxGreen * maxBlue * maxRed;
    prodResults.push(gameResult);
})

sum = 0;
prodResults.forEach(prod => sum += prod);

console.log('PART TWO')
console.log(`Result: ${sum}`)
console.log('###################')
