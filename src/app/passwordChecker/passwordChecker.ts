export enum PasswordErrors {
    SHORT = 'Password should be minimum 8 characters!',
    NO_UPPER_CASE = 'Password should have atleast 1 upper case character',
    NO_LOWER_CASE = 'Password should have atleast 1 lower case character',
    NO_NUMBER = 'Admin password should have atleast 1 digit'
}

export interface CheckResult {
    valid: boolean,
    reasons: PasswordErrors[]
}


export class PasswordChecker {

    reasons: PasswordErrors[]

    constructor()  {
        this.reasons = []
    }

    public checkPassword(password: string): CheckResult {
        this.checkLength(password)
        this.checkNoUpperCase(password)
        this.checkNoLowerCase(password)
        return {
            valid: this.reasons.length ? false : true,
            reasons: this.reasons
        }
    }

    private checkLength(password: string) {
        if (password.length < 8) {
            this.reasons.push(PasswordErrors.SHORT)
        }
    }

    private checkNoUpperCase(password: string) {
        if (password === password.toLowerCase()) {
            this.reasons.push(PasswordErrors.NO_UPPER_CASE)
        }
    }

    private checkNoLowerCase(password: string) {
        if(password === password.toUpperCase()) {
            this.reasons.push(PasswordErrors.NO_LOWER_CASE)
        }
    }

    public checkAdminPassword(password: string) {
        const regex = /\d/
        const result = regex.exec(password)
        if(!result) {
            this.reasons.push(PasswordErrors.NO_NUMBER)
        }
        return {
            valid: this.reasons.length ? false : true,
            reasons: this.reasons
        }
    }

}