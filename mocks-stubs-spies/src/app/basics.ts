export class StringUtils {
    public toUpper(arg: string) {
        return toUpper(arg)
    }
}

export function toUpper(arg: string) {
    if (!arg) {
        throw new Error('arg cannot be empty')
    }
    return arg.toUpperCase()
}

export type stringInfo = {
    lower: string,
    upper: string,
    characters: string[],
    length: number,
    additionalInfo: Object | undefined
}

export function getStringInfo(arg: string) : stringInfo {
    return {
        lower: arg.toLocaleLowerCase(),
        upper: arg.toUpperCase(),
        characters: Array.from(arg),
        length: arg.length,
        additionalInfo: {}

    }
}