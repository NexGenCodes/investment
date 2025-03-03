/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        foreground: 'rgb(229, 231, 235)',
        backgroundStart: 'rgb(17, 24, 39)',
        backgroundEnd: 'rgb(24, 32, 50)',
        primaryAccent: 'rgb(255, 215, 0)',
        secondaryAccent: 'rgb(30, 58, 138)',
        successAccent: 'rgb(0, 184, 148)',
        mutedText: 'rgb(160, 174, 192)',
      },
    },
  },
  plugins: [],
}

