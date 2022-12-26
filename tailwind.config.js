/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        bungee: ["bungee", "sanserif"],
        chakrapetch: ["Chakra Petch", "sansserif"],
      },
    },
  },
  plugins: [],
};
