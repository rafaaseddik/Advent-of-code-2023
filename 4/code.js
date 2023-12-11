const fs = require("fs");
const { isNumberObject } = require("util/types");

let sum =0;
let hashmap = {

}
const text = fs.readFileSync("./input.txt").toString()



text.split("\n").forEach(line=>{
    const [card, numbers] = line.split(": ");
    const [winning, current] = numbers.split(" | ").map(list=>list.split(" ").map(i=>Number(i.trim())).filter(i=>i>0))
    const map = {}
    winning.forEach(w=>map[w] = true)
    const pow = current.filter(c=>map[c]).length
    if(pow){
        sum+= 2 ** (pow-1)
    }
    console.table({winning, current})
})

console.log(sum)