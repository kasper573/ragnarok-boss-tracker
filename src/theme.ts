import { createMuiTheme } from "@material-ui/core/styles";
import { default as green } from "@material-ui/core/colors/green";
import { default as purple } from "@material-ui/core/colors/purple";

const primaryGreen = green[100];
const accentGreen = green.A200;
const darkGreen = green[900];
const primaryPurple = purple[500];
const accentPurple = purple.A200;
const darkPurple = purple[900];

export const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "html, body, #root": {
          width: "100%",
          height: "100%",
          margin: 0,
          padding: 0,
        },
      },
    },
  },
  palette: {
    primary: {
      light: accentPurple,
      main: primaryPurple,
      dark: darkPurple,
      contrastText: "#fff",
    },
    type: "dark",
    secondary: {
      light: accentGreen,
      main: primaryGreen,
      dark: darkGreen,
      contrastText: "#fff",
    },
  },
});
