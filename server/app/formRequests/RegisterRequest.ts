import { parseBodyAs, z } from "@sidebase/nuxt-parse";
import { H3Event } from "h3";
import { ZodSchema } from "zod";
const bodySchema = z.object({
    username: z.string({
        required_error: 'username required',
    }).min(1, { message: '닉네임은 필수입니다.' }),

    name: z.string({
        required_error: 'name required',
    }).min(1, { message: '이름은 필수입니다.' }),

    email: z.string({
        required_error: 'valid email required',
    }).email({ message: '유효한 이메일 주소를 입력해주세요.' }),

    password: z.string({
        required_error: 'password required',
    }).min(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
})

export default async function registerRequest(event: H3Event) {
    return await parseBodyAs<ZodSchema>(event, bodySchema)
}
