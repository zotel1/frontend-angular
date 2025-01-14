/** @type {import('tailwindcss').Config} 
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
} */

  /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
          colors: {
              creamBlue: '#E0F7FA',
            creamBlueDark: '#E1F5FE',
          },
    },
  },
  plugins: [],
}

