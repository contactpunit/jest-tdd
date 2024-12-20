import { describe, expect, test } from 'vitest';
import { add, cleanNumbers } from './math'

describe('calculateResult() and add()', () => {
    test('should return sum of all numbers in an array', () => {

        // Arrange
        const numbers = [1, 2,3, 4]
    
        // Act
        const result = add(numbers)
    
        // Assert
        const expectedResult = numbers.reduce((tot, curr) => tot + curr, 0) 
        expect(result).toBeCloseTo(expectedResult)
    })
    
    test('should return NaN if invalid number is provided', () => {
        const numbers = ['ss', 4, 2]
        const result = add(numbers)
        expect(result).toBeNaN() 
    })
    
    test('should return correctsum if string of numbers provided', () => {
        const numbers = ['4', '2']
        const expectedResult = numbers.reduce((tot, curr) => +tot + +curr, 0) 
        const result = add(numbers)
        expect(result).toBe(expectedResult)
    })
    
    test('should return 0 if empty array provided', () => {
        const numbers = []
        const expectedResult = 0
        const result = add(numbers)
        expect(result).toBe(expectedResult)
    })
    
    test('should throw an error if multiple arguments passed instead of array', () => {
        const resultFn = () => {
            add(1, 2, 3)
        }
        expect(resultFn).toThrow(/is not iterable/)
    })
})

describe('cleanNumbers()', () => {
    test('should throw error if array of atleast one empty string is provided', () => {
        const mixedArray = ['', 1, 4]
        const cleanFn = () => cleanNumbers(mixedArray)
        expect(cleanFn).toThrowError()
    })

    test('should return array of numbers when numbers as strings are passed', () => {
        const numArray = ['1', '4', '7']
        const expected = [1, 4, 7]
        expect(cleanNumbers(numArray)).toEqual(expected)
    })
})