type FormValidation = {
    hasErrors: boolean
    erros?: Map<string, { message: InputValidation; }>
    loggedIn?: boolean
};

type FormErrors = {
    field: string
    message: InputValidation
}
