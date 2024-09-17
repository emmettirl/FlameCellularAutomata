export enum HeatDisplayCharacters {
    " " = 0,
    "." = 1,
    "%" = 2,
    "#" = 3,
    "&" = 4,
    "@" = 5,
}

export enum HeatDisplayColors {
    "#100000" = 0,
    "#200000" = 0,
    "#300000" = 0,
    "#400000" = 0,
    "#500000" = 0,
}

export function enumElementCount(enumName: any): number {
    let count = 0
    for(let item in enumName) {
        if(isNaN(Number(item))) count++
    }
    return count
}

