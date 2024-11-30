import { describe, it, expect } from 'vitest'

import { generateToken, generateTokenPromise } from './async-example.js'

describe('generateToken()', () => {
    it('should generate token', (done) => {
        const emailAddress = 'abc@test.com'
        generateToken(emailAddress, (err, token) => {
            try {
                expect(token).toBeDefined()
                // expect(token).toBe(4);
                done()
            } catch(err) {
                done(err);
            }
        })
    })

    it('should generate token - using promises', () => {
        const emailAddress = 'abc@test.com'
        expect(generateTokenPromise(emailAddress)).resolves.toBeDefined()
        expect(generateTokenPromise(emailAddress)).resolves.toBeTypeOf('string')
    })

    it('should generate token - using promises', async() => {
        const emailAddress = 'abc@test.com'
        const token = await generateTokenPromise(emailAddress)
        expect(token).toBeDefined()
        expect(token).toBeTypeOf('string')
    })
})