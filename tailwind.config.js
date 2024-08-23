/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bank-tree': "url('./src/assets/img/bank-tree.jpeg')"
      },
      colors: {
        'regul-green': '#00bc77',
        'login': '#2c3e50',
        'white': '#ffffff',
        'dark': 'rgb(18 0 43);',
      },
      minHeight: {
        '150': '820px'
      },
      width: {
        '49': '12.5rem',
        '73': '18.75rem',
        '81': '22.75rem'
      },
      height: {
        '97': '25rem'
      },
      margin: {
        'auto': '0 auto',
      },
      padding: {
        '.625rem': '.625rem'
      },
      fontSize: {
        'base-1': '1rem',
        '1': '1.1rem',
        '2': '2rem',
        '2-5': '2.5rem'
      }
    },
  },
  plugins: [],
}

