/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        arcadeBg: '#070712',
        neonPink: '#ff66cc',
        neonCyan: '#33ffff',
        neonAmber: '#ffc857'
      }
    }
  },
  plugins: [],
};
