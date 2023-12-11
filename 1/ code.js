const fs = require("fs");
const { isNumberObject } = require("util/types");

let sum =0;

const text = fs.readFileSync("./input.txt").toString()

text.split("\n").forEach(line=>{
    console.log(line, line.split(""))
    digits = line.split("").filter(char=> "1234567890".includes(char))
    console.log(digits)
    sum+= Number(digits[0] + digits.at(-1))
})

console.log(sum)