import { User } from '@prisma/client'
import prisma from '~/server/database/client'
import { AuthUser } from "~/types/AuthUser";

export async function getUserByEmail(emailOrEmail: string): Promise<User | null> {
    return await prisma.user.findFirst({
        where: {
            OR: [
                { email: emailOrEmail },
                { username: emailOrEmail }
            ]
        }
    })
}


export async function getUserByUserName(username: string) {
    return await prisma.user.findUnique({
        where: {
            username: username
        },
        select: {
            id: true,
            username: true
        }
    })
}

export async function createUser(data: AuthUser) {
    const user = await prisma.user.create({
        data: {
            username: data.username,
            name: data.name,
            email: data.email,
            loginType: data.loginType,
            password: data.password
        }
    })

    return user
}

export async function getUserById(id: number) {
    return await prisma.user.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            username: true,
            email: true,
            stripeCustomerId: true
        }
    })
}

export async function getUserByStripeCustomerId(stripeCustomerId: string) {
    return await prisma.user.findFirst({
        where: {
            stripeCustomerId: stripeCustomerId
        },
        select: {
            id: true,
            username: true,
            email: true,
            stripeCustomerId: true
        }
    })
}
