module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      colors: {
        uaf: {
          blue: '#236192',
          yellow: '#FFCD00',
          538: '#C4CFDA',
          420: '#C8C8C8',
          417: '#C8C8C8',
          463: '#774D28',
          7401: '#F6DFA4',
          7578: '#DF6A2E',
          636: '#87D1E6',
          7490: '#71984A',
          212: '#F45197',
          2766: '#111C4E'
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
