import { createError, eventHandler, H3Event, sendError } from "h3";
import { getMappedError } from "~/server/app/errors/errorMappers";
import loginRequest from "~/server/app/formRequests/LoginRequest";
import { getUserByEmail } from "~/server/database/repositories/userRepository";
import bcrypt from "bcrypt";
import { makeSession } from "~/server/app/services/sessionService";
import { sanitizeUserForFrontend } from "~/server/app/services/userService";
import { ZodError } from "zod";
import sendZodErrorResponse from "~/server/app/errors/responses/ZodErrorsResponse";
import sendDefaultErrorResponse from "~/server/app/errors/responses/DefaultErrorResponse";


const standardAuthError = getMappedError('Authentication', '존재하지 않는 계정이거나 아이디 또는 비밀번호를 다시 확인해주세요.')

export default eventHandler(async (event: H3Event) => {

    try {
        const data = await loginRequest(event)
        const user = await getUserByEmail(data.usernameOrEmail)
        if (user === null) {
            return sendError(event, createError({ statusCode: 401, data: standardAuthError }))
        }

        if (user.password == undefined) {
            return sendError(event, createError({ statusCode: 401, data: standardAuthError }))
        }

        const isPasswordCorrect = await bcrypt.compare(data.password, user.password)
        console.log(bcrypt.compare(data.password, user.password));
        console.log(isPasswordCorrect);
        if (!isPasswordCorrect) {
            sendError(event, createError({ statusCode: 401, data: standardAuthError }))
        }

        await makeSession(user, event)
        // @ts-ignore
        return sanitizeUserForFrontend(user)
    } catch (error: any) {
        if (error.data instanceof ZodError) {
            return await sendZodErrorResponse(event, error.data)
        }

        return await sendDefaultErrorResponse(event, 'Unauthenticated', 401, error)

    }

})
