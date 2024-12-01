import {describe, it, expect, vi} from 'vitest'
import writeData from './io'

describe('writeData()', () => {

    vi.mock('fs')
    it('should write data to file', () => {
        const file = 'test.txt'
        const testData = 'this is for testing'
        
        return expect(writeData(testData, file)).resolves.toBeUndefined()
    })
} )