/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        dark: "#221B04",
        primary: "#CEC6B4",
        secondary: "#A88E3D",
        button: "#E6C871",
        container: "#F1E1BB",
      },
    },
  },
  plugins: [],
};
