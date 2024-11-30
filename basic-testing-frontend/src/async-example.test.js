import { describe, it, expect } from 'vitest'

import { generateToken } from './async-example.js'

describe('generateToken()', () => {
    it('should generate token', (done) => {
        const emailAddress = 'abc@test.com'
        generateToken(emailAddress, (err, token) => {
            try {
                // expect(token).toBeDefined()
                expect(token).toBe(4);
            } catch(err) {
                done(err);
            }
        })
    })
})