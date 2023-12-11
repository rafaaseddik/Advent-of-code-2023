const fs = require("fs");
const { isNumberObject } = require("util/types");

let result =Infinity;

const text = fs.readFileSync("./input.txt").toString()

const lines = text.split("\n")

const seeds = lines[0].split(': ')[1].split(" ").map(Number)

const order = [
    "seed-to-soil",
    "soil-to-fertilizer",
    "fertilizer-to-water",
    "water-to-light",
    "light-to-temperature",
    "temperature-to-humidity",
    "humidity-to-location",
]

const map = new Map();

function getMap(key, source){
    const intervals = map.get(key)
    const interval = intervals.find(interval => interval.source<= source && (interval.source+interval.length)>=source)
    if(interval){
        return interval.destination + source-interval.source;
    }
    else 
        return source;

}


const categoriesRaw = text.split("\n\n").slice(1).map(line=>{
    const [cat, numbers]  = line.split(" map:\n")
    const [src, dest] = cat.split("-to-")
    const intervals = numbers.split("\n").map(l=>{
        const [destination, source, length] = l.split(" ")
        return {source: Number(source), destination: Number(destination), length: Number(length)}
    })
    return {cat, source:src, destination:dest, intervals}
});
categoriesRaw.forEach(({cat, intervals})=>map.set(cat, intervals))
console.log(seeds, JSON.stringify(categoriesRaw, null, 2))


seeds.forEach(seed=>{
    console.log("-------SEED", seed)
    let currentValue = seed;
    for(key of order){
        currentValue = getMap(key, currentValue)
        console.log(key, currentValue)
    }
    result = Math.min(result, currentValue)
})


console.log(result)