import { PasswordChecker } from "../../app/passwordChecker/passwordChecker"

describe('Password Checker test suite', () => {

    let sut: PasswordChecker

    beforeEach(() => {
        sut = new PasswordChecker()
    })

    it('it should do nothing for now', () => {
        sut.checkPassword()
    })
})