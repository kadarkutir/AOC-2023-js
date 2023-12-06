var fs = require('fs');

let data = fs.readFileSync('data.txt').toString('utf-8').split('\n');

let times = data[0].split(':')[1].split(' ').filter(element => element !== '').map(time => { return parseInt(time) });
let distances = data[1].split(':')[1].split(' ').filter(element => element !== '').map(distance => { return parseInt(distance) });

let results = [];
times.forEach((time,index) => {
    let recordTimes = [];
    for(let i = 1; i < time; i++){
        let timeToTravel = time-i;
        let distanceTravelled = timeToTravel * i;

        if(distanceTravelled >= distances[index]) recordTimes.push(i);
    }

    results.push(recordTimes);
})

let product = 1;
results.forEach(result => { product *= result.length });

console.log('PART ONE')
console.log(`Result: ${product}`)
console.log('##############')

let time = parseInt(data[0].split(':')[1].split(' ').filter(element => element !== '').join(''));
let ditance = parseInt(data[1].split(':')[1].split(' ').filter(element => element !== '').join(''));

results = [];
for(let i = 1; i < time; i++){
    let timeToTravel = time-i;
    let distanceTravelled = timeToTravel * i;

    if(distanceTravelled >= ditance) results.push(i);
}

console.log('PART TWO')
console.log(`Result: ${results.length}`)
console.log('##############')