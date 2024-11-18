
jest.mock('../../app/doubles/doubles', () => ({
    ...jest.requireActual('../../app/doubles/doubles'),
    toUpper: () => {return 'ABC'}
}))

jest.mock('uuid', () => ({
    v4: () => {return '157c6738-2d80-4900-ac53-2c8abbf80990'}
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

    test('toLower function test with 3rd party uuid lib', ()=> {
        const result = doubleModule.toLowerWithUuid('ABCD')
        expect(result).toBe('abcd-157c6738-2d80-4900-ac53-2c8abbf80990')
    })
})