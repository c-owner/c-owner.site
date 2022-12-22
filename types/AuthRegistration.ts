/* 가입 등록 타입 정의 */
export type AuthRegistrationErrors = {
    hasErrors?: string
}

export type RegistrationResponse = {
    hasErrors: boolean,
    errors?: AuthRegistrationErrors
}

export type RegistrationRequest = {
    name: string,
    username?: string
    email?: string
    password?: string
}
