import { createTheme } from "@mui/material/styles";
import { blue, pink } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[600],
    },
    secondary: {
      main: pink[600],
    },
  },
});

export default theme;
