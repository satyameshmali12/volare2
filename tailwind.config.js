/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      keyframes: {
        loader: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "50%": {
            transform: "translateX(180%)",
          },
          "100%": {
            transform: "translateX(350%)",
          },
        },
      },
    },
  },

  plugins: [],
};
