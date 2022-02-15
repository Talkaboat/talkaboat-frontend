module.exports = {
  mode: 'jit',
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,ts}']
  },
  theme: {
    colors: {
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
      }
    },
    fontColo: {

    }
    fontFamily: {
      sans: [ 'Raleway', 'Segoe UI', 'sans-serif' ]
    }
  }
 }
