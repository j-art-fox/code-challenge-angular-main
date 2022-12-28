/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 50s linear infinite",
      },
      fontFamily: {
        bungee: ["bungee", "sanserif"],
        chakrapetch: ["Chakra Petch", "sansserif"],
      },
    },
  },
  plugins: [],
};
