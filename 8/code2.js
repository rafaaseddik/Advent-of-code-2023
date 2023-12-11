const fs = require("fs");
const { isNumberObject } = require("util/types");

let sum =0;

const text = fs.readFileSync("./input.txt").toString()
const lines = text.split("\n\n")

// node = {name, left, right}

const nodes = {}
const startNodes = [];

const instructions = lines[0];
const networkRaw = lines[1].split("\n");

networkRaw.forEach(line => {
    const [start, rest] = line.split(" = (");
    const [left, right] = rest.split(', ')
    nodes[start] = {name: start, left, right: right.split(')')[0]}
    if(start.endsWith("A"))
    startNodes.push(start)
})

console.table(nodes)
let current = [...startNodes];

function isEnd(node){
    return node.endsWith("Z")
}


for(start of startNodes){
    let current = start;
    let sumToEnd = 0;
    let sumToStart = 0;
    let endNode;
    while(!isEnd(current)) {
        for(char of instructions.split('')){            
            if(char == "R"){
                current =  nodes[current].right
            }
            else{
                current =  nodes[current].left
            }
            sumToEnd++;
        }
    }
    endNode= current;
    console.log(start, current, sumToEnd)
    while(sumToStart==0 ||  current!=endNode) {
        for(char of instructions.split('')){            
            if(char == "R"){
                current =  nodes[current].right
            }
            else{
                current =  nodes[current].left
            }
            sumToStart++;
        }
    }
    console.log(start, sumToEnd, sumToStart);
}
return;
while(false && !current.every(isEnd)) {
    //console.log(current.every(isEnd), current)
    for(char of instructions.split('')){
        //console.log(current)
        current = current.map(node=>{
            if(char == "R"){
                return nodes[node].right
            }
            else{
                return nodes[node].left
            }
        })
        sum++;
    }
}

//console.log({instructions, networkRaw, nodes})
console.log(sum)


// Step 0: You are at 11A and 22A.
// Step 1: You choose all of the left paths, leading you to 11B and 22B.
// Step 2: You choose all of the right paths, leading you to 11Z and 22C.
// Step 3: You choose all of the left paths, leading you to 11B and 22Z.
// Step 4: You choose all of the right paths, leading you to 11Z and 22B.
// Step 5: You choose all of the left paths, leading you to 11B and 22C.
// Step 6: You choose all of the right paths, leading you to 11Z and 22Z.