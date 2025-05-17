/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-green': '#00ff41',
        'neon-blue': '#0096ff',
        'dark-bg': '#0f0f0f',
        'darker-bg': '#070707',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'typing': 'typing 3.5s steps(40, end), blink .75s step-end infinite',
        'scan': 'scan 2s linear infinite',
        'pulse': 'pulse 1.5s infinite',
      },
      keyframes: {
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' }
        },
        blink: {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: '#00ff41' },
        },
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        pulse: {
          '0%': { boxShadow: '0 0 0 0 rgba(0, 255, 65, 0.7)' },
          '70%': { boxShadow: '0 0 0 10px rgba(0, 255, 65, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(0, 255, 65, 0)' }
        }
      },
    },
  },
  plugins: [],
};