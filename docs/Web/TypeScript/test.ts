let numberOrString: number | string = 123
numberOrString = 'abc'
// numberOrString = true
numberOrString.

let notSure: any = 1
notSure = 0b0010
notSure = 'maybe it is string' 
notSure = true

let binaryNumber: number = 0b0001
let u: undefined = undefined
let n: null = null
binaryNumber = null
binaryNumber = 2


let arOfNumber: number[] = [1,2,3,0b0100, 'five']
arOfNumber.push(5)
arOfNumber.push('six')

function argument() { 
    let arr: any[] = arguments 
}

let numberOrString1: [number, string] = [1, 'two', 3]


interface IPerson {
    name: string;
    age: number;
}

let bierxiensi: IPerson = {
    name: 'bierxiensi',
    age: 22
}


interface IPerson1 {
    readonly name: string;
    age?: number;
}
let bierxiensi1: IPerson1 = {
    name: 'bierxiensi'
}
bierxiensi1.name = 'Bierxiensi'


const add = function(x: number, y: number, z: number = 3): number {
    if(typeof z === "number"){
        return x + y + z;
    }
    return x + y;
}
add(1, 2)

const add1: string = add(1, 2)