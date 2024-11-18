
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

export function toUpperCaseWithCb(arg: string, callBack: Function) {
    if (!arg) {
        callBack('Invald argument')
        return
    }
    callBack(`called with ${arg}`)
    return arg.toUpperCase()
}