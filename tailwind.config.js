/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {},
      keyframes: {
        wiggle: {
          '0%, 100%': { 
            transform: 'rotate(-9deg)'
          },
          '50%': { 
            transform: 'rotate(9deg)' ,

          },
        },
        pulseTitle: {
          '0% 100%': {
            transform: 'scale(1)'
          },
          '50%': {
            transform: 'scale(1.02)'
          }
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        pulseTitle: 'pulseTitle 2s ease-in-out infinite',
        pingLike: 'animate-jump 1s ease-in-out 1'
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}

