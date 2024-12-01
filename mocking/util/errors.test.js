import {expect, describe, it} from 'vitest'
import { HttpError, ValidationError } from './errors'

describe('ValidationError()', () => {
    it('class ValidationError object should have message field', () => {
        const error = new ValidationError('not a valid text')
        expect(error.message).toBe('not a valid text')
    })
})

describe('HttpError()', () => {
    it('class HttpError shold contain provided statusCode, message and data field', () => {
        const errObj = new HttpError(400, 'unauthorized', 'login to proceed')
        expect(errObj.statusCode).toBe(400)
        expect(errObj.message).toBe('unauthorized')
        expect(errObj.data).toBe('login to proceed')
    })
})