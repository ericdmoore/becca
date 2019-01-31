

const sleep  = (ms)=>{
    new Promise((resolve, reject)=>{
        setTimeout(resolve() ,ms);
    })
}


const printNodes = (_nodes, depth=0, limit=10)=>{
    
    if(Array.isArray(_nodes)){
        for(let n of _nodes){
            console.log({   '__depth': depth,
                            'nodeName': n.nodeName,
                            'tagName': n.tagName,                
                            'value': n.value,                                
                            'attrs': n.attrs,
                            'children' : n.childNodes ? n.childNodes.length : null})
            if('childNodes' in n){
                for(let elem of n.childNodes){
                    if(depth<limit)printNodes(elem, depth+1, limit);
                }
            }
        }
    }
    else {
        console.log({ 
                        '__depth': depth,            
                        'nodeName': _nodes.nodeName,
                        'tagName': _nodes.tagName,
                        'value': _nodes.value,
                        'attrs': _nodes.attrs,
                        '#children' : _nodes.childNodes ? _nodes.childNodes.length : null
                    })
        if('childNodes' in _nodes && _nodes.childNodes.length >0){
            for(let elem of _nodes.childNodes){
                if(depth<limit) printNodes(elem, depth+1, limit);
            }
        }
    }
};

const descrStats = (_Arr, label=null, dropFront=0, dropBack=0)=>{
    // please handle NaN before using descripStats
    // descrStats does not intent to 'fillIn' or 'Drop' on your behalf
    let med = Math.floor(_Arr.length/2);
    let qtl = Math.floor(med/2);
    
    let localArr = _Arr.sort()
    if(dropFront!==0 && dropBack !== 0 ) localArr = localArr.slice(2,-2);
    else if(dropFront!==0){
        localArr = localArr.slice(dropFront);
    }
    else if(dropBack!==0){
        localArr = localArr.slice(0,-dropBack);
    }

    if(label) console.log(`\n${label}`)
    console.log(`  Count: ${ localArr.length }`)
    console.log(`--------`)
    console.log(`    Min: ${ Math.min(...localArr) }`)
    console.log(`1st Qtl: ${ localArr[med - qtl]}`)
    console.log(` Median: ${ localArr[med]}`)
    console.log(`Average: ${ Math.round(localArr.reduce(function(a, b) { return a + b; })/localArr.length) }`)
    console.log(`3rd Qtl: ${ localArr[med + qtl]}`)
    console.log(`    Max: ${ Math.max(...localArr) }`)
}

module.exports = { sleep, printNodes , descrStats }