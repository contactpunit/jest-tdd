import { PasswordChecker } from "../../app/passwordChecker/passwordChecker"

describe('Password Checker test suite', () => {

    let sut: PasswordChecker

    beforeEach(() => {
        sut = new PasswordChecker()
    })

    it('password with less than 8 chars should be invalid', () => {
        const actual = sut.checkPassword('123456')
        expect(actual).toBe(false)
    })

    it('password with more than 8 chars should be valid', () => {
        const actual = sut.checkPassword('123456789A')
        expect(actual).toBe(false)
    })

    it('password with no upper case letter should be invalid', () => {
        const actual = sut.checkPassword('123456789')
        expect(actual).toBe(false)
    })

    it('password with upper case letter and 8 letters should be valid', () => {
        const actual = sut.checkPassword('123456789ABVacg')
        expect(actual).toBe(true)
    })

    it('password with no lower case letter should be invalid', () => {
        const actual = sut.checkPassword('123456789AA')
        expect(actual).toBe(false)
    })

    it('password with lower case letter should be valid', () => {
        const actual = sut.checkPassword('123456789ABVacg')
        expect(actual).toBe(true)
    })

})