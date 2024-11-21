import { expect, it } from "vitest"
import { transformToNumber } from "./numbers"

it('should return NaN if string w/o integer passed', () => {
    const input = 'invalid'
    const result = transformToNumber(input)
    expect(result).toBeNaN()
})

it('should return number if valid string integer passed', () => {
    const input = '7'
    const result = transformToNumber(input)
    expect(result).toBe(7)
})

it('should return number if valid integer passed', () => {
    const input = '7'
    const result = transformToNumber(input)
    expect(result).toBeTypeOf("number")
})