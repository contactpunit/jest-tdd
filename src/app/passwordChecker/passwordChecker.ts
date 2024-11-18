export enum PasswordErrors {
    SHORT = 'Password should be minimum 8 characters!',
    NO_UPPER_CASE = 'Password should have atleast 1 upper case character',
    NO_LOWER_CASE = 'Password should have atleast 1 lower case character'
}

export interface CheckResult {
    valid: boolean,
    reasons: PasswordErrors[]
}


export class PasswordChecker {

    public checkPassword(password: string): CheckResult {
        const reasons: PasswordErrors[] = []
        if (password.length < 8) {
            reasons.push(PasswordErrors.SHORT)
        }
        if (password === password.toLowerCase()) {
            reasons.push(PasswordErrors.NO_UPPER_CASE)

        } else if(password === password.toUpperCase()) {
            reasons.push(PasswordErrors.NO_LOWER_CASE)
        }
        return {
            valid: reasons.length ? false : true,
            reasons: reasons
        }
    }
}