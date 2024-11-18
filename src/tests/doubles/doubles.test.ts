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

    describe('Tracking callback calls', () => {
        let counter = 0
        let callArgs = []
        function callBackMock(arg) {
            callArgs.push(arg)
            counter += 1
        }

        afterEach(() => {
            callArgs = []
            counter = 0
        })

        it('toUppercase calls callback for valid argument', () => {
            const actual = toUpperCaseWithCb('abc', callBackMock)
            expect(actual).toBe('ABC')
            expect(callArgs).toContain('called with abc')
            expect(counter).toBe(1)
        })

        it('toUppercase calls callback for invalid argument', () => {
            const actual = toUpperCaseWithCb('', callBackMock)
            expect(actual).toBeUndefined()
            expect(callArgs).toContain('Invalid argument')
            expect(counter).toBe(1)
        })
    })

})