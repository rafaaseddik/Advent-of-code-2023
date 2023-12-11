const mappers = [
    {
        sourceStart: 77,
        destinationStart: 45,
        sourceEnd: 99,
        destinationEnd: 67,
        length: 23,
        offset: -32,
    },
    {
        sourceStart: 45,
        destinationStart: 81,
        sourceEnd: 63,
        destinationEnd: 99,
        length: 19,
        offset: 36,
    },
    {
        sourceStart: 64,
        destinationStart: 68,
        sourceEnd: 76,
        destinationEnd: 80,
        length: 13,
        offset: 4,
    },
]

const interval = 
    {
        start: 74,
        end: 87,
        seedStart: 79,
        seedEnd: 92,
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

const result = mapInterval(interval, mappers)
console.log(result)