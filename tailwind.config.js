/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#121212',
          lighter: '#1a1a1a',
          light: '#2a2a2a',
        },
        wine: {
          DEFAULT: '#8B0000',
          light: '#A50000',
          dark: '#660000',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E4BF47',
          dark: '#B4941F',
        },
        light: {
          DEFAULT: '#F5F5F5',
          dark: '#E5E5E5',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-wine': 'linear-gradient(135deg, #8B0000 0%, #660000 100%)',
        'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #B4941F 100%)',
      },
      boxShadow: {
        'glow-wine': '0 0 20px rgba(139, 0, 0, 0.5)',
        'glow-gold': '0 0 20px rgba(212, 175, 55, 0.5)',
        'luxury': '0 10px 40px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}

