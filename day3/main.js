var fs = require('fs');

let data = fs.readFileSync('data.txt');

let dataArray = data.toString('utf-8').split('\n');

let dataMatrix = [];

let symbols = ['@','#','$','%','&','*','-','+','=','/'];

let goodParts = [];

dataArray.forEach((line,index) => {
    dataMatrix[index] = line.split('');
})

function groupConsecutiveIndices(arrayOfDicts) {
    const result = [];
    let currentGroup = [];
  
    arrayOfDicts.forEach((dict, index) => {
      const row_index = dict.row_index;

      if (index === 0 || row_index === currentGroup[currentGroup.length - 1].row_index + 1) {
        currentGroup.push(dict);
      } else {
        result.push(currentGroup);
        currentGroup = [dict];
      }
    });
  
    if (currentGroup.length > 0) {
      result.push(currentGroup);
    }
  
    return result;
}

for(let i = 0; i < dataMatrix.length; i++){
    let lineNumbers = [];
    let lineLength = 140;
    for(let j = 0; j < lineLength; j++){
        let castToNum = parseInt(dataMatrix[i][j]);

        if(castToNum || castToNum === 0) lineNumbers.push({ line_index:i,row_index:j,value:castToNum })
    }

    let lineNumbersConcat = groupConsecutiveIndices(lineNumbers);

    lineNumbersConcat.forEach(lineNum => {
        let i = 0;
        let isGoodPart = false;

        while(i < lineNum.length && !isGoodPart){
            let top_left = [0,0];
            let top = [0,lineNum[i].row_index];
            let top_right = [0,0];
            let left = [lineNum[i].line_index,0];
            let right = [lineNum[i].line_index,0];
            let bottom_left = [0,0];
            let bottom = [0,lineNum[i].row_index];
            let bottom_right = [0,0];

            if(lineNum[i].line_index !== 0){
                top_left[0] = lineNum[i].line_index - 1;
                top[0] = lineNum[i].line_index - 1;
                top_right[0] = lineNum[i].line_index - 1;
            }

            if(lineNum[i].line_index < dataMatrix.length - 1){
                bottom_left[0] = lineNum[i].line_index + 1;
                bottom[0] = lineNum[i].line_index + 1;
                bottom_right[0] = lineNum[i].line_index + 1;
            }else{
                bottom_left[0] = dataMatrix.length - 1;
                bottom[0] = dataMatrix.length - 1;
                bottom_right[0] = dataMatrix.length - 1;
            }

            if(lineNum[i].row_index !== 0){
                top_left[1] = lineNum[i].row_index - 1;
                left[1] = lineNum[i].row_index - 1;
                bottom_left[1] = lineNum[i].row_index - 1;
            }

            if(lineNum[i].row_index < lineLength){
                top_right[1] = lineNum[i].row_index + 1;
                right[1] = lineNum[i].row_index + 1;
                bottom_right[1] = lineNum[i].row_index + 1;
            }else{
                bottom_left[1] = lineLength;
                bottom[1] = lineLength;
                bottom_right[1] = lineLength;
            }
            
            if(symbols.includes(dataMatrix[top_left[0]][top_left[1]])){
                goodParts.push(lineNum);
                isGoodPart = true;
            }

            if(symbols.includes(dataMatrix[top[0]][top[1]])){
                goodParts.push(lineNum);
                isGoodPart = true;
            }

            if(symbols.includes(dataMatrix[top_right[0]][top_right[1]])){
                goodParts.push(lineNum);
                isGoodPart = true;
            }
            
            if(symbols.includes(dataMatrix[left[0]][left[1]])){
                goodParts.push(lineNum);
                isGoodPart = true;
            }

            if(symbols.includes(dataMatrix[right[0]][right[1]])){
                goodParts.push(lineNum);
                isGoodPart = true;
            }

            if(symbols.includes(dataMatrix[bottom_left[0]][bottom_left[1]])){
                goodParts.push(lineNum);
                isGoodPart = true;
            }

            if(symbols.includes(dataMatrix[bottom[0]][bottom[1]])){
                goodParts.push(lineNum);
                isGoodPart = true;
            }

            if(symbols.includes(dataMatrix[bottom_right[0]][bottom_right[1]])){
                goodParts.push(lineNum);
                isGoodPart = true;
            }

            i++;
        }
    })      
}

let numList = [];
goodParts.forEach(part => {
    let num = '';

    part.forEach(i => {
        num += i.value.toString();
    })

    numList.push(parseInt(num));
})

let sum = 0;
numList.forEach(num => { sum += num });
console.log(sum)
