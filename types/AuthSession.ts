import { User } from '@prisma/client'

export interface AuthSession {
    authToken?: string
    user?: User
    userId?: number
}
