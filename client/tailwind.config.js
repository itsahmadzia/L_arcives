const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {},
    fontFamily:{
logo:["logo"],
logo2:["logo2"],
main:["Lato"],
mainButtons:["Comfortaa"]
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}