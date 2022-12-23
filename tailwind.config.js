import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'
import tailwindForms from '@tailwindcss/forms'
/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
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
    plugins: [
        tailwindForms,
        require('@tailwindcss/typography')
    ]
}
