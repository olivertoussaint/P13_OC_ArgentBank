/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'regul-green': '#00bc77',
        'login': '#2c3e50',
        'white': '#ffffff',
        'dark': 'rgb(18 0 43);',
        'aliceblue': '#F0F8FF',
      },
      minHeight: {
        '140': '750px',
        '150': '820px',
        '1020px': '1020px'
      },
      width: {
        '49': '12.5rem',
        '73': '18.75rem',
        '81': '22.75rem',
      },
      height: {
        '97': '25rem',
    
      },
      margin: {
        'auto': '0 auto',
      },
      padding: {
        '.625rem': '.625rem',
        '.14rem': '14rem',
      },
      fontSize: {
        'base-1': '1rem',
        '1': '1.1rem',
        '2': '2rem',
        '2-5': '2.5rem'
      },
      spacing: {
        '3.125rem': '3.125rem',
        '1.1875rem': '1.1875rem'
      },
      borderWidth: {
        '10': '10px'
      }

    },
  },
  plugins: [],
}

