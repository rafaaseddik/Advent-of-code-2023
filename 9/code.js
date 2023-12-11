const fs = require("fs");

let sum =0;

const text = fs.readFileSync("./input.txt").toString()

text.split("\n").forEach(line=>{
    digits = line.split(" ").map(Number)
    const history = [digits];
    var current = [...digits];
    console.log("current", current, )

    while(current.some(i=>i!==0)){
        let next = derivate(current)
        history.push(next)
        current = next;
    }
    console.log(history)
    sum+= extrapolate(history)
})

console.log(sum)

function derivate(array){
    const result = [];
    for (let i=1; i<array.length; i++){
        result.push(array[i]- array[i-1])
    }
    return result;
}

function extrapolate(history){
    const order = [...history].reverse()
    let result = 0;
    for(let i=0; i<order.length; i++){
        if(i==0){
            order[i].push(0)
        }else{
            order[i].push(order[i].at(-1) + order[i-1].at(-1))
        }
    }
    result = order.at(-1).at(-1)


    console.log("RESULT ====== ",history[0], result);
    return result;
}