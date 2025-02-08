/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkest: "#212529",
        darker: "#343A40",
        dark: "#495057",
        light: "#6C757D",
        ligter: "#ADB5BD",
        bright: "#E9ECEF",
        easy : '#00B8A3',
        medium :'#FFC01E',
        hard : '#FF375F',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [],
  },
};
