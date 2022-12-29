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
    '존재하지 않는 계정이거나 이메일을 다시 확인해주세요.'
)
export default eventHandler(async (event) => {
    try {
        const data = await findRequests(event)
        const user = await getUserByEmail(data.email).then((res) => {
            if (res) {
                return true;
            } else {
                return false;
            }
        })

        if (user !== true) {
            return sendError(event, createError({ statusCode: 401, data: standardAuthError }))
        }

        return {
            statusCode: 200,
            success: user,
            message: 'success'
        };


    } catch (error: any) {
        if (error.data instanceof ZodError) {
            return await sendZodErrorResponse(event, error.data)
        }

        return await sendDefaultErrorResponse(event, 'oops', 500, error)
    }
})
