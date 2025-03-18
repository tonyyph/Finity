const colors = require("tailwindcss/colors");
const { hairlineWidth } = require("nativewind/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontSize: {
      'heading-large': ['34px', { lineHeight: '40px', letterSpacing: '1.8%' }],
      'heading-medium': ['28px', { lineHeight: '34px', letterSpacing: '2.5%' }],
      'heading-small': ['24px', { lineHeight: '30px', letterSpacing: '2.5%' }],
      'heading-extraSmall': ['20px', { lineHeight: '25px', letterSpacing: '2.0%' }],
      'body-large': ['18px', { lineHeight: '24px', letterSpacing: '2.0%' }],
      'body-default': ['16px', { lineHeight: '22px', letterSpacing: '3.0%' }],
      'body-small': ['14px', { lineHeight: '20px', letterSpacing: '1.8%' }],
    },
    extend: {
      fontFamily: {
        regular: ["NeueMontreal-Regular"],
        medium: ["NeueMontreal-Medium"],
        bold: ["NeueMontreal-Bold"],
      },
      fontWeight: {
        thin: "100",
        normal: "400",
        medium: "500",
        semibold: "600",
      },
      colors: {
        black: "#000000",
        white: "#ffffff",
        gray: {
          100: "#fdfdfd",
          200: "#fcfcfc",
          300: "#f6f6f6",
          400: "#ececec",
          500: "#eaeaea",
          600: "#e1e1e1",
          700: "#d3d3d3",
          800: "#cacaca",
          900: "#cccccc",
        },
        darkGray: {
          100: "#ededed",
          200: "#787878",
          300: "#777777",
          400: "#757575",
          500: "#737373",
          600: "#727272",
          700: "#717171",
          800: "#7f7f7f",
          900: "#6d6d6d",
        },
        tertiary: "#737373",
        backgroundSubtle: "#FAFAFA",
        white: "#FFFFFF",
        secondary: "#404040",
        black: "#0A0A0A",
        border: "#A3A3A3",
        border2: "#E5E5E5",
        "teal-200": "#B8E4E5",
        neutral: "#525252",
        "subtle": "#FAFAFA",
        "neutral-950": "#0A0A0A",
        "neutral-300": "#D4D4D4",
        "neutral-100": "#F5F5F5",
        subtitle: "#D4D4D4",
        errormessage: "#D9323D",
        "orange-primary": "#FF885D",
        pin: "#f9f9f9",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        amount: {
          positive: colors.green[600],
          negative: colors.red[500],
        },
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
