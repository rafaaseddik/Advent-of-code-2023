const fs = require("fs");

let sum =0;

const text = fs.readFileSync("./input.txt").toString()

const [timeLine, distanceLine] = text.split("\n").map(line=>line.split(": ")[1].split(" ").filter(c=>c.trim().length).map(Number));
console.log({timeLine, distanceLine})
const result = [];
for(let i=0; i<timeLine.length; i++){
    const time = timeLine[i];
    const distance = distanceLine[i];
    console.log({time, distance})
    let nb = 0
    for(let j=0; j<time;j++){
        const speed = j;
        const remaining = time-j;
        const currDistance = speed * remaining;
        console.table({time, distance,speed, remaining,currDistance })
        if(currDistance>distance){
            nb++
        }

    }
    result.push(nb)
}

console.log(result.reduce((acc, curr)=>acc*curr,1))