import { StringUtils, getStringInfo, toUpper } from "../app/basics"

describe('basics test suite', () => {

    describe('StringUtils tests', () => {
        let sut: StringUtils

        beforeEach(() => {
            sut = new StringUtils()
        })

        it('should return uppercase', () => {
            const actual = sut.toUpper('test')
            expect(actual).toBe('TEST')
        })

        it('should throw error if no arg passed - using toThrow', () => {
            function getResultOrError() {
                const actual = sut.toUpper('')
                return actual
            }
            expect(getResultOrError).toThrow()
        })

        it('should throw error if no arg passed - using toThrowError', () => {
            function getResultOrError() {
                const actual = sut.toUpper('')
                return actual
            }
            expect(getResultOrError).toThrowError('arg cannot be empty')
        })

        it('should throw error if no arg passed - using arrow function', () => {
            expect(() => {
                const actual = sut.toUpper('')
                return actual
            }).toThrowError('arg cannot be empty')
        })

        it('should throw error if no arg passed - using try catch function', (done) => {
            try {
                sut.toUpper('')
                done()
            } catch(err) {
                expect(err).toBeInstanceOf(Error)
                expect(err).toHaveProperty('message', 'arg cannot be empty')
                done()
            }
        })
    })


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

describe('test parameterized cases for toUpper functionality', () => {
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