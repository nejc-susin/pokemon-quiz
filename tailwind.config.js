module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cerulean: {
          DEFAULT: '#00A7E1',
          '50': '#9AE5FF',
          '100': '#85E0FF',
          '200': '#5CD5FF',
          '300': '#34CBFF',
          '400': '#0BC0FF',
          '500': '#00A7E1',
          '600': '#007DA9',
          '700': '#005471',
          '800': '#002A39',
          '900': '#000001'
        },
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
