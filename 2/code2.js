const fs = require("fs");
const { isNumberObject } = require("util/types");

let sum =0;

const text = fs.readFileSync("./input.txt").toString()

function gamePower(game){
    const minimum = {
        red:0,
        green:0,
        blue:0,
    };
    game.forEach(sub=>{
        minimum.red = Math.max(minimum.red, sub.red);
        minimum.green = Math.max(minimum.green, sub.green);
        minimum.blue = Math.max(minimum.blue, sub.blue);
    });
    return minimum.red * minimum.green * minimum.blue;
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
    sum+=gamePower(subGames)
    
})

console.log(sum)