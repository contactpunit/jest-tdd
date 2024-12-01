import {describe, it, expect} from 'vitest'
import writeData from './io'

describe('writeData()', () => {
    it('should write data to file', () => {
        const file = 'test.txt'
        const testData = 'this is for testing'
        return expect(writeData(testData, file)).resolves.toBeUndefined()
    })
} )