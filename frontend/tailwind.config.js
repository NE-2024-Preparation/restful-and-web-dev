/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: '4rem',
                xl: '5rem',
                '2xl': '6rem'
            }
        },
        extend: {
            colors: {
                'primary-100':'#6FA8ED',
                'primary-500': '#1A74E2',
                'secondary-100': '#949393',
                'secondary-200': '#000000',
                'secondary-500': '#E4E4E4'
            }
        }
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/line-clamp'),
        require('prettier-plugin-tailwindcss')
    ]
};
