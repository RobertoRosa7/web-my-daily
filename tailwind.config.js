/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        error: "#f44336",
        success: "#4caf50",
        warning: "#ff9800",
        info: "#2196f3",
        primary: "#3f51b5",
        secondary: "#9e9e9e",
        background: "#f5f5f5",
        text: "#212121",
        border: "#e0e0e0",
        icon: "#757575",
        link: "#2196f3",
      },
    },
  },
  plugins: [],
};
