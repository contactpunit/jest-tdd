import { it, describe, expect } from "vitest";
import { validateNumber, validateStringNotEmpty } from "./validation";

describe('validation test suite', () => {
    describe('validateStringNotEmpty', () => {
        
        it('should throw error if empty string passed as arg', () => {
            const input = ''
            const resultFn = () => {
                validateStringNotEmpty('')
            }
            expect(resultFn).toThrow()
        })

        it('should throw error if string with spaces only passed as arg', () => {
            const input = ''
            const resultFn = () => {
                validateStringNotEmpty('   ')
            }
            expect(resultFn).toThrow(/Invalid input - must not be empty./)
        })

        it('should throw should do nothing if valid string passed', () => {
            const input = 'abcd'
            expect(validateStringNotEmpty(input)).toBeUndefined()
        })
    })

    describe('validateNumber', () => {
        it('should throw error if NaN', () => {
            const input = 'abcd'
            const resultFn = () => {validateNumber(input)}
            expect(resultFn).toThrow(/Invalid number input./)
        })

        it('should not throw exception if number passed as arg', () => {
            const input = 8
            expect(validateNumber(input)).toBeUndefined()
        })
    })
})