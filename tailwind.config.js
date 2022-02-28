const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{html,ts}'],
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],

  theme: {
    extend: {
      keyframes: {
        'floating': {
          '0%': {
            transform: 'translateY(0px)'
          },
          '50%': {
            transform: 'translateY(10px)'
          },
          '100%': {
            transform: 'translateY(0px)'
          },
        },
      },
    },
    colors: {
      "fan": {
        "50": "#FFF1EB",
        "100": "#FFE7DB",
        "200": "#FFCFB8",
        "300": "#FFB894",
        "400": "#FFA070",
        "500": "#FF854A",
        "600": "#FF5C0A",
        "700": "#C74200",
        "800": "#852C00",
        "900": "#421600"
      },
      "creator": {
        "50": "#F5F0FF",
        "100": "#EAE1FF",
        "200": "#D2BEFE",
        "300": "#BD9FFE",
        "400": "#A57CFD",
        "500": "#915EFD",
        "600": "#6017FC",
        "700": "#4303CE",
        "800": "#2C0288",
        "900": "#170147"
      },
      "main": {
        "50": "#F0F6FF",
        "100": "#E1EDFF",
        "200": "#C3DBFE",
        "300": "#A4CAFE",
        "400": "#81B5FD",
        "500": "#64A4FD",
        "600": "#1C7AFC",
        "700": "#035AD4",
        "800": "#023C8D",
        "900": "#011E47"
      },
      "shadow": {
        "50": "#E2E9F3",
        "100": "#C1D1E7",
        "200": "#86A6CF",
        "300": "#4878B7",
        "400": "#304F79",
        "500": "#18283D",
        "600": "#131F30",
        "700": "#0E1825",
        "800": "#0A111A",
        "900": "#04070B"
      },
      "red": colors.red
    },
    animation: {
      'spin-slow': 'spin 3s ease-in-out infinite',

      'bounce-slow': 'bounce 3s ease-in-out infinite',

      'floating': 'floating 3s ease-in-out infinite',
    },
    fontFamily: {
      sans: ['Raleway', 'Segoe UI', 'sans-serif']
    }
  }
}
