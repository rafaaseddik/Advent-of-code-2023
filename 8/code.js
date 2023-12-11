const fs = require("fs");
const { isNumberObject } = require("util/types");

let sum =0;

const text = fs.readFileSync("./input.txt").toString()
const lines = text.split("\n\n")

// node = {name, left, right}

const nodes = {}


const instructions = lines[0];
const networkRaw = lines[1].split("\n");

networkRaw.forEach(line => {
    const [start, rest] = line.split(" = (");
    const [left, right] = rest.split(', ')
    nodes[start] = {name: start, left, right: right.split(')')[0]}
})

let current = 'AAA';
const end = 'ZZZ';


while(current !== end) {
    for(char of instructions.split('')){
        if(char == "R"){
            current = nodes[current].right
        }
        else{
            current = nodes[current].left
        }
        sum++;
    }
}

console.log({instructions, networkRaw, nodes})
console.log(sum)