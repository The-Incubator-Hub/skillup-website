import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                skillup: {
                    blue: '#0D4EFF',
                    navy: '#14183E',
                    deep: '#1E3A8A',
                    soft: '#EFF6FF',
                    light: '#DBEAFE',
                    orange: '#F97316',
                    ink: '#101828',
                    muted: '#667085',
                },
            },
            fontFamily: {
                sans: ['Jost', ...defaultTheme.fontFamily.sans],
                montserrat: ['Montserrat', ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
            },
            animation: {
                marquee: 'marquee 24s linear infinite',
            },
        },
    },

    plugins: [forms],
};
