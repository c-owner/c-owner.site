import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'
import tailwindForms from '@tailwindcss/forms'
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}'
    ],
    darkMode: ['class', '[data-mode="dark"]'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans]
            },
            colors: {
                primary: colors.gray,
                space: '#5c6ac6'
            }
        }
    },
    plugins: [tailwindForms]
}
