import { deleteCookie, eventHandler } from 'h3'

export default eventHandler((event) => {
    deleteCookie(event, 'auth_token')
    return {
        statusCode: 200,
        success: true,
        message: '로그아웃 되었습니다.'
    }
})
