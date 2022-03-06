module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "shadow-base": "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        "shadow-medium": "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        "inner-shadow": "rgba(0, 0, 0, 0.6) 0px -90px 36px -28px inset",
      },
      colors: {
        background: "#18191a",
        card: "#242526",
        "primary-text": "#e3e6eb",
        "secondary-text": "#b0b3b8",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
