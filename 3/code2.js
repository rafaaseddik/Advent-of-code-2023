const fs = require("fs");
const { isNumberObject } = require("util/types");

let sum =0;
let hashmap = {

}
const text = fs.readFileSync("./input.txt").toString()

function safeNeighbor(matrix, row, col){
    // Close neighbors
    let result = []
    if(row>0){
        if(matrix[row-1][col] === '*')
        result.push([row-1,col].toString())
        if(col>0 && matrix[row-1][col-1] === '*')
        result.push([row-1,col-1].toString())
        if(col<matrix[0].length-1 && matrix[row-1][col+1] === '*')
        result.push([row-1,col+1].toString())
    }
    if(row<matrix.length-1){
        if(matrix[row+1][col] === '*')
        result.push([row+1,col].toString())
        if(col>0 && matrix[row+1][col-1] === '*')
        result.push([row+1,col-1].toString())
        if(col<matrix[0].length-1 && matrix[row+1][col+1] === '*')
        result.push([row+1,col+1].toString())
    }
    if(col>0 && matrix[row][col-1] === '*')
        result.push([row,col-1].toString())
    if(col<matrix[0].length-1 && matrix[row][col+1] === '*')
        result.push([row,col+1].toString())
    return result
}


const matrix = text.split("\n").map(line=>line.split("").map(char=>{
    if(Number(char) || char==='0') {
        return Number(char);
    }else if (char === "*"){
        return "*"
    }else{
        return null
    }
}));

console.table(matrix)


matrix.forEach((line, row)=>{
    console.log(row, line)
    let currentNumber=0;
    let flag = false;
    let set = new Set()
    for(let i=0; i<line.length; i++){
        const current = matrix[row][i];
        if(current === '*' || current===null){
            if(currentNumber>0 && flag){
                Array.from(set.values()).forEach(v=>{
                    if(hashmap[v]){
                        hashmap[v].push(currentNumber)
                    }else{
                        hashmap[v] = [currentNumber];
                    }
                })
            }
            set = new Set()
            currentNumber=0;
            flag=0;
        }else{
            flag = true;
            currentNumber = currentNumber*10 + current;
            safeNeighbor(matrix, row, i).forEach(e=>set.add(e))
        }
    }
    if(currentNumber>0 && flag){
        Array.from(set.values()).forEach(v=>{
            if(hashmap[v]){
                hashmap[v].push(currentNumber)
            }else{
                hashmap[v] = [currentNumber];
            }
        })
    }
})
console.log(hashmap)

console.log(Object.values(hashmap).reduce((acc, v)=>{
    if(v.length===2){
        acc+= v[0]*v[1]
    }
    return acc
}, 0))