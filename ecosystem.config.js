
const envPath = `config/.env.${process.env.NODE_ENV || 'development'}`
require('dotenv').config({ path: envPath })

module.exports = {
  apps : [{
      name: 'Nuxt3 FullStack Corner',
      exec_mode: 'cluster',
      instances: 'max',
      script: '.output/server/index.mjs',
      autorestart: true,
      watch: false,
      env: {
          // 개발 환경설정
          NODE_ENV: 'development',
          HOST: '0.0.0.0',
          PORT: 3000,
      },
      env_production: {
          // 운영 환경설정 (--env production 옵션으로 지정할 수 있다.)
          NODE_ENV: 'production',
          HOST: '0.0.0.0',
          PORT: 443
      },
      output: './logs/console.log',
      error: './logs/consoleError.log'
}],

};
