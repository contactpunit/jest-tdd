import { toUpper } from "../app/basics"

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