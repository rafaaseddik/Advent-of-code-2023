const fs = require("fs");
const { isNumberObject } = require("util/types");

let sum =0;
let hashmap = {

}
const text = fs.readFileSync("./input.txt").toString()



const lines = text.split("\n")

const map = lines.reduce((acc, line, index)=>{
    acc[index+1]=1
    return acc;
}, {})

console.log(map)

for(let i=0; i<lines.length; i++){
    const line = lines[i]
    const [card, numbers] = line.split(": ");
    const [winning, current] = numbers.split(" | ").map(list=>list.split(" ").map(i=>Number(i.trim())).filter(i=>i>0))
    const cMap = {}
    winning.forEach(w=>cMap[w] = true)
    const pow = current.filter(c=>cMap[c]).length
    for(let j=1; j<=pow; j++){
        map[i+j+1]+= map[i+1]
    }
}

console.log(Object.values(map).reduce((acc, curr)=>acc+curr,0))

//console.log(sum)