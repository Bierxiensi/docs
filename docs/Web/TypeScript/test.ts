type plusType = (a: number, b: number) => number

function plus(a: number, b: number): number {
    return a + b
}
const add: plusType = plus

type NameResolver = () => string
type NameOrResolver =  string | NameResolver
function getName(n: NameOrResolver): string {
    if(typeof n === 'string'){
        return n
    } else {
        return n()
    }
}


function getLength(input: string | number): boolean {
    return <boolean>input // 类型 "string | number" 到类型 "boolean" 的转换可能是错误的，因为两种类型不能充分重叠。如果这是有意的，请先将表达式转换为 "unknown"。类型“number”不可与类型“boolean”进行比较。
}