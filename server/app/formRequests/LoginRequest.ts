import { parseBodyAs, z } from "@sidebase/nuxt-parse";
import { H3Event } from "h3";

const bodySchema = z.object({
    usernameOrEmail: z
        .string({
            required_error: 'username or email required'
        })
        .min(1, { message: '닉네임 또는 이메일이 잘못되었습니다.' }),

    password: z
        .string({
            required_error: 'password required'
        })
        .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
})

export default async function loginRequest(event: H3Event) {
    return await parseBodyAs(event, bodySchema)
}
