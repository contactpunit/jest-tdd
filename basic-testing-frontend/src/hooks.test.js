import { expect, it, describe } from "vitest";
import { User } from "./hooks";

describe('class User', () => {
    it('should create a user object', () => {
        const email = 'abc@test.com'
        const user = new User(email)
        expect(user).toBeInstanceOf(User)
    })
})