import { RegistrationRequest } from "~/types/AuthRegistration";
import { getUserByEmail, getUserByUserName } from "~/server/database/repositories/userRepository";

export async function validate(data: RegistrationRequest) {

    const errors = new Map<string, {
        message: string | undefined
    }>()

    for (const [key, value] of Object.entries(data)) {
        let val = await validateRegistration(key, value)

        if (val.hasError) {
            errors.set(key, { 'message': val.errorMessage })
        }
    }

    return errors
}

async function validateRegistration(key: string, value: string): Promise<InputValidation> {
    const check: InputValidation = {
        value, isBlank: false, lenghtMin8: true, key, hasError: false
    }

    if (key === 'password') {
        if (value.length < 8) {
            check.hasError = true
            check.errorMessage = '비밀번호는 8자 이상이어야 합니다.'
        }
        check.lenghtMin8 = false
    }

    if (key === 'email') {
        const email = await getUserByEmail(value)
        if (email) {
            check.emailTaken = true
            check.hasError = true
            check.errorMessage = '이메일이 이미 사용중입니다.'
        }
    }

    if (key === 'username') {
        const username = await getUserByUserName(value)
        if (username) {
            check.usernameTaken = true
            check.hasError = true
            check.errorMessage = '이미 사용중인 닉네임입니다.'
        }
    }

    return check
}
