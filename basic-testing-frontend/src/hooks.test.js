import { expect, it, describe } from "vitest";
import { User } from "./hooks";

describe('class User', () => {
    it('should create a user object', () => {
        const email = 'abc@test.com'
        const user = new User(email)
        expect(user).toBeInstanceOf(User)
    })

    it('should update email address of user object', () => {
        const email = 'abc@test.com'
        const user = new User(email)
        expect(user.email).toBe('abc@test.com')
        user.email = 'punit@test.com'
        expect(user.email).toBe('punit@test.com')
    })

    it('should clear email field for user object', () => {
        const email = 'abc@test.com'
        const user = new User(email)
        expect(user.email).toBe('abc@test.com')
        user.email = ''
        expect(user.email).toBeDefined()
        expect(user.email).toBe('')
    })
})