import bcrypt from 'bcrypt'
import { createError, eventHandler, H3Event, sendError } from "h3";
import { ZodError } from 'zod'
import sendZodErrorResponse from '~/server/app/errors/responses/ZodErrorsResponse'
import registerRequest from '~/server/app/formRequests/RegisterRequest'
import { validateUser } from '~/server/app/services/userService'
import { AuthUser } from "~/types/AuthUser";
import { createUser } from "~/server/database/repositories/userRepository";
import sendDefaultErrorResponse from "~/server/app/errors/responses/DefaultErrorResponse";
import { makeSession } from "~/server/app/services/sessionService";

export default eventHandler(async (event: H3Event) => {
    try {
        const data = await registerRequest(event);
        const validation = await validateUser(data); // 유효성 검사

        if (validation.hasErrors === true && validation.errors) {
            const errors = JSON.stringify(Object.fromEntries(validation.errors))
            return sendError(event, createError({ statusCode: 422, data: errors }))
        }

        // 비밀번호 암호화
        const encryptedPassword: string = await bcrypt.hash(data.password, 10)

        const userData: AuthUser = {
            username: data.username,
            name: data.name,
            email: data.email,
            loginType: 'email',
            password: encryptedPassword
        }

        const user = await createUser(userData)

        return await makeSession(user, event)


    } catch (error: any) {
        if (error.data instanceof ZodError) {
            return await sendZodErrorResponse(event, error.data)
        }

        return await sendDefaultErrorResponse(event, 'oops', 500, error)
    }
})
