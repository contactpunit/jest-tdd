import {expect, it, describe, vi} from 'vitest'
import { generateReportData } from './data'

describe('generateReportData()', () => {
    it('should test if logFn fn is called', () => {
        const logSpy = vi.fn()
        generateReportData(logSpy)
        expect(logSpy).toBeCalled()
    })
})