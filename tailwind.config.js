module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        base: "0px 16px 40px rgba(112,144,176, 0.2)",
        medium: "0px 16px 40px rgba(112, 144, 176, 0.32)",
        "inner-shadow": "rgba(0, 0, 0, 0.3) 0px -90px 26px 0px inset",
      },
      colors: {
        background: "#18191a",
        card: "#242629",
        "base-text-light": "#00214d",
        "primary-text-light": "#1b2d45",
        "secondary-text-light": "#1b2d45",
        "base-text-dark": "#fffffe",
        "primary-text-dark": "#94a1b2",
        "secondary-text-dark": "#72757e",
        "bg-btn": "#00ccad",
        "bg-danger": "#ff5470",
        "bg-profile": "#fde24f",
      },
      keyframes: {
        "slide-down": {
          "0%": {
            opacity: 0,
            transform: "translateY(-10%)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0%)",
          },
        },
        "slide-up": {
          "100%": {
            opacity: 1,
            transform: "translateY(0%)",
          },
          "0%": {
            opacity: 0,
            transform: "translateY(-10%)",
          },
        },
        "slide-right": {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(0%)",
          },
        },
        "fade-in-out": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
      },
      animation: {
        "slide-down": "slide-down 0.3s ease-in-out",
        "slide-up": "slide-up 0.3s ease-in-out",
        "slide-right": "slide-right 0.3s ease-in-out",
        "fade-in-out": "fade-in-out 0.3s ease-in-out",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
