import {describe, it, expect, vi} from 'vitest'
import writeData from './io'
import {promises as fs} from 'fs'

describe('writeData()', () => {

    vi.mock('fs')
    
    it('should write data to file', () => {
        const file = 'test.txt'
        const testData = 'this is for testing'
        
        writeData(testData, file)
        expect(fs.writeFile).toBeCalled()
        // return expect(writeData(testData, file)).resolves.toBeUndefined()
    })
} )