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

    describe('Tracking callback calls using JEST mocks', () => {
        const callbackMock = jest.fn()

        afterEach(()=> {
            jest.clearAllMocks()
        })

        it('toUppercase calls callback for valid argument using jest mock', () => {
            const actual = toUpperCaseWithCb('abc', callbackMock)
            expect(actual).toBe('ABC')
            expect(callbackMock).toBeCalledWith('called with abc')
            expect(callbackMock).toBeCalledTimes(1)
        })

        it('toUppercase calls callback for invalid argument', () => {
            const actual = toUpperCaseWithCb('', callbackMock)
            expect(actual).toBeUndefined()
            expect(callbackMock).toBeCalledWith('Invalid argument')
            expect(callbackMock).toBeCalledTimes(1)
        })
    })

})