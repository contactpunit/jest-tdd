jest.mock('../../app/doubles/doubles', () => ({
    ...jest.requireActual('../../app/doubles/doubles'),
    toUpper: () => {return 'ABC'}
}))

import * as doubleModule from '../../app/doubles/doubles'

describe('module mock tests', () => {
    test('calculateLength function test', ()=> {
        const result = doubleModule.calculateLength(['abc', 'def'])
        expect(result).toBe(2)
    })

    test('toUpper function test', ()=> {
        const result = doubleModule.toUpper('abc')
        expect(result).toBe('ABC')
    })
})