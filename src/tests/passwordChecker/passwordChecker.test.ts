import { PasswordChecker, PasswordErrors } from "../../app/passwordChecker/passwordChecker"

describe('Password Checker test suite', () => {

    let sut: PasswordChecker

    beforeEach(() => {
        sut = new PasswordChecker()
    })

    it('password with less than 8 chars should be invalid', () => {
        const actual = sut.checkPassword('123456')
        expect(actual.valid).toBe(false)
        expect(actual.reasons).toContain(PasswordErrors.SHORT)
    })

    it('password with more than 8 should pass', () => {
        const actual = sut.checkPassword('1234569999')
        expect(actual.valid).toBe(true)
    })

    xit('password with more than 8 chars should be valid', () => {
        const actual = sut.checkPassword('123456789A')
        expect(actual.valid).toBe(false)
        expect(actual.reasons).not.toContain(PasswordErrors.SHORT)
    })

    xit('password with no upper case letter should be invalid', () => {
        const actual = sut.checkPassword('123456789')
        expect(actual).toBe(false)
    })

    xit('password with upper case letter and 8 letters should be valid', () => {
        const actual = sut.checkPassword('123456789ABVacg')
        expect(actual).toBe(true)
    })

    xit('password with no lower case letter should be invalid', () => {
        const actual = sut.checkPassword('123456789AA')
        expect(actual).toBe(false)
    })

    xit('password with lower case letter should be valid', () => {
        const actual = sut.checkPassword('123456789ABVacg')
        expect(actual).toBe(true)
    })

})