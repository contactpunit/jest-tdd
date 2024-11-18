import { calculateComplexity, toUpperCaseWithCb } from "../../app/doubles/doubles"

describe('Doubles test suite', () => {

    it('calculate complexity', () => {
        const someInfo = {
            length: 5,
            additionalInfo: {
                name: 'punit',
                job: 'engineer',
                place: 'india'
            }
        }
        const actual = calculateComplexity(someInfo as any)
        expect(actual).toBe(15)
    })

    it('toUppercase calls callback for valid argument', () => {
        expect(toUpperCaseWithCb('abc', () => {})).toBe('ABC')
    })

    it('toUppercase calls callback for invalid argument', () => {
        expect(toUpperCaseWithCb('', () => {})).toBeUndefined()
    })

})