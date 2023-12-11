const fs = require("fs");
const { isNumberObject } = require("util/types");

let sum =0;

const text = fs.readFileSync("./input.txt").toString()

function gameValidator(game){
    return game.every(sub=>{
        return sub.red<=12 && sub.green <=13 && sub.blue <= 14
    });
}
function parser(line){
    const [game, entries] = line.split(": ");
    const gameNb = Number(game.split(" ")[1]);
    const subGames = entries.split(";").map(subGame=>{
        return subGame.trim().split(", ").reduce((acc, curr)=>{
            const [nb, color] = curr.split(" ");
            acc[color]+=Number(nb);
            return acc
        }, {red:0,green:0, blue:0})
    });

    return {gameNb, subGames}
}


text.split("\n").forEach(line=>{
    const {gameNb, subGames} = parser(line)
    console.log(line, gameNb, subGames)
    if(gameValidator(subGames)){
        console.log("OK")
        sum+=gameNb
    }

})

console.log(sum)