import { z, ZodSchema } from 'zod'
import { H3Event } from 'h3'
import { parseBodyAs } from '@sidebase/nuxt-parse'

const bodySchema = z.object({
    email: z
        .string({
            required_error: 'valid email required'
        })
        .min(1, { message: '이메일은 필수입니다.' })
        .email({ message: '유효한 이메일 주소를 입력해주세요.' }),
})

export default async function findRequests(event: H3Event) {
    return await parseBodyAs<ZodSchema>(event, bodySchema)
}
