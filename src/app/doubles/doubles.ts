import { v4 } from 'uuid'
export type DoubleInfo = {
    lower: string,
    upper: string,
    characters: string[],
    length: number,
    additionalInfo: Object | undefined
}

export function calculateComplexity(doubleInfo: DoubleInfo) {
    return Object.keys(doubleInfo.additionalInfo).length * doubleInfo.length
}

export function toUpper(arg: string) {
    return arg.toUpperCase()
}

export function toLowerWithUuid(arg: string) {
    return arg.toLocaleLowerCase() + '-' + v4()
}

export function calculateLength(inputArry: string[]) {
    return inputArry.length
}

export function toUpperCaseWithCb(arg: string, callBack: Function) {
    if (!arg) {
        callBack('Invalid argument')
        return
    }
    callBack(`called with ${arg}`)
    return arg.toUpperCase()
}