const { transform } = require("typescript");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        playwriteRegular: ["PlaywriteCU-Regular"],
      },
      colors: {
        brand: "#5D57FB",
        text: "#100826",
        "blue-dark": "#1A0359",
        yellow: "#F4B94A",
        salad: "#6FBE36",
        green: "#18AB1A",
        "red-dark": "#AB1818",
        "red-light": "#E34F62",
        "gray-800": "#100826",
        "gray-700": "#474559",
        "gray-600": "#76788C",
        "gray-500": "#9597A6",
        "gray-400": "#CCCDD9",
        "gray-300": "#DCDDE5",
        "gray-200": "#F0F1F5",
        "gray-100": "#F5F7FA",
        "gray-50": "#F9F9FB",
        "btn-hovered": "rgba(93, 87, 251, 0.50)",
        "light-purple": "rgba(93,87,251,.1)",
        borderPrimary: "rgba(0, 0, 0, 0.07)",
        darkPurple: "rgba(93, 87, 251, 0.30)",
      },
      backgroundColor: {
        tag: "rgb(16, 8, 38)",
        icon: "rgb(16, 8, 38)",
        hovered: "rgb(93, 87, 251)",
      },
      backgroundImage: {
        readMoreOverlay:
          "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)",
        "gradient-to-black": "linear-gradient(180deg, transparent, #000)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-header": "linear-gradient(to right, #c33764, #1d2671);",
        "gradient-to-blue": "linear-gradient(135deg, transparent, #9599E2);",
        "gradient-custom":
          "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
      },
      boxShadow: {
        separator: "1px 0px 0px 0px rgba(0, 0, 0, 0.07) inset",
        fixedNav: "inset 0 -1px 0 rgba(0, 0, 0, 0.07)",
        primary:
          "0 1px 5px 0 rgba(0, 0, 0, 0.04), 0 1px 3px 0 rgba(0, 0, 0, 0.05)",
        dropdown: "0 4px 30px 0 rgb(249,250,251), 0 1px 3px 0 rgb(249,250,251)",
        line: "0 -1px 0 0 rgba(0, 0, 0, 0.07) inset",
        button: "0 1px 5px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.05)",
        inset: "0 0 4px 0 rgba(0, 0, 0, 0.1) inset",
        y: "inset 0px 1px 0px rgba(0, 0, 0, 0.07), inset 0px -1px 0px rgba(0, 0, 0, 0.07);",
      },
      borderColor: {
        hovered: "rgb(93, 87, 251)",
      },
      screens: {
        "desktop-big": { max: "1800px" },

        "desktop-lg": { max: "1200px" },
        desktop: { min: "1100px" },
        tablet: { max: "1023px" },
        "tablet-sm": { max: "800px" },
        mobile: { max: "815px" },
        "mobile-md": { max: "500px" },
        "mobile-sm": { max: "375px" },
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        ticker: {
          "0%": { translate: "0" },
          "100%": { translate: "-100%" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slide: {
          "0%": {
            transform: "translate(100%, 0)",
          },
          "100%": {
            transform: "translate(-100%, 0)",
          },
        },
        "border-loader": {
          "0%": { border: "4px solid transparent" },
          "25%": { borderTopWidth: "4px", borderColor: "black" },
          "50%": {
            borderTopWidth: "4px",
            borderLeftWidth: "4px",
            borderColor: "black",
          },
          "75%": {
            borderTopWidth: "4px",
            borderLeftWidth: "4px",
            borderBottomWidth: "4px",
            borderColor: "black",
          },
          "100%": {
            borderWidth: "4px",
          },
        },
        "appear-and-rotate": {
          "0%": {
            width: 0,
            height: 0,
            transform: "rotate(-50deg)",
          },
          "100%": {
            width: "163px",
            height: "260px",
            transform: "rotate(0)",
          },
        },
        "like-animate": {
          "0%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.2) translateY(-10px)",
          },
          "100%": {
            transform: "scale(1) translateY(0)",
          },
        },
        "dislike-animate": {
          "0%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(0.8) translateY(10px)",
          },
          "100%": {
            transform: "scale(1) translateY(0)",
          },
        },
        blink: {
          "50%": { opacity: "100%" },
          "100%": { opacity: "20%" },
        },
      },
      animation: {
        slide: "slide 80s 2.3s infinite linear forwards",
        "appear-and-rotate": "appear-and-rotate 1s forwards",
        "fade-in": "fade-in 0.3s ease-in",
        ticker: "ticker 25s linear infinite",
        "slide-down": "slide-down 0.2s ease",
        "like-animate":
          "like-animate 0.7s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "dislike-animate":
          "dislike-animate 0.7s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        blink: "blink 0.7s ease-out",
        "border-loader": "border-loader 3s ease infinite",
      },
    },
  },
  plugins: [],
};
