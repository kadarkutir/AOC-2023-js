var fs = require('fs');

let data = fs.readFileSync('data.txt');

let dataArray = data.toString('utf-8').split('\n').filter(element => element !== '');

// Part One

let seeds = dataArray[0].split(':')[1].split(' ').filter(seed => seed !== '').map(seed => { return parseInt(seed) });

let seed_to_soil = [];
let soil_to_fertilizer = [];
let fertilizer_to_water = [];
let water_to_light = [];
let light_to_temp = [];
let temp_to_humidity = [];
let humidity_to_location = [];

function get_source_destination_dict(index,arrayToPush){
    const rowData = dataArray[index].split(' ');
    const destinationStart = parseInt(rowData[0]);
    const sourceStart = parseInt(rowData[1]);
    const rangeLength = parseInt(rowData[2]);

    arrayToPush.push({
        source_start:sourceStart,
        source_end:(sourceStart+rangeLength)-1,
        destination_start:destinationStart,
        destination_end:(destinationStart+rangeLength)-1
    })
}

let textIndex = 0;
for(let i = 1; i < dataArray.length; i++){
    if(!parseInt(dataArray[i]) && dataArray[i][0] !== '0' && dataArray[i] !== ''){
        textIndex = i;
    }else{
        if(dataArray[textIndex] === 'seed-to-soil map:') get_source_destination_dict(i,seed_to_soil);
        if(dataArray[textIndex] === 'soil-to-fertilizer map:') get_source_destination_dict(i,soil_to_fertilizer);
        if(dataArray[textIndex] === 'fertilizer-to-water map:') get_source_destination_dict(i,fertilizer_to_water);
        if(dataArray[textIndex] === 'water-to-light map:') get_source_destination_dict(i,water_to_light);
        if(dataArray[textIndex] === 'light-to-temperature map:') get_source_destination_dict(i,light_to_temp);
        if(dataArray[textIndex] === 'temperature-to-humidity map:') get_source_destination_dict(i,temp_to_humidity);
        if(dataArray[textIndex] === 'humidity-to-location map:') get_source_destination_dict(i,humidity_to_location);
    }
}

function getMappingResult(seed,mapping){
    let i = 0;
    while(i < mapping.length){
        if(seed >= mapping[i].source_start && seed <= mapping[i].source_end) {
            return mapping[i].destination_start + (seed - mapping[i].source_start);
        }

        i++;
    }

    return seed;
}

function seedToLocation(seed){
    let soil = getMappingResult(seed,seed_to_soil);
    let fertilizer = getMappingResult(soil,soil_to_fertilizer);
    let water = getMappingResult(fertilizer,fertilizer_to_water);
    let light = getMappingResult(water,water_to_light);
    let temp = getMappingResult(light,light_to_temp);
    let humidity = getMappingResult(temp,temp_to_humidity);
    let location = getMappingResult(humidity,humidity_to_location);

    return location
}

let locationArray = [];
seeds.forEach(seed => {
    let location = seedToLocation(seed)

    locationArray.push(location);
})

let minLocation = Math.min(...locationArray);
console.log('PART ONE')
console.log(`Result: ${minLocation}`)
console.log('###########################')

// Part Two

locationArray = [];
for(let i = 0; i < seeds.length; i+=2){
    const seedStart = seeds[i];
    const seedEnd = seeds[i] + seeds[i+1];
    let minSeedLocation = seeds[i];

    for(let j = seedStart; seedStart < seedEnd; j++){
        let location = seedToLocation(j)

        if(minSeedLocation > location) minSeedLocation = location;
    }

    locationArray.push(minSeedLocation);
}

minLocation = Math.min(...locationArray);
console.log(minLocation);