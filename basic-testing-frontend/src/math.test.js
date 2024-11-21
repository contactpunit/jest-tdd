import { expect, test } from 'vitest';
import { add } from './math'

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