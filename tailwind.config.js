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
      xs: "0.813rem",
      sm: "1rem",
      base: "1.125rem",
      lg: "1.1875rem",
      xl: "1.375rem",
      bs: "0.875rem",
      bd: "1rem",
      bl: "1.125rem",
      h1: "2.125rem",
      h2: "1.75rem",
      h3: "1.5rem",
      h4: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    extend: {
      fontFamily: {
        // regular: ['Poppins-Regular'],
        // medium: ['Poppins-Medium'],
        // semiBold: ['Poppins-SemiBold'],
        // bold: ['Poppins-Bold'],
        regular: ["ppneuemontreal-book"],
        medium: ["ppneuemontreal-medium"],
        semiBold: ["ppneuemontreal-semibolditalic"],
        bold: ["ppneuemontreal-bold"],
      },
      colors: {
        tertiary: "#737373",
        backgroundSubtle: "#FAFAFA",
        white: "#FFFFFF",
        secondary: "#404040",
        black: "#0A0A0A",
        border: "#A3A3A3",
        border2: "#E5E5E5",
        neutral: "#525252",
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
