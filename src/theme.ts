import { createMuiTheme } from "@material-ui/core/styles";

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
    type: "dark",
  },
});
