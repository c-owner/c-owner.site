import { AuthSubscription } from "~/types/AuthSubscription";

export interface AuthUser {
    id?: number
    username: string
    name?: string
    loginType?: string
    password?: string
    email?: string
    avatarUrl?: string
    subscription? : AuthSubscription | null
    stripeCustomerId?: string | null
}
