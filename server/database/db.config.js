let isDev = process.env.NODE_ENV === 'development'
export const dbConfig = {
    host: isDev ? 'localhost' : 'https://c-owner.site',
    port: 3306,
    user: isDev ? 'admin' : 'admin',
    password: isDev ? 'Thiskim12!@' : 'Thiskim12!@',
    database: isDev ? 'corner' : 'corner',
}
export const dbUrl = `mysql://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;


