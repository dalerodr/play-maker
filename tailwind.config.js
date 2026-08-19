/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                bulls: {
                    red: '#CE1141',
                    'red-dark': '#a70d2a',
                    black: '#222222',
                    gold: '#F5E6C8',
                    neon: '#39FF14',
                },
            },
            fontFamily: {
                display: ['Bebas Neue', 'sans-serif'],
                body: ['Outfit', 'sans-serif'],
            },
            animation: {
                'slide-up': 'slideUp 0.4s ease-out',
                'slide-down': 'slideDown 0.3s ease-out',
                'fade-in': 'fadeIn 0.3s ease-out',
                'scale-in': 'scaleIn 0.2s ease-out',
                'pulse-glow': 'pulseGlow 2s infinite',
                'shimmer': 'shimmer 2s infinite',
                'bounce-in': 'bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            },
            keyframes: {
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 5px rgba(206, 17, 65, 0.5)' },
                    '50%': { boxShadow: '0 0 20px rgba(206, 17, 65, 0.8)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                bounceIn: {
                    '0%': { transform: 'scale(0.3)', opacity: '0' },
                    '50%': { transform: 'scale(1.05)' },
                    '70%': { transform: 'scale(0.9)' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
            boxShadow: {
                'glow-red': '0 0 15px rgba(206, 17, 65, 0.4)',
                'glow-neon': '0 0 15px rgba(57, 255, 20, 0.4)',
                'premium': '0 8px 32px rgba(0, 0, 0, 0.3)',
            },
        },
    },
    plugins: [],
}
