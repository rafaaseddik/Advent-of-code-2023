const fs = require("fs");
const { isNumberObject } = require("util/types");

let sum =0;

const text = fs.readFileSync("./input.txt").toString()

const hands = text.split("\n").map(line=>line.split(" ")).map(([rawCards, bid])=>{
    const cards = rawCards.split("").map(card=>{
        if(Number(card)){
            return Number(card)
        }else{
            return {
                "T":11,
                "J":12,
                "Q":13,
                "K":14,
                "A": 15
            }[card]
        }
    })
    return {rawCards, cards, value: deckValue(cards), bid: Number(bid)}

}).sort((a,b)=>{
    if(a.value > b.value) return 1
    if(a.value < b.value) return -1
    return compareSame(a.cards, b.cards)
})
console.table(hands)

function compareSame(A, B){
    for(let i=0;i<5;i++){
        if(A[i]>B[i]){return 1}
        if(A[i]<B[i]){return -1}
    }
    return 0;
}
function deckValue(cards){
    const CARDS = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

    if(CARDS.find(C=>cards.filter(c=>c===C).length===5)){
        return 50
    } 
    if(CARDS.find(C=>cards.filter(c=>c===C).length===4)){
        return 40
    } 
    if(CARDS.find(C=>cards.filter(c=>c===C).length===3) && CARDS.find(C=>cards.filter(c=>c===C).length===2)){
        return 35
    } 
    if(CARDS.find(C=>cards.filter(c=>c===C).length===3)){
        return 30
    } 
    if(CARDS.filter(C=>cards.filter(c=>c===C).length===2).length==2){
        return 25
    }
    if(CARDS.find(C=>cards.filter(c=>c===C).length===2)){
        return 20
    } 
    return 10
}
console.log(hands.reduce((acc, curr,i,arr)=> acc+curr.bid*(i+1),0))