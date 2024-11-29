import { expect, it, describe } from 'vitest'
import { generateResultText } from './output.js'

describe('generateResultText test suite', () => {

    it('should return a string for any input', () => {
        const v1 = 'test string'
        const v2 = 2
        const v3 = true

        const r1 = generateResultText(v1)
        const r2 = generateResultText(v1)
        const r3 = generateResultText(v1)

        expect(r1).toBeTypeOf('string')
        expect(r2).toBeTypeOf('string')
        expect(r3).toBeTypeOf('string')
    })

    it('should match regex if a number or non string passed', () => {
        const v1 = 2
        const v2 = true

        const r1 = generateResultText(v1)
        const r2 = generateResultText(v1)

        expect(r1).toMatch(/Result: /)
        expect(r2).toMatch(/Result: /)
    })

    it('should match invalid string when invalid is passed as an input', () => {
        const v = 'invalid'

        const r = generateResultText(v)

        expect(r).toMatch(/Invalid input. You must enter valid numbers./)
    })

    it('should return an empty string if "no-calc" is provided as a result', () => {
        const result = 'no-calc';
    
        const resultText = generateResultText(result);
    
        expect(resultText).toBe('');
    })

    it('should return a string that contains "Invalid" if "invalid" is provided as a result', () => {
        const result = 'invalid';
    
        const resultText = generateResultText(result);
    
        expect(resultText).toContain('Invalid');
      })
})