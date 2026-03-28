/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 卡通鲜艳色彩
        'cartoon-pink': '#FF6B9D',
        'cartoon-purple': '#C084FC',
        'cartoon-blue': '#60A5FA',
        'cartoon-cyan': '#22D3EE',
        'cartoon-green': '#4ADE80',
        'cartoon-yellow': '#FACC15',
        'cartoon-orange': '#FB923C',
        'cartoon-red': '#F87171',
        // 柔和背景色
        'soft-pink': '#FDF2F8',
        'soft-purple': '#FAF5FF',
        'soft-blue': '#EFF6FF',
        'soft-yellow': '#FEFCE8',
        'soft-green': '#F0FDF4',
      },
      fontFamily: {
        // 卡通字体
        'cartoon': ['Comic Sans MS', 'cursive', 'sans-serif'],
        'rounded': ['Nunito', 'Quicksand', 'sans-serif'],
      },
      borderRadius: {
        'cartoon': '2rem',
        'cartoon-lg': '3rem',
      },
      boxShadow: {
        'cartoon': '8px 8px 0px 0px rgba(0,0,0,0.15)',
        'cartoon-hover': '12px 12px 0px 0px rgba(0,0,0,0.2)',
        'cartoon-soft': '6px 6px 0px 0px rgba(255,107,157,0.3)',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}