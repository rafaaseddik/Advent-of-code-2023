const fs = require("fs");
const { isNumberObject } = require("util/types");

let sum =0;

const text = fs.readFileSync("./input.txt").toString()
let start;
let startNeighbors = [];
const nodes = {};
const nodesList = []
function createNode(node, x, y){
    let result;
    switch(node){
        case "|": {
            result = {pos: `${x}-${y}`, next: [ `${x}-${y-1}`, `${x}-${y+1}`], char: node}
            break;
        }
        case "-": {
            result = {pos: `${x}-${y}`, next: [ `${x-1}-${y}`, `${x+1}-${y}`], char: node}
            break;
        }
        case "L" : {
            result = {pos: `${x}-${y}`, next: [ `${x}-${y-1}`, `${x+1}-${y}`], char: node}
            break;
        }
        case "J": {
            result = {pos: `${x}-${y}`, next: [ `${x}-${y-1}`, `${x-1}-${y}`], char: node}
            break;
        }
        case "7": {
            result = {pos: `${x}-${y}`, next: [ `${x}-${y+1}`, `${x-1}-${y}`], char: node}
            break;
        }
        case "F": {
            result = {pos: `${x}-${y}`, next: [ `${x}-${y+1}`, `${x+1}-${y}`], char: node}
            break;
        }
    }


    return result;
}

function next(current, previous){
    let node = nodes[current];
    return node.next.filter(n=>n!=previous)[0];
}
// node : pos: "x-y", next : [ coordinates ]
text.split("\n").forEach((line, y)=>{
    line.split("").forEach((node, x)=>{
        const coord = `${x}-${y}`
        if(node!=='.' && node!=='S'){
            const formatted =  createNode(node, x, y);
            nodes[coord] = formatted;
            nodesList.push(formatted)
        }
        if(node == "S"){
            start = coord
        }
    })
})

for(node of nodesList){
    console.log(node)
    if(node.next.some(neighbor=>neighbor === start)){
        startNeighbors.push(node.pos)
    }
}
console.log(start, startNeighbors)
let current = startNeighbors[0];
let previous = start;
while(current !== start){
    console.log(nodes[current])
    let nowCurrent = current;
    current = next(current, previous)
    previous = nowCurrent;
    sum++;
}


console.log(sum)
//console.table(nodesList)


