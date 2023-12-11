const fs = require("fs");
const { isNumberObject } = require("util/types");

let result =Infinity;

const text = fs.readFileSync("./input.txt").toString()

const lines = text.split("\n")

const seeds = lines[0].split(': ')[1].split(" ").map(Number).reduce((acc, curr, index)=>{
    if(index%2 === 0){
        acc.push({start: curr, end: curr})
    }else{
        acc.at(-1).end = acc.at(-1).start+curr-1
    }
    return acc
},[])

const order = [
    "seed-to-soil",
    "soil-to-fertilizer",
    "fertilizer-to-water",
    "water-to-light",
    "light-to-temperature",
    "temperature-to-humidity",
    "humidity-to-location",
]

const map = new Map();

function getMap(key, source){
    const intervals = map.get(key)
    const interval = intervals.find(interval => interval.source<= source && (interval.source+interval.length)>=source)
    if(interval){
        return interval.destination + source-interval.source;
    }
    else 
        return source;

}


const categoriesRaw = text.split("\n\n").slice(1).map(line=>{
    const [cat, numbers]  = line.split(" map:\n")
    const [src, dest] = cat.split("-to-")
    const intervals = numbers.split("\n").map(l=>{
        const [destination, source, length] = l.split(" ")
        return {
            sourceStart: Number(source), 
            destinationStart: Number(destination), 
            sourceEnd: Number(source-1)+Number(length), 
            destinationEnd: Number(destination-1)+Number(length), 
            length: Number(length),
            offset: Number(destination) - Number(source)
        }
    })
    return {cat, source:src, destination:dest, intervals}
}).reduce((acc, l)=> {
    acc[l.cat] = l
    return acc
}, {});
//categoriesRaw.forEach(({cat, intervals})=>map.set(cat, intervals))
console.log(seeds)
//console.log(JSON.stringify(categoriesRaw, null, 2))

for(seed of seeds){
    console.log("SEED ---- ", seed)
    let step = 0;
    let intervals = [{start: seed.start, end:seed.end, seedStart:seed.start, seedEnd: seed.end}]
    for(step of order){
        //console.log("Step", step)
        let newIntervals = [];
        const stepMappers = categoriesRaw[step].intervals;
        for(i of intervals){
            newIntervals.push(...mapInterval(i, stepMappers))
        }
        //console.log("MAPPED",newIntervals)
        intervals = newIntervals;
        

    }
    console.log("result", intervals)
    for(i of intervals){
        result = Math.min(result, i.start)
    }
    //break;
}


function mapInterval(sourceInterval, mappers){
    const result = [];
    const remaining = [];
    for(let mapper of mappers){
        if(mapper.sourceEnd >= sourceInterval.end && mapper.sourceStart <= sourceInterval.start){
            return [{
                ...sourceInterval,
                start: sourceInterval.start + mapper.offset,
                end: sourceInterval.end + mapper.offset
            }]
        }
        if(mapper.sourceEnd < sourceInterval.start || mapper.sourceStart > sourceInterval.end){
            continue
        }else{
            if(mapper.sourceStart > sourceInterval.start && mapper.sourceEnd < sourceInterval.end){
                
                let start = Math.max(mapper.sourceStart, sourceInterval.start);
                let end = Math.min(mapper.sourceEnd, sourceInterval.end)
                let startOffset = start - sourceInterval.start;
                let endOffset = sourceInterval.end - end;
                result.push( {
                    start:start+mapper.offset,
                    end:end+mapper.offset,
                    seedStart: sourceInterval.seedStart + startOffset,
                    seedEnd:sourceInterval.seedEnd - endOffset
                })
                // LEFT 
                remaining.push({
                    ...sourceInterval,
                    end: start-1,
                    seedEnd: sourceInterval.seedStart + startOffset -1 
                })
                // RIGHT
                remaining.push({
                    ...sourceInterval,
                    start: end+1,
                    seedStart: sourceInterval.seedEnd - endOffset +1 
                })
                break;
            }
            else if(mapper.sourceStart <= sourceInterval.start){
                let start = Math.max(mapper.sourceStart, sourceInterval.start);
                let end = Math.min(mapper.sourceEnd, sourceInterval.end)
                let startOffset = start - sourceInterval.start;
                let endOffset = sourceInterval.end - end;
                result.push( {
                    start:start+mapper.offset,
                    end:end+mapper.offset,
                    seedStart: sourceInterval.seedStart + startOffset,
                    seedEnd:sourceInterval.seedEnd - endOffset
                })
                // RIGHT
                remaining.push({
                    ...sourceInterval,
                    start: end+1,
                    seedStart: sourceInterval.seedEnd - endOffset +1 
                })
                break
            }
            else if(mapper.sourceEnd >= sourceInterval.end){
                let start = Math.max(mapper.sourceStart, sourceInterval.start);
                let end = Math.min(mapper.sourceEnd, sourceInterval.end)
                let startOffset = start - sourceInterval.start;
                let endOffset = sourceInterval.end - end;
                result.push( {
                    start:start+mapper.offset,
                    end:end+mapper.offset,
                    seedStart: sourceInterval.seedStart + startOffset,
                    seedEnd:sourceInterval.seedEnd - endOffset
                })
                // LEFT 
                remaining.push({
                    ...sourceInterval,
                    end: start-1,
                    seedEnd: sourceInterval.seedStart + startOffset -1 
                })
                break;
            }
        }
        
    }
    if(remaining.length){
        for(r of remaining){
            result.push(...mapInterval(r, mappers))
        }
    }else{
        if(result.length==0){
            result.push(sourceInterval)
        }
    }
    // libqa
    return result;
}


console.log(result)