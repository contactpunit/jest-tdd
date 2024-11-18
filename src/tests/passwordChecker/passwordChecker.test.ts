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

    // his test ill fail after we introduce conditions for letters as mandatory
    // it('password with more than 8 should pass', () => {
    //     const actual = sut.checkPassword('1234569999')
    //     expect(actual.valid).toBe(true)
    //     expect(actual.reasons).not.toContain(PasswordErrors.SHORT)
    // })

    it('password with no upper case letter should be invalid', () => {
        const actual = sut.checkPassword('123456789avcd')
        expect(actual.reasons).toContain(PasswordErrors.NO_UPPER_CASE)
    })

    it('password with upper case letter and 8 letters should be valid', () => {
        const actual = sut.checkPassword('123456789ABV')
        expect(actual.valid).not.toContain(PasswordErrors.NO_UPPER_CASE)
    })

    it('password with no lower case letter and min 8 characters should be invalid', () => {
        const actual = sut.checkPassword('123456789AA')
        expect(actual.reasons).toContain(PasswordErrors.NO_LOWER_CASE)
    })

    it('password with lower case letter should be valid', () => {
        const actual = sut.checkPassword('123456789acg')
        expect(actual).not.toContain(PasswordErrors.NO_LOWER_CASE)
    })

    it('password with all matching conditions', () => {
        const actual = sut.checkPassword('123456789acgWDQ')
        expect(actual.valid).toBe(true)
    })

})