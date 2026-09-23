/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        logistra: {
          bg: "#050608",
          secondary: "#0B0D10",
          surface: "#101318",
          text: "#F5F3EE",
          muted: "#A6A9AF",
          subtle: "#6F737A",
          gold: "#D6A85F",
          goldHighlight: "#F0C982",
          success: "#6FAF8F",
          warning: "#C89A52",
          danger: "#C86B67",
          info: "#617582"
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    },
  },
  plugins: [],
}
