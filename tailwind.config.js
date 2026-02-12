/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#ff4d6d',
                secondary: '#ff8fa3',
                bg: '#fff0f3',
                text: '#590d22',
            },
            fontFamily: {
                pacifico: ['Pacifico', 'cursive'],
                quicksand: ['Quicksand', 'sans-serif'],
            },
            animation: {
                'bounce-slow': 'bounce 2s infinite',
                'heartbeat': 'heartbeat 3s infinite ease-in-out',
                'fade-in': 'fadeIn 1s ease-out forwards',
            },
            keyframes: {
                heartbeat: {
                    '0%, 30%, 60%': { transform: 'scale(1)' },
                    '15%, 45%': { transform: 'scale(1.1)' },
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
    },
    plugins: [],
}
