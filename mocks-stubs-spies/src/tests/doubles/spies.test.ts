import { MockSpiesUseCase } from "../../app/doubles/spies"

describe('Test using mock spies',() => {
    describe('MockSpiesUseCase test with spies', () => {
        let sut: MockSpiesUseCase
        beforeEach(()=> {
            sut = new MockSpiesUseCase()
        })

        test('test toUpper using spy', () => {
            const toUpperSpy = jest.spyOn(sut, 'toUpper')
            sut.toUpper('abcd')
            expect(toUpperSpy).toBeCalledWith('abcd')
            expect(toUpperSpy).toBeCalledTimes(1)

        })

        test('to spy on consolelog', () => {
            const consolelogSpy = jest.spyOn(console, 'log')
            sut.toLog('hello today')
            expect(consolelogSpy).toBeCalledWith('hello today')
        })

        test('to spy on private methods of externalApiCall', () => {
            jest.spyOn(sut as any, 'externalApiCall').mockImplementation(() => {
                console.log('calling mock implementation')
            });
            (sut as any).externalApiCall()
        })
    })
})