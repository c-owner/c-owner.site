import useErrorMapper from '~/composables/useErrorMapper'
import { AuthSession } from '~/types/AuthSession'
import { useRouter } from '#app'

export async function registerWithEmail(
    username: string,
    name: string,
    email: string,
    password: string
): Promise<FormValidation> {
    try {
        const data = await $fetch<AuthSession>('/api/auth/register', {
            method: 'POST',
            body: { username, name, email, password }
        })

        if (data) {
            useState('user').value = data
            await useRouter().push('/')
        }
        return { hasErrors: false, loggedIn: true }
    } catch (error: any) {
        return useErrorMapper(error.data.data)
    }
}
