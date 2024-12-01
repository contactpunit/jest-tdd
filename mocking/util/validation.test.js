import {test, expect, describe} from 'vitest'
import { validateNotEmpty } from './validation'
import { ValidationError } from './errors'

describe('validateNotEmpty', () => {
    test('should not return anything for a valid non-empty string text', () => {
        const inputText = 'this is valid'
        expect(() => {
            validateNotEmpty(inputText)
        }).not.toThrow()
    })

    test('should throw error for empty text', () => {
        const inputText = ''
        const errMsg = 'cannot be empty input'
        expect(() => {
            validateNotEmpty(inputText)
        }).toThrow()
    })

    test('should throw error for empty text with regex match for error', () => {
        const inputText = ''
        const errMsg = 'cannot be empty input'
        expect(() => {
            validateNotEmpty(inputText, errMsg)
        }).toThrowError(/cannot be empty input/)
    })

    test('should throw error for empty spaced text', () => {
        const inputText = '   '
        const errMsg = 'cannot be empty input'
        expect(() => {
            validateNotEmpty(inputText, errMsg)
        }).toThrowError(/cannot be empty input/)
    })

    test('should throw ValidationError object for empty spaced text', () => {
        const inputText = '   '
        const errMsg = 'cannot be empty input'
        try {
            validateNotEmpty(inputText, errMsg)
        } catch(err) {
            expect(err).toBeInstanceOf(ValidationError)
        }
    })
})