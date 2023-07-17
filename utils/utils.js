function ConverToCastString(casts) {
    var castsjoin = ""
    for (var idx in casts) {
        castsjoin += casts[idx].name + ' / '
    }
    return castsjoin.substring(0, castsjoin.length - 2)
}

function ConverToCastArray(casts){
    var castsjoin = []
    for (var idx in casts) {
        let temp = {}
        temp.name = casts[idx].name
        temp.img =  casts[idx].avatars ? casts[idx].avatars.large : ''
        castsjoin.push(temp)
    }
    return castsjoin
}

export {
    ConverToCastString,
    ConverToCastArray
}