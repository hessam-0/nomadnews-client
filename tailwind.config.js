/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        main: "#A3E636",
        mainAccent: "#88cc19",
        overlay: "rgba(0,0,0,0.8)",
        // light mode
        bg: "#E0E7F1",
        text: "#000",
        border: "#000",
        // dark mode
        darkBg: "#2c312b",
        darkText: "#eeefe9",
        darkBorder: "#000",
        secondaryBlack: "#212121",
      },
      borderRadius: {
        base: "5px",
      },
      boxShadow: {
        light: "4px 4px 0px 0px #000",
        dark: "4px 4px 0px 0px #000",
      },
      translate: {
        boxShadowX: "4px",
        boxShadowY: "4px",
        reverseBoxShadowX: "-4px",
        reverseBoxShadowY: "-4px",
      },
      fontWeight: {
        base: "500",
        heading: "800",
      },
    },
  },
  plugins: [],
};
