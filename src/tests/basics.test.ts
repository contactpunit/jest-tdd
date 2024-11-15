import { getStringInfo, toUpper } from "../app/basics"

describe('basics test suite', () => {
    it('Should return uppercase', () => {
        // arrange
        const sut = toUpper
        const expected = 'LOWER'

        // act
        const actual = sut('lower')

        // assert
        expect(actual).toBe(expected)
    })

    it.only('shuld return info with type stringInfo for a valid string', () => {
        const actual = getStringInfo('Test-String')

        expect(actual.lower).toBe('test-string')
        expect(actual.additionalInfo).toEqual({})
        expect(actual.characters).toEqual(['T', 'e', 's', 't', '-', 'S', 't', 'r', 'i', 'n', 'g'])
        expect(actual.characters).toHaveLength(11)
        expect(actual.characters).toContain<string>('-')
        expect(actual.characters).toEqual(
            expect.arrayContaining(['S', 't', 'r', 'i', 'n', 'g', 'T', 'e', 's', 't', '-'])
        )
        expect(actual.additionalInfo).not.toBe(undefined)
        expect(actual.additionalInfo).toBeDefined()
        expect(actual.additionalInfo).not.toBeUndefined()
    })
})