
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