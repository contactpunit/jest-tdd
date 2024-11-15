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
})

describe('getStringInfo for argument Test-String', () => {
    it('should match lowercase', () => {
        const actual = getStringInfo('Test-String')
        expect(actual.lower).toBe('test-string')
    })

    it('should match additionalInfo object', () => {
        const actual = getStringInfo('Test-String')
        expect(actual.additionalInfo).toEqual({})
    })

    it('should match length', () => {
        const actual = getStringInfo('Test-String')
        expect(actual.characters).toHaveLength(11)
    })

    it('should contain -', () => {
        const actual = getStringInfo('Test-String')
        expect(actual.characters).toContain<string>('-')
    })

    it('characters should be equal to array of characters', () => {
        const actual = getStringInfo('Test-String')
        expect(actual.characters).toEqual(['T', 'e', 's', 't', '-', 'S', 't', 'r', 'i', 'n', 'g'])
        expect(actual.characters).toContain<string>('-')
        expect(actual.characters).toEqual(
            expect.arrayContaining(['S', 't', 'r', 'i', 'n', 'g', 'T', 'e', 's', 't', '-'])
        )
    })

    it('additionalInfo hould be defined', () => {
        const actual = getStringInfo('Test-String')
        expect(actual.additionalInfo).not.toBe(undefined)
        expect(actual.additionalInfo).toBeDefined()
        expect(actual.additionalInfo).not.toBeUndefined()
    })

})

describe.only('test parameterized cases for toUpper functionality', () => {
    it.each(
        [
            {input: 'String', expected: 'STRING'},
            {input: 'My-string', expected: 'MY-STRING'}
        ]
    )('$input upper should be $expected', ({input, expected}) => {
        const actual = toUpper(input)
        expect(toUpper(actual)).toBe(expected)

    })
})