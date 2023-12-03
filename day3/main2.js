var fs = require('fs');

let data = fs.readFileSync('data2.txt');

let dataArray = data.toString('utf-8').split('\n');

let dataMatrix = [];

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

let stars = [];
let lineNumbersConcat = [];
let lineLength = 140;

for(let i = 0; i < dataMatrix.length; i++){
    let lineNumbers = [];

    for(let j = 0; j < lineLength; j++){
        let castToNum = parseInt(dataMatrix[i][j]);

        if(castToNum || castToNum === 0) lineNumbers.push({ line_index:i,row_index:j,value:castToNum })
    }

    groupConsecutiveIndices(lineNumbers).forEach(concatNum => {
        lineNumbersConcat.push(concatNum);
    })
    

    for(let j = 0; j < lineLength; j++){
        if(dataMatrix[i][j] === '*') stars.push({ line_index:i,row_index:j,adjacent_nums:[] });
    }   
}

stars.forEach(star => {
    let top_left = [0,0];
    let top = [0,star.row_index];
    let top_right = [0,0];
    let left = [star.line_index,0];
    let right = [star.line_index,0];
    let bottom_left = [0,0];
    let bottom = [0,star.row_index];
    let bottom_right = [0,0];

    if(star.line_index !== 0){
        top_left[0] = star.line_index - 1;
        top[0] = star.line_index - 1;
        top_right[0] = star.line_index - 1;
    }

    if(star.line_index < dataMatrix.length - 1){
        bottom_left[0] = star.line_index + 1;
        bottom[0] = star.line_index + 1;
        bottom_right[0] = star.line_index + 1;
    }else{
        bottom_left[0] = dataMatrix.length - 1;
        bottom[0] = dataMatrix.length - 1;
        bottom_right[0] = dataMatrix.length - 1;
    }

    if(star.row_index !== 0){
        top_left[1] = star.row_index - 1;
        left[1] = star.row_index - 1;
        bottom_left[1] = star.row_index - 1;
    }

    if(star.row_index < lineLength){
        top_right[1] = star.row_index + 1;
        right[1] = star.row_index + 1;
        bottom_right[1] = star.row_index + 1;
    }else{
        bottom_left[1] = lineLength;
        bottom[1] = lineLength;
        bottom_right[1] = lineLength;
    }

    lineNumbersConcat.forEach(num => {
        let i = 0;
        isAdjacent = false;

        while(i < num.length && !isAdjacent){
            if(top_left[0] === num[i].line_index && top_left[1] === num[i].row_index){
                star.adjacent_nums.push(num);
                isAdjacent = true;
            }

            if(top[0] === num[i].line_index && top[1] === num[i].row_index){
                star.adjacent_nums.push(num);
                isAdjacent = true;
            }

            if(top_right[0] === num[i].line_index && top_right[1] === num[i].row_index){
                star.adjacent_nums.push(num);
                isAdjacent = true;
            }

            if(left[0] === num[i].line_index && left[1] === num[i].row_index){
                star.adjacent_nums.push(num);
                isAdjacent = true;
            }

            if(right[0] === num[i].line_index && right[1] === num[i].row_index){
                star.adjacent_nums.push(num);
                isAdjacent = true;
            }

            if(bottom_left[0] === num[i].line_index && bottom_left[1] === num[i].row_index){
                star.adjacent_nums.push(num);
                isAdjacent = true;
            }

            if(bottom[0] === num[i].line_index && bottom[1] === num[i].row_index){
                star.adjacent_nums.push(num);
                isAdjacent = true;
            }

            if(bottom_right[0] === num[i].line_index && bottom_right[1] === num[i].row_index){
                star.adjacent_nums.push(num);
                isAdjacent = true;
            }

            i++;
        }
    })
})


let numList = [];
stars.forEach(star => {
    if(star.adjacent_nums.length === 2){
        let adjacent_nums = star.adjacent_nums;

        let nums = [];
        adjacent_nums.forEach(num => {
            let wholeNum = '';
            num.forEach(i => {
                wholeNum += i.value.toString();
            })

            nums.push(parseInt(wholeNum));
        })

        numList.push(nums[0] * nums[1]);
    }
})

let sum = 0;
numList.forEach(num => sum += num);

console.log(sum)
