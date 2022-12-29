import { createError, eventHandler, sendError } from "h3";
import { getMappedError } from '~/server/app/errors/errorMappers'
import { getUserByEmail } from '~/server/database/repositories/userRepository'
import findRequests from '~/server/app/formRequests/FindRequests'
import { validateUser } from '~/server/app/services/userService'
import { ZodError } from "zod";
import sendZodErrorResponse from "~/server/app/errors/responses/ZodErrorsResponse";
import sendDefaultErrorResponse from "~/server/app/errors/responses/DefaultErrorResponse";

const standardAuthError = getMappedError(
    'Authentication',
    '존재하지 않는 계정이거나 아이디 또는 비밀번호를 다시 확인해주세요.'
)
export default eventHandler(async (event) => {
    try {
        const data = await findRequests(event)
        const validation = await validateUser(data)

        if (validation.hasErrors === true && validation.errors) {
            const errors = JSON.stringify(Object.fromEntries(validation.errors))
            return sendError(event, createError({ statusCode: 422, data: errors }))
        }

        const user = await getUserByEmail(data.email)

        if (user === null) {
            return sendError(event, createError({ statusCode: 401, data: standardAuthError }))
        }

        return user;


    } catch (error: any) {
        if (error.data instanceof ZodError) {
            return await sendZodErrorResponse(event, error.data)
        }

        return await sendDefaultErrorResponse(event, 'oops', 500, error)
    }
})
