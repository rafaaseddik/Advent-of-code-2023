const fs = require("fs");
const { isNumberObject } = require("util/types");

let sum =0;
const numbers = ["zero","one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
const text = fs.readFileSync("./input.txt").toString()

text.split("\n").forEach(line=>{
    //console.log(line, line.split(""))
    digits = line.split("").map((char, index)=> {
        if("1234567890".includes(char))
            return char
        else if (numbers.some(nb=>line.slice(index).startsWith(nb))){
            return numbers.findIndex(nb=>line.slice(index).startsWith(nb))
        }
    }).filter(Boolean)
    console.log(`${digits[0].toString()}${digits.at(-1).toString()}` )
    sum+= Number(`${digits[0].toString()}${digits.at(-1).toString()}`)
})

console.log(sum)