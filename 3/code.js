const fs = require("fs");
const { isNumberObject } = require("util/types");

let sum =0;

const text = fs.readFileSync("./input.txt").toString()

function safeNeighbor(matrix, row, col){
    // Close neighbors

    if(row>0){
        if(matrix[row-1][col] === 'part')
        return true;
        if(col>0 && matrix[row-1][col-1] === 'part')
        return true;
        if(col<matrix[0].length-1 && matrix[row-1][col+1] === 'part')
        return true;
    }
    if(row<matrix.length-1){
        if(matrix[row+1][col] === 'part')
        return true;
        if(col>0 && matrix[row+1][col-1] === 'part')
        return true;
        if(col<matrix[0].length-1 && matrix[row+1][col+1] === 'part')
        return true;
    }
    if(col>0 && matrix[row][col-1] === 'part')
        return true;
    if(col<matrix[0].length-1 && matrix[row][col+1] === 'part')
        return true;
    return false
}


const matrix = text.split("\n").map(line=>line.split("").map(char=>{
    if(Number(char) || char==='0') {
        return Number(char);
    }else if (char === "."){
        return "dot"
    }else{
        return "part"
    }
}));

console.table(matrix)

matrix.forEach((line, row)=>{
    console.log(row, line)
    let currentNumber=0;
    let flag = false;
    for(let i=0; i<line.length; i++){
        const current = matrix[row][i];
        if(current === 'dot' || current==='part'){
            if(currentNumber>0 && flag){
                console.log(currentNumber)
                sum+=currentNumber;
            }
            currentNumber=0;
            flag=0;
        }else{
            currentNumber = currentNumber*10 + current;
            if(safeNeighbor(matrix, row, i)){
                flag = true;
            }
        }
    }
    if(currentNumber>0 && flag){
        console.log(currentNumber)
        sum+=currentNumber;
    }
})
console.log(sum)