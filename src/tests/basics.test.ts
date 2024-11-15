import { toUpper } from "../app/basics"

describe('basics test suite', () => {
    test('Should return uppercase', () => {
        const result = toUpper('lower')
        expect(result).toBe('LOWER')
    })
})