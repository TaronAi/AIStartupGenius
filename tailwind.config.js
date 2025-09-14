module.exports = {
  purge: [
    './client/index.html',
    './client/src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        background: 'hsl(0 0% 100%)',
        foreground: 'hsl(240 10% 3.9%)',
        muted: 'hsl(240 4.8% 95.9%)',
        primary: '#111827',
        'chart-1': '#2563eb',
        'chart-2': '#22c55e'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}

